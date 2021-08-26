const express = require('express')
const { 
    createProduct, 
    getProductsBySlug, 
    getProductDetailsById, 
    deleteProductById, 
    getProducts 
} = require('../controllers/product')
const { requireSignIn, adminMiddleware } = require('../middleware')
const router = express.Router()
const { upload } = require('../middleware') 

router.post  ('/product/create',              requireSignIn, adminMiddleware, upload.array('productPicture'), createProduct)
router.delete('/product/deleteProductById',   requireSignIn, adminMiddleware, deleteProductById)
router.get   ('/product/getProducts',         requireSignIn, adminMiddleware, getProducts)
router.get   ('/products/:slug',     getProductsBySlug);
router.get   ('/product/:productId', getProductDetailsById)

module.exports = router;