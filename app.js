const express = require('express');
const adminConfig = require('./config/admin.json');
const config = require('./config/server.json');
const admin = require("pomelo-admin");
const Mqtt = require('pomelo-admin/lib/protocol/mqtt/mqttClient');
const app = express();  //
const server = require('http').Server(app);
const io = require('socket.io')(server);

let exited = false;
Mqtt.prototype.exit = function(){
    console.log('mqtt client exit!!');
    exited = true;
};
//创建adminClient
const adminClient = new admin.adminClient({
    username:config.username,
    password:config.password
});

adminClient.on('error',err=>{
    console.log('!! mqtt admin client error',err);
});
adminClient.on('close',val=>{
    console.log('@@ mqtt admin client close',val);
    exited = true;
});

function connectorAdmin(cb){
    if(adminClient.socket && adminClient.socket.socket){
    //    adminClient.socket.close();
    //    adminClient.socket = null;
    }
 //   console.log('state',adminClient.state);
    adminClient.connect('pomelo-web-1',config.host,config.port,function(err){
        if(err){
            console.log(err);
        }
        if(cb){
            cb(err);
        }
    })
}

connectorAdmin();

//--------------------configure app----------------------
const pub = __dirname + '/public';
const view = __dirname + '/views';
app.configure(function() {
    app.set('view engine', 'html');
    app.set('views', view);
    app.engine('.html', require('ejs').__express);

    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.set('basepath', __dirname);
    app.set('x-powered-by', false);

});

app.configure('development', function() {
    app.use(express.static(pub));
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

app.configure('production', function() {
    const oneYear = 31557600000;
    app.use(express.static(pub, {
        maxAge: oneYear
    }));
    app.use(express.errorHandler());
});

app.on('error', function(err) {
    console.error('app on error:' + err.stack);
});

app.get('/', function(req, resp) {
    resp.render('index', adminConfig);
});

app.get('/module/:mname', function(req, resp) {
    resp.render(req.params.mname);
});

server.listen(7001);
console.log('[AdminConsoleStart] visit http://127.0.0.1:7001');

io.on('connection', function (socket) {
    socket.emit('connect', { hello: 'world' });
    socket.on('client',function(req){
        //控制台打印连接信息
        //console.log("socket:" +req)
        handleModuleReq(req,socket);
    })
});

/**
 * 处理模块请求
 * @param req
 * @param socket
 */
function handleModuleReq(req,socket){
    if(typeof req == 'string'){
        req = JSON.parse(req);
    }
   // req = JSON.parse(req);
    //ep.emit('req_socket',socket);
    if(adminClient.state !==3){
        failedMessage();
        return;
    }else{
        processMessage();
    }
    function failedMessage(){
        console.log('admin client has not connect',req);
        socket.emit('client',JSON.stringify({respId:req.reqId,error:'admin client has not connect'}));
        if(exited){
            exited = false;
            connectorAdmin();
        }
    }
    function processMessage(){
        if(adminClient.state !==3 || !adminClient.socket || !adminClient.socket.socket){
            failedMessage();
            return;
        }
        adminClient.request(req.moduleId,req.body,function(err,data,msg){
            const resp ={
                respId:0,
                body:''
            }
            resp.respId = req.reqId;
            resp.body = data;
            socket.emit('client',JSON.stringify(resp));
        })
    }
}