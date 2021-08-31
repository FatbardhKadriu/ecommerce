import axios from '../helpers/axios'
import { productConstants } from './constants';

export const getProductsBySlug = (slug) => async (dispatch) => {
    
    try {
        const res = await axios.get(`/products/${slug}`);
        if (res.status === 200) {
            dispatch({
                type: productConstants.GET_PRODUCTS_BY_SLUG,
                payload: res.data
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const getProductPage = (payload) => async (dispatch) => {
    try {
        const { cid, type } = payload.params
        dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST })
        const res = await axios.get(`/page/${cid}/${type}`);
        if (res.status === 200) {
            const { page } = res.data
            dispatch({
                type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
                payload: { page }
            })
        }
        else {
            const { error } = res.data
            dispatch({
                type: productConstants.GET_PRODUCT_PAGE_FAILURE,
                payload: { error }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const getProductDetailsById = (payload) => async (dispatch) => {
    try {
        dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST })
        const { productId } = payload.params
        const res = await axios.get(`/product/${productId}`)
        dispatch({
            type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
            payload: { productDetails: res.data.product }
        })
    } catch (error) {
        dispatch({
            type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
            payload: { error: error.response.data.error }
        })
    }
}