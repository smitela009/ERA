import { http } from "../http";
import { ENDPIONTS } from "../constants";
import { loginData, signupData } from "../apiInterfaces";

export const signup = (data: signupData) => {
    return http.post(ENDPIONTS.signup, data)
}

export const login = (data: loginData) => {
    return http.post(ENDPIONTS.login, data)
}
