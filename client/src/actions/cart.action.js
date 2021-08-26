import axios from '../helpers/axios'
import store from '../store'
import { cartConstants } from './constants'

export const addToCart = (product, newQty = 1) => async (dispatch) => {
    const {
        cart: {
            cartItems
        },
        auth
    } = store.getState()

    const qty = cartItems[product._id] ? parseInt(cartItems[product._id].qty + newQty) : 1
    cartItems[product._id] = {
        ...product,
        qty
    }

    if (auth.authenticate) {
        dispatch({ type: cartConstants.ADD_TO_CART_REQUEST })
        const payload = {
            cartItems: [
                {
                    product: product._id,
                    quantity: qty
                }
            ]
        }
        console.log(payload)
        const res = await axios.post('/user/cart/addtocart', payload)
        console.log(res)
        if (res.status === 201) {
            dispatch(getCartItems())
        }
    } else {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }

    dispatch({
        type: cartConstants.ADD_TO_CART_SUCCESS,
        payload: { cartItems }
    })
}

const getCartItems = () => async (dispatch) => {

    dispatch({ type: cartConstants.ADD_TO_CART_REQUEST })
    try {

        const res = await axios.post('/user/getCartItems')
        if (res.status === 200) {
            const { cartItems } = res.data
            console.log({ getCartItems: cartItems })

            if (cartItems) {
                dispatch({
                    type: cartConstants.ADD_TO_CART_SUCCESS,
                    payload: { cartItems }
                })
            }
        }
    } catch (error) {
        console.log(error)
    }


}

export const updateCart = () => async (dispatch) => {
    const { auth } = store.getState()
    const cart = localStorage.getItem('cart')
    const cartItems = cart ?
        JSON.parse(cart) : null

    if (auth.authenticate) {
        localStorage.removeItem('cart')

        if (cartItems) {
            const payload = {
                cartItems: Object.keys(cartItems).map((key, index) => {
                    return {
                        quantity: cartItems[key].qty,
                        product: cartItems[key]._id
                    }
                })
            }
            if (Object.keys(cartItems).length > 0) {
                const res = await axios.post('/user/cart/addtocart', payload)
                if (res.status === 201) {
                    dispatch(getCartItems())
                }
            }
        }
    } else {
        if (cartItems) {
            dispatch({
                type: cartConstants.ADD_TO_CART_SUCCESS,
                payload: { cartItems }
            })
        }
    }

}

export const removeCartItem = (payload) => async (dispatch) => {
    dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST })
    try {

        const res = await axios.post('/user/cart/removeItem', { payload })
        if (res.status === 202) {
            dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS })
            dispatch(getCartItems())
        } else {
            const { error } = res.data
            dispatch({
                type: cartConstants.REMOVE_CART_ITEM_FAILURE,
                payload: { error }
            })
        }
    } catch (error) {
        console.log(error)
    }

}

export {
    getCartItems
}