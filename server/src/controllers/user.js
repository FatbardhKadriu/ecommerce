const User = require('../models/User')

module.exports.signup = async (req, res) => {

    const { firstName, lastName, email, password } = req.body;

    const userExist = await User.findOne({ email })

    if (userExist)
        return res.status(400).json({ message: 'User already registered' })

    const _user = new User({ firstName, lastName, email, password, username: Math.random().toString() })

    await _user.save()
    
    res.status(201).json({ message: 'User created successfully..!' })
}