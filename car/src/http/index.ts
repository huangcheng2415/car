import axios from 'axios'
import qs from 'qs'
import {API} from '../components/common/global'
import {getStorage} from '../storage';

// axios 配置
axios.defaults.timeout = 180000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['Accept'] = 'application/json'

const service = axios.create({
  baseURL: 'http://47.108.199.44:8081',
  withCredentials:false,
  timeout:10*1000
})

// http request 拦截器
service.interceptors.request.use(
  (config: any) => {

    let token = getStorage('token')
    if (token) {
      config.headers.token = token
    }
    let contentType = config.headers['Content-Type']
    if (typeof (contentType) == 'undefined') {
      config.transformRequest = [function (obj: any) {
        return qs.stringify(obj)
      }]
    }
    return config
  },
  (err: any) => {
    return Promise.reject(err)
  })

// http response 拦截器
service.interceptors.response.use(
  (response: any) => {
    // console.log(response)
    let contentType = response.headers['content-type']
    // console.log('response403', contentType);
    if (typeof (contentType) != 'undefined' && contentType.indexOf('application/json') > -1) {

    } else if (typeof (contentType) != 'undefined' && contentType.indexOf('text/html') > -1) {
      // console.log('response.data', response.data);
      if (typeof (response.data) != 'undefined' && response.data.indexOf('<title>403')) {
        // router.replace({
        //   path: 'login',
        //   query: {redirect: router.currentRoute.fullPath}
        // })
      }
    }

    return response
  },
  (error: any) => {
    if (error.response) {
      console.log('axios.error:', error)
      switch (error.response.status) {
        case 404:
          break
        case 401:
          // 401 清除token信息并跳转到登录页面
          break
        case 500:
          console.log('500', error)
          break
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  })


export default service
