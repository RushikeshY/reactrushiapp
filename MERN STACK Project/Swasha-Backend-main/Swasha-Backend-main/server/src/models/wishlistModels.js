const mongoose = require('mongoose') // Erase if already required
const Schema = mongoose.Schema

// Declare the Schema of the Mongo model
const wishlistSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    }
  },

  {
    versionKey: false,
    timestamps: true
  }
)

wishlistSchema.index({ userId: 1, productId: 1 }, { unique: true })

const wishlistModels = mongoose.model('wishlist', wishlistSchema)

// Export the model
module.exports = mongoose.model('wishlist', wishlistSchema)

wishlistModels.createIndexes()
