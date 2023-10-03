const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Product = require('./productModel')
const Order = require('./orderModels')
const {
  RETURN_NULL,
  RETURN_REQUESTED,
  RETURN_APPROVED,
  RETURN_REJECTED,
  RETURN_RECEIVED,
  REFUND_INITIATED,
  REFUND_HOLD,
} = require('../utils/constants')

const returnItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
    required: true,
  },
  reasonForReturn: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: [
      RETURN_REQUESTED,
      RETURN_APPROVED,
      RETURN_REJECTED,
      RETURN_RECEIVED,
      REFUND_INITIATED,
      REFUND_HOLD,
    ],
    default: RETURN_REQUESTED,
    required: true,
  },
  returnTrackingLink: {
    type: String,
  },
  reasonForReject: {
    type: String,
    // required: true,
  },
  returnRefundInitiatedAt: {
    type: String,
  },
})

const returnSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    returnDate: {
      type: Date,
    },
    returnItems: [returnItemSchema],
    refundAmount: { type: Number },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

returnSchema.methods.calculatePrice = async function () {
  try {
    const productIds = this.return_items.map((item) => item.product_id)

    const products = await Product.find({ _id: { $in: productIds } })

    // Calculate the total price
    let totalRefundPrice = 0
    this.return_items.forEach((returnItem) => {
      const product = products.find((p) => p._id.equals(returnItem.product_id))
      if (product) {
        totalRefundPrice += product.sellingPrice * returnItem.quantity
        returnItem.price = product.sellingPrice
      }
    })

    // Update the totalRefundPrice in the return schema
    this.refund_amount = totalRefundPrice
  } catch (error) {
    console.error('Error calculating price:', error)
    throw error
  }
}

module.exports = mongoose.model('Return', returnSchema)
