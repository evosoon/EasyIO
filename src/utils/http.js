import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:'',
    timeout:5000
})

// 请求拦截器
axiosInstance.interceptors.request.use(config=>{
    return config
},e=> Promise.reject(e)) 

// 响应拦截器
axiosInstance.interceptors.response.use(res=>res.data, e=>{
    return Promise.reject(e)
})

export default axiosInstance