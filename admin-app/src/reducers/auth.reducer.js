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
    authenticating: false
};
 
const authReducer = (state = INITIAL_STATE, action) => {
    console.log(action)
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
        case authConstants.LOGOUT_REQUEST: 
            return {
                ...INITIAL_STATE
            }
        default:
            return state
    }
}

export default authReducer