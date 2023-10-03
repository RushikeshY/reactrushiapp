const Order = require('../models/orderModels')
const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const Razorpay = require('razorpay')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')
const headerHTML = require('../utils/emailtemplate/emailheader')
const footerHTML = require('../utils/emailtemplate/emailfooter')
const {
  ORDER_SHIPPED,
  ORDER_DELIVERED,
  PAYMENT_PAID,
  PAYMENT_METHOD_GATEWAY,
  ORDER_CREATED,
  ORDER_PROCESSING,
  ORDER_CANCELLED,
  REFUND_INITIATED,
  REFUND_HOLD,
  REFUND_COMPLETED,
  REFUND_CANCELLED,
} = require('../utils/constants')

const moment = require('moment-timezone')
const nowIST = moment.tz('Asia/Kolkata')

const RazorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY_TEST,
  key_secret: process.env.RAZORPAY_API_SECRET_TEST,
})

// TODO: deal with the case when for some reason the client has completed the payment but could not request delivery.
exports.initiateDelivery = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.body.orderId)

  // verify payment signature
  const hash = crypto
    .createHmac('sha256', process.env.RAZORPAY_API_SECRET_TEST)
    .update(order.orderId + '|' + req.body.razorpay_payment_id)
    .digest('hex')
  if (hash !== req.body.razorpay_signature) {
    next(new ErrorHandler('Payment signature verification failed', '401'))
  }

  order.paymentMethod = PAYMENT_METHOD_GATEWAY
  order.paymentStatus = PAYMENT_PAID
  // order.isDelivered = true

  order.razorpay = {
    paymentId: req.body.razorpay_payment_id,
    orderId: order.orderId,
    signature: hash,
  }

  await order.save()

  res.status(200).json(order)
})

// create / place a order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    products,
    shippingAddress,
    totalPrice,
    orderStatus,
    orderId,
    paymentStatus,
    paymentMethod,
  } = req.body

  //   const totalPrice = await

  const order = await Order.create({
    products,
    shippingAddress,
    totalPrice,
    orderStatus,
    orderId,
    paymentStatus,
    paymentMethod,
    user: req.user._id,
  })

  await order.calculatePrice()
  const rz = await RazorpayInstance.orders.create({
    // amount: parseFloat(order.totalPrice) * 100,
    amount: parseInt(order.totalPrice) * 100,
    currency: 'INR',
    receipt: order._id,
  })
  order.orderId = rz.id

  await order.save()

  await sendOrderConfirmationEmail(order, req.user)

  res.status(201).json({
    success: true,
    message: 'New order Created successfully',
    order,
  })

  for (const ord of order.products) {
    await updateStock(ord.id, ord.quantity)
  }
})

// get a detail of single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (!order) {
    return next(
      new ErrorHandler(`Order is not found with ${req.param.id} id`, 404)
    )
  }

  res.status(201).json({
    success: true,
    order,
  })
})

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id

  if (!userId) {
    return next(new ErrorHandler(`Invalid user ID`, 404))
  }

  const orders = await Order.find({ user: userId }).sort({
    createdAt: -1,
  })

  if (orders.length === 0) {
    return next(new ErrorHandler(`No orders found for this user`, 404))
  }

  // const orders = await Order.find({ user: userId }).sort({
  //   createdAt: -1,
  // })
  // const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  })
})

// ---------------cancellation Request----------------------
exports.submitCancellationRequest = catchAsyncErrors(async (req, res, next) => {
  const orderId = req.params.id
  const { cancellationReason } = req.body

  // Fetch the current order
  const currentOrder = await Order.findById(orderId)

  if (!currentOrder) {
    return next(new ErrorHandler(`Order not found`, 404))
  }

  // Checking if a cancellation reason is provided or not.
  if (cancellationReason) {
    // Using requestCancellation method to handle cancellation, which is present in orderSchema.
    try {
      await currentOrder.requestCancellation(cancellationReason)
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      })
    }
  }

  await currentOrder.save()

  currentOrder.paymentMethod === 'cashOnDelivery'
    ? await sendOrderCancellationEmailCOD(currentOrder, req.user)
    : await sendOrderCancellationEmailPrePaid(currentOrder, req.user)

  res.status(200).json({
    updatedOrder: currentOrder,
    success: true,
    message: 'Cancellation request submitted successfully',
  })
})

