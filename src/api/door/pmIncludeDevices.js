import request from '@/router/axios';

export const getList = (current, size, params) => {
    return request({
        url: '/api/origtek-door/pmIncludeDevices/list',
        method: 'post',
        meta:{
            isSerialize: true,
        },
        data: {
            ...params,
            current,
            size,
        }
    })
}

export const getDetail = (id) => {
    return request({
        url: '/api/origtek-door/pmIncludeDevices/detail',
        method: 'post',
        meta:{
            isSerialize: true,
        },
        data: {
            id
        }
    })
}

export const remove = (ids) => {
    return request({
        url: '/api/origtek-door/pmIncludeDevices/remove',
        method: 'post',
        meta:{
            isSerialize: true,
        },
        data: {
            ids,
        }
    })
}

export const add = (row) => {
    return request({
        url: '/api/origtek-door/pmIncludeDevices/submit',
        method: 'post',
        meta:{
            isSerialize: true,
        },
        data: row
    })
}

export const update = (row) => {
    return request({
        url: '/api/origtek-door/pmIncludeDevices/submit',
        method: 'post',
        meta:{
            isSerialize: true,
        },
        data: row
    })
}

