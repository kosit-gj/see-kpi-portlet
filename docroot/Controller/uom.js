 $(document).ready(function(){
    	
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==true){
    	
    	//alert(createTableFn());
		    	var options={
		    			
		    			"colunms":[
		    			           {"colunmsDisplayName":"UOM Name","width":"65%","id":"uom_name","colunmsType":"text"},
		    			           {"colunmsDisplayName":"IsActive","width":"20%","id":"is_active","colunmsType":"checkbox"},
		    			          ],
		    			"form":[{
		    					"label":"UOM Name","inputType":"text","placeholder":"UOM Name",
		    					"id":"uom_name","width":"200px","required":true,
		    					},
		    			        
		    					{
		        					"label":"IsActive","inputType":"checkbox","default":"checked",
		        					"id":"is_active","width":"250px"
		        					}
		    					
		    			     ],
		        	     "formDetail":{"formSize":"modal-dialog","formName":"UOM","id":"uom","pk_id":"uom_id"},       
		    			 "serviceName":[restfulURL+"/"+serviceName+"/public/uom"],
		    			 "tokenID":tokenID,
		    			 "pagignation":false,
		    			 "expressSearch":false
		    	}
		    	console.log(options['tokenID'].token);
		    	createDataTableFn(options);
	 	}	
	 }   
    	
    });