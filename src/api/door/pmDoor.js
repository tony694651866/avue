import request from '@/router/axios';

export const getList = (current, size, params) => {
    return request({
        url: '/api/origtek-door/pmDoor/list',
        method: 'post',
        params: {
            ...params,
            current,
            size,
        }
    })
}

export const getDetail = (id) => {
    return request({
        url: '/api/origtek-door/pmDoor/detail',
        method: 'post',
        params: {
            id
        }
    })
}

export const remove = (ids) => {
    return request({
        url: '/api/origtek-door/pmDoor/remove',
        method: 'post',
        params: {
            ids,
        }
    })
}

export const add = (row) => {
    return request({
        url: '/api/origtek-door/pmDoor/submit',
        method: 'post',
        params: row
    })
}

export const update = (row) => {
    return request({
        url: '/api/origtek-door/pmDoor/submit',
        method: 'post',
        params: row
    })
}

export const handleDataSynchro = () => {
    return request({
        url: '/api/origtek-door/pmDoor/handleDataSynchro',
        method: 'post'
    })
}

