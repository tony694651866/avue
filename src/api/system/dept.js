import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/origtek-system/sysDept/list',
    method: 'post',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getLazyList = (parentId, params) => {
  return request({
    url: '/api/origtek-system/sysDept/lazy-list',
    method: 'post',
    params: {
      ...params,
      parentId
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/origtek-system/sysDept/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/origtek-system/sysDept/submit',
    method: 'post',
    params: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/origtek-system/sysDept/submit',
    method: 'post',
    params: row
  })
}

export const getDept = (id) => {
  return request({
    url: '/api/origtek-system/sysDept/detail',
    method: 'post',
    params: {
      id,
    }
  })
}

export const getDeptTree = (tenantId) => {
  return request({
    url: '/api/origtek-system/sysDept/tree',
    method: 'get',
    params: {
      tenantId,
    }
  })
}

export const getDeptLazyTree = (parentId) => {
  return request({
    url: '/api/origtek-system/sysDept/lazy-tree',
    method: 'get',
    params: {
      parentId
    }
  })
}

