import { productConstants } from "../actions/constants";

const INITIAL_STATE = {
    products: [],
};
 
const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload.products
            }
        default:
            return state
    }
}

export default productReducer