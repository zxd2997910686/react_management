# react_management

管理系统

# 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

<!--
     npm 安装比较慢的话，需要替换成国内镜像
      采用淘宝的镜像地址
      1. npm config set registry https://registry.npm.taobao.org
      2.查看是否安装成功
        执行 npm config get registry
        输出 https://registry.npm.taobao.org/
      镜像替换成功

 -->
<!--
  1.要是用scss需要先安装  执行命令  npm i --save sass
  2.安装axios   执行命令  npm i --save axios
  3.抓取其他平台的数据需要配置反向代理
    https://create-react-app.bootcss.com/docs/proxying-api-requests-in-development
    在src下创建一个文件  src/setupProxy.js

    需要安装  http-proxy-middleware          npm i --save http-proxy-middleware
    4.安装路由
       npm i --save-dev react-router-dom


     5.配置本地接口
     安装 json-server  sudo npm install -g json-server
     然后创建一个db.json文件，在此文件所在的文件打开窗口，执行 json-server --watch .\db.json  --port 8000
     然后在浏览器打开http://localhost:8000/posts即可看到数据
     _embed = comments 关联表

     引入粒子效果
     npm install react-particles-js
     安装进度条 npm install --save nprogress

     安装富文本编辑器
     npm install react-draft-wysiwyg
      npm install draft-js
     npm install draftjs-to-html
     npm install html-to-draftjs



 -->
 <!-- 
    //安装插件 搜索react （ES7 React/Redux/GraphQL/React-） 安装此插件
    rfc 生成函数式组建
    rcc 生成commponent组建
 Origin
  -->
 <!-- https://i.maoyan.com/ajax/mostExpected?limit=10&offset=0&token=&optimus_uuid=D307AA30560A11EDACB5E5D6D21182C88F40FB5574DA40BA88B434F852636749&optimus_risk_level=71&optimus_code=10 -->

 <!-- 
 
 get获取
 post 增加
 put   更新(只更新自己上传的值，其他的会被清除)
 patch 局部更新 、
 delete  删除
   -->

   <!-- 
   
      //取数据  get
        // axios.get("http://localhost:8000/posts/2").then(res=>{
        //     console.log(res.data)
        // })

        // 增  post
        // axios.post("http://localhost:8000/posts",{
        //     title:"33333",
        //     author:"xiaoming"
        // })

        // 更新 put

        // axios.put("http://localhost:8000/posts/1",{
        //     title:"1111-修改"
        // })

        // 更新 patch
        // axios.patch("http://localhost:8000/posts/1",{
        //     title:"1111-修改-11111"
        // }) 

        // 删除  delete
        // axios.delete("http://localhost:8000/posts/1")
    
        // _embed
        // axios.get("http://localhost:8000/posts?_embed=comments").then(res=>{
        //     console.log(res.data)
        // })

        // _expand
        // axios.get("http://localhost:8000/comments?_expand=post").then(res=>{
        //     console.log(res.data)
        // })
    -->
