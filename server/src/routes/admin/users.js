const express = require('express')
const { getAllUsers, getAllAdmins } = require('../../controllers/admin/users')
const { requireSignIn, adminMiddleware, superAdminMiddleware } = require('../../middleware')
const router = express.Router()

router.get('/admin/allUsers', requireSignIn, adminMiddleware, getAllUsers)
router.get('/admin/allAdmins', requireSignIn, superAdminMiddleware, getAllAdmins)

module.exports = router;
