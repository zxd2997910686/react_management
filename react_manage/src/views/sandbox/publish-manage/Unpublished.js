import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NewsPublish from '../../../componets/publish-manage/NewsPublish'

export default function Unpublished() {
  const {username} = JSON.parse(localStorage.getItem('token'))
  const [dataSource,setdataSource] = useState([])

  useEffect(()=>{
    axios(`/news?author=${username}&publishState=1&_expand=category`).then(res=>{
      console.log('待发布',res.data);
      setdataSource(res.data)
    })
  },[username])
  return (
    <div>
      Unpublished
      <NewsPublish dataSource = {dataSource} />
    </div>
  )
}
