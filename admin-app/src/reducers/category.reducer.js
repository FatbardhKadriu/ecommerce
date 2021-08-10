import { categoryConstants } from "../actions/constants";

const INITIAL_STATE = {
    categories: [],
    loading:    false,
    error:      null
};
 
const categoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            return { 
                ...state,
                categories: action.payload.categories
            }
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
            return { 
                ...state
            }
        case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
            return {
                ...state
            }     
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST: 
            return {
                ...state,
                loading: true
            }                
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS: 
            return {
                ...state,
                loading: false
            }    
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE: 
            return {
                ...INITIAL_STATE
            }                                          
        default:
            return state
    }
}

export default categoryReducer