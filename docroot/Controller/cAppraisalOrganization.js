 $(document).ready(function(){
   
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==true){
	 
	 		
    	var options={
    			"colunms":[
    			           {"colunmsDisplayName":"Organization Code","width":"15%","id":"org_code","colunmsType":"text"},
    			           {"colunmsDisplayName":"Organization","width":"25%","id":"org_name","colunmsType":"text"},
    			           {"colunmsDisplayName":"Abbreviation","width":"10%","id":"org_abbr","colunmsType":"text"},
    			           {"colunmsDisplayName":"Appraisal Level","width":"15%","id":"appraisal_level_name","colunmsType":"text"},
    			           {"colunmsDisplayName":"Parent Org.","width":"25%","id":"parent_org_name","colunmsType":"text"},
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
            				"label":"Abbreviation","inputType":"text","placeholder":"Abbreviation",
            				"id":"org_abbr","width":"250px"
            			},
//    			        {
//    					"label":"Parent Org.","inputType":"dropdown","initValue":"","updateList":true,
//    					"id":"parent_org_code","width":"250px","url":""+restfulURL+"/see_api/public/org/parent_list",
//    					},
    					{
        				"label":"Appraisal Level","inputType":"dropdown","initValue":"","updateList":true,
        				"id":"level_id","width":"250px","url":""+restfulURL+"/see_api/public/org/al_list"
        				},
        				{
        	    			"label":"Parent Org.","initValue":"","inputType":"cascades",
        	    			"id":"parent_org_code","width":"350px",
        	    			"cascades":{
        	    							"id"		:	"level_id",
        	    							"listData"	:	"parent_org"
        	    						}
        	    		},
    					{
	 	    			"label":"IsActive","inputType":"checkbox","default":"checked",
	 	    			"id":"is_active","width":"200px"
	 	    			}
    					
    			     ],
    			 "advanceSearch":[{
 	 					"label":"Appraisal Level","label_tooltip":"Appraisal Level","inputType":"dropdown",
 	 					"id":"level_id","width":"100%","initValue":"All Appraisal Level",
 	 					"url":""+restfulURL+"/see_api/public/org/al_list"
 	 					},
 	 					{
 	 	 				"label":"Organization","label_tooltip":"Organization","inputType":"cascades","initValue":"All Organization",
 	 	 				"id":"org_code","width":"100%",
 	 	 				"cascades":{
							"id"		:	"level_id",
							"listData"	:	"org"
 	 	 					}
 	 	 				}],
    			 "formDetail":{"formSize":"modal-dialog","formName":"Organization","id":"organization","pk_id":"org_id"},       
    			 "serviceName":[restfulURL+"/see_api/public/org"],
    			 "tokenID":tokenID,
    			 "pagignation":false,
    			 "expressSearch":false,
    			 "advanceSearchSet":true,
    			 "btnAddOption":false,
    			 "btnAdvanceDownloadOption":{"url":""+$("#url_portlet").val()+"/file/appraisal_organization_template.xlsx"},
    			 "btnAdvanceImportOption":{"formName":"Import Organization","accept":".xls ,.xlsx"}
    			 //"btnManageOption":{"id":"BtnID","name":"BtnName"},
    			 //"btnAdvanceSearchOption":{"id":"BtnID","name":"<i class=\"fa fa-plus-square\"></i>&nbsp;Btn"}
    	}
    	
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
 
