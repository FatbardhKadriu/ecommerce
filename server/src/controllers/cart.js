const Cart = require('../models/Cart')

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
    const product = req.body.cartItems.product 
    const item = cartExist.cartItems.find(c => c.product == product)
    let updatedCart
    if (item) {

        updatedCart = await Cart.findOneAndUpdate(
            { user: req.user._id, "cartItems.product": product },
            { $set: { "cartItems": { ...req.body.cartItems, quantity: item.quantity + req.body.cartItems.quantity } } },
            { new: true }
        )
    } else {

        updatedCart = await Cart.findOneAndUpdate(
            { user: req.user._id },
            { $push: { "cartItems": req.body.cartItems } },
            { new: true }
            )
    
        }
        res.status(200).json({ message: updatedCart })
    }
    
