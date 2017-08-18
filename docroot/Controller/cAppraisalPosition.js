 $(document).ready(function(){
   
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
	 	if(connectionServiceFn(username,password)==true){
	 
	 		
    	var options={
    			"colunms":[
    						{"colunmsDisplayName":"Position Code","width":"15%","id":"position_code","colunmsType":"text"},
    			           {"colunmsDisplayName":"Position Name","width":"60%","id":"position_name","colunmsType":"text"},
    			           {"colunmsDisplayName":"Is Active","width":"auto","id":"is_active","colunmsType":"checkbox"},
    			          ],
    			"form":[{
						"label":"Position Code","inputType":"text","placeholder":"Position Code",
						"id":"position_code","width":"250px","required":true
						},{
    					"label":"Position Name","inputType":"text","placeholder":"Position Name",
    					"id":"position_name","width":"350px","required":true
    					},
    					{
	 	    			"label":"IsActive","inputType":"checkbox","default":"checked",
	 	    			"id":"is_active","width":"200px"
	 	    			}
    					
    			     ], 					
    			 "formDetail":{"formSize":"modal-dialog","formName":"Position","id":"position","pk_id":"position_id"},       
    			 "serviceName":[restfulURL+"/see_api/public/position"],
    			 "tokenID":tokenID,
    			 "pagignation":false,
    			 "expressSearch":false,
    			 "advanceSearchSet":false,
    			 "btnAddOption":false,
    			 "btnAdvanceDownloadOption":{"url":""+$("#url_portlet").val()+"/file/appraisal_position_template.xlsx"},
    			 "btnAdvanceImportOption":{"formName":"Import Position","accept":".xls ,.xlsx"}
    			 //"btnManageOption":{"id":"BtnID","name":"BtnName"},
    			 //"btnAdvanceSearchOption":{"id":"BtnID","name":"<i class=\"fa fa-plus-square\"></i>&nbsp;Btn"}
    	}
    	
    	createDataTableFn(options);
    	
		}
	 }
    });
 
