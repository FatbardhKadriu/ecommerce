const express = require('express')

const { requireSignIn, adminMiddleware } = require('../../middleware')
const { updateOrder, getCustomerOrders, searchOrder } = require('../../controllers/admin/order')
const router = express.Router()

router.post('/order/update', requireSignIn, adminMiddleware, updateOrder)
router.get ('/order/getCustomerOrders', requireSignIn, adminMiddleware, getCustomerOrders)
router.get('/order/:orderId', requireSignIn, adminMiddleware, searchOrder)

module.exports = router