import { $api } from "./api";

export const loginRequest = (data) => $api.post('/api/users/login', data)

export const signUpRequest = (data) => $api.post("/api/users/signUp", data)

export const checkLoginRequest = (token) => $api.get(`/api/users/checkAuth?token=${token}`)
