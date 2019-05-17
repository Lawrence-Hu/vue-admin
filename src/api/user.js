import request from '@/utils/request'
import { get } from 'http';
import { async } from 'q';

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

export function changeStatus(id){
  return request({
    url:'/admin/user/changeStatus',
    method:'post',
    data:{
      id
    }
  })
}
export function frozenUsers(pageSize,currentPage,){
  return request({
    url:'/admin/user/frozenUsers',
    method:'get',
    params:{
      pageSize,
      currentPage,
    }
  })
}

export  function getRoles(id){
  return request({
    url:'/admin/user/getRoles',
    method:'get',
    params:{
      id
    }
  })
}

export function getAllRoles(){
  return request({
    url:'/admin/user/getAllRoles',
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
    url:'/admin/user/deleteUserRole',
    method:'post',
    data:params
  })
}

export function asignUserRole(params){
  return request({
    url:'/admin/user/asignUserRole',
    method:'post',
    data:params
  })
}

export function allUserAuthByPages(pageSize,currentPage){
  return request({
    url:'/admin/user/auth',
    method:'get',
    params:{
      pageSize,
      currentPage,
    }
  })
}

export function userAuthAudit(params){
  return request({
    url:'/admin/user/auth/confirm',
    method:'post',
    data:params
  })
}

export function allUserAuthHandledByPages(pageSize,currentPage){
  return request({
    url:'/admin/user/auth/handled',
    method:'get',
    params:{
      pageSize,
      currentPage,
    }
  })
}