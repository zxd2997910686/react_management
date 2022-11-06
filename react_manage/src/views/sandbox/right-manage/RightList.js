
import React,{useState,useEffect} from 'react'
import { Button, Table, Tag } from 'antd'
import {DeleteOutlined,EditOutlined} from '@ant-design/icons'
import axios from 'axios'
const dataSource1 = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    render:(id)=>{
      return <b>{id}</b>
    }
  },
  {
    title: '权限名称',
    dataIndex: 'title',
  },
  {
    title: '权限路径',
    dataIndex: 'key',
    render:(key)=>{
      return <Tag color='orange'>{key}</Tag>
    }
  },
  {
    title:'操作',
    render:()=>{
      return <div>
        <Button danger shape='circle' icon= {<DeleteOutlined/>}/>
        <Button type='primary' shape='circle' icon= {<EditOutlined/>}/>
      </div>
    }
  }
  
];
export default function RightList() {
  const [dataSource,setdataSource] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:5000/rights?_embed=children').then((res)=>{
      console.log('角色列表');
      console.log(res.data);
      const list = res.data
      list[0].children = ""
      setdataSource(list)
    })
  },[])
  return (
    <div>
      rightList 权限列表
      <Table dataSource={dataSource} columns={columns} 
      pagination = {{
        pageSize: 5
      }}
      />
    </div>
  )
}
