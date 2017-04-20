
var globalData="";

// funciton global start
//form2

//var connectionServiceFn = function(username,password){
//	$.ajax({
//		
//		url:restfulURL+"/tyw_api/public/session",
//		//url:"http://localhost/tyw_api/public/session",
//		type:"POST",
//		dataType:"text",
//		data:{"username":username,"password":password},
//		//data:{"username":"2015019","password":"2015019"},
//		error: function(jqXHR, textStatus, errorThrown) {
//			
//		},
//		success:function(data){
//			//console.log(data);
//			localStorage.setItem("tokenID",data);
//			console.log("Login is Success");
//			
//		}
//	})			
//}
var dropdownDeductScoreFn = function(score){
	htmlTemplateQuality = "";
	if(score==0){
		htmlTemplateQuality+="<option selected='selected'>0</option>";
		htmlTemplateQuality+="<option >1</option>";
		htmlTemplateQuality+="<option>2</option>";
		htmlTemplateQuality+="<option>3</option>";
		htmlTemplateQuality+="<option>4</option>";
	}else if(score==1){
		htmlTemplateQuality+="<option>0</option>";
		htmlTemplateQuality+="<option selected='selected'>1</option>";
		htmlTemplateQuality+="<option>2</option>";
		htmlTemplateQuality+="<option>3</option>";
		htmlTemplateQuality+="<option>4</option>";
	}else if(score==2){
		htmlTemplateQuality+="<option>0</option>";
		htmlTemplateQuality+="<option>1</option>";
		htmlTemplateQuality+="<option selected='selected'>2</option>";
		htmlTemplateQuality+="<option>3</option>";
		htmlTemplateQuality+="<option>4</option>";
	}else if(score==3){
		htmlTemplateQuality+="<option>0</option>";
		htmlTemplateQuality+="<option>1</option>";
		htmlTemplateQuality+="<option>2</option>";
		htmlTemplateQuality+="<option selected='selected'>3</option>";
		htmlTemplateQuality+="<option>4</option>";
	}else if(score==4){
		htmlTemplateQuality+="<option>0</option>";
		htmlTemplateQuality+="<option>1</option>";
		htmlTemplateQuality+="<option>2</option>";
		htmlTemplateQuality+="<option>3</option>";
		htmlTemplateQuality+="<option selected='selected'>4</option>";
	}
	
	
	return htmlTemplateQuality;
}
var assignTemplateQualityFn = function(structureName,data){
	var appraisal_item_result_id_array=[];
	var htmlTemplateQuality="";
	
	
	var hintCount = 0;
	var hintHtml="";
	$.each(data['hint'],function(index,indexEntry){
		if(hintCount==0){
			hintHtml+=indexEntry['hint'];
		}else{
			hintHtml+="<br>"+indexEntry['hint'];
		}
		hintCount++;
	});
	
	
	htmlTemplateQuality+="";
	htmlTemplateQuality+="<div class=\"row-fluid\">";
	htmlTemplateQuality+="<div class=\"span12\">";
	htmlTemplateQuality+="<div class=\"ibox-title2\">";

	//Appraisal Item Name,Target,Actual,Score,%Weight,Weight Score
	htmlTemplateQuality+="<div class='titlePanel'>"+structureName+"</div>";
		htmlTemplateQuality+="<div class='totalWeight'>Total Weight "+data['total_weight']+"%</div>";
	htmlTemplateQuality+="</div>";
	htmlTemplateQuality+="<div class=\"ibox-content\">";
	htmlTemplateQuality+="<div class=\"table-responsive scrollbar-inner\" style='overflow:auto;'>";
	htmlTemplateQuality+="<table id=\"tablethreshould\" class=\"table table-striped\">";
	htmlTemplateQuality+="<thead>";
		htmlTemplateQuality+="<tr>";
			htmlTemplateQuality+="<th style=\"width:35%\"><b>Appraisal Item Name</b></th>";
			htmlTemplateQuality+="<th style=\"width:15%\"><b>Target</b></th>";
			htmlTemplateQuality+="<th style=\"width:15%\"><b>Score</b></th>  ";      
			htmlTemplateQuality+="<th style=\"width:15%\"><b>%Weight</b></th>  ";   
			htmlTemplateQuality+="<th style=\"width:15%\"><b>Weight Score</b></th>  ";   
			htmlTemplateQuality+="</tr>";
				htmlTemplateQuality+="</thead>";
					htmlTemplateQuality+="<tbody id=\"\" class='appraisal_result'>";
					
					$.each(data['items'],function(index,indexEntry){
						
					appraisal_item_result_id_array.push(indexEntry['appraisal_item_result_id']);
						
						
					htmlTemplateQuality+="<tr>";
					
						htmlTemplateQuality+="<td class=''>"+indexEntry['appraisal_item_name']+"</td>";
						htmlTemplateQuality+="<td class='' ><div data-toggle=\"tooltip\" data-placement=\"left\" title=\""+hintHtml+"\">"+notNullFn(indexEntry['target_value'])+"</div></td>";
						
						htmlTemplateQuality+="<td class=''>";
						htmlTemplateQuality+="<select style='width:50px; height: 25px;padding: 0 0 0 5px;' id='competencyScore-"+indexEntry['appraisal_item_result_id']+"' class='competencyScore input form-control input-sm-small numberOnly'>";
							htmlTemplateQuality+=dropdownDeductScoreFn(notNullFn(indexEntry['score']));
						htmlTemplateQuality+="<select>";
						//htmlTemplateQuality+="<input style='width:80px;' id='competencyScore-"+indexEntry['appraisal_item_result_id']+"' class='competencyScore input form-control input-sm-small numberOnly' type='text' value="+notNullFn(indexEntry['score'])+">";
						htmlTemplateQuality+="</td>";
						htmlTemplateQuality+="<td class=''>"+notNullFn(indexEntry['weight_percent'])+"</td>";
						htmlTemplateQuality+="<td class=''>"+notNullFn(indexEntry['weigh_score'])+"</td>";
						
					htmlTemplateQuality+="</tr>";
					});
					
					htmlTemplateQuality+="<tr>";
					
						htmlTemplateQuality+="<td class=''></td>";
						htmlTemplateQuality+="<td class='' ></td>";
						htmlTemplateQuality+="<td class=''></td>";
						htmlTemplateQuality+="<td class='object-right'><b>Total</b></td>";
						htmlTemplateQuality+="<td class=''><b>"+notNullFn(data['total_weigh_score'])+"</b></td>";
						
					htmlTemplateQuality+="</tr>";
				
					htmlTemplateQuality+="</tbody>";
					htmlTemplateQuality+="</table>";
					
					//htmlTemplateQuality+="<div class='formName hidden'>form2</div>";
					htmlTemplateQuality+="<input type='hidden' id='structure_id-"+data['structure_id']+"' class='structure_id' value="+data['structure_id']+">";
					htmlTemplateQuality+="<input type='hidden' id='form-"+data['structure_id']+"' class='' value=\"form2\">";
					htmlTemplateQuality+="<input type='hidden' id='appraisal_item_result_id_array-"+data['structure_id']+"' class='appraisal_item_result_id_array' value=\""+appraisal_item_result_id_array+"\">";
					
					htmlTemplateQuality+="</div>";
					htmlTemplateQuality+="<br style=\"clear:both\">";				
		htmlTemplateQuality+="</div>";
	htmlTemplateQuality+="</div>";
htmlTemplateQuality+="</div>";
return htmlTemplateQuality;
//$("#appraisal_template_area").append(htmlTemplateQuality);

};

