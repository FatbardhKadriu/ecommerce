const jwt = require('jsonwebtoken')
const shortid = require('shortid')
const User = require('../models/User')
const bcrypt = require('bcrypt')

const signup = async (req, res) => {

    const { firstName, lastName, email, password } = req.body;

    const hash_password = await bcrypt.hash(password, 10)

    const userExist = await User.findOne({ email })

    if (userExist)
        return res.status(400).json({ message: 'User already registered' })

    const _user = new User({ firstName, lastName, email, hash_password, username: shortid.generate() })

    await _user.save()

    res.status(201).json({ message: 'User created successfully..!' })
}

const signin = async (req, res) => {

    const user = await User.findOne({ email: req.body.email, role: 'user' })

    if (!user) return res.status(400).json({ message: "User doesn't exists " })

    if (!(await user.authenticate(req.body.password))) return res.status(400).json({ message: 'Username or password incorrect' })

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })

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
}

module.exports = {
    signin,
    signup
}