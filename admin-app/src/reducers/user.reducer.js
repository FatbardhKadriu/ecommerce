import { userConstants } from "../actions/constants";

const INITIAL_STATE = {
    error: null,
    success: '',
    loading: false,
    profile: {},
    updateSuccess: null,
    updateError: null
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
                error: null
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
                updateError: null,
                successError: null
            }
        case userConstants.UPDATE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                profile: action.payload.user,
                updateSuccess: action.payload.success,
                updateError: null
            }
        case userConstants.UPDATE_USER_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                updateError: action.payload.error,
                updateSuccess: null,
            }
        case userConstants.RESET_MESSAGES: {
            return {
                ...state,
                updateError: null,
                updateSuccess: null
            }
        }
        default:
            return state
    }
}

export default userReducer