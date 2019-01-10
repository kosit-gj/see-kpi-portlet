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
		            				"label":"Is Self Assign","inputType":"checkbox","default":"",
		            				"id":"is_self_assign","width":"250px"
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
		            			},
		            			{
		            				"style":"display:none;","class_header":"\"is_no_raise_value_header\"",
			    					"label":"No Raise Value","inputType":"checkbox","default":"unchecked",
			            			"id":"is_no_raise_value","width":"250px"
		            			}
	    			     	 ],
	    			 "formDetail":{"formSize":"modal-dialog","formName":"Appraisal Structure","id":"appraisalStructure","pk_id":"structure_id"},       
	    			 "serviceName":[restfulURL+"/"+serviceName+"/public/appraisal_structure"],
	    			 "tokenID":tokenID,
	    			 "pagignation":false,
	    			 "expressSearch":false,
	    			 "advanceSearchSet":false,
	    	}
	 
	    	createDataTableFn(options);
	    	
	    	var curFromId = $("#form_id").val();
	    	
	    	$("#form_id").change(function() {
	    		if($("#form_id").val()==3) { //if Deduct Score					
					$(".is_unlimited_reward_header").hide();
					$(".checkbox-is_unlimited_reward").prop('checked',false);
					$(".is_unlimited_deduction_header, .is_value_get_zero_header, .is_no_raise_value_header").show();
					$(".checkbox-is_unlimited_deduction, .checkbox-is_value_get_zero").prop('checked',true);
					$(".checkbox-is_no_raise_value").prop('checked', false);
					$("#nof_target_score").prop("readonly", true);
					$("#nof_target_score").val(0);
					
				} else if($("#form_id").val()==4) { //if Reward Score					
					$(".is_unlimited_deduction_header, .is_value_get_zero_header, .is_no_raise_value_header").hide();
					$(".checkbox-is_unlimited_deduction, .checkbox-is_value_get_zero, .checkbox-is_no_raise_value").prop('checked',false);
					$(".is_unlimited_reward_header").show();
					$(".checkbox-is_unlimited_reward").prop('checked',true);
					$("#nof_target_score").prop("readonly", true);
					$("#nof_target_score").val(0);
						
				} else {					
					$(".is_unlimited_deduction_header, .is_value_get_zero_header, .is_unlimited_reward_header, .is_no_raise_value_header").hide();
					$(".checkbox-is_unlimited_deduction, .checkbox-is_value_get_zero, .checkbox-is_unlimited_reward, .checkbox-is_no_raise_value").prop('checked',false);
					$("#nof_target_score").prop("readonly", false);
				}
	    	});
	 	}
	 }
});