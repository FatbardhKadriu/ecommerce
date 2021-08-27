const Order = require('../../models/Order')
const mongoose = require('mongoose')

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

exports.searchOrder = async (req, res) => {
    try {
        if (req.params.orderId) {
            if (mongoose.isValidObjectId(req.params.orderId)) {
                const order = await Order.find({ _id: req.params.orderId })
                .populate("items.productId", "name")
                
                if (!order) {
                    return res.status(400).json({ message: "No order was found" })
                }
                return res.status(200).json({ orders: order })
            } else {
                return res.status(400).json({ error: "Invalid orderId" })
            }
        } else {
            return res.status(400).json({ error: "Params required" })
        }
    } catch (error) {
        return res.status(400).json(error)
    }
}
