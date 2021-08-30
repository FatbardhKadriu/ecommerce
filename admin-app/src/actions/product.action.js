import axios from "../helpers/axios"
import { productConstants } from "./constants"

export const addProduct = form => async (dispatch) => {
    try {
        dispatch({ type: productConstants.ADD_NEW_PRODUCT_REQUEST })
        const res = await axios.post('product/create', form)
        if (res.status === 201) {
            dispatch({
                type: productConstants.ADD_NEW_PRODUCT_SUCCESS,
                payload: { success: res.data.success }
            })
            dispatch(getProducts())
        } else {
            const { error } = res.data
            dispatch({
                type: productConstants.ADD_NEW_PRODUCT_FAILURE,
                payload: { error }
            })
        }
    } catch (error) {
        dispatch({
            type: productConstants.ADD_NEW_PRODUCT_FAILURE,
            payload: { error: error.response.data.error }
        })
    }
}

const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST })
        const res = await axios.get('/product/getproducts')
        if (res.status === 200) {
            const { products } = res.data
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products }
            })
        } else {
            const { error } = res.data
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_FAILURE,
                payload: { error }
            })
        }
    } catch (error) {
        dispatch({
            type: productConstants.GET_ALL_PRODUCTS_FAILURE,
            payload: { error: error.response.data.error }
        })
    }
}

export const deleteProductById = (payload) => async (dispatch) => {
    try {
        const res = await axios.delete('/product/deleteProductById', {
            data: { payload }
        })
        dispatch({ 
            type: productConstants.DELETE_PRODUCT_BY_ID_REQUEST
         })
        if (res.status === 202) {
            dispatch({ 
                type: productConstants.DELETE_PRODUCT_BY_ID_SUCCESS,
                payload: { success: res.data.success }
            })
            dispatch(getProducts())
        } else {
            const { error } = res.data
            dispatch({
                type: productConstants.DELETE_PRODUCT_BY_ID_FAILURE,
                payload: { error }
            })
        }
    } catch (error) {
        dispatch({
            type: productConstants.DELETE_PRODUCT_BY_ID_FAILURE,
            payload: { error: error.response.data.error }
        })
    }
}

export {
    getProducts
}