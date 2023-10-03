const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const Address = require('../models/addressModel')

// POST :- For Creating New Address
exports.newAddress = catchAsyncErrors(async (req, res, next) => {
  const {
    fullName,
    phoneNumber,
    addressLine1,
    addressLine2,
    landmark,
    city,
    state,
    postalCode,
    country,
    addressType,
    isDefault,
  } = req.body

  const address = await Address.create({
    fullName,
    phoneNumber,
    addressLine1,
    addressLine2,
    landmark,
    city,
    state,
    postalCode,
    country,
    addressType,
    isDefault,
    user: req.user._id,
  })

  res.status(201).json({
    success: true,
    address,
  })
})

// GET :- to get all addresses, which added by user
exports.getAddresses = catchAsyncErrors(async (req, res, next) => {
  const addresses = await Address.find({user: req.user._id})

  res.status(200).json({
    success: true,
    addresses,
  })
})

// GET :- to get all Office address only
exports.getOfficeAddressOnly = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id
  const officeAddress = await Address.find({
    user: userId,
    addressType: 'Office',
  })

  res.status(200).json({
    success: true,
    officeAddress,
  })
})

// GET :- to get all Home address only
exports.getHomeAddressOnly = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id
  const homeAddress = await Address.find({
    user: userId,
    addressType: 'Home',
  })

  res.status(200).json({
    success: true,
    homeAddress,
  })
})

exports.makeDefaultAddress = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id
  const newAddress = await Address.findById(req.params.id).catch((e) => {
    throw next(new ErrorHandler("Provided address doesn't exist"))
  })

  const defaultAddress = await Address.findOne({
    user: userId,
    isDefault: true,
  })

  if (defaultAddress?._id?.toString() === newAddress._id.toString())
    return res.status(200).json({ success: true })

  if (defaultAddress) defaultAddress.isDefault = false
  newAddress.isDefault = true

  await Promise.all([newAddress.save(), defaultAddress?.save()])

  res.status(200).json({
    success: true,
  })
})

// PUT :- to update the existing address
exports.updateAddress = catchAsyncErrors(async (req, res, next) => {
  const addressId = req.params.id
  const userId = req.user._id

  // Check if the address belongs to the logged-in user
  let address = await Address.findOne({ _id: addressId, user: userId })

  if (!address) {
    return next(
      new ErrorHandler(
        `Address does not exist with this Id:- ${req.param.id}`,
        400
      )
    )
  }

  address = await Address.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    address,
  })
})

// DELETE :- to delete a address
exports.deleteAddress = catchAsyncErrors(async (req, res, next) => {
  const addressId = req.params.id
  const userId = req.user._id

  // Checking if the address belongs to the logged-in user
  const address = await Address.findOne({ _id: addressId, user: userId })

  if (!address) {
    return next(
      new ErrorHandler(
        `Address does not exist with this Id:- ${req.param.id}`,
        400
      )
    )
  }

  // Deleting the address
  await address.remove()

  // If the deleted address was the default address, setting the next available address as the default
  if (address.isDefault) {
    const remainingAddresses = await Address.find({ user: userId })
    if (remainingAddresses.length > 0) {
      remainingAddresses[0].isDefault = true
      await remainingAddresses[0].save()
    }
  }

  res.status(200).json({
    success: true,
    message: 'Address Deleted Successfully',
  })
})
