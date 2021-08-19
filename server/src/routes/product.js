const express = require('express')
const { createProduct, getProductsBySlug } = require('../controllers/product')
const { requireSignIn, adminMiddleware } = require('../middleware')
const router = express.Router()
const { upload } = require('../middleware') 

router.post('/product/create', requireSignIn, adminMiddleware, upload.array('productPicture'), createProduct)
router.get ('/products/:slug',  getProductsBySlug);

module.exports = router;