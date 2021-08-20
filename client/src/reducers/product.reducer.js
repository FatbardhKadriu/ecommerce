import { productConstants } from '../actions/constants'

const INITIAL_STATE = {
    products: [],
    productsByPrice: {
        under500: [],
        under700: [],
        under1000: [],
        under1500: [],
        under2000: [],
    },
    pageRequest: false,
    page: {},
    error: null
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
        case productConstants.GET_PRODUCT_PAGE_REQUEST:
            return {
                ...state,
                pageRequest: true
            }
        case productConstants.GET_PRODUCT_PAGE_SUCCESS:
            return {
                ...state,
                page: action.payload.page,
                pageRequest: false
            }
        case productConstants.GET_PRODUCT_PAGE_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                pageRequest: false
            }
        default:
            return state
    }
}