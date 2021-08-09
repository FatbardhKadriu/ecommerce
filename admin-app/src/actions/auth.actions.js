import { authConstants } from "./constants"

export const login = (user) => async (dispatch) => {
   
    dispatch({
        type: authConstants.LOGIN_REQUEST,
        payload: {
            ...user
        }
    })
}

