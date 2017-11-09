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
	    			           {"colunmsDisplayName":"Axis Value_name","width":"10%","id":"axis_value_name","colunmsType":"text"},
	    			           {"colunmsDisplayName":"Axis Value","width":"15%","id":"axis_value","colunmsType":"text","colunmsDataType":"decimal"},
	    			           {"colunmsDisplayName":"Axis Value Start","width":"15%","id":"axis_value_start","colunmsType":"text","colunmsDataType":"decimal"},
	    			           {"colunmsDisplayName":"Axis Value End","width":"15%","id":"axis_value_end","colunmsType":"text","colunmsDataType":"decimal"},
	    			  
	    			          ],
	    			
	    			     "form":[{
	     					"label":"Appraisal Level","inputType":"dropdown",
	     					"id":"appraisal_level_id","width":"200px","url":""+restfulURL+"/see_api/public/appraisal_grade/al_list"
	     					},
	     			        {
	     					"label":"Appraisal Grade","inputType":"text","placeholder":"Appraisal Grade",
	         				"id":"grade","width":"100px","required":true
	     					
	     					},
	     			        {
	     					"label":"Begin Score","inputType":"text","placeholder":"Begin Score",
	     					"id":"begin_score","width":"250px","dataTypeInput":"number","required":true
	     					},
	     			        {
	     					"label":"End Score","inputType":"text","placeholder":"End Score",
	     					"id":"end_score","width":"200px","dataTypeInput":"number","required":true
	     					},
	     					{
	         				"label":"Salary Raise","inputType":"text","placeholder":"Salary Raise",
	         				"id":"salary_raise_amount","width":"200px","dataTypeInput":"number","required":true
	         				},
	     			        {
	     					"label":"IsAtive","inputType":"checkbox","default":"checked",
	     					"id":"is_active","width":"200px"
	     					}
	     					
	     			     ],
	     			     
	     			    "advanceSearch":[{
	     			    	"label":"Level","label_tooltip":"Level","inputType":"dropdown",
	     					"id":"appraisal_level_id","width":"100%",
	     					"url":""+restfulURL+"/see_api/public/appraisal_grade/al_list",
	     					"initValue":"All"
	    			     	}],
	     			     
	    			 "formDetail":{"formSize":"modal-dialog","formName":"Appraisal Grade","id":"databaseConnection","pk_id":"grade_id"},       
	    			 "serviceName":[restfulURL+"/see_api/public/appraisal_grade"],
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