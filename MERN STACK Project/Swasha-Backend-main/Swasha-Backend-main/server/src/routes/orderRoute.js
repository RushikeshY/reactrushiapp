const express = require('express')
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  deleteOrder,
  initiateDelivery,
  handleOrderStatus,
  submitCancellationRequest,
  handleCancelRefundStatus,
} = require('../controllers/orderController')

const router = express.Router()
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

router.route('/order/new').post(isAuthenticatedUser, newOrder)

router
  .route('/order/initiateDelivery')
  .post(isAuthenticatedUser, initiateDelivery)

router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder)

router
  .route('/order/cancel/:id')
  .put(isAuthenticatedUser, submitCancellationRequest)



router.route('/orders/me').get(isAuthenticatedUser, myOrders)

router
  .route('/admin/orders')
  .get(isAuthenticatedUser, authorizeRoles('vendor', 'admin'), getAllOrders)

router
  .route('/admin/order/:id')
  .post(
    isAuthenticatedUser,
    authorizeRoles('vendor', 'admin'),
    handleOrderStatus
  )
  .delete(isAuthenticatedUser, authorizeRoles('vendor', 'admin'), deleteOrder)

router
  .route('/admin/cancel-refund-status/:id')
  .post(
    isAuthenticatedUser,
    authorizeRoles('vendor', 'admin'),
    handleCancelRefundStatus
  )

module.exports = router

// ORDER APIs

// For User:-
// newOrder ✅
// getSingleOrder ✅
// myOrders ✅
// submitCancellationRequest ✅

// For Admin:-
// getAllOrders ✅
// handleOrderStatus ✅
// handleReturnRefundStatus
// updateOrderManageStock ✅
// deleteOrder ✅

// router
//   .route('admin/return/:id')
//   .post(
//     isAuthenticatedUser,
//     authorizeRoles('vendor', 'admin'),
//     handleReturnRefundStatus
//   )
