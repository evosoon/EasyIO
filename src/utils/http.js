import axios from 'axios'
import {openError} from '@/hooks/usePOP'
const axiosInstance = axios.create({
    baseURL:'https://www.haorui.xyz:8001',
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
    if(e.message.indexOf(401) != -1){
        localStorage.removeItem('token')
        openError('身份认证过期')
        setTimeout(() => {
            window.location.reload()
        }, 800);
    }
    return Promise.reject(e)
})

export default axiosInstance