import React,{useState,useEffect, useRef} from 'react'
import {Button,Table,Modal,Switch,Form,Input,Select} from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import UserForm from '../../../componets/user-manage/UserForm'
const {confirm} = Modal
const {Option} = Select
export default function UserList() {
  const [dataSource,setdataSource] = useState([])
  const [isAddVisible,setisAddVisible]  = useState(false)
  const [isUpdateVisible, setisUpdateVisible] = useState(false)
  const [roleList,setroleList] = useState([])
  const [regionList,setregionList] = useState([])
  const [current,setcurrent] = useState(null)
  const [isUpdateDisabled,setisUpdateDisabled] = useState(false)

  const addForm = useRef(null)
  const updateForm = useRef(null)
  const {roleId,region,username}  = JSON.parse(localStorage.getItem("token"))

  useEffect(()=>{
    const roleObj = {
      "1":"superadmin",
      "2":"admin",
      "3":"editor"
    }
    axios.get('http://localhost:8000/users?_expand=role').then(res=>{
      console.log(res);
      const list = res.data;
      setdataSource(roleObj[roleId]==='superadmin'?list:[
        ...list.filter(item=> item.username===username),
        ...list.filter(item=> item.region===region && roleObj[item.roleId]==='editor')
      ])
    },[roleId,region,username])
  },[])
  useEffect(()=>{
    axios.get("http://localhost:8000/regions").then(res=>{
      const list = res.data;
      setregionList(list);
      console.log('regions');
      console.log(list);
    })
  },[])
  useEffect(()=>{
    axios.get("http://localhost:8000/roles").then(res=>{
      const list = res.data;
      setroleList(list);
      console.log('roles')
      console.log(list);
    })
  },[])
  const columns = [
    {
      title:'区域',
      dataIndex:'region',
      filters:[
        ...regionList.map(item=>({
          text:item.title,
          value:item.value
        })),{
          text:"全球",
          value:"全球"
        }
      ],
      onFilter:(value,item)=>{
        if(value ==="全球"){
          return item.region===""
        }
        return item.region===value
      },
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
        return <Switch checked = {roleState} disabled = {item.default} onChange={()=>handleChange(item)}></Switch>
      }
    },
    {
      title:'操作',
      render:(item)=>{ 
        return <div>
          <Button danger shape='circle' icon ={<DeleteOutlined/>} onClick = {()=>confirmMethod(item)} disabled = {item.default}/>
          <Button type='primary' shape='circle' icon = {<EditOutlined/>} disabled = {item.default} onClick={()=> handleUpdate(item)}/>
        </div>
      }
    }
  ]
  const handleUpdate=(item)=>{
    console.log(item)
    setisUpdateVisible(true)
    setTimeout(() => {
      if(item.roleId ===1){
        //禁用
        setisUpdateDisabled(true)
      }else{
        //取消禁用
        setisUpdateDisabled(false)
      }
      // updateForm.current.setFieldsValue(item)
      updateForm.current.setFieldsValue(item)

    }, 0);
    setcurrent(item)
    //此处需要注意
    /*Uncaught TypeError: Cannot read properties of null (reading 'setFieldsValue')*/
    //react中状态更新不一定是同步的，导致对话框模块还没显示，也就是表单还没挂载就调用了setFieldsValue,导致表单为空
  }
  const handleChange=(item)=>{
    item.roleState = !item.roleState;
    setdataSource([...dataSource])
    axios.patch(`http://localhost:8000/users/${item.id}`,{
      roleState:item.roleState
    })

  }
  const confirmMethod = (item)=>{
    confirm({
      title:"确定要删除吗？",
      icon:<ExclamationCircleOutlined/>,
      onOk(){
        console.log('确认按钮被点击');
        deleteMethod(item)
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
    setdataSource(dataSource.filter(date=>date.id!==item.id))
    axios.delete(`http://localhost:8000/users/${item.id}`)

  }
  const addFromOk = ()=>{
    console.log('添加用户弹窗确认按钮');
    addForm.current.validateFields().then(value=>{
      setisAddVisible(false)
      // post到后端，生成id 再设置datasource方便后面的删除和更新
      axios.post(`http://localhost:8000/users`,{
        ...value,
        "roleState":true,
        "default":false
      }).then(res=>{
        console.log(`添加成功${res.data}`);
        setdataSource([...dataSource,{
          ...res.data,
          role:roleList.filter(item=>item.id===value.roleId)[0]
        }])
      })
      
    }).catch(err=>{
      console.log(err);
    })
  }
  const updateFromOk =()=>{
    updateForm.current.validateFields().then(value=>{
      console.log('更新的数据');
      console.log(value);
      setisUpdateVisible(false)
      setdataSource(dataSource.map(item=>{
        if(item.id===current.id){
          return{
            ...item,
            ...value,
            role:roleList.filter(data=> data.id===value.roleId)[0]
          }
        }
        return item
      }))
      setisUpdateDisabled(!isUpdateDisabled)
      axios.patch(`http://localhost:8000/users/${current.id}`,value)
    })

  }
  return (
    <div>
      <Button type='primary' onClick={()=>{
        setisAddVisible(true);
      }}> 添加用户</Button>
      <Table  dataSource={dataSource} columns ={columns} 
        pagination = {{
          pageSize:15
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
        addFromOk();
       }}
      >
        <UserForm regionList = {regionList} roleList = {roleList} ref = {addForm}></UserForm>
      </Modal>
      <Modal
         open ={isUpdateVisible}
         title = "更新用户"
         okText="更新"
         cancelText = "取消"
         onCancel={()=>{
          setisUpdateVisible(false)
          setisUpdateDisabled(!isUpdateDisabled)
         }}
         onOk={()=>{
          updateFromOk()
         }}
      >
        <UserForm regionList = {regionList} roleList={roleList} ref={updateForm} isUpdateDisabled={isUpdateDisabled} isUpdate={true}></UserForm>
      </Modal>
    </div>
  )
}
