const mongoose = require('mongoose') // Erase if already required
const Schema = mongoose.Schema

// Declare the Schema of the Mongo model
const cartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  },

  {
    versionKey: false,
    timestamps: true
  }
)

cartSchema.index({ userId: 1, productId: 1 }, { unique: true })

const cartModels = mongoose.model('cart', cartSchema)

// Export the model
module.exports = mongoose.model('cart', cartSchema)

cartModels.createIndexes()
