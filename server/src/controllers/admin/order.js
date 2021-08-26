const Order = require('../../models/Order')

exports.updateOrder = async (req, res) => {
    try {

        const updatedOrder = await Order.updateOne(
            { _id: req.body.orderId, "orderStatus.type": req.body.type },
            { $set: { "orderStatus.$": [{ type: req.body.type, date: new Date(), isCompleted: true }] } },
            { new: true }
        )
        return res.status(201).json({ order: updatedOrder })
    } catch (error) {
        return res.status(400).json(error)
    }
}

exports.getCustomerOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("items.productId", "name")

        res.status(200).json({ orders })
    } catch (error) {
        res.status(400).json({ error })
    }
}