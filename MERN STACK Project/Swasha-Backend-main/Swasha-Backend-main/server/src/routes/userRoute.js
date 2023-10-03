const express = require('express')
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetials,
  updatePassword,
  updateProfile,
  verifyEmail,
  requestEmailVerification,
  requestMobileVerification,
  verifyOTP,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
  productViewHistory,
  addToViewHistory
} = require('../controllers/userController')
const {
  isAuthenticatedUser,
  authorizeRoles,
  loadAuthData
} = require('../middleware/auth')

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logout)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset').post(resetPassword)
router.route('/verify-email').post(verifyEmail)
router.route('/verify-otp').post(isAuthenticatedUser, verifyOTP)
router
  .route('/request-email-verification')
  .get(isAuthenticatedUser, requestEmailVerification)
router
  .route('/request-mobile-verification')
  .get(isAuthenticatedUser, requestMobileVerification)
router.route('/logout').get(logout)
router.route('/me').get(isAuthenticatedUser, getUserDetials)
router.route('/password/update').put(isAuthenticatedUser, updatePassword)
router.route('/me/update').put(isAuthenticatedUser, updateProfile)

router.route('/product-view-history').get(isAuthenticatedUser, productViewHistory)
router.route('/view-history/add').post(isAuthenticatedUser, addToViewHistory)

router
  .route('/admin/users')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAllUser)

router
  .route('/admin/user/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)

module.exports = router