var assignTemplateDeductFn = function(structureName,data){
	
	var htmlTemplateDeduct="";
	htmlTemplateDeduct+="<div class=\"row-fluid\">";
	htmlTemplateDeduct+="<div class=\"span12\">";
	htmlTemplateDeduct+="<div class=\"ibox-title2\">";
	htmlTemplateDeduct+="<div class='titlePanel'>"+structureName+"</div>";
	htmlTemplateDeduct+="<div class='totalWeight'>Total Weight "+data['total_weight']+"%</div>";
	htmlTemplateDeduct+="</div>";
		
		htmlTemplateDeduct+="<div class=\"ibox-content\">";
		htmlTemplateDeduct+="<div class=\"table-responsive scrollbar-inner\" style='overflow:auto;'>";
		htmlTemplateDeduct+="<table id=\"tablethreshould\" class=\"table table-striped\">";
              		
		htmlTemplateDeduct+="<thead>";
			htmlTemplateDeduct+="<tr>";
				htmlTemplateDeduct+="<th style=\"width:35%\"><b>Appraisal Item Name</b></th>";
				htmlTemplateDeduct+="<th style=\"width:15%\"><b>Max Value</b></th>";
				htmlTemplateDeduct+="<th style=\"width:15%\"><b>Actual Value</b></th>";
				htmlTemplateDeduct+="<th style=\"width:15%\"><b>Over Value</b></th>";
				htmlTemplateDeduct+="<th style=\"width:15%\"><b>Deduct Score/Unit</b> </th>";
				htmlTemplateDeduct+="<th style=\"width:15%\"><b>Weight Score </b></th>";
			htmlTemplateDeduct+="</tr>";
			htmlTemplateDeduct+="</thead>";
					htmlTemplateDeduct+="<tbody id=\"\" class='appraisal_result'>";
					
					$.each(data['items'],function(index,indexEntry){
					htmlTemplateDeduct+="<tr>";
							htmlTemplateDeduct+="<td class=''>"+indexEntry['appraisal_item_name']+"</td>";
							htmlTemplateDeduct+="<td class=''>"+notNullFn(indexEntry['max_value'])+"</td>";
							htmlTemplateDeduct+="<td class=''>"+notNullFn(indexEntry['actual_value'])+"</td>";
							htmlTemplateDeduct+="<td class=''>"+notNullFn(indexEntry['over_value'])+"</td>";
							htmlTemplateDeduct+="<td class=''>"+notNullFn(indexEntry['deduct_score_unit'])+"</td>";
							htmlTemplateDeduct+="<td class=''>"+notNullFn(indexEntry['weigh_score'])+"</td>";
							
					htmlTemplateDeduct+="</tr>";
					});
					
					htmlTemplateDeduct+="<tr>";
							htmlTemplateDeduct+="<td class=''></td>";
							htmlTemplateDeduct+="<td class=''></td>";
							htmlTemplateDeduct+="<td class=''></td>";
							htmlTemplateDeduct+="<td class=''></td>";
							htmlTemplateDeduct+="<td class='object-right'><b>Total</b></td>";
							htmlTemplateDeduct+="<td class=''><b>"+notNullFn(data['total_weigh_score'])+"</b></td>";
					htmlTemplateDeduct+="</tr>";
			
						
					htmlTemplateDeduct+="</tbody>";
					htmlTemplateDeduct+="</table>";
					htmlTemplateDeduct+="<input type='hidden' id='structure_id-"+data['structure_id']+"' class='structure_id' value="+data['structure_id']+">";
					htmlTemplateDeduct+="<input type='hidden' id='form-"+data['structure_id']+"' class='' value=\"form3\">";
					
				htmlTemplateDeduct+="</div>";
			htmlTemplateDeduct+="<br style=\"clear:both\">"			
		htmlTemplateDeduct+="</div>";
		htmlTemplateDeduct+="</div>";
	htmlTemplateDeduct+="</div>";
	return htmlTemplateDeduct;
	//$("#appraisal_template_area").append(htmlTemplateDeduct);
};

