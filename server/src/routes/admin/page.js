const express = require('express');
const { createPage } = require('../../controllers/admin/page');
const router = express.Router()
const { upload, adminMiddleware, requireSignIn } = require('../../middleware')

router.post('/page/create', upload.fields([{ name: 'banners' }, { name: 'products' }]), requireSignIn, adminMiddleware ,createPage)

module.exports = router;
