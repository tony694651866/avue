import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/origtek-system/sysDict/list',
    method: 'post',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getParentList = (current, size, params) => {
  return request({
    url: '/api/origtek-system/sysDict/parent-list',
    method: 'post',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getChildList = (current, size, parentId, params) => {
  return request({
    url: '/api/origtek-system/sysDict/child-list',
    method: 'post',
    params: {
      ...params,
      current,
      size,
      parentId: parentId,
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/origtek-system/sysDict/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/origtek-system/sysDict/submit',
    method: 'post',
    params: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/origtek-system/sysDict/submit',
    method: 'post',
    params: row
  })
}


export const getDict = (id) => {
  return request({
    url: '/api/origtek-system/sysDict/detail',
    method: 'post',
    params: {
      id,
    }
  })
}
export const getDictTree = () => {
  return request({
    url: '/api/origtek-system/sysDict/tree?code=DICT',
    method: 'post'
  })
}

export const getDictionary = (params) => {
  return request({
    url: '/api/origtek-system/sysDict/dictionary',
    method: 'post',
    params,
  })
}
