import axios from 'axios'
import { MessageBox, Message, Loading } from 'element-ui'
import store from '@/store'

let loading;
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  withCredentials: true, // 跨域请求时发送 cookies
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use( 
  config => {
    loading = Loading.service({
      lock: true,
      text: '加载中……',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    // // Do something before request is sent
    // if (store.getters.token) {
    //   // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    //   config.headers['X-Token'] = getToken()
    // }
    Loading.service({ fullscreen: true });
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get information such as headers or status
   * Please return  response => response
  */
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 XMLHttpRequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    loading.close();
   // Loading.service({ fullscreen: false });
    const res = response.data
    if (res.code !== 0) {
      Message({
        message: res.msg,
        type  : 'error',
        duration: 3 * 1000
      })
      return Promise.reject(res)
    } else {
      if(res.msg!=null){ 
        Message({
          message: res.msg,
          type  : 'success',
          duration: 3 * 1000
        }) 
      }
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default service
