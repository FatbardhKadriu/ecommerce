const Order = require('../../models/Order')

exports.updateOrder = async (req, res) => {
    try {

        const updatedOrder = await Order.updateOne(
            { user: req.body.userId, "orderStatus.type": req.body.type },
            { $set: { "orderStatus.$": [{ type: req.body.type, date: new Date(), isCompleted: true }] } },
            { new: true }
        )
        return res.status(201).json({ order: updatedOrder })
    } catch (error) {
        return res.status(400).json(error)
    }
}