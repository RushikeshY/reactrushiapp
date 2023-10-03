const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')
const EmailVerificationToken = require('./EmailVerificationToken')
const MobileVerificationOTP = require('./MobileVerificationOTP')
const { parseDuration } = require('../utils/StringUtils')
const { ViewHistory } = require('./viewHistoryModel')
const { sendOTP } = require('../utils/HTTPClient')

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Enter Your Full Name'],
      maxLength: [30, 'Name cannot exceed 30 characters'],
      minLength: [4, 'Name should have more than 4 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please Enter Your Email'],
      unique: true,
      trim: true,
      validate: [validator.isEmail, 'Please Enter a valid Email'],
    },
    mobileNum: {
      type: String,
      required: [true, 'mobile number is required'],
      validate: {
        validator: function (value) {
          return validator.isMobilePhone(value, 'any')
        },
      },
      message: 'Please enter a valid mobile number',
      unique: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
    password: {
      type: String,
      required: true,
      minLength: [8, 'Password should be greater than 8 characters'],
      select: false,
      trim: true,
    },

    role: {
      type: String,
      enum: ['user', 'vendor', 'admin'],
      default: 'user',
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    mobileVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    versionKey: false,
    timestamps: true,
  }
)

// hashing password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.addToViewHistory = function (productId) {
  console.log(productId)
  return ViewHistory.updateOne(
    {
      userId: this._id,
      productId,
    },
    { userId: this._id, productId },
    { upsert: true }
  )
}

// JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

// Comparing password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  return jwt.sign(
    {
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  )
}

userSchema.methods.emailVerificationToken = function () {
  return jwt.sign(
    {
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.VERIFICATION_TOKEN_EXPIRE }
  )
}

userSchema.methods.requestEmailVerification = async function (
  getUrlFromToken,
  getMessageFromURL
) {
  const token = this.emailVerificationToken()
  await new EmailVerificationToken({ token }).save()
  const emailVerificationURL = getUrlFromToken(token)

  console.log(emailVerificationURL)
  const message = getMessageFromURL(emailVerificationURL)
  await sendEmail({
    email: this.email,
    subject: 'Verify email for SWASHA',
    html:message,
  })
}

userSchema.methods.requestMobileVerification = async function () {
  const otp = Math.floor(100000 + Math.random() * 899999)
  // const mobileWithCountryCode = "+91" + this.mobileNum; // Add "+91" prefix
  
  console.log(`OTP for verifying +91${this.mobileNum} is :- ${otp}`)

  await new MobileVerificationOTP({
    mobileNum: this.mobileNum,
    otp,
    expiresAt:
      Date.now() + parseDuration(process.env.VERIFICATION_TOKEN_EXPIRE),
  }).save()
  await sendOTP({ mobileNo: "+91" + this.mobileNum, otp })
}

// Export the model
module.exports = mongoose.model('User', userSchema)
