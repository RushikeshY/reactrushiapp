const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ApiFeatures = require('../utils/apiFeatures')
const { ViewHistory } = require('../models/viewHistoryModel')
const ProductCategory = require('../models/ProductCategoryModel')
const ProductSubCategory = require('../models/ProductSubCategoryModel')
const { RateReview } = require('../models/rateReviewModel')
const User = require('../models/userModel')

// create product - Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id
  // const { productImages } = req.files
  // const images = productImages.map((file) => ({
  //   data: file.buffer,
  //   contentType: file.mimetype,
  // }))
  const product = await Product.create({
    ...req.body,
    // productImages: images,
  })
  res.status(201).json({
    success: true,
    product,
  })
})

const { MeiliSearch } = require('meilisearch')
const meiliClient = new MeiliSearch({
  host: 'http://localhost:7700',
  apiKey: process.env.MEILISEARCH_KEY,
})

exports.searchProducts = catchAsyncErrors(async (req, res) => {
  const resultsPerPage = req.query.resultsPerPage || 12
  const currentPage = Number(req.query.page) || 1
  const ob = { hitsPerPage: resultsPerPage, page: currentPage }
  if (req.query.sort) {
    ob.sort = [req.query.sort]
  }
  const flt = []
  if (req.query.category) {
    flt.push(`category = ${req.query.category}`)
  }
  if (req.query.minPrice) {
    flt.push(`sellingPrice >= ${req.query.minPrice}`)
  }
  if (req.query.maxPrice) {
    flt.push(`sellingPrice <= ${req.query.maxPrice}`)
  }
  if (req.query.subCategory) {
    flt.push(`subCategory = ${req.query.subCategory}`)
  }
  if (req.query.stock) {
    flt.push(`stock >= ${req.query.stock}`)
  } else {
    flt.push(`stock>=1`)
  }
  if (flt.length) ob.filter = flt
  const products = await meiliClient
    .index('products')
    .search(req.query.keyword, ob)
  res.status(200).json({
    success: true,
    products: products.hits.map((x) => x._id),
    productCount: products.totalHits,
  })
})

// get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const productCount = await new ApiFeatures(
    Product.find()
      .populate('category', {}, ProductCategory)
      .populate('subCategory', {}, ProductSubCategory),
    req.query
  )
    .search()
    .filter()
    .query.countDocuments()
  const apiFeature = new ApiFeatures(
    Product.find()
      .populate('category', {}, ProductCategory)
      .populate('subCategory', {}, ProductSubCategory),
    req.query
  )
    .search()
    .filter()
    .sort()
    .pagination()
  const products = await apiFeature.query
  res.status(200).json({
    success: true,
    products: products.map((x) => x.id),
    productCount,
  })
})

// get single product details
exports.getSingleProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler('Product Not Found', 404))
  }

  if (req.user && req.query.view === 'true') {
    console.log(product._id)
    req.user.addToViewHistory(product._id)
  }

  res.status(200).json({
    success: true,
    product,
  })
})

// get products by list of ids
exports.getProductsByIds = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find({ _id: { $in: req.body.ids } })

  res.status(200).json({
    success: true,
    products,
  })
})

// update product - Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler('Product Not Found', 404))
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    product,
  })
})

// Delete Product - Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler('Product Not Found', 404))
  }

  await product.remove()

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  })
})

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const productId = req.body.productId
  const product = await Product.findById(productId)
  if (!product) {
    return next(new ErrorHandler('Product not found with given ID'))
  }
  await RateReview.updateOne(
    { userId: req.user._id, productId },
    {
      userId: req.user._id,
      productId,
      rating: req.body.rating,
      valueForMoney: req.body.valueForMoney,
      quality: req.body.quality,
      shipping: req.body.shipping,
      delivery: req.body.delivery,
      comment: req.body.comment,
    },
    { upsert: true }
  )
  product.updateAverageRating()
  res.status(201).json({
    success: true,
  })
})

// Get all reviews of the product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const reviews = await RateReview.find({
    productId: req.query.productId,
  })
    .populate('userId', { _id: 1, name: 1 })
    .lean()
  res.status(200).json({
    success: true,
    reviews,
  })
})

// Get user reviews
exports.getUserReviews = catchAsyncErrors(async (req, res, next) => {
  const reviews = await RateReview.find({
    userId: req.user._id,
  }).lean()
  res.status(200).json({
    success: true,
    reviews,
  })
})

// Delete a review of the product
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const doc = await RateReview.findById(req.query.reviewId)
  await doc.delete()
  try {
    const product = await Product.findById(doc.productId)
    product.updateAverageRating()
  } catch (err) {
    console.log('deleteReview', err)
  }
  res.status(200).json({
    success: true,
  })
})
