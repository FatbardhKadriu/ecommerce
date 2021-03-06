import axios from "../helpers/axios"
import { categoryConstants } from "./constants"

const getAllCategories = () => async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST })
    const res = await axios.get('category/getcategory')
    try {
        if (res.status === 200) {
            const { categoryList } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categoryList }
            })
        }
        else {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            })
        }
    } catch (error) {
        dispatch({
            type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
            payload: { error: res.data.error }
        })
    }
}

export const addCategory = (form) => async (dispatch) => {
    dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST })
    try {
        const res = await axios.post('category/create', form)
        if (res.status === 201) {
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                payload: {
                    category: res.data.category,
                    success: res.data.success
                }
            })
        }
        else {
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                payload: { error: res.data.error }
            })
        }

    } catch (error) {
        dispatch({
            type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
            payload: { error: error.response.data.error }
        })
    }
}

export const updateCategories = (form) => async (dispatch) => {

    try {
        dispatch({ type: categoryConstants.UPDATE_CATEGORIES_REQUEST })
        const res = await axios.post('category/update', form)
        if (res.status === 200) {
            dispatch({ 
                type: categoryConstants.UPDATE_CATEGORIES_SUCCESS,
                payload: { success: res.data.success }
             })
            dispatch(getAllCategories())
        }
        else {
            const { error } = res.data
            dispatch({
                type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
                payload: { error }
            })
        }
    } catch (error) {
        dispatch({
            type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
            payload: { error: error.response.data.error }
        })
    }
}

export const deleteCategories = (ids) => async (dispatch) => {

    dispatch({ type: categoryConstants.DELETE_CATEGORIES_REQUEST })

    try {
        const res = await axios.post('/category/delete', {
            payload: { ids }
        })
        if (res.status === 200) {
            dispatch(getAllCategories())
            dispatch({
                type: categoryConstants.DELETE_CATEGORIES_SUCCESS,
                payload: { success: res.data.success }
            })
        }
        else {
            const { error } = res.data
            dispatch({
                type: categoryConstants.DELETE_CATEGORIES_FAILURE,
                payload: { error }
            })
        }
    } catch (error) {
        const { data } = error.response
        dispatch({
            type: categoryConstants.DELETE_CATEGORIES_FAILURE,
            payload: { error: data.error }
        })
    }

}

export {
    getAllCategories
}