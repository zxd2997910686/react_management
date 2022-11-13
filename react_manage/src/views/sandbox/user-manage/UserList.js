import React,{useState,useEffect} from 'react'
import {Button,Table,Modal,Switch} from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
const {confirm} = Modal
export default function UserList() {
  const [dataSource,setdataSource] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8000/users').then(res=>{
      console.log(res);
    })
  },[])
  const columns = [
    {
      title:'区域',
      dataIndex:'region',
      render:(region)=>{
        return <b>{region===""?"全球":region}</b>
      }
    },
    {
      title:'角色名称',
      dataIndex:'role',
      render:(role)=>{
        return role?.roleName
      }
    },
    {
      title:'用户名',
      dataIndex:'username'
    },
    {
      title:'用户状态',
      dataIndex:'roleState',
      render:(roleState,item)=>{
        return <Switch checked = {roleState} disabled = {item.default}></Switch>
      }
    },
    {
      title:'操作',
      render:(item)=>{ 
        return <div>
          <Button danger shape='circle' icon ={<DeleteOutlined/>} onClick = {()=>{

          }} disabled = {item.default}/>
          <Button type='primary' shape='circle' icon = {<EditOutlined/>} disabled = {item.default}/>
        </div>
      }
    }
  ]
  return (
    <div>
      UserList
      <Table  dataSource={dataSource} columns ={columns} 
      pagination = {{
        pageSize:5
      }}
      />
    </div>
  )
}
