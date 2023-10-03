const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.message = err.message || 'Internal Server Error'

  // Handling Wrong MongoDB ID Error (CastError)
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`
    err = new ErrorHandler(message, 400)
  }

  // Mongoose duplicate key Error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
    err = new ErrorHandler(message, 400)
  }

  // Wrong JWT Error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Json Web Token is invalid, Try again '
    err = new ErrorHandler(message, 400)
  }

  // JWT EXPIRE Error
  if (err.name === 'TokenExpiredError') {
    const message = 'Json Web Token is Expired, Try again '
    err = new ErrorHandler(message, 400)
  }

  // Check for HTML error response
  if (err.message.startsWith('<!DOCTYPE html>')) {
    const message = 'Internal Server Error'
    err = new ErrorHandler(message, 500)
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  })
}
