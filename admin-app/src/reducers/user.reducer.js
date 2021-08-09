import { userConstants } from "../actions/constants";

const INITIAL_STATE = {
    error: null,
    message: 'aaaa',
    loading: false
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
                message: action.payload.message
            }
        case userConstants.USER_REGISTER_FAILURE: 
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