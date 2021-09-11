import { userConstants } from "../actions/constants";

const INITIAL_STATE = {
    error: null,
    success: null,
    loading: false,
    profile: {},
    totalUsers: 0,
};

const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case userConstants.USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case userConstants.USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                error: null
            }
        case userConstants.USER_REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
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
        case userConstants.GET_TOTAL_NUMBER_OF_USERS: 
            return {
                ...state, 
                totalUsers: action.payload.totalUsers
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