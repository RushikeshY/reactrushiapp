const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
const viewHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    productId: {
      type: mongoose.Types.ObjectId,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: { createdAt: '_ts' }
  }
)

viewHistorySchema.index({ userId: 1, productId: 1 }, { unique: true })
// viewHistorySchema.index({ updatedAt: 1 })
viewHistorySchema.index({ _ts: 1 }, { expires: '7d' })

const viewHistoryModel = mongoose.model(
  'ViewHistory',
  viewHistorySchema,
  'ViewHistory'
)

// Export the model
module.exports.ViewHistory = viewHistoryModel
