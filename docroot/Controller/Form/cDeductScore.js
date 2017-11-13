
//Cleaning
var clearDeductScoreFormFn = function(){
	$("#actionDeductScore").val("add");
	$("#informationDeductScore").hide();
	$("#appraisalItemNameDeductScore").val("");
	//$("#appraisalLevelDeductScore").val("");
	$("#appraisalLevelDeductScore option:first").attr('selected','selected');	
	$("#maxValueDeductScore").val("");
	//$("#isShowVarianceDeductScore").prop("checked",false);
	$("#isActiveDeductScore").prop("checked",true);
	$("#DeductScoreUnitDeductScore").val("");
	
	//$("#structure_id_deduct").val("");
	
}
//List Data
var listDataDeductScoreFn = function(data) {
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
var updateDeductScoreFn  = function(){
	

	 var item_name=$("#appraisalItemNameDeductScore").val();
	 var item_id=$("#appraisalItemIdDeductScore").val();
	 var appraisal_level=$("#appraisalLevelDeductScore").val();
	 var structure_id=$("#structure_id_deduct").val();
	 var max_value=$("#maxValueDeductScore").val();
	 var unit_deduct_score=$("#DeductScoreUnitDeductScore").val();
	 //var department_id=$("#departmentDeductScore").val();
	 var organization=($('[name="organizationDeductScore[]"]').val());
	 var position=($('[name="positionDeductScore[]"]').val());

	 var is_variance="";
//	 if($('#isShowVarianceDeductScore').prop('checked')==true){
//		 is_variance=1;
//	 }else{
//		 is_variance=0;
//	 }
	 var is_active="";
	 if($('#isActiveDeductScore').prop('checked')==true){
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
		 "unit_deduct_score":unit_deduct_score,
//		 "is_show_variance ":is_variance,
		 "is_active":is_active,
		// "department_code":department_id,
		 "org":organization,
		 "position":position,
		 "form_id":"3"
		},
	    success:function(data,status){
		     if(data['status']=="200"){
				 $('#modal-deduct').modal('hide');
			     callFlashSlide("Update Successfully.");
				 getDataFn($("#pageNumber").val(),$("#rpp").val());
		      	//clearFn();
		     }else if(data['status']==400) {
				callFlashSlideInModal(validationFn(data),"#informationDeductScore","error");
			 }
		   }
	   });
	
};
//Insert
var insertDeductScoreFn = function(param) {
	
	/*
	item_name,
	appraisal_level,
	structure_id,
	max_value,
	unit_deduct_score,
	is_active
	*/	
	 var item_name=$("#appraisalItemNameDeductScore").val();
	 var appraisal_level=$("#appraisalLevelDeductScore").val();
	 var structure_id=$("#structure_id_deduct").val();
	 var max_value=$("#maxValueDeductScore").val();
	 var unit_deduct_score=$("#DeductScoreUnitDeductScore").val();
	 //var department_id=$("#departmentDeductScore").val();
	 var organization=($('[name="organizationDeductScore[]"]').val());
	 var position=($('[name="positionDeductScore[]"]').val());
	 var is_variance="";
//	 if($('#isShowVarianceDeductScore').prop('checked')==true){
//		 is_variance=1;
//	 }else{
//		 is_variance=0;
//	 }
	 var is_active="";
	 if($('#isActiveDeductScore').prop('checked')==true){
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
			 "unit_deduct_score":unit_deduct_score,
//			 "is_show_variance":is_variance,
			 "is_active":is_active,
			 //"department_code":department_id,
			 "org":organization,
			 "position":position,
			 "form_id":"3"
		},
		success:function(data){
			//console.log(data);
			
			if(data['status']==200){
				if(param !="saveAndAnother"){
					   callFlashSlide("Insert Successfully.");
				       getDataFn($("#pageNumber").val(),$("#rpp").val());
				       clearDeductScoreFormFn();
				 	   $('#modal-deduct').modal('hide');
					}else{
						getDataFn($("#pageNumber").val(),$("#rpp").val());
						clearDeductScoreFormFn();
						callFlashSlideInModal("Insert Data is Successfully.","#informationDeductScore");
					}
			}else if(data['status']==400){
			//	console.log(validationFn(data));
				callFlashSlideInModal(validationFn(data),"#informationDeductScore","error");
			}
		}
	});
	
}


