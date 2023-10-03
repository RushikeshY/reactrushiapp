const express = require('express')
const { contactUs } = require('../controllers/contactusController')
const route = express.Router()
const router = express.Router()
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

router.route('/contact/newQuery').post(isAuthenticatedUser, contactUs)

module.exports = router
