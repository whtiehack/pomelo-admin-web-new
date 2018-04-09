Ext.onReady(function(){

	Ext.BLANK_IMAGE_URL ='../ext-4.0.7-gpl/resources/themes/images/default/tree/s.gif'; 
	
   var testAdminStore = Ext.create('Ext.data.Store', {
	id:'testAdminStoreId',
	autoLoad:false,
	pageSize:5,
    fields:['time','serverId'],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'requests'
        }
    }
});
/**
 * userGrid,detail users' message
 */
var testAdminGrid=Ext.create('Ext.grid.Panel', {
	id:'testAdminGridId',
	region:'center',
    store: testAdminStore,
    columns:[
		{xtype:'rownumberer',width:50,sortable:false},
		{text:'serverId',width:120,dataIndex:'serverId'},
		// {text:'name',dataIndex:'name',width:100},
		// {text:'kindName',dataIndex:'kindName',width:100},
		{text:'time',dataIndex:'time',width:400}
		],
	 tbar:[{
          xtype:'button',
          text:'refresh',
          handler:refresh
         }]
});
var viewport=new Ext.Viewport({
	    layout:'border',
	    items:[testAdminGrid]
	});
	refresh();
});

function refresh(){
   window.parent.client.request('testAdmin', {testarg:'test'}, function(err, msg) {
    if(err) {
      console.error('fail to request testAdmin info:');
      console.error(err);
      return;
    }
 //   console.log('!! test admin msg',msg);
    // compose display data
    var data = [];
    for(var id in msg) {
        data.push({
            serverId : id,
            // name : msg[id][i]['name'],
            // kindName : msg[id][i]['kindName'],
            //position : '('+msg[id][i].x+','+msg[id][i].y+')'
            time:msg[id]
        });
    }
    var store = Ext.getCmp('testAdminGridId').getStore();
    store.loadData(data);
  });
}	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
