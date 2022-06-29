// 做 axios 的配置

// 引入 axios
import router from "../router"
import axios from "axios"
// 引入el-ui
import { Loading } from "element-ui"
// 给请求设置请求的根地址
axios.defaults.baseURL = "http://www.liulongbin.top:3008"

let loading = null
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 进度条
    loading = Loading.service({ fullscreen: true })

    // 设置请求头
    if (config.url.startsWith("/my")) {
      config.headers.Authorization = localStorage.getItem("token")
    }

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    loading.close()

    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    console.log(error)

    if (error.response.status === 401) {
      loading = Loading.service({ fullscreen: true })
      router.push("/login")
    }
    // 对响应错误做点什么
    loading.close()
    return Promise.reject(error)
  }
)

// 导出 axios
export default axios
