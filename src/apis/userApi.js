import axiosInstance from '@/utils/http'

export function getAPI(){
    return axiosInstance({
        url:'home/xx/xx'
    })
}
//登录
export function Login(data){
    return axiosInstance({
        url:'/user/login',
        method:'POST',
        data
    })
}
//注册
export function Sign(data){
    return axiosInstance({
        url:'/user/sign',
        method:'POST',
        data
    })
}
// //获取用户
// export function getUser(){
//     return axiosInstance({
//         url:'/user/info'
//     })
// }