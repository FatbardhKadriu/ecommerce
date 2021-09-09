const express = require('express')

const { requireSignIn, adminMiddleware } = require('../../middleware')
const { updateOrder, getCustomerOrders, searchOrder, filterOrdersByDate } = require('../../controllers/admin/order')
const router = express.Router()

router.post('/order/update', requireSignIn, adminMiddleware, updateOrder)
router.get ('/orders/getCustomerOrders', requireSignIn, adminMiddleware, getCustomerOrders)
router.get('/order/:orderId', requireSignIn, adminMiddleware, searchOrder)
router.get('/orders/:date', requireSignIn, adminMiddleware, filterOrdersByDate)

module.exports = router