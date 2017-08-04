 $(document).ready(function(){
    	    
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
	 	if(connectionServiceFn(username,password)==true){
    	
    	var options={
    			
    			"colunms":[
    			           {"colunmsDisplayName":"Perspective Name","width":"65%","id":"perspective_name","colunmsType":"text"},
    			           {"colunmsDisplayName":"IsActive","width":"20%","id":"is_active","colunmsType":"checkbox"},
    			          ],
    			"form":[{
    					"label":"Perspective Name","inputType":"text","placeholder":"Perspective Name",
    					"id":"perspective_name","width":"200px","required":true,
    					},
    			        
    					{
        					"label":"IsActive","inputType":"checkbox","default":"checked",
        					"id":"is_active","width":"200px"
        					}
    					
    			     ],
        	     "formDetail":{"formSize":"modal-dialog","formName":"Perspective","id":"perspective","pk_id":"perspective_id"},       
    			 "serviceName":[restfulURL+"/see_api/public/perspective"],
    			 "tokenID":tokenID,
    			 "pagignation":false,
    			 "expressSearch":false
    	}
    	//console.log(options['tokenID'].token);
    	createDataTableFn(options);
    	
	 	}
	 }
    	
    });