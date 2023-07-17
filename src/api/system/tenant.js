import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/origtek-system/sysTenant/list',
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
    url: '/api/origtek-system/sysTenant/detail',
    method: 'post',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/origtek-system/sysTenant/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/origtek-system/sysTenant/submit',
    method: 'post',
    params: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/origtek-system/sysTenant/submit',
    method: 'post',
    params: row
  })
}

export const setting = (ids, form) => {
  return request({
    url: '/api/origtek-system/sysTenant/setting',
    method: 'post',
    params: {
      ...form,
      ids
    }
  })
}

export const datasource = (tenantId, datasourceId) => {
  return request({
    url: '/api/origtek-system/sysTenant/datasource',
    method: 'post',
    params: {
      tenantId,
      datasourceId
    }
  })
}

export const info = (domain) => {
  return request({
    url: '/api/origtek-system/sysTenant/info',
    method: 'post',
    params: {
      domain
    }
  })
}
