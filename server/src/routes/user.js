const express = require('express')
const { signup } = require('../controllers/user')

const router = express.Router()

router.post('/signin', (req, res) => {
    res.send("Test")
})

router.post('/signup', signup)

module.exports = router;
