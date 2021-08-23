import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Layout from "../../components/Layout"
import Card from "../../components/UI/Card"
import { addToCart, getCartItems, removeCartItem } from "../../actions"

import "./style.css"
import { MaterialButton } from "../../components/MaterialUI"

/*
Before Login
Add product to cart
save in localStorage
when try to checkout ask for credentials and 
if logged in then add products to users cart database from localStorage
*/

const CartPage = (props) => {
    const auth = useSelector((state) => state.auth)
    const cart = useSelector((state) => state.cart)

    const cartItems = cart.cartItems
    const dispatch = useDispatch()

    useEffect(() => {
        if (auth.authenticate) {
            dispatch(getCartItems())
        }
    }, [auth.authenticate])


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
                            <div key={index} className="flexRow">
                                <div className="cartProductContainer">
                                    <img src="" />
                                </div>
                                <div className="cartItemDetails">
                                    <div>
                                        {cartItems[key].name } - qty - { cartItems[key].qty} 
                                    </div>
                                    <div>Delivery in 3 - 5 days</div>
                                </div>
                            </div>
                        )
                    }
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            background: "#ffffff",
                            justifyContent: "flex-end",
                            boxShadow: "0 0 10px 10px #eee",
                            padding: "10px 0",
                            boxSizing: "border-box",
                        }}
                    >
                        <div style={{ width: "250px" }}>
                            <MaterialButton
                                title="PLACE ORDER"
                                onClick={() => props.history.push(`/checkout`)}
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </Layout>
    );
};

export default CartPage;