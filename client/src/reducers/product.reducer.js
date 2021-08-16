import { productConstants } from '../actions/constants'

const INITIAL_STATE = {
    products: [],
    productsByPrice: {
        under500: [],
        under700: [],
        under1000: [],
        under1500: [],
        under2000: [],
    }
}
 
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case productConstants.GET_PRODUCTS_BY_SLUG:
            return {
                ...state,
                products: action.payload.products,
                productsByPrice: {
                    ...action.payload.productsByPrice
                }
            }
        default:
            return state
    }
}