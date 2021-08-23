import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Layout from "../../components/Layout"
import Card from "../../components/UI/Card"
import { addToCart, getCartItems } from "../../actions"
import CartItem from "./CartItem"
import "./style.css"

/*
Before Login
Add product to cart
save in localStorage
when try to checkout ask for credentials and 
if logged in then add products to users cart database from localStorage
*/

const CartPage = (props) => {

    const cart = useSelector(state => state.cart)
    const auth = useSelector(state => state.auth)
    const [cartItems, setCartItems] = useState({})

    const dispatch = useDispatch()

    useEffect(() => {
        setCartItems(cart.cartItems)
    }, [cart.cartItems])

    useEffect(() => {
        if (auth.authenticate) {
            dispatch(getCartItems())
        }
    }, [auth.authenticate])

    const onQuantityIncrement = (_id, qty) => {
        const { name, price, img } = cartItems[_id]
        dispatch(addToCart({ _id, name, price, img }, 1))
    }
    const onQuantityDecrement = (_id, qty) => {
        const { name, price, img } = cartItems[_id]
        dispatch(addToCart({ _id, name, price, img }, -1))
    }

    return (
        <Layout>
            <div className="cartContainer" style={{ alignItems: "flex-start" }}>
                <Card
                    headerLeft={`My Cart`}
                    headerRight={<div>Deliver to</div>}
                    style={{ width: "calc(100% - 400px)", overflow: "hidden" }}
                >
                    {
                        Object.keys(cartItems).map((key, index) =>
                            <CartItem
                                key={index}
                                cartItem={cartItems[key]}
                                onQuantityInc={onQuantityIncrement}
                                onQuantityDec={onQuantityDecrement}
                            />
                        )
                    }
                </Card>
                <Card
                    headerLeft='Price'
                    style={{
                        width: '500px',
                    }}></Card>
            </div>
        </Layout>
    );
};

export default CartPage;