var assignTemplateQuantityFn = function(structureName,data){
	var appraisal_item_result_id_array=[];
	var htmlTemplateQuantity = "";
	var hintCount = 0;
	var hintHtml="";
	$.each(data['hint'],function(index,indexEntry){
		if(hintCount==0){
			hintHtml+=index+" "+indexEntry['hint'];
		}else{
			hintHtml+="<br>"+index+" "+indexEntry['hint'];
		}
		hintCount++;
	});
	
	htmlTemplateQuantity+="<div class=\"row-fluid\">";
	htmlTemplateQuantity+="	<div class=\"span12\">";
	htmlTemplateQuantity+="  <div class=\"ibox-title2\">";
	
	htmlTemplateQuantity+="      <div class='titlePanel'>"+structureName+"</div>";
	htmlTemplateQuantity+="      <div class='totalWeight'>Total Weight "+data['total_weight']+"%</div>";
	htmlTemplateQuantity+="  </div>";
	htmlTemplateQuantity+="	<div class=\"ibox-content\">";
	htmlTemplateQuantity+=" <div class=\"table-responsive scrollbar-inner\" style='overflow:auto;'>";
	htmlTemplateQuantity+="<table id=\"tableAppraisalAssignment\" class=\"table table-striped\">";
	htmlTemplateQuantity+="<thead>";
		htmlTemplateQuantity+="<tr>";
			htmlTemplateQuantity+="<th style=\"width:10%\" class=''><b>Perspective</b> </th>";
			htmlTemplateQuantity+="<th style=\"width:25%\" class=''><b>Appraisal Item Name</b></th>";
			htmlTemplateQuantity+="<th style=\"width:5%\" class=''><b>Target </b></th>";
			htmlTemplateQuantity+="<th style=\"width:5%\" class=''><b>Actual </b></th>";
			htmlTemplateQuantity+="<th style=\"width:5%\" class=''><b>Score </b></th>";
			htmlTemplateQuantity+="<th style=\"width:5%\" class=''><b>%Weight </b></th>";
			htmlTemplateQuantity+="<th style=\"width:5%\" class=''><b>Weight Score</b> </th>";
			
		htmlTemplateQuantity+="</tr>";
		htmlTemplateQuantity+="</thead>";
			htmlTemplateQuantity+="<tbody id=\"\" class='appraisal_result'>";
			$.each(data['items'],function(index,indexEntry){
			
				
				appraisal_item_result_id_array.push(indexEntry['appraisal_item_result_id']);
				/*
				appraisal_item_result_id
				appraisal_item_name
				structure_id
				structure_name
				nof_target_score
				form_id
				form_name
				app_url
				weight_percent
				*/
				
				htmlTemplateQuantity+="<tr >";
					htmlTemplateQuantity+="<td>"+indexEntry['perspective_name']+"</td>";
					htmlTemplateQuantity+="<td>"+indexEntry['appraisal_item_name']+"</td>";
					htmlTemplateQuantity+="<td ><div title=\""+hintHtml+"\" data-toggle=\"tooltip\" data-html=\"true\" data-placement=\"left\" >"+notNullFn(indexEntry['target_value'])+"</div></td>";
					htmlTemplateQuantity+="<td>"+notNullFn(indexEntry['actual_value'])+"</td>";
					htmlTemplateQuantity+="<td>"+notNullFn(indexEntry['score'])+"</td>";
					htmlTemplateQuantity+="<td>"+notNullFn(indexEntry['weight_percent'])+"</td>";
					htmlTemplateQuantity+="<td>"+notNullFn(indexEntry['weigh_score'])+"</td>";
			
				htmlTemplateQuantity+="</tr>";
				
			});
			
			htmlTemplateQuantity+="<tr >";
				htmlTemplateQuantity+="<td></td>";
				htmlTemplateQuantity+="<td></td>";
				htmlTemplateQuantity+="<td ></td>";
				htmlTemplateQuantity+="<td></td>";
				htmlTemplateQuantity+="<td></td>";
				htmlTemplateQuantity+="<td class='object-right'><b>Total</b></td>";
				htmlTemplateQuantity+="<td><b>"+notNullFn(data['total_weigh_score'])+"</b></td>";
			htmlTemplateQuantity+="</tr>";
			
			htmlTemplateQuantity+="</tbody>";
			htmlTemplateQuantity+="</table>";
			htmlTemplateQuantity+="<input type='hidden' id='structure_id-"+data['structure_id']+"' class='structure_id' value="+data['structure_id']+">";
			htmlTemplateQuantity+="<input type='hidden' id='form-"+data['structure_id']+"' class='' value=\"form1\">";
			htmlTemplateQuantity+="<input type='hidden' id='appraisal_item_result_id_array-"+data['structure_id']+"' class='appraisal_item_result_id_array' value=\""+appraisal_item_result_id_array+"\">";
			
			
			htmlTemplateQuantity+="</div>";
			htmlTemplateQuantity+="<br style=\"clear:both\">";	
		htmlTemplateQuantity+="</div>";
	htmlTemplateQuantity+="</div>";
	htmlTemplateQuantity+="</div>";
	
	return htmlTemplateQuantity;
	//$("#appraisal_template_area").append(htmlTemplateQuantity);
	//console.log(data['count']);
	//console.log(data['structure_id']);
	
}


