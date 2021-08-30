const express = require('express');
const { getProfile } = require('../../controllers/admin/profile');
const router = express.Router()
const {  adminMiddleware, requireSignIn } = require('../../middleware')

router.get('/admin/profile', requireSignIn, adminMiddleware, getProfile)

module.exports = router;
