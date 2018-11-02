var options=[];

var GenerateOptionIntoFormType = function(selectedId)
{
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


var GenerateOptionIntoIsDeriveLevel = function(selectedId)
{
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


var ClearAppraisalStructureFn = function()
{
	$("#seq_no").val("");
	$("#structure_name").val("");
	$("#nof_target_score").val("0");
}


var InsertAppraisalStructureFn = function(Status)
{
	var seq_no = $("#seq_no").val();
	var structure_name = $("#structure_name").val();
	var nof_target_score = $("#nof_target_score").val();
	var form_id = $("#form_id").val();
	var is_unlimited_reward = "0";
	var is_unlimited_deduction = Number($('#is_unlimited_deduction').prop('checked'));
	var is_value_get_zero = Number($('#is_value_get_zero').prop('checked'));
	var is_active = Number($('#is_active').prop('checked'));
	var is_no_raise_value = Number($('#is_no_raise_value').prop('checked'));
	var level_id = $("#level_id").val();
	var is_derive = Number($('#is_derive').prop('checked'));

	$.ajax({
        url: restfulURL+"/"+serviceName+"/public/appraisal_structure",
        type: "post",
        dataType: "json",
        data: {
        	"seq_no":seq_no,
        	"structure_name":structure_name,
        	"nof_target_score":nof_target_score,
        	"form_id":form_id,
        	"is_unlimited_reward":is_unlimited_reward,
        	"is_unlimited_deduction":is_unlimited_deduction,
        	"is_value_get_zero":is_value_get_zero,
        	"is_active":is_active,
        	"is_no_raise_value":is_no_raise_value,
        	"level_id":level_id,
        	"is_derive":is_derive
        },
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) { 
        	if(data['status']=='200'){
        		  		
        		if(Status == 'Save'){
        			callFlashSlide("Insert successed.");
        			ClearAppraisalStructureFn();
        			$("#saveStructureModal").modal('hide');
        			//CreateDataStructureTableFn(options);
        			createDataTableFn(options);
        			$("#table-appraisalStructure thead th").css("vertical-align", "middle");
        	    	$("#modal-appraisalStructure").empty();
        		}else if(Status == 'SaveAnother'){
        			callFlashSlideInModal("Insert success.","#information","");
        			ClearAppraisalStructureFn();
        			createDataTableFn(options);
        			$("#table-appraisalStructure thead th").css("vertical-align", "middle");
        	    	$("#modal-appraisalStructure").empty();
        		}
        	
        	}else if(data['status']=='400'){
        		callFlashSlideInModal(validationFn(data),"#information","error");
			}
        }
	});
}


var ToggledFlagOnSaveStructureModal = function(formIdValue)
{
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


var getAllStructureFn = function()
{
	$.ajax({
        url: restfulURL+"/"+serviceName+"/public/appraisal_structure",
        type: "get",
        dataType: "json",
        data: {},
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
        	var htmlBody = "";
        	$.each(data,function(index,indexEntry) {
        		htmlBody += "<tr>";
        		htmlBody += "	<td>"+(index+1)+"</td>";
        		htmlBody += "	<td>"+indexEntry.structure_name+"</td>";
        		htmlBody += "	<td>"+indexEntry.nof_target_score+"</td>";
        		htmlBody += "	<td>"+indexEntry.form_name+"</td>";
        		htmlBody += "	<td>"+indexEntry.level_name+"</td>";
        		htmlBody += "	<td> <input type='checkbox' disabled='disabled' "+((indexEntry.is_unlimited_reward==1)?"checked":"")+"> </td>";
        		htmlBody += "	<td> <input type='checkbox' disabled='disabled' "+((indexEntry.is_unlimited_deduction==1)?"checked":"")+"> </td>";
        		htmlBody += "	<td> <input type='checkbox' disabled='disabled' "+((indexEntry.is_value_get_zero==1)?"checked":"")+"> </td>";
        		htmlBody += "	<td> <input type='checkbox' disabled='disabled' "+((indexEntry.is_derive==1)?"checked":"")+"> </td>";
        		htmlBody += "	<td> <input type='checkbox' disabled='disabled' "+((indexEntry.is_active==1)?"checked":"")+"> </td>";
        		htmlBody += "	<td> <i data-trigger='focus' tabindex='"+index+"' data-content=\"" +
        				"<button class='btn btn-warning btn-small btn-gear edit' id='edit-"+indexEntry.structure_id+"'>Edit</button>&nbsp;" +
        				"<button id='del-"+indexEntry.structure_id+"' class='btn btn-danger btn-small btn-gear del'>Delete</button>\" " +
        				"data-placement='top' data-toggle='popover' data-html='true' class='fa fa-cog font-gear popover-edit-del' data-original-title='' title=''></i> </td>";
        		htmlBody += "</tr>";
        	});
        	
        	$("#listData").html(htmlBody);
        	$(".popover-edit-del").popover();
        }
	});
}



$(document).ready(function(){
    	
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==true){
			 getAllStructureFn();
		 }
	 }
});