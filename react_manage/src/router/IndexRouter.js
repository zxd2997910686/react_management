import React from 'react'
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'
import News from '../views/sandbox/news/News'
import Detail from '../views/sandbox/news/Detail'
export default function IndexRouter() {
  return (
    <HashRouter>
        <Switch>
             <Route path= '/login' component={Login} />
             <Route path= '/news' component={News}/>
             <Route path= '/detail/:id' component = {Detail}/>
             {/* <Route path= '/' component={NewsSandBox}/> */}
             <Route path= '/'  render={()=>
                // 此处可以做逻辑处理
                localStorage.getItem('token')?
                <NewsSandBox></NewsSandBox>:
                <Redirect to='/login'/>
             }/>

        </Switch>
      
    </HashRouter>
  )
}
