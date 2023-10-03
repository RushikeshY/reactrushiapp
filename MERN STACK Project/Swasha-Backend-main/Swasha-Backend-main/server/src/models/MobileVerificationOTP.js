const mongoose = require('mongoose')
require('dotenv').config()

const mobileVerificationSchemaOTP = new mongoose.Schema(
  {
    mobileNum: {
      type: String,
      required: [true, 'Mobile number is required']
    },
    otp: {
      type: String,
      required: true
    },
    expiresAt: {
      type: Number,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: { createdAt: '_ts', updatedAt: null }
  }
)

mobileVerificationSchemaOTP.index(
  { _ts: 1 },
  { expires: process.env.VERIFICATION_TOKEN_EXPIRE }
)

module.exports = mongoose.model(
  'MobileVerificationOTP',
  mobileVerificationSchemaOTP,
  'mobileVerificationOTPs'
)
