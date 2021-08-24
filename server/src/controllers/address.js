const UserAddress = require('../models/Address')

exports.addAddress = async (req, res) => {
    const { payload } = req.body

    if (!payload.address) {
        return res.status(400).json({ error: "Params address required " })
    }

    if (payload.address._id) {
        try {
            const updatedAddress = await UserAddress.findOneAndUpdate(
                { user: req.user._id, 'address._id': payload.address._id },
                { $set: { 'address.$': payload.address } },
                { new: true }
            )
            return res.status(201).json({ address: updatedAddress })
        } catch (error) {
            return res.status(400).json({ error })
        }
    }
    else {
        try {
            const address = await UserAddress.findOneAndUpdate(
                { user: req.user._id },
                { $push: { "address": payload.address } },
                { new: true, upsert: true }
            )
            return res.status(201).json({ address })
        } catch (error) {
            return res.status(400).json({ error })
        }
    }
}

exports.getAddress = async (req, res) => {
    try {
        const userAddress = await UserAddress.findOne({ user: req.user._id })
        if (!userAddress) {
            return res.status(400).json({ error: "Address doesn't exist" })
        }
        return res.status(200).json({ userAddress })
    } catch (error) {
        return res.status(400).json({ error })
    }
}