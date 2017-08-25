
var globalData="";
var phaseArray=[];
var globalCount=0;

// funciton global start
//form2

//var connectionServiceFn = function(username,password){
//	$.ajax({
//		
//		url:restfulURL+"/see_api/public/session",
//		//url:"http://localhost/see_api/public/session",
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

//List Error Function Start
var listErrorActionPlanFn =function(data){
	var errorData="";
	
	
		
			if(data[0]['action_plan_name']!=undefined){
				errorData+="Error Task Name <b>"+data[0]['action_plan_name']+"</b><br>";
			}
			
			if(data[0]['error']!=undefined){
				$.each(data[0]['error'],function(index,indexEntry){
					
						errorData+="<b>"+index+"</b>:"+indexEntry+"<br>";
					
				});
			}
			
			
	
	return errorData;
}
//List Error Function End
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
	//has weight
	if(data['no_weight']==0){
			htmlTemplateQuality+="<tr>";
				htmlTemplateQuality+="<th style=\"width:40%\"><b>Appraisal Item Name</b></th>";
				htmlTemplateQuality+="<th style='width:15%;text-align: right;'><b>Target</b></th>";
				htmlTemplateQuality+="<th style='width:10%;text-align: center;'><b>Score</b></th>  ";      
				htmlTemplateQuality+="<th style='width:15%;text-align: right;'><b>%Weight</b></th>  ";   
				htmlTemplateQuality+="<th style='width:15%;text-align: right;'><b>Weight Score</b></th>  ";   
			htmlTemplateQuality+="</tr>";
	}else{
		
		htmlTemplateQuality+="<tr>";
			htmlTemplateQuality+="<th style=\"width:40%\"><b>Appraisal Item Name</b></th>";
			htmlTemplateQuality+="<th style='width:15%;text-align: right;'><b>Target</b></th>";
			htmlTemplateQuality+="<th style='width:10%;text-align: center;'><b>Score</b></th>  ";      
		 
		htmlTemplateQuality+="</tr>";
	}
				htmlTemplateQuality+="</thead>";
					htmlTemplateQuality+="<tbody id=\"\" class='appraisal_result'>";
					
					$.each(data['items'],function(index,indexEntry){
						
					appraisal_item_result_id_array.push(indexEntry['appraisal_item_result_id']);
						
					//has weight
						if(data['no_weight']==0){
							htmlTemplateQuality+="<tr>";
							
								htmlTemplateQuality+="<td class=''>"+indexEntry['item_name']+"</td>";
								htmlTemplateQuality+="<td class='' style='text-align: right;padding-right: 10px;'><div data-toggle=\"tooltip\" data-placement=\"right\" title=\""+hintHtml+"\">"+addCommas(parseFloat(notNullFn(indexEntry['target_value'])).toFixed(2))+"</div></td>";
								
								htmlTemplateQuality+="<td class='' style='text-align: center;'>";
								htmlTemplateQuality+="<select style='width:50px; height: 25px;padding: 0 0 0 5px;' id='competencyScore-"+indexEntry['appraisal_item_result_id']+"' class='competencyScore input form-control input-sm-small numberOnly'>";
									htmlTemplateQuality+=dropdownDeductScoreFn(notNullFn(indexEntry['score']));
								htmlTemplateQuality+="<select>";
								//htmlTemplateQuality+="<input style='width:80px;' id='competencyScore-"+indexEntry['appraisal_item_result_id']+"' class='competencyScore input form-control input-sm-small numberOnly' type='text' value="+notNullFn(indexEntry['score'])+">";
								htmlTemplateQuality+="</td>";
								htmlTemplateQuality+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['weight_percent'])).toFixed(2))+"</td>";
								htmlTemplateQuality+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['weigh_score'])).toFixed(2))+"</td>";
								
							htmlTemplateQuality+="</tr>";	
						}else{
							htmlTemplateQuality+="<tr>";
							
								htmlTemplateQuality+="<td class=''>"+indexEntry['item_name']+"</td>";
								htmlTemplateQuality+="<td class='' style='text-align: right;padding-right: 10px;'><div data-toggle=\"tooltip\" data-placement=\"right\" title=\""+hintHtml+"\">"+addCommas(parseFloat(notNullFn(indexEntry['target_value'])).toFixed(2))+"</div></td>";
								
								htmlTemplateQuality+="<td class='' style='text-align: center;'>";
								htmlTemplateQuality+="<select style='width:50px; height: 25px;padding: 0 0 0 5px;' id='competencyScore-"+indexEntry['appraisal_item_result_id']+"' class='competencyScore input form-control input-sm-small numberOnly'>";
									htmlTemplateQuality+=dropdownDeductScoreFn(notNullFn(indexEntry['score']));
								htmlTemplateQuality+="<select>";
								//htmlTemplateQuality+="<input style='width:80px;' id='competencyScore-"+indexEntry['appraisal_item_result_id']+"' class='competencyScore input form-control input-sm-small numberOnly' type='text' value="+notNullFn(indexEntry['score'])+">";
								htmlTemplateQuality+="</td>";
							
								
							htmlTemplateQuality+="</tr>";
						}
					});
					
					//has weight
					if(data['no_weight']==0){
						htmlTemplateQuality+="<tr>";
						
							htmlTemplateQuality+="<td class=''></td>";
							htmlTemplateQuality+="<td class='' ></td>";
							htmlTemplateQuality+="<td class=''></td>";
							htmlTemplateQuality+="<td class='object-right' style='text-align: right;padding-right: 10px;font-weight: bold;'><b>Total</b></td>";
							htmlTemplateQuality+="<td class='' style='text-align: right;padding-right: 10px;font-weight: bold;font-size:16px'><b>"+addCommas(parseFloat(notNullFn(data['total_weigh_score'])).toFixed(2))+"</b></td>";
							
						htmlTemplateQuality+="</tr>";
					}
				
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
		//has weight
		if(data['no_weight']==0){
			
		
			htmlTemplateDeduct+="<tr>";
				htmlTemplateDeduct+="<th style=\"width:30%\"><b>Appraisal Item Name</b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>Max Value</b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>Actual Value</b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>Over Value</b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>Deduct Score/Unit</b> </th>";
				htmlTemplateDeduct+="<th style='width:20%;text-align: right;'><b>Weight Score </b></th>";
			htmlTemplateDeduct+="</tr>";
		}else{
			htmlTemplateDeduct+="<tr>";
				htmlTemplateDeduct+="<th style=\"width:35%\"><b>Appraisal Item Name</b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>Max Value</b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>Actual Value</b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>Over Value</b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>Deduct Score/Unit</b> </th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>Score </b></th>";
			htmlTemplateDeduct+="</tr>";
		}
			htmlTemplateDeduct+="</thead>";
					htmlTemplateDeduct+="<tbody id=\"\" class='appraisal_result'>";
					
					$.each(data['items'],function(index,indexEntry){
						
						//has weight
						if(data['no_weight']==0){
							htmlTemplateDeduct+="<tr>";
									htmlTemplateDeduct+="<td class=''> "+indexEntry['item_name']+"</td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['max_value'])).toFixed(2))+"</td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['actual_value'])).toFixed(2))+"</td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['over_value'])).toFixed(2))+"</td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['deduct_score_unit'])).toFixed(2))+"</td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['weigh_score'])).toFixed(2))+"</td>";
									
							htmlTemplateDeduct+="</tr>";
						}else{
							htmlTemplateDeduct+="<tr>";
									htmlTemplateDeduct+="<td class=''> "+indexEntry['item_name']+"</td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['max_value'])).toFixed(2))+"</td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['actual_value'])).toFixed(2))+"</td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['over_value'])).toFixed(2))+"</td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['deduct_score_unit'])).toFixed(2))+"</td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['score'])).toFixed(2))+"</td>";
									
							htmlTemplateDeduct+="</tr>";
						}
					});
					if(data['no_weight']==0){
						htmlTemplateDeduct+="<tr>";
								htmlTemplateDeduct+="<td class=''></td>";
								htmlTemplateDeduct+="<td class=''></td>";
								htmlTemplateDeduct+="<td class=''></td>";
								htmlTemplateDeduct+="<td class=''></td>";
								htmlTemplateDeduct+="<td class='object-right' style='text-align: right;padding-right: 10px;font-weight: bold;'><b>Total</b></td>";
								htmlTemplateDeduct+="<td class=''  style='text-align: right;padding-right: 10px;font-weight: bold; font-size:16px'><b>"+addCommas(parseFloat(notNullFn(data['total_weigh_score'])).toFixed(2))+"</b></td>";
						htmlTemplateDeduct+="</tr>";
					}
			
						
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
	
	//has weight
	if(data['no_weight']==0){
		
		htmlTemplateQuantity+="<tr>";
		
			htmlTemplateQuantity+="<th style=\"width:10%\" class=''><b>Perspective</b> </th>";
			htmlTemplateQuantity+="<th style=\"width:20%\" class=''><b>Appraisal Item Name</b></th>";
			htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>Target </b></th>";
			htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>Actual </b></th>";
			htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>%Achievement </b></th>";
			htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>%Weight </b></th>";
			htmlTemplateQuantity+="<th style='width:10%;text-align: right;' class=''><b>Weight Score</b> </th>";
			htmlTemplateQuantity+="<th style='width:7%;text-align: center;' class=''><b>Manage</b> </th>";
			
		htmlTemplateQuantity+="</tr>";
		
	}else{
	//no_weight	
		htmlTemplateQuantity+="<tr>";
			htmlTemplateQuantity+="<th style=\"width:10%\" class=''><b>Perspective</b> </th>";
			htmlTemplateQuantity+="<th style=\"width:20%\" class=''><b>Appraisal Item Name</b></th>";
			htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>Target </b></th>";
			htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>Actual </b></th>";
			htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>Score </b></th>";
			htmlTemplateQuantity+="<th style='width:7%;text-align: center;' class=''><b>Manage</b> </th>";
		htmlTemplateQuantity+="</tr>";
	}
	
		htmlTemplateQuantity+="</thead>";
			htmlTemplateQuantity+="<tbody id=\"\" class='appraisal_result'>";
			$.each(data['items'],function(index,indexEntry){
			
				
				appraisal_item_result_id_array.push(indexEntry['appraisal_item_result_id']);
				/*
				appraisal_item_result_id
				item_name
				structure_id
				structure_name
				nof_target_score
				form_id
				form_name
				app_url
				weight_percent
				*/
				//has weight
				if(data['no_weight']==0){
					htmlTemplateQuantity+="<tr >";
						htmlTemplateQuantity+="<td>"+indexEntry['perspective_name']+"</td>";
						htmlTemplateQuantity+="<td>"+indexEntry['item_name']+"</td>";
						htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'><div title=\""+hintHtml+"\" data-toggle=\"tooltip\" data-html=\"true\" data-placement=\"right\" >"+addCommas(parseFloat(notNullFn(indexEntry['target_value'])).toFixed(2))+"</div></td>";
						htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['actual_value'])).toFixed(2))+"</td>";
						htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['achievement'])))+"</td>";
						htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['weight_percent'])).toFixed(2))+"</td>";
						htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['weigh_score'])).toFixed(2))+"</td>";
						
	
						htmlTemplateQuantity+="	<td style=\"text-align:center\">";
						htmlTemplateQuantity+=" <i data-trigger=\"focus\" tabindex=\""+index+"\" data-content=\"&lt;button class='btn btn-warning btn-small btn-gear phase' id='phase-"+indexEntry['appraisal_item_result_id']+"-"+indexEntry['emp_id']+"-"+indexEntry['emp_name']+"' data-target=#addModalRule data-toggle='modal'&gt;Phase&lt;/button&gt;&nbsp;&lt;button id='action_plan-"+indexEntry['item_result_id']+"-"+indexEntry['emp_id']+"-"+indexEntry['emp_name']+"' class='btn btn-danger btn-small btn-gear action_plan'&gt;Action Plan&lt;/button&gt;\" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-edit-del\" data-original-title=\"\" title=\"\"></i>";
						htmlTemplateQuantity+="	</td>";
							
					htmlTemplateQuantity+="</tr>";
				}else{
					//no_weight	
					htmlTemplateQuantity+="<tr >";
						htmlTemplateQuantity+="<td>"+indexEntry['perspective_name']+"</td>";
						htmlTemplateQuantity+="<td>"+indexEntry['item_name']+"</td>";
						htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'><div title=\""+hintHtml+"\" data-toggle=\"tooltip\" data-html=\"true\" data-placement=\"right\" >"+addCommas(parseFloat(notNullFn(indexEntry['target_value'])).toFixed(2))+"</div></td>";
						htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['actual_value'])).toFixed(2))+"</td>";
						htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['score'])))+"</td>";
						htmlTemplateQuantity+="	<td style=\"text-align:center\">";
						htmlTemplateQuantity+=" <i data-trigger=\"focus\" tabindex=\""+index+"\" data-content=\"&lt;button class='btn btn-warning btn-small btn-gear phase' id='phase-"+indexEntry['appraisal_item_result_id']+"-"+indexEntry['emp_id']+"-"+indexEntry['emp_name']+"' data-target=#addModalRule data-toggle='modal'&gt;Phase&lt;/button&gt;&nbsp;&lt;button id='action_plan-"+indexEntry['item_result_id']+"-"+indexEntry['emp_id']+"-"+indexEntry['emp_name']+"' class='btn btn-danger btn-small btn-gear action_plan'&gt;Action Plan&lt;/button&gt;\" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-edit-del\" data-original-title=\"\" title=\"\"></i>";
						htmlTemplateQuantity+="	</td>";
							
					htmlTemplateQuantity+="</tr>";
				}
				
			});
			
			if(data['no_weight']==0){
				htmlTemplateQuantity+="<tr >";
					htmlTemplateQuantity+="<td></td>";
					htmlTemplateQuantity+="<td></td>";
					htmlTemplateQuantity+="<td ></td>";
					htmlTemplateQuantity+="<td></td>";
					htmlTemplateQuantity+="<td></td>";
					htmlTemplateQuantity+="<td></td>";
					htmlTemplateQuantity+="<td class='object-right' style='text-align: right;padding-right: 10px;font-weight: bold;'><b>Total</b></td>";
					htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;font-weight: bold; font-size:16px;'><b>"+addCommas(parseFloat(notNullFn(data['total_weigh_score'])).toFixed(2))+"</b></td>";
				htmlTemplateQuantity+="</tr>";
			}
			
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
		url:restfulURL+"/see_api/public/appraisal/year_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//var data=['à¸—à¸”à¸¥à¸­à¸‡à¸‡à¸²à¸™','à¸›à¸£à¸°à¸ˆà¸³à¸›à¸µ','à¸£à¸±à¸�à¸©à¸²à¸�à¸²à¸£'];
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
		url:restfulURL+"/see_api/public/appraisal/period_list",
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
		url:restfulURL+"/see_api/public/appraisal/al_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			htmlOption+="<option value=''>All Appraisal Level</option>";
			$.each(data,function(index,indexEntry){
				
				if(id==indexEntry['level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}
			});
			$("#AppraisalLevel").html(htmlOption);
		}
	});
}
var dropDrowDepartmentFn = function(id){

	$.ajax({
		url:restfulURL+"/see_api/public/appraisal/dep_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			htmlOption+="<option value=''>All Department</option>";
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
var dropDrowOrgFn = function(id){

	$.ajax({
		url:restfulURL+"/see_api/public/appraisal/auto_org_name",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			htmlOption+="<option value=''>All Organization</option>";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['org_code']){
					htmlOption+="<option selected='selected' value="+indexEntry['org_code']+">"+indexEntry['org_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['org_code']+">"+indexEntry['org_name']+"</option>";
				}
			});
			$("#organization").html(htmlOption);
		}
	});
}

