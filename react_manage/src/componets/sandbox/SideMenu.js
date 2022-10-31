import React from 'react'
import {Layout, Menu } from 'antd';
import './SideMenu.scss'
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
import {withRouter} from 'react-router-dom'
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
function SideMenu(props) {
  const renderMenu = (menuList)=>{
    return menuList.map(item=>{
      // console.log(item);
      if(item.children && item.children.length >0){
        return <SubMenu key={item.key} icon = {item.icon} title = {item.title}>
          {
            renderMenu(item.children)
          }
        </SubMenu>
      }
      return <Menu.Item key={item.key} icon = {item.icon} onClick = {()=>{
        console.log(item.key,'路由被点击了');
        console.log(props);
        props.history.push(item.key);
      }}>{item.title}</Menu.Item>
    })
  }
  return (
    <Sider trigger={null} collapsible >
    <div className="logo">新闻发布系统 </div>
    {/* <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      items={[
        {
          key: '1',
          icon: <UserOutlined />,
          label: 'nav 1',
        },
        {
          key: '2',
          icon: <VideoCameraOutlined />,
          label: 'nav 2',
        },
        {
          key: '3',
          icon: <UploadOutlined />,
          label: 'nav 3',
        },
      ]}
    /> */}
    <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
      {/* <Menu.Item  key={'1'} icon = {<UserOutlined/>}>
        nav1
      </Menu.Item>
      <Menu.Item key={'2'} icon = {<VideoCameraOutlined/>}>
        nav2
      </Menu.Item>
      <Menu.Item key={'3'} icon = {<UploadOutlined/>}>
        nav3
      </Menu.Item>
      <SubMenu key={'sub4'} icon = {<UploadOutlined/>} title = {'用户管理 three'}>
        <Menu.Item key={'9'}>Option 9</Menu.Item>
        <Menu.Item key={'10'}>Option 10</Menu.Item>
        <Menu.Item key={'11'}>Option 11</Menu.Item>
        <Menu.Item key={'12'}>Option 12</Menu.Item>
      </SubMenu> */}

      {renderMenu(menuList)}
    </Menu>



  </Sider>
  )
}
export default withRouter(SideMenu) 
//用withRouter包裹的组件，在其内部可以拿到路由信息
