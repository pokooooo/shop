import {request} from "./request";

export function getGoodsList(queryInfo) {
    return request({
        url: 'goods',
        method: 'get',
        params: queryInfo
    })
}