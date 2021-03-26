import {request} from "./request";

export function getParamList(id,sel) {
    return request({
        url: `categories/${id}/attributes`,
        method: 'get',
        params: {sel}
    })
}

export function addParam(id,attr_name,attr_sel) {
    return request({
        url: `categories/${id}/attributes`,
        method: 'post',
        data: {attr_name,attr_sel}

    })
}