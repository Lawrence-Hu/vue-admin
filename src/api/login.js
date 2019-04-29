import request from '@/utils/request'

export function login(account, password) {
  return request({
    url: '/local/login',
    method: 'post',
    data: {
      account,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/local/loginout',
    method: 'get'
  })
}
