
import React, { useEffect, useState } from "react"
import axios from "axios"
import _ from 'lodash'
import { PageHeader, Card, Col, Row, List } from 'antd'

export default function News(){
    const [list,setList] = useState([])

    useEffect(()=>{
        axios.get('/news?publishState=2&_expand=category').then(res=>{
            var tempList = _.groupBy(res.data,item=> item.category.title);
            var lastList = Object.entries(tempList);
            console.log('游客新闻',res,'整合',tempList,'最终',lastList);
            setList(Object.entries(_.groupBy(res.data,item=> item.category.title)))
        })
    },[])

    const findMode = (List,item) =>{
        var i = -1;
        for(var j = 0;j<List.length;j++){
            var temp = List[j];
            if(temp === item){
                i=j;
                return i;
            }
        }
        return i;
    }
    // 计算链表的长度
    const getListLength = (list) => {
        return list.length
    }

    // 计算链表的长度
    const getListLength2 = (list) => {
        return list.length
    }

    // 删除链表的第一个元素
    const deleteFirst = (list) => {
        return list.splice(0,1)
    }
    
    
    return (<div style={{width:'95%',margin: '0 auto'}}>
        <PageHeader
            className="site-page-header"
            title = "全球大新闻"
            subTitle = "查看新闻"
        />
        <div className="site-card-wrapper">
            <Row gutter={[16,16]}>
                {
                    list.map(item=>{
                        return <Col span={8} key = {item[0]}>
                            <Card title = {item[0]} bordered = {true} hoverable = {true}>
                                <List 
                                size="small" 
                                dataSource={item[1]}
                                pagination = {{
                                    pageSize:2
                                }}
                                renderItem = {data=> <List.Item><a href= {`#/detail/${data.id}`}>{data.title}</a> </List.Item>}
                                />
                            </Card>
                        </Col>
                    })
                }
            </Row>
        </div>
    </div>)
}