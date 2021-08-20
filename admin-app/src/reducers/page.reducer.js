import { pageConstants } from "../actions/constants";

const INITIAL_STATE = {
    error: null,
    loading: false,
    page: {}
};

const pageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case pageConstants.CREATE_PAGE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case pageConstants.CREATE_PAGE_SUCCESS:
            return {
                ...state,
                page: action.payload.page,
                loading: false
            }
        case pageConstants.CREATE_PAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default pageReducer