var options=[];
var galbalDataTemp = [];
galbalDataTemp.seq_no = 0;

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
	$("#seq_no , #structure_name").val("");
	$("#structure_name").val("");
	$("#nof_target_score").val("0");
	

	$("#form_id , #level_id").find('option:eq(0)').prop('selected', true);
	ToggledFlagOnSaveStructureModal($("#form_id").val());
	
	$("#saveStructureModal input[type='checkbox']").prop('checked', true);
	
	//Is Derive
	$('#is_derive').prop('checked', false);
	$('#form-group-level_id').hide();
	
	$("#saveStructureModal #is_no_raise_value").prop('checked', false);
	
	$("#btnSetweightSubmitAnother").show();
	$(".btnModalClose").click();
	$("#id").val("");
	$("#action").val("add");
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
	
	var level_id = Number($("#form_id").val() == 1 ? ($("#is_derive").is(":checked") ? $("#level_id").val() : "0") : "0");
	var is_derive = Number($('#is_derive').prop('checked'));
	
	if(form_id == 1 ){
		is_unlimited_deduction = 0;
		is_value_get_zero = 0;
		is_no_raise_value=0;
	}else if(form_id == 2 ){
		is_derive=0;
		is_unlimited_deduction = 0;
		is_value_get_zero = 0;
		is_no_raise_value=0;
	}else if(form_id == 3 ){
		is_derive=0;
	}

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
        			
        			$("#table-appraisalStructure thead th").css("vertical-align", "middle");
        			getAllStructureFn();
        		}else if(Status == 'SaveAnother'){
        			callFlashSlideInModal("Insert success.","#information","");
        			$("#table-appraisalStructure thead th").css("vertical-align", "middle");
        			getAllStructureFn();
        			ClearAppraisalStructureFn();
        			$("#seq_no").val(galbalDataTemp.seq_no);
        		}
        	
        	}else if(data['status']=='400'){
        		callFlashSlideInModal(validationFn(data),"#information","error");
			}
        }
	});
}