//function global start

var dropDrowYearListFn = function(nameArea,id){
	if(nameArea==undefined){
		nameArea="";
	}
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal/year_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//var data=['ทดลองงาน','ประจำปี','รักษาการ'];
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['appraisal_year']){
					htmlOption+="<option selected='selected' value="+indexEntry['appraisal_year']+">"+indexEntry['appraisal_year']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['appraisal_year']+">"+indexEntry['appraisal_year']+"</option>";
				}
			});
			$("#AppraisalYear"+nameArea).html(htmlOption);
		}
	});
}

var dropDrowPeriodListFn = function(year,id){

	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal/period_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"appraisal_year":year},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['period_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['period_id']+">"+indexEntry['appraisal_period_desc']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['period_id']+">"+indexEntry['appraisal_period_desc']+"</option>";
				}
			});
			$("#AppraisalPeriod").html(htmlOption);
		}
	});
}

var dropDrowAppraisalLevelFn = function(id){

	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal/al_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			htmlOption+="<option value=''>All</option>";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['appraisal_level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['appraisal_level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['appraisal_level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}
			});
			$("#AppraisalLevel").html(htmlOption);
		}
	});
}
var dropDrowDepartmentFn = function(id){

	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal/dep_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			htmlOption+="<option value=''>All</option>";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['department_code']){
					htmlOption+="<option selected='selected' value="+indexEntry['department_code']+">"+indexEntry['department_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['department_code']+">"+indexEntry['department_name']+"</option>";
				}
			});
			$("#Department").html(htmlOption);
		}
	});
}

var dropDrowSectionFn = function(department_code,id){

	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal/sec_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"department_code":department_code},
		success:function(data){
			var htmlOption="";
			htmlOption+="<option value=''>All</option>";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['section_code']){
					htmlOption+="<option selected='selected' value="+indexEntry['section_code']+">"+indexEntry['section_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['section_code']+">"+indexEntry['section_name']+"</option>";
				}
			});
			$("#Section").html(htmlOption);
		}
	});
}

var splitData = function(data){
	if(data.trim()!=""){
		data = data.split("-");
		data=data[0];
	}else{
		data="";
	}
	return data;
}

