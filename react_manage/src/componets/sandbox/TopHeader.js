import React ,{useState}from 'react'
import { DownOutlined, SmileOutlined,UserOutlined} from '@ant-design/icons';
import { Dropdown, Menu, Space ,Layout,Avatar} from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons';
const { Header} = Layout;
export default function TopHeader() {
    const [collapsed,setCollapsed] = useState(false);
    const changeCollapsed = ()=>{
       setCollapsed(!collapsed) 
    }
    const menu1 = (
        <Menu
          items={[
            {
              key: '1',
              label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                  1st menu item
                </a>
              ),
            },
            {
              key: '2',
              label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                  2nd menu item (disabled)
                </a>
              ),
              icon: <SmileOutlined />,
              disabled: true,
            },
            {
              key: '3',
              label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                  3rd menu item (disabled)
                </a>
              ),
              disabled: true,
            },
            {
              key: '4',
              danger: true,
              label: 'a danger item',
            },
          ]}
        />
      );
      const menu = (
        <Menu>
            <Menu.Item>
                超级管理员
            </Menu.Item>
            <Menu.Item danger>
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
    {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
      className: 'trigger',
      onClick: () => setCollapsed(!collapsed),
    })} */}
    <div style={{float:'right'}}>
        <span>欢迎admin回来</span>
        <Dropdown overlay={menu}>
            <Avatar size='large' icon = {<UserOutlined/>}/>
         </Dropdown>
    </div>
  </Header>
  )
}