var UpdateAppraisalStructureFn = function()
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
	
	var level_id = Number($("#form_id").val() == 1 ? ($("#is_derive").is(":checked") ? $("#level_id").val() : "0") : "0");
	var is_derive = Number($('#is_derive').prop('checked'));

	$.ajax({
        url: restfulURL+"/"+serviceName+"/public/appraisal_structure/"+$("#id").val(),
        type: "PATCH",
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
        		  		
        		callFlashSlide("Update successed.");
        		$("#table-appraisalStructure thead th").css("vertical-align", "middle");
    			getAllStructureFn();
    			$("#saveStructureModal").modal('hide');
    			ClearAppraisalStructureFn();
    			$("#seq_no").val(galbalDataTemp.seq_no);
        		
        	
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
		$('#form-group-is_derive').show();
		$('#level_id').val($("#level_id option:eq(0)").val());
		
		$("#is_derive").off("click");
		$("#is_derive").on("click",function(){
			if($(this).is(":checked")){
				$("#form-group-level_id").show();
			}else{
				$("#form-group-level_id").hide();
				$("#level_id").find('option:eq(0)').prop('selected', true);
			}
		});
		
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

var findOneFn = function(id){
	$.ajax({
        url: restfulURL+"/"+serviceName+"/public/appraisal_structure/"+id,
        type: "get",
        dataType: "json",
        data: {},
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
        	console.log(data);
        	$("#id").val(data.structure_id);
        	$("#seq_no").val(data.seq_no);
        	$("#structure_name").val(data.structure_name);
        	$("#nof_target_score").val(data.nof_target_score);
        	$("#form_id").val(data.form_id);
        	ToggledFlagOnSaveStructureModal(data.form_id);
        	$("#is_derive").prop('checked', data.is_derive);
        	$("#level_id").val(data.level_id);
        	if(data.is_derive){
				$("#form-group-level_id").show();
			}else{
				$("#form-group-level_id").hide();
				$("#level_id").find('option:eq(0)').prop('selected', true);
			}
        	
        	$("#is_unlimited_reward").prop('checked', data.is_unlimited_reward);
        	$("#is_unlimited_deduction").prop('checked', data.is_unlimited_deduction);
        	$("#is_value_get_zero").prop('checked', data.is_value_get_zero);
        	$("#is_no_raise_value").prop('checked', data.is_no_raise_value);
        	$("#is_active").prop('checked', data.is_active);
        	
        	$("#saveStructureModal").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			});
        	
        }
	});
};
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
        		htmlBody += "	<td>"+indexEntry.seq_no+"</td>";
        		htmlBody += "	<td>"+indexEntry.structure_name+"</td>";
        		htmlBody += "	<td style='text-align: right;'>"+indexEntry.nof_target_score+"</td>";
        		htmlBody += "	<td>"+indexEntry.form_name+"</td>";
        		htmlBody += "	<td>"+notNullTextFn(indexEntry.level_name)+"</td>";
        		htmlBody += "	<td style='text-align: center;'> <input type='checkbox' disabled='disabled'  "+((indexEntry.is_unlimited_reward==1)?"checked":"")+"> </td>";
        		htmlBody += "	<td style='text-align: center;'> <input type='checkbox' disabled='disabled'  "+((indexEntry.is_unlimited_deduction==1)?"checked":"")+"> </td>";
        		htmlBody += "	<td style='text-align: center;'> <input type='checkbox' disabled='disabled'  "+((indexEntry.is_value_get_zero==1)?"checked":"")+"> </td>";
        		htmlBody += "	<td style='text-align: center;'> <input type='checkbox' disabled='disabled'  "+((indexEntry.is_derive==1)?"checked":"")+"> </td>";
        		htmlBody += "	<td style='text-align: center;'> <input type='checkbox' disabled='disabled'  "+((indexEntry.is_active==1)?"checked":"")+"> </td>";
        		htmlBody += "	<td style='text-align: center;'> <i data-trigger='focus' tabindex='"+index+"' data-content=\"" +
        				"<button class='btn btn-warning btn-small btn-gear edit' id='edit-"+indexEntry.structure_id+"'>Edit</button>&nbsp;" +
        				"<button id='del-"+indexEntry.structure_id+"' class='btn btn-danger btn-small btn-gear del'>Delete</button>\" " +
        				"data-placement='top' data-toggle='popover' data-html='true' class='fa fa-cog font-gear popover-edit-del' data-original-title='' title=''></i> </td>";
        		htmlBody += "</tr>";
        		galbalDataTemp.seq_no = indexEntry.seq_no + 1;
        	});
        	
        	$("#listData").html(htmlBody);
        	$(".popover-edit-del").popover(setPopoverDisplay);
        	$("#table-appraisalStructure").off("click",".popover-edit-del");
        	$("#table-appraisalStructure").on("click",".popover-edit-del",function(){
        		
        			
        			$(".edit").on("click",function() {
        			ClearAppraisalStructureFn();
        			var id = $(this).attr("id").split("-")[1];
        			$(this).parent().parent().parent().children().click();
        			
        			$("#btnSetweightSubmitAnother").hide();
        			
        			
        			findOneFn(id);
        			      			
        			$("#id").val(id);
        			$("#action").val("edit");

        			
        		});
        		
        		
        		$(".del").on("click",function(){
        			var id = $(this).attr("id").split("-")[1];
        			$(this).parent().parent().parent().children().click();
        			 
        			$("#confrimModal").modal({
        				"backdrop" : setModalPopup[0],
        				"keyboard" : setModalPopup[1]
        			});
        			$(document).off("click","#btnConfirmOK");
        			$(document).on("click","#btnConfirmOK",function(){
        			
        				$.ajax({
        					 url:restfulURL+"/"+serviceName+"/public/appraisal_structure/"+id,
        					 type : "delete",
        					 dataType:"json",
        					 headers:{Authorization:"Bearer "+tokenID.token},
        					success:function(data){    
        				    	 
        					     if(data['status']==200){
        					    	 
        					       callFlashSlide("Delete Successfully.");
        					       $("#confrimModal").modal('hide');
        					       getAllStructureFn();
        					     }else if (data['status'] == "400"){
        					    	 callFlashSlideInModal(data['data'],"#inform_on_confirm","error");
        					    	}
        					 }
        				});
        				
        			});
        			
        		});	
        		
        	});
        	
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
			 $(".structure_list_content").show();
			 
			 $("#saveStructureModal").hide();
			 GenerateOptionIntoFormType();
			 GenerateOptionIntoIsDeriveLevel();
			 
			 $("#form_id").change(function(){
					ToggledFlagOnSaveStructureModal($("#form_id").val());
				});
			 
			 $("#btnAdd , .btnCancle , .setWeightCloseModal").click(function(){
				 ClearAppraisalStructureFn();
				 $("#seq_no").val(galbalDataTemp.seq_no);
			 });
			 
			 $("#btnSetweightSubmit").click(function(){
				 
				 if($("#action").val() == "add" || $("#action").val() == ""){
					 InsertAppraisalStructureFn("Save");
				 }else{
					 UpdateAppraisalStructureFn();
				 }
			 });
			 $("#btnSetweightSubmitAnother").click(function(){
				 InsertAppraisalStructureFn("SaveAnother");
			 });
			 
			 $('.numberOnly').mask('Z9999999999', {

				  translation: {
				    'Z': {
				       pattern: /[0-9*]/,
				      //optional: true
				    }
				  }
				});			 
		 }
		 
		 
		 
	 }
});