const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.getProfile = async (req, res) => {
    const _id = req.user._id
    try {
        const user = await User.findOne({ _id })

        if (!user) {
            return res.status(400).json({ error: `No user was found with id ${_id}` })
        }
        return res.status(200).json({ user })

    } catch (error) {
        return res.status(400).json(error)
    }
}

exports.updateProfile = async (req, res) => {

    try {
        const userExist = await User.findOne({ _id: { $ne: req.user._id }, email: req.body.email })
        if (userExist)
            return res.status(400).json({ error: "Email address is taken" })

        const _user = await User.findOne({ _id: req.user._id })

        if (req.body.oldPassword) {
            const isPasswordCorrect = await _user.authenticate(req.body.oldPassword)
            if (!isPasswordCorrect) {
                return res.status(400).json({ error: 'Old password is incorrect' })
            }
            delete req.body.oldPassword
        }

        if (req.body.hash_password) {
            req.body.hash_password = await bcrypt.hash(req.body.hash_password, 10)
        }

        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            { ...req.body, },
            { new: true }
        )
        return res.status(200).json({ user, success: "Profile updated successfully" })
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}
