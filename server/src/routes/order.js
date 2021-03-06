const express = require('express')
const { requireSignIn, userMiddleware } = require('../middleware')
const { addOrder, getOrders, getOrder } = require('../controllers/order')

const router = express.Router()

router.post('/addOrder',  requireSignIn, userMiddleware, addOrder)
router.get ('/getOrders', requireSignIn, userMiddleware, getOrders)
router.post('/getOrder',  requireSignIn, userMiddleware, getOrder)

module.exports = router