import authReducer     from "./auth.reducer"
import userReducer     from "./user.reducer"
import productReduceer from './product.reducer'
import categoryReducer from './category.reducer'
import orderReducer    from './order.reducer'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth:     authReducer,
    user:     userReducer,
    category: categoryReducer,
    product:  productReduceer,
    order:    orderReducer
})

export default rootReducer