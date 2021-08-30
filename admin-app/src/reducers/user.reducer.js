import { userConstants } from "../actions/constants";

const INITIAL_STATE = {
    error: null,
    message: '',
    loading: false,
    profile: {}
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
                message: action.payload.message,
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
        default:
            return state
    }
}

export default userReducer