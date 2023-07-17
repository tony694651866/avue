import request from '@/router/axios';

export const getList = (current, size, params) => {
    return request({
        url: '/api/origtek-led/ledTemplate/list',
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
        url: '/api/origtek-led/ledTemplate/detail',
        method: 'post',
        params: {
            id
        }
    })
}

export const remove = (ids) => {
    return request({
        url: '/api/origtek-led/ledTemplate/remove',
        method: 'post',
        params: {
            ids,
        }
    })
}

export const add = (row) => {
    return request({
        url: '/api/origtek-led/ledTemplate/submit',
        method: 'post',
        params: row
    })
}

export const update = (row) => {
    return request({
        url: '/api/origtek-led/ledTemplate/submit',
        method: 'post',
        params: row
    })
}

export const changeStatus = (row) => {
    return request({
        url: '/api/origtek-led/ledTemplate/changeStatus',
        method: 'post',
        params: row
    })
}

