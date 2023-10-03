const ProductCategory = require('../models/ProductCategoryModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

// create Category :- POST
exports.handleCreateCategory = catchAsyncErrors(async (req, res, next) => {
  const { name, categoryCode } = req.body

  // Checking if name and categoryCode are provided
  if (!name || !categoryCode) {
    return res.status(400).json({
      error: 'Name and categoryCode are required fields.',
    })
  }

  // Checking if category with the same name or categoryCode already exists
  const existingCategory = await ProductCategory.findOne({
    $or: [{ name }, { categoryCode }],
  })

  if (existingCategory) {
    return res.status(400).json({
      error: 'Category with the same name or categoryCode already exists.',
    })
  }

  try {
    const newCategory = await ProductCategory.create({
      name,
      categoryCode,
    })

    res.status(200).json({
      success: true,
      message: `${name} Category created successfully`,
      NewCategory: newCategory,
    })
  } catch (error) {
    res.status(400).json({
      error: error.message,
    })
  }
})

// Get All Categories :- GET
exports.handleGetAllCategory = catchAsyncErrors(async (req, res, next) => {
  const cats = await ProductCategory.find()
  if (!cats) return next(new ErrorHandler('Something went wrong', 500))
  res.status(200).json({
    success: true,
    productCategories: cats,
  })
})

// Get A Categories Details :- GET
exports.handleGetCategoryDetail = catchAsyncErrors(async (req, res, next) => {
  const categoryId = req.params.id

  try {
    const category = await ProductCategory.findById(categoryId)

    if (!category) {
      return next(
        new ErrorHandler(`Category with this id:-${categoryId} not found`, 404)
      )
    }

    return res.status(200).json({
      success: true,
      category,
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// Update a Categories Details :- PUT
exports.handleUpdateCategoryDetail = catchAsyncErrors(
  async (req, res, next) => {
    const categoryId = req.params.id
    const updatedFields = req.body

    // Checking if name is provided and is an empty string
    if ('name' in updatedFields && updatedFields.name === '') {
      return res.status(400).json({
        error: 'Name cannot be an empty string.',
      })
    }

    // Checking if categoryCode is provided and is an empty string
    if ('categoryCode' in updatedFields && updatedFields.categoryCode === '') {
      return res.status(400).json({
        error: 'Category code cannot be an empty string.',
      })
    }

    const updateObject = {
      $set: updatedFields,
    }

    try {
      const updatedCategory = await ProductCategory.findByIdAndUpdate(
        categoryId,
        updateObject,
        {
          new: true,
        }
      )

      if (!updatedCategory) {
        return res.status(404).json({
          error: 'Category not found.',
        })
      }

      res.status(200).json({
        success: true,
        message: 'Updating Category successful',
        updateCategory: updatedCategory,
      })
    } catch (error) {
      res.status(400).json({
        error: error.message,
      })
    }
  }
)

// Delete a Categories:- DELETE
exports.handleDeleteCategory = catchAsyncErrors(async (req, res, next) => {
  const categoryId = req.params.id

  if (!categoryId) {
    return next(new ErrorHandler(`not found`, 404))
  }

  const category = await ProductCategory.findByIdAndRemove(categoryId)

  // error handle
  if (!category) {
    return next(new ErrorHandler(`${categoryId} not found`, 404))
  }

  res.status(200).json({
    success: true,
    message: `Category Removed Successfully`,
  })
})
