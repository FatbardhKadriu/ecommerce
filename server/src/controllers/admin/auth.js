const jwt = require('jsonwebtoken')
const User = require('../../models/User')

const signup = async (req, res) => {

    const { firstName, lastName, email, password } = req.body;

    const userExist = await User.findOne({ email })

    if (userExist)
        return res.status(400).json({ message: 'Admin already registered' })

    const _user = new User({ firstName, lastName, email, password, username: Math.random().toString(), role: 'admin' })

    await _user.save()
    
    res.status(201).json({ message: 'Admin created successfully..!' })
}

const signin = async (req, res) => {

    const { _email, password } = req.body

    const user = await User.findOne({ _email, role: 'admin' })

    if (!user) return res.status(404).json({ message: "User doesn't exists "})

    if (!(user.authenticate(password))) return res.status(404).json({ message: 'Username or password incorrect'})

    const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' })

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

const requireSignIn = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
}

module.exports = {
    signin,
    signup,
    requireSignIn
}