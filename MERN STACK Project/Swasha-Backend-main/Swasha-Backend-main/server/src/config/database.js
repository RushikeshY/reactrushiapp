const mongoose = require('mongoose')
require('colors')
require('dotenv').config()
mongoose.set('strictQuery', false) // for removing DeprecationWarning

const db_dev = process.env.DB_URL_DEV // dev environment
const db_old = process.env.DB_URL // older database
const db_production = process.env.DB_URL_PRODUCTION // production environment

// database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(db_old)
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.bgMagenta.underline
    )
  } catch (error) {
    console.error(`Error:${error.message}`.red.bold)
  }
}

module.exports = connectDB
