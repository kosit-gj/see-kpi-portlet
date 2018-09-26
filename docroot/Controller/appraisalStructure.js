 $(document).ready(function(){
    	
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==true){

	    	var options={
	    			"colunms":[
	    			           {"colunmsDisplayName": "Seq", "width":"auto", "id":"seq_no", "colunmsType":"text"},
	    			           {"colunmsDisplayName":"Structure Name", "width":"auto", "id":"structure_name", "colunmsType":"text"},
	    			           {"colunmsDisplayName":"#Target Score", "width":"auto", "id":"nof_target_score", "colunmsType":"text", "colunmsDataType":"int"},
	    			           {"colunmsDisplayName":"Type", "width":"auto", "id":"form_name", "colunmsType":"text"},
	    			           {"colunmsDisplayName":"Level", "width":"auto", "id":"level_name", "colunmsType":"text"},
	    			           {"colunmsDisplayName":"Unlimited Reward", "width":"10%", "id":"is_unlimited_reward", "colunmsType":"checkbox"},
	    			           {"colunmsDisplayName":"Unlimited Deduction", "width":"10%", "id":"is_unlimited_deduction", "colunmsType":"checkbox"},
	    			           {"colunmsDisplayName":"Value Get Zero", "width":"10%", "id":"is_value_get_zero", "colunmsType":"checkbox"},
	    			           {"colunmsDisplayName":"IsDerive", "width":"5%", "id":"is_derive", "colunmsType":"checkbox"},
	    			           {"colunmsDisplayName":"IsActive", "width":"5%","id":"is_active","colunmsType":"checkbox"},
	
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
		            				"label":"Level","inputType":"dropdown","default":"All",
		            				"id":"level_id","width":"250px", "url":""+restfulURL+"/"+serviceName+"/public/appraisal_structure/level_list"
		            			},
		    					{
		            				"label":"IsDerive","inputType":"checkbox","default":"checked",
		            				"id":"is_derive","width":"250px"
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
	    	$("#table-appraisalStructure thead th").css("vertical-align", "middle");
	    	$("#level_id").prepend("<option value=''></option>");
	    	$("#level_id option:eq(1)").attr('selected','selected');
	    	
	    	    	
	    	$("#form_id").change(function() {
	    		if(this.value==1){
	    			// Disabled Deduct and Reward //
					$(".is_unlimited_deduction_header, .is_value_get_zero_header, .is_unlimited_reward_header, .is_no_raise_value_header").hide();
					$(".checkbox-is_unlimited_deduction, .checkbox-is_value_get_zero, .checkbox-is_unlimited_reward, .checkbox-is_no_raise_value").prop('checked',false);
					
					// Enabled Derive and Level (form type 1 only) //
					$('#level_id').val($("#level_id option:eq(1)").val());
					$('.checkbox-is_derive').prop('checked', true);
					$('#form-group-level_id').show();
					$('#form-group-is_derive').show();
					
				} else if(this.value==2){
					// Disabled Deduct and Reward //
					$(".is_unlimited_deduction_header, .is_value_get_zero_header, .is_unlimited_reward_header, .is_no_raise_value_header").hide();
					$(".checkbox-is_unlimited_deduction, .checkbox-is_value_get_zero, .checkbox-is_unlimited_reward, .checkbox-is_no_raise_value").prop('checked',false);
					
					// Disabled Derive and Level //
					$('#level_id').val('');
					$('.checkbox-is_derive').prop('checked', false);
					$("#form-group-level_id").hide();
					$("#form-group-is_derive").hide();
					
				} else if(this.value==3) { //if Deduct Score
					// Disabled Reward //
					$(".is_unlimited_reward_header").hide();
					$(".checkbox-is_unlimited_reward").prop('checked',false);
					
					// Enabled Deduct //
					$(".is_unlimited_deduction_header, .is_value_get_zero_header, .is_no_raise_value_header").show();
					$(".checkbox-is_unlimited_deduction, .checkbox-is_value_get_zero").prop('checked',true);
					$(".checkbox-is_no_raise_value").prop('checked', false);
					
					// Disabled Derive and Level //
					$('#level_id').val('');
					$('.checkbox-is_derive').prop('checked', false);
					$("#form-group-level_id").hide();
					$("#form-group-is_derive").hide();
					
				} else if(this.value==4) { //if Reward Score
					// Disabled Deduct //
					$(".is_unlimited_deduction_header, .is_value_get_zero_header, .is_no_raise_value_header").hide();
					$(".checkbox-is_unlimited_deduction, .checkbox-is_value_get_zero, .checkbox-is_no_raise_value").prop('checked',false);
					
					// Enabled Reward //
					$(".is_unlimited_reward_header").show();
					$(".checkbox-is_unlimited_reward").prop('checked',true);
					
					// Disable Derive and Level //
					$('#level_id').val('');
					$('.checkbox-is_derive').prop('checked', false);
					$("#form-group-level_id").hide();
					$("#form-group-is_derive").hide();
				} 
	    	});
	    	$("#form_id").change();
	 	}
	 }
});