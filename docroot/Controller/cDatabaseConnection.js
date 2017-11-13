 $(document).ready(function(){
   
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==true){
	 
	 		
    	var options={
    			"colunms":[
    			           {"colunmsDisplayName":"Connection Name","width":"20%","id":"connection_name","colunmsType":"text"},
    			           {"colunmsDisplayName":"Database Type","width":"65%","id":"database_type","colunmsType":"text"},
    			          ],
    			"form":[{
    					"label":"Connection Name","inputType":"text","placeholder":"Connection Name",
    					"id":"connection_name","width":"350px","required":true
    					},
    			        {
    					"label":"Database Type","inputType":"dropdown","default":"checked",
    					"id":"database_type_id","width":"250px","url":""+restfulURL+"/"+serviceName+"/public/database_connection/db_type_list",
    					},
    			        {
    					"label":"IP Address","inputType":"text","placeholder":"IP Address",
    					"id":"ip_address","width":"350px","dataTypeInput":"ip","required":true
    					},
    			        {
    					"label":"Port","inputType":"text","placeholder":"Port",
    					"id":"port","width":"250px","dataTypeInput":"number","required":true
    					},
    			        {
    					"label":"Database Name","inputType":"text","placeholder":"Database Name",
    					"id":"database_name","width":"350px","required":true
    					},
    			        {
    					"label":"User","inputType":"text","placeholder":"User",
    					"id":"user_name","width":"250px","required":true
    					},
    			        {
    					"label":"Password","inputType":"password","placeholder":"Password",
    					"id":"password","width":"250px","required":true
    					}
    					
    			     ],
			     "advanceSearch":[{
 					"label":"aaa Name0","inputType":"text","placeholder":"DefultText",
 					"id":"connection_name0","width":"100%",
 					"dataTypeInput":"number"
			     	},{
 					"label":"bbb Name1","inputType":"dropdown",
 					"id":"connection_name1","width":"100%",
 					"url":""+restfulURL+"/"+serviceName+"/public/database_connection/db_type_list",
 					"initValue":"All Data1"
 					},{
 					"label":"ccc Name2","inputType":"dropdown",
 					"id":"connection_name2","width":"100%",
 					"url":""+restfulURL+"/"+serviceName+"/public/database_connection/db_type_list",
 					"initValue":"All Data2"
 					}],
 					
    			 "formDetail":{"formSize":"modal-dialog","formName":"Database Connection","id":"databaseConnection","pk_id":"connection_id"},       
    			 "serviceName":[restfulURL+"/"+serviceName+"/public/database_connection"],
    			 "tokenID":tokenID,
    			 "pagignation":false,
    			 "expressSearch":false,
    			 "advanceSearchSet":false,
    			 //"btnManageOption":{"id":"BtnID","name":"BtnName"},
    			 //"btnAdvanceSearchOption":{"id":"BtnID","name":"<i class=\"fa fa-plus-square\"></i>&nbsp;Btn"}
    	}
    	
    	createDataTableFn(options);
    	
		}
	 }
    });
 
