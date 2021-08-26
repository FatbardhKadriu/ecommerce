import { productConstants } from '../actions/constants'

const INITIAL_STATE = {
    products: [],
    priceRange: {},
    productsByPrice: {},
    pageRequest: false,
    page: {},
    error: null,
    productDetails: {},
    loading: false,
}

const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case productConstants.GET_PRODUCTS_BY_SLUG:
            return {
                ...state,
                products: action.payload.products,
                priceRange: action.payload.priceRange,
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
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
            return {
                ...state,
                loading: true
            }
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                productDetails: action.payload.productDetails
            }
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        default:
            return state
    }
}

export default productReducer