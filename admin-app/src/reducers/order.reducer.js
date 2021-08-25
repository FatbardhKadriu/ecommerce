import { orderConstants } from "../actions/constants";

const INITIAL_STATE = {
    orders: []
};
 
 const orderReducer =  (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case orderConstants.GET_CUSTOMER_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.payload.orders
            }
        default:
            return state
    }
}

export default orderReducer