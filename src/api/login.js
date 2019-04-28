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

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/local/loginout',
    method: 'get'
  })
}
