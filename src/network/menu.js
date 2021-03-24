import {request} from "./request";

export function getLeftMenu() {
    return request({
        url: 'menus'
    })
}