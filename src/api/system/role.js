import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/origtek-system/sysRole/list',
    method: 'post',
    params: {
      ...params,
      current,
      size,
    }
  })
}
export const grantTree = () => {
  return request({
    url: '/api/origtek-system/sysMenu/grant-tree',
    method: 'get',
  })
}

export const grant = (roleIds, menuIds, dataScopeIds, apiScopeIds) => {
  return request({
    url: '/api/origtek-system/sysRole/grant',
    method: 'post',
    data: {
      roleIds,
      menuIds,
      dataScopeIds,
      apiScopeIds
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/origtek-system/sysRole/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/origtek-system/sysRole/submit',
    method: 'post',
    params: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/origtek-system/sysRole/submit',
    method: 'post',
    params: row
  })
}


export const getRole = (roleIds) => {
  return request({
    url: '/api/origtek-system/sysMenu/role-tree-keys',
    method: 'post',
    params: {
      roleIds,
    }
  })
}

export const getRoleTree = (tenantId) => {
  return request({
    url: '/api/origtek-system/sysRole/tree',
    method: 'post',
    params: {
      tenantId,
    }
  })
}

export const getRoleTreeById = (roleId) => {
  return request({
    url: '/api/origtek-system/sysRole/tree-by-id',
    method: 'post',
    params: {
      roleId,
    }
  })
}
