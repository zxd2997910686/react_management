import { Button, Table } from 'antd';
import React from 'react'

export default function NewsPublish(props) {
    console.log('组件传入的数据',props);
    const columns = [
        {
            title:'新闻标题',
            dataIndex:'title',
            render:(title,item)=>{
                return <a href={`#/news-manage/preview/${item.id}`} >{title}</a>
            }
        },
        {
            title:'作者',
            dataIndex:'author'
        },
        {
            title:'新闻分类',
            dataIndex:'category',
            render:(category)=>{
                return <div>{category.title}</div>
            }
        },
        {
            title:'操作',
            render:(item)=>{
                return <div>
                    <Button>button</Button>
                </div>
            }
        }

    ]
  return (
    <div>
      <Table
         dataSource={props.dataSource}
         columns = {columns}
         pagination = {{
            pageSize:10
         }}
         rowKey = {item => item.id}
      />
    </div>
  )
}
