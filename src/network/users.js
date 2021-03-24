import {request} from "./request";

export function getUserList(queryInfo) {
    return request({
        method: "get",
        url: 'users',
        params: queryInfo
    })
}

export function setUserState(userInfo) {
    console.log(userInfo);
    return request({
        url: `users/${userInfo.id}/state/${userInfo.mg_state}`,
        method: "put"
    })
}

export function addUser(addForm) {
    return request({
        url: 'users',
        method: "post",
        data: addForm
    })
}

export function queryUserInfo(id) {
    return request({
        url: `users/${id}`,
        method: 'get'
    })
}

export function editUserInfo(userInfo) {
    return request({
        url: `users/${userInfo.id}`,
        method: 'put',
        data: {
            email: userInfo.email,
            mobile: userInfo.mobile
        }
    })
}

export function removeUser(id) {
    return request({
        url: `users/${id}`,
        method: 'delete'
    })
}