var listAppraisalDetailFn = function(data){
	//console.log(data);
	console.log('-----------');
	$("#appraisal_template_area").empty();
	$.each(data['group'],function(index,groupEntry){
		
//		console.log(index);
//		console.log(groupEntry['form_url']);
		
		if(groupEntry['form_url']=='quantity'){			
			$("#appraisal_template_area").append(assignTemplateQuantityFn(index,groupEntry));
			//$("#appraisal_template_area").append(assignTemplateQualityFn(index,groupEntry));
		}else if(groupEntry['form_url']=='quality'){
			$("#appraisal_template_area").append(assignTemplateQualityFn(index,groupEntry));
		}else if(groupEntry['form_url']=='deduct'){
			$("#appraisal_template_area").append(assignTemplateDeductFn(index,groupEntry));
		}

		//binding tooltip start
		 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
		 $('[data-toggle="tooltip"]').tooltip({
			 html:true
		 });
		//binding tooltip end
		
		//set header start
		 $("#txtEmpCode").html(data['head'][0]['emp_code']);
		 $("#txtEmpName").html(data['head'][0]['emp_name']);
		 $("#txtPosition").html(data['head'][0]['position_name']);
		 $("#txtDepartment").html(data['head'][0]['department_name']);
		 $("#txtSection").html(data['head'][0]['section_name']);
		 
		 $("#txtChiefEmpCode").html(data['head'][0]['chief_emp_code']);
		 $("#txtChiefEmpName").html(data['head'][0]['chief_emp_name']);
		 $("#txtAppraisalType").html(data['head'][0]['appraisal_type_name']);
		 $("#txtPeriod").html(data['head'][0]['appraisal_period_desc']);
		 $("#txtGrandTotalWeigh").html(data['head'][0]['result_score']);
		 
		 
		 
		 jQuery('.numberOnly').keyup(function () { 
		    this.value = this.value.replace(/[^0-9\.]/g,'');
		});
		//set header end

	});
	
	dropDrowAsignToEditFn(data['head'][0]['stage_id']);
	$("#assignTo").off("change");
	$("#assignTo").on("change",function(){
		//alert($(this).val());
		dropDrowActionEditFn(data['head'][0]['stage_id'],$(this).val());
		
	});
	$("#assignTo").change();
	$("#ModalAppraisal").modal();
	
};
var findOneFn = function(id){

	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal/"+id,
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			
			listAppraisalDetailFn(data);
			
			
		}
	});
	
	
}

