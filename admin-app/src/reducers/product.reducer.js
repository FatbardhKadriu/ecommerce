import { productConstants } from "../actions/constants";

const INITIAL_STATE = {
    products: [],
    error: null,
    addedSuccessfully: false,
    deletedSuccessfully: false,
};
 
const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload.products
            }
        case productConstants.ADD_NEW_PRODUCT_SUCCESS: {
            return {
                ...state,
                addedSuccessfully: true
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
                deletedSuccessfully: true
            }
        case productConstants.DELETE_PRODUCT_BY_ID_FAILURE: 
            return {
                ...state,
                error: action.payload.error,
                deletedSuccessfully: false
            }
            
        default:
            return state
    }
}

export default productReducer