const express = require('express');
const { getProfile, updateProfile } = require('../../controllers/admin/profile');
const router = express.Router()
const {  adminMiddleware, requireSignIn } = require('../../middleware')

router.get('/admin/profile', requireSignIn, adminMiddleware, getProfile)
router.put('/admin/updateProfile', requireSignIn, adminMiddleware, updateProfile)

module.exports = router;
