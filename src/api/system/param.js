import request from '@/router/axios';

export const getValue = (paramKey) => {
  return request({
    url: '/api/origtek-system/sysParam/getValue',
    method: 'post',
    params: {
      paramKey
    }
  })
}

export const getList = (current, size, params) => {
  return request({
    url: '/api/origtek-system/sysParam/list',
    method: 'post',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/origtek-system/sysParam/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/origtek-system/sysParam/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/origtek-system/sysParam/submit',
    method: 'post',
    data: row
  })
}
