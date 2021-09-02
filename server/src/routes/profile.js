const express = require('express');
const router = express.Router()
const { getProfile, updateProfile } = require('../controllers/profile')
const { userMiddleware, requireSignIn } = require('../middleware');
const { validateUpdateRequest } = require('../validators/profile');
const { isRequestValidated } = require('../validators/index')

router.get('/profile',  requireSignIn, userMiddleware, getProfile)
router.put('/updateProfile', requireSignIn, userMiddleware, validateUpdateRequest, isRequestValidated, updateProfile)

module.exports = router;
