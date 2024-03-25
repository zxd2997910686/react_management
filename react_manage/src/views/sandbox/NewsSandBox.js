import React, { useEffect } from 'react'
import SideMenu from '../../componets/sandbox/SideMenu'
import TopHeader from '../../componets/sandbox/TopHeader'
import './NewsSandBox.css'
import { Breadcrumb, Layout, Menu } from 'antd';
import NewsRouter from '../../componets/sandbox/NewsRouter'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


const { Header, Sider, Content } = Layout;

export default function NewsSandBox() {

  NProgress.start()
  useEffect(()=>{
    NProgress.done()
  })
  
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
          <NewsRouter></NewsRouter>
       </Content>
      </Layout>
    </Layout>
  )
}
