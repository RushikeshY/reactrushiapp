const User = require('../models/userModel')
const ResetPasswordToken = require('../models/resetPasswordTokenModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const { sendToken } = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
// const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const EmailVerificationToken = require('../models/EmailVerificationToken')
const MobileVerificationOTP = require('../models/MobileVerificationOTP')
const { ViewHistory } = require('../models/viewHistoryModel')
const Product = require('../models/productModel')
const footerHTML = require('../utils/emailtemplate/emailfooter')
const headerHTML = require('../utils/emailtemplate/emailheader')

// function for Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, mobileNum, password } = req.body

  const user = await User.create({
    name,
    email,
    mobileNum,
    password,
  })
  // send verification email
  await user.requestEmailVerification(
    (token) => `${process.env.DOMAIN}/auth/verify-email?token=${token}`,
    (url) =>
      `${headerHTML}
          <p>Dear ${name},</p><br>
          <p>Thank you for joining Swasha. We are glad to have you with us. Please click on the below link to verify your Email. This will help us ensure that you receive the updates related to your orders and products.<br><br></p>
          <a href="${url}"> <button>Verify now</button></a>
          <p style="font-size: 13px; color: red; padding-top: 0.5rem;">Please tap on the above button to verify your mail.</p><br>
          <p><b>Note</b>: <span style="text-decoration: underline;">The link will be valid for 15 minutes.</span></p><br>
          <p>Best Wishes,</p>
          <p>Swasha Team.</p>
        ${footerHTML}`
  )

  sendToken(user, res)
  res.status(201).json({
    success: true,
    user,
  })
})

// login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body

  // checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHandler('Please Enter Email & Password', 400))
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401))
  }

  const isPasswordMatched = await user.comparePassword(password)

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401))
  }

  sendToken(user, res)
  res.status(200).json({
    success: true,
    user,
  })
})

// logout user
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: 'Logged Out',
  })
})

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return next(new ErrorHandler('User not found', 404))
  }

  // Get reset Password Token
  const token = user.getResetPasswordToken()
  await (await ResetPasswordToken.create({ token })).save()
  const resetPasswordUrl = `${process.env.DOMAIN}/auth/reset-password?token=${token}`

  console.log(resetPasswordUrl)
  const message = `Dear customer,\n\n We have received a request to reset your SWASHA account password.\n\n Click on the link below to reset your password\n\n${resetPasswordUrl} \n\nAlternately, you can copy and paste this link in your browser.\n\nThis link will be valid for 15 minutes.\n\nIgnore this email if you did not ask for a password reset.\n\nThank you,\n\nTeam SWASHA.`

  try {
    await sendEmail({
      email: user.email,
      subject: 'Reset your SWASHA password',
      message,
    })

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    })
  } catch (error) {
    await user.save({ validateBeforeSave: false })

    return next(new ErrorHandler(error.message, 500))
  }
})

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const token = req.body.token
  // jwt.verify will also check if the token is expired
  const decodedData = jwt.verify(token, process.env.JWT_SECRET)

  // check if token is in db (to prevent using more than once)
  const tokenDoc = await ResetPasswordToken.findOne({ token })
  if (!tokenDoc) return next(new ErrorHandler('Token not found', 400))

  // proceed if the token is not expired and not used
  const { email } = decodedData

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match', 400))
  }
  // console.log("email")
  const user = await User.findOne({ email })
  if (!user) return next(new ErrorHandler('User not found', 400))
  // console.log(user)

  user.password = req.body.password
  await user.save()
  await tokenDoc.delete()
  res.status(200).json({
    success: true,
    message: 'Password reset',
  })
})

