const mongoose = require('mongoose')
require('dotenv').config()

const resetPasswordTokenSchema = new mongoose.Schema(
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

resetPasswordTokenSchema.index(
  { _ts: 1 },
  { expires: process.env.JWT_EXPIRE }
)

module.exports = mongoose.model(
  'ResetPasswordToken',
  resetPasswordTokenSchema,
  'resetPasswordTokens'
)
