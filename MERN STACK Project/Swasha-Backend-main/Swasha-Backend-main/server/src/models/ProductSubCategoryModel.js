const mongoose = require('mongoose')
const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sellLimit: { type: Number, default: 20 },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductCategory',
      required: true,
    },
  },
  { versionKey: false }
)
const ProductSubCategory = mongoose.model(
  'productSubCategory',
  subCategorySchema,
  'productSubCategories'
)
module.exports = ProductSubCategory
