import { userConstants } from "./constants"
import axios from "../helpers/axios"

export const signup = (form) => async (dispatch) => {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST })
    try {
        const res = await axios.post('/admin/signup', form)
        if (res.status === 201) {
            const { success } = res.data
            dispatch({
                type: userConstants.USER_REGISTER_SUCCESS,
                payload: { success }
            })
        }
        else {
            dispatch({
                type: userConstants.USER_REGISTER_FAILURE,
                payload: { error: res.data.error }
            })
        }
    } catch (error) {
        dispatch({
            type: userConstants.USER_REGISTER_FAILURE,
            payload: { error: error.response.data.error }
        })
    }
}

export const getProfile = () => async (dispatch) => {
    try {
        dispatch({ type: userConstants.GET_USER_PROFILE_REQUEST})
        const res = await axios.get('/admin/profile')
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
        const res = await axios.put('/admin/updateProfile', user)
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

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: userConstants.GET_ALL_USERS_REQUEST})
        const res = await axios.get('/admin/allUsers')
        if (res.status === 200) {
            const { users } = res.data
            dispatch({
                type: userConstants.GET_ALL_USERS_SUCCESS,
                payload: { users }
            })
        }
        else {
            dispatch({
                type: userConstants.GET_ALL_USERS_FAILURE,
                payload: { error: res.data.error }
            })
        }
    } catch (error) {
        dispatch({
            type: userConstants.GET_ALL_USERS_FAILURE,
            payload: { error: error.response?.data.error }
        })
    }
}

export const getAllAdmins = () => async (dispatch) => {
    try {
        dispatch({ type: userConstants.GET_ALL_ADMINS_REQUEST})
        const res = await axios.get('/admin/allAdmins')
        if (res.status === 200) {
            const { admins } = res.data
            dispatch({
                type: userConstants.GET_ALL_ADMINS_SUCCESS,
                payload: { admins }
            })
        }
        else {
            dispatch({
                type: userConstants.GET_ALL_ADMINS_FAILURE,
                payload: { error: res.data.error }
            })
        }
    } catch (error) {
        dispatch({
            type: userConstants.GET_ALL_ADMINS_FAILURE,
            payload: { error: error.response?.data.error }
        })
    }
}