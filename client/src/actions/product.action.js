import axios from '../helpers/axios'
import { productConstants } from './constants';

export const getProductsBySlug = (slug) => async (dispatch) => {
    const res = await axios.get(`/products/${slug}`);

    console.log(res);
    if (res.status === 200) {
        dispatch({
            type: productConstants.GET_PRODUCTS_BY_SLUG,
            payload: res.data
        })
    }
    else {
        console.log("Error");
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