exports.verifyEmail = catchAsyncErrors(async (req, res, next) => {
  const token = req.body.token
  // jwt.verify will also check if the token is expired
  const decodedData = jwt.verify(token, process.env.JWT_SECRET)

  // check if token is in db (to prevent using more than once)
  const tokenDoc = await EmailVerificationToken.findOne({ token })
  if (!tokenDoc) return next(new ErrorHandler('Token not found', 400))

  // proceed if the token is not expired and not used
  const { email } = decodedData

  // console.log(email)
  const user = await User.findOne({ email })
  if (!user) return next(new ErrorHandler('User not found', 400))
  // console.log(user)

  user.emailVerified = true
  await user.save()
  await tokenDoc.delete()
  res.status(200).json({
    success: true,
    message: 'Email Verified',
  })
})

exports.requestEmailVerification = catchAsyncErrors(async (req, res, next) => {
  await req.user.requestEmailVerification(
    (token) => `${process.env.DOMAIN}/auth/verify-email?token=${token}`,
    (url) =>
      `${headerHTML}
            <p>Dear Customer,</p>
            <p>To enhance the security of your account, please take a moment to verify your email by clicking the button below.<br><br></p>
            <a href="${url}"> <button>Verify now</button></a>
            <p style="font-size: 13px; color: red; padding-top: 0.5rem;">Please tap on the above button to verify your mail.</p><br>
            <p><b>Note</b>: <span style="text-decoration: underline;">The link will be valid for 15 minutes.</span></p><br>
            <p> If you encounter any issues, please don't hesitate to reach out to us at <a href="contact@swasha.org">contact@swasha.org</a></p>
            <p>Best Wishes,</p>
            <p>Swasha Team.</p>
        ${footerHTML}`
  )
  res.status(200).json({
    success: true,
    message: 'Verification link sent',
  })
})

exports.requestMobileVerification = catchAsyncErrors(async (req, res, next) => {
  await req.user.requestMobileVerification()
  res.status(200).json({
    success: true,
    message: 'OTP sent to registered mobile number',
  })
})

exports.verifyOTP = catchAsyncErrors(async (req, res, next) => {
  const doc = await MobileVerificationOTP.findOne({
    mobileNum: req.user.mobileNum,
    otp: req.body.otp,
  })

  if (!doc) return next(new ErrorHandler('Wrong OTP entered', 400))
  if (doc.expiresAt < Date.now()) next(new ErrorHandler('OTP expired', 400))
  await doc.delete()
  req.user.mobileVerified = true
  await req.user.save()
  res.status(200).json({
    success: true,
    message: 'OTP verification successful',
  })
})

exports.productViewHistory = catchAsyncErrors(async (req, res, next) => {
  const docs = await ViewHistory.find(
    { userId: req.user._id },
    { _id: 0, productId: 1 }
  ).sort({
    updatedAt: -1,
  })
  res.status(200).json({
    success: true,
    viewHistory: docs,
  })
})

exports.addToViewHistory = catchAsyncErrors(async (req, res, next) => {
  if (req.user) await req.user.addToViewHistory(req.body.productId)
  res.status(200).json({
    success: true,
  })
})

// Get User Details
exports.getUserDetials = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id)

  res.status(200).json({
    success: true,
    user,
  })
})

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password')

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Old password is incorrect', 400))
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password dose not match', 400))
  }

  user.password = req.body.newPassword

  user.save()

  res.status(200).json({ success: true, message: 'Password changed' })
})

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    mobileNum: req.body.mobileNum,
    gender: req.body.gender,
  }

  if (req.body.email !== req.user.email) newUserData.emailVerified = false
  if (req.body.mobileNum !== req.user.mobileNum)
    newUserData.mobileVerified = false

  // TODO: Need to add profile pic update :- profile image url.

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    user,
  })
})

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find()

  res.status(200).json({
    success: true,
    users,
  })
})

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    )
  }

  res.status(200).json({
    success: true,
    user,
  })
})

// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    message: 'User detail updated sussessfully',
  })
})

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    )
  }

  await user.remove()

  res.status(200).json({
    success: true,
    message: 'User Deleted Successfully',
  })
})
