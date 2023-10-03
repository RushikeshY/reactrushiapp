const checkout = require('../controllers/paymentController')
const express = require('express')

const router = express.Router()

router.route('/checkout', checkout)

module.exports = router
