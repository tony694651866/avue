import request from '@/router/axios';

export const getList = (current, size, params) => {
    return request({
        url: '/api/origtek-led/ledDevice/list',
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
        url: '/api/origtek-led/ledDevice/detail',
        method: 'post',
        params: {
            id
        }
    })
}

export const remove = (ids) => {
    return request({
        url: '/api/origtek-led/ledDevice/remove',
        method: 'post',
        params: {
            ids,
        }
    })
}

export const add = (row) => {
    return request({
        url: '/api/origtek-led/ledDevice/submit',
        method: 'post',
        params: row
    })
}

export const update = (row) => {
    return request({
        url: '/api/origtek-led/ledDevice/submit',
        method: 'post',
        params: row
    })
}

export const changeStatus = (row) => {
    return request({
        url: '/api/origtek-led/ledDevice/changeStatus',
        method: 'post',
        params: row
    })
}

export const setParamToLedDevice = (row) => {
    return request({
        url: '/api/origtek-led/ledDevice/setParamToLedDevice',
        method: 'post',
        params: row
    })
}


