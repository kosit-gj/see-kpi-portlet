 $(document).ready(function(){
   
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
	 	if(connectionServiceFn(username,password)==true){
	 
	 		
    	var options={
    			"colunms":[
    			           {"colunmsDisplayName":"Organization Code","width":"20%","id":"org_code","colunmsType":"text"},
    			           {"colunmsDisplayName":"Organization","width":"30%","id":"org_name","colunmsType":"text"},
    			           {"colunmsDisplayName":"Parent Org.","width":"30%","id":"parent_org_name","colunmsType":"text"},
    			           {"colunmsDisplayName":"Is Active","width":"10%","id":"is_active","colunmsType":"checkbox"},
    			          ],
    			"form":[{
    					"label":"Organization Code","inputType":"text","placeholder":"Organization Code",
    					"id":"org_code","width":"250px","required":true
    					},
    					{
        				"label":"Organization Name","inputType":"text","placeholder":"Organization Name",
        				"id":"org_name","width":"350px","required":true
        				},
    			        {
    					"label":"Database Type","inputType":"dropdown","default":"",
    					"id":"database_type_id","width":"250px","url":""+restfulURL+"/see_api/public/org",
    					},
    					{
	 	    			"label":"IsActive","inputType":"checkbox","default":"checked",
	 	    			"id":"is_active","width":"200px"
	 	    			}
    					
    			     ],
			     "advanceSearch":[{
 					"label":"aaa Name0","inputType":"text","placeholder":"DefultText",
 					"id":"connection_name0","width":"100%",
 					"dataTypeInput":"number"
			     	},{
 					"label":"bbb Name1","inputType":"dropdown",
 					"id":"connection_name1","width":"100%",
 					"url":""+restfulURL+"/kpi_api/public/database_connection/db_type_list",
 					"initValue":"All Data1"
 					},{
 					"label":"ccc Name2","inputType":"dropdown",
 					"id":"connection_name2","width":"100%",
 					"url":""+restfulURL+"/kpi_api/public/database_connection/db_type_list",
 					"initValue":"All Data2"
 					}],
 					
    			 "formDetail":{"formSize":"modal-dialog","formName":"Database Connection","id":"databaseConnection","pk_id":"connection_id"},       
    			 "serviceName":[restfulURL+"/kpi_api/public/database_connection"],
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
 
