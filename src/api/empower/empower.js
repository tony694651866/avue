import request from '@/router/axios';

export const getMachineCode = () => {
    return request({
        url: '/api/origtek-system/empower/getMachineCode',
        method: 'post'
    })
}

export const exportCod = () => {
    return request({
        url: '/api/origtek-system/empower/exportCod',
        method: 'post'
    })
}

export const authImmediately = () => {
    return request({
        url: '/api/origtek-system/empower/authImmediately',
        method: 'post'
    })
}

export const uploadAuthFile = (params) => {
    return request({
        url: '/api/origtek-system/empower/uploadAuthFile',
        method: 'post',
        params: params
    })
}


