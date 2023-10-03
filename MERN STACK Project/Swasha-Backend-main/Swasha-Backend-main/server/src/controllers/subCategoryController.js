const ProductSubCategory = require('../models/ProductSubCategoryModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

// create sub categories
exports.handleCreateSubcategory = catchAsyncErrors(async (req, res, next) => {
  const { name, sellLimit, categoryId } = req.body

  try {
    const newSubCategory = await ProductSubCategory.create({
      name,
      sellLimit,
      categoryId,
    })

    res.status(200).json({
      success: true,
      message: `${name} subCategory created successfully`,
      New_SubCategory: newSubCategory,
    })
  } catch (error) {
    res.status(400).json({
      error: error.message,
    })
  }
})

// Get product Sub categories
exports.getProductSubCategories = catchAsyncErrors(async (req, res, next) => {
  const subCategory = await ProductSubCategory.find()
  if (!subCategory) return next(new ErrorHandler('Something went wrong', 500))
  res.status(200).json({
    success: true,
    productSubCategories: subCategory,
  })
})

// get sub-category list by categoryId
exports.handleIndividualSubCategory = catchAsyncErrors(
  async (req, res, next) => {
    const categoryId = { categoryId: req.params.id }
    try {
      const productSubCategories = await ProductSubCategory.find(categoryId)

      return res.status(200).json({
        success: true,
        productSubCategories,
      })
    } catch (error) {
      console.error('Error fetching subcategories:', error)
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      })
    }
  }
)

// update a sub-category by id - handleUpdatingSubcategory
exports.handleUpdatingSubcategory = catchAsyncErrors(async (req, res, next) => {
  const subCategoryId = req.params.id
  const updatedFields = req.body

  const updateObject = {
    $set: updatedFields,
  }

  try {
    const updatedSubCategory = await ProductSubCategory.findByIdAndUpdate(
      subCategoryId,
      updateObject,
      {
        new: true,
      }
    )

    if (!updatedSubCategory) {
      res.status(400)
      throw new Error('User Not Found')
    }

    res.status(200).json({
      success: true,
      message: 'Updating sub-category successfully',
      updatedSubCategory,
    })
  } catch (error) {
    res.status(400).json({
      error: error.message,
    })
  }
})

// Deleting sub-category by id - handleDeleteSubcategory
exports.handleDeleteSubcategory = catchAsyncErrors(async (req, res, next) => {
  const subCategoryId = req.params.id

  try {
    const subCategory = await ProductSubCategory.findByIdAndRemove(
      subCategoryId
    )

    if (!subCategory) {
      return next(new ErrorHandler(`${subCategoryId} not found`, 404))
    }

    res.status(200).json({
      success: true,
      message: `subCategory Removed`,
    })
  } catch (error) {
    res.status(400).json({
      error: error.message,
    })
  }
})
