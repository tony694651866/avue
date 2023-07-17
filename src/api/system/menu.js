import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/origtek-system/sysMenu/list',
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
    url: '/api/origtek-system/sysMenu/lazy-list',
    method: 'post',
    params: {
      ...params,
      parentId
    }
  })
}

export const getLazyMenuList = (parentId, params) => {
  return request({
    url: '/api/origtek-system/sysMenu/lazy-menu-list',
    method: 'post',
    params: {
      ...params,
      parentId
    }
  })
}

export const getMenuList = (current, size, params) => {
  return request({
    url: '/api/origtek-system/sysMenu/menu-list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getMenuTree = (tenantId) => {
  return request({
    url: '/api/origtek-system/sysMenu/tree',
    method: 'post',
    params: {
      tenantId,
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/origtek-system/sysMenu/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/origtek-system/sysMenu/submit',
    method: 'post',
    params: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/origtek-system/sysMenu/submit',
    method: 'post',
    params: row
  })
}

export const getMenu = (id) => {
  return request({
    url: '/api/origtek-system/sysMenu/detail',
    method: 'post',
    params: {
      id,
    }
  })
}

export const getTopMenu = () => request({
  url: '/api/origtek-system/sysMenu/top-menu',
  method: 'post'
});

export const getRoutes = (topMenuId) => request({
  url: '/api/origtek-system/sysMenu/routes',
  method: 'post',
  params: {
    topMenuId,
  }
});