// Admin Api start ---------------------------------------------------------------->
// get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find()
    .populate('user')
    .populate({ path: 'products', populate: { path: 'id' } })
    .populate('shippingAddress')

  let totalAmount = 0

  orders.forEach((order) => {
    totalAmount += order.totalPrice
  })

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  })
})

// -------------------handleOrderStatus -> ADMIN---------------------------
exports.handleOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const newOrderStatus = req.body.orderStatus
  console.log(req.body)
  const updatedFields = { orderStatus: newOrderStatus }

  if (newOrderStatus === 'shipped') {
    const trackingLink = req.body.trackingLink
    if (trackingLink) {
      updatedFields.trackingLink = trackingLink
      updatedFields.shippedAt = moment().format()

      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { $set: updatedFields },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      )

      if (!updatedOrder) {
        return next(new ErrorHandler(`Order not found`, 404))
      }

      // Updating the stock for each product in the order
      /* for (const ord of updatedOrder.products) {
         await updateStock(ord.id, ord.quantity)
      } */

      res.status(200).json({
        updatedOrder,
        success: true,
        message: 'Order Status is updated successfully',
      })
    } else {
      return next(
        new ErrorHandler(
          `Tracking link is required when the order is shipped`,
          404
        )
      )
    }
  }

  if (newOrderStatus === 'delivered') {
    updatedFields.isDelivered = true
    updatedFields.deliveredAt = new Date()
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    { $set: updatedFields },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  )

  if (!updatedOrder) {
    return next(new ErrorHandler(`Order not found`, 404))
  }
  if( newOrderStatus=="shipped"){
    await sendOrderTrackingEmail(updatedOrder, req.body.orderUser)
  }
  if( newOrderStatus=="delivered"){
    await sendOrderDeliveredEmail(updatedOrder, req.body.orderUser)
  }
  
  
  res.status(200).json({
    updatedOrder,
    success: true,
    message: 'Order Status is updated successfully',
  })
})

// -------------------handleOrderStatus---------------------------


async function updateStock(id, quantity) {
  try {
    const product = await Product.findById(id)

    if (!product) {
      throw new Error('Product not found')
    }

    product.stock -= quantity

    await product.save({ validateBeforeSave: false })
  } catch (error) {
    throw error
  }
}

exports.handleCancelRefundStatus = catchAsyncErrors(async (req, res, next) => {
  const newCancelRefundStatus = req.body.cancelRefundStatus
  console.log(newCancelRefundStatus)
  const order = await Order.findById(req.params.id)

  // Check if the order exists.
  if (!order) {
    return next(new ErrorHandler('Order not found with this Id', 404))
  }

  // Checking if the order is eligible for cancellation and refund.
  if (
    // order.orderStatus !== ORDER_SHIPPED &&
    order.orderStatus !== ORDER_CANCELLED &&
    order.paymentMethod !== PAYMENT_METHOD_GATEWAY
  ) {
    return next(
      new ErrorHandler(
        'Order is not eligible for cancellation and refund.',
        404
      )
    )
  }

  // Checking if the cancelRefundStatus is valid.
  if (
    ![
      REFUND_INITIATED,
      REFUND_COMPLETED,
      REFUND_HOLD,
      REFUND_CANCELLED,
    ].includes(newCancelRefundStatus)
  ) {
    return next(new ErrorHandler('Invalid cancelRefundStatus', 400))
  }

  // Updating the cancelRefundStatus of the order.
  order.cancelRefundStatus = newCancelRefundStatus
  order.cancelRefundInitiatedAt =  moment()
  await order.save()

  return res.status(200).json({
    success: true,
    message: 'Cancel refund status updated successfully.',
  })
})

// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate()

  if (!order) {
    return next(new ErrorHandler('Order not found with this Id', 404))
  }

  await order.remove()

  res.status(200).json({
    success: true,
    message: 'Order has been deleted',
  })
})

