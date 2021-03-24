import {request} from "./request";

export function login(loginForm) {
    return request({
        url: 'login',
        method: "post",
        params: loginForm
    })
}
