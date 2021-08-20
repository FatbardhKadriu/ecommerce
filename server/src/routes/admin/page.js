const express = require('express');
const { createPage, getPage } = require('../../controllers/admin/page');
const router = express.Router()
const { upload, adminMiddleware, requireSignIn } = require('../../middleware')

router.post('/page/create', requireSignIn, adminMiddleware, upload.fields([
    { name: 'banners' },
    { name: 'products' }]), createPage)

router.get('/page/:category/:type', getPage)

module.exports = router;
