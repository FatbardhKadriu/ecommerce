const express = require('express')
const { signup, signin, signout }  = require('../../controllers/admin/auth')
const { validateSignupRequest, validateSigninRequest } = require('../../validators/auth')
const { isRequestValidated } = require('../../validators/index')
const multer = require('multer')
const path = require('path')
const shortid = require('shortid')

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), '../images/profiles/admin'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })

const upload = multer({ storage })

router.post('/admin/signin',  validateSigninRequest, isRequestValidated, signin)
router.post('/admin/signup',  upload.single('profilePicture'),  validateSignupRequest, isRequestValidated, signup)
router.post('/admin/signout', signout)

module.exports = router;
