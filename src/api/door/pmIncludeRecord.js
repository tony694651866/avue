import request from '@/router/axios';

export const getList = (current, size, params) => {
    return request({
        url: '/api/origtek-door/pmIncludeRecord/list',
        method: 'post',
        params: {
            ...params,
            current,
            size,
        }
    })
}
export const getInOutRecordList = (data) => {
    return request({
      url: "/api/origtek-door/pmIncludeRecord/getInOutRecordList",
      method: "post",
      params: data
    });
  };


export const getDetail = (id) => {
    return request({
        url: '/api/origtek-door/pmIncludeRecord/detail',
        method: 'post',
        params: {
            id
        }
    })
}

export const remove = (ids) => {
    return request({
        url: '/api/origtek-door/pmIncludeRecord/remove',
        method: 'post',
        params: {
            ids,
        }
    })
}

export const add = (row) => {
    return request({
        url: '/api/origtek-door/pmIncludeRecord/submit',
        method: 'post',
        params: row
    })
}

export const update = (row) => {
    return request({
        url: '/api/origtek-door/pmIncludeRecord/submit',
        method: 'post',
        params: row
    })
}



