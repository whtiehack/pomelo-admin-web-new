/**
 * Created by lenovo on 2017/8/24.
 */
var pomelo = require('pomelo');
/**
 * Init app for client
 */
var app = pomelo.createApp();

app.configure('production|development', function () {
    app.before(pomelo.filters.toobusy());
    app.enable('systemMonitor');//开启监控

    app.filter(pomelo.filters.time()); //开启conn日志，对应pomelo-admin模块下conn request
    app.rpcFilter(pomelo.rpcFilters.rpcLog());//开启rpc日志，对应pomelo-admin模块下rpc request

    var onlineUser = require('./app/modules/onlineUser');
    if (typeof app.registerAdmin === 'function') {
        app.registerAdmin(onlineUser, {app: app});
    }
});