var listDataFn = function(data){
	htmlHTML="";

//	$.each(data,function(index,indexEntry){
//		/*
//	emp_result_id
//	emp_code
//	emp_name
//	appraisal_level_name
//	appraisal_type_name
//	position_name
//	assign
//	to_action
//		*/
//		
//		htmlHTML+="<tr>";
//		
//		htmlHTML+="	<td class=''><a href=\"#\" class='emp_code' id=\"id-"+indexEntry['emp_result_id']+"\" >"+indexEntry['emp_code']+"</a></td>";
//		htmlHTML+=" <td>"+indexEntry['emp_name']+"</td>";
//		htmlHTML+=" <td>"+indexEntry['appraisal_level_name']+"</td>";
//		htmlHTML+=" <td>"+indexEntry['appraisal_type_name']+"</td>";
//		htmlHTML+="	<td>"+indexEntry['position_name']+"</td>";
//		htmlHTML+="	<td>"+indexEntry['assign']+"</td>";
//		htmlHTML+="	<td>"+indexEntry['to_action']+"</td>";
//		
//		htmlHTML+="</tr>";
//		
//	});

	
	

	htmlHTML="";
	$.each(data['group'],function(index,indexEntry){
		//console.log(index);
//	console.log(indexEntry['items']);
//	console.log(indexEntry['appraisal_period_desc']);
	
	htmlHTML+="<div class=\"row-fluid\">";
	htmlHTML+="<div class=\"span12\">";
	htmlHTML+="<div class=\"ibox-title2\">";
	htmlHTML+="<div class=\"titlePanel2\">"+indexEntry['appraisal_period_desc']+" </div> ";
            
	htmlHTML+="</div>";
			
		htmlHTML+="<div class=\"ibox-content\">";
					
					
		htmlHTML+="<div class=\"table-responsive\" style='overflow:auto;'>";
		htmlHTML+="<table id=\"tablethreshould\" class=\"table table-striped\">";
           		
		htmlHTML+=" <thead>";
			htmlHTML+=" <tr>";
			
				htmlHTML+=" <th style=\"width:auto;\"><b>Emp Code</b></th>";
				htmlHTML+=" <th style=\"widthauto;\"><b>Emp Name</b></th>";
				htmlHTML+=" <th style=\"width:auto;\"><b>Appraisal Level</b> </th>";
				htmlHTML+=" <th style=\"width:auto;\"><b>Appraisal Type </b></th>";
				htmlHTML+=" <th style=\"width:auto;\"><b>Position</b> </th>";
				htmlHTML+=" <th style=\"width:auto;\"><b>Assign To</b></th>";
				htmlHTML+=" <th style=\"width:auto;\"><b>Action</b></th>";
			
				
//				emp_code
//				emp_name
//				appraisal_level_name
//				appraisal_type_name
//				position_name
//				assign
//				to_action
				
	htmlHTML+=" </tr>";
		htmlHTML+=" </thead>";
			htmlHTML+=" <tbody>";
			$.each(indexEntry['items'],function(index2,itemEntry){	
				
		
				htmlHTML+="<tr>";
				
				htmlHTML+="	<td class=''><a href=\"#\" class='emp_code' id=\"id-"+itemEntry['emp_result_id']+"\" >"+itemEntry['emp_code']+"</a>";
				htmlHTML+="<input type='hidden' name='emp_appraisal_type_id-"+itemEntry['emp_result_id']+"' id='emp_appraisal_type_id-"+itemEntry['emp_result_id']+"' class='emp_appraisal_type_id' value='"+itemEntry['appraisal_type_id']+"' >";
				htmlHTML+="<input type='hidden' name='emp_period_id-"+itemEntry['emp_result_id']+"' id='emp_period_id-"+itemEntry['emp_result_id']+"' class='emp_period_id' value='"+itemEntry['period_id']+"' >";
				htmlHTML+="<input type='hidden' name='emp_emp_code-"+itemEntry['emp_result_id']+"' id='emp_emp_code-"+itemEntry['emp_result_id']+"' class='emp_emp_code' value='"+itemEntry['emp_code']+"' >";
				htmlHTML+="<input type='hidden' name='emp_appraisal_item_id-"+itemEntry['emp_result_id']+"' id='emp_appraisal_item_id-"+itemEntry['emp_result_id']+"' class='emp_appraisal_item_id' value='"+itemEntry['appraisal_item_id']+"' >";
				htmlHTML+"</td>";
				htmlHTML+=" <td>"+itemEntry['emp_name']+"</td>";
				htmlHTML+=" <td>"+itemEntry['appraisal_level_name']+"</td>";
				htmlHTML+=" <td>"+itemEntry['appraisal_type_name']+"</td>";
				htmlHTML+="	<td>"+itemEntry['position_name']+"</td>";
				htmlHTML+="	<td>"+itemEntry['assign']+"</td>";
				htmlHTML+="	<td>"+itemEntry['to_action']+"</td>";
				
				htmlHTML+="</tr>";
					
			
			});
			htmlHTML+=" </tbody>";
			htmlHTML+="  </table>";
			
			htmlHTML+=" </div>";
			htmlHTML+="</div>";
		htmlHTML+="</div>";
	htmlHTML+="</div>";

	});
	
	$("#listAppraisal").html(htmlHTML);
}
var getDataFn = function(page,rpp){

	/*
	embed_AppraisalYear
	embed_AppraisalPeriod
	embed_AppraisalLevel
	embed_Department
	embed_Section
	embed_Position
	embed_EmpName
	embed_appraisalType
	*/
	
	var AppraisalYear = $("#embed_AppraisalYear").val();
	var AppraisalPeriod= $("#embed_AppraisalPeriod").val();
	var AppraisalLevel= $("#embed_AppraisalLevel").val();
	var Department= $("#embed_Department").val();
	var Section= $("#embed_Section").val();
	var Position= $("#embed_Position").val();
	
	var EmpName= ($("#embed_EmpName").val());
	var EmpCode=EmpName.split('-');
	EmpCode=EmpCode[0];
	
	var appraisal_type_id= ($("#embed_appraisalType").val());
	
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			"page":page,
			"rpp":rpp,	
			"appraisal_year":AppraisalYear,
			"period_no":AppraisalPeriod,
			"appraisal_level_id":AppraisalLevel,
			"department_code":Department,
			"section_code":Section,
			"position_code":Position,
			"emp_code":EmpCode,
			"appraisal_type_id":appraisal_type_id
		
			
		},
		success:function(data){
			
			//console.log(data);
			
			listDataFn(data);
			globalData=data;
			paginationSetUpFn(globalData['current_page'],globalData['last_page'],globalData['last_page']);
			$(".search_result").show();
		}
	});
};

