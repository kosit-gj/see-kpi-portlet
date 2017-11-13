 $(document).ready(function(){
    	
    	
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==true){
    	//alert(createTableFn());
	    	var options={
	    			"colunms":[
	    				 
	    			           {"colunmsDisplayName":"Axis Type ID","width":"15%","id":"axis_type_id","colunmsType":"text"},
	    			           {"colunmsDisplayName":"Axis Name","width":"20%","id":"axis_value_name","colunmsType":"text"},
	    			           {"colunmsDisplayName":"Axis Value","width":"15%","id":"axis_value","colunmsType":"text","colunmsDataType":"decimal"},
	    			           {"colunmsDisplayName":"Axis Value Start","width":"15%","id":"axis_value_start","colunmsType":"text","colunmsDataType":"decimal"},
	    			           {"colunmsDisplayName":"Axis Value End","width":"15%","id":"axis_value_end","colunmsType":"text","colunmsDataType":"decimal"},
	    			  
	    			          ],
	    			
	    			     "form":[{
	     					"label":"Axis Type","inputType":"dropdown",
	     					"id":"axis_type_id","width":"200px","url":""+restfulURL+"/"+serviceName+"/public/axis_mapping/axis_type_list"
	     					},
	     			        {
	     					"label":"Axis Value Name","inputType":"text","placeholder":"Axis Value Name",
	         				"id":"axis_value_name","width":"100px","required":true
	     					
	     					},
	     			        {
	     					"label":"Axis Value","inputType":"text","placeholder":"Axis Value",
	     					"id":"axis_value","width":"250px","dataTypeInput":"number","required":true
	     					},
	     			       
	     					{
	         				"label":"Axis Value Start","inputType":"text","placeholder":"Axis Value Start",
	         				"id":"axis_value_start","width":"200px","dataTypeInput":"number"
	         				},
	         				{
	         				"label":"Axis Value End","inputType":"text","placeholder":"Axis Value End",
	         				"id":"axis_value_end","width":"200px","dataTypeInput":"number"
		         			}
	     			       
	     					
	     			     ],
	     			     
	     			    "advanceSearch":[{
	     			    	"label":"Axis Type","label_tooltip":"Axis Type","inputType":"dropdown",
	     					"id":"axis_type_id","width":"100%",
	     					"url":""+restfulURL+"/"+serviceName+"/public/axis_mapping/axis_type_list",
	     					"initValue":"All"
	    			     	}],
	     			     
	    			 "formDetail":{"formSize":"modal-dialog","formName":"Axis","id":"axisForm","pk_id":"axis_mapping_id","edit_flag":true},       
	    			 "serviceName":[restfulURL+"/"+serviceName+"/public/axis_mapping"],
	    			 "tokenID":tokenID,
	    			 "pagignation":true,
	    			 "expressSearch":false,
	    			 "advanceSearchSet":true
	    	}
	    	//console.log(options['tokenID'].token);
	    	createDataTableFn(options);
	    	
    	
	 	}
	 }
		//binding tooltip start
	 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
	 $('[data-toggle="tooltip"]').tooltip({
		 html:true
	 });
	//binding tooltip end
    });