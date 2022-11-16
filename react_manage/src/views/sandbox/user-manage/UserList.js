import React,{useState,useEffect} from 'react'
import {Button,Table,Modal,Switch,Form,Input,Select} from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
const {confirm} = Modal
const {Option} = Select
export default function UserList() {
  const [dataSource,setdataSource] = useState([])
  const [isAddVisible,setisAddVisible]  = useState(false)
  const [roleList,setroleList] = useState([])
  const [regionList,setregionList] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8000/users?_expand=role').then(res=>{
      console.log(res);
      setdataSource(res.data)
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
          <Button danger shape='circle' icon ={<DeleteOutlined/>} onClick = {()=>confirmMethod(item)} disabled = {item.default}/>
          <Button type='primary' shape='circle' icon = {<EditOutlined/>} disabled = {item.default}/>
        </div>
      }
    }
  ]
  const confirmMethod = (item)=>{
    confirm({
      title:"确定要删除吗？",
      icon:<ExclamationCircleOutlined/>,
      onOk(){
        console.log('确认按钮被点击');
      },
      onCancel(){
        console.log('取消按钮被点击');
      }
    });
  }
  //删除
  const deleteMethod =(item)=>{
    console.log('删除用户');
    console.log(item);
    //当前页面同步+后端同步

  }
  return (
    <div>
      <Button type='primary' onClick={()=>{
        setisAddVisible(true);
      }}> 添加用户</Button>
      <Table  dataSource={dataSource} columns ={columns} 
        pagination = {{
          pageSize:10
        }}
        rowKey ={item=> item.id}
      />
      <Modal open = {isAddVisible}
       title = "确认添加"
       okText = "确定"
       cancelText = "取消"
       onCancel={()=>{
        console.log("Modal 取消");
        setisAddVisible(false)
       }}
       onOk = {()=>{
        console.log("Modal 确认");
        setisAddVisible(false)
       }}
      >
        <Form>
          
        </Form>
      </Modal>
    </div>
  )
}
