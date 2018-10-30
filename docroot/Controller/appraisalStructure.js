var GenerateOptionIntoFormType = function(selectedId){
	$.ajax({
        url: restfulURL+"/"+serviceName+"/public/appraisal_structure/form_list",
        type: "get",
        dataType: "json",
        data: {},
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) { console.log(data);
        	var htmlOption = "";
            $.each(data, function (index, indexEntry) {
            	if(selectedId == indexEntry.form_id){
            		htmlOption += "<option value=" + indexEntry.form_id + " selected='selected'>" + indexEntry.form_name + "</option>";
            	} else {
            		htmlOption += "<option value=" + indexEntry.form_id + " >" + indexEntry.form_name + "</option>";
            	}
            });
            console.log(htmlOption);
            $("#form_id").html(htmlOption);
        }
	});
} 


var GenerateOptionIntoIsDeriveLevel = function(selectedId){
	$.ajax({
        url: restfulURL+"/"+serviceName+"/public/appraisal_structure/level_list",
        type: "get",
        dataType: "json",
        data: {},
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
        	var levelId = $("#level_id");
        	levelId.empty();
            $.each(data, function (index, indexEntry) {
            	if(selectedId == indexEntry.level_id){
            		levelId.append(new Option(indexEntry.appraisal_level_name, indexEntry.level_id, selected, selected));
            	} else {
            		levelId.append(new Option(indexEntry.appraisal_level_name, indexEntry.level_id));
            	}
            });
        }
	});
}


var ToggledFlagOnSaveStructureModal = function(formIdValue){
	if(formIdValue == 1){
		// Disabled Deduct and Reward //
		$("#is_unlimited_deduction_header, #is_value_get_zero_header, #is_unlimited_reward_header, #is_no_raise_value_header").hide();
		$("#is_unlimited_deduction, #is_value_get_zero, #is_unlimited_reward, #is_no_raise_value").prop('checked',false);
		
		// Enabled Derive and Level (form type 1 only) //
		$('#level_id').val($("#level_id option:eq(0)").val());
		$('#is_derive').prop('checked', true);
		$('#form-group-level_id').show();
		$('#form-group-is_derive').show();
		
	} else if(formIdValue == 2){
		// Disabled Deduct and Reward //
		$("#is_unlimited_deduction_header, #is_value_get_zero_header, #is_unlimited_reward_header, #is_no_raise_value_header").hide();
		$("#is_unlimited_deduction, #is_value_get_zero, #is_unlimited_reward, #is_no_raise_value").prop('checked',false);
		
		// Disabled Derive and Level //
		$('#level_id').val('');
		$('#is_derive').prop('checked', false);
		$("#form-group-level_id").hide();
		$("#form-group-is_derive").hide();
		
	} else if(formIdValue == 3) { //if Deduct Score
		// Disabled Reward //
		$("#is_unlimited_reward_header").hide();
		$("#is_unlimited_reward").prop('checked',false);
		
		// Enabled Deduct //
		$("#is_unlimited_deduction_header, #is_value_get_zero_header, #is_no_raise_value_header").show();
		$("#is_unlimited_deduction, #is_value_get_zero").prop('checked',true);
		$("#is_no_raise_value").prop('checked', false);
		
		// Disabled Derive and Level //
		$('#level_id').val('');
		$('#is_derive').prop('checked', false);
		$("#form-group-level_id").hide();
		$("#form-group-is_derive").hide();
		
	} else if(formIdValue == 4) { //if Reward Score
		// Disabled Deduct //
		$("#is_unlimited_deduction_header, #is_value_get_zero_header, #is_no_raise_value_header").hide();
		$("#is_unlimited_deduction, #is_value_get_zero, #is_no_raise_value").prop('checked',false);
		
		// Enabled Reward //
		$("#is_unlimited_reward_header").show();
		$("#is_unlimited_reward").prop('checked',true);
		
		// Disable Derive and Level //
		$('#level_id').val('');
		$('#is_derive').prop('checked', false);
		$("#form-group-level_id").hide();
		$("#form-group-is_derive").hide();
	}
}

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
	    	$("#modal-appraisalStructure").empty();
	    	
	    	
	    	// using new modal
	    	$("#btnAdd").attr("data-target", "#saveStructureModal");
	    	
	    	// $("#btnAdd").off("click");
	    	$("#btnAdd").unbind( "click" );
	        $("#btnAdd").on("click", function () {
	        	
	        	// generate option into select tag
	        	GenerateOptionIntoFormType(0);
	        	GenerateOptionIntoIsDeriveLevel(0);
	        	
	        	$("#form_id").change(function() {
	        		ToggledFlagOnSaveStructureModal(this.value);
		    	});
		    	$("#form_id").change();
		    	
		    	// is_derive change
		    	$('#is_derive').change(function() {
		    		if(this.checked) {
		    			$('#level_id').val($("#level_id option:eq(0)").val());
		    			$('#form-group-level_id').show();
		    		} else {
		    			$('#level_id').val("0");
		    			$('#form-group-level_id').hide();
		    		}
		    		$('#textbox1').val(this.checked);
		    	});
		    	
		    	
		    	// submit 
		    	
		    	
		    	
	        })

	 	}
	 }
});