import { Button ,Modal} from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NewsPublish from '../../../componets/publish-manage/NewsPublish'
import usePublish from '../../../componets/publish-manage/usePublish'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
const {confirm} = Modal

export default function Published() {

    // const {username} = JSON.parse(localStorage.getItem('token'))
    // const [dataSource,setdataSource] = useState([])
    // useEffect(()=>{
    //   axios(`/news?author=${username}&publishState=2&_expand=category`).then(res=>{
    //     console.log('已发布',res.data);
    //     setdataSource(res.data)
    //   })
    // },[username])

    //2已发布
    const {dataSource,handleSunset} = usePublish(2)
    const confirmMethod = (id)=>{
      confirm({
        title:'确定要下线吗',
        icon: <ExclamationCircleOutlined/>,
        onOk(){
          handleSunset(id)
        },
        onCancel(){
  
        }
      })
    }
  return (
    <div>
      Published---
      <NewsPublish dataSource = {dataSource} button = {(id)=> <Button danger onClick={()=> confirmMethod(id)}>下线</Button>}/>
    </div>
  )
 

}
