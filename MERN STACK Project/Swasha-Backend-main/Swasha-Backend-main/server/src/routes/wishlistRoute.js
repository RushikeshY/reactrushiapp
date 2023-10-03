const express = require('express')
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist
} = require('../controllers/wishlistController')
const router = express.Router()
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

router.route('/wishlist/new').post(isAuthenticatedUser, addToWishlist)
router.route('/wishlist/wishlists').get(isAuthenticatedUser, getWishlist)
router.route('/wishlist/:id').delete(isAuthenticatedUser, removeFromWishlist)

module.exports = router
