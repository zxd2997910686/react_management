import { Button ,Modal} from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NewsPublish from '../../../componets/publish-manage/NewsPublish'
import usePublish from '../../../componets/publish-manage/usePublish'
import {ExclamationCircleOutlined} from '@ant-design/icons'

const {confirm} = Modal
export default function Unpublished() {
  // const {username} = JSON.parse(localStorage.getItem('token'))
  // const [dataSource,setdataSource] = useState([])

  // useEffect(()=>{
  //   axios(`/news?author=${username}&publishState=1&_expand=category`).then(res=>{
  //     console.log('待发布',res.data);
  //     setdataSource(res.data)
  //   })
  // },[username])
  //1 === 待发布的
  const {dataSource,handlePublish} = usePublish(1)
  const confirmMethod = (id)=>{
    confirm({
      title:'确定要发布吗',
      icon: <ExclamationCircleOutlined/>,
      onOk(){
        handlePublish(id)
      },
      onCancel(){

      }
    })
  }
  return (
    <div>
      Unpublished 发布
      <NewsPublish dataSource = {dataSource} button = {(id)=> <Button type='primary' onClick={()=> confirmMethod(id)}>发布</Button>}/>
    </div>
  )
}
