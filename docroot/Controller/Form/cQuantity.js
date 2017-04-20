//Global Start.
var globalCDSData="";
//Cleaning
var clearQuantityFormFn = function(){
	$("#actionQuantity").val("add");
	$("#informationQuantity").hide();
	$("#appraisalItemNameQuantity").val("");
	//$("#appraisalLevelQuantity").val("");
	$("#appraisalLevelQuantity option:first").attr('selected','selected');
	
	$("#perspectiveQuantity option:first").attr('selected','selected');
	$("#baselineValueQuantity").val("");
	$("#uomQuantity option:first").attr('selected','selected');
	$("#isActiveQuantity").prop("checked",true);
	$("#formulaDescriptionQuantity").val("");
	//$("#structure_id_quantity").val("");
	$("#textarea_cds").html("");
	
	
}
//List Data
var listDataQuantityFn = function(data) {
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
	$("#listQuantity").html(rows);
};
//Update
var updateQuantityFn  = function(){
	

	 var appraisal_item_name=$("#appraisalItemNameQuantity").val();
	 
	 var appraisal_item_id=$("#appraisalItemIdQuantity").val();
	 
	 var appraisal_level_id=$("#appraisalLevelQuantity").val();
	 var perspective_id=$("#perspectiveQuantity").val();
	 var structure_id=$("#structure_id_quantity").val();
	 var uom_id=$("#uomQuantity").val();
	 var baseline_value=$("#baselineValueQuantity").val();
	 var formula_desc=$("#formulaDescriptionQuantity").val();
	
	 $(".formula_cds_id_area .cds_name_inline").remove();
	 var formula_cds_name=$("#textarea_cds").html();
	 var formula_cds_id=$(".formula_cds_id_area").text().replace(/\s/g,'');
	 var department_id=$("#departmentQuantity").val();
		
	 var is_active="";
	 if($('#isActiveQuantity').prop('checked')==true){
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
		"perspective_id":perspective_id,
		"structure_id":structure_id,
		"uom_id":uom_id,
		"baseline_value":baseline_value,
		"formula_desc":formula_desc,
		"formula_cds_id":formula_cds_id,
		"formula_cds_name":formula_cds_name,
		"is_active":is_active,
		"department_code":department_id,
		"form_id":"1"
		},
	    success:function(data,status){
		     if(data['status']=="200"){
				 $('#modal-quantity').modal('hide');
			     callFlashSlide("Update Successfully.");
				 getDataFn($("#pageNumber").val(),$("#rpp").val());
		      	 clearQuantityFormFn
		     }else if(data['status']==400) {
				callFlashSlideInModal(validationFn(data),"#informationQuantity","error");
			 }
		   }
	   });
	
};
//Insert
var insertQuantityFn = function(param) {
	
	$(".formula_cds_id_area .cds_name_inline").remove();
	var formula_cds_name=$("#textarea_cds").html();
	var formula_cds_id=$(".formula_cds_id_area").text().replace(/\s/g,'');
	

	 var appraisal_item_name=$("#appraisalItemNameQuantity").val();
	 var appraisal_level_id=$("#appraisalLevelQuantity").val();
	 var perspective_id=$("#perspectiveQuantity").val();
	 var structure_id=$("#structure_id_quantity").val();
	 var uom_id=$("#uomQuantity").val();
	 var baseline_value=$("#baselineValueQuantity").val();
	 var formula_desc=$("#formulaDescriptionQuantity").val();
	 var department_id=$("#departmentQuantity").val();
	 
		
	 var is_active="";
	 if($('#isActiveQuantity').prop('checked')==true){
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
			 "perspective_id":perspective_id,
			 "structure_id":structure_id,
			 "uom_id":uom_id,
			 "baseline_value":baseline_value,
			 "formula_desc":formula_desc,
			 "formula_cds_id":formula_cds_id,
			 "formula_cds_name":formula_cds_name,
			 "is_active":is_active,
			 "department_code":department_id,
			 "form_id":"1"
		},
		success:function(data){
			//console.log(data);
			
			if(data['status']==200){
				if(param !="saveAndAnother"){
					   callFlashSlide("Insert Successfully.");
				     	getDataFn($("#pageNumber").val(),$("#rpp").val());
				       clearQuantityFormFn();
				 	   $('#modal-quantity').modal('hide');
					}else{
						getDataFn($("#pageNumber").val(),$("#rpp").val());
						clearQuantityFormFn();
						callFlashSlideInModal("Insert Data is Successfully.","#informationQuantity");
					}
			}else if(data['status']==400){
			//	console.log(validationFn(data));
				callFlashSlideInModal(validationFn(data),"#informationQuantity","error");
			}
		}
	});
	
}


