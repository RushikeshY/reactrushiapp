const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const Cart = require('../models/cartModel')

exports.addToCart = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id
  const { productId, quantity } = req.body

  let cartItem = await Cart.findOne({ userId, productId })
  if (quantity < 1) {
    if (cartItem) await cartItem.delete()
  } else {
    if (cartItem) {
      cartItem.quantity = quantity
      await cartItem.save()
    } else {
      cartItem = new Cart({ userId, productId, quantity })
      await cartItem.save()
    }
  }

  res.status(201).json({
    success: true,
    cartItem,
    message: 'Item added to cart',
  })
})

// get all the cart items for a specific user
exports.getCartItems = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id

  const cartItems = await Cart.find({ userId })

  if (!cartItems) {
    return next(new ErrorHandler('No Item Added Yet', 404))
  }

  res.status(200).json({
    success: true,
    cartItems,
  })
})

// Remove an item from cart
exports.deleteCartItem = catchAsyncErrors(async (req, res, next) => {
  const cartItemId = req.params.id

  const removedCartItem = await Cart.findByIdAndRemove(cartItemId)

  if (!removedCartItem) {
    return next(new ErrorHandler('Cart item not found', 404))
  }

  res.status(200).json({
    success: true,
    message: 'Cart item removed successfully',
  })
})
