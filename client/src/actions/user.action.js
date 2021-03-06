import axios from '../helpers/axios'
import { cartConstants, userConstants } from './constants'

export const getAddress = () => async (dispatch) => {
    try {
        const res = await axios.post('/user/getaddress')
        dispatch({ type: userConstants.GET_USER_ADDRESS_REQUEST })
        if (res.status === 200) {
            const {
                userAddress: {
                    address
                }
            } = res.data
            dispatch({
                type: userConstants.GET_USER_ADDRESS_SUCCESS,
                payload: { address }
            })
        } else {
            const { error } = res.data
            dispatch({
                type: userConstants.GET_USER_ADDRESS_FAILURE,
                payload: { error }
            })
        }

    } catch (error) {
        console.log(error);
    }
}

export const addAddress = (payload) => async (dispatch) => {
    try {
        const res = await axios.post('/user/address/create', { payload })
        dispatch({ type: userConstants.ADD_USER_ADDRESS_REQUEST })
        if (res.status === 201) {
            const {
                address: { address }
            } = res.data
            dispatch({
                type: userConstants.ADD_USER_ADDRESS_SUCCESS,
                payload: { address }
            })
        } else {
            const { error } = res.data
            dispatch({
                type: userConstants.ADD_USER_ADDRESS_FAILURE,
                payload: { error }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const addOrder = (payload) => async (dispatch) => {
    try {
        const res = await axios.post('/addOrder', payload)
        dispatch({ type: userConstants.ADD_USER_ORDER_REQUEST })
        if (res.status === 201) {
            console.log(res)
            dispatch({
                type: cartConstants.RESET_CART
            })
            dispatch({
                type: userConstants.ADD_USER_ORDER_SUCCESS,
                payload: res.data.order
            })
        } else {
            const { error } = res.data
            dispatch({
                type: userConstants.ADD_USER_ORDER_FAILURE,
                payload: { error }
            })
        }
    } catch (error) {
        console.log(error)
    }
}


export const getOrders = () => async (dispatch) => {
    try {
        const res = await axios.get('/getOrders')
        dispatch({ type: userConstants.GET_USER_ORDER_REQUEST })
        if (res.status === 200) {
            console.log(res)
            const { orders } = res.data
            dispatch({
                type: userConstants.GET_USER_ORDER_SUCCESS,
                payload: { orders }
            })
        } else {
            const { error } = res.data
            dispatch({
                type: userConstants.GET_USER_ORDER_FAILURE,
                payload: { error }
            })
        }
    } catch (error) {
        console.log(error)
    }
}


export const getOrder = (payload) => async (dispatch) => {
    try {
        const res = await axios.post('/getOrder', payload)
        console.log(payload)
        dispatch({ type: userConstants.GET_USER_ORDER_DETAILS_REQUEST })
        if (res.status === 200) {
            console.log(res)
            const { order } = res.data
            dispatch({
                type: userConstants.GET_USER_ORDER_DETAILS_SUCCESS,
                payload: { order }
            })
        } else {
            const { error } = res.data
            dispatch({
                type: userConstants.GET_USER_ORDER_DETAILS_FAILURE,
                payload: { error }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const getProfile = () => async (dispatch) => {
    try {
        dispatch({ type: userConstants.GET_USER_PROFILE_REQUEST})
        const res = await axios.get('/profile')
        if (res.status === 200) {
            const { user } = res.data
            dispatch({
                type: userConstants.GET_USER_PROFILE_SUCCESS,
                payload: { user }
            })
        }
        else {
            dispatch({
                type: userConstants.GET_USER_PROFILE_FAILURE,
                payload: { error: res.data.error }
            })
        }
    } catch (error) {
        dispatch({
            type: userConstants.GET_USER_PROFILE_FAILURE,
            payload: { error: error.response.data.error }
        })
    }
}

export const updateProfile = (user) => async (dispatch) => {
    try {
        dispatch({ type: userConstants.UPDATE_USER_PROFILE_REQUEST})
        const res = await axios.put('/updateProfile', user)
        if (res.status === 200) {
            const { user, success } = res.data
            dispatch({
                type: userConstants.UPDATE_USER_PROFILE_SUCCESS,
                payload: { user, success }
            })
        }
        else {
            dispatch({
                type: userConstants.UPDATE_USER_PROFILE_FAILURE,
                payload: { error: res.data.error }
            })
        }
    } catch (error) {
        dispatch({
            type: userConstants.UPDATE_USER_PROFILE_FAILURE,
            payload: { error: error.response.data.error }
        })
    }
}