//SearchAdvance
var searchAdvanceFn = function() {
	
	/*
	AppraisalYear
	AppraisalPeriod
	AppraisalLevel
	Department
	Section
	Position
	EmpName
	*/
	
	var Position= $("#Position").val().split("-");
	Position=Position[0];
	
	$(".embed_param_search").remove();
	var embedParam="";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_AppraisalYear' name='embed_AppraisalYear' value='"+$("#AppraisalYear").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_AppraisalPeriod' name='embed_AppraisalPeriod' value='"+$("#AppraisalPeriod").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_AppraisalLevel' name='embed_AppraisalLevel' value='"+$("#AppraisalLevel").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_Department' name='embed_Department' value='"+$("#Department").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_Section' name='embed_Section' value='"+$("#Section").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_Position' name='embed_Position' value='"+Position+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_EmpName' name='embed_EmpName' value='"+$("#EmpName").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisalType' name='embed_appraisalType' value='"+$("#appraisalType").val()+"'>";
	
	$("#embedParamSearch").append(embedParam);
	
	getDataFn();
};
var dropDrowAsignToEditFn = function(paramStageID){

	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal/edit_assign_to",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"stage_id":paramStageID},
		success:function(data){
			//var data=['ทดลองงาน','ประจำปี','รักษาการ'];
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['to_appraisal_level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['to_appraisal_level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['to_appraisal_level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}
			});
			$("#assignTo").html(htmlOption);
		}
	});
}
var dropDrowActionEditFn = function(stage_id,to_appraisal_level_id){
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal/edit_action_to",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"stage_id":stage_id,"to_appraisal_level_id":to_appraisal_level_id},
		success:function(data){
			//var data=['ทดลองงาน','ประจำปี','รักษาการ'];
			if(data==''){
				$("#btnSubmit").attr("disabled","disabled");
			}else{
				$("#btnSubmit").removeAttr("disabled");
			}
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['stage_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['stage_id']+">"+indexEntry['to_action']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['stage_id']+">"+indexEntry['to_action']+"</option>";
				}
			});
			$("#actionToAssign").html(htmlOption);
		}
	});
}

var appraisalTypeFn = function(nameArea,id){
	
	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		//http://192.168.1.52/tyw_api/public/appraisal_assignment/appraisal_type_list
		url:restfulURL+"/tyw_api/public/appraisal_assignment/appraisal_type_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//var data=['ทดลองงาน','ประจำปี','รักษาการ'];
			var htmlOption="";
			
			htmlOption+="<option  value=''>All</option>";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['appraisal_type_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['appraisal_type_id']+">"+indexEntry['appraisal_type_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['appraisal_type_id']+">"+indexEntry['appraisal_type_name']+"</option>";
					
				}
			});
			$("#appraisalType"+nameArea).html(htmlOption);
		}
	});
}
var validationAppraisalFn = function(data){

	var errorData="";
	var count=0;
	
	
	errorData=stripJsonToString(data['data']);

	return errorData;
	
}

var saveAppraisalFn = function(){
	
	
//	"stage_id,
//	appraisal: [
//	  {
//	     appraisal_item_result_id: '',
//	     score: ''
//	  },...
//	]"
	var appraisal=""; 
	appraisal+="[";
	$.each($(".competencyScore").get(),function(index,indexEntry){
		var appraisal_item_result_id=$(indexEntry).attr("id");
		appraisal_item_result_id=appraisal_item_result_id.split("-");
		appraisal_item_result_id=appraisal_item_result_id[1];
		
		if(index==0){
			appraisal+="{";
		}else{
			appraisal+=",{";
		}
		appraisal+="\"appraisal_item_result_id\":\""+appraisal_item_result_id+"\",";
		appraisal+="\"score\":\""+$(indexEntry).val()+"\"";
		
		appraisal+="}";
	});
	appraisal+="]";
	var appraisalObject=eval("("+appraisal+")");
	//console.log(appraisal);
	
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal/"+$("#emp_result_id").val(),
		type:"patch",
		dataType:"json",
		async:false,
		data:{
			"stage_id":$("#actionToAssign").val(),
			"appraisal":appraisalObject
			},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			if(data['status']==200){
				
				
				$("#ModalAppraisal").modal('hide');
				callFlashSlide("Saved.");
				
			}else if(data['status']==400){
				
				
				callFlashSlideInModal(validationAppraisalFn(data),"#information","error");    
			}
		}
	});
}


var calculateBunusFn= function(){
	/*
	appraisal_type_id,
	period_id,
	emp_code,
	appraisal_item_id
	*/
	
//	$.ajax({
//		url:restfulURL+"/tyw_api/public/appraisal/calculate_weight",
//		type:"post",
//		dataType:"json",
//		async:false,
//		headers:{Authorization:"Bearer "+tokenID.token},
//		data:{
//			"appraisal_type_id":"",
//			"period_id":"",
//			"emp_code":"",
//			"appraisal_item_id":"",
//			
//		},
//		success:function(data){
//			if(data['status']==200){
//				
//				
//				
//			}else if(data['status']==400){
//				
//				callFlashSlide(validationFn(data),"error");  
//				
//			}
//		}
//	});
}
//function getParamValue(paramName)
//{
//    var url = window.location.search.substring(1); //get rid of "?" in querystring
//    var qArray = url.split('&'); //get key-value pairs
//    for (var i = 0; i < qArray.length; i++) 
//    {
//        var pArr = qArray[i].split('='); //split key and value
//        if (pArr[0] == paramName) 
//            return pArr[1]; //return value
//    }
//}