var dropDrowSectionFn = function(department_code,id){

	$.ajax({
		url:restfulURL+"/see_api/public/appraisal/sec_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"department_code":department_code},
		success:function(data){
			var htmlOption="";
			htmlOption+="<option value=''>All Section</option>";
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

	$("#appraisal_template_area").empty();
	$.each(data['group'],function(index,groupEntry){
		
		
		if(groupEntry['form_url']=='quantity'){			
			$("#appraisal_template_area").append(assignTemplateQuantityFn(index,groupEntry));
			
			
			/*bindding popover start*/
			$(".popover-edit-del").popover();
			$(".appraisal_result").off("click",".popover-edit-del");
			$(".appraisal_result").on("click",".popover-edit-del",function(){
				
				
				//action_plan Start
				$(".action_plan").on("click",function() {
					
					$("#informConfirm").empty();
					var id=this.id.split("-");
					id=id[1];
					$("#actionPlanModal").modal();
					
					getActionPlanFn(id);
					$("#action_actionplan").val("add");
					
					
					
				});
				//phase Start
				$(".phase").on("click",function() {
					//alert("phase3");
					clearFormPhaseFn();
					$("#informConfirm").empty();
					var id=this.id.split("-");
					id=id[1];
					$("#phaseModal").modal();
					getPhaseFn();
				});
				
				
			});	
			/*bindding popover end*/
			
			
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
		 if($("#embed_appraisalType").val()==1){
			 
			 $("#orgInformation").hide();
			 $("#empInformation").show();
			 $("#titlePanelInformation").html("Employee Information");
		 
			 $("#txtEmpCode").html(data['head'][0]['emp_code']);
			 $("#txtEmpName").html(data['head'][0]['emp_name']);
			 $("#txtPosition").html(data['head'][0]['position_name']);
			 $("#txtOrgName").html(data['head'][0]['org_name']);
			
			 $("#txtChiefEmpCode").html(data['head'][0]['chief_emp_code']);
			 $("#txtChiefEmpName").html(data['head'][0]['chief_emp_name']);
			 $("#txtAppraisalType").html(data['head'][0]['appraisal_type_name']);
			 $("#txtPeriod").html(data['head'][0]['appraisal_period_desc']);
			 $("#txtGrandTotalWeigh").html(data['head'][0]['result_score']);
		 
		 }else if($("#embed_appraisalType").val()==2){
			 
			 $("#orgInformation").show();
			 $("#empInformation").hide();
			 $("#titlePanelInformation").html("Organization Information");
			 
			 $("#txtOrgCodeOrg").html(data['head'][0]['org_code']);
			 $("#txtOrgNameOrg").html(data['head'][0]['org_name']);
			 $("#txtParentOrganizationOrg").html(data['head'][0]['parent_org_name']);
			 $("#txtPeriodOrg").html(data['head'][0]['appraisal_period_desc']);
			 $("#txtGrandTotalWeighOrg").html(data['head'][0]['result_score']);
			 
		 }
		 
			var getSelectionStart = function (o) {
				if (o.createTextRange) {
					var r = document.selection.createRange().duplicate()
					r.moveEnd('character', o.value.length)
					if (r.text == '') return o.value.length
					return o.value.lastIndexOf(r.text)
				} else return o.selectionStart
			};
			jQuery('.numberOnly').keypress(function (evt) { 
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
		//set header end

	});
	
//	dropDrowAsignToEditFn(data['head'][0]['stage_id']);
//	$("#assignTo").off("change");
//	$("#assignTo").on("change",function(){
//		dropDrowActionEditFn(data['head'][0]['stage_id'],$(this).val());
//		
//	});
	dropDrowActionEditFn(data['head'][0]['stage_id']);
	$("#assignTo").change();
	$("#ModalAppraisal").modal();
	
	
	
	
	//Stage History List Data..
	var htmlStage="";
	$.each(data['stage'],function(index,indexEntry){
	
		htmlStage+="<tr >";
			htmlStage+="<td>"+indexEntry['created_by']+"</td>";
			htmlStage+="<td>"+indexEntry['created_dttm']+"</td>";
			htmlStage+="<td>"+indexEntry['from_action']+"</td>";
			htmlStage+="<td>"+indexEntry['to_action']+"</td>";
			htmlStage+="<td>"+indexEntry['remark']+"</td>";
		htmlStage+="</tr>";
    
	});
	$("#listDataStageHistory").html(htmlStage);
	$("#slideUpDownStageHistory").show();
	//Stage History List Data..
	
	
	//Button Click Stage History Start.
	
	$("#slideUpDownStageHistory").click(function(){
		$("#slideStageHistory").slideToggle();
		return false;
	});
	
	//Button Click Stage History End.
	
};
var findOneFn = function(id){

	$.ajax({
		url:restfulURL+"/see_api/public/appraisal/"+id,
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			
			listAppraisalDetailFn(data);

		}
	});
	
	
}


var dropdownListPhaseFn_bk = function(nameArea,id){
	if(nameArea==undefined){
		nameArea="";
	}

	
	/*
	 	"phase_id": 1,
        "phase_name": "Alpha"
	*/
	$.ajax({
		url:restfulURL+"/see_api/public/appraisal/phase_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			
			var htmlOption="";
			htmlOption+="<select id='phase_list' name='phase_list' class='input-small' style=\"height:22px; margin-right:3px;\">";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['phase_id']){
					htmlOption+="<option selected value='"+indexEntry['phase_id']+"'>"+indexEntry['phase_name']+"</option>";
				}else{
					htmlOption+="<option  value='"+indexEntry['phase_id']+"'>"+indexEntry['phase_name']+"</option>";
					
				}
			});
			htmlOption+="</select>";
			return htmlOption;
			//$("#uom"+nameArea).html(htmlOption);
			
		}
	});
	
}

var dropdownListPhaseFn = function(){
	phaseArray=[];
	$.ajax({
		url:restfulURL+"/see_api/public/appraisal/phase_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			if(data!="" && data!=[]){
			
				$.each(data,function(index,indexEntry){
					phaseArray.push(indexEntry);
				});
				
			}
			//$("#uom"+nameArea).html(htmlOption);
			
		}
	});
	
}



