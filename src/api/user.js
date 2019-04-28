import request from '@/utils/request'

export function allUsers(pageSize, currentPage) {
    return request({
      url: '/admin/info/allUsers',
      method: 'post',
      data: {
        pageSize,
        currentPage,
      }
    })
  }
  