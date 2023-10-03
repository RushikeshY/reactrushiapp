const app = require('./index')
require('colors')
const connectDB = require('./config/database')
require('dotenv').config()
const Razorpay = require('razorpay')

const PORT = process.env.PORT || 8080

// payment method keys
// eslint-disable-next-line new-cap
const ri = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY_TEST,
  key_secret: process.env.RAZORPAY_API_SECRET_TEST
})
module.exports.RazorpayInstance = ri

// Handled Uncaught Exception
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`)
  console.log('Shutting down the server because of Uncaught Exception')

  process.exit(1)
})

// connecting the database for listing the port
const server = app.listen(PORT, async () => {
  try {
    await connectDB()
    console.log(`Server is Listening On Port Number:- ${PORT}`.bgGreen.italic)
  } catch (error) {
    console.error(`Error:${error.message}`.red.bold)
  }
})

// Handled Promise Rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`)
  console.log(
    'Shutting down the server because of Unhandled Promise Rejection'
  )

  server.close(() => {
    process.exit(1)
  })
})
