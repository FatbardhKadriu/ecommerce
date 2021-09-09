const jwt = require('jsonwebtoken')
const shortid = require('shortid')
const User = require('../models/User')
const bcrypt = require('bcrypt')

const generateJwtToken = (_id, role) => {
    return jwt.sign(
        { _id, role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
}

const signup = async (req, res) => {

    try {
        const userExist = await User.findOne({ email: req.body.email })
        if (userExist)
            return res.status(400).json({ error: 'User already registered' })

        const { firstName, lastName, email, password } = req.body;
        const userObj = {
            firstName,
            lastName,
            email,
        }
        const hash_password = await bcrypt.hash(password, 10)
        userObj.hash_password = hash_password
        userObj.username = `${firstName}-${shortid.generate()}`

        if (req.body.gender) {
            userObj.gender = req.body.gender
        }
        if (req.body.birthdate) {
            userObj.birthdate = req.body.birthdate
        }
        if (req.body.phoneNumber) {
            userObj.phoneNumber = req.body.phoneNumber
        }

        if (req.file) {
            userObj.profilePicture = req.file.filename
        }
        const _user = new User(userObj)
        const user = await _user.save()

        const token = generateJwtToken(user._id, user.role)

        const { _id, role, fullName } = user
        res.status(201).json({
            token,
            user: { _id, fullName, email, role }
        })
    } catch (error) {
        return res.status(400).json({ error })
    }
}

const signin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email, role: 'user' })
        if (!user) return res.status(400).json({ error: "Username or password incorrect" })

        const isPasswordCorrect = await user.authenticate(req.body.password)
        if (!isPasswordCorrect) return res.status(400).json({ error: 'Username or password incorrect' })

        const token = generateJwtToken(user._id, user.role)

        const { _id, email, role, fullName } = user;
        res.status(200).json({
            token,
            user: {
                _id,
                fullName,
                email,
                role,
            }
        })
    } catch (error) {
        return res.status(400).json(error)
    }
}

module.exports = {
    signin,
    signup
}