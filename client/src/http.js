import axios from 'axios'
import { Message, Loading } from 'element-ui'
import router from "./router"

let loadingInstance
//请求拦截
axios.interceptors.request.use( config => {
    loadingInstance = Loading.service({
        lock: true,
        text: '努力加载中....',
        background: 'rgba(0, 0, 0, 0.7)'
    })
    //如果token已存在，在每次请求头加上token
    if (localStorage.token) {
        config.headers.Authorization = localStorage.token
    }
    return config
}, err => {
    return Promise.reject(err)
})

//响应拦截
axios.interceptors.response.use( response => {
    loadingInstance.close()
    return response
}, err => {
    loadingInstance.close()
    Message.error(err.response)

    //token失效
    if (err.response.status == 401) {
        localStorage.removeItem('token')
        Message.error('token已失效,请重新登录!')
        router.push('/login')
    }

    return Promise.reject(err)
})

export default axios