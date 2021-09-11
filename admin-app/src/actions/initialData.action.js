import axios from "../helpers/axios"
import { categoryConstants, orderConstants, productConstants, userConstants } from "./constants"

export const getInitialData = () => async (dispatch) => {
    try {
        const res = await axios.post('/initialData')
        if (res.status === 200) {
            const { categories, totalCategories,
                products, totalProducts,
                orders, totalOrders, sales, itemsSold, totalUsers
            } = res.data
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories, totalCategories }
            })
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products, totalProducts }
            })
            dispatch({
                type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
                payload: { orders, totalOrders, sales, itemsSold }
            })
            dispatch({
                type: userConstants.GET_TOTAL_NUMBER_OF_USERS,
                payload: { totalUsers }
            })
        }
    } catch (error) {
        console.log(error.response)
    }

}