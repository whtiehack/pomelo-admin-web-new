/**
 * admin module 示例
 * 参考 https://github.com/NetEase/pomelo/wiki/%E5%A2%9E%E5%8A%A0admin-module
 * testmodule.ts
 * 2018-04-09 15:04:51
 * by smallwhite
 */


/*

app.registerAdmin(TestAdminModule,{app:app});
 */
import {Application,IModule,ModuleType} from "pinus";
// module.exports = function(opts) {
//     return new Module(opts);
// };

const moduleId = "testAdmin";
// module.exports.moduleId = moduleId;


export class TestAdminModule implements IModule{
    app:Application;
    type:ModuleType;
    interval:number;
    static moduleId = moduleId;
    constructor({app,type,interval}){
        this.app = app;
        this.type = type || 'pull';
        this.interval = interval || 5;
    }
    monitorHandler(agent, msg, cb) {
    //    console.log(this.app.getServerId() + '  ' + msg);
        const serverId = agent.id;
        const time = new Date().toString();

        agent.notify(moduleId, {serverId: serverId, time: time});
    }

    masterHandler(agent, msg) {
        if (!msg) {
            // 通知monitor
            const testMsg = 'testMsg';
            agent.notifyAll(moduleId, testMsg);
            return;
        }
        // monitor 消息回调
     //   console.log(JSON.stringify(msg));
        let timeData = agent.get(moduleId);
        if (!timeData) {
            timeData = {};
            agent.set(moduleId, timeData);
        }
        timeData[msg.serverId] = msg.time;
    }

    clientHandler(agent, msg, cb) {
        console.log('!! test module: clientHandler:'+JSON.stringify(msg));
        cb(null, agent.get(moduleId));
    }
}





