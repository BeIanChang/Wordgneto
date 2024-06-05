import axios, {AxiosInstance} from 'axios'
// import globalMethods from './global-methods'
// import Config from '../config/index'
// import CONSTANT from './const_var'
// import store from '../store'
// import Storage from './storage'

export const axiosInstance: AxiosInstance = axios.create({
  // baseURL: process.env.NODE_ENV === 'production' ? Config.PRODUCT_API_URL : Config.API_URL,
  // baseURL: 'http://testtestgp.com',
  timeout: 15000,
})

// request 拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // console.log('config', config)
    if (config.url === 'https://api.fanyi.baidu.com/api/trans/vip/translate') {
      config.url = '/baidu'
    }
    return config
  },
  error => Promise.reject(error),
)



/**
 * @apiDescription 封装的网络请求方法
 * @apiGroup
 * @apiName request
 * @apiParam  url 地址
 * @apiParam  data 请求数据
 * @apiParam  params 请求参数
 * @apiParam  method 方法类型：get或者post
 * @apiParam  version 接口版本号
 * @apiParamExample
 *       request('Appointment/appointmentList', data, params, CONSTANT.GET)
 * @apiReturn Promise
 */
