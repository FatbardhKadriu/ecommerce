const express = require('express')
const { addItemToCart } = require('../controllers/cart')
const { requireSignIn, userMiddleware } = require('../middleware')
const router = express.Router()

router.post('/user/cart/addtocart', requireSignIn, userMiddleware, addItemToCart)

module.exports = router;