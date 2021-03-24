import axios from "axios";

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://47.108.206.212:9999/api/private/v1/',
        timeout: 9999
    })

    instance.interceptors.request.use(config => {
        config.headers.Authorization = window.sessionStorage.getItem('token')
        return config
    })


    return instance(config)
}