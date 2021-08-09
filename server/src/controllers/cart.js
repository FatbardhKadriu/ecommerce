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
    let condition, update

    if (item) {
        condition = { user: req.user._id, "cartItems.product": product }
        
        update = { $set: { 
            "cartItems.$": { 
                ...req.body.cartItems, quantity: item.quantity + req.body.cartItems.quantity 
            }
          }
        }
    } 
    else {
        condition = { user: req.user._id }

        update = { $push: { "cartItems": req.body.cartItems } }
    }
    
    const updatedCart = await Cart.findOneAndUpdate( condition, update, { new: true } )

    res.status(200).json({ "Updated cart": updatedCart })
}
    
