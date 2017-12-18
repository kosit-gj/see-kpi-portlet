 $(document).ready(function(){
    	    
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==true){
    	
    	var options={
    			
    			"colunms":[
    			           {"colunmsDisplayName":"Perspective Name","width":"35%","id":"perspective_name","colunmsType":"text"},
    			           {"colunmsDisplayName":"Abbreviation","width":"20%","id":"perspective_abbr","colunmsType":"text"},
    			           {"colunmsDisplayName":"Color","width":"10%","id":"color_code","colunmsType":"color"},
    			           {"colunmsDisplayName":"IsActive","width":"15%","id":"is_active","colunmsType":"checkbox"},
    			          ],
    			"form":[{
    					"label":"Perspective Name","inputType":"text","placeholder":"Perspective Name",
    					"id":"perspective_name","width":"200px","required":true,
    					},
    					{
            				"label":"Abbreviation","inputType":"text","placeholder":"Abbreviation",
            				"id":"perspective_abbr","width":"200px"
            			},
            			{
        	    			"label":"Color","inputType":"color","default":"All",
        	    			"id":"color_code","width":"70px","height":"27px","dataTypeInput":"color"
        	    		},
    			        
    					{
        					"label":"IsActive","inputType":"checkbox","default":"checked",
        					"id":"is_active","width":"200px"
        					}
    					
    			     ],
        	     "formDetail":{"formSize":"modal-dialog","formName":"Perspective","id":"perspective","pk_id":"perspective_id"},       
    			 "serviceName":[restfulURL+"/"+serviceName+"/public/perspective"],
    			 "tokenID":tokenID,
    			 "pagignation":false,
    			 "expressSearch":false
    	}
    	//console.log(options['tokenID'].token);
    	createDataTableFn(options);
    	
	 	}
	 }
    	
    });