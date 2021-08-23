const Cart = require('../models/Cart')

function runUpdate(condition, updateData) {
    return new Promise((resolve, reject) => {
        Cart.findOneAndUpdate(condition, updateData, { upsert: true })
            .then(result => resolve())
            .catch(err => reject(err))
    })
}

exports.addItemToCart = async (req, res) => {

    const cartExist = await Cart.findOne({ user: req.user._id })

    if (!cartExist) {
        // cart doesn't exists, create it
        const cart = new Cart({
            user: req.user._id,
            cartItems: req.body.cartItems
        })

        await cart.save()
        return res.status(201).json({ cart })
    }

    // cart already exists, update it

    let promisesArray = []

    req.body.cartItems.forEach((cartItem) => {
        const product = cartItem.product
        const item = cartExist.cartItems.find(c => c.product == product)

        let condition, update

        if (item) {
            condition = { user: req.user._id, "cartItems.product": product }

            update = {
                $set: {
                    "cartItems.$": cartItem
                }
            }
        }
        else {
            condition = { user: req.user._id }

            update = { $push: { "cartItems": cartItem } }
        }
        promisesArray.push(runUpdate(condition, update))
    })

    Promise.all(promisesArray)
        .then(response => res.status(201).json({ response }))
        .catch(error => res.status(400).json({ error }))
}


exports.getCartItems = async (req, res) => {

    const cart = await Cart.findOne({ user: req.user._id })
         .populate("cartItems.product", "_id name price productPictures")
    
    if (!cart) {
        return res.status(404).json({ error: "Cart not found" })
    }

    let cartItems = {}
    cart.cartItems.forEach((item, index) => {
        cartItems[item.product._id.toString()] = {
            _id: item.product._id.toString(),
            name: item.product.name,
            img: item.product.productPictures[0].img,
            price: item.product.price,
            qty: item.quantity
        }
    })
    res.status(200).json({ cartItems })

}