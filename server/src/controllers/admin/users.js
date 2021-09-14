const User = require('../../models/User')

exports.getAllUsers = async (req, res) => {

    try {
        const users = await User.find({ role: 'user' })
            .select('_id firstName lastName email username gender birthdate phoneNumber createdAt updatedAt')

        if (!users) {
            return res.status(400).json({ error: `No user was found` })
        }

        const _users = users.map(usr => (
            {
                _id: usr._id,
                fullName: `${usr.firstName} ${usr.lastName}`,
                email: usr.email,
                username: usr.username,
                gender: usr.gender ? usr.gender : null,
                birthdate: usr.birthdate ? usr.birthdate.toLocaleDateString() : null,
                phoneNumber: usr.phoneNumber ? usr.phoneNumber : null,
                createdAt: usr.createdAt.toLocaleDateString(),
                updatedAt: usr.updatedAt.toLocaleString()
            }
        ))

        return res.status(200).json({ users: _users })

    } catch (error) {
        return res.status(400).json(error)
    }
}

exports.getAllAdmins = async (req, res) => {

    try {
        const admins = await User.find({ role: 'admin' })
            .select('_id firstName lastName email username gender birthdate phoneNumber createdAt updatedAt')

        if (!admins) {
            return res.status(400).json({ error: `No user was found` })
        }

        const _admins = admins.map(usr => (
            {
                _id: usr._id,
                fullName: `${usr.firstName} ${usr.lastName}`,
                email: usr.email,
                username: usr.username,
                gender: usr.gender ? usr.gender : null,
                birthdate: usr.birthdate ? usr.birthdate.toLocaleDateString() : null,
                phoneNumber: usr.phoneNumber ? usr.phoneNumber : null,
                createdAt: usr.createdAt.toLocaleDateString(),
                updatedAt: usr.updatedAt.toLocaleString()
            }
        ))
        return res.status(200).json({ admins: _admins })

    } catch (error) {
        return res.status(400).json(error)
    }
}
