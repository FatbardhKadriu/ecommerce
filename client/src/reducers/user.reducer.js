import { userConstants } from "../actions/constants";

const INITIAL_STATE = {
    address: [],
    orders: [],
    orderDetails: {},
    error: null,
    success: null,
    profile: {},
    loading: false,
    orderFetching: false,
    placedOrderId: null,
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
        case userConstants.GET_USER_ORDER_DETAILS_REQUEST:
            return {
                ...state,
            }
        case userConstants.GET_USER_ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                orderDetails: action.payload.order,
            }
        case userConstants.GET_USER_ORDER_DETAILS_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        case userConstants.ADD_USER_ORDER_SUCCESS:
            return {
                ...state,
                placedOrderId: action.payload._id
            }
        case userConstants.GET_USER_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case userConstants.GET_USER_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                profile: action.payload.user,
            }
        case userConstants.GET_USER_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case userConstants.UPDATE_USER_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case userConstants.UPDATE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                profile: action.payload.user,
                success: action.payload.success,
            }
        case userConstants.UPDATE_USER_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        case userConstants.RESET_MESSAGES: {
            return {
                ...state,
                error: null,
                success: null
            }
        }
        default:
            return state
    }
}

export default userReducer