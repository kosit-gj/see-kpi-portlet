function SetSalaryRaise(){
	 // set salary_raise_amount enable/disable //
	 $.ajax({
		 url: restfulURL+"/"+serviceName+"/public/system_config",
		 type: "get",
		 dataType: "json",
		 headers: {Authorization:"Bearer "+tokenID.token},
		 async: false,
		 success: function(data) {
			 if(data.raise_type == 3){
				 $("#form-group-salary_raise_amount label").html("Raise Step <span class='redFont'>*</span>");
				 $("#salary_raise_amount").attr("placeholder", "Raise Step");
				 
				 $("#salary_raise_amount").parent().append("<p style='padding-top:5px;'><font size='2.5' color='red'> ( Use salary structure table ) </font></p>");
				 
			 } else {
				 $("#form-group-salary_raise_amount label").html("Salary Raise <span class='redFont'>*</span>");
				 $("#salary_raise_amount").attr("placeholder", "Salary Raise");
				 
				 $("#form-group-structure_id").hide();
				 $("#form-group-is_judgement").hide();
			 }
		 }
	 });
}


$(document).ready(function(){
	 
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==true){
	    	var options={
	    			"colunms":[
	    				{"colunmsDisplayName":"Appraisal Form","width":"auto","id":"appraisal_form_name","colunmsType":"text"},
 			           {"colunmsDisplayName":"Appraisal Level","width":"auto","id":"appraisal_level_name","colunmsType":"text"},
 			           {"colunmsDisplayName":"Grade","width":"auto","id":"grade","colunmsType":"text"},
 			           {"colunmsDisplayName":"Begin Score","width":"auto","id":"begin_score","colunmsType":"text","colunmsDataType":"decimal"},
 			           {"colunmsDisplayName":"End Score","width":"auto","id":"end_score","colunmsType":"text","colunmsDataType":"decimal"},
 			           {"colunmsDisplayName":"Salary Raise","width":"auto","id":"salary_raise_amount","colunmsType":"text","colunmsDataType":"decimal"},
 			           {"colunmsDisplayName":"IsActive","width":"auto","id":"is_active","colunmsType":"checkbox"},
 			          ],

 			          "form":[{
 	     					"label":"Appraisal Form","inputType":"dropdown","required":true,
 	     					"id":"appraisal_form_id","width":"200px","url":""+restfulURL+"/"+serviceName+"/public/appraisal_grade/form_list"
 	     					},
 	     					{
	     					"label":"Appraisal Level","inputType":"dropdown","required":true,
	     					"id":"appraisal_level_id","width":"200px","url":""+restfulURL+"/"+serviceName+"/public/appraisal_grade/al_list"
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
		    					"label": "Related Structures",
		    					"inputType": "dropdown",
		    					"id": "structure_id",
		    					"width": "200px",
		    					"url": ""+restfulURL+"/"+serviceName+"/public/appraisal_grade/struc_list"
		    				},
		    				{
		    					"label":"IsJudgement","inputType":"checkbox",
		     					"id":"is_judgement","width":"200px"
		    				},
	     			        {
	     					"label":"IsAtive","inputType":"checkbox","default":"checked",
	     					"id":"is_active","width":"200px"
	     					}
	     					
	     			     ],
	     			     
	     			    "advanceSearch":[
	     			    	{
		     			    	"label":"Level","label_tooltip":"Form","inputType":"dropdown",
		     					"id":"appraisal_form_id","width":"100%",
		     					"url":""+restfulURL+"/"+serviceName+"/public/appraisal_grade/form_list",
		     					"initValue":"All"
	    			     	},
	     			    	{
		     			    	"label":"Level","label_tooltip":"Level","inputType":"multiple",
		     					"id":"appraisal_level_id","width":"100%",
		     					"url":""+restfulURL+"/"+serviceName+"/public/appraisal_grade/al_list",
	    			     	}
	     			    ],
	     			     
	    			 "formDetail":{"formSize":"modal-dialog","formName":"Appraisal Grade","id":"databaseConnection","pk_id":"grade_id"},       
	    			 "serviceName":[restfulURL+"/"+serviceName+"/public/appraisal_grade"],
	    			 "tokenID":tokenID,
	    			 "pagignation":true,
	    			 "expressSearch":false,
	    			 "advanceSearchSet":true
	    	}
	    	//console.log(options['tokenID'].token);
	    	createDataTableFn(options);
	    	SetSalaryRaise();
	 	}
	 }
	
	 //binding tooltip start
	 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
	 $('[data-toggle="tooltip"]').tooltip({
		 html:true
	 });
	//binding tooltip end
});