import { cartConstants } from "../actions/constants";

const INITIAL_STATE = {
    cartItems: {
        // 123: {
        //     _id: 123,
        //     name: 'Samsung mobile',
        //     img: 'some.jpg',
        //     price: 200,
        //     qty: 1,
        // }
    },
    updatingCart: false,
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case cartConstants.ADD_TO_CART_REQUEST:
            return {
                ...state,
                updatingCart: true
            }
        case cartConstants.ADD_TO_CART_SUCCESS:
            return {
                ...state,
                cartItems: action.payload.cartItems,
                updatingCart: false
            }
        case cartConstants.ADD_TO_CART_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                updatingCart: false
            }
        case cartConstants.RESET_CART:
            return {
                ...INITIAL_STATE,
            }
        default:
            return state
    }
}