import axios from "../helpers/axios"
import { authConstants } from "./constants"

export const login = (user) => async (dispatch) => {
    try {
        dispatch({ type: authConstants.LOGIN_REQUEST })
        const res = await axios.post('/admin/signin', {
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

export const signout = () => async (dispatch) => {
    try {
        dispatch({ type: authConstants.LOGOUT_REQUEST })
        const res = await axios.post('/admin/signout')
        if (res.status === 200) {
            localStorage.clear()
            dispatch({ type: authConstants.LOGOUT_SUCCESS })
        }
        else {
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: { error: res.data.error }
            })
        }
    } catch (error) {
        dispatch({
            type: authConstants.LOGOUT_FAILURE,
            payload: { error: error.response.data.error }
        })
    }



}