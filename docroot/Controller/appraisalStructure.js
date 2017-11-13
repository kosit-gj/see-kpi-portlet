 $(document).ready(function(){
    	
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==true){
    	
    	//alert(createTableFn());
    	var options={
    			"colunms":[
    			           {"colunmsDisplayName":"Seq",           "width":"5% ","id":"seq_no","colunmsType":"text"},
    			           {"colunmsDisplayName":"Structure Name","width":"40%","id":"structure_name","colunmsType":"text"},
    			           {"colunmsDisplayName":"#Target Score", "width":"15%","id":"nof_target_score","colunmsType":"text","colunmsDataType":"int"},
    			           {"colunmsDisplayName":"Form Type",     "width":"15%","id":"form_name","colunmsType":"text"},

//    			           {"colunmsDisplayName":"Form Type","width":"65%","id":"form_id","colunmsType":"radio"},
    			           
    			           
    			           {"colunmsDisplayName":"IsActive",      "width":"15%","id":"is_active","colunmsType":"checkbox"},

    			          ],
    			"form":[   {
					       "label":"Seq","inputType":"text","placeholder":"Seq",
					       "id":"seq_no","width":"250px","dataTypeInput":"number","required":true,
					       },
					       {
    					   "label":"Structure Name","inputType":"text","placeholder":"Structure Name",
    					   "id":"structure_name","width":"250px","required":true,
    					   },
    					   {
    	    					"label":"#Target Score","inputType":"text","placeholder":"Target Score","default":"0",
    	    					"id":"nof_target_score","width":"250px","dataTypeInput":"number","required":true,
    					   },
    					   {
	    					"label":"Form Type","inputType":"dropdown","default":"All",
	    					"id":"form_id","width":"250px","url":""+restfulURL+"/"+serviceName+"/public/appraisal_structure/form_list"
	    					},                             
	    					{
        					"label":"IsActive","inputType":"checkbox","default":"checked",
        					"id":"is_active","width":"250px"
        					}
    					
    			     ],
    			 "formDetail":{"formSize":"modal-dialog","formName":"Appraisal Structure","id":"appraisalStructure","pk_id":"structure_id"},       
    			 "serviceName":[restfulURL+"/"+serviceName+"/public/appraisal_structure"],
    			 "tokenID":tokenID,
    			 "pagignation":false,
    			 "expressSearch":false,
    			 "advanceSearchSet":false,
    	}
    	//console.log(options['tokenID'].token);
    	createDataTableFn(options);
    	
    	
	 	}
	 }
    });