var cdsListFn = function(data){
	var cdsListHTML="";
	$.each(data['data'],function(index,indexEntry){
	//cds_id,cds_name
		cdsListHTML+="<tr>";
			cdsListHTML+="<td >"+indexEntry['cds_id']+"</td>";
			cdsListHTML+="<td id=\"cds_name-"+indexEntry['cds_id']+"\">"+indexEntry['cds_name']+"</td>";
			cdsListHTML+="<td style=\"text-align:right\">";
			cdsListHTML+="<button class=\"btn btn-warning btn-xs btn-gear sum\" id=\"sum-"+indexEntry['cds_id']+"\" >Sum</button>&nbsp;";
			//cdsListHTML+="<button  class=\"btn btn-danger btn-xs btn-gear average\" id=\"avg-"+indexEntry['cds_id']+"\">Average</button>";
			cdsListHTML+="</td>";
		cdsListHTML+="</tr>";
	});
	$("#listCDS").html(cdsListHTML);
}
var cdsGetFn = function(page,rpp){

	/*
	embed_appraisal_level_quantity
	embed_cds_name_quantity
	*/
	var appraisal_level=$("#embed_appraisal_level_quantity").val();
	var cds_name=$("#embed_cds_name_quantity").val();
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_item/cds_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			
			"appraisal_level_id":appraisal_level,
			"cds_name":cds_name,
			"page":page,
			"rpp":rpp
			},
		success:function(data){
			//console.log(data);
			cdsListFn(data);
			globalCDSData=data;
			
			paginationSetUpFn2(globalCDSData['current_page'],globalCDSData['last_page'],globalCDSData['last_page']);
			
		}
	});
}

