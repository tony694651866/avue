import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/origtek-system/sysPost/list',
    method: 'post',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getPostList = (tenantId) => {
  return request({
    url: '/api/origtek-system/sysPost/select',
    method: 'post',
    params: {
      tenantId
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/origtek-system/sysPost/detail',
    method: 'post',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/origtek-system/sysPost/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/origtek-system/sysPost/submit',
    method: 'post',
    params: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/origtek-system/sysPost/submit',
    method: 'post',
    params: row
  })
}

