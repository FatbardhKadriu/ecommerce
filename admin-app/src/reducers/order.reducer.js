import { orderConstants } from "../actions/constants";

const INITIAL_STATE = {
    orders: [],
    loading: false,
    error: null
};

const orderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case orderConstants.GET_CUSTOMER_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case orderConstants.GET_CUSTOMER_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.payload.orders
            }
        case orderConstants.GET_CUSTOMER_ORDER_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default orderReducer