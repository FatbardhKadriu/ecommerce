const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const shortid = require('shortid')

const User = require('../../models/User')

const signup = async (req, res) => {

    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10)

    const userExist = await User.findOne({ email })

    if (userExist)
        return res.status(400).json({ message: 'Admin already registered' })

    const _user = new User({ firstName, lastName, email, hash_password, username: shortid.generate(), role: 'admin' })

    await _user.save()
    
    res.status(201).json({ message: 'Admin created successfully..!' })
}

const signin = async (req, res) => {

    const user = await User.findOne({ email: req.body.email, role: 'admin' })

    if (!user) return res.status(404).json({ message: "Admin doesn't exists "})

    if (!(await user.authenticate(req.body.password))) return res.status(400).json({ message: 'Username or password incorrect'})

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })

    const { _id, firstName, lastName, email, role, fullName } = user;

    res.cookie('token', token, { expiresIn: '1h' })

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

const signout = async (req, res) => {

    res.clearCookie('token')
    res.status(200).json({
        message: 'Signout successfully...!'
    })
}

module.exports = {
    signin,
    signup,
    signout
}