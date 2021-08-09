import { authConstants } from "../actions/constants";

const INITIAL_STATE = {
    name: 'Fatbardh'
};
 
export default (state = INITIAL_STATE, action) => {
    console.log(action)
    switch (action.type) {
        case authConstants.LOGIN_REQUEST: 
            return {...state, ...action.payload}
        default:
            return state
    }
}