import { checkLoginRequest, loginRequest, signUpRequest } from "../../api/userApi"
import { USER_CHECK_AUTH, USER_LOGIN, USER_LOGOUT, USER_SIGN_UP } from "../types/userTypes"









export const userLogin = (data) => dispatch => {
    loginRequest(data).then((response) => {
        localStorage.setItem("token", response.data.token)
        dispatch({
            type: USER_LOGIN,
            payload: response.data
        })
    }).catch((err) => {
        console.log(err.response.data);
    })
}

export const userSignUp = (data) => dispatch => {
    signUpRequest(data).then((response) => {
        localStorage.setItem("token", response.data.token)

        dispatch({
            type: USER_SIGN_UP,
            payload: response.data
        })
    }).catch((err) => {
        console.log(err.response.data);
    })
}

export const userLogout = () => {
    localStorage.removeItem('token')
    return { type: USER_LOGOUT }
}


export const checkAuth = (token) => dispatch => {
    checkLoginRequest(token)
        .then(response => {
            dispatch({
                type: USER_CHECK_AUTH,
                payload: response.data.user
            })
        }).catch((e) => alert(e.response.data.message))
}
