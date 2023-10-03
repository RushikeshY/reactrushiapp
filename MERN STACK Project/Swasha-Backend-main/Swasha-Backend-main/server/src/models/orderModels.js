const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Product = require('./productModel')
const moment = require('moment-timezone')

const {
  ORDER_CREATED,
  ORDER_SHIPPED,
  ORDER_DELIVERED,
  ORDER_CANCELLED,
  ORDER_RETURNED,
  ORDER_PENDING_DELETE,
  ORDER_PROCESSING,
  PAYMENT_PAID,
  PAYMENT_UNPAID,
  PAYMENT_METHOD_COD,
  PAYMENT_METHOD_GATEWAY,
} = require('../utils/constants')

// Define sub-schemas
const productSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    // not to be sent by client, populated by the server to keep track of price at which the product is bought.
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
)

// Define order schema
const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [productSchema],
    shippingAddress: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
      required: true,
    },
    totalPrice: {
      type: Number,
    },
    orderId: {
      type: String,
    },
    orderStatus: {
      type: String,
      enum: [
        ORDER_CREATED,
        ORDER_PROCESSING,
        ORDER_SHIPPED,
        ORDER_DELIVERED,
        ORDER_CANCELLED,
        ORDER_PENDING_DELETE,
        ORDER_RETURNED,
      ],
      default: ORDER_CREATED,
      required: true,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    isCancelledRequestRaise: {
      type: Boolean,
      default: false,
    },
    cancellationReason: {
      type: String,
      maxLength: [50, 'Name cannot exceed 50 characters'],
    },
    cancelledAt: {
      type: String,
    },
    trackingLink: {
      type: String,
    },
    shippedAt: {
      type: String,
    },
    returnReason: {
      type: String,
      maxLength: [50, 'Name cannot exceed 50 characters'],
    },
    // ---------------------If a person cancel the order and chosen payment Gateway on this case, refund status will work Start-----------------------
    cancelRefundStatus: {
      type: String,
    },
    cancelRefundInitiatedAt: {
      type: String,
    },
    // ---------------------payment related info Start-----------------------
    paymentStatus: {
      type: String,
      enum: [PAYMENT_PAID, PAYMENT_UNPAID],
      default: PAYMENT_UNPAID,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: [PAYMENT_METHOD_COD, PAYMENT_METHOD_GATEWAY],
      default: PAYMENT_METHOD_COD,
      required: true,
    },
    razorpay: {
      paymentId: {
        type: String,
      },
      orderId: {
        type: String,
      },
      signature: {
        type: String,
      },
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
)

orderSchema.index({ createdAt: 1 })

// Method for calculating total Order price -
orderSchema.methods.calculatePrice = async function () {
  try {
    const productIds = this.products.map((p) => p.id)

    const products = await Product.find({ _id: { $in: productIds } })

    // Calculate the total price
    let totalPrice = 0
    this.products.forEach((orderProduct) => {
      const product = products.find((p) => p._id.equals(orderProduct.id))
      if (product) {
        totalPrice += product.sellingPrice * orderProduct.quantity
        orderProduct.price = product.sellingPrice
      }
    })

    // Update the totalPrice in the order schema
    this.totalPrice = totalPrice
  } catch (error) {
    console.error('Error calculating price:', error)
    throw error
  }
}

orderSchema.methods.requestCancellation = async function (reason) {
  // Checking if the orderStatus allows cancellation
  if (
    this.orderStatus !== ORDER_CREATED &&
    this.orderStatus !== ORDER_PENDING_DELETE &&
    this.orderStatus !== ORDER_PROCESSING
  ) {
    throw new Error('Order cannot be canceled at this stage.')
  }

  // Update isCancelledRequestRaise and cancellationReason fields
  this.isCancelledRequestRaise = true
  this.cancellationReason = reason
  // this.cancelledAt = nowIST.toISOString();
  this.cancelledAt = moment()

  // Update the orderStatus to canceled
  // this.orderStatus = ORDER_CANCELLED

  try {
    await this.updateOne({ orderStatus: ORDER_CANCELLED })
  } catch (error) {
    console.error('Error saving order:', error)
    throw error
  }
}

orderSchema.methods.requestReturn = async function (reason) {
  // Check if the orderStatus allows return
  if (this.orderStatus !== ORDER_DELIVERED) {
    throw new Error('Return request can only be raised for delivered orders.')
  }

  // Update isReturnRequestRaise and returnReason fields
  this.isReturnRequestRaise = true
  this.returnReason = reason

  try {
    await this.save()
  } catch (error) {
    console.error('Error saving order:', error)
    throw error
  }
}

module.exports = mongoose.model('Order', orderSchema)
