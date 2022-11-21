import React,{useEffect,useState} from 'react'
import {Layout, Menu } from 'antd';
import './SideMenu.scss'
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
import {withRouter} from 'react-router-dom'
import axios from 'axios';
const { Sider} = Layout;
const {SubMenu} = Menu;
const menuList = [
  {
    key:'/home',
    title:'首页',
    icon:<UserOutlined/>
  },
  {
    key:'/user-manage',
    title:'用户管理',
    icon:<UserOutlined/>,
    children:[
      {
        key:'/user-manage/list',
        title:'用户列表',
       icon:<UserOutlined/>,
      }
    ]
  },
  {
    key:'/right-manage',
    title:'权限管理',
    icon:<UserOutlined/>,
    children:[
      {
        key:'/right-manage/role/list',
        title:'角色设置',
       icon:<UserOutlined/>,
      },{
        key:'/right-manage/right/list',
        title:'权限列表',
       icon:<UserOutlined/>,
      }
    ]
  },
  {
    key:'/new-manage',
    title:'新闻管理',
    icon:<UserOutlined/>,
    children:[
      {
        key:'/new-manage/list',
        title:'用户列表',
       icon:<UserOutlined/>,
      }
    ]
  },
  {
    key:'/shenhe-manage',
    title:'审核管理',
    icon:<UserOutlined/>,
    children:[
      {
        key:'/shenhe-manage/list',
        title:'用户列表',
       icon:<UserOutlined/>,
      }
    ]
  },
  {
    key:'/fabu-manage',
    title:'发布管理',
    icon:<UserOutlined/>,
    children:[
      {
        key:'/fabu-manage/list',
        title:'用户列表',
       icon:<UserOutlined/>,
      }
    ]
  }
];
const iconList = {
  "/home":<UserOutlined />,
  "/user-manage":<UserOutlined />,
  "/user-manage/list":<UserOutlined />,
  "/right-manage":<UserOutlined />,
  "/right-manage/role/list":<UserOutlined />,
  "/right-manage/right/list":<UserOutlined />
  //.......
}
function SideMenu(props) {
  const [menu,setMenu] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8000/rights?_embed=children').then(res=>{
      console.log(res.data);
      setMenu(res.data)
    })
  },[])
  const {role:{rights}} = JSON.parse(localStorage.getItem("token"))

  const checkPagePermission = (item)=>{
    return item.pagepermisson && rights.includes(item.key)
  }
  const renderMenu = (menuList)=>{
    return menuList.map(item=>{
      // console.log(item);
      if(item.children && item.children.length >0 && checkPagePermission(item)){
        return <SubMenu key={item.key} icon = {iconList[item.key]} title = {item.title}>
          {
            renderMenu(item.children)
          }
        </SubMenu>
      }
      return checkPagePermission(item) && <Menu.Item key={item.key} icon = {iconList[item.key]} onClick = {()=>{
        console.log(item.key,'路由被点击了');
        console.log(props);
        props.history.push(item.key);
      }}>{item.title}</Menu.Item>
    })
  }
  const selectKeys = [props.location.pathname];
  const openKeys = ['/'+props.location.pathname.split('/')[1]];
  return (
    <Sider trigger={null} collapsible >
      <div style={{display:"flex",height:"100%","flexDirection":"column"}}>
          <div className="logo">新闻发布系统 </div>
          <div style={{flex:1,"overflow":'auto'}}>
             <Menu theme='dark' mode='inline' selectedKeys={selectKeys} defaultOpenKeys={openKeys}>
                {renderMenu(menu)}
             </Menu>
          </div>
      </div>
    
  </Sider>
  )
}
export default withRouter(SideMenu) 
//用withRouter包裹的组件，在其内部可以拿到路由信息