// // To send email when order is dispatched.
// async function sendOrderDispatchedEmail(order, user) {
//   const { email, name } = user;
//   const orderID = order.orderId;

//   const emailSubject = `${name}, Your Order (#${orderID}) is Dispatched`;

//   const html = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Order Dispatched</title>
//
//     </head>
//     <body>
//         <div>
//             ${headerHTML}

//             <p>Dear ${name},</p>
//             <p>We are glad to inform you that your order with ID #${orderID} has been successfully dispatched. Please click on the button below to track your order.</p>
//             <a href="Tracking Link" style="text-decoration: none; background-color: #003C7A; color: #ffffff; padding: 10px 20px; border-radius: 5px; display: inline-block; margin-top: 15px;">Track Order</a>
//             <p>You can also track your order from your Swasha account by navigating to the “My Orders” Section. We look forward to delivering your order. Thank you for choosing Swasha.</p>
//             <p>For any queries related to your order, please write to us at orders@swasha.org</p>
//             <p>Best Wishes,<br>Swasha Team</p>
//             ${footerHTML}
//         </div>
//     </body>
//     </html>
//   `;

//   try {
//     await sendEmail({
//       email,
//       subject: emailSubject,
//       html: html,
//     });

//     console.log(`Order dispatched email sent to ${email}`);
//   } catch (error) {
//     console.error('Error sending order dispatched email:', error.message);
//   }
// };

// cancellation email for COD
async function sendOrderCancellationEmailCOD(currentOrder, user) {
  const { email, name } = user
  const orderID = currentOrder.orderId

  const emailSubject = 'Order Cancellation Confirmation - ID (${orderID})'

  const html = `${headerHTML} 
            <p>Dear ${name},</p>
            <p>This is to confirm that your Order with ID (<strong>#${orderID}</strong>) has been canceled at your request. Thank you for considering Swasha for your online purchase.</p>
            <p>For any queries related to your order, please write an email to orders@swasha.org. We hope to serve you again.</p>
            <p>Best Wishes,<br>Swasha Team</p>
            ${footerHTML}`

  try {
    await sendEmail({
      email,
      subject: emailSubject,
      html: html,
    })

    console.log(`Order cancellation confirmation email sent to ${email}`)
  } catch (error) {
    console.error(
      'Error sending order cancellation confirmation email:',
      error.message
    )
  }
}

//  cancellation email for PrePaid
async function sendOrderCancellationEmailPrePaid(currentOrder, user) {
  const { email, name } = user
  const orderID = currentOrder.orderId

  const emailSubject = `Order Cancellation Confirmation - ID (${orderID})`;

  const html = `${headerHTML} 
            <p>Dear ${name},</p>
            <p>This is to confirm that your Order with ID (<strong>#${orderID}</strong>) has been canceled at your request. The refund will be initiated within 15 business days.</p>
            <p>Thank you for considering Swasha for your online purchase.</p>
            <p>For any queries related to your order, please write an email to orders@swasha.org. We hope to serve you again.</p>
            <p>Best Wishes,<br>Swasha Team</p>
            ${footerHTML}`

  try {
    await sendEmail({
      email,
      subject: emailSubject,
      html: html,
    })

    console.log(`Order cancellation confirmation email sent to ${email}`)
  } catch (error) {
    console.error(
      'Error sending order cancellation confirmation email:',
      error.message
    )
  }
}

//Return Request conformaition email

async function sendOrderReturnEmail(order, user) {
  const { email, name } = user
  const orderID = order.orderId

  const emailSubject = `Return Request Confirmation - ID(${orderID})`;

  const html = `${headerHTML} 
            <p>Dear ${name},</p>
            <p>We have received your return request for the order ID (<strong>#${orderID}</strong>). Our team will reach out to you at the earliest for further proceedings.</p>
            <p>For any queries related to this order, please write an email to orders@swasha.org.</p>
            <p>Best Wishes,<br>Swasha Team</p>
            ${footerHTML}`

  try {
    await sendEmail({
      email,
      subject: emailSubject,
      html: html,
    })

    console.log(`Return request confirmation email sent to ${email}`)
  } catch (error) {
    console.error(
      'Error sending return request confirmation email:',
      error.message
    )
  }
}

