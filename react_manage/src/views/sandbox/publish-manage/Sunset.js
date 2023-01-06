import { Button } from 'antd'
import React, { useState } from 'react'
import NewsPublish from '../../../componets/publish-manage/NewsPublish'
import usePublish from '../../../componets/publish-manage/usePublish'

export default function Sunset() {
  //3 已下线的
  const {dataSource,handleDelete} = usePublish(3)
  return (
    <div>
      Sunset
      <NewsPublish dataSource = {dataSource} button ={(id)=><Button danger onClick={()=> handleDelete(id)}>删除</Button>} >

      </NewsPublish>
    </div>
  )
}
