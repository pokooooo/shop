import  {request} from "./request";

export function getRightsList() {
    return request({
        url: 'rights/list',
        method: 'get'
    })

}