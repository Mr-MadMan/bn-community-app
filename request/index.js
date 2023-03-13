import axios from 'axios'
import Qs from 'qs'// 防止跨域时 option请求

// create an axios instance
const service = axios.create({
  baseURL: 'https://rn-request-default-rtdb.europe-west1.firebasedatabase.app', // api的base_url
  timeout: 5000 // request timeout
})

// request header的Accept-Language属性 当值为zh-HK、zh-TW时返回繁体中文，en-US返回英文
service.defaults.headers.post['Accept-Language'] = 'en-US'
axios.defaults.headers.post['Content-Type'] = 'application/json'

service.interceptors.request.use((config) => {
  const configTmp = config
  if (config.method === 'post') {
    configTmp.data = Qs.stringify({ ...configTmp.data, _t: Date.now() / 1000 })
  } else if (configTmp.method === 'get') {
    configTmp.params = {
      ...configTmp.params
    }
  }
  return configTmp
}, (error) => Promise.reject(error))

// respone interceptor
service.interceptors.response.use(
  (response) => response.data,

  (error) => {
    console.log(`err${error}`)// for debug

    return Promise.reject(error)
  }
)

export default service