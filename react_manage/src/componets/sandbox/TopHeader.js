import React ,{useState}from 'react'
import { DownOutlined, SmileOutlined,UserOutlined} from '@ant-design/icons';
import { Dropdown, Menu, Space ,Layout,Avatar} from 'antd';
import {withRouter} from 'react-router-dom'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons';
const { Header} = Layout;
 function TopHeader(props) {
    const [collapsed,setCollapsed] = useState(false);
    const changeCollapsed = ()=>{
       setCollapsed(!collapsed) 
    }
    console.log('token');
    console.log(JSON.parse(localStorage.getItem('token')));
    const {role:{roleName},username} = JSON.parse(localStorage.getItem('token'))
      const menu = (
        <Menu>
            <Menu.Item>
                {roleName}
            </Menu.Item>
            <Menu.Item danger onClick={()=>{
              localStorage.removeItem("token")
              props.history.replace('/login');
            }}>
                退出
            </Menu.Item>
        </Menu>
      );
  return (
    <Header
    className="site-layout-background"
    style={{
      padding: '0 16px'
    }}>
         {
            collapsed? <MenuUnfoldOutlined onClick={changeCollapsed}/>:<MenuFoldOutlined onClick={changeCollapsed}/>
         }

    <div style={{float:'right'}}>
        <span>欢迎<span style={{color:'#1890ff'}}>{username}</span>回来</span>
        <Dropdown overlay={menu}>
            <Avatar size='large' icon = {<UserOutlined/>}/>
         </Dropdown>
    </div>
  </Header>
  )
}

export default withRouter(TopHeader)