//order confirmation Email

async function sendOrderConfirmationEmail(order, user) {
  const { email, name } = user

  const emailSubject = `${name}, Your Order is Received - ID(${order.orderId})`

  const html = `${headerHTML} 
            <p>Dear ${name},</p>
            <p>We are pleased to receive your order. Your order ID is  <strong>${order.orderId}</strong>. You will receive another Email with tracking information as soon as we dispatch your order.</p>
            <p>Heartfelt Thanks for choosing Swasha for your purchase. With every purchase you make in Swasha, you support people from underprivileged communities to live with pride and self respect.</p>
            <p>For any queries related to your order, please write to us at orders@swasha.org</p>
            <p>Best Wishes,<br>Swasha Team</p>
            ${footerHTML}`

  try {
    await sendEmail({
      email,
      subject: emailSubject,
      html: html,
    })

    console.log(`Order confirmation email sent to ${email}`)
  } catch (error) {
    console.error('Error sending order confirmation email:', error.message)
  }
}

//order shipped Email

async function sendOrderTrackingEmail(order, user) {
  const { email, name } = user

  const emailSubject = `${name}, Your Order is Dispatched - ID(${order.orderId})`

  const html = `${headerHTML}
        <div style="padding-left:10px">           
            <p>Dear ${name},</p>
            <p>We are glad to inform you that your order with ID <strong>${order.orderId}</strong> has been successfully dispatched.</p>
            <button><a href="${order.trackingLink}"> Track Order <a> </button>
            <p>You can also track your order from your Swasha account by navigating to the “My Orders” Section. We look forward to delivering your order. Thank you for choosing Swasha.</p>
            <p>For any queries related to your order, please write to us at orders@swasha.org</p>
            <p>Best Wishes,<br>Swasha Team</p>
        </div>        
        ${footerHTML}`
  try {
    await sendEmail({
      email,
      subject: emailSubject,
      html: html,
    })

    console.log(`Order tracking email sent to ${email}`)
  } catch (error) {
    console.error('Error sending order confirmation email:', error.message)
  }
6}

//order delivered Email

async function sendOrderDeliveredEmail(order, user) {
  const { email, name } = user

  const emailSubject = `${name}, Your Order is Dispatched - ${order.orderId}`

  const html = `${headerHTML}
        <div style="padding-left:10px">           
            <p>Dear ${name},</p>
            <p>We are happy to inform you that we have successfully delivered your order with ID <strong>${order.orderId}</strong> to the specified address. We hope that you are satisfied with the products you received and would appreciate your valuable feedback. This helps us improve our services and products.
            </p>
            <button><a href="https://swasha.org/user/profile/#My%20Reviews"> Provide Feedback  <a> </button>
            <p>For any queries related to your order, please write to us at orders@swasha.org</p>
            <p>Best Wishes,<br>Swasha Team</p>
            ${footerHTML}`

  try {
    await sendEmail({
      email,
      subject: emailSubject,
      html: html,
    })

    console.log(`Order confirmation email sent to ${email}`)
  } catch (error) {
    console.error('Error sending order confirmation email:', error.message)
  }
}
// ---------------return Request----------------------
// exports.submitReturnRequest = catchAsyncErrors(async (req, res, next) => {
//   const orderId = req.params.id
//   const { returnReason } = req.body
//   const currentOrder = await Order.findById(orderId)

//   if (!currentOrder) {
//     return next(new ErrorHandler(`Order not found`, 404))
//   }

//   if (returnReason) {
//     try {
//       await currentOrder.requestReturn(returnReason)
//     } catch (error) {
//       return res.status(400).json({
//         success: false,
//         message: error.message,
//       })
//     }
//   }
//   await currentOrder.save()

//   await sendOrderReturnEmail(currentOrder, req.user)

//   res.status(200).json({
//     updatedOrder: currentOrder,
//     success: true,
//     message: 'Refund request submitted successfully',
//   })
// })
