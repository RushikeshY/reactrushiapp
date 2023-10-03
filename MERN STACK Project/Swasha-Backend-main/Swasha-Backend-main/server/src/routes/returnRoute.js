const express = require('express')
const router = express.Router()
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')
const {
  createReturn,
  getAllReturnsUser,
  getReturnById,
  deleteReturn,
  handleApproveReturn,
  handleRejectReturn,
  getAllReturnsAdmin,
  handleReturnRefundInitiated,
} = require('../controllers/returnController')

router.route('/return-order').post(isAuthenticatedUser, createReturn)
router.route('/my-returns/:id').get(isAuthenticatedUser, getAllReturnsUser)
//router.route('/my-returns').get(isAuthenticatedUser, getAllReturnsUser)
router.route('/returns/:id').get(isAuthenticatedUser, getReturnById)

router
  .route('/return-approve/:returnId/items/:itemId')
  .post(
    isAuthenticatedUser,
    authorizeRoles('vendor', 'admin'),
    handleApproveReturn
  )

router.route('/all-returns').get(isAuthenticatedUser,authorizeRoles('vendor', 'admin'), getAllReturnsAdmin)

router
  .route('/return-reject/:returnId/items/:itemId')
  .post(
    isAuthenticatedUser,
    authorizeRoles('vendor', 'admin'),
    handleRejectReturn
  )

router
  .route('/return/admin/:id')
  .delete(isAuthenticatedUser, authorizeRoles('vendor', 'admin'), deleteReturn)

router
  .route('/return-refund/:returnId/items/:itemId')
  .post(
    isAuthenticatedUser,
    authorizeRoles('vendor', 'admin'),
    handleReturnRefundInitiated
  )
  
module.exports = router