$(document).ready(function() {
	
	
//	var username = getParamValue('username');
//	var password = getParamValue('password');
	var username = $('#user_portlet').val();
	var password = $('#pass_portlet').val();
	/*Fixed for Test.*/
//	 username = "1";
//	 password =	"11";
	
	if(username!="" && username!=null & username!=[] && username!=undefined ){
		if(connectionServiceFn(username,password)==true){
	
		
	
	
	
	$("#assignTo").removeAttr("disabled");
	$("#actionToAssign").removeAttr("disabled");
	$("#btnSubmit").removeAttr("disabled");
	
	//set parameter start
		dropDrowYearListFn();
		$("#AppraisalYear").change(function(){
			dropDrowPeriodListFn($(this).val());	
		});
		$("#AppraisalYear").change();
		
		dropDrowAppraisalLevelFn();
		dropDrowDepartmentFn();
		
		$("#Department").change(function(){
			dropDrowSectionFn($(this).val());	
		});
		$("#Department").change();
		
		//Auto complete Start
		//http://192.168.1.52/tyw_api/public/appraisal_assignment/auto_position_name
		$("#Position").autocomplete({
	        source: function (request, response) {
	        	$.ajax({
					 url:restfulURL+"/tyw_api/public/appraisal/auto_position_name",
					 type:"get",
					 dataType:"json",
					 headers:{Authorization:"Bearer "+tokenID.token},
					 data:{"position_name":request.term,"section_code":$("#Section").val(),"department_code":$("#Department").val()},
					 //async:false,
	                 error: function (xhr, textStatus, errorThrown) {
	                        console.log('Error: ' + xhr.responseText);
	                    },
					 success:function(data){
							response($.map(data, function (item) {
	                            return {
	                                label: item.position_code+"-"+item.position_name,
	                                value: item.position_code+"-"+item.position_name
	                            };
	                        }));
					},
					beforeSend:function(){
						$("body").mLoading('hide');	
					}
					
					});
	        }
	    });
	
		$("#EmpName").autocomplete({
	        source: function (request, response) {
	        	$.ajax({
					 url:restfulURL+"/tyw_api/public/appraisal/auto_employee_name",
					 type:"get",
					 dataType:"json",
					 headers:{Authorization:"Bearer "+tokenID.token},
					 data:{"emp_name":request.term,"section_code":$("#Section").val(),
						 "position_code":splitData($("#Position").val()),"department_code":$("#Department").val()},
					 //async:false,
	                 error: function (xhr, textStatus, errorThrown) {
	                        console.log('Error: ' + xhr.responseText);
	                    },
					 success:function(data){
							response($.map(data, function (item) {
	                            return {
	                                label: item.emp_code+"-"+item.emp_name,
	                                value: item.emp_code+"-"+item.emp_name
	                            };
	                        }));
					},
					beforeSend:function(){
						$("body").mLoading('hide');	
					}
					
					});
	        }
	    });
		appraisalTypeFn();
	//set parameter end
		
		
		//search
		$("#btnSearchAdvance").click(function(){
			searchAdvanceFn();
			$(".countPagination").val(10);
			$("#rpp").remove();
		});
		
		//get appraisal detail.
		$(document).off("click",".emp_code");
		$(document).on("click",".emp_code",function(){	

		
			var id=this.id.split("-");
			id=id[1];
			findOneFn(id);
			$("#emp_result_id").val(id);
			//sessionStorage.getItem("tokenID");
			
			sessionStorage.setItem('appraisal_type_id',$('#emp_appraisal_type_id-'+id).val());
			sessionStorage.setItem('period_id',$('#emp_period_id-'+id).val());
			sessionStorage.setItem('emp_code',$('#emp_emp_code-'+id).val());
			sessionStorage.setItem('appraisal_item_id',$('#emp_appraisal_item_id-'+id).val());
			
			
			//alert($('#emp_appraisal_item_id-'+id).val());
//			console.log(sessionStorage.getItem("appraisal_type_id"));
//			console.log(sessionStorage.getItem("period_id"));
//			console.log(sessionStorage.getItem("emp_code"));
//			console.log(sessionStorage.getItem("appraisal_item_id"));
			$(window).scrollTop(0);
			$(".modal-body").scrollTop(0);

			return false;
		});
		
		//submit
		$("#btnSubmit").click(function(){
			
			saveAppraisalFn();
			
			
		});
		
		}
	}
});
