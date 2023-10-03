const Return = require('../models/returnModel')
const Order = require('../models/orderModels')
const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const { RETURN_APPROVED, RETURN_REJECTED,REFUND_INITIATED} = require('../utils/constants')
const moment = require('moment-timezone')
const footerHTML = require('../utils/emailtemplate/emailfooter')
const headerHTML = require('../utils/emailtemplate/emailheader')

// <--- createReturn -- user --->
exports.createReturn = catchAsyncErrors(async (req, res, next) => {
  const { orderId, returnItems } = req.body
  if (!orderId || !returnItems) {
    return next(new ErrorHandler(`Invalid request body`, 400))
  }

  // const totalAmount = await calculatePrice()

  const returnObject = await Return.create({
    user: req.user._id,
    orderId,
    return_date: new Date(),
    returnItems,
    returnTrackingLink: '',
  })

  try {
    await returnObject.save()
  } catch (error) {
    return res.status(500).json({ message: 'Error saving return object' })
  }

  res.status(201).json({
    success: true,
    message: 'Your return request is raised',
    returnObject,
  })
  await sendOrderReturnEmail(orderId, req.user)
})

// <--- getAllReturns -- User --->
exports.getAllReturnsUser = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id

  if (!userId) {
    return next(new ErrorHandler(`Invalid user ID`, 404))
  }

  // const userReturns = await Return.find().populate('orderId')
  const userReturns = await Return.find({ user: userId }).sort({
    createdAt: -1,
  })

  // if (!userReturns || userReturns.length === 0) {
  //   return res.status(404).json({
  //     success: false,
  //     message: 'Return request not found',
  //   })
  // }

  res.status(200).json({
    success: true,
    userReturns,
  })
})

// <--- getReturnById -- GET return by ID --->
exports.getReturnById = catchAsyncErrors(async (req, res, next) => {
  const returnId = req.params.id

  const returnDetails = await Return.findById(returnId)
  // const returnDetails = await Return.findById(returnId).populate('orderId')

  if (!returnDetails) {
    return res.status(404).json({
      success: false,
      message: 'Return request not found',
    })
  }

  res.status(200).json({
    success: true,
    returnDetails,
  })
})

// <--- getAllReturns -- Admin --->
exports.getAllReturnsAdmin = catchAsyncErrors(async (req, res, next) => {
  const returns = await Return.find({}).populate('user').exec()

  res.status(200).json({
    success: true,
    returns,
  })
})

//----------------------test---------------------
// exports.handleApproveRejectReturn = catchAsyncErrors(async (req, res, next) => {
//   const returnId = req.params._id
//   const { itemId, status, trackingLink, reasonForReject } = req.body

//   const returnRequest = await Return.findById(returnId)
//   // console.log(returnRequest)

//   if (!returnRequest) {
//     return res.status(404).json({
//       success: false,
//       message: 'Return request not found',
//     })
//   }

//   const returnItem = returnRequest.returnItems.find(
//     (item) => item._id.toString() === itemId
//   )

//   if (!returnItem) {
//     return res.status(404).json({
//       success: false,
//       message: 'Return item not found',
//     })
//   }

//   returnItem.status = status

//   // If status is "return_approve," add the tracking link
//   if (status === 'return_approve') {
//     returnItem.returnTrackingLink = trackingLink
//   }

//   // If status is "return_reject," add the reason for rejection
//   if (status === 'return_reject') {
//     returnItem.reasonForReject = reasonForReject
//   }

//   // Save the updated return request
//   await returnRequest.save()

//   res.status(200).json({
//     success: true,
//     message: 'Return item status updated successfully',
//     returnItem,
//   })
// })
//----------------------test---------------------

// <--- approveReturn -- admin --->
exports.handleApproveReturn = catchAsyncErrors(async (req, res, next) => {
  const { returnId, itemId } = req.params
  const { trackingLink } = req.body

  const returnRequest = await Return.findById(returnId)

  if (!returnRequest) {
    return res.status(404).json({
      success: false,
      message: 'Return request not found',
    })
  }

  const returnItem = returnRequest.returnItems.find(
    (item) => item._id.toString() === itemId
  )
  // console.log(returnItem)

  if (!returnItem) {
    return res.status(404).json({
      success: false,
      message: 'Return item not found',
    })
  }

  returnItem.status = RETURN_APPROVED

  returnItem.returnTrackingLink = trackingLink

  await returnRequest.save()

  res.status(200).json({
    success: true,
    message: 'Return item status updated to "RETURN_APPROVED" successfully',
    returnItem,
  })
})

