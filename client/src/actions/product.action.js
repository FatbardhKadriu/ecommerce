import axios from '../helpers/axios'
import { productConstants } from './constants';

export const getProductsBySlug = (slug) => async (dispatch) => {
    const res = await axios.get(`/products/${slug}`);

    console.log(res);
    if (res.status === 200)
    {
        dispatch({
            type:    productConstants.GET_PRODUCTS_BY_SLUG,
            payload: res.data 
        })
    }
    else 
    {
        console.log("Error");
    }

} 