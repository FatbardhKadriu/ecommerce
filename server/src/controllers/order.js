const Order = require('../models/Order')
const Cart = require('../models/Cart')
const Address = require('../models/Address')

exports.addOrder = async (req, res) => {
    try {
        await Cart.deleteOne({ user: req.user._id })
        req.body.user = req.user._id
        req.body.orderStatus = [
            {
                type: 'ordered',
                date: new Date(),
                isCompleted: true,
            },
            {
                type: 'packed',
                isCompleted: false,
            },
            {
                type: 'shipped',
                isCompleted: false,
            },
            {
                type: 'delivered',
                isCompleted: false,
            }
        ]
        const order = await new Order(req.body).save()
        return res.status(201).json({ order })
    } catch (error) {
        return res.status(400).json({ error })
    }
}

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .select("_id paymentStatus items")
            .populate("items.productId", "_id name productPictures")
            .sort({ _id: -1 })
        return res.status(200).json({ orders })
    } catch (error) {
        return res.status(400).json({ error })
    }
}

exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.body.orderId })
            .populate("items.productId", "_id name productPictures slug")
            .lean()

        if (!order) {
            return res.status(400).json({ error: "Order not found" })
        }
        const address = await Address.findOne({ user: req.user._id })

        if (!address) {
            return res.status(400).json({ error: "Address not found" })
        }

        order.address = address.address.find(adr =>
            adr._id.toString() == order.addressId.toString())

        res.status(200).json({ order })
    } catch (error) {
        return res.status(400).json({ error })
    }
}