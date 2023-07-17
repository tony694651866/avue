import request from '@/router/axios';

export const getList = (current, size, params, deptId) => {
  return request({
    url: '/api/origtek-system/sysUser/page',
    method: 'post',
    params: {
      ...params,
      current,
      size,
      deptId,
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/origtek-system/sysUser/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/origtek-system/sysUser/submit',
    method: 'post',
    params: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/origtek-system/sysUser/submit',
    method: 'post',
    params: row
  })
}

export const updatePlatform = (userId, userType, userExt) => {
  return request({
    url: '/api/origtek-system/sysUser/update-platform',
    method: 'post',
    params: {
      userId,
      userType,
      userExt,
    }
  })
}

export const getUser = (id) => {
  return request({
    url: '/api/origtek-system/sysUser/detail',
    method: 'post',
    params: {
      id,
    }
  })
}

export const getUserPlatform = (id) => {
  return request({
    url: '/api/origtek-system/sysUser/platform-detail',
    method: 'post',
    params: {
      id,
    }
  })
}

export const getUserInfo = () => {
  return request({
    url: '/api/origtek-system/sysUser/info',
    method: 'post',
  })
}

export const resetPassword = (userIds) => {
  return request({
    url: '/api/origtek-system/sysUser/reset-password',
    method: 'post',
    params: {
      userIds,
    }
  })
}

export const updatePassword = (oldPassword, newPassword, newPassword1) => {
  return request({
    url: '/api/origtek-system/sysUser/update-password',
    method: 'post',
    params: {
      oldPassword,
      newPassword,
      newPassword1,
    }
  })
}

export const updateInfo = (row) => {
  return request({
    url: '/api/origtek-system/sysUser/update-info',
    method: 'post',
    params: row
  })
}

export const grant = (userIds, roleIds) => {
  return request({
    url: '/api/origtek-system/sysUser/grant',
    method: 'post',
    params: {
      userIds,
      roleIds,
    }
  })
}
