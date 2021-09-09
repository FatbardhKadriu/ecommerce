import axios from "../helpers/axios"
import { authConstants, cartConstants } from "./constants"

export const signup = (form) => async (dispatch) => {
    try {
        dispatch({ type: authConstants.SIGNUP_REQUEST })
        const res = await axios.post('/signup', form)
        if (res.status === 201) {
            const { token, user } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: { token, user }
            })
        }
        else {
            dispatch({
                type: authConstants.SIGNUP_FAILURE,
                payload: { error: res.data.error }
            })
        }
    } catch (error) {
        const { data } = error.response
        dispatch({
            type: authConstants.SIGNUP_FAILURE,
            payload: { error: data.error }
        })
    }
}

export const login = (user) => async (dispatch) => {
    try {
        dispatch({ type: authConstants.LOGIN_REQUEST })
        const res = await axios.post('/signin', {
            ...user
        })
        if (res.status === 200) {
            const { token, user } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: { token, user }
            })
        }
        else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: res.data.error }
            })
        }
    } catch (error) {
        dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: { error: error.response.data.error }
        })
    }
}

export const isUserLoggedIn = () => async (dispatch) => {
    const token = localStorage.getItem('token')
    if (token) {
        const user = JSON.parse(localStorage.getItem('user'))
        dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: { token, user }
        })
    }
}

export const signout = (history) => async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST })
    localStorage.clear()
    dispatch({ type: authConstants.LOGOUT_SUCCESS })
    dispatch({ type: cartConstants.RESET_CART })
    history.push('/')
}

