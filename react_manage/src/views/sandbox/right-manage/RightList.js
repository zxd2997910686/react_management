
import React,{useState,useEffect} from 'react'
import { Button, Table, Tag ,Modal,Popover,Switch} from 'antd'
import {DeleteOutlined,EditOutlined,ExclamationCircleOutlined} from '@ant-design/icons'
import axios from 'axios'
const {confirm} = Modal
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


export default function RightList() {
  const [dataSource,setdataSource] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8000/rights?_embed=children').then((res)=>{
      console.log('权限列表');
      console.log(res.data);
      const list = res.data
      list.forEach(item => {
        if(item.children.length === 0){
          item.children = ''
        }
      });
      setdataSource(list)
      console.log('权限列表---',list);
    })
  },[])
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
      render:(item)=>{
        return <div>
          <Button danger shape='circle' icon= {<DeleteOutlined/>} onClick = {()=> confirmMethod(item)} />
           <Popover content = {
            <div style={{textAlign:'center'}}>
               <Switch checked = {item.pagepermisson} onChange = {()=>switchMenthod(item)}></Switch>
            </div>
           } title = "页面配置项" trigger={item.pagepermisson===undefined?'':'click'}>
             <Button type='primary' shape='circle' icon= {<EditOutlined/>} disabled = {item.pagepermisson===undefined}/>
           </Popover>
        </div>
      }
    }
  ]
  const switchMenthod=(item)=>{
    console.log(item);
    item.pagepermisson = item.pagepermisson===1?0:1;
    setdataSource([...dataSource])
    if(item.grade ===1){
      axios.patch(`http://localhost:8000/rights/${item.id}`,{
        pagepermisson:item.pagepermisson
      })
    }else{
      axios.patch(`http://localhost:5000/children/${item.id}`,{
        pagepermisson:item.pagepermisson
    })
    }
  }
  const confirmMethod = (item)=>{
    confirm({
      title:'你确定要删除吗？',
      icon:<ExclamationCircleOutlined/>,
      onOk(){
        console.log('ok 被点击了');
        deleteMethod(item);
      },
      onCancel(){
        console.log('取消被点击了');
      }
    })
   }
  //删除
  const deleteMethod = (item)=>{
    console.log(item);
    //当前页面同步状态+后端同步
    if(item.grade === 1){
      setdataSource(dataSource.filter(data=> data.id !== item.id))
      axios.delete(`http://localhost:8000/rights/${item.id}`)
    }else{
      let list = dataSource.filter(data=> data.id === item.rightId)
      list[0].children = list[0].children.filter(data=> data.id !== item.id)
      setdataSource([...dataSource])
      axios.delete(`http://localhost:8000/children/${item.id}`)
    }

  }
  return (
    <div>
      rightList 权限列表
      <Table dataSource={dataSource} columns={columns} 
      pagination = {{
        pageSize: 15
      }}
      />
    </div>
  )
}
