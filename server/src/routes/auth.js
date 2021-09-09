const express = require('express')
const shortid = require('shortid')
const { signup, signin }  = require('../controllers/auth')
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth')
const multer = require('multer')
const path = require('path')
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'images/profiles/user'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })

const upload = multer({ storage })

router.post('/signin', validateSigninRequest, isRequestValidated, signin)
router.post('/signup', upload.single('profilePicture'), validateSignupRequest,  isRequestValidated, signup)

module.exports = router;