var initailDeductScoreFormFn = function(action,structureId,structureName,data){

	
	/*
	item_name,
	appraisal_level,
	structure_id,
	max_value,
	unit_deduct_score,
	is_active
	*/	
	if(action=='edit'){
		clearDeductScoreFormFn();
		appraisalLevelListFn("DeductScore",data['appraisal_level'],defaultAll=false,multiSelect=true);	
		//dropDrowDepartmentFn("DeductScore",data['department_code'],defaultAll=false);
		dropDrowOrgFn("DeductScore",data['org'],defaultAll=false);
		dropDrowPositionFn("DeductScore",data['position'],defaultAll=false);
		
		$("#appraisalItemNameDeductScore").val(data['item_name']);
		$("#maxValueDeductScore").val(data['max_value']);
		$("#DeductScoreUnitDeductScore").val(data['unit_deduct_score']);
		
//		if(data['is_show_variance']==1){
//			$("#isShowVarianceDeductScore").prop("checked",true);
//		}else{
//			$("#isShowVarianceDeductScore").prop("checked",false);
//		}
		if(data['is_active']==1){
			$("#isActiveDeductScore").prop("checked",true);
		}else{
			$("#isActiveDeductScore").prop("checked",false);
		}
		$("#appraisalItemIdDeductScore").val(data['item_id']);
		$("#actionDeductScore").val("edit");
		$("#btnAddAnotherDeductScore").hide();
		
		
		
	
		//set header
		$("#structure_id_deduct").val(structureId);
		$("#modalDeductScoreDescription").html("Edit "+structureName);

		
		
	
		
	}else if(action=='add'){
		/*
		item_name,
		appraisal_level,
		structure_id,
		max_value,
		unit_deduct_score,
		is_active
		*/	
		clearDeductScoreFormFn();
		appraisalLevelListFn("DeductScore",$("#embed_appraisal_level").val(),defaultAll=false,multiSelect=true);	
		//dropDrowDepartmentFn("DeductScore",$("#embed_department_id").val(),defaultAll=false);
		dropDrowOrgFn("DeductScore",$("#embed_org_id").val(),defaultAll=false);
		dropDrowPositionFn("DeductScore",$("#embed_position_id").val(),defaultAll=false);
		
		$("#btnAddAnotherDeductScore").show();
		
		//set header
		$("#structure_id_deduct").val(structureId);
		$("#modalDeductScoreDescription").html("Add "+structureName);
		
	}
}
$(document).ready(function(){
//click modal deduct start.

	//$("button[data-target='#modal-deduct']").click(function(){
	$(document).on("click","button[data-target='#modal-deduct']",function(){
		
		var structureId=$(this).prev().prev().get();
		var structureName=$(this).prev().prev().prev().get();
		initailDeductScoreFormFn('add',$(structureId).val(),$(structureName).val());
		

		  
	});
	
	
	//check text filed is number real only
	//IsNumeric
	$("#DeductScoreUnitDeductScore").keyup(function(){
		console.log(IsNumeric(this.value,this));
	});
	
	//Submit DeductScore Start
	$(document).on("click","#btnSubmitDeductScore",function(){
	//$("#btnSubmitDeductScore").click(function(){
		
		if($("#actionDeductScore").val()=="add"){
			insertDeductScoreFn("saveOnly");
		}else{
			updateDeductScoreFn();
		}
		
	});
	$(document).on("click","#btnAddAnotherDeductScore",function(){
	//$("#btnAddAnotherDeductScore").click(function(){
		
		insertDeductScoreFn("saveAndAnother");
		
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