import React from 'react'
import { UserOutlined, LockOutlined} from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import axios from 'axios'
import './Login.css'
export default function Login(props) {
  console.log(props);
  const onFinish =(values)=>{
    console.log('登录提交');
    console.log(values);
    axios.get(`http://localhost:8000/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then(res=>{
    console.log('登录结果'); 
    console.log(res); 
    if(res.data.length ===0){

      }else{
        localStorage.setItem('token',JSON.stringify(res.data[0]));
        props.history.push('/')
      }
    })
  }
  return (
    <div style={{background:'rgb(35,39,65)',height:'100%'}}>
      <div className='fromContainer'>
        <div className='logintitle'>mi全球新闻发布管理系统</div>
        <Form name='normal_login' 
           onFinish={onFinish}
        >
          <Form.Item 
             name='username'
             rules ={[{required:true,message:'Please input you Username!'}]}
          >
             <Input prefix = {<UserOutlined className='site-from-item-icon'/>} placeholder="Username"/>
          </Form.Item>
          
          <Form.Item 
             name='password'
             rules ={[{required:true,message:'Please input you Password!'}]}
          >
             <Input prefix = {<LockOutlined className='site-from-item-icon'/>} placeholder="Password" type='password'/>
          </Form.Item>

          <Form.Item>
              <Button type='primary' htmlType='submit' className='login-form-button'>登录</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
