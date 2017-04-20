
//Cleaning
var clearDeductScoreFormFn = function(){
	
	$("#informationDeductScore").hide();
	$("#appraisalItemNameDeductScore").val("");
	//$("#appraisalLevelDeductScore").val("");
	$("#appraisalLevelDeductScore option:first").attr('selected','selected');	
	$("#maxValueDeductScore").val("");
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
	

	 var appraisal_item_name=$("#appraisalItemNameDeductScore").val();
	 var appraisal_item_id=$("#appraisalItemIdDeductScore").val();
	 var appraisal_level_id=$("#appraisalLevelDeductScore").val();
	 var structure_id=$("#structure_id_deduct").val();
	 var max_value=$("#maxValueDeductScore").val();
	 var unit_deduct_score=$("#DeductScoreUnitDeductScore").val();
	 var department_id=$("#departmentDeductScore").val();

	 var is_active="";
	 if($('#isActiveDeductScore').prop('checked')==true){
		 is_active=1;
	 }else{
		 is_active=0;
	 }
	 
	 $.ajax({
	    url:restfulURL+"/tyw_api/public/appraisal_item/"+appraisal_item_id,
	    type:"PATCH",
	    dataType:"json",
	    headers:{Authorization:"Bearer "+tokenID.token},
	    data:{
		 "appraisal_item_name":appraisal_item_name,
		 "appraisal_level_id":appraisal_level_id,
		 "structure_id":structure_id,
		 "max_value":max_value,
		 "unit_deduct_score":unit_deduct_score,
		 "is_active":is_active,
		 "department_code":department_id,
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
	appraisal_item_name,
	appraisal_level_id,
	structure_id,
	max_value,
	unit_deduct_score,
	is_active
	*/	
	 var appraisal_item_name=$("#appraisalItemNameDeductScore").val();
	 var appraisal_level_id=$("#appraisalLevelDeductScore").val();
	 var structure_id=$("#structure_id_deduct").val();
	 var max_value=$("#maxValueDeductScore").val();
	 var unit_deduct_score=$("#DeductScoreUnitDeductScore").val();
	 var department_id=$("#departmentDeductScore").val();
	 var is_active="";
	 if($('#isActiveDeductScore').prop('checked')==true){
		 is_active=1;
	 }else{
		 is_active=0;
	 }

	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_item",
		type:"post",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			 "appraisal_item_name":appraisal_item_name,
			 "appraisal_level_id":appraisal_level_id,
			 "structure_id":structure_id,
			 "max_value":max_value,
			 "unit_deduct_score":unit_deduct_score,
			 "is_active":is_active,
			 "department_code":department_id,
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
	appraisal_item_name,
	appraisal_level_id,
	structure_id,
	max_value,
	unit_deduct_score,
	is_active
	*/	
	if(action=='edit'){
		clearDeductScoreFormFn();
		appraisalLevelListFn("DeductScore",data['appraisal_level_id']);	
		dropDrowDepartmentFn("DeductScore",data['department_code'],defaultAll=false);
		
		$("#appraisalItemNameDeductScore").val(data['appraisal_item_name']);
		$("#maxValueDeductScore").val(data['max_value']);
		$("#DeductScoreUnitDeductScore").val(data['unit_deduct_score']);
		
		if(data['is_active']==1){
			$("#isActiveDeductScore").prop("checked",true);
		}else{
			$("#isActiveDeductScore").prop("checked",false);
		}
		$("#appraisalItemIdDeductScore").val(data['appraisal_item_id']);
		$("#actionDeductScore").val("edit");
		$("#btnAddAnotherDeductScore").hide();
		
		
		
	
		//set header
		$("#structure_id_deduct").val(structureId);
		$("#modalDeductScoreDescription").html("Edit "+structureName);

		
		
	
		
	}else if(action=='add'){
		/*
		appraisal_item_name,
		appraisal_level_id,
		structure_id,
		max_value,
		unit_deduct_score,
		is_active
		*/	
		clearDeductScoreFormFn();
		appraisalLevelListFn("DeductScore",$("#embed_appraisal_level_id").val());	
		dropDrowDepartmentFn("DeductScore",$("#embed_department_id").val(),defaultAll=false);
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
	
	jQuery('.numberOnly').keyup(function () { 
	    this.value = this.value.replace(/[^0-9\.]/g,'');
	});
});