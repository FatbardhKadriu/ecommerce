import { authConstants } from "../actions/constants";

const INITIAL_STATE = {
    token: null,
    user: {
        firstName: '',
        lastName:  '',
        email:     '',
        picture:   ''
    },
    authenticate:   false,
    authenticating: false,
    loading:        false,
    error:          null,
    message:        ''
};
 
const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case authConstants.LOGIN_REQUEST: 
            return {
                ...state, 
                authenticating: true 
            }
        case authConstants.LOGIN_SUCCESS: 
            return { 
                ...state, 
                user:           action.payload.user,
                token:          action.payload.token,
                authenticate:   true,
                authenticating: false
            }
        case authConstants.LOGIN_FAILURE: 
            return {
                ...state,
                authenticating: false,
                error: action.payload.error
            }
        case authConstants.LOGOUT_REQUEST: 
            return {
                ...state,
                loading: true
            }
        case authConstants.LOGOUT_SUCCESS: 
            return {
                ...INITIAL_STATE
            }     
        case authConstants.LOGOUT_FAILURE: 
            return {
                ...state,
                error:   action.payload.error,
                loading: false
            }       
        default:
            return state
    }
}

export default authReducer