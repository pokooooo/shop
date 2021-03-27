import {request} from "./request";

export function getOrdersList(queryInfo) {
    return request({
        url:'orders',
        method: 'get',
        params: queryInfo
    })
}