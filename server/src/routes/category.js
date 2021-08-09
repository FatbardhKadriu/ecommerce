const express = require('express')
const multer  = require('multer')
const shortid = require('shortid')
const path    = require('path')


const { addCategory, getCategories } = require('../controllers/category')
const { requireSignIn, adminMiddleware } = require('../middleware')
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })

const upload = multer({ storage })

router.post('/category/create', requireSignIn, adminMiddleware, upload.single('categoryImage'), addCategory)
router.get ('/category/getcategory',    getCategories)

module.exports = router;