// <--- rejectReturn -- admin --->
exports.handleRejectReturn = catchAsyncErrors(async (req, res, next) => {
  const { returnId, itemId } = req.params
  const reasonForReject = req.body.reasonForReject

  const returnRequest = await Return.findById(returnId)

  if (!returnRequest) {
    return res.status(404).json({
      success: false,
      message: 'Return request not found',
    })
  }

  const returnItem = returnRequest.returnItems.find(
    (item) => item._id.toString() === itemId
  )

  if (!returnItem) {
    return res.status(404).json({
      success: false,
      message: 'Return item not found',
    })
  }

  returnItem.status = RETURN_REJECTED

  returnItem.reasonForReject = reasonForReject

  await returnRequest.save()

  res.status(200).json({
    success: true,
    message: 'Return item status updated to "RETURN_REJECTED" successfully',
    returnItem,
  })
})

// <--- deleteReturn -- admin --->
exports.deleteReturn = catchAsyncErrors(async (req, res, next) => {
  const Returns = await Return.findById(req.params.id).populate()

  if (!Returns) {
    return next(new ErrorHandler('Order not found with this Id', 404))
  }

  await Returns.remove()

  res.status(200).json({
    success: true,
    message: 'Return has been deleted',
  })
})

// <--- returnRefundInitiated -- admin --->
exports.handleReturnRefundInitiated = catchAsyncErrors(async (req, res, next) => {
  const { returnId, itemId } = req.params

  const refundRequest = await Return.findById(returnId)

  if (!refundRequest) {
    return res.status(404).json({
      success: false,
      message: 'Return request not found',
    })
  }

  const returnItem = refundRequest.returnItems.find(
    (item) => item._id.toString() === itemId
  )
  // console.log(returnItem)

  if (!returnItem) {
    return res.status(404).json({
      success: false,
      message: 'Return item not found',
    })
  }

  returnItem.status = REFUND_INITIATED
  returnItem.returnRefundInitiatedAt = moment()

  await refundRequest.save()

  res.status(200).json({
    success: true,
    message: 'Return item status updated to "RETURN_Initiated" successfully',
    returnItem,
  })
})

//Return Request conformaition email

async function sendOrderReturnEmail(orderID, user) {
  const { email, name } = user

  const emailSubject = `Return Request Confirmation - ID (${orderID})`;

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

// -------------------Do not delete or uncommented this commended function---------------------

// <--- handleStatus -- admin --->
// exports.handleStatus = catchAsyncErrors(async (req, res, next) => {
//   const newStatus = req.body.status
//   const updatedFields = { status: newStatus }

//   // Validate returnRefundStatus
//   if (!newStatus) {
//     throw new Error(`return/Refund Status is required`)
//   }

//   switch (newStatus) {
//     case 'return_requested':
//       updatedFields.isReturnRequestRaise = true
//       updatedFields.returnRequestRaiseAt = new Date()
//       break
//     case 'return_approved':
//       const returnTrackingLink = req.body.returnTrackingLink
//       if (returnTrackingLink) {
//         updatedFields.returnRefundStatus = returnTrackingLink
//       } else {
//         return next(
//           new ErrorHandler(
//             `Return Tracking link is required when returnRefund is approved`
//           )
//         )
//       }
//       break
//     default:
//       return next(new ErrorHandler(`Invalid returnRefundStatus`, 404))
//   }

//   const updatedOrder = await Order.findByIdAndUpdate(
//     req.params.id,
//     { $set: updatedFields },
//     {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     }
//   )

//   if (!updatedOrder) {
//     return next(new ErrorHandler(`Order not found`, 404))
//   }

//   res.status(200).json({
//     updatedOrder,
//     success: true,
//     message: 'Return/Refund Status is updated successfully',
//   })
// })

// --------------------getReturnRequestDetails----------------------
// exports.getReturnRequestDetails = catchAsyncErrors(async (req, res, next) => {
//   const returnId = req.params.returnId

//   // Find the return request with the given ID in MongoDB.
//   const returnRequest = await returnRequest.findOne({ _id: returnId })

//   // If the return request not found, return an error response.
//   if (!returnRequest) {
//     return res.status(404).json({
//       success: false,
//       message: 'Return request not found.',
//     })
//   }

//   // Return the return request details to the client.
//   return res.status(200).json({
//     success: true,
//     returnDetails: returnRequest,
//   })
// })

