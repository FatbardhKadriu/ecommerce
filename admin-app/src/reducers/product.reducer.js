import { productConstants, } from "../actions/constants";

const INITIAL_STATE = {
    products: [],
    error: null,
    success: null,
    loading: false
};

const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case productConstants.GET_ALL_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload.products,
                loading: false
            }
        case productConstants.GET_ALL_PRODUCTS_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        case productConstants.ADD_NEW_PRODUCT_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }
        case productConstants.ADD_NEW_PRODUCT_SUCCESS: {
            return {
                ...state,
                success: action.payload.success
            }
        }
        case productConstants.ADD_NEW_PRODUCT_FAILURE: {
            return {
                ...state,
                error: action.payload.error
            }
        }
        case productConstants.DELETE_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                success: action.payload.success
            }
        case productConstants.DELETE_PRODUCT_BY_ID_FAILURE:
            return {
                ...state,
                error: action.payload.error,
            }
        case productConstants.RESET_MESSAGES:
            return {
                ...state,
                error: null,
                success: null,
                loading: false,
            }
        default:
            return state
    }
}

export default productReducer