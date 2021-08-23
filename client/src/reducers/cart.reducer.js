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
    }
};
 
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case cartConstants.ADD_TO_CART:
            return {
                ...state,
                cartItems: action.payload.cartItems
            }
        default:
            return state
    }
}