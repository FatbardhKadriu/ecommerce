const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    addressId: {
        type: Schema.Types.ObjectId,
        ref: "UserAddress.address",
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            payablePrice: {
                type: Number,
                required: true
            },
            purchasedQty: {
                type: Number,
                required: true
            }
        }
    ],
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "cancelled", "refund"],
        required: true
    }

}, { timestamps: true })

module.exports = model('Order', orderSchema)