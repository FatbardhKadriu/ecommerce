const express = require('express')
const { addCategory, getCategories } = require('../controllers/category')
const { requireSignIn, adminMiddleware } = require('../middleware')
const router = express.Router()

router.post('/category/create', requireSignIn, adminMiddleware, addCategory)
router.get ('/category/getcategory',    getCategories)

module.exports = router;