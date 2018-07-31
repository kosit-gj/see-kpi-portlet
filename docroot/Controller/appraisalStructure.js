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
	    			           {"colunmsDisplayName":"Structure Name","width":"20%","id":"structure_name","colunmsType":"text"},
	    			           {"colunmsDisplayName":"#Target Score", "width":"12%","id":"nof_target_score","colunmsType":"text","colunmsDataType":"int"},
	    			           {"colunmsDisplayName":"Form Type",     "width":"13%","id":"form_name","colunmsType":"text"},
	
	//    			           {"colunmsDisplayName":"Form Type","width":"65%","id":"form_id","colunmsType":"radio"},
	    			           {"colunmsDisplayName":"Unlimited Reward","width":"15%","id":"is_unlimited_reward","colunmsType":"checkbox"},
	    			           {"colunmsDisplayName":"Unlimited Deduction","width":"15%","id":"is_unlimited_deduction","colunmsType":"checkbox"},
	    			           {"colunmsDisplayName":"Value Get Zero","width":"15%","id":"is_value_get_zero","colunmsType":"checkbox"},
	    			           {"colunmsDisplayName":"IsActive",      "width":"10%","id":"is_active","colunmsType":"checkbox"},
	
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
	    			"formIf":[	{
		        				"style":"display:none;","class_header":"\"is_unlimited_reward_header\"",
								"label":"Unlimited Reward","inputType":"checkbox","default":"unchecked",
		        				"id":"is_unlimited_reward","width":"250px"
		        				},
	    						{
	            				"style":"display:none;","class_header":"\"is_unlimited_deduction_header\"",
	    						"label":"Unlimited Deduction","inputType":"checkbox","default":"unchecked",
	            				"id":"is_unlimited_deduction","width":"250px"
	            				},
	            				{
		            			"style":"display:none;","class_header":"\"is_value_get_zero_header\"",
		    					"label":"Value Get Zero","inputType":"checkbox","default":"unchecked",
		            			"id":"is_value_get_zero","width":"250px"
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
	    	//console.log(options)
	    	createDataTableFn(options);
	    	
	    	$("#form_id").change(function() {

				if($("#form_id").val()==3) { //if Deduct Score
					
					$(".is_unlimited_reward_header").hide();
					$(".checkbox-is_unlimited_reward").prop('checked',false);
					
					$(".is_unlimited_deduction_header,.is_value_get_zero_header").show();
					$(".checkbox-is_unlimited_deduction,.checkbox-is_value_get_zero").prop('checked',true);
					
				} else if($("#form_id").val()==4) { //if Reward Score
					
					$(".is_unlimited_deduction_header,.is_value_get_zero_header").hide();
					$(".checkbox-is_unlimited_deduction,.checkbox-is_value_get_zero").prop('checked',false);
					
					$(".is_unlimited_reward_header").show();
					$(".checkbox-is_unlimited_reward").prop('checked',true);
					
				} else {
					
					$(".is_unlimited_deduction_header,.is_value_get_zero_header,.is_unlimited_reward_header").hide();
					$(".checkbox-is_unlimited_deduction,.checkbox-is_value_get_zero,.checkbox-is_unlimited_reward").prop('checked',false);
					
				}
				
	    	}); 
	 	}
	 }
	 
});