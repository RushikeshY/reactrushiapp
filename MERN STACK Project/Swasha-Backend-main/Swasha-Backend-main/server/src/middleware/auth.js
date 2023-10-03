const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('./catchAsyncErrors')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const { sendToken } = require('../utils/jwtToken')

async function processToken(req, res) {
  const { token } = req.cookies
  if (!token) return false

  try {
    const decodedData = jwt.decode(token, process.env.JWT_SECRET)
    req.user = await User.findById(decodedData._id)
    if (decodedData.exp < Date.now() / 1000) {
      console.log('Refreshing expired token')
      sendToken(req.user, res)
    }
  } catch (err) {
    return false
  }

  return true
}

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  return (await processToken(req, res))
    ? next()
    : next(new ErrorHandler('Please Login to access this resource', 401))
})

exports.loadAuthData = catchAsyncErrors(async (req, res, next) => {
  await processToken(req, res)
  next()
})

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      )
    }

    next()
  }
}
