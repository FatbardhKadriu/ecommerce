import axios from "../helpers/axios"
import { orderConstants } from "./constants"

export const searchOrderById = (orderId) => async (dispatch) => {
    try {
        dispatch({ type: orderConstants.SEARCH_ORDER_REQUEST })
        const res = await axios.get(`/order/${orderId}`)
        if (res.status === 200) {
            const { orders } = res.data
            dispatch({ type: orderConstants.SEARCH_ORDER_SUCCESS })
            dispatch({
                type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
                payload: { orders }
            })
        } else {
            const { error } = res.data
            dispatch({
                type: orderConstants.GET_CUSTOMER_ORDER_FAILURE,
                payload: { error }
            })
        }
    } catch (error) {
        dispatch({
            type: orderConstants.SEARCH_ORDER_FAILURE,
            payload: { error }
        })
    }
}

export const filterOrdersByDate = (date) => async (dispatch) => {
    try {
        dispatch({ type: orderConstants.SEARCH_ORDER_REQUEST })
        const res = await axios.get(`/orders/${date}`)
        if (res.status === 200) {
            const { orders } = res.data
            dispatch({ type: orderConstants.SEARCH_ORDER_SUCCESS })
            dispatch({
                type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
                payload: { orders }
            })
        } else {
            const { error } = res.data
            dispatch({
                type: orderConstants.GET_CUSTOMER_ORDER_FAILURE,
                payload: { error }
            })
        }
    } catch (error) {
        dispatch({
            type: orderConstants.SEARCH_ORDER_FAILURE,
            payload: { error }
        })
    }
}

export const getCustomerOrders = () => async (dispatch) => {
    try {
        dispatch({ type: orderConstants.GET_CUSTOMER_ORDER_REQUEST })
        const res = await axios.get('/orders/getCustomerOrders')
        if (res.status === 200) {
            const { orders } = res.data
            dispatch({
                type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
                payload: { orders }
            })
        } else {
            const { error } = res.data
            dispatch({
                type: orderConstants.GET_CUSTOMER_ORDER_FAILURE,
                payload: { error }
            })
        }
    } catch (error) {
        dispatch({
            type: orderConstants.GET_CUSTOMER_ORDER_FAILURE,
            payload: { error: error.response.data.error }
        })
    }
}

export const updateOrder = (payload) => async (dispatch) => {
    try {
        dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_REQUEST })
        const res = await axios.post('/order/update', payload)
        if (res.status === 200) {
            dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_SUCCESS })
            dispatch(getCustomerOrders())
        } else {
            const { error } = res.data
            dispatch({
                type: orderConstants.UPDATE_CUSTOMER_ORDER_FAILURE,
                payload: { error }
            })
        }
    } catch (error) {
        dispatch({
            type: orderConstants.UPDATE_CUSTOMER_ORDER_FAILURE,
            payload: { error: error.response.data.error }
        })
    }
}