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
    dispatch({ type: userConstants.GET_USER_PROFILE_REQUEST})

    try {
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