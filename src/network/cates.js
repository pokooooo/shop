import {request} from "./request";

export function getCateList(queryInfo) {
    return request({
        url: 'categories',
        method: 'get',
        params: queryInfo
    })
}

export function submitCate(cate) {
    return request({
        url: 'categories',
        method: 'post',
        data: cate
    })
}