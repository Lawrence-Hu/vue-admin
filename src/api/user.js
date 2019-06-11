import request from '@/utils/request'

export function allUsers(pageSize, currentPage) {
    return request({
      url: '/admin/user/allUsers',
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

export function changeStatus(id){
  return request({
    url:'/admin/user/active',
    method:'post',
    data:{
      id
    }
  })
}
export function frozenUsers(pageSize,currentPage){
  return request({
    url:'/admin/user/frozen',
    method:'get',
    params:{
      pageSize,
      currentPage,
    }
  })
}

export  function getRoles(id){
  return request({
    url:'/admin/user/roles',
    method:'get',
    params:{
      id
    }
  })
}

export function getAllRoles(){
  return request({
    url:'/admin/user/allRoles',
    method:'get',
    params:null
  })
}

export function addRoleToUser(params){
  return request({
    url:'/admin/user/addRole',
    method:'post',
    params:params
  })
}

export function deleteUserRole(params){
  return request({
    url:'/admin/user/deleteRole',
    method:'post',
    data:params
  })
}

export function asignUserRole(params){
  return request({
    url:'/admin/user/assignRole',
    method:'post',
    data:params
  })
}

export function allUserAuditByPages(pageSize,currentPage,isHandled){
  return request({
    url:'/admin/user/audit',
    method:'get',
    params:{
      pageSize,
      currentPage,
      isHandled
    }
  })
}

export function userAuthAudit(params){
  return request({
    url:'/admin/user/audit/confirm',
    method:'post',
    data:params
  })
}