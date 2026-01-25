import axios from 'axios'
import { ElMessage } from 'element-plus'
import { tansParams } from '@/utils/common'
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 使用 Vite 环境变量
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 添加 token（如果存在）
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?' + tansParams(config.params)
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }
    console.log('请求拦截', config)

    return config
  },
  error => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 默认返回 response.data，即后端实际返回的数据体
    console.log('响应拦截', response)
    // 未设置状态码则默认成功状态
    const code = response.data.code || 200
    if (code != 200) {
      ElMessage.error(response.data.msg)
      return
    }
    return response.data
  },
  error => {
    // 统一错误处理（如 401 跳转登录页等）
    console.error('Response error:', error)
    ElMessage.error(error.response?.data?.error)
    return Promise.reject(error)
  }
)

export default service
