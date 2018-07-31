
//Cleaning
var clearRewardScoreFormFn = function(){
	$("#actionRewardScore").val("add");
	$("#informationRewardScore").hide();
	$("#appraisalItemNameRewardScore").val("");
	//$("#appraisalLevelDeductScore").val("");
	$("#appraisalLevelRewardScore option:first").attr('selected','selected');	
	$("#maxValueRewardScore").val("");
	//$("#isShowVarianceDeductScore").prop("checked",false);
	$("#isActiveRewardScore").prop("checked",true);
	$("#RewardScoreUnitRewardScore").val("");
//	$("#ValueGetZero").val("");
	
	//$("#structure_id_deduct").val("");
	
}
//List Data
var listDataRewardScoreFn = function(data) {
	console.log(data,'listDataRewardScoreFn not show!');
	var rows="";
	$.each(data,function(index,indexEntry){
		rows+="<tr>";
			rows+="<td>"+indexEntry[0]+"</td>";
			rows+="<td>"+indexEntry[1]+"</td>";
			rows+="<td>"+indexEntry[2]+"</td>";
			rows+="<td>"+indexEntry[3]+"</td>";
			rows+="<td>";
			rows+="	"+indexEntry[4]+"";
			rows+="</td>";
			rows+="<td><input type=\"checkbox\"></td>";
			rows+="<td style=\"text-align:center\">";
			rows+="<i title=\"\" data-original-title=\"\" class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"&lt;button class='btn btn-warning btn-xs btn-gear edit' id=1 data-target=#addModalRule data-toggle='modal'&gt;Edit&lt;/button&gt;&nbsp;&lt;button id=1 class='btn btn-danger btn-xs btn-gear del'&gt;Delete&lt;/button&gt;\"></i>";
			rows+="</td>";
		rows+="	</tr>";
	});
	//alert(rows);
	$("#listDeductScore").html(rows);
};
//Update
var updateRewardScoreFn  = function(){
	

	 var item_name=$("#appraisalItemNameRewardScore").val();
	 var item_id=$("#appraisalItemIdRewardScore").val();
	 var appraisal_level=$("#appraisalLevelRewardScore").val();
	 var structure_id=$("#structure_id_reward").val();
	 var max_value=$("#maxValueRewardScore").val();
	 var unit_reward_score=$("#RewardScoreUnitRewardScore").val();
//	 var value_get_zero=$("#ValueGetZero").val();
	 //var department_id=$("#departmentDeductScore").val();
	 var organization=($('[name="organizationRewardScore[]"]').val());
	 var position=($('[name="positionRewardScore[]"]').val());

	 var is_variance="";
//	 if($('#isShowVarianceDeductScore').prop('checked')==true){
//		 is_variance=1;
//	 }else{
//		 is_variance=0;
//	 }
	 var is_active="";
	 if($('#isActiveRewardScore').prop('checked')==true){
		 is_active=1;
	 }else{
		 is_active=0;
	 }
	 
	 
	 $.ajax({
	    url:restfulURL+"/"+serviceName+"/public/appraisal_item/"+item_id,
	    type:"PATCH",
	    dataType:"json",
	    headers:{Authorization:"Bearer "+tokenID.token},
	    data:{
		 "item_name":item_name,
		 "appraisal_level":appraisal_level,
		 "structure_id":structure_id,
		 "max_value":max_value,
		 "unit_reward_score":unit_reward_score,
//		 "value_get_zero":value_get_zero,
//		 "is_show_variance ":is_variance,
		 "is_active":is_active,
		// "department_code":department_id,
		 "org":organization,
		 "position":position,
		 "form_id":"4"
		},
	    success:function(data,status){
		     if(data['status']=="200"){
				 $('#modal-reward').modal('hide');
			     callFlashSlide("Update Successfully.");
				 getDataFn($("#pageNumber").val(),$("#rpp").val());
		      	//clearFn();
		     }else if(data['status']==400) {
				callFlashSlideInModal(validationFn(data),"#informationRewardScore","error");
			 }
		   }
	   });
	
};
//Insert
var insertRewardScoreFn = function(param) {
	
	/*
	item_name,
	appraisal_level,
	structure_id,
	max_value,
	unit_deduct_score,
	is_active
	*/	
	 var item_name=$("#appraisalItemNameRewardScore").val();
	 var appraisal_level=$("#appraisalLevelRewardScore").val();
	 var structure_id=$("#structure_id_reward").val();
	 var max_value=$("#maxValueRewardScore").val();
	 var unit_reward_score=$("#RewardScoreUnitRewardScore").val();
//	 var value_get_zero=$("#ValueGetZero").val();
	 //var department_id=$("#departmentDeductScore").val();
	 var organization=($('[name="organizationRewardScore[]"]').val());
	 var position=($('[name="positionRewardScore[]"]').val());
	 var is_variance="";
//	 if($('#isShowVarianceDeductScore').prop('checked')==true){
//		 is_variance=1;
//	 }else{
//		 is_variance=0;
//	 }
	 var is_active="";
	 if($('#isActiveRewardScore').prop('checked')==true){
		 is_active=1;
	 }else{
		 is_active=0;
	 }

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_item",
		type:"post",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			 "item_name":item_name,
			 "appraisal_level":appraisal_level,
			 "structure_id":structure_id,
			 "max_value":max_value,
			 "unit_reward_score":unit_reward_score,
//			 "value_get_zero":value_get_zero,
//			 "is_show_variance":is_variance,
			 "is_active":is_active,
			 //"department_code":department_id,
			 "org":organization,
			 "position":position,
			 "form_id":"4"
		},
		success:function(data){
			//console.log(data);
			
			if(data['status']==200){
				if(param !="saveAndAnother"){
					   callFlashSlide("Insert Successfully.");
				       getDataFn($("#pageNumber").val(),$("#rpp").val());
				       clearRewardScoreFormFn();
				 	   $('#modal-reward').modal('hide');
					}else{
						getDataFn($("#pageNumber").val(),$("#rpp").val());
						clearRewardScoreFormFn();
						callFlashSlideInModal("Insert Data is Successfully.","#informationRewardScore");
					}
			}else if(data['status']==400){
			//	console.log(validationFn(data));
				callFlashSlideInModal(validationFn(data),"#informationRewardScore","error");
			}
		}
	});
	
}


