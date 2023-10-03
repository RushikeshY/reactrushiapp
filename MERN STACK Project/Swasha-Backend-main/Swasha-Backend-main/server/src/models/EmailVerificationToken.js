const mongoose = require('mongoose')
require('dotenv').config()

const emailVerificationTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, 'Token is required']
    },
    expiresIn: {
      type: Number,
      require: true
    }
  },
  {
    versionKey: false,
    timestamps: { createdAt: '_ts', updatedAt: null }
  }
)

emailVerificationTokenSchema.index(
  { _ts: 1 },
  { expires: process.env.VERIFICATION_TOKEN_EXPIRE }
)

module.exports = mongoose.model(
  'EmailVerificationToken',
  emailVerificationTokenSchema,
  'emailVerificationTokens'
)
