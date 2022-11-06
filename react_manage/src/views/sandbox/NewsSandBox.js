import React from 'react'
import SideMenu from '../../componets/sandbox/SideMenu'
import TopHeader from '../../componets/sandbox/TopHeader'
import {Switch,Route,Redirect} from 'react-router-dom'
import Home from './home/Home'
import UserList from './user-manage/UserList'
import RoleList from './right-manage/RoleList'
import RightList from './right-manage/RightList'
import Nopermission from './nopermission/Nopermission'
import './NewsSandBox.css'
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Sider, Content } = Layout;

export default function NewsSandBox() {
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout" >     
       <TopHeader></TopHeader>
       <Content  className="site-layout-background"
           style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            overflow:'auto'
          }}>
          <Switch>
          <Route path='/home' component={Home}/>
          <Route path='/user-manage/list' component={UserList}/>
          <Route path='/right-manage/role/list' component={RoleList}/>
          <Route path='/right-manage/right/list' component={RightList}/>
          <Redirect from='/' to='/home' exact/>
          <Route path='*' component={Nopermission} />
          </Switch>
       </Content>
      </Layout>
    </Layout>
  )
}
