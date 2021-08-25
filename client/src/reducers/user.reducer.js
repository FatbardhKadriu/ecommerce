import { userConstants } from "../actions/constants";

const INITIAL_STATE = {
    address: [],
    orders: [],
    error: null,
    loading: false,
    orderFetching: false
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userConstants.GET_USER_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case userConstants.GET_USER_ADDRESS_SUCCESS:
            return {
                ...state,
                address: action.payload.address,
                loading: false
            }
        case userConstants.GET_USER_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case userConstants.ADD_USER_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case userConstants.ADD_USER_ADDRESS_SUCCESS:
            return {
                ...state,
                address: action.payload.address,
                loading: false
            }
        case userConstants.ADD_USER_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case userConstants.GET_USER_ORDER_REQUEST:
            return {
                ...state,
                orderFetching: true
            }
        case userConstants.GET_USER_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.payload.orders,
                orderFetching: false
            }
        case userConstants.GET_USER_ORDER_FAILURE:
            return {
                ...state,
                orderFetching: false,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default userReducer