const express = require('express')
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require('../middleware/auth')

const router = express.Router()

const {
  getProductSubCategories,
  handleIndividualSubCategory,
  handleCreateSubcategory,
  handleUpdatingSubcategory,
  handleDeleteSubcategory,
} = require('../controllers/subCategoryController')

router
  .route('/create-sub-category')
  .post(
    isAuthenticatedUser,
    authorizeRoles('vendor', 'admin'),
    handleCreateSubcategory
  )
router
  .route('/product-sub-categories')
  .get(isAuthenticatedUser, getProductSubCategories)
router
  .route('/subcategories/:id')
  .get(isAuthenticatedUser, handleIndividualSubCategory)

router
  .route('/update-subcategory/:id')
  .put(
    isAuthenticatedUser,
    authorizeRoles('vendor', 'admin'),
    handleUpdatingSubcategory
  )
router
  .route('/remove-subcategory/:id')
  .delete(
    isAuthenticatedUser,
    authorizeRoles('vendor', 'admin'),
    handleDeleteSubcategory
  )
module.exports = router
