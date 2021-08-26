import axios from "../helpers/axios"
import { authConstants, cartConstants } from "./constants"

export const signup = (user) => async (dispatch) => {
    dispatch({ type: authConstants.SIGNUP_REQUEST })
    try {
        const res = await axios.post('/signup', user)
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
            console.log(res)
            if (res.status === 400) {
                console.log(res.data.error)
                dispatch({
                    type: authConstants.SIGNUP_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        }
    } catch (error) {
        const { data } = error.response
        console.log(error)
        dispatch({
            type: authConstants.SIGNUP_FAILURE,
            payload: { error: data.error }
        })
    }
}

export const login = (user) => async (dispatch) => {
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
        if (res.status === 400) {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: res.data.error }
            })
        }
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
    else {
        dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: {
                error: 'Failed to login'
            }
        })
    }
}

export const signout = () => async (dispatch) => {

    dispatch({ type: authConstants.LOGOUT_REQUEST })
    // localStorage.removeItem('user')
    // localStorage.removeItem('token')
    localStorage.clear()
    dispatch({ type: authConstants.LOGOUT_SUCCESS })
    dispatch({ type: cartConstants.RESET_CART })

}

