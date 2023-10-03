const express = require('express')
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProductDetails,
  createProductReview,
  deleteReview,
  getProductReviews,
  getProductsByIds,
  getUserReviews,
  searchProducts,
} = require('../controllers/productController')
const {
  isAuthenticatedUser,
  authorizeRoles,
  loadAuthData,
} = require('../middleware/auth')

const router = express.Router()

router.route('/products').get(getAllProducts)
router.route('/products/search').get(searchProducts)
router.route('/product/by-ids').post(getProductsByIds)

// multer - for image upload requirements ------>
const multer = require('multer')
// Define storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //     folder for uploaded images
    cb(null, 'static/product-img/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  },
})
const upload = multer({
  storage: storage,
  limits: { fileSize: 500000 }, // Limit to 500KB per image
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  },
})
router
  .route('/admin/product/new')
  .post(
    isAuthenticatedUser,
    authorizeRoles('vendor', 'admin'),
    createProduct,
    upload.array('productImages', 6)
  )

router
  .route('/admin/product/:id')
  .put(isAuthenticatedUser, authorizeRoles('vendor', 'admin'), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles('vendor', 'admin'), deleteProduct)

router.route('/product/review').put(isAuthenticatedUser, createProductReview)

router.route('/product/my-reviews').get(isAuthenticatedUser, getUserReviews)

router
  .route('/product/reviews')
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview)

router.route('/product/:id').get(loadAuthData, getSingleProductDetails)
module.exports = router
