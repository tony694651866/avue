import request from '@/router/axios';
import website from "@/config/website";

export const loginByUsername = (tenantId, username, password, type, key, code) => request({
  url: '/api/origtek-system/oauth/token',
  method: 'post',
  headers: {
    'Tenant-Id': tenantId,
    'Captcha-Key': key,
    'Captcha-Code': code,
  },
  params: {
    tenantId,
    username,
    password,
    grant_type: (website.captchaMode ? "captcha" : "password"),
    scope: "all",
    type
  }
});

export const loginBySocial = (tenantId, source, code, state) => request({
  url: '/api/origtek-system/oauth/token',
  method: 'post',
  headers: {
    'Tenant-Id': tenantId
  },
  params: {
    tenantId,
    source,
    code,
    state,
    grant_type: "social",
    scope: "all",
  }
})

export const refreshToken = (refresh_token, tenantId) => request({
  url: '/api/origtek-system/oauth/token',
  method: 'post',
  headers: {
    'Tenant-Id': tenantId
  },
  params: {
    tenantId,
    refresh_token,
    grant_type: "refresh_token",
    scope: "all",
  }
});

export const registerGuest = (form, oauthId) => request({
  url: '/api/blade-user/register-guest',
  method: 'post',
  params: {
    tenantId: form.tenantId,
    name: form.name,
    account: form.account,
    password: form.password,
    oauthId
  }
});

export const getButtons = () => request({
  url: '/api/origtek-system/sysMenu/buttons',
  method: 'post'
});

export const getCaptcha = () => request({
  url: '/api/origtek-system/oauth/captcha',
  method: 'get'
});

export const logout = () => request({
  url: '/api/origtek-system/oauth/logout',
  method: 'get'
});

export const getUserInfo = () => request({
  url: '/api/origtek-system/oauth/user-info',
  method: 'get'
});

export const sendLogs = (list) => request({
  url: '/api/origtek-system/oauth/logout',
  method: 'post',
  data: list
});

export const clearCache = () => request({
  url: '/api/origtek-system/oauth/clear-cache',
  method: 'get'
});