var listActionPlanFn = function(data){
	
	dropdownListPhaseFn();
	 $("#action_new_actionplan").val("");

	//Map Data ...
	/*
	alert(notNullFn(data['header']['target_value']));
	alert(parseFloat(data['header']['target_value']).toFixed(2));
	alert(addCommas(parseFloat(notNullFn(data['header']['target_value'])).toFixed(2)));
	*/
	
	
	$("#actionPlanOrganization").html(data['header']['org_name']);
	$("#actionPlanAppraisalItem").html(data['header']['item_name']);
	$("#actionPlanTarget").html(addCommas(parseFloat(notNullFn(data['header']['target_value'])).toFixed(2)));
	
	$("#actionPlanForecastResult").html(addCommas(parseFloat(notNullFn(data['header']['forecast_value'])).toFixed(2)));
	$("#actionPlanActual").html(addCommas(parseFloat(notNullFn(data['header']['actual_value'])).toFixed(2)));
	$("#actionPlanActualVSforecast").html(addCommas(parseFloat(notNullFn(data['header']['actual_vs_forecast'])).toFixed(2)));
	$("#actionPlanActualVSTarget").html(addCommas(parseFloat(notNullFn(data['header']['actual_vs_target'])).toFixed(2)));
	
	$("#actionplan_emp_name").val(data['header']['emp_name']);
	$("#actionplan_emp_id").val(data['header']['emp_id']);
	$("#item_result_id").val(data['header']['item_result_id']);
	
	
	
	
	
	var htmlTR="";
	$.each(data['actions'],function(index,indexEntry){
		 
		/*
action_plan_id
action_plan_name
actual_cost
actual_end_date
actual_start_date

created_by
created_dttm
earned_value
emp_id
item_result_id
phase_id
phase_name
plan_end_date
plan_start_date
plan_value

update_by
update_dttm
		 */
		
	
	
		htmlTR+="";
		htmlTR+="<tr>";
			htmlTR+="<td>";
			htmlTR+="<center>";
			htmlTR+="<input type='checkbox' name='action_plan_id-"+indexEntry['action_plan_id']+"' id='action_plan_id-"+indexEntry['action_plan_id']+"' class='action_plan_id' value='"+indexEntry['action_plan_id']+"'>";
			htmlTR+="</center>";
			htmlTR+="</td>";
			htmlTR+="<td><div class='actionplan_label'>"+indexEntry['action_plan_name']+"</div>";
			htmlTR+="<input class='actionplan_input' style=\"height:20px;margin-right:3px; width:200px;\" type='text' id='action_plan_name-"+indexEntry['action_plan_id']+"' name='action_plan_name-"+indexEntry['action_plan_id']+"' value='"+indexEntry['action_plan_name']+"'>";
			htmlTR+="</td>";
			
			htmlTR+="<td>";
			htmlTR+="<div class='actionplan_label'>"+indexEntry['plan_start_date']+"</div>";
			
			htmlTR+="<input type='text' name='plan_start_date-"+indexEntry['action_plan_id']+"' id='plan_start_date-"+indexEntry['action_plan_id']+"' class='datepicker input-small actionplan_input' style=\"height:20px;margin-right:3px;\" value='"+indexEntry['plan_start_date']+"'>";
			
			htmlTR+="</td>";
			htmlTR+="<td>";
			htmlTR+="<div class='actionplan_label'>"+indexEntry['plan_end_date']+"</div>";
			htmlTR+="<input type='text' name='plan_end_date-"+indexEntry['action_plan_id']+"' id='plan_end_date-"+indexEntry['action_plan_id']+"' class='datepicker input-small actionplan_input' style=\"height:20px;margin-right:3px;\" value='"+indexEntry['plan_end_date']+"'>";
			
			htmlTR+="</td>";
			htmlTR+="<td>";
			htmlTR+="<div class='actionplan_label'>"+indexEntry['actual_start_date']+"</div>";
			htmlTR+="<input type='text' name='actual_start_date-"+indexEntry['action_plan_id']+"' id='actual_start_date-"+indexEntry['action_plan_id']+"' class='datepicker input-small actionplan_input' style=\"height:20px;margin-right:3px;\" value='"+indexEntry['actual_start_date']+"'>";
			
			htmlTR+="</td>";
			htmlTR+="<td>";
			htmlTR+="<div class='actionplan_label'>"+indexEntry['actual_end_date']+"</div>";
			htmlTR+="<input type='text' name='actual_end_date-"+indexEntry['action_plan_id']+"' id='actual_end_date-"+indexEntry['action_plan_id']+"' class='datepicker input-small actionplan_input' style=\"height:20px; margin-right:3px;\" value='"+indexEntry['actual_end_date']+"'>";
			htmlTR+="</td>";
			htmlTR+="<td id='phast_list_area-"+indexEntry['action_plan_id']+"'>";
			htmlTR+="<div class='actionplan_label'>"+indexEntry['phase_name']+"</div>";
			htmlTR+="<select id='phase_list-"+indexEntry['action_plan_id']+"' name='phase_list-"+indexEntry['action_plan_id']+"' class='input-small actionplan_input' style=\"height:22px; margin-right:3px;\">";
			$.each(phaseArray,function(index2,indexEntry2){
				//console.log(indexEntry['phase_id']+"=="+indexEntry2['phase_id']);
				
				if(indexEntry['phase_id']==indexEntry2['phase_id']){
					htmlTR+="<option selected value='"+indexEntry2['phase_id']+"'>"+indexEntry2['phase_name']+"</option>";
				}else{
					htmlTR+="<option value='"+indexEntry2['phase_id']+"'>"+indexEntry2['phase_name']+"</option>";
				}
			});
			htmlTR+="</select>";
			htmlTR+="</td>";
			
			htmlTR+="<td>";
			if(indexEntry['responsible']!="" && indexEntry['responsible']!=null ){
				htmlTR+="<div class='actionplan_label'>"+indexEntry['emp_id']+"-"+indexEntry['responsible']+"</div>";
				htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='responsible-"+indexEntry['action_plan_id']+"' class='responsible actionplan_input' name='responsible-"+indexEntry['action_plan_id']+"' value='"+indexEntry['emp_id']+"-"+indexEntry['responsible']+"'>";
			}else{
				htmlTR+="<div class='actionplan_label'></div>";
				htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='responsible-"+indexEntry['action_plan_id']+"' class='responsible actionplan_input' name='responsible-"+indexEntry['action_plan_id']+"' value=''>";
			}
			
			htmlTR+="</td>";
			
			htmlTR+="<td>";
			htmlTR+="<div class='actionplan_label'><center>"+addCommas(parseFloat(notNullFn(indexEntry['completed_percent'])).toFixed(2))+"</center></div>";//Completed
			htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='completed_percent-"+indexEntry['action_plan_id']+"' class='actionplan_input' name='completed_percent-"+indexEntry['action_plan_id']+"' value='"+indexEntry['completed_percent']+"'>";//Completed
			
			htmlTR+="</td>";
			htmlTR+="<td>";
			htmlTR+="<div class='actionplan_label'><center>"+addCommas(parseFloat(notNullFn(indexEntry['plan_value'])).toFixed(2))+"</center></div>";//PV
			htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='plan_value-"+indexEntry['action_plan_id']+"' name='plan_value-"+indexEntry['action_plan_id']+"' class='actionplan_input' value='"+indexEntry['plan_value']+"'>";//PV
			
			htmlTR+="</td>";
			htmlTR+="<td>";
			htmlTR+="<div class='actionplan_label'><center>"+addCommas(parseFloat(notNullFn(indexEntry['actual_cost'])).toFixed(2))+"</center></div>";//AC
			htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='actual_cost-"+indexEntry['action_plan_id']+"' name='actual_cost-"+indexEntry['action_plan_id']+"' class='actionplan_input' value='"+indexEntry['actual_cost']+"'>";//AC
			
			htmlTR+="</td>";
			htmlTR+="<td>";
			htmlTR+="<div class='actionplan_label'><center>"+addCommas(parseFloat(notNullFn(indexEntry['earned_value'])).toFixed(2))+"</center></div>";//EV
			htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='earned_value-"+indexEntry['action_plan_id']+"' name='earned_value-"+indexEntry['action_plan_id']+"' class='actionplan_input' value='"+indexEntry['earned_value']+"'>";//EV
			htmlTR+="</td>";
		htmlTR+="</tr>";
	});
	
	
	
		
	
		
	

	$("#listDataActionPlan").html(htmlTR);
	$(".actionplan_input").hide();
	
	
	
//	 $( ".datepicker" ).datepicker({
//	        showOn: "button",
//	        buttonImage: "../../see-kpi-portlet/img/calendar.gif",
//	        buttonImageOnly: true,
//	        buttonText: "Select date"
//	      });
	//2017-08-22
//	 	 $(".datepicker").datepicker();
//	 	 $(".datepicker").datepicker( "option", "dateFormat", "yy-mm-dd" );
	    //target,over_target,center,performance2,performance1
	
	
	/*
	 data['header']['target_value']
	 data['header']['forecast_value']
	 data['header']['actual_value']
	 data['header']['actual_vs_forecast']
	 data['header']['actual_vs_target']
	 
	 */
	//parseFloat(notNullFn(data['header']['target_value'])).toFixed(2);
	
	   
	    
	    $("#actualvsForecastBar").sparkline([0,0,parseFloat(notNullFn(data['header']['target_value'])).toFixed(2),parseFloat(notNullFn(data['header']['actual_vs_forecast'])).toFixed(2),parseFloat(notNullFn(data['header']['actual_vs_forecast'])).toFixed(2)], {
	        type: 'bullet',
	        targetColor: '#7f94ff',
	        performanceColor: '#7f94ff',
	        rangeColors: ['#d3dafe','#7f94ff','#7f94ff ']});
	    
	    
	    $("#actualvsTargetBar").sparkline([0,0,parseFloat(notNullFn(data['header']['target_value'])).toFixed(2),parseFloat(notNullFn(data['header']['actual_vs_target'])).toFixed(2),parseFloat(notNullFn(data['header']['actual_vs_target'])).toFixed(2)], {
	        type: 'bullet',
	        targetColor: '#7f94ff',
	        performanceColor: '#7f94ff',
	        rangeColors: ['#d3dafe','#7f94ff','#7f94ff ']});
	    
	    
	    $(".jqstooltip").hide();
	    
	
	    
	    
	 
}

