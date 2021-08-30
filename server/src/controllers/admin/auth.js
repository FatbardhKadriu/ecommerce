const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const shortid = require('shortid')

const User = require('../../models/User')

const signup = async (req, res) => {
    let role = "admin"
    try {
        const userExist = await User.findOne({ email: req.body.email })
        if (userExist) {
            return res.status(400).json({ error: 'Admin already registered' })
        }
        const countUsers = await User.estimatedDocumentCount()
        if (countUsers === 0) {
            role = "super-admin"
        }
        const { firstName, lastName, email, password, gender, birthdate } = req.body;
        const userObj = {
            firstName, 
            lastName, 
            email, 
            role,
            gender,
            birthdate
        }
        const hash_password = await bcrypt.hash(password, 10)
        userObj.hash_password = hash_password
        userObj.username = shortid.generate()

        if (req.file) {
            userObj.profilePicture = req.file.filename
        }

        const _user = new User(userObj)
        await _user.save()
        res.status(201).json({ success: 'Admin created successfully..!' })
    } catch (error) {
        return res.status(400).json({ error: 'Something went wrong' })
    }
}

const signin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email, $or: [{ role: 'admin' }, { role: 'super-admin' }] })
        if (!user) {
            return res.status(404).json({ error: "Admin doesn't exists " })
        }
        const isPasswordCorrect = await user.authenticate(req.body.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: 'Username or password incorrect' })
        }
        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )
        const { _id, firstName, lastName, email, role, fullName, gender, username, birthdate, profilePicture } = user;
        res.cookie('token', token, { expiresIn: '1d' })
        res.status(200).json({
            token,
            user: {
                _id,
                email,
                role,
                fullName,
                profilePicture
            }
        })
    } catch (error) {
        return res.status(400).json({ error: 'Something went wrong' })
    }
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