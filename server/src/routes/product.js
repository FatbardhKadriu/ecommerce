const express = require('express')
const { createProduct, getProductsBySlug, getProductDetailsById } = require('../controllers/product')
const { requireSignIn, adminMiddleware } = require('../middleware')
const router = express.Router()
const { upload } = require('../middleware') 

router.post('/product/create', requireSignIn, adminMiddleware, upload.array('productPicture'), createProduct)
router.get ('/products/:slug',  getProductsBySlug);
router.get ('/product/:productId', getProductDetailsById)

module.exports = router;