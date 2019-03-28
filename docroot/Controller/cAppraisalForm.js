var getAllFormFn = function()
{
	$.ajax({
        url: restfulURL+"/"+serviceName+"/public/appraisal_form",
        type: "get",
        dataType: "json",
        data: {},
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
        	var htmlBody = "";
        	$.each(data,function(index,indexEntry) {
        		htmlBody += "<tr>";
        		htmlBody += "	<td>"+indexEntry.appraisal_form_name+"</td>";
        		htmlBody += "	<td style='text-align: center;'> <input type='checkbox' disabled='disabled'  "+((indexEntry.is_bonus==1)?"checked":"")+"> </td>";
        		htmlBody += "	<td style='text-align: center;'> <input type='checkbox' disabled='disabled'  "+((indexEntry.is_raise==1)?"checked":"")+"> </td>";
        		htmlBody += "	<td style='text-align: center;'> <input type='checkbox' disabled='disabled'  "+((indexEntry.is_job_evaluation==1)?"checked":"")+"> </td>";
        		htmlBody += "	<td style='text-align: center;'> <input type='checkbox' disabled='disabled'  "+((indexEntry.is_mpi==1)?"checked":"")+"> </td>";
        		htmlBody += "	<td style='text-align: center;'> <input type='checkbox' disabled='disabled'  "+((indexEntry.is_active==1)?"checked":"")+"> </td>";
        		htmlBody += "	<td style='text-align: center;'> <i data-trigger='focus' tabindex='"+index+"' data-content=\"" +
        				"<button class='btn btn-warning btn-small btn-gear edit' id='edit-"+indexEntry.appraisal_form_id+"'>Edit</button>&nbsp;" +
        				"<button id='del-"+indexEntry.appraisal_form_id+"' class='btn btn-danger btn-small btn-gear del'>Delete</button>\" " +
        				"data-placement='top' data-toggle='popover' data-html='true' class='fa fa-cog font-gear popover-edit-del' data-original-title='' title=''></i> </td>";
        		htmlBody += "</tr>";
        	});
        	
        	$("#listData").html(htmlBody);
        	$(".popover-edit-del").popover(setPopoverDisplay);
        	$("#table-appraisalForm").off("click",".popover-edit-del");
        	$("#table-appraisalForm").on("click",".popover-edit-del",function(){
        		
        			
        			$(".edit").on("click",function() {
        			ClearAppraisalFormFn();
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
        					 url:restfulURL+"/"+serviceName+"/public/appraisal_form/"+id,
        					 type : "delete",
        					 dataType:"json",
        					 headers:{Authorization:"Bearer "+tokenID.token},
        					success:function(data){    
        				    	 
        					     if(data['status']==200){
        					    	 
        					       callFlashSlide("Delete Successfully.");
        					       $("#confrimModal").modal('hide');
        					       getAllFormFn();
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


var findOneFn = function(id)
{
	$.ajax({
        url: restfulURL+"/"+serviceName+"/public/appraisal_form/"+id,
        type: "get",
        dataType: "json",
        data: {},
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
        	$("#id").val(data.appraisal_form_id);
        	$("#appraisal_form_name").val(data.appraisal_form_name);
        	$("#is_bonus").prop('checked', data.is_bonus);
        	$("#is_active").prop('checked', data.is_active);
        	$("#is_raise").prop('checked', data.is_raise);
        	$("#is_job_evaluation").prop('checked', data.is_job_evaluation);
        	$("#is_mpi").prop('checked', data.is_mpi);
        	
        	// is_job_evaluation visible
        	if(data.is_raise == 1){
        		$("div#form-group-is_job_evaluation").show();
        	} else {
        		$("div#form-group-is_job_evaluation").hide();
        	}
        	
        	
        	$("#saveFormModal").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			});
        	
        }
	});
};


var UpdateAppraisalFormFn = function()
{
	var appraisal_form_name = $("#appraisal_form_name").val();
	var is_bonus = Number($('#is_bonus').prop('checked'));
	var is_active = Number($('#is_active').prop('checked'));
	var is_raise = Number($('#is_raise').prop('checked'));
	var is_job_evaluation = Number($('#is_job_evaluation').prop('checked'));
	var is_mpi = Number($('#is_mpi').prop('checked'));
	

	$.ajax({
        url: restfulURL+"/"+serviceName+"/public/appraisal_form/"+$("#id").val(),
        type: "PATCH",
        dataType: "json",
        data: {
        	"appraisal_form_name":appraisal_form_name,
        	"is_bonus":is_bonus,
        	"is_active":is_active,
        	"is_raise":is_raise,
        	"is_job_evaluation":is_job_evaluation,
        	"is_mpi":is_mpi
        },
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) { 
        	if(data['status']=='200'){
        		  		
        		callFlashSlide("Update successed.");
        		$("#table-appraisalForm thead th").css("vertical-align", "middle");
        		getAllFormFn();
    			$("#saveFormModal").modal('hide');
    			ClearAppraisalFormFn();
    		       	
        	}else if(data['status']=='400'){
        		callFlashSlideInModal(validationFn(data),"#information","error");
			}
        }
	});
}


var ClearAppraisalFormFn = function()
{
	$("#appraisal_form_name").val("");
	$("#saveFormModal #is_bonus").prop('checked', false);
	$("#saveFormModal #is_active").prop('checked', true);
	$("#saveFormModal #is_raise").prop('checked', false);
	$("#saveFormModal #is_mpi").prop('checked', false);
	$("#saveFormModal #is_job_evaluation").prop('checked', false);
	
	// is_job_evaluation invisible
	$("div#form-group-is_job_evaluation").hide();
}


var InsertAppraisalFormFn = function(Status)
{
	var appraisal_form_name = $("#appraisal_form_name").val();
	var is_bonus = Number($('#is_bonus').prop('checked'));
	var is_active = Number($('#is_active').prop('checked'));
	var is_raise = Number($('#is_raise').prop('checked'));
	var is_job_evaluation = Number($('#is_job_evaluation').prop('checked'));
	var is_mpi = Number($('#is_mpi').prop('checked'));
	
	$.ajax({
        url: restfulURL+"/"+serviceName+"/public/appraisal_form",
        type: "post",
        dataType: "json",
        data: {
        	"appraisal_form_name":appraisal_form_name,
        	"is_bonus":is_bonus,
        	"is_active":is_active,
        	"is_raise":is_raise,
        	"is_job_evaluation":is_job_evaluation,
        	"is_mpi":is_mpi
        },
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) { 
        	if(data['status']=='200'){
        		  		
        		if(Status == 'Save'){
        			callFlashSlide("Insert successed.");
        			ClearAppraisalFormFn();
        			$("#saveFormModal").modal('hide');
        			
        			$("#table-appraisalForm thead th").css("vertical-align", "middle");
        			getAllFormFn();
        		}else if(Status == 'SaveAnother'){
        			callFlashSlideInModal("Insert success.","#information","");
        			$("#table-appraisalForm thead th").css("vertical-align", "middle");
        			getAllFormFn();
        			ClearAppraisalFormFn();
        		}
        	
        	}else if(data['status']=='400'){
        		callFlashSlideInModal(validationFn(data),"#information","error");
			}
        }
	});
}



$(document).ready(function(){
    	
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
		 if(connectionServiceFn(username,password,plid)==true){
			 getAllFormFn();
			 $(".form_list_content").show();
			 
			 $("#saveFormModal").hide();
			 
			 $(".btnCancle , .setWeightCloseModal").click(function(){
				 ClearAppraisalFormFn();
				 $("#btnSetweightSubmitAnother").show();
				 $("#saveFormModal").show(); 
				 
			 });
			 
			 $("#btnAdd").click(function(){
				 ClearAppraisalFormFn();
				 $("#btnSetweightSubmitAnother").show();
				 $("#saveFormModal").show(); 
				 $("#action").val("add");
			 });
			
			 
			 $("#btnSetweightSubmit").click(function(){
				 
				 if($("#action").val() == "add" || $("#action").val() == ""){
					 InsertAppraisalFormFn("Save");
				 }else{
					 UpdateAppraisalFormFn();
				 }
			 });
			 
			 $("#btnSetweightSubmitAnother").click(function(){
				 InsertAppraisalFormFn("SaveAnother");
			 });
			 
			// is_job_evaluation invisible
			$("#is_raise").change(function() {
				if (this.checked) {
					$("div#form-group-is_job_evaluation").show();
					$("#saveFormModal #is_job_evaluation").prop('checked', true);
				} else {
					$("div#form-group-is_job_evaluation").hide();
					$("#saveFormModal #is_job_evaluation").prop('checked', false);
				}
			});
			 
			 
		}
	}
	 
});