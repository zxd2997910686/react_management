import { Button ,Modal} from 'antd'
import React, { useState } from 'react'
import NewsPublish from '../../../componets/publish-manage/NewsPublish'
import usePublish from '../../../componets/publish-manage/usePublish'
import {ExclamationCircleOutlined} from '@ant-design/icons'
const  {confirm} = Modal
export default function Sunset() {
  //3 已下线的
  const {dataSource,handleDelete} = usePublish(3)

  const confirmMethod = (id)=>{
    confirm({
      title:'确定要删除吗',
      icon: <ExclamationCircleOutlined/>,
      onOk(){
        handleDelete(id)
      },
      onCancel(){

      }
    })
  }
  return (
    <div>
      Sunset
      <NewsPublish dataSource = {dataSource} button ={(id)=><Button danger onClick={()=> confirmMethod(id)}>删除</Button>} >

      </NewsPublish>
    </div>
  )
}
