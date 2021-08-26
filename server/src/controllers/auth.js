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
        const { firstName, lastName, email, password } = req.body;

        const hash_password = await bcrypt.hash(password, 10)

        const userExist = await User.findOne({ email })

        if (userExist)
            return res.status(400).json({ message: 'User already registered' })

        const _user = new User({ firstName, lastName, email, hash_password, username: shortid.generate() })

        const user = await _user.save()

        const token = generateJwtToken(user._id, user.role)

        const { _id, role, fullName } = user
        res.status(201).json({
            token,
            user: { _id, firstName, lastName, email, role, fullName }
        })
    } catch (error) {
        return res.status(400).json({ error })
    }
}

const signin = async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email, role: 'user' })

        if (!user) return res.status(400).json({ message: "User doesn't exists " })

        if (!(await user.authenticate(req.body.password))) return res.status(400).json({ message: 'Username or password incorrect' })

        const token = generateJwtToken(user._id, user.role)

        const { _id, firstName, lastName, email, role, fullName } = user;

        res.status(200).json({
            token,
            user: {
                _id,
                firstName,
                lastName,
                email,
                role,
                fullName
            }
        })
    } catch (error) {
        return res.status(400).json({ error })
    }
}

module.exports = {
    signin,
    signup
}