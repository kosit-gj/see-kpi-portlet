 $(document).ready(function(){
   
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
	 	if(connectionServiceFn(username,password)==true){
	 
	 		
    	var options={
    			"colunms":[
    			           {"colunmsDisplayName":"Organization Code","width":"20%","id":"org_code","colunmsType":"text"},
    			           {"colunmsDisplayName":"Organization","width":"30%","id":"org_name","colunmsType":"text"},
    			           {"colunmsDisplayName":"Parent Org.","width":"30%","id":"parent_org_name","colunmsType":"text"},
    			           {"colunmsDisplayName":"Is Active","width":"10%","id":"is_active","colunmsType":"checkbox"},
    			          ],
    			"form":[{
    					"label":"Organization Code","inputType":"text","placeholder":"Organization Code",
    					"id":"org_code","width":"250px","required":true
    					},
    					{
        				"label":"Organization Name","inputType":"text","placeholder":"Organization Name",
        				"id":"org_name","width":"350px","required":true
        				},
    			        {
    					"label":"Parent Org.","inputType":"dropdown","initValue":"","updateList":true,
    					"id":"parent_org_code","width":"250px","url":""+restfulURL+"/see_api/public/org/parent_list",
    					},
    					{
	 	    			"label":"IsActive","inputType":"checkbox","default":"checked",
	 	    			"id":"is_active","width":"200px"
	 	    			}
    					
    			     ], 					
    			 "formDetail":{"formSize":"modal-dialog","formName":"Organization","id":"organization","pk_id":"org_code"},       
    			 "serviceName":[restfulURL+"/see_api/public/org"],
    			 "tokenID":tokenID,
    			 "pagignation":false,
    			 "expressSearch":false,
    			 "advanceSearchSet":false,
    			 "btnAddOption":false,
    			 "btnAdvanceDownloadOption":{"url":""+$("#url_portlet").val()+"/file/appraisal_organization_template.xlsx"},
    			 "btnAdvanceImportOption":{"formName":"Import Organization","accept":".xls ,.xlsx"}
    			 //"btnManageOption":{"id":"BtnID","name":"BtnName"},
    			 //"btnAdvanceSearchOption":{"id":"BtnID","name":"<i class=\"fa fa-plus-square\"></i>&nbsp;Btn"}
    	}
    	
    	createDataTableFn(options);
    	
		}
	 }
    });
 
