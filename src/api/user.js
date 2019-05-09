import request from '@/utils/request'
import { get } from 'http';

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
export function allUserByRoles(pageSize,currentPage,){
  return request({
    url:'/admin/user/allUserByRoles',
    method:'get',
    params:{
      pageSize,
      currentPage,
    }
  })
}

export function getRoles(id){
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