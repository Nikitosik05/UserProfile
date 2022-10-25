import { USER_CHECK_AUTH, USER_LOGIN, USER_LOGOUT, USER_SIGN_UP } from "../types/userTypes"

const initialState = {
    user: null,
    isLoggedIn: false
}




const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case USER_LOGIN:
            return { ...state, user: action.payload.foundUser, isLoggedIn: true }

        case USER_SIGN_UP:
            return { ...state, user: action.payload.newUser, isLoggedIn: true }
       
            case USER_LOGOUT:
            return { ...state, user: null, isLoggedIn: false}

        case USER_CHECK_AUTH:
            return { ...state, user: action.payload, isLoggedIn: true }

        default:
            return state
    }
}

export default userReducer