import  {request} from "./request";

export function getRightsList() {
    return request({
        url: 'rights/list',
        method: 'get'
    })
}

export function getRightsTree() {
    return request({
        url: 'rights/tree',
        method: 'get'
    })

}

export function removeRight(role,right) {
    return request({
        url: `roles/${role.id}/rights/${right.id}`,
        method: 'delete'
    })
}

export function submitRights(id,rids) {
    return request({
        url: `roles/${id}/rights`,
        method: 'post',
        data: {rids}
    })
}