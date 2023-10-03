const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    categoryCode: {
      type: String,
      required: [
        true,
        'Please put some relevent code which refer category name',
      ],
      unique: true,
    },
  },
  { versionKey: false }
)
const ProductCategory = mongoose.model(
  'productCategory',
  categorySchema,
  'productCategories'
)
module.exports = ProductCategory
