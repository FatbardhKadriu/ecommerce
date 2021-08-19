const express = require('express');
const { initialData } = require('../../controllers/admin/initialData');
const { requireSignIn, adminMiddleware } = require('../../middleware');

const router = express.Router()

router.post('/initialdata', requireSignIn, adminMiddleware ,initialData)

module.exports = router;
