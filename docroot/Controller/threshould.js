 $(document).ready(function(){
    	
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
	 	if(connectionServiceFn(username,password)==true){
    	
    	//alert(createTableFn());
    	var options={
    			"colunms":[
    			         
    			           {"colunmsDisplayName":"Structure Name","width":"30%","id":"structure_name","colunmsType":"text"},
    			           {"colunmsDisplayName":"Score","width":"20%","id":"target_score","colunmsType":"text"},
    			           {"colunmsDisplayName":"Threshould Name","width":"20%","id":"threshold_name","colunmsType":"text"},
    			           {"colunmsDisplayName":"IsActive","width":"10%","id":"is_active","colunmsType":"checkbox"},
    			           
    			          ],
    			"form":[{
    	    				"label":"Structure Name","inputType":"dropdown",
    	    				"id":"structure_id","width":"200px","url":""+restfulURL+"/tyw_api/public/threshold/structure_list"
    	    				},
    	    			    {
    	    				"label":"Theshould Name","inputType":"text","default":"All",
    	        			"id":"threshold_name","width":"200px","placeholder":"Theshould Name","required":true,
    	    					
    	    				},
    	    			    {
    	    				"label":"Taget Score","inputType":"text","default":"All",
    	    				"id":"target_score","width":"100px","placeholder":"Taget Score","dataTypeInput":"number","required":true
    	    				},
    	    			    {
    	    				"label":"IsActive","inputType":"checkbox","default":"checked",
    	    				"id":"is_active","width":"200px","placeholder":"Database Name",
    	    				}
    	    					
    	    			],
    	    			
    	    			"advanceSearch":[{
    	 					"label":"Structure Name","inputType":"dropdown",
    	 					"id":"structure_id","width":"100%",
    	 					"url":""+restfulURL+"/tyw_api/public/threshold/structure_list",
    	 					"initValue":"All"
    	 					}],
    	    			
    			 "formDetail":{"formSize":"modal-dialog","formName":"Threshould","id":"databaseConnection","pk_id":"threshold_id"},       
    			 "serviceName":[restfulURL+"/tyw_api/public/threshold"],
    			 "tokenID":tokenID,
    			 "pagignation":false,
    			 "expressSearch":false,
    			 "advanceSearchSet":true
    	}
    	//console.log(options['tokenID'].token);
    	createDataTableFn(options);
    	
	 	}
	 }
    	
    });