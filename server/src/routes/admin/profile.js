const express = require('express');
const { getProfile, updateProfile } = require('../../controllers/admin/profile');
const router = express.Router()
const {  adminMiddleware, requireSignIn } = require('../../middleware');
const { validateUpdateRequest } = require('../../validators/profile');
const { isRequestValidated } = require('../../validators/index')

router.get('/admin/profile',  requireSignIn, adminMiddleware, getProfile)
router.put('/admin/updateProfile', requireSignIn, adminMiddleware, validateUpdateRequest, isRequestValidated,  updateProfile)

module.exports = router;
