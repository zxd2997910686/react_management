import { Descriptions, PageHeader } from 'antd';
import axios from 'axios';
import React, { useState } from 'react'
import {HeartTwoTone} from '@ant-design/icons'
import moment from 'moment'

export default function Detail(props) {
    console.log('detail ',props);
    const [newsInfo,setNewInfo] = useState(null)
    useState(()=>{
        axios.get(`/news/${props.match.params.id}?_expand=category&_expand=role`).then(res=>{
            console.log(res.data);
            setNewInfo({
                ...res.data,
                view:res.data.view+1
            })
            //同步后端
            return res.data
        }).then(res=>{
            console.log('同步后端--res',res);
            axios.patch(`/news/${props.match.params.id}`,{
                view:res.view+1
            })
        })
    },[props.match.params.id])

    const handleStar = ()=>{
        setNewInfo({
            ...newsInfo,
            star:newsInfo.star+1
        })
        axios.patch(`/news/${props.match.params.id}`,{
            star:newsInfo.star+1
        })
    }
  return (
    <div>
      {
        newsInfo && <div>
            <PageHeader onBack={()=> window.history.back()}
            title = {newsInfo.title}
            subTitle = {<div>
                {newsInfo.category.title} <span></span>
                <HeartTwoTone twoToneColor={"#eb2f96"} onClick = {()=> handleStar()}/>
            </div>}
            >
                <Descriptions size='small' column={3}>
                    <Descriptions.Item label = "创建者">{newsInfo.author}</Descriptions.Item>
                    <Descriptions.Item label="发布时间">{
                                newsInfo.publishTime ? moment(newsInfo.publishTime).format("YYYY/MM/DD HH:mm:ss") : "-"
                            }</Descriptions.Item>
                    <Descriptions.Item label="区域">{newsInfo.region}</Descriptions.Item>
                           
                    <Descriptions.Item label="访问数量">{newsInfo.view}</Descriptions.Item>
                    <Descriptions.Item label="点赞数量">{newsInfo.star}</Descriptions.Item>
                   <Descriptions.Item label="评论数量">0</Descriptions.Item>
                </Descriptions>
            </PageHeader>
            <div dangerouslySetInnerHTML={{__html:newsInfo.content}} style = {{margin:'0 24px',border:'1px soild gray'}}></div>
        </div>
      }
    </div>
  )
}
