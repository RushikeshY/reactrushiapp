const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
const rateReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    productId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    valueForMoney: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    quality: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    shipping: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    delivery: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      default: '',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

rateReviewSchema.index({ userId: 1, productId: 1 }, { unique: true })

const rateReviewModel = mongoose.model(
  'RateReview',
  rateReviewSchema,
  'RateReview'
)

// rateReviewModel.createIndexes()
rateReviewModel.createIndexes({ timeout: 60000 })


// Export the model
module.exports.RateReview = rateReviewModel