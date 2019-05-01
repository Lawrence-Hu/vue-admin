import request from '@/utils/request'

export function allUsers(pageSize, currentPage) {
    return request({
      url: '/admin/info/allUsers',
      method: 'get',
      params: {
        pageSize,
        currentPage,
      }
    })
  }
export function updateUser(user){
  return request({
    url:'/admin/user/update',
    method:'post',
    data:user    
  })
}
  