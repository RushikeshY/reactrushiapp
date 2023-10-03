const express = require('express')
const { bulkOrderQuery } = require('../controllers/bulkOrderController')
const route = express.Router()
const router = express.Router()
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

router.route('/bulk/newBulkQuery').post(isAuthenticatedUser, bulkOrderQuery)

module.exports = router
