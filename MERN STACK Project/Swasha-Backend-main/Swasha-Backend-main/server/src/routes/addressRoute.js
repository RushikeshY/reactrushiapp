const express = require('express')
const {
  newAddress,
  getOfficeAddressOnly,
  getHomeAddressOnly,
  getAddresses,
  deleteAddress,
  updateAddress,
  makeDefaultAddress,
} = require('../controllers/addressController')
const router = express.Router()
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

router.route('/address/new').post(isAuthenticatedUser, newAddress)
router.route('/address/addresses').get(isAuthenticatedUser, getAddresses)
router.route('/address/office').get(isAuthenticatedUser, getOfficeAddressOnly)
router.route('/address/home').get(isAuthenticatedUser, getHomeAddressOnly)
router
  .route('/address/make-default/:id')
  .get(isAuthenticatedUser, makeDefaultAddress)
router
  .route('/address/updateAddress/:id')
  .put(isAuthenticatedUser, updateAddress)
router.route('/address/:id').delete(isAuthenticatedUser, deleteAddress)

module.exports = router
