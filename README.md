# pomelo-admin-web-new
new pomelo-admin-web
pomelo-admin-web is a web console for [pomelo](https://github.com/NetEase/pomelo). it is based on [pomelo-admin](https://github.com/NetEase/pomelo-admin). it is just an web console example, you can implement your style like web console.

## Installation


```
git clone https://github.com/whtiehack/pomelo-admin-web-new.git
cd pomelo-admin-web-new
npm i -d
```


## Usage
just run

```
node app.js
```

open browser in your computer,and enjoy it

# Docker Image

```
docker run --name pinusadminweb -d --network host -e ADMIN_USERNAME=admin  ADMIN_PASSWORD=admin   smallwhite/pinus-admin-web
```


## 更多的环境变量看这里：
```
adminConfig.username = process.env.ADMIN_USERNAME ? process.env.ADMIN_USERNAME : adminConfig.username;
adminConfig.password = process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD : adminConfig.password;
adminConfig.port = process.env.ADMIN_PORT ? process.env.ADMIN_PORT : adminConfig.port;
adminConfig.host = process.env.ADMIN_HOST ? process.env.ADMIN_HOST : adminConfig.host;

config.host = process.env.SERVER_HOST ? process.env.SERVER_HOST : config.host;
config.port = process.env.SERVER_PORT ? process.env.SERVER_PORT : config.port;
config.username = process.env.SERVER_USERNAME ? process.env.SERVER_USERNAME : config.username;
config.password = process.env.SERVER_PASSWORD ? process.env.SERVER_PASSWORD : config.password;

```

## onlineUserModule


 onlineUserModule里放的是在线用户的module，对应的是服务器里面放的位置

说明

服务器需安装 [pomelo-admin](https://github.com/NetEase/pomelo-admin)库


```
npm install --save  pomelo-admin
```



#### 经过测试onlineUser里面的address能获取websocket协议服务器的用户ip，而socke.io协议的不能；另外，其他的如systemInfo等由pomelo-admin提供的module windows系统不能获取信息，linux系统可以。
