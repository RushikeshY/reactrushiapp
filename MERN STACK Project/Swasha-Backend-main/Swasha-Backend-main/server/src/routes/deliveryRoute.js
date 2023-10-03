const express = require('express')
const { checkPincode } = require('../controllers/deliveryController')
const router = express.Router()

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

router.route('/delivery/check-pincode').post(checkPincode)

module.exports = router
