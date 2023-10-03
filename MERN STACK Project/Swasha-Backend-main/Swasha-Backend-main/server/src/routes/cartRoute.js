const express = require('express')
const {
  addToCart,
  getCartItems,
  deleteCartItem
} = require('../controllers/cartController')
const router = express.Router()
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

router.route('/cart/addToCart').post(isAuthenticatedUser, addToCart)
router.route('/cart/getAllCartItems').get(isAuthenticatedUser, getCartItems)
router
  .route('/cart/:id')
  .delete(isAuthenticatedUser, deleteCartItem)

module.exports = router
