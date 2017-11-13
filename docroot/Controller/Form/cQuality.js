
//Cleaning
var clearQualityFormFn = function(){
	
	$("#informationQuality").hide();
	$("#appraisalItemNameQuality").val("");
	//$("#appraisalLevelQuality").val("");
	$("#appraisalLevelQuality option:first").attr('selected','selected');
	//$("#isShowVarianceQuality").prop("checked",false);
	$("#isActiveQuality").prop("checked",true);
	//$("#structure_id_quality").val("");
	
}

//Update
var updateQualityFn  = function(){
	

	 var item_name=$("#appraisalItemNameQuality").val();
	 var item_id=$("#appraisalItemIdQuality").val();
	 var appraisal_level_id=$("#appraisalLevelQuality").val();
	 var structure_id=$("#structure_id_quality").val();
	 //var department_id=$("#departmentQuality").val();
	 var organization=($('[name="organizationQuality[]"]').val());
	 var position=($('[name="positionQuality[]"]').val());
	 
	 var is_variance="";
//	 if($('#isShowVarianceQuality').prop('checked')==true){
//		 is_variance=1;
//	 }else{
//		 is_variance=0;
//	 }
	 var is_active="";
	 if($('#isActiveQuality').prop('checked')==true){
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
		 "appraisal_level":appraisal_level_id,
		 "structure_id":structure_id,
		 //"is_show_variance":is_variance,
		 "is_active":is_active,
		 "form_id":"2",
		 //"department_code":department_id
		 "org":organization,
		 "position":position,
		},
	    success:function(data,status){
		     if(data['status']=="200"){
				 $('#modal-quality').modal('hide');
			     callFlashSlide("Update Successfully.");
				 getDataFn($("#pageNumber").val(),$("#rpp").val());
		      	//clearFn();
		     }else if(data['status']==400) {
				callFlashSlideInModal(validationFn(data),"#informationQuality","error");
			 }
		   }
	   });
	
};
//Insert
var insertQualityFn = function(param) {
	
	
	 var item_name=$("#appraisalItemNameQuality").val();
	 var appraisal_level_id=$("#appraisalLevelQuality").val();
	 var structure_id=$("#structure_id_quality").val();
	// var department_id=$("#departmentQuality").val();
	 var organization=($('[name="organizationQuality[]"]').val());
	 var position=($('[name="positionQuality[]"]').val());
	 var is_variance="";
//	 if($('#isShowVarianceQuality').prop('checked')==true){
//		 is_variance=1;
//	 }else{
//		 is_variance=0;
//	 }
	 var is_active="";
	 if($('#isActiveQuality').prop('checked')==true){
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
			 "appraisal_level":appraisal_level_id,
			 "structure_id":structure_id,
			 //"is_show_variance":is_variance,
			 "is_active":is_active,
			// "department_code":department_id,
			 "org":organization,
			 "position":position,
			 "form_id":"2"
		},
		success:function(data){
			//console.log(data);
			
			if(data['status']==200){
				if(param !="saveAndAnother"){
					   callFlashSlide("Insert Successfully.");
				       getDataFn($("#pageNumber").val(),$("#rpp").val());
				       clearQualityFormFn();
				 	   $('#modal-quality').modal('hide');
					}else{
						getDataFn($("#pageNumber").val(),$("#rpp").val());
						clearQualityFormFn();
						callFlashSlideInModal("Insert Data is Successfully.","#informationQuality");
					}
			}else if(data['status']==400){
			//	console.log(validationFn(data));
				callFlashSlideInModal(validationFn(data),"#informationQuality","error");
			}
		}
	});
	
}


var initailQualityFormFn = function(action,structureId,structureName,data){

/*
item_name,
appraisal_level_id,
structure_id,
is_active
*/
	if(action=='edit'){
		clearQualityFormFn();
		appraisalLevelListFn("Quality",data['appraisal_level'],defaultAll=false,multiSelect=true);	
		
		//dropDrowDepartmentFn("Quality",data['department_code'],defaultAll=false);
		dropDrowOrgFn("Quality",data['org'],defaultAll=false);
		dropDrowPositionFn("Quality",data['position'],defaultAll=false);
		
		$("#appraisalItemNameQuality").val(data['item_name']);
		$("#appraisalItemIdQuality").val(data['item_id']);
		
//		if(data['is_show_variance']==1){
//			$("#isShowVarianceQuality").prop("checked",true);
//		}else{
//			$("#isShowVarianceQuality").prop("checked",false);
//		}
		if(data['is_active']==1){
			$("#isActiveQuality").prop("checked",true);
		}else{
			$("#isActiveQuality").prop("checked",false);
		}
		$("#actionQuality").val("edit");
		$("#btnAddAnotherQuality").hide();

		//set header
		$("#structure_id_quality").val(structureId);
		$("#modalQualityDescription").html("Edit "+structureName);

		
		
		
		
		
	
	
		
	}else if(action=='add'){
		/*
		item_name,
		appraisal_level_id,
		structure_id,
		is_active
		*/	
		clearQualityFormFn();
		$("#isActiveQuality").prop("checked",true);
		//$("#isShowVarianceQuality").prop("checked",true);
		appraisalLevelListFn("Quality",$("#embed_appraisal_level_id").val(),defaultAll=false,multiSelect=true);	
		//dropDrowDepartmentFn("Quality",$("#embed_department_id").val(),defaultAll=false);
		dropDrowOrgFn("Quality",$("#embed_org_id").val(),defaultAll=false);
		dropDrowPositionFn("Quality",$("#embed_position_id").val(),defaultAll=false);
		$("#btnAddAnotherQuality").show();

		//set header
		$("#structure_id_quality").val(structureId);
		$("#modalQualityDescription").html("Add "+structureName);
		
	}
}
$(document).ready(function(){
//click modal quality start.
	
	//$("button[data-target='#modal-quality']").click(function(){
	$(document).on("click","button[data-target='#modal-quality']",function(){
		
		var structureId=$(this).prev().prev().get();
		var structureName=$(this).prev().prev().prev().get();
		initailQualityFormFn('add',$(structureId).val(),$(structureName).val());
		
	});
	
	
	//Search Quality Start
	//$("#SearchQuality").click(function(){
	$(document).on("click","#SearchQuality",function(){
		var embedParam="" +
				"<input type='hidden' class='param_quality_form' id='embed_appraisal_level_quality' name='embed_appraisal_level_quality' value='"+$("#appraisalLevelSearchQuality").val()+"'>" +
				"<input type='hidden' class='param_quality_form' id='embed_cds_name_quality' name='embed_cds_name_quality' value='"+$("#cdsNameSearchQuality").val()+"'>";
		$(".param_quality_form").remove();
		$("#embedParamSearchQuality").html(embedParam);
		cdsGetFn();
	});
	$("#SearchQuality").click();
	
	//Search Quality End
	
	//Submit Quality Start
	//$("#btnSubmitQuality").click(function(){
	$(document).on("click","#btnSubmitQuality",function(){
		
		if($("#actionQuality").val()=="add"){
			insertQualityFn("saveOnly");
		}else{
			updateQualityFn();
		}
		
	});
	//$("#btnAddAnotherQuality").click(function(){
	$(document).on("click","#btnAddAnotherQuality",function(){
		insertQualityFn("saveAndAnother");
		
	});
	//Submit Quality end
	//click modal quality end.
	
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