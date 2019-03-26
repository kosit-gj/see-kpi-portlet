var galbalDataTemp = []; 
$(document).ready(function(){
   
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==true){
	 
	 		
    	var options={
    			"colunms":[
    						{"colunmsDisplayName":"Job Function Name","width":"60%","id":"job_function_name","colunmsType":"text"},
    			           {"colunmsDisplayName":"Is Evaluated","width":"auto","id":"is_evaluated","colunmsType":"checkbox"},
    			           {"colunmsDisplayName":"Is Show Report","width":"auto","id":"is_show_report","colunmsType":"checkbox"},
    			          ],
    			"form":[{
						"label":"Job Function Name","inputType":"text","placeholder":"Job Function Name",
						"id":"job_function_name","width":"250px","required":true
						},
    					{
	 	    			"label":"Is Evaluated","inputType":"checkbox","default":"",
	 	    			"id":"is_evaluated","width":"200px"
	 	    			},
    					{
		 	    			"label":"Is Show Report","inputType":"checkbox","default":"",
		 	    			"id":"is_show_report","width":"200px"
		 	    			}
    					
    			     ], 	
    			 "advanceSearch":[{
    				 	"label":"Job Function","label_tooltip":"Job Function","inputType":"dropdown",
    					"id":"job_function_id","width":"100%","initValue":"All Job Function",
    					"url":""+restfulURL+"/"+serviceName+"/public/job_function/list"
     				    }
     				    ],
    			 "formDetail":{"formSize":"modal-dialog","formName":"Fob Function","id":"job_function","pk_id":"job_function_id"},       
    			 "serviceName":[restfulURL+"/"+serviceName+"/public/job_function"],
    			 "tokenID":tokenID,
    			 "pagignation":false,
    			 "expressSearch":false,
    			 "advanceSearchSet":false,
    			 "btnAddOption":true,
    			 //"btnAdvanceDownloadOption":{"url":""+$("#url_portlet").val()+"/file/appraisal_position_template.xlsx"},
    			 //"btnAdvanceImportOption":{"formName":"Import Position","accept":".xls ,.xlsx"}
    			 //"btnManageOption":{"id":"BtnID","name":"BtnName"},
    			 //"btnAdvanceSearchOption":{"id":"BtnID","name":"<i class=\"fa fa-plus-square\"></i>&nbsp;Btn"}
    	}
    	
    	createDataTableFn(options);
    	
		}
	 	
       
	 }
    });
 
