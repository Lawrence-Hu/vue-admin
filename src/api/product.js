import request from '@/utils/request'

export function allProducts(pageSize, currentPage) {
    return request({
      url: '/product/all',
      method: 'get',
      params: {
        pageSize,
        currentPage,
      }
    })
  }

  export function productAudit(pageSize, currentPage,isHandled) {
    return request({
      url: '/product/audit',
      method: 'get',
      params: {
        pageSize,
        currentPage,
        isHandled,
      }
    })
  }

  export function updateProducts(params) {
    return request({
      url: '/product/update',
      method: 'post',
      data:params
    })
  }

  export function uploadMedia(blob){
    return request({
      url:'/admin/upload/media',
      method:'post',
      data:blob,
      config:{
        headers:{'Content-Type':'multipart/form-data'}
      }
    })
  }

  export function productAuditConfirm(params){
    return request({
      url:'/product/audit/confirm',
      method:'post',
      data:params
    })
  }