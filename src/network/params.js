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

export function submitParam(id,attrId,attr_name,attr_sel,attr_vals) {
    return request({
        url: `categories/${id}/attributes/${attrId}`,
        method: 'put',
        data: {attr_name,attr_sel,attr_vals}
    })
}

export function deleteParam(id,attrid) {
    return request({
        url: `categories/${id}/attributes/${attrid}`,
        methods: 'delete'
    })
}