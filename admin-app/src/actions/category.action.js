import axios from "../helpers/axios"
import { categoryConstants } from "./constants"

export const getAllCategories = () => async (dispatch) => {

    dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST })
    
    const res = await axios.get('category/getcategory')
    console.log(res)

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
}

export const addCategory = (form) => async (dispatch) => {

    dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST })
    
    const res = await axios.post('category/create', form)

    if (res.status === 201) {
        dispatch({ 
            type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
            payload: { category: res.data.category }
        })
    }
    else {
        dispatch({ 
            type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
            payload: { error: res.data.error }
        })
    }

    console.log(res)
}

export const updateCategories = (form) => async (dispatch) => {

    const res = await axios.post('category/update', form)

    if (res.status === 201) {
        return true
    }
    else {
        return false
    }
}

export const deleteCategories = (ids) => async (dispatch) => {
    const res = await axios.post('/category/delete', {
        payload: {
            ids
        }
    })

    if (res.status === 200) {
        return true
    }
    else {
        return false
    }
}