import axios from 'axios'
import store from '../redux/store'
axios.defaults.baseURL="http://localhost:8000"

// axios.defaults.headers

// axios.interceptors.request.use
// axios.interceptors.response.use

//拦截器
axios.interceptors.request.use(function(config){
    //do something before request is sent
    //现实loading
    store.dispatch({
        type:'change_loading',
        payload:true
    })
    return config
},function(error){
    //隐藏loading
    store.dispatch({
        type:'change_loading',
        payload:false
    })
    return Promise.reject(error)
})

axios.interceptors.response.use(function(response){
        //现实loading
        store.dispatch({
            type:'change_loading',
            payload:false
        })
    return response
},function(error){
        //隐藏loading
        store.dispatch({
            type:'change_loading',
            payload:false
        })
    return Promise.reject(error)
})