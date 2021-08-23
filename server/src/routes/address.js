const express = require('express');
const { addAddress, getAddress } = require('../controllers/address');
const { requireSignIn, userMiddleware } = require('../middleware')
const router = express.Router()

router.post('/user/address/create', requireSignIn, userMiddleware, addAddress)
router.post('/user/getaddress',     requireSignIn, userMiddleware, getAddress)

module.exports = router;