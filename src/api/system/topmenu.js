import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/origtek-system/sysTopMenu/list',
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
    url: '/api/origtek-system/sysTopMenu/detail',
    method: 'post',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/origtek-system/sysTopMenu/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/origtek-system/sysTopMenu/submit',
    method: 'post',
    params: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/origtek-system/sysTopMenu/submit',
    method: 'post',
    params: row
  })
}

export const grantTree = () => {
  return request({
    url: '/api/origtek-system/sysMenu/grant-top-tree',
    method: 'post',
  })
}

export const getTopTree = (topMenuIds) => {
  return request({
    url: '/api/origtek-system/sysMenu/top-tree-keys',
    method: 'post',
    params: {
      topMenuIds,
    }
  })
}

export const grant = (topMenuIds, menuIds) => {
  return request({
    url: '/api/origtek-system/sysTopMenu/grant',
    method: 'post',
    data: {
      topMenuIds,
      menuIds,
    }
  })
}
