import request from '@/utils/request'

export function getList(params) {
  console.log('asddddddddddddddddddd')
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
