const express = require('express')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

const router = express.Router()

const {
  handleCreateCategory,
  handleGetAllCategory,
  handleGetCategoryDetail,
  handleUpdateCategoryDetail,
  handleDeleteCategory,
} = require('../controllers/categoryController')

router
  .route('/create-category')
  .post(isAuthenticatedUser, authorizeRoles('admin'), handleCreateCategory)

router.route('/product-categories').get(handleGetAllCategory)

router
  .route('/product-categories/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), handleGetCategoryDetail)
  .put(isAuthenticatedUser, authorizeRoles('admin'), handleUpdateCategoryDetail)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), handleDeleteCategory)

module.exports = router
