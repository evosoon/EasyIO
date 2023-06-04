import axiosInstance from '@/utils/http'

// 检索根下目录
export function getRoot(){
    return axiosInstance({
        url:`/action/show/root`
    })
}

// 检索目录列表
export function getList(group){
    return axiosInstance({
        url:`/action/show/dir?group=${group}`
    })
}
// 新建目录
export function addList(data){
    return axiosInstance({
        url:'/action/add/dir',
        method:"POST",
        data
    })
}
// 删除目录
export function delList(path){
    return axiosInstance({
        url:`/action/delete/dir?path=${path}`,
        method:"DELETE"
    })
}

// 检索图片列表
export function getPicList(group){
    return axiosInstance({
        url:`/action/show/img?group=${group}`
    })
}
// 添加图片
export function addPicItem(data){
    return axiosInstance({
        url:'/action/upload',
        method:"POST",
        data
    })
}
// 删除图片
export function delPicItem(path){
    return axiosInstance({
        url:`/action/delete/img?path=${path}`,
        method:'DELETE'
    })
}