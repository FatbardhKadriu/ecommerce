const express = require('express')
const multer  = require('multer')
const shortid = require('shortid')
const path    = require('path')


const { addCategory, getCategories, updateCategories, deleteCategories } = require('../controllers/category')
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
router.post('/category/update', upload.array('categoryImage'), updateCategories)
router.post('/category/delete', deleteCategories)

module.exports = router;