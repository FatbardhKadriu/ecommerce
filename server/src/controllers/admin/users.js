const User = require('../../models/User')

exports.getAllUsers = async (req, res) => {

    try {
        const users = await User.find({ role: 'user' })
            .select('_id firstName lastName email username birthdate phoneNumber createdAt updatedAt')
            
        if (!users) {
            return res.status(400).json({ error: `No user was found` })
        }
        return res.status(200).json({ users })

    } catch (error) {
        return res.status(400).json(error)
    }
}

exports.getAllAdmins = async (req, res) => {

    try {
        const admins = await User.find({ role: 'admin' })
            .select('_id firstName lastName email username birthdate phoneNumber  createdAt updatedAt')

        if (!admins) {
            return res.status(400).json({ error: `No user was found` })
        }
        return res.status(200).json({ admins })

    } catch (error) {
        return res.status(400).json(error)
    }
}


