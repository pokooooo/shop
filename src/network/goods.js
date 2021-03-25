import {request} from "./request";

export function getCateList(queryInfo) {
    return request({
        url: 'categories',
        method: 'get',
        params: queryInfo
    })
}