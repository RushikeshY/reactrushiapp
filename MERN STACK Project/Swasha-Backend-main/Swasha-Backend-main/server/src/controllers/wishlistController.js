const Wishlist = require('../models/wishlistModels')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

// Add a product to a user's wishlist:
exports.addToWishlist = catchAsyncErrors(async (req, res, next) => {
  const productId = req.body.productId
  const userId = req.user._id
  let wishlist;
  try {
    wishlist = await Wishlist.create({
      userId,
      productId,
    });
  } catch (err) {
    if (err.code !== 11000) throw err;
  }

  res.status(201).json({
    success: true,
    wishlist,
    message: 'Product added to your wishlist'
  })
})

// Get a user's wishlist:-
exports.getWishlist = catchAsyncErrors(async (req, res, next) => {
  const wishlist = await Wishlist.find({ userId: req.user._id })
  // console.log(req.user._id)
  if (!wishlist) {
    return next(new ErrorHandler('There is Product added in wishlist', 404))
  }

  res.status(201).json({
    success: true,
    wishlist
  })
})

// Remove a product from a user's wishlist:
exports.removeFromWishlist = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id
  const userId = req.user._id

  const wishlist = await Wishlist.findOneAndDelete({
    productId,
    userId
  })

  // console.log(wishlist)
  if (wishlist === null) {
    return next(
      new ErrorHandler('Already Removed or Item does not exist', 400)
    )
  }

  res.status(200).json({
    success: true,
    message: 'Product removed from your Wishlist'
  })
})
