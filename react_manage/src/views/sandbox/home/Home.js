import React, { useEffect, useState } from 'react'
import { Button ,Card,Col,Row,List,Avatar} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import TestScss from '../testScss/TestScss';
import axios from 'axios';
const {Meta} = Card;
export default function Home() {
  const [viewList,setViewList] = useState([])
  const [starLit,setStarList] = useState([])
  useEffect(()=>{
    axios.get("/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6").then(res=>{
      // console.log("home-view--",res);
      setViewList(res.data)
    })
  },[])
  useEffect(()=>{
    axios.get('/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6').then(res=>{
      // console.log('home--star--',res);
      setStarList(res.data)
    })
  },[])

  const {username,region,role:{roleName}} = JSON.parse(localStorage.getItem("token"))
  return (
    <div>
      <div className='site-card-wrapper'>
        <Row gutter={16}>
          <Col span={8}>
            <Card title = "用户最长浏览" bordered = {true}>
            <List
                size='small'
                 dataSource={viewList}
                  renderItem = {item => <List.Item>
                    <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
                  </List.Item>}
            />
            </Card>
          </Col>
          <Col span={8}>
            <Card  title = "用户点赞最多" bordered = {true}>
            <List
                  size="small"
                  // bordered
                  dataSource={starLit}
                  renderItem={item => <List.Item>
                      <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
                  </List.Item>}
             />
            </Card>
          </Col>
          <Col span={8}>
            <Card
            cover = {
              <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>
            }
            actions = {[
              <SettingOutlined key= "setting"/>,
              <EditOutlined key= "edit"/>,
              <EllipsisOutlined key="ellipsis"/>
            ]}
            >
              <Meta 
                 avatar = {<Avatar src = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                 title = {username}
                 description = {
                  <div>
                    <b>{region?region:"全球"}</b>
                    <span style={{paddingLeft:"30px"}}>{roleName}</span>
                  </div>
                 }
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}
