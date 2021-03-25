import {request} from "./request";

export function getRolesList() {
    return request({
        url: 'roles',
        method: 'get'
    })
}

export function submitRole(id,rid) {
    return request({
        url: `users/${id}/role`,
        method: 'put',
        data: {rid}
    })
}