var insertActionPlanInlineFn = function(){	
	
	
	var htmlTR = ""
			/*
			htmlTableInline+="<tr >";	
			htmlTableInline+="<td><input id='new_seq-"+globalCount+"'  class=\"form-control input-inline-table input-seq new-condition\" type=\"text\" name=\"\"";
			htmlTableInline+="</td>";
			htmlTableInline+="<td>";
			htmlTableInline+="<select id='new_operator-"+globalCount+"' class=\"form-control input-inline-table input-contact-selecttype new-condition\" ><option>or</option> <option selected>and</option></select>";
			htmlTableInline+="</td>";
		    htmlTableInline+="<td>";
		    htmlTableInline+="<p>"+rule_name+"<input type='hidden' id='new_rule_id-"+globalCount+"' value="+rule_id+"></p>";
		    htmlTableInline+="</td>";
			htmlTableInline+="<td>";
			htmlTableInline+="<input id='new_complete-"+globalCount+"' type=\"checkbox\" class='new_complete_flag'>";
			htmlTableInline+="</td>";
			htmlTableInline+="<td ><button class='btn btn-danger btn-xs  deleteNewAction Plan new-condition' type='button' id='"+globalCount+"'>Delete</button></td>";
			//htmlTableInline+="<td ><i class=\"fa fa-gear font-management font-management2  new-condition\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-danger btn-xs deleteAction Plan deleteNewAction Plan new-condition' type='button' id='"+globalCount+"'>Delete</button>\"></i></td>";
			htmlTableInline+="</tr>";
			*/
			
			htmlTR+="<tr>";
				htmlTR+="<td>";
				htmlTR+="<center>";
				htmlTR+="<input type='checkbox' name='new_action_plan_id-"+globalCount+"' id='new_action_plan_id-"+globalCount+"' class='new_action_plan_id' value=''>";
				htmlTR+="</center>";
				htmlTR+="</td>";
				htmlTR+="<td><input style=\"height:20px;margin-right:3px; width:200px;\" type='text' id='new_action_plan_name-"+globalCount+"' name='new_action_plan_name-"+globalCount+"' value=''></td>";
				htmlTR+="<td>";
				htmlTR+="<input type='text' name='new_plan_start_date-"+globalCount+"' id='new_plan_start_date-"+globalCount+"' class='datepicker input-small' style=\"height:20px;margin-right:3px;\" value=''>";
				htmlTR+="</td>";
				htmlTR+="<td>";
				htmlTR+="<input type='text' name='new_plan_end_date-"+globalCount+"' id='new_plan_end_date-"+globalCount+"' class='datepicker input-small' style=\"height:20px;margin-right:3px;\" value=''>";
				htmlTR+="</td>";
				htmlTR+="<td>";
				htmlTR+="<input type='text' name='new_actual_start_date-"+globalCount+"' id='new_actual_start_date-"+globalCount+"' class='datepicker input-small' style=\"height:20px;margin-right:3px;\" value=''>";
				htmlTR+="</td>";
				htmlTR+="<td>";
				htmlTR+="<input type='text' name='new_actual_end_date-"+globalCount+"' id='new_actual_end_date-"+globalCount+"' class='datepicker input-small' style=\"height:20px; margin-right:3px;\" value=''>";
				htmlTR+="</td>";
				htmlTR+="<td id='new_phast_list_area-"+globalCount+"'>";
				htmlTR+="<select id='new_phase_list-"+globalCount+"' name='new_phase_list-"+globalCount+"' class='input-small' style=\"height:22px; margin-right:3px;\">";
					$.each(phaseArray,function(index2,indexEntry2){
						
						htmlTR+="<option value='"+indexEntry2['phase_id']+"'>"+indexEntry2['phase_name']+"</option>";
					});
				htmlTR+="</select>";
				htmlTR+="</td>";
				htmlTR+="<td>";
				if($("#actionplan_emp_id").val()!=""){
					htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='new_responsible-"+globalCount+"' class='new_responsible' name='new_responsible-"+globalCount+"' value='"+$("#actionplan_emp_id").val()+"-"+$("#actionplan_emp_name").val()+"'>";
					
				}else{
					htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='new_responsible-"+globalCount+"' class='new_responsible' name='new_responsible-"+globalCount+"' value=''>";
					
				}
				htmlTR+="</td>";
				htmlTR+="<td>";
				htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='new_completed_percent-"+globalCount+"' name='new_completed_percent-"+globalCount+"' value=''>";//Completed
				htmlTR+="</td>";
				htmlTR+="<td>";
				htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='new_plan_value-"+globalCount+"' name='new_plan_value-"+globalCount+"' value=''>";//PV
				htmlTR+="</td>";
				htmlTR+="<td>";
				htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='new_actual_cost-"+globalCount+"' name='new_actual_cost-"+globalCount+"' value=''>";//AC
				htmlTR+="</td>";
				htmlTR+="<td>";
				htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='new_earned_value-"+globalCount+"' name='new_earned_value-"+globalCount+"' value=''>";//EV
				htmlTR+="</td>";
			htmlTR+="</tr>";
			

		 $("#listDataActionPlan").append(htmlTR);
		 $(".datepicker").datepicker();
		 $(".datepicker").datepicker( "option", "dateFormat", "yy-mm-dd" );
		 
		 //Autocomplete START.
		 $(".new_responsible").autocomplete({
		        source: function (request, response) {
		        	$.ajax({
						 url:restfulURL+"/see_api/public/appraisal/action_plan/auto_employee_name",
						 type:"get",
						 dataType:"json",
						 headers:{Authorization:"Bearer "+tokenID.token},
						 data:{
							 "emp_name":request.term,
							 },
						 //async:false,
		                 error: function (xhr, textStatus, errorThrown) {
		                        console.log('Error: ' + xhr.responseText);
		                    },
						 success:function(data){
								response($.map(data, function (item) {
		                            return {
		                                label: item.emp_id+"-"+item.emp_name,
		                                value: item.emp_id+"-"+item.emp_name
		                            };
		                        }));
						},
						beforeSend:function(){
							$("body").mLoading('hide');	
						}
						
						});
		        }
		    });
		 //Autocomplete END.
		 
		 //$('[data-toggle="popover"]').popover();  
		 globalCount++;
}