var initailQuantityFormFn = function(action,structureId,structureName,data){
	
/*
appraisal_item_id
appraisal_item_name
appraisal_level_id
structure_id
perspective_id
uom_id
formula_desc
formula_cds_id
formula_cds_name
baseline_value
max_value
unit_deduct_score
is_active
created_by
created_dttm
updated_by
updated_dttm
structure_name
*/
	$(".formula_cds_id_area").empty();
	$("#cdsNameSearchQuantity").val("");
	if(action=='edit'){
		clearQuantityFormFn();
		appraisalLevelListFn("Quantity",data['appraisal_level_id'],defaultAll=false);			
		perspectiveListFn("Quantity",data['perspective_id'],defaultAll=false);
		uomListFn("Quantity",data['uom_id']);
		
		dropDrowDepartmentFn("Quantity",data['department_code'],defaultAll=false);
		$("#baselineValueQuantity").val(data['baseline_value']);
		$("#formulaDescriptionQuantity").val(data['formula_desc']);
		$("#appraisalItemNameQuantity").val(data['appraisal_item_name']);	
		$("#textarea_cds").html(data['formula_cds_name']);
		
		//get formula cds id start
		$("#textarea_cds").keyup(function(){
			//formula_cds_id_area
			$(".formula_cds_id_area").html($(this).html());
		});
		$("#textarea_cds").keyup();
		//get formula cds id end
		
		
		if(data['is_active']==1){
			$("#isActiveQuantity").prop("checked",true);
		}else{
			$("#isActiveQuantity").prop("checked",false);
		}
		$("#appraisalItemIdQuantity").val(data['appraisal_item_id']);
		$("#actionQuantity").val("edit");
		$("#btnAddAnotherQuantity").hide();
		
		
		jQuery('.numberOnly').keyup(function () { 
		    this.value = this.value.replace(/[^0-9\.]/g,'');
		});
		
		//set header
		$("#structure_id_quantity").val(structureId);
		$("#modalQuantityDescription").html("Edit "+structureName);

		
		
		//Autocomplete Search Start.
		$("#cdsNameSearchQuantity").autocomplete({

	        source: function (request, response) {
	        	$.ajax({
					 url:restfulURL+"/tyw_api/public/cds/auto_cds",
					 type:"post",
					 dataType:"json",
					 headers:{Authorization:"Bearer "+tokenID.token},
					 data:{"cds_name":request.term,"appraisal_level_id":$("#appraisalLevelQuantity").val()},
					 //async:false,
	                 error: function (xhr, textStatus, errorThrown) {
	                        console.log('Error: ' + xhr.responseText);
	                    },
					 success:function(data){
							response($.map(data, function (item) {
	                            return {
	                            	
	                                label: item.cds_name,
	                                value: item.cds_name
	                            };
	                        }));
					},
					beforeSend:function(){
						$("body").mLoading('hide');	
					}
					
					});
	        }
	    });
		$(".ui-autocomplete").css({"z-index":"10000;"});
		//Autocomplete Search End
		appraisalLevelListFn("SearchQuantity","",defaultAll=false);
		
		
		//run search cds default 
		var embedParam="" +
		"<input type='hidden' class='param_quantity_form' id='embed_appraisal_level_quantity' name='embed_appraisal_level_quantity' value='"+$("#appraisalLevelQuantity").val()+"'>" +
		"<input type='hidden' class='param_quantity_form' id='embed_cds_name_quantity' name='embed_cds_name_quantity' value='"+$("#cdsNameSearchQuantity").val()+"'>";
		$(".param_quantity_form").remove();
		$("#embedParamSearchQuantity").html(embedParam);
		//setTimeout(function(){
			cdsGetFn();
		//},3000);
		 

	}else if(action=='add'){
	
		clearQuantityFormFn();
		appraisalLevelListFn("Quantity",$("#embed_appraisal_level_id").val(),defaultAll=false);			
		perspectiveListFn("Quantity",$("#embed_perspective_id").val(),defaultAll=false);
		dropDrowDepartmentFn("Quantity",$("#embed_department_id").val(),defaultAll=false);
		uomListFn("Quantity");
		$("#btnAddAnotherQuantity").show();
		//SEARCH
		//Autocomplete Search Start.
		
		
		//console.log($(objectStructureId).val());
		$("#structure_id_quantity").val(structureId);
		$("#modalQuantityDescription").html("Add "+structureName);
		
		$("#cdsNameSearchQuantity").autocomplete({

	        source: function (request, response) {
	        	$.ajax({
					 url:restfulURL+"/tyw_api/public/cds/auto_cds",
					 type:"post",
					 dataType:"json",
					 headers:{Authorization:"Bearer "+tokenID.token},
					 data:{"cds_name":request.term,"appraisal_level_id":$("#appraisalLevelQuantity").val()},
					 //async:false,
	                 error: function (xhr, textStatus, errorThrown) {
	                        console.log('Error: ' + xhr.responseText);
	                    },
					 success:function(data){
							response($.map(data, function (item) {
	                            return {
	                                label: item.cds_name,
	                                value: item.cds_name
	                            };
	                        }));
					},
					beforeSend:function(){
						$("body").mLoading('hide');	
					}
					
					});
	        }
	    });
		//Autocomplete Search End
		//appraisalLevelListFn("SearchQuantity");
		
		jQuery('.numberOnly').keyup(function () { 
		    this.value = this.value.replace(/[^0-9\.]/g,'');
		});

		
		
		
	}
	
	
	
}
var formulaEngineFn = function(id){
	
	var cds=id.split("-");
	var cds_id=cds[1];
	var cds_type=cds[0];
	var cds_name=$("#cds_name-"+cds_id).text();

	//([sum:จำนวนยอดขายสุทธิต่อไตรมาส]/[sum:จำนวนเป้าหมายยอดขายสุทธิต่อไตรมาส]*100)
	var wrap="&nbsp;<span  class='not-allowed' contenteditable='false'><div class='font-blue'>[</div>"+cds_type+":<span class='cds_name_inline'>"+cds_name+"</span><span class='cds_id_inline '>cds"+cds_id+"</span><div class='font-blue'>]</div></span>";
	//var wrap="&nbsp;<input class='formula_unit' type=\"text\" disabled value=\"["+cds_type+":"+cds_name+"]\">&nbsp;";
	
	$("#textarea_cds").append(wrap);
	$("#textarea_cds").keyup(function(){
		//formula_cds_id_area
		$(".formula_cds_id_area").html($(this).html());

	});
	$("#textarea_cds").keyup();
	
}
$(document).ready(function(){
//click modal quality start.

	
	
	$(document).on("click","button[data-target='#modal-quantity']",function(){

		var structureId=$(this).prev().prev().get();
		var structureName=$(this).prev().prev().prev().get();
		initailQuantityFormFn('add',$(structureId).val(),$(structureName).val());
		
		//run search cds default 
		var embedParam="" +
		"<input type='hidden' class='param_quantity_form' id='embed_appraisal_level_quantity' name='embed_appraisal_level_quantity' value='"+$("#appraisalLevelQuantity").val()+"'>" +
		"<input type='hidden' class='param_quantity_form' id='embed_cds_name_quantity' name='embed_cds_name_quantity' value='"+$("#cdsNameSearchQuantity").val()+"'>";
		$(".param_quantity_form").remove();
		$("#embedParamSearchQuantity").html(embedParam);
		$(".formula_cds_id_area").empty();
		$(".countPagination2").val(10);
		cdsGetFn();
	});
	
	
	//Search Quantity Start
	$(document).on("click","#SearchQuantity",function(){	
		var embedParam="" +
				"<input type='hidden' class='param_quantity_form' id='embed_appraisal_level_quantity' name='embed_appraisal_level_quantity' value='"+$("#appraisalLevelQuantity").val()+"'>" +
				"<input type='hidden' class='param_quantity_form' id='embed_cds_name_quantity' name='embed_cds_name_quantity' value='"+$("#cdsNameSearchQuantity").val()+"'>";
		$(".param_quantity_form").remove();
		$("#embedParamSearchQuantity").html(embedParam);
		$(".countPagination2").val(10);
		$("#rpp").remove();
		cdsGetFn();
	});

	
	//$("#SearchQuantity").click();
	
	//Search Quantity End
	
	//Submit Quantity Start
	$(document).on("click","#btnSubmitQuantity",function(){
	//$("#btnSubmitQuantity").click(function(){
		if($("#actionQuantity").val()=="add"){
			insertQuantityFn("saveOnly");
		}else{
			updateQuantityFn();
		}
	});
	$(document).on("click","#btnAddAnotherQuantity",function(){
	//$("#btnAddAnotherQuantity").click(function(){
		
		insertQuantityFn("saveAndAnother");
		
	});
	//Submit Quantity end
	
	//Check form start
	$(document).on("click","#btnCheckFormula",function(){
		$(".formula_cds_id_area .cds_name_inline").remove();
		var formula_cds_name=$("#textarea_cds").html();
		var formula_cds_id=$(".formula_cds_id_area").text().replace(/\s/g,'');
		
		callFlashSlideInModal("<b>Formula</b>: "+formula_cds_id,"#informationQuantity","error");
		
	});
	
	//check form end
	
	//click modal quality end.
	
	//calculation start
	$(document).on("click",".sum",function(){
		formulaEngineFn(this.id);
	});
	$(document).on("click",".average",function(){
		formulaEngineFn(this.id);
	});
	//calculation end
	
	
	$("#textarea_cds").keyup(function(){
		//console.log(IsNumericForCal($(this).text(),this));
		//IsNumericForCal($(this).text(),this);
	});
});