var initailRewardScoreFormFn = function(action,structureId,structureName,data){
	
	/*
	item_name,
	appraisal_level,
	structure_id,
	max_value,
	unit_deduct_score,
	is_active
	*/	
	if(action=='edit'){
		clearRewardScoreFormFn();
		appraisalLevelListFn("RewardScore",data['appraisal_level'],defaultAll=false,multiSelect=true);	
		//dropDrowDepartmentFn("DeductScore",data['department_code'],defaultAll=false);
		dropDrowOrgFn("RewardScore",data['org'],defaultAll=false);
		dropDrowPositionFn("RewardScore",data['position'],defaultAll=false);
		
		$("#appraisalItemNameRewardScore").val(data['item_name']);
		$("#maxValueRewardScore").val(data['max_value']);
		$("#RewardScoreUnitRewardScore").val(data['unit_reward_score']);
//		$("#ValueGetZero").val(data['value_get_zero']);
		
//		if(data['is_show_variance']==1){
//			$("#isShowVarianceDeductScore").prop("checked",true);
//		}else{
//			$("#isShowVarianceDeductScore").prop("checked",false);
//		}
		if(data['is_active']==1){
			$("#isActiveRewardScore").prop("checked",true);
		}else{
			$("#isActiveRewardScore").prop("checked",false);
		}
		
//		if(data['is_value_get_zero']==1){
//			$(".is_value_get_zero_form").show();
//		}else{
//			$(".is_value_get_zero_form").hide();
//		}
		
		$("#appraisalItemIdRewardScore").val(data['item_id']);
		$("#actionRewardScore").val("edit");
		$("#btnAddAnotherRewardScore").hide();
		
		
		
	
		//set header
		$("#structure_id_reward").val(structureId);
		$("#modalRewardScoreDescription").html("Edit "+structureName);

		
		
	
		
	}else if(action=='add'){
		/*
		item_name,
		appraisal_level,
		structure_id,
		max_value,
		unit_deduct_score,
		is_active
		*/	
		clearRewardScoreFormFn();
		appraisalLevelListFn("RewardScore",$("#embed_appraisal_level").val(),defaultAll=false,multiSelect=true);	
		//dropDrowDepartmentFn("DeductScore",$("#embed_department_id").val(),defaultAll=false);
		dropDrowOrgFn("RewardScore",$("#embed_org_id").val(),defaultAll=false);
		dropDrowPositionFn("RewardScore",$("#embed_position_id").val(),defaultAll=false);
		
		$("#btnAddAnotherRewardScore").show();
		
		//set header
		$("#structure_id_reward").val(structureId);
		$("#modalRewardScoreDescription").html("Add "+structureName);
		
	}
}
$(document).ready(function(){
//click modal deduct start.

	//$("button[data-target='#modal-deduct']").click(function(){
	$(document).on("click","button[data-target='#modal-reward']",function(){
		
		var structureId=$(this).prev().prev().get();
		var structureName=$(this).prev().prev().prev().get();
		initailRewardScoreFormFn('add',$(structureId).val(),$(structureName).val());
		

		  
	});
	
	
	//check text filed is number real only
	//IsNumeric
	$("#RewardScoreUnitRewardScore").keyup(function(){
		console.log(IsNumeric(this.value,this));
	});
	
	//Submit DeductScore Start
	$(document).on("click","#btnSubmitRewardScore",function(){
	//$("#btnSubmitDeductScore").click(function(){
		
		if($("#actionRewardScore").val()=="add"){
			insertRewardScoreFn("saveOnly");
		}else{
			updateRewardScoreFn();
		}
		
	});
	$(document).on("click","#btnAddAnotherRewardScore",function(){
	//$("#btnAddAnotherDeductScore").click(function(){
		
		insertRewardScoreFn("saveAndAnother");
		
	});
	//Submit DeductScore end
	//click modal deduct end.
	
	var getSelectionStart = function (o) {
		if (o.createTextRange) {
			var r = document.selection.createRange().duplicate()
			r.moveEnd('character', o.value.length)
			if (r.text == '') return o.value.length
			return o.value.lastIndexOf(r.text)
		} else return o.selectionStart
	};
	jQuery('.numberOnly').keypress(function (evt) { 
		console.log("Keypress");
		 var charCode = (evt.which) ? evt.which : event.keyCode;
		 var number = this.value.split('.');
		 if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
		    return false;
		 }
		    //just one dot
		 if(number.length>1 && charCode == 46){
		    return false;
		 }
		    //get the carat position
		 var caratPos = getSelectionStart(this);
		 var dotPos = this.value.indexOf(".");
		 if( caratPos > dotPos && dotPos>-1 && (number[1].length > 1)){
		    return false;
		 }
		 return true;
	});
});