var getActionPlanFn = function(id){
	globalCount=0;
	$.ajax({
		url:restfulURL+"/see_api/public/appraisal/action_plan/"+id,
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//console.log(data);
			listActionPlanFn(data);
		}
	});
	
}
var deletePhaseFn = function(id){
	
	 $.ajax({
		      url:restfulURL+"/see_api/public/phase/"+id,
		      type:"DELETE",
		      dataType:"json",
			  headers:{Authorization:"Bearer "+tokenID.token},
			  success:function(data){ 
				if(data['status']==200){
					
					   callFlashSlide("Delete Successfully.");       
				       getPhaseFn();
					   $("#confrimModal").modal('hide');
					   
				}else if(data['status']=="400"){
					
					//$("#informConfirm").html("<font color='red'>"+data['data']+"</font>");
					callFlashSlide("<font color=''>"+data['data']+"</font>","error");  
					
				}
		     }
		   });
}
var findOnePhaseFn = function(id){
	
	//get structure

	
	//get data for structure
	$.ajax({
		url:restfulURL+"/see_api/public/phase/"+id,
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
		
/*
				"{

			    ""phase_id"": 4,
			    ""phase_name"": ""Ceta"",
			    ""is_active"": 1

			}"
*/				$("#phaseName").val(data['phase_name']);
				if(data['is_active']==1){
					$("#phaseIsActive").prop('checked',true);
				}else{
					$("#phaseIsActive").prop('checked',false);
				}

				$("#phase_action").val("edit");
				$("#pahse_id_edit").val(id);
		
			
			
		}
	});
	
}
var listPhaseFn = function(data){
	var htmlTR="";
	
	//Exsample Data 
	/*
	phase_id
	phase_name
	is_active
	*/
	$.each(data,function(index,indexEntry){
		htmlTR+="<tr>";
			htmlTR+="<td>"+indexEntry['phase_id']+"</td>";
			htmlTR+="<td>"+indexEntry['phase_name']+"</td>";
			if(indexEntry['is_active']==1){
				htmlTR+="<td style='text-align:center;'><input disabled checked type='checkbox' id='' name=''></td>";
			}else{
				htmlTR+="<td style='text-align:center;'><input disabled type='checkbox' id='' name=''></td>";
			}
			
			htmlTR+="<td style='text-align:center;'>";
	
			htmlTR+=" <i data-trigger=\"focus\" tabindex=\""+index+"\" data-content=\"&lt;button class='btn btn-warning btn-small btn-gear edit_phase' id=edit_phase-"+indexEntry['phase_id']+" data-target=#addModalRule data-toggle='modal'&gt;Edit&lt;/button&gt;&nbsp;&lt;button id=del_phase-"+indexEntry['phase_id']+" class='btn btn-danger btn-small btn-gear phaseDel'&gt;Del&lt;/button&gt;\" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-edit-del\" data-original-title=\"\" title=\"\"></i>";
			
			htmlTR+="</td>";
		htmlTR+="</tr>";
	});
	
	
	
	$("#listDataPhase").html(htmlTR);
	
	/*bindding popover start*/
	$(".popover-edit-del").popover();
	$("#listDataPhase").off("click",".popover-edit-del");
	$("#listDataPhase").on("click",".popover-edit-del",function(){
		//Delete Start
		$(".phaseDel").on("click",function() {
			$("#informConfirm").empty();
			var id=this.id.split("-");
			id=id[1];
			$("#confrimModal").modal();
			//$(this).parent().parent().parent().children().click();
			$(document).off("click","#btnConfirmOK");
			$(document).on("click","#btnConfirmOK",function(){
				//alert(id);
				deletePhaseFn(id);
				
			});
			
		});
		//findOne Start
		$(".edit_phase").on("click",function() {
			
			$(window).scrollTop(0);
			var edit=this.id.split("-");
			var id=edit[1];
			//alert(id+"-----"+form_url);
			findOnePhaseFn(id);
			$(".modal-body").scrollTop(0);
		});
	});	
	/*bindding popover end*/
	
	
	
}
var clearFormPhaseFn = function(){
	 $("#phaseName").val("");
	 $("#pahse_id_edit").val("");
	 $("#phase_action").val("add");
	 $("#phaseIsActive").prop('checked',false);
}
var getPhaseFn = function(){
	
	$.ajax({
		url:restfulURL+"/see_api/public/phase",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//console.log(data);
			listPhaseFn(data);
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
				
			if($("#embed_appraisalType").val()=="1"){
				
				htmlHTML+=" <th style=\"width:auto;\"><b>Emp Code</b></th>";
				htmlHTML+=" <th style=\"widthauto;\"><b>Emp Name</b></th>";
				htmlHTML+=" <th style=\"width:auto;\"><b>Appraisal Level</b> </th>";
				htmlHTML+=" <th style=\"width:auto;\"><b>Organization </b></th>";
				htmlHTML+=" <th style=\"width:auto;\"><b>Position</b> </th>";
				htmlHTML+=" <th style=\"width:auto;\"><b>Action</b></th>";
				htmlHTML+=" <th style=\"width:auto; text-align:center;\"><b>Manage</b></th>";
				
			}else if($("#embed_appraisalType").val()=="2"){
				
				htmlHTML+=" <th style=\"width:auto;\"><b>Org Code</b></th>";
				htmlHTML+=" <th style=\"widthauto;\"><b>Org Name</b></th>";
				htmlHTML+=" <th style=\"width:auto;\"><b>Appraisal Level</b> </th>";
				htmlHTML+=" <th style=\"width:auto;\"><b>Action</b></th>";
				htmlHTML+=" <th style=\"width:auto; text-align:center;\"><b>Manage</b></th>";
				
			}
				
			
				
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
				
		
				if($("#embed_appraisalType").val()=="1"){
					
				
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
						
						htmlHTML+="	<td>"+itemEntry['to_action']+"</td>";
						htmlHTML+="	<td style=\"text-align:center\">";
						htmlHTML+=" <i data-trigger=\"focus\" tabindex=\""+index2+"\" data-content=\"&lt;button class='btn btn-warning btn-small btn-gear phase' id=phase-"+itemEntry['org_code']+" data-target=#addModalRule data-toggle='modal'&gt;Phase&lt;/button&gt;&nbsp;&lt;button id=action_plan-"+itemEntry['org_code']+" class='btn btn-danger btn-small btn-gear action_plan'&gt;Action Plan&lt;/button&gt;\" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-edit-del\" data-original-title=\"\" title=\"\"></i>";
						htmlHTML+="	</td>";
					
					htmlHTML+="</tr>";
					
				}else if($("#embed_appraisalType").val()=="2"){
					
					htmlHTML+="<tr>";
					
						htmlHTML+="	<td class=''><a href=\"#\" class='emp_code' id=\"id-"+itemEntry['emp_result_id']+"\" >"+itemEntry['org_code']+"</a>";
						htmlHTML+="<input type='hidden' name='emp_appraisal_type_id-"+itemEntry['emp_result_id']+"' id='emp_appraisal_type_id-"+itemEntry['emp_result_id']+"' class='emp_appraisal_type_id' value='"+itemEntry['appraisal_type_id']+"' >";
						htmlHTML+="<input type='hidden' name='emp_period_id-"+itemEntry['emp_result_id']+"' id='emp_period_id-"+itemEntry['emp_result_id']+"' class='emp_period_id' value='"+itemEntry['period_id']+"' >";
						htmlHTML+="<input type='hidden' name='emp_emp_code-"+itemEntry['emp_result_id']+"' id='emp_emp_code-"+itemEntry['emp_result_id']+"' class='emp_emp_code' value='"+itemEntry['emp_code']+"' >";
						htmlHTML+="<input type='hidden' name='emp_appraisal_item_id-"+itemEntry['emp_result_id']+"' id='emp_appraisal_item_id-"+itemEntry['emp_result_id']+"' class='emp_appraisal_item_id' value='"+itemEntry['appraisal_item_id']+"' >";
						htmlHTML+"</td>";
						htmlHTML+=" <td>"+itemEntry['org_name']+"</td>";
						htmlHTML+=" <td>"+itemEntry['appraisal_level_name']+"</td>";
					
						htmlHTML+="	<td>"+itemEntry['to_action']+"</td>";
						htmlHTML+="	<td style=\"text-align:center\">";
						htmlHTML+=" <i data-trigger=\"focus\" tabindex=\""+index2+"\" data-content=\"&lt;button class='btn btn-warning btn-small btn-gear phase' id=phase-"+itemEntry['org_code']+" data-target=#addModalRule data-toggle='modal'&gt;Phase&lt;/button&gt;&nbsp;&lt;button id=action_plan-"+itemEntry['org_code']+" class='btn btn-danger btn-small btn-gear action_plan'&gt;Action Plan&lt;/button&gt;\" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-edit-del\" data-original-title=\"\" title=\"\"></i>";
						htmlHTML+="	</td>";
					
					htmlHTML+="</tr>";
				}
					
			
			});
			htmlHTML+=" </tbody>";
			htmlHTML+="  </table>";
			
			htmlHTML+=" </div>";
			htmlHTML+="</div>";
		htmlHTML+="</div>";
	htmlHTML+="</div>";

	});
	
	$("#listAppraisal").html(htmlHTML);
	
	/*bindding popover start*/
	$(".popover-edit-del").popover();
	$("#listAppraisal").off("click",".popover-edit-del");
	$("#listAppraisal").on("click",".popover-edit-del",function(){
		
		//action_plan Start
		$(".action_plan").on("click",function() {
			
			$("#informConfirm").empty();
			var id=this.id.split("-");
			id=id[1];
			$("#actionPlanModal").modal();
			
			getActionPlanFn("3");
			$("#action_actionplan").val("add");
			
			
			
		});
		//phase Start
		$(".phase").on("click",function() {
			//alert("phase3");
			clearFormPhaseFn();
			$("#informConfirm").empty();
			var id=this.id.split("-");
			id=id[1];
			$("#phaseModal").modal();
			getPhaseFn();
		});
		
		
	});	
	/*bindding popover end*/
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
	var Organization= $("#embed_Org").val();
	var org_id=Organization.split('-');
	org_id=org_id[0];
	//var Section= $("#embed_Section").val();
	var Position= $("#embed_Position").val();
	var EmpName= ($("#embed_EmpName").val());
	var EmpID=EmpName.split('-');
	EmpID=EmpID[0];
	
	var appraisal_type_id= ($("#embed_appraisalType").val());
	
	$.ajax({
		url:restfulURL+"/see_api/public/appraisal",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			"page":page,
			"rpp":rpp,	
			"appraisal_year":AppraisalYear,
			"period_no":AppraisalPeriod,
			"level_id":AppraisalLevel,
			"org_id":org_id,
			"position_id":Position,
			"emp_id":EmpID,
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
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_Org' name='embed_Org' value='"+$("#organization").val()+"'>";
	//embedParam+="<input type='hidden' class='embed_param_search' id='embed_Section' name='embed_Section' value='"+$("#Section").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_Position' name='embed_Position' value='"+Position+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_EmpName' name='embed_EmpName' value='"+$("#EmpName").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisalType' name='embed_appraisalType' value='"+$("#appraisalType").val()+"'>";
	
	$("#embedParamSearch").append(embedParam);
	
	getDataFn();
};
var dropDrowAsignToEditFn = function(paramStageID){

	$.ajax({
		url:restfulURL+"/see_api/public/appraisal/edit_assign_to",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"stage_id":paramStageID},
		success:function(data){
			//var data=['à¸—à¸”à¸¥à¸­à¸‡à¸‡à¸²à¸™','à¸›à¸£à¸°à¸ˆà¸³à¸›à¸µ','à¸£à¸±à¸�à¸©à¸²à¸�à¸²à¸£'];
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
		url:restfulURL+"/see_api/public/appraisal/edit_action_to",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"stage_id":stage_id,"to_appraisal_level_id":to_appraisal_level_id},
		success:function(data){
			//var data=['à¸—à¸”à¸¥à¸­à¸‡à¸‡à¸²à¸™','à¸›à¸£à¸°à¸ˆà¸³à¸›à¸µ','à¸£à¸±à¸�à¸©à¸²à¸�à¸²à¸£'];
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
		//http://192.168.1.52/see_api/public/appraisal_assignment/appraisal_type_list
		url:restfulURL+"/see_api/public/appraisal_assignment/appraisal_type_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//var data=['à¸—à¸”à¸¥à¸­à¸‡à¸‡à¸²à¸™','à¸›à¸£à¸°à¸ˆà¸³à¸›à¸µ','à¸£à¸±à¸�à¸©à¸²à¸�à¸²à¸£'];
			var htmlOption="";
			
			//htmlOption+="<option  value=''>All Appraisal Type</option>";
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
		url:restfulURL+"/see_api/public/appraisal/"+$("#emp_result_id").val(),
		type:"patch",
		dataType:"json",
		async:false,
		data:{
			"stage_id":$("#actionToAssign").val(),
			"remark":$("#remark_footer").val(),
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
//		url:restfulURL+"/see_api/public/appraisal/calculate_weight",
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
//				callFlashSlide(validationFn(data),"error");Â Â 
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
		//dropDrowOrgFn();
		//dropDrowDepartmentFn();
		
//		$("#Department").change(function(){
//			dropDrowSectionFn($(this).val());	
//		});
//		$("#Department").change();
		
		//Auto complete Start
		//http://192.168.1.52/see_api/public/appraisal_assignment/auto_position_name
		$("#Position").autocomplete({
	        source: function (request, response) {
	        	$.ajax({
					 url:restfulURL+"/see_api/public/appraisal/auto_position_name",
					 type:"get",
					 dataType:"json",
					 headers:{Authorization:"Bearer "+tokenID.token},
					 data:{"position_name":request.term},
					 //async:false,
	                 error: function (xhr, textStatus, errorThrown) {
	                        console.log('Error: ' + xhr.responseText);
	                    },
					 success:function(data){
							response($.map(data, function (item) {
	                            return {
	                                label: item.position_id+"-"+item.position_name,
	                                value: item.position_id+"-"+item.position_name
	                            };
	                        }));
					},
					beforeSend:function(){
						$("body").mLoading('hide');	
					}
					
					});
	        }
	    });
	
		
		$("#organization").autocomplete({
	        source: function (request, response) {
	        	$.ajax({
					 url:restfulURL+"/see_api/public/appraisal/auto_org_name",
					 type:"get",
					 dataType:"json",
					 headers:{Authorization:"Bearer "+tokenID.token},
					 data:{"org_name":request.term},
					 //async:false,
	                 error: function (xhr, textStatus, errorThrown) {
	                        console.log('Error: ' + xhr.responseText);
	                    },
					 success:function(data){
							response($.map(data, function (item) {
	                            return {
	                                label: item.org_id+"-"+item.org_name,
	                                value: item.org_id+"-"+item.org_name
	                            };
	                        }));
					},
					beforeSend:function(){
						$("body").mLoading('hide');	
					}
					
					});
	        }
	    });
		
		
		
		/*
		org_id,
		position_id
		emp_name
		*/
		$("#EmpName").autocomplete({
	        source: function (request, response) {
	        	$.ajax({
					 url:restfulURL+"/see_api/public/appraisal/auto_employee_name",
					 type:"get",
					 dataType:"json",
					 headers:{Authorization:"Bearer "+tokenID.token},
					 data:{"emp_name":request.term,
						 "position_id":splitData($("#Position").val()),"org_id":splitData($("#organization").val())},
					 //async:false,
	                 error: function (xhr, textStatus, errorThrown) {
	                        console.log('Error: ' + xhr.responseText);
	                    },
					 success:function(data){
							response($.map(data, function (item) {
	                            return {
	                                label: item.emp_id+"-"+item.emp_name,
	                                value: item.emp_id+"-"+item.emp_name
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
		
		
		
		
		//Action Plan Action Area...
		
		$("#btnAddActionPlan").click(function(){
			 
			  if($("#action_actionplan").val()=="add"){
				   
				insertActionPlanInlineFn();
				$("#action_new_actionplan").val("add");
				//$(".iconDisable").html("<i style='opacity:0.3;cursor:default;' class='fa fa-gear font-management'></i>");
				//$(".iconDisable").html("<button id=\"\" style='opacity:0.3;cursor:default;' type=\"button\" class=\"btn btn-danger btn-xs   new-condition\">Delete</button>");
				$("input.action_plan_id").prop("disabled",true);
				return false;
			  }else{
				  callFlashSlideInModal("Can't add Action Plan. Because your doing Update Data!.","#information3","error");
			  }
		  });
		 
		 
		  
		  $("#btnEditActionPlan").click(function() {
			
				if($("#action_new_actionplan").val()=="add"){
					callFlashSlideInModal("Can't edit Action Plan. Because your doing insert Data!.","#information3","error");
					return false;
				  }
				
				$(".actionplan_label").hide();
				$(".actionplan_input").show();
				
				$("#action_actionplan").val("edit");
				
				
				
				$(".datepicker").datepicker();
				$(".datepicker").each(function() {    
					
					var dataDate=$(this).val().split("-");
					var newDataDate="";
					var yy=dataDate[0];
					var mm=dataDate[1];
					var dd=dataDate[2];
					newDataDate=mm+"/"+dd+"/"+yy;
				
					//10/12/2012
					//2017-08-22
				    $(this).datepicker('setDate', newDataDate);
				});
				$(".datepicker").datepicker( "option", "dateFormat", "yy-mm-dd" );
				
				
				
				
				//Autocomplete START.
				 $(".responsible").autocomplete({
				        source: function (request, response) {
				        	$.ajax({
								 url:restfulURL+"/see_api/public/appraisal/action_plan/auto_employee_name",
								 type:"get",
								 dataType:"json",
								 headers:{Authorization:"Bearer "+tokenID.token},
								 data:{
									 "emp_name":request.term,
									 },
								 //async:false,
				                 error: function (xhr, textStatus, errorThrown) {
				                        console.log('Error: ' + xhr.responseText);
				                    },
								 success:function(data){
										response($.map(data, function (item) {
				                            return {
				                                label: item.emp_id+"-"+item.emp_name,
				                                value: item.emp_id+"-"+item.emp_name
				                            };
				                        }));
								},
								beforeSend:function(){
									$("body").mLoading('hide');	
								}
								
								});
				        }
				    });
				 //Autocomplete END.
				
			});
		  
		  
		  
		//ปุ่ม add Action Plan
		$("#btnSaveActionPlan").click(function(){ 
			
				
			if($("#action_actionplan").val() == "edit") {	
				
		
				  
			
			  var action_plan_id="";
			  var phase_id = "";
			  var action_plan_name = "";
			  var plan_start_date = "";
			  var plan_end_date = "";
			  var actual_start_date = "";
			  var actual_end_date="";
			  
			  var plan_value="";
			  var actual_cost="";
			  var earned_value="";
			  var completed_percent="";
			  var emp_id="";
			  var new_responsible="";
			  
			  var actions = [];
				  
			
			  
			  $.each($(".action_plan_id"),function(index,indexEntry){
					 
					 var id=this.id.split("-");
					 var i=id[1];
					 
					
					 
					  action_plan_id=i;
					  phase_id=$("#phase_list-"+i).val();
					  action_plan_name = $("#action_plan_name-"+i).val();
					  plan_start_date = $("#plan_start_date-"+i).val();
					  plan_end_date = $("#plan_end_date-"+i).val();
					  actual_start_date = $("#actual_start_date-"+i).val();
					  actual_end_date=$("#actual_end_date-"+i).val();
					  
					  plan_value=$("#plan_value-"+i).val();
					  actual_cost=$("#actual_cost-"+i).val();
					  earned_value=$("#earned_value-"+i).val();
					  completed_percent=$("#completed_percent-"+i).val();
					  if($("#responsible-"+i).val()==""){
						  emp_id="";
					  }else{
						  emp_id=$("#responsible-"+i).val().split("-");
						  emp_id=emp_id[0];
					  }
//					  emp_id=$("#actionplan_emp_id").val();
//					  responsible=$("#new_responsible").val();
					
					

					   
					  actions.push({
						      action_plan_id:""+action_plan_id+"",
						      phase_id: ""+phase_id+"",
							  action_plan_name : ""+action_plan_name+"",
							  plan_start_date : ""+plan_start_date+"",
							  plan_end_date : ""+plan_end_date+"",
							  actual_start_date : ""+actual_start_date+"",
							  actual_end_date: ""+actual_end_date+"",
							  plan_value: ""+plan_value+"",
							  actual_cost: ""+actual_cost+"",
							  earned_value: ""+earned_value+"",
							  completed_percent: ""+completed_percent+"",
							 // responsible: ""+responsible+"",
							  emp_id:emp_id
							  
					   });
			  });
				//console.log("actions");
				//console.log(actions);
				
				
					$.ajax({
						     url:restfulURL+"/see_api/public/appraisal/action_plan/"+$("#item_result_id").val(),
						     type:"PATCH",
						     dataType:"json",
						     data:{"actions":actions},
						     headers:{Authorization:"Bearer "+tokenID.token},
						     async:false,
						     success:function(data,status){
							
						     	  if(data['status']==200 ){
									getActionPlanFn($("#item_result_id").val());
								  	$("#action_actionplan").val("add");
									if(data['data']['error'].length==0){
							      	
								  	callFlashSlideInModal("Update Successfully.","#information3"); 
							
									}else{
										callFlashSlideInModal(listErrorActionPlanFn(data['data']['error']),"#information3","error");
										//callFlashSlideInModal(validationFn(data),"#information3","error");
									  }
								  	  
								  }
							   }
					    });         
				
				    return false;
			}
				
			if($("#action_actionplan").val()=="add") {
				
				/*
				actions: [
				   {
				        'phase_id' => 'required|integer',
				        'action_plan_name' => 'required|max:255',
				        'plan_start_date' => 'date|date_format:Y-m-d',
				        'plan_end_date' => 'date|date_format:Y-m-d',
				        'actual_start_date' => 'date|date_format:Y-m-d',
				        'actual_end_date' => 'date|date_format:Y-m-d',
				        'plan_value' => 'numeric',
				        'actual_cost' => 'numeric',
				        'earned_value' => 'numeric',
				        'completed_percent' => 'numeric',
				        'emp_id' => 'integer'
				   },....
				]
				*/
				  var phase_id = "";
				  var action_plan_name = "";
				  var plan_start_date = "";
				  var plan_end_date = "";
				  var actual_start_date = "";
				  var actual_end_date="";
				  
				  var plan_value="";
				  var actual_cost="";
				  var earned_value="";
				  var completed_percent="";
				  var emp_id="";
				  var new_responsible="";
				  
				  var actions = [];
					  
//				  $.each($(".new_action_plan_id"),function(index,indexEntry){
//					 console.log(this.id);
//					// console.log($(this).attr("id"));
//					 console.log($(this));
//					 var id=this.id.split("-");
//					 id=id[1];
//					 
//				  });	
				  
				  $.each($(".new_action_plan_id"),function(index,indexEntry){
						 
						 var id=this.id.split("-");
						 var i=id[1];
						 
						
						
						  phase_id=$("#new_phase_list-"+i).val();
						  action_plan_name = $("#new_action_plan_name-"+i).val();
						  plan_start_date = $("#new_plan_start_date-"+i).val();
						  plan_end_date = $("#new_plan_end_date-"+i).val();
						  actual_start_date = $("#new_actual_start_date-"+i).val();
						  actual_end_date=$("#new_actual_end_date-"+i).val();
						  
						  plan_value=$("#new_plan_value-"+i).val();
						  actual_cost=$("#new_actual_cost-"+i).val();
						  earned_value=$("#new_earned_value-"+i).val();
						  completed_percent=$("#new_completed_percent-"+i).val();
						  if($("#new_responsible-"+i).val()==""){
							  emp_id="";
						  }else{
							  emp_id=$("#new_responsible-"+i).val().split("-");
							  emp_id=emp_id[0];
						  }
//						  emp_id=$("#actionplan_emp_id").val();
//						  responsible=$("#new_responsible").val();
						
						

						   
						  actions.push({
							   
							      phase_id: ""+phase_id+"",
								  action_plan_name : ""+action_plan_name+"",
								  plan_start_date : ""+plan_start_date+"",
								  plan_end_date : ""+plan_end_date+"",
								  actual_start_date : ""+actual_start_date+"",
								  actual_end_date: ""+actual_end_date+"",
								  plan_value: ""+plan_value+"",
								  actual_cost: ""+actual_cost+"",
								  earned_value: ""+earned_value+"",
								  completed_percent: ""+completed_percent+"",
								 // responsible: ""+responsible+"",
								  emp_id:emp_id
								  
						   });
				  });
					//console.log("actions");
					//console.log(actions);
				
					  $.ajax({
						     url:restfulURL+"/see_api/public/appraisal/action_plan/"+$("#item_result_id").val(),
						     type:"POST",
						     dataType:"json",
						     data:{"actions": actions },
							 headers:{Authorization:"Bearer "+tokenID.token},
						     success:function(data,status){
						    // checkMaintenanceFn(data);
								if(data['data']['error']==undefined){
									callFlashSlideInModal(data['data'],"#information2","error");
								  }else{
						
								      if(data['data']['error'].length==0){
										getActionPlanFn($("#item_result_id").val());
									    callFlashSlideInModal("Insert Successfully.","#information3");
								     
								      }else{
										callFlashSlideInModal(listErrorActionPlanFn(data['data']['error']),"#information3","error");
										//callFlashSlideInModal(validationFn(data),"#information3","error");
										
										}
									  
								  }
							   }
					    });         
				
				    return false;
				}
			
				});
		//end btn saved.
		//delete action plan start...
		 $(document).on("click","#btnDelActionPlan",function(){
				
//			 	if($("#action_actionplan").val()=="add"){
//			 	
//			 		 $.each($("input.new_action_plan_id:checked"),function(index,indexEntry){
//			 			 
//			 			$(this).parent().parent().parent().remove();
//			 			 
//			 		 });
//			 		
//			 		if($("input.new_action_plan_id").get().length==0){
//						$("#btnCancelActionPlan").click();
//					}
//			 	}
			 	
				 var action_plan_id=[];
				 var actions=[];
				 
				 $.each($("input.new_action_plan_id:checked"),function(index,indexEntry){
		 			 
			 			$(this).parent().parent().parent().remove();
			 			 
			 	 });
				 
			 	 $.each($(".action_plan_id:checked"),function(index2,indexEntry3){
			 			
			 			 actions.push({
							   
						 		action_plan_id: ""+$(this).val()+"",
								  
						 	 });
			 	});
			 	 
		
			 	 					  
			
			 	 console.log(actions);
			 	  

					  $.ajax({
						     url:restfulURL+"/see_api/public/appraisal/action_plan/"+$("#item_result_id").val(),
						     type:"DELETE",
						     dataType:"json",
						     data:{"actions": actions },
							 headers:{Authorization:"Bearer "+tokenID.token},
						     success:function(data,status){
								
							
								
								 if(data['data']['error'].length==0){
										getActionPlanFn($("#item_result_id").val());
									    callFlashSlideInModal("Delete Successfully.","#information3");
								     
								      }else{
										callFlashSlideInModal(listErrorActionPlanFn(data['data']['error']),"#information3","error");
										//callFlashSlideInModal(validationFn(data),"#information3","error");
										
								}
								 
						}
					});
			 	 
			 	 
			 	
			 	 
			 	 
			 });
		//delete action plan end...
		 
		 //Cancel action plan start...
		 $("#btnCancelActionPlan").click(function(){
			 
			  
			  
			  //getActionPlanFn(3);
			  $(".actionplan_label").show();
			  $(".actionplan_input").hide();
			  
			  $("input.action_plan_id").prop("disabled",false);
			  $("#action_actionplan").val("add");
			  $("#action_new_actionplan").val("");
			  getActionPlanFn($("#item_result_id").val());
		  });
		 //Cancel action plan end...
		//Action Plan Action Area...
		
		
		
		
		
		}
	}
	
	
	
	//Phase Start...
	 $(document).on("click","#btnSavePhase",function(){
		 	
		 var is_active="";
		 if($("#phaseIsActive").prop('checked')==true){
			 is_active=1;
		 }else{
			 is_active=0
		 }

		 	if($("#phase_action").val()=="add"){
		 		
		 	
			 	  $.ajax({
					     url:restfulURL+"/see_api/public/phase",
					     type:"POST",
					     dataType:"json",
					     data:{"phase_name": $("#phaseName").val(),"is_active":is_active },
						 headers:{Authorization:"Bearer "+tokenID.token},
					     success:function(data,status){
						
							if(data['status']==200){
								getPhaseFn();
								clearFormPhaseFn();
								
							}else if(data['status']=="400"){
								
								//$("#informConfirm").html("<font color='red'>"+data['data']+"</font>");
								callFlashSlide("<font color=''>"+data['data']['phase_name']+"</font>","error");  
								
							}
						
						
					}
			 	});
		 	
		 	}else{
		 		
		 		 $.ajax({
						     url:restfulURL+"/see_api/public/phase/"+$("#pahse_id_edit").val(),
						     type:"PATCH",
						     dataType:"json",
						     data:{"phase_name": $("#phaseName").val(),"is_active":is_active},
							 headers:{Authorization:"Bearer "+tokenID.token},
						     success:function(data,status){
							
								if(data['status']==200){
									getPhaseFn();
									clearFormPhaseFn();
								}else if(data['status']=="400"){
									
									//$("#informConfirm").html("<font color='red'>"+data['data']+"</font>");
									callFlashSlide("<font color=''>"+data['data']['phase_name']+"</font>","error");  
									
								}
							
							
						}
				 	});
		 		
		 	}
		 	
	 });
	 
	 $(document).on("click","#btnCancelPhase",function(){
		 clearFormPhaseFn();
		 getPhaseFn();
	 });
	//Phase End...
	
	//binding tooltip start
	 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
	 $('[data-toggle="tooltip"]').tooltip({
		 html:true
	 });
	//binding tooltip end
	 
	 
});

