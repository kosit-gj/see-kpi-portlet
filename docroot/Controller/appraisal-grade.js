 $(document).ready(function(){
    	
    	
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
	 	if(connectionServiceFn(username,password)==true){
    	//alert(createTableFn());
	    	var options={
	    			"colunms":[
	    			         
	    			           {"colunmsDisplayName":"Appraisal Level","width":"15%","id":"appraisal_level_name","colunmsType":"text"},
	    			           {"colunmsDisplayName":"Grade","width":"15%","id":"grade","colunmsType":"text"},
	    			           {"colunmsDisplayName":"Begin Score","width":"15%","id":"begin_score","colunmsType":"text"},
	    			           {"colunmsDisplayName":"End Score","width":"15%","id":"end_score","colunmsType":"text"},
	    			           {"colunmsDisplayName":"Salary Raise","width":"15%","id":"salary_raise_amount","colunmsType":"text"},
	    			           {"colunmsDisplayName":"IsActive","width":"15%","id":"is_active","colunmsType":"checkbox"},
	    			          ],
	    			
	    			     "form":[{
	     					"label":"Appraisal Level","inputType":"dropdown",
	     					"id":"appraisal_level_id","width":"200px","url":""+restfulURL+"/tyw_api/public/appraisal_grade/al_list"
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
	     			    	"label":"Appraisal Level","inputType":"dropdown",
	     					"id":"appraisal_level_id","width":"100%",
	     					"url":""+restfulURL+"/tyw_api/public/appraisal_grade/al_list",
	     					"initValue":"All"
	    			     	}],
	     			     
	    			 "formDetail":{"formSize":"modal-dialog","formName":"Appraisal Grade","id":"databaseConnection","pk_id":"grade_id"},       
	    			 "serviceName":[restfulURL+"/tyw_api/public/appraisal_grade"],
	    			 "tokenID":tokenID,
	    			 "pagignation":true,
	    			 "expressSearch":false,
	    			 "advanceSearchSet":true
	    	}
	    	//console.log(options['tokenID'].token);
	    	createDataTableFn(options);
    	
	 	}
	 }
    });