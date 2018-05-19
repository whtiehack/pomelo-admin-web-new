# pomelo-admin-web-new
new pomelo-admin-web
pomelo-admin-web is a web console for [pomelo](https://github.com/NetEase/pomelo). it is based on [pomelo-admin](https://github.com/NetEase/pomelo-admin). it is just an web console example, you can implement your style like web console.

##Installation


```
git clone https://github.com/whtiehack/pomelo-admin-web-new.git
cd pomelo-admin-web-new
npm i -d
```


##Usage
just run


```
node app.js
```


open browser in your computer,and enjoy it


## onlineUserModule


 onlineUserModule里放的是在线用户的module，对应的是服务器里面放的位置

说明

服务器需安装 [pomelo-admin](https://github.com/NetEase/pomelo-admin)库


```
npm install --save  pomelo-admin
```



#### 经过测试onlineUser里面的address能获取websocket协议服务器的用户ip，而socke.io协议的不能；另外，其他的如systemInfo等由pomelo-admin提供的module windows系统不能获取信息，linux系统可以。
