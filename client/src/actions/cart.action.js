import store from '../store'
import { cartConstants } from './constants'

export const addToCart = (product, newQty=null) => async (dispatch) => {
    const { cartItems } = store.getState().cart

    const qty = cartItems[product._id] ? parseInt(cartItems[product._id].qty + newQty) : 1
    cartItems[product._id] = {
        ...product,
        qty
    }

    localStorage.setItem('cart', JSON.stringify(cartItems))

    dispatch({
        type: cartConstants.ADD_TO_CART,
        payload: { cartItems }
    })
}

export const getCartItems = () => async (dispatch) => {

}

export const removeCartItem = () => async (dispatch) => {

}

export const updateCart = () => async (dispatch) => {
    const cart = localStorage.getItem('cart')
    const cartItems = cart ?
        JSON.parse(cart) : null

    if (cartItems) {
        dispatch({
            type: cartConstants.ADD_TO_CART,
            payload: { cartItems }
        })
    }
}