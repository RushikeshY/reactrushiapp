const mongoose = require('mongoose') // Erase if already required
const Schema = mongoose.Schema
const { RateReview } = require('./rateReviewModel')

// Define sub-schemas for price
// const priceSchema = new Schema(
//   {
//     sellingPrice: {
//       type: Number,
//       required:[true, 'Please enter the Actual Product Price'],
//       max: [1e8 - 1, 'Please cannot exceed 8 characters'],
//     },
//     mrp: {
//       type: Number,
//       required: [true, 'Please enter the Actual Product Price'],
//       max: [1e8 - 1, 'Please cannot exceed 8 characters'],
//     },
//   },
//   { _id: false }
// )

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema(
  {
    productTitle: {
      type: String,
      required: [true, 'Please enter the Product title'],
    },
    keywords: {
      type: [String],
      required: [
        true,
        'Please enter few keywords which is related to product, so that this will help in product searching',
      ],
    },
    productDecription: {
      type: String,
      required: [true, 'Please enter the Product Description'],
    },
    vtcCenter: {
      type: String,
    },
    colours: {
      type: Array,
    },
    // we can put as may as properties as key value pairs
    generalDetails: {
      type: Object, //{key:value}
    },
    sellingPrice: {
      type: Number,
      required: [true, 'Please enter the Actual Product Price'],
      max: [1e8 - 1, 'Please cannot exceed 8 characters'],
    },
    mrp: {
      type: Number,
      required: [true, 'Please enter the Actual Product Price'],
      max: [1e8 - 1, 'Please cannot exceed 8 characters'],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    productImagesUrl: {
      type: [String],
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'productCategory',
      required: true,
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    stock: {
      type: Number,
      required: [true, 'Please Enter product Stock'],
      max: [9999, 'Stock cannot exceed 9999'],
      default: 1,
    },
    numOfNStar: {
      type: [{ type: Number }],
      default: [0, 0, 0, 0, 0],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          required: false,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

productSchema.methods.updateAverageRating = async function () {
  const reviews = await RateReview.find({ productId: this._id }).lean()
  let avg = reviews.reduce((s, x) => s + x.rating, 0) / reviews.length
  this.numOfNStar = [0, 0, 0, 0, 0]
  reviews.forEach((x) => {
    this.numOfNStar[parseInt(x.rating) - 1]++
  })
  this.ratings = avg
  this.numOfReviews = reviews.length
  await this.save()
}

productSchema.index({ ratings: 1 })
productSchema.index({ price: 1 })
productSchema.index({ createdAt: 1 })

// Export the model
module.exports = mongoose.model('Product', productSchema)
