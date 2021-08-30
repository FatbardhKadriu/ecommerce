import axios from "../helpers/axios"
import { pageConstants } from "./constants"

export const createPage = (form) => async (dispatch) => {
    try {
        dispatch({ type: pageConstants.CREATE_PAGE_REQUEST })
        const res = await axios.post('/page/create', form)
        if (res.status === 201) {
            dispatch({
                type: pageConstants.CREATE_PAGE_SUCCESS,
                payload: { 
                    page: res.data.page,
                    success: res.data.success
                 }
            })
        } else {
            dispatch({
                type: pageConstants.CREATE_PAGE_FAILURE,
                payload: { error: res.data.error }
            })
        }
    } catch (error) {
        console.log(error);
    }
}