import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NewsPublish from '../../../componets/publish-manage/NewsPublish'

export default function Published() {

    const {username} = JSON.parse(localStorage.getItem('token'))
    const [dataSource,setdataSource] = useState([])
    useEffect(()=>{
      axios(`/news?author=${username}&publishState=2&_expand=category`).then(res=>{
        console.log('已发布',res.data);
        setdataSource(res.data)
      })
    },[username])
  return (
    <div>
      Published
      <NewsPublish dataSource = {dataSource}/>
    </div>
  )
}
