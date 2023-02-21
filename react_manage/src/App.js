import React from "react";
import Child from "./Child";
import { useEffect } from "react";
import IndexRouter from "./router/IndexRouter";
import {Provider} from 'react-redux'
import './App.css'
import axiox from 'axios'
import store from "./redux/store";
import TestScss from "./views/sandbox/testScss/TestScss";
function App() {
   //
  useEffect(()=>{
    console.log('此处进行数据请求');
    // axiox.get("/ajax/moreClassicList?sortId=1&showType=1&limit=10&offset=30&optimus_uuid=D307AA30560A11EDACB5E5D6D21182C88F40FB5574DA40BA88B434F852636749&optimus_risk_level=71&optimus_code=10").then(res=>{
    //   console.log('数据请求---');
    //   console.log(res.data);
    // })
    // axiox.get('http://localhost:8000/posts').then((res)=>{
    //   console.log(res);
    // })
  },[])
  return (
      <Provider store = {store}>
         <IndexRouter></IndexRouter>
         {/* <TestScss/> */}
      </Provider>
  );
}

export default App;
