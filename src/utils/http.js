import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:'http://www.haorui.xyz:8000',
    timeout:5000
})

// 请求拦截器
axiosInstance.interceptors.request.use(config=>{
    //token
    const token = localStorage.getItem('token')
    if(token) config.headers.Authorization =token 

    return config
},e=> Promise.reject(e)) 

// 响应拦截器
axiosInstance.interceptors.response.use(res=>res.data, e=>{
    return Promise.reject(e)
})

export default axiosInstance