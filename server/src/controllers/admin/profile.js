const User = require('../../models/User')

exports.getProfile = async (req, res) => {
    const _id = req.user._id
    try {
        const user = await User.findOne({ _id })

        if (!user) {
            return res.status(400).json({ error: `No user was found with id ${_id}`})
        }
        return res.status(200).json({ user })

    } catch (error) {
        return res.status(400).json(error)
    }
}

