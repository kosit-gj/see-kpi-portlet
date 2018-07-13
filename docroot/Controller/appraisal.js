var globalData="";
var galbalDataTemp=[]; 
var phaseArray=[];
var globalCount=0;
var username = "";
var password = "";
//Variable to store your files
var files;
var emailLinkAppraisal = false;
// funciton global start
//form2

//var connectionServiceFn = function(username,password){
//	$.ajax({
//
//		url:restfulURL+"/"+serviceName+"/public/session",
//		//url:"http://localhost/"+serviceName+"/public/session",
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
var dropdownDeductScoreFn = function(score,nof_target_score,hint){
	htmlTemplateQuality = "";

	console.log(score);
	console.log(nof_target_score);
	console.log(hint);

	for(var i=0;i<=nof_target_score;i++){
		var hintValue="";



		try {
			hintValue=hint[i]['hint'];
		}
		catch(err) {
			//hintValue=i;
		   console.log(err.message);
		}

		if(score==i){
			htmlTemplateQuality+="<option value='"+i+"'  selected='selected'>"+hintValue+"</option>";
		}else{
			htmlTemplateQuality+="<option value='"+i+"'>"+hintValue+"</option>";
		}



	}
	/*
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
	*/


	return htmlTemplateQuality;
}
var assignTemplateQualityFn = function(structureName,data,check_disabled_first,check_disabled_second){
	var item_result_id_array=[];
	var htmlTemplateQuality="";
	var info_item="";
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
		if(data['no_weight']==0){ // has weight;
			if(data['result_type']==1){
				htmlTemplateQuality+="<div class='totalWeight'>Total Weight "+data['total_weight_percent']+"%</div>";
			}else{
				htmlTemplateQuality+="<div class='totalWeight'>Total Score "+data['total_weight']+"</div>";
			}

		}
	htmlTemplateQuality+="</div>";
	htmlTemplateQuality+="<div class=\"ibox-content\">";
	htmlTemplateQuality+="<div class=\"table-responsive scrollbar-inner\" style='overflow:auto;'>";
	htmlTemplateQuality+="<table id=\"tablethreshould\" class=\"table table-striped\" style='max-width: none;'>";
	htmlTemplateQuality+="<thead>";
	//has weight
	if(data['no_weight']==0){
			htmlTemplateQuality+="<tr>";
				htmlTemplateQuality+="<th style=\"width:40%\"><b>KPI Name</b></th>";
				htmlTemplateQuality+="<th style='width:15%;text-align: right;'><b>Target</b></th>";
				htmlTemplateQuality+="<th style='width:10%;text-align: center;'><b>First Line Score</b></th>";
				htmlTemplateQuality+="<th style='width:10%;text-align: center;'><b>Second Line Score</b></th>";
				htmlTemplateQuality+="<th style='width:15%;text-align: right;'><b>%Weight</b></th>  ";
				if(data['result_type']==1){
					htmlTemplateQuality+="<th style='width:15%;text-align: right;'><b>Weight Score</b></th>  ";
				}else{
					htmlTemplateQuality+="<th style='width:15%;text-align: right;'><b>Result Score</b></th>  ";
				}

			htmlTemplateQuality+="</tr>";
	}else{

		htmlTemplateQuality+="<tr>";
			htmlTemplateQuality+="<th style=\"width:40%\"><b>KPI Name</b></th>";
			htmlTemplateQuality+="<th style='width:15%;text-align: right;'><b>Target</b></th>";
			htmlTemplateQuality+="<th style='width:10%;text-align: center;'><b>First Line Score</b></th>";
			htmlTemplateQuality+="<th style='width:10%;text-align: center;'><b>Second Line Score</b></th>";

		htmlTemplateQuality+="</tr>";
	}
				htmlTemplateQuality+="</thead>";
					htmlTemplateQuality+="<tbody id=\"\" class='appraisal_result'>";

					$.each(data['items'],function(index,indexEntry){

					item_result_id_array.push(indexEntry['item_result_id']);

					if(indexEntry['formula_desc'] != null || indexEntry['formula_desc'] != ""){
						info_item="<span style='cursor: pointer;background-color: #54b3d1;' class=\"badge badge-info infoItem\" info-itemName='<strong>KPI Name : </strong>"+indexEntry['item_name']+"' info-data='"+indexEntry['formula_desc']+"'>i</span>";
					}else{info_item ="";console.log("no");}
					//has weight
						if(data['no_weight']==0){
							htmlTemplateQuality+="<tr>";
								console.log(indexEntry['formula_desc']);
								htmlTemplateQuality+="<td class=''>"+indexEntry['item_name']+"  "+info_item+"</td>";
								htmlTemplateQuality+="<td class='' style='text-align: right;padding-right: 10px;'><div data-toggle=\"tooltip\" data-placement=\"right\" title=\""+hintHtml+"\">"+addCommas(parseFloat(notNullFn(indexEntry['target_value'])).toFixed(2))+"</div></td>";

								htmlTemplateQuality+="<td class='' style='text-align: center;'>";
								htmlTemplateQuality+="<select "+check_disabled_first+" style='width:180px; height: 25px;padding: 0 0 0 5px; font-size:13px; text-align:left;' id='competencyScore-"+indexEntry['item_result_id']+"' class='competencyScore itemScore   input form-control input-sm-small numberOnly'>";
								htmlTemplateQuality+=dropdownDeductScoreFn(notNullFn(indexEntry['first_score']),indexEntry['nof_target_score'],data['hint']);
								htmlTemplateQuality+="<select>";
								//htmlTemplateQuality+="<input style='width:80px;' id='competencyScore-"+indexEntry['item_result_id']+"' class='competencyScore input form-control input-sm-small numberOnly' type='text' value="+notNullFn(indexEntry['score'])+">";
								htmlTemplateQuality+="</td>";
								
								htmlTemplateQuality+="<td class='' style='text-align: center;'>";
								htmlTemplateQuality+="<select "+check_disabled_second+" style='width:180px; height: 25px;padding: 0 0 0 5px; font-size:13px; text-align:left;' id='competencyScore_Second-"+indexEntry['item_result_id']+"' class='competencyScore itemScore   input form-control input-sm-small numberOnly'>";
								htmlTemplateQuality+=dropdownDeductScoreFn(notNullFn(indexEntry['second_score']),indexEntry['nof_target_score'],data['hint']);
								htmlTemplateQuality+="<select>";
								//htmlTemplateQuality+="<input style='width:80px;' id='competencyScore-"+indexEntry['item_result_id']+"' class='competencyScore input form-control input-sm-small numberOnly' type='text' value="+notNullFn(indexEntry['score'])+">";
								htmlTemplateQuality+="</td>";
								
								htmlTemplateQuality+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['weight_percent'])).toFixed(2))+"</td>";
								htmlTemplateQuality+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['weigh_score'])).toFixed(2))+"</td>";

							htmlTemplateQuality+="</tr>";
						}else{
							htmlTemplateQuality+="<tr>";

								htmlTemplateQuality+="<td class=''>"+indexEntry['item_name']+"  "+info_item+"</td>";
								htmlTemplateQuality+="<td class='' style='text-align: right;padding-right: 10px;'><div data-toggle=\"tooltip\" data-placement=\"right\" title=\""+hintHtml+"\">"+addCommas(parseFloat(notNullFn(indexEntry['target_value'])).toFixed(2))+"</div></td>";

								htmlTemplateQuality+="<td class='' style='text-align: center;'>";
								htmlTemplateQuality+="<select "+check_disabled_first+" style='width:180px; height: 25px;padding: 0 0 0 5px;font-size:13px; text-align:left;' id='competencyScore-"+indexEntry['item_result_id']+"' class='competencyScore itemScore input form-control input-sm-small numberOnly'>";
								htmlTemplateQuality+=dropdownDeductScoreFn(notNullFn(indexEntry['first_score']),indexEntry['nof_target_score'],data['hint']);
								htmlTemplateQuality+="<select>";
								//htmlTemplateQuality+="<input style='width:80px;' id='competencyScore-"+indexEntry['item_result_id']+"' class='competencyScore input form-control input-sm-small numberOnly' type='text' value="+notNullFn(indexEntry['score'])+">";
								htmlTemplateQuality+="</td>";
								
								htmlTemplateQuality+="<td class='' style='text-align: center;'>";
								htmlTemplateQuality+="<select "+check_disabled_second+" style='width:180px; height: 25px;padding: 0 0 0 5px;font-size:13px; text-align:left;' id='competencyScore_Second-"+indexEntry['item_result_id']+"' class='competencyScore itemScore input form-control input-sm-small numberOnly'>";
								htmlTemplateQuality+=dropdownDeductScoreFn(notNullFn(indexEntry['second_score']),indexEntry['nof_target_score'],data['hint']);
								htmlTemplateQuality+="<select>";
								htmlTemplateQuality+="</td>";


							htmlTemplateQuality+="</tr>";
						}
					});

					//has weight
					if(data['no_weight']==0){
						htmlTemplateQuality+="<tr>";
							
							htmlTemplateQuality+="<td class=''></td>";
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
					htmlTemplateQuality+="<input type='hidden' id='item_result_id_array-"+data['structure_id']+"' class='item_result_id_array' value=\""+item_result_id_array+"\">";

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
	if(data['no_weight']==0){ // has weight;

		if(data['result_type']==1){
			htmlTemplateDeduct+="<div class='totalWeight'>Total Weight "+data['total_weight_percent']+"%</div>";
		}else{
			htmlTemplateDeduct+="<div class='totalWeight'>Total Score "+data['total_weight']+"</div>";
		}
	}
	htmlTemplateDeduct+="</div>";

		htmlTemplateDeduct+="<div class=\"ibox-content\">";
		htmlTemplateDeduct+="<div class=\"table-responsive scrollbar-inner\" style='overflow:auto;'>";
		htmlTemplateDeduct+="<table id=\"tablethreshould\" class=\"table table-striped\" style='max-width: none;'>";

		htmlTemplateDeduct+="<thead>";
		//has weight
		if(data['no_weight']==0){


			htmlTemplateDeduct+="<tr>";
				htmlTemplateDeduct+="<th style=\"width:30%\"><b>KPI Name</b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>Max Value</b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>Actual Value</b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>Over Value</b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>Deduct Score/Unit</b> </th>";
				
				if(data['is_value_get_zero']==1){
					htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>Value&nbsp;Get&nbsp;Zero&nbsp;</b> </th>";
				}
				
				if(data['result_type']==1){
					htmlTemplateDeduct+="<th style='width:20%;text-align: right;'><b>Weight Score </b></th>";
				}else{
					htmlTemplateDeduct+="<th style='width:20%;text-align: right;'><b>Result Score </b></th>";
				}
				
			htmlTemplateDeduct+="</tr>";
		}else{
			htmlTemplateDeduct+="<tr>";
				htmlTemplateDeduct+="<th style=\"width:35%\"><b>KPI Name</b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>Max Value</b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>Actual Value</b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>Over Value</b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>Deduct Score/Unit</b> </th>";
				
				if(data['is_value_get_zero']==1){
					htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>Value&nbsp;Get&nbsp;Zero&nbsp;</b> </th>";
				}
				
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
									//htmlTemplateDeduct+="<td style='text-align: right;padding-right: 10px;'><input style=\"width:70px; height: 25px;padding: 0 0 0 5px; font-size:13px; text-align:right;\" type=\"text\" class=\"span10 input-sm-small numberOnly itemScore\" id=\"actual-"+indexEntry['item_result_id']+"\" name=\"actual-"+indexEntry['item_result_id']+"\" value="+indexEntry['actual_value']+"></td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['actual_value'])).toFixed(2))+"</td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['over_value'])).toFixed(2))+"</td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['deduct_score_unit'])).toFixed(2))+"</td>";
									if(data['is_value_get_zero']==1){
										htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+(indexEntry['value_get_zero']==null?"   ":indexEntry['value_get_zero'])+"</td>";//indexEntry['value_get_zero']==null?"":indexEntry['value_get_zero']
									}
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['weigh_score'])).toFixed(2))+"</td>";

							htmlTemplateDeduct+="</tr>";
						}else{
							htmlTemplateDeduct+="<tr>";
									htmlTemplateDeduct+="<td class=''> "+indexEntry['item_name']+"</td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['max_value'])).toFixed(2))+"</td>";
									//htmlTemplateDeduct+="<td style='text-align: right;padding-right: 10px;'><input style=\"width:70px; height: 25px;padding: 0 0 0 5px; font-size:13px; text-align:right;\" type=\"text\" class=\"span10 input-sm-small numberOnly itemScore\" id=\"actual-"+indexEntry['item_result_id']+"\" name=\"actual-"+indexEntry['item_result_id']+"\" value="+indexEntry['actual_value']+"></td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['actual_value'])).toFixed(2))+"</td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['over_value'])).toFixed(2))+"</td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['deduct_score_unit'])).toFixed(2))+"</td>";
									
									if(data['is_value_get_zero']==1){
										htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+(indexEntry['value_get_zero']==null?"   ":indexEntry['value_get_zero'])+"</td>";
									}
									
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
								if(data['is_value_get_zero']==1){
									htmlTemplateDeduct+="<td class=''></td>";
								}
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
	var item_result_id_array=[];
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
	if(data['no_weight']==0){ // has weight;
		if(data['result_type']==1){
			htmlTemplateQuantity+="      <div class='totalWeight'>Total Weight "+data['total_weight_percent']+"%</div>";
		}else{
			htmlTemplateQuantity+="      <div class='totalWeight'>Total Score "+data['total_weight']+"</div>";
		}
	}
	htmlTemplateQuantity+="  </div>";
	htmlTemplateQuantity+="	<div class=\"ibox-content\">";
	htmlTemplateQuantity+=" <div class=\"table-responsive scrollbar-inner\" style='overflow:auto;'>";
	htmlTemplateQuantity+="<table id=\"tableAppraisalAssignment\" class=\"table table-striped\" style='max-width: none;'>";
	htmlTemplateQuantity+="<thead>";

	//has weight
	if(data['no_weight']==0){

		htmlTemplateQuantity+="<tr>";

			htmlTemplateQuantity+="<th style=\"width:10%\" class=''><b>Perspective</b> </th>";
			htmlTemplateQuantity+="<th style=\"width:20%\" class=''><b>KPI Name</b></th>";
			htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>Target </b></th>";
			htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>UOM </b></th>";
			htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>Forecast </b></th>";
			htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>Actual </b></th>";
			if(data['threshold']==1){
				htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>Score </b></th>";
			}else{
				htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>%Achievement </b></th>";
			}
			htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>%Weight </b></th>";
			if(data['result_type']==1){
				htmlTemplateQuantity+="<th style='width:10%;text-align: right;' class=''><b>Weight Score</b> </th>";
			}else{
				htmlTemplateQuantity+="<th style='width:10%;text-align: right;' class=''><b>Result Score</b> </th>";
			}

			htmlTemplateQuantity+="<th style='width:10%;text-align: center;' class=''><b>Manage</b> </th>";


		htmlTemplateQuantity+="</tr>";

	}else{
	//no_weight
		htmlTemplateQuantity+="<tr>";
			htmlTemplateQuantity+="<th style=\"width:10%\" class=''><b>Perspective</b> </th>";
			htmlTemplateQuantity+="<th style=\"width:20%\" class=''><b>KPI Name</b></th>";
			htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>Target </b></th>";
			htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>UOM </b></th>";
			htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>Forecast </b></th>";
			htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>Actual </b></th>";

			if(data['threshold']==1){
				htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>Score </b></th>";
			}else{
				htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>%Achievement </b></th>";
			}


			htmlTemplateQuantity+="<th style='width:15%;text-align: center;' class=''><b>Manage</b> </th>";

		htmlTemplateQuantity+="</tr>";
	}

		htmlTemplateQuantity+="</thead>";
			htmlTemplateQuantity+="<tbody id=\"\" class='appraisal_result'>";
			$.each(data['items'],function(index,indexEntry){


				item_result_id_array.push(indexEntry['item_result_id']);
				/*
				item_result_id
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
						htmlTemplateQuantity+="<td id=\"item_name-"+indexEntry['item_result_id']+"\">"+indexEntry['item_name']+"</td>";
						htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'><div title=\""+hintHtml+"\" data-toggle=\"tooltip\" data-html=\"true\" data-placement=\"right\" >"+addCommas(parseFloat(notNullFn(indexEntry['target_value'])).toFixed(2))+"</div></td>";
						htmlTemplateQuantity+="<td>"+indexEntry['uom_name']+"</td>";
						htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'><input style=\"width:70px; height: 25px;padding: 0 0 0 5px; font-size:13px; text-align:right;\" type=\"text\" class=\"span10 input-sm-small numberOnly itemScore addComma\" id=\"forecast-"+indexEntry['item_result_id']+"\" name=\"forecast-"+indexEntry['item_result_id']+"\" value="+addCommas(parseFloat(notNullFn(indexEntry['forecast_value'])).toFixed(2))+"></td>";
						//htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'><input style=\"width:70px; height: 25px;padding: 0 0 0 5px; font-size:13px; text-align:right;\" type=\"text\" class=\"span10 input-sm-small numberOnly \" id=\"actual-"+indexEntry['item_result_id']+"\" name=\"actual-"+indexEntry['item_result_id']+"\" value="+indexEntry['actual_value']+"></td>";
						htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['actual_value'])).toFixed(2))+"</td>";
						if(data['threshold']==1){
							htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['score'])))+"</td>";
						}else{
							htmlTemplateQuantity+="<td style=\"text-align: right;padding-right: 10px;background:"+hexToRgb("#"+indexEntry['color'],0.7)+"\">"+addCommas(parseFloat(notNullFn(indexEntry['percent_achievement'])))+"</td>";
						}
						htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['weight_percent'])).toFixed(2))+"</td>";
						htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['weigh_score'])).toFixed(2))+"</td>";


						htmlTemplateQuantity+="	<td style=\"text-align:center\">";
						htmlTemplateQuantity+=" <i data-trigger=\"focus\" tabindex=\""+index+"\" data-content=\"   &lt;button style='width:100px;' class='btn btn-success btn-small btn-gear reason' id='reason-"+indexEntry['item_result_id']+"-"+indexEntry['emp_id']+"-"+indexEntry['emp_name']+"' data-target='' data-toggle='modal'&gt;Reason&lt;/button&gt;  &lt;button style='width:100px;' class='btn btn-success btn-small btn-gear ganttChart' id='ganttChart-"+indexEntry['item_result_id']+"-"+indexEntry['emp_id']+"-"+indexEntry['emp_name']+"' data-target='' data-toggle='modal'&gt;Gantt Chart&lt;/button&gt;  &lt;button style='width:100px;' class='btn btn-success btn-small btn-gear phase' id='phase-"+indexEntry['item_result_id']+"-"+indexEntry['emp_id']+"-"+indexEntry['emp_name']+"' data-target='' data-toggle='modal'&gt;Phase&lt;/button&gt; &lt;button style='width:100px;' id='action_plan-"+indexEntry['item_result_id']+"-"+indexEntry['emp_id']+"-"+indexEntry['emp_name']+"' class='btn btn-success btn-small btn-gear action_plan'&gt;Action Plan&lt;/button&gt; &lt;button id='attach_file-"+indexEntry['item_result_id']+"-"+indexEntry['emp_id']+"-"+indexEntry['emp_name']+"' style='width:100px;' class='btn btn-success btn-small btn-gear attach_file'&gt;Attach File&lt;/button&gt;\" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-edit-del\" data-original-title=\"\" title=\"\"></i>";
						htmlTemplateQuantity+="	</td>";

					htmlTemplateQuantity+="</tr>";
				}else{
					//no_weight
					htmlTemplateQuantity+="<tr >";
						htmlTemplateQuantity+="<td>"+indexEntry['perspective_name']+"</td>";
						htmlTemplateQuantity+="<td>"+indexEntry['item_name']+"</td>";
						htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'><div title=\""+hintHtml+"\" data-toggle=\"tooltip\" data-html=\"true\" data-placement=\"right\" >"+addCommas(parseFloat(notNullFn(indexEntry['target_value'])).toFixed(2))+"</div></td>";
						htmlTemplateQuantity+="<td>"+indexEntry['uom_name']+"</td>";
						htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'><input type=\"text\"  class=\"span10 input-sm-small numberOnly addComma itemScore\" id=\"forecast-"+indexEntry['item_result_id']+"\" name=\"forecast-"+indexEntry['item_result_id']+"\" value="+addCommas(parseFloat(notNullFn(indexEntry['forecast_value'])).toFixed(2))+"></td>";

						//htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'><input type=\"text\"  class=\"span10 input-sm-small numberOnly \" id=\"actual-"+indexEntry['item_result_id']+"\" name=\"actual-"+indexEntry['item_result_id']+"\" value="+indexEntry['actual_value']+"></td>";
						htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['actual_value'])).toFixed(2))+"</td>";

						if(data['threshold']==1){
							htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['score'])).toFixed(2))+"</td>";
						}else{
							htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['percent_achievement'])).toFixed(2))+"</td>";
						}

						htmlTemplateQuantity+="	<td style=\"text-align:center\">";
						htmlTemplateQuantity+=" <i data-trigger=\"focus\" tabindex=\""+index+"\" data-content=\"&lt;button class='btn btn-success btn-small btn-gear ganttChart' id='ganttChart-"+indexEntry['item_result_id']+"-"+indexEntry['emp_id']+"-"+indexEntry['emp_name']+"' data-target='' data-toggle='modal'&gt;Gantt&lt;/button&gt; &lt;button class='btn btn-success btn-small btn-gear phase' id='phase-"+indexEntry['item_result_id']+"-"+indexEntry['emp_id']+"-"+indexEntry['emp_name']+"' data-target='' data-toggle='modal'&gt;Phase&lt;/button&gt;&nbsp;&lt;button id='action_plan-"+indexEntry['item_result_id']+"-"+indexEntry['emp_id']+"-"+indexEntry['emp_name']+"' class='btn btn-success btn-small btn-gear action_plan'&gt;Action Plan&lt;/button&gt; &lt;button id='attach_file-"+indexEntry['item_result_id']+"-"+indexEntry['emp_id']+"-"+indexEntry['emp_name']+"' style='width:100px;' class='btn btn-success btn-small btn-gear attach_file'&gt;Attach File&lt;/button&gt;\" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-edit-del\" style='text-align:center;' data-original-title=\"\" title=\"\"></i>";
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
			htmlTemplateQuantity+="<input type='hidden' id='item_result_id_array-"+data['structure_id']+"' class='item_result_id_array' value=\""+item_result_id_array+"\">";


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
		url:restfulURL+"/"+serviceName+"/public/appraisal/year_list_assignment",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//var data=['à¸—à¸”à¸¥à¸­à¸‡à¸‡à¸²à¸™','à¸›à¸£à¸°à¸ˆà¸³à¸›à¸µ','à¸£à¸±à¸�à¸©à¸²à¸�à¸²à¸£'];
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(index==0){
					htmlOption+="<option selected='selected' value="+indexEntry['appraisal_year']+">"+indexEntry['appraisal_year']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['appraisal_year']+">"+indexEntry['appraisal_year']+"</option>";
				}
			});
			$("#AppraisalYear"+nameArea).html(htmlOption);
		}
	});
	
	dropDrowPeriodListFn($("#AppraisalYear").val());
}

var dropDrowPeriodListFn = function(year,id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/period_list",
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

/*
var dropDrowAppraisalLevelFn = function(id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/al_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			htmlOption+="<option value=''>All Level</option>";
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
*/
var dropDrowAppraisalOrgLevelFn = function(id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/parameter/org_level",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			htmlOption+="<option value=''>All Level</option>";
			$.each(data,function(index,indexEntry){

				if(id==indexEntry['level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}
			});
			$("#AppraisalOrgLevel").html(htmlOption);
		}
	});
	
	if($("#appraisalType").val() == "1"){
		dropDrowOrgFn($("#AppraisalOrgLevel").val());
	} else {
		dropDrowIndividualOrgFn($("#AppraisalOrgLevel").val());
	}
}

var dropDrowIndividualOrgLevelFn = function(id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/parameter/org_level_individual",
		//url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/al_list_emp_org",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"level_id": $("#AppraisalEmpLevel").val()},
		//data:{"emp_code":session_emp_code,"level_id":$("#AppraisalEmpLevel").val()},
		success:function(data){
			var htmlOption="";
			htmlOption+="<option value=''>All Level</option>";
			$.each(data,function(index,indexEntry){

				if(id==indexEntry['level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}
			});
			$("#AppraisalOrgLevel").html(htmlOption);
		}
	});
	dropDrowIndividualOrgFn();
}

var dropDrowAppraisalEmpLevelFn = function(id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/parameter/emp_level",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			htmlOption+="<option value=''>All Level</option>";
			$.each(data,function(index,indexEntry){

				if(id==indexEntry['level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}
			});
			$("#AppraisalEmpLevel").html(htmlOption);
		}
	});
	dropDrowIndividualOrgLevelFn();
}

var dropDrowDepartmentFn = function(id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/dep_list",
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

var dropDrowOrgFn = function(appraisalLevelId){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/org",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"level_id":appraisalLevelId},
		success:function(data){
			var htmlOption="";
			htmlOption+="<option value=''>All Organization</option>";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['org_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['org_id']+">"+indexEntry['org_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['org_id']+">"+indexEntry['org_name']+"</option>";
				}
			});
			$("#organization").html(htmlOption);
		}
	});
}

var dropDrowIndividualOrgFn = function(appraisalLevelId){
//	var service_url_Check;
//	if($("#appraisalType").val()==1) {
//		service_url_Check = "org";
//	}
//	else {
//		service_url_Check = "org/list_org_for_emp";
//	}
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/parameter/org_individual",
		//url:restfulURL+"/"+serviceName+"/public/"+service_url_Check+"",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		//data:{"level_id":$("#AppraisalOrgLevel").val(),"emp_code":session_emp_code,"level_id_emp":$("#AppraisalEmpLevel").val()},
		data:{"emp_level":$("#AppraisalEmpLevel").val(), "org_level":$("#AppraisalOrgLevel").val()},
		success:function(data){
			var htmlOption="";
			htmlOption+="<option value=''>All Organization</option>";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['org_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['org_id']+">"+indexEntry['org_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['org_id']+">"+indexEntry['org_name']+"</option>";
				}
			});
			$("#organization").html(htmlOption);
		}
	});
}

var dropDrowSectionFn = function(department_code,id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/sec_list",
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
	
	if(emailLinkAppraisal==true) {
		$("#embed_appraisalType").val(data['head'][0]['appraisal_type_id']);
	}
	
	var check_disabled_first;
	var check_disabled_second;
	if(data['head'][0]['chief_emp_code']==session_emp_code) {
		check_disabled_second = "disabled"; //disabled second line 
	}else if(data['head'][0]['has_second_line']==1) {
		if(data['head'][0]['second_chief_emp_code']==session_emp_code) {
			check_disabled_first = "disabled"; //disabled first line 
		}
	} else {
		check_disabled_first = "disabled";
		check_disabled_second = "disabled";
	}
	
	//console.log(check_disabled_first,session_emp_code,'first')
	//console.log(check_disabled_second,session_emp_code,'second')
	
	$("#appraisal_template_area").empty();
	$.each(data['group'],function(index,groupEntry){


		if(groupEntry['form_url']=='quantity'){
			$("#appraisal_template_area").append(assignTemplateQuantityFn(index,groupEntry));


			/*bindding popover start*/
			//Using
			$(".popover-edit-del").popover(setPopoverDisplay);


			$(".appraisal_result").off("click",".popover-edit-del");
			$(".appraisal_result").on("click",".popover-edit-del",function(){

				$(".popover").css({"text-align":"center"});
				//$(".popover").css({"text-align":"center","width":"120px"});
				//$("#tableAppraisalAssignment .popover-content").css({"width":"120px;"});
				//$("#tableAppraisalAssignment .popover").css({"width":"120px;"});
				//action_plan Start
				$(".action_plan").on("click",function() {

					$("#informConfirm").empty();
					var id=this.id.split("-");
					id=id[1];
					$("#actionPlanModal").modal({
						"backdrop" : setModalPopup[0],
						"keyboard" : setModalPopup[1]
					}).css({"margin-top":"0px"});
					$("#phase_item_result_id").val(id);
					getActionPlanFn(id);
					$("#action_actionplan").val("add");

				});
				//attach flie start
				$(".attach_file").click(function(){

					$("#informConfirm").empty();
					var id=this.id.split("-");
					id=id[1];

					$("#attachFileModal").modal({
						"backdrop" : setModalPopup[0],
						"keyboard" : setModalPopup[1]
					}).css({"margin-top":"0px"});
					$("#attach_file_item_result_id").val(id)
					$('.dropify').dropify();


				});



				//phase Start
				$(".phase").on("click",function(event) {
					event.preventDefault();
					//alert("phase3");
					clearFormPhaseFn();
					$("#informConfirm").empty();
					var id=this.id.split("-");
					id=id[1];

					$("#phaseModal").modal({
						"backdrop" : setModalPopup[0],
						"keyboard" : setModalPopup[1]
					}).css({"margin-top":"0px"});
					$("#phaseName").off("fucus");
					$("#phase_item_result_id").val(id)
					getPhaseFn(id);
				});

				//reason Start
				$(".reason").on("click",function(event) {
					event.preventDefault();
					//alert("phase3");
					clearFormReasonFn();
					$(".informConfirm").empty();
					var id=this.id.split("-");
					id=id[1];

					$("#reasonModal").modal({
						"backdrop" : setModalPopup[0],
						"keyboard" : setModalPopup[1]
					}).css({"margin-top":"0px"});
					$("#reason").off("fucus");
					$("#reason_item_result_id").val(id);
					getReasonFn(id);
				});


				//ganttChart start
				$(".ganttChart").on("click",function(event) {

					$("#informConfirm").empty();
					var id=this.id.split("-");
					id=id[1];
					getDataGanttChartFn(id);
					//getDataGanttChartFn(id,$("#gantt_amount").val(),$("#gantt_unit").val());
					$("#gantt_item_result_id").val(id);
					$("#ganttChartModal").modal({
						"backdrop" : setModalPopup[0],
						"keyboard" : setModalPopup[1]
					}).css({"margin-top":"0px"});


				});



			});
			/*bindding popover end*/


			//$("#appraisal_template_area").append(assignTemplateQualityFn(index,groupEntry));
		}else if(groupEntry['form_url']=='quality'){
			$("#appraisal_template_area").append(assignTemplateQualityFn(index,groupEntry,check_disabled_first,check_disabled_second));
		}else if(groupEntry['form_url']=='deduct'){
			$("#appraisal_template_area").append(assignTemplateDeductFn(index,groupEntry));
		}

		//binding tooltip start
		 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
		 $('[data-toggle="tooltip"]').tooltip({
			 html:true
		 });
		//binding tooltip end
		 
		 if(data['head'][0]['no_weight']==0){
			 $(".hasWeightGrandTotalArea").show();
			 $(".noWeightGrandTotalArea").hide();
		 }else{
			 $(".hasWeightGrandTotalArea").hide();
			 $(".noWeightGrandTotalArea").show();
		 }

		//set header start
		 if($("#embed_appraisalType").val()==2){

			 $("#orgInformation").hide();
			 $("#empInformation").show();
			 //hasWeight f and f = t




			 $("#titlePanelInformation").html("Employee Information");

			 $(".txtEmpCode").html(data['head'][0]['emp_code']);
			 $(".txtEmpName").html(data['head'][0]['emp_name']);
			 $(".txtPosition").html(data['head'][0]['position_name']);
			 $(".txtOrgName").html(data['head'][0]['org_name']);
			 $(".txtChiefEmpCode").html(data['head'][0]['chief_emp_code']);
			 $(".txtChiefEmpName").html(data['head'][0]['chief_emp_name']);
			 $(".txtAppraisalType").html(data['head'][0]['appraisal_type_name']);
			 $(".txtPeriod").html(data['head'][0]['appraisal_period_desc']);
			 $(".txtGrandTotalWeigh").html(data['head'][0]['result_score']);

		 }else if($("#embed_appraisalType").val()==1){

			 $("#orgInformation").show();
			 $("#empInformation").hide();

			 $("#titlePanelInformation").html("Organization Information");

			 $(".txtOrgCodeOrg").html(data['head'][0]['org_code']);
			 $(".txtOrgNameOrg").html(data['head'][0]['org_name']);
			 $(".txtParentOrganizationOrg").html(data['head'][0]['parent_org_name']);
			 $(".txtPeriodOrg").html(data['head'][0]['appraisal_period_desc']);
			 $(".txtGrandTotalWeighOrg").html(data['head'][0]['result_score']);

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

			$(".addComma").keyup(function(){
				//Comma();
				$(this).val(Comma($(this).val()));
				//console.log(Comma($(this).val()));
			})
			$(".infoItem").off("click");
			 $(".infoItem").on("click",function() {
					$("#htmlInfoItemName").empty();
					$("#htmlInfoItem").empty();
					
					$("#htmlInfoItemName").html($(this).attr('info-itemName') );
					$("#htmlInfoItem").html($(this).attr('info-data') );
					$("#infoItemModal").modal({
						"backdrop" : setModalPopup[0],
						"keyboard" : setModalPopup[1]
					});
					
					
				});
		//set header end

	});

//	dropDrowAsignToEditFn(data['head'][0]['stage_id']);
//	$("#assignTo").off("change");
//	$("#assignTo").on("change",function(){
//		dropDrowActionEditFn(data['head'][0]['stage_id'],$(this).val());
//
//	});
	dropDrowActionEditFn(data['head'][0]['stage_id'],data['head'][0]['emp_code'],data['head'][0]['org_code']);
	$("#assignTo").change();
	$("#ModalAppraisal").modal({
		"backdrop" : setModalPopup[0],
		"keyboard" : setModalPopup[1]
	}).css({"margin-top":"0px"});




	//Stage History List Data..
	var htmlStage="";
	$.each(data['stage'],function(index,indexEntry){

		htmlStage+="<tr >";
			htmlStage+="<td>"+indexEntry['created_by']+"</td>";
			htmlStage+="<td>"+indexEntry['created_dttm']+"</td>";
			htmlStage+="<td>"+indexEntry['from_action']+"</td>";
			htmlStage+="<td>"+indexEntry['to_action']+"</td>";
			htmlStage+="<td>"+notNullTextFn(indexEntry['remark'])+"</td>";
		htmlStage+="</tr>";

	});
	$("#listDataStageHistory").html(htmlStage);
	$("#slideUpDownStageHistory").show();
	//Stage History List Data..




};
var findOneFn = function(id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/"+id,
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//console.log(data);
			if(data['head'].length>0){

				listAppraisalDetailFn(data);
				setThemeColorFn(tokenID.theme_color);




//				if((data['head'][0]['edit_flag']==0)){
//					$("#btnSubmit").attr("disabled","disabled");
//				}else if($("#actionToAssign").val()==null){
//					$("#btnSubmit").attr("disabled","disabled");
//
//				}
				
				if((data['head'][0]['edit_flag']==0)){
					if(emailLinkAppraisal==true) {
						var AppraisalEmailLink = '#AppraisalEmailLink';
					} else {
						var AppraisalEmailLink = '#ModalAppraisal';
					}
					$(""+AppraisalEmailLink+"").find('input[type="text"]').attr('disabled', 'disabled'); 
					$(""+AppraisalEmailLink+"").find('input[type="checkbox"]').attr('disabled', 'disabled');
					$(""+AppraisalEmailLink+"").find('select').attr('disabled', 'disabled');
					
					$(""+AppraisalEmailLink+"").find('#actionToAssign,#remark_footer').removeAttr('disabled');
				}
				
				if($("#actionToAssign").val()==null){
					$("#btnSubmit").attr("disabled","disabled");
				}
				
//				else if((username.toLowerCase()!=data['head'][0]['chief_emp_code'].toLowerCase())){
//					//$("#btnSubmit").removeAttr("disabled");
//					$("#btnSubmit").attr("disabled","disabled");
//				}


			}else{
				callFlashSlide("Data is empty.");
				return false;
			}

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
		url:restfulURL+"/"+serviceName+"/public/appraisal/phase_list",
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
	  url:restfulURL+"/"+serviceName+"/public/appraisal/phase_list/"+$("#phase_item_result_id").val(),
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
			htmlTR+="<div class='actionplan_label' style='text-align:right;'>"+addCommas(parseFloat(notNullFn(indexEntry['completed_percent'])).toFixed(2))+"</div>";//Completed
			htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='completed_percent-"+indexEntry['action_plan_id']+"' class='actionplan_input' name='completed_percent-"+indexEntry['action_plan_id']+"' value='"+indexEntry['completed_percent']+"'>";//Completed

			htmlTR+="</td>";/*
			htmlTR+="<td>";
			htmlTR+="<div class='actionplan_label' style='text-align:right;'>"+addCommas(parseFloat(notNullFn(indexEntry['plan_value'])).toFixed(2))+"</div>";//PV
			htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='plan_value-"+indexEntry['action_plan_id']+"' name='plan_value-"+indexEntry['action_plan_id']+"' class='actionplan_input' value='"+indexEntry['plan_value']+"'>";//PV

			htmlTR+="</td>";
			htmlTR+="<td>";
			htmlTR+="<div class='actionplan_label' style='text-align:right;'>"+addCommas(parseFloat(notNullFn(indexEntry['actual_cost'])).toFixed(2))+"</div>";//AC
			htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='actual_cost-"+indexEntry['action_plan_id']+"' name='actual_cost-"+indexEntry['action_plan_id']+"' class='actionplan_input' value='"+indexEntry['actual_cost']+"'>";//AC

			htmlTR+="</td>";
			htmlTR+="<td>";
			htmlTR+="<div class='actionplan_label' style='text-align:right;'>"+addCommas(parseFloat(notNullFn(indexEntry['earned_value'])).toFixed(2))+"</div>";//EV
			htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='earned_value-"+indexEntry['action_plan_id']+"' name='earned_value-"+indexEntry['action_plan_id']+"' class='actionplan_input' value='"+indexEntry['earned_value']+"'>";//EV
			htmlTR+="</td>";*/
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



	/*
	 data['header']['target_value']
	 data['header']['forecast_value']
	 data['header']['actual_value']
	 data['header']['actual_vs_forecast']
	 data['header']['actual_vs_target']

	 */
	//parseFloat(notNullFn(data['header']['target_value'])).toFixed(2);



	 //0,0,100,80,80
	//%Actual vs Forecast
	var actual_value = parseFloat(notNullFn(data['header']['actual_value'])).toFixed(2);
	var target_value = parseFloat(notNullFn(data['header']['target_value'])).toFixed(2);
	var forecast_value = parseFloat(notNullFn(data['header']['forecast_value'])).toFixed(2);

	var actual_vs_forecast="";
	var actual_vs_target="";

	actual_vs_forecast= (actual_value/forecast_value)*100;
	actual_vs_target= (actual_value/target_value)*100;

	//alert("actual_vs_forecast="+actual_vs_forecast);
	//alert("actual_vs_target="+actual_vs_target);
	//% Actual vs Target
	/*
	target,performance,green,yellow,red
	$("#sparkline").sparkline([10,12,12,9,7 ], {
    type: 'bullet',
    rangeColors: ['green','yellow','red ']});
    */
	 //target,over_target,center,performance2,performance1
	//target,allArea,green,yellow,red
	console.log(data['header']['result_threshold_color']);
	var rangeColorsThreshold=[];
	var ragneValue1=[100,parseInt( parseFloat(notNullFn(data['header']['actual_vs_forecast'])).toFixed(2))];
	var ragneValue2=[100,parseInt( parseFloat(notNullFn(data['header']['actual_vs_target'])).toFixed(2))];
	var rageGreenColor="";
	$.each(data['header']['result_threshold_color'],function(index,indexEntry){


		ragneValue1.push(parseInt(indexEntry['end_threshold']));
		ragneValue2.push(parseInt(indexEntry['end_threshold']));
		rangeColorsThreshold.push("#"+indexEntry['color_code']);
		if(index==0){
		rageGreenColor="#"+indexEntry['color_code'];
		}
	});


		console.log(ragneValue1);
	    $("#actualvsForecastBar").sparkline(ragneValue1, {
	        type: 'bullet',
	        width:'80',
	        //targetColor: rageGreenColor,
	        targetColor: '#fefefe',
		    performanceColor: '#282a4b',
	        rangeColors: rangeColorsThreshold});


	    $("#actualvsTargetBar").sparkline(ragneValue2, {
	        type: 'bullet',
	        width:'80',
	        //targetColor: rageGreenColor,
	        targetColor: '#fefefe',
		    performanceColor: '#282a4b',
	        rangeColors: rangeColorsThreshold});


		/*
	    $("#actualvsForecastBar").sparkline([0,0,100,parseFloat(notNullFn(actual_vs_forecast)).toFixed(2),parseFloat(notNullFn(actual_vs_forecast)).toFixed(2)], {
	        type: 'bullet',
	        width:'80',
	        targetColor: '#7f94ff',
	        performanceColor: '#7f94ff',
	        rangeColors: ['#d3dafe','#7f94ff','#7f94ff ']});


	    $("#actualvsTargetBar").sparkline([0,0,100,parseFloat(notNullFn(actual_vs_target)).toFixed(2),parseFloat(notNullFn(actual_vs_target)).toFixed(2)], {
	        type: 'bullet',
	        width:'80',
	        targetColor: '#7f94ff',
	        performanceColor: '#7f94ff',
	        rangeColors: ['#d3dafe','#7f94ff','#7f94ff ']});

	   */
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
				htmlTR+="</td>";/*
				htmlTR+="<td>";
				htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='new_plan_value-"+globalCount+"' name='new_plan_value-"+globalCount+"' value=''>";//PV
				htmlTR+="</td>";
				htmlTR+="<td>";
				htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='new_actual_cost-"+globalCount+"' name='new_actual_cost-"+globalCount+"' value=''>";//AC
				htmlTR+="</td>";
				htmlTR+="<td>";
				htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='new_earned_value-"+globalCount+"' name='new_earned_value-"+globalCount+"' value=''>";//EV
				htmlTR+="</td>";*/
			htmlTR+="</tr>";


		 $("#listDataActionPlan").append(htmlTR);
		 $(".datepicker").datepicker();
		 $(".datepicker").datepicker( "option", "dateFormat", "yy-mm-dd" );



		 $(".datepicker").focus(function(){
			 $("#ui-datepicker-div").css({"z-index": "999999"});
		 });

		 //Autocomplete START.
		 $(".new_responsible").autocomplete({
		        source: function (request, response) {
		        	$.ajax({
						 url:restfulURL+"/"+serviceName+"/public/appraisal/action_plan/auto_employee_name",
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
		url:restfulURL+"/"+serviceName+"/public/appraisal/action_plan/"+id,
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


/* phase function start*/
var deletePhaseFn = function(id){

	 $.ajax({
		      url:restfulURL+"/"+serviceName+"/public/phase/"+id,
		      type:"DELETE",
		      dataType:"json",
			  headers:{Authorization:"Bearer "+tokenID.token},
			  success:function(data){
				if(data['status']==200){

					   callFlashSlide("Delete Successfully.");       
				       getPhaseFn($("#phase_item_result_id").val());
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
		url:restfulURL+"/"+serviceName+"/public/phase/"+id,
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

			htmlTR+=" <i data-trigger=\"focus\" tabindex=\""+index+"\" data-content=\"&lt;button class='btn btn-warning btn-small btn-gear edit_phase' id=edit_phase-"+indexEntry['phase_id']+" data-target='' data-toggle='modal'&gt;Edit&lt;/button&gt;&nbsp;&lt;button id=del_phase-"+indexEntry['phase_id']+" class='btn btn-danger btn-small btn-gear phaseDel'&gt;Delete&lt;/button&gt;\" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-edit-del\" data-original-title=\"\" title=\"\"></i>";

			htmlTR+="</td>";
		htmlTR+="</tr>";
	});



	$("#listDataPhase").html(htmlTR);

	/*bindding popover start*/
	$(".popover-edit-del").popover(setPopoverDisplay);

	$("#listDataPhase").off("click",".popover-edit-del");
	$("#listDataPhase").on("click",".popover-edit-del",function(){
		//Delete Start
		$(".phaseDel").on("click",function() {
			$("#informConfirm").empty();
			var id=this.id.split("-");
			id=id[1];
			$("#confrimModal").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			}).css({"margin-top":"0px"});
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
	 $("#phaseIsActive").prop('checked',true);
}
var getPhaseFn = function(id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/phase",
		type:"get",
		dataType:"json",
		async:false,
		data:{"item_result_id":id},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//console.log(data);
			listPhaseFn(data);
		}
	});

}
/* phase function end*/
/* attach function start*/
var getAttachFileFn = function(id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/upload_file/"+id,
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//console.log(data);
			listAttachFileFn(data);
		}
	});

}

var listAttachFileFn = function(data){
	var host = "http://"+window.location.hostname;

	//console.log(data);
	var html="";

	$.each(data,function(index,indexEntry){
		html+="<tr>";
			html+="<td  style='text-align:center;'>"+(index+1)+"</td>";
			html+="<td>"+indexEntry['doc_path']+"</td>";
			html+="<td style='text-align:center;'><a target=\"_blank\" href=\""+restfulURL+"/"+serviceName+"/public/"+indexEntry['doc_path']+"\" class='attachDownload' id='attachDownload-"+indexEntry['result_doc_id']+"'><i class='fa fa-download'></i></a>,<a class=\"delAttach\" id=\"delAttach-"+indexEntry['result_doc_id']+"\" href=\"#\"><i style='color:red;' class='icon-trash'></i></a></td>";
		html+="</tr>";
	});

	$("#listDataAttachFile").html(html);
	$(".delAttach").click(function(){
		var id = this.id;
		id = id.split("-");
		id=id[1];
		deleteAttachFileFn(id);
	});

}
var deleteAttachFileFn = function(id){


	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/delete_file/"+id,
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			if(data['status']==200){
				getAttachFileFn($("#item_result_id").val());
			}
		}
	});
}
/* attach function end*/
/* phase function end*/



/* reason function start*/
var deleteReasonFn = function(id){

	 $.ajax({
		      url:restfulURL+"/"+serviceName+"/public/appraisal/reason/"+$("#reason_item_result_id").val(),
		      type:"DELETE",
		      dataType:"json",
			  data:{"reason_id":id},
			  headers:{Authorization:"Bearer "+tokenID.token},
			  success:function(data){
				if(data['status']==200){

					   callFlashSlide("Delete Successfully.");       
				       getReasonFn($("#reason_item_result_id").val());
					   $("#confrimModal").modal('hide');

				}else if(data['status']=="400"){

					//$("#informConfirm").html("<font color='red'>"+data['data']+"</font>");
					callFlashSlide("<font color=''>"+data['data']+"</font>","error");  

				}
		     }
		   });
}

var findOneReasonFn = function(id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/reason/"+$("#reason_item_result_id").val()+"/"+id,
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){


				$("#reason_name").val(data['reason_name']);
				$("#reason_action").val("edit");
				$("#reason_id_edit").val(id);



		}
	});

}

var listReasonFn = function(data){
	var htmlTR="";

	//Exsample Data

	$.each(data,function(index,indexEntry){
		htmlTR+="<tr>";
			htmlTR+="<td>"+indexEntry['rank']+"</td>";
			htmlTR+="<td>"+indexEntry['reason_name']+"</td>";
			htmlTR+="<td style='text-align:center;'>";
			htmlTR+=" <i data-trigger=\"focus\" tabindex=\""+index+"\" data-content=\"&lt;button class='btn btn-warning btn-small btn-gear edit_reason' id=edit_reason-"+indexEntry['reason_id']+" data-target='' data-toggle='modal'&gt;Edit&lt;/button&gt;&nbsp;&lt;button id=del_reason-"+indexEntry['reason_id']+" class='btn btn-danger btn-small btn-gear reasonDel'&gt;Delete&lt;/button&gt;\" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-edit-del\" data-original-title=\"\" title=\"\"></i>";
			htmlTR+="</td>";
		htmlTR+="</tr>";
	});

	$("#listDataReason").html(htmlTR);

	/*bindding popover start*/
	$(".popover-edit-del").popover(setPopoverDisplay);
	$("#listDataReason").off("click",".popover-edit-del");
	$("#listDataReason").on("click",".popover-edit-del",function(){
		//Delete Start
		$(".reasonDel").on("click",function() {
			$("#informConfirm").empty();
			var id=this.id.split("-");
			id=id[1];
			$("#confrimModal").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			}).css({"margin-top":"0px"});
			//$(this).parent().parent().parent().children().click();
			$(document).off("click","#btnConfirmOK");
			$(document).on("click","#btnConfirmOK",function(){
				//alert(id);
				deleteReasonFn(id);

			});

		});
		//findOne Start
		$(".edit_reason").on("click",function() {

			$(window).scrollTop(0);
			var edit=this.id.split("-");
			var id=edit[1];
			//alert(id+"-----"+form_url);
			findOneReasonFn(id);
			$(".modal-body").scrollTop(0);
		});
	});
	/*bindding popover end*/



}
var clearFormReasonFn = function(){
	 $("#reason_name").val("");
	 $("#reason_id_edit").val("");
	 $("#reason_action").val("add");

}
var getReasonFn = function(id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/reason/"+id,

		type:"get",
		dataType:"json",
		async:false,
		//data:{"item_result_id":id},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//console.log(data);
			listReasonFn(data);
		}
	});

}
/* reason function start*/


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
		htmlHTML+="<table id=\"tablethreshould\" class=\"table table-striped\" style=\"max-width: none\">";

		htmlHTML+=" <thead>";
			htmlHTML+=" <tr>";

			if($("#embed_appraisalType").val()=="2"){

				htmlHTML+=" <th style=\"width:auto;\"><b>Emp Code</b></th>";
				htmlHTML+=" <th style=\"widthauto;\"><b>Emp Name</b></th>";
				htmlHTML+=" <th style=\"width:auto;\"><b>Level</b> </th>";
				htmlHTML+=" <th style=\"width:auto;\"><b>Organization </b></th>";
				htmlHTML+=" <th style=\"width:auto;\"><b>Position</b> </th>";
				htmlHTML+=" <th style=\"width:auto;\"><b>Action</b></th>";
				//htmlHTML+=" <th style=\"width:auto; text-align:center;\"><b>Manage</b></th>";

			}else if($("#embed_appraisalType").val()=="1"){

				htmlHTML+=" <th style=\"width:auto;\"><b>Org Code</b></th>";
				htmlHTML+=" <th style=\"widthauto;\"><b>Org Name</b></th>";
				htmlHTML+=" <th style=\"width:auto;\"><b>Level</b> </th>";
				htmlHTML+=" <th style=\"width:auto;\"><b>Action</b></th>";
				//htmlHTML+=" <th style=\"width:auto; text-align:center;\"><b>Manage</b></th>";

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


				if($("#embed_appraisalType").val()=="2"){


					htmlHTML+="<tr>";

						htmlHTML+="	<td class=''><a href=\"#\" class='emp_code' id=\"id-"+itemEntry['emp_result_id']+"\" >"+itemEntry['emp_code']+"</a>";
						htmlHTML+="<input type='hidden' name='emp_appraisal_type_id-"+itemEntry['emp_result_id']+"' id='emp_appraisal_type_id-"+itemEntry['emp_result_id']+"' class='emp_appraisal_type_id' value='"+itemEntry['appraisal_type_id']+"' >";
						htmlHTML+="<input type='hidden' name='emp_period_id-"+itemEntry['emp_result_id']+"' id='emp_period_id-"+itemEntry['emp_result_id']+"' class='emp_period_id' value='"+itemEntry['period_id']+"' >";
						htmlHTML+="<input type='hidden' name='emp_emp_code-"+itemEntry['emp_result_id']+"' id='emp_emp_code-"+itemEntry['emp_result_id']+"' class='emp_emp_code' value='"+itemEntry['emp_code']+"' >";
						htmlHTML+="<input type='hidden' name='emp_appraisal_item_id-"+itemEntry['emp_result_id']+"' id='emp_appraisal_item_id-"+itemEntry['emp_result_id']+"' class='emp_appraisal_item_id' value='"+itemEntry['appraisal_item_id']+"' >";
						htmlHTML+"</td>";
						htmlHTML+=" <td>"+itemEntry['emp_name']+"</td>";
						htmlHTML+=" <td>"+itemEntry['appraisal_level_name']+"</td>";
						htmlHTML+=" <td>"+itemEntry['org_name']+"</td>";
						htmlHTML+="	<td>"+itemEntry['position_name']+"</td>";

						htmlHTML+="	<td>"+itemEntry['to_action']+"</td>";
//						htmlHTML+="	<td style=\"text-align:center\">";
//						htmlHTML+=" <i data-trigger=\"focus\" tabindex=\""+index2+"\" data-content=\"&lt;button class='btn btn-warning btn-small btn-gear phase' id=phase-"+itemEntry['org_code']+" data-target=#addModalRule data-toggle='modal'&gt;Phase&lt;/button&gt;&nbsp;&lt;button id=action_plan-"+itemEntry['org_code']+" class='btn btn-danger btn-small btn-gear action_plan'&gt;Action Plan&lt;/button&gt;\" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-edit-del\" data-original-title=\"\" title=\"\"></i>";
//						htmlHTML+="	</td>";

					htmlHTML+="</tr>";

				}else if($("#embed_appraisalType").val()=="1"){

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
//						htmlHTML+="	<td style=\"text-align:center\">";
//						htmlHTML+=" <i data-trigger=\"focus\" tabindex=\""+index2+"\" data-content=\"&lt;button class='btn btn-warning btn-small btn-gear phase' id=phase-"+itemEntry['org_code']+" data-target=#addModalRule data-toggle='modal'&gt;Phase&lt;/button&gt;&nbsp;&lt;button id=action_plan-"+itemEntry['org_code']+" class='btn btn-danger btn-small btn-gear action_plan'&gt;Action Plan&lt;/button&gt;\" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-edit-del\" data-original-title=\"\" title=\"\"></i>";
//						htmlHTML+="	</td>";

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
	/*
	// Not Use
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

		$(".phase").on("click",function(event) {

			//alert("phase3");
			clearFormPhaseFn();
			$("#informConfirm").empty();
			var id=this.id.split("-");
			id=id[1];
			$("#phaseModal").modal();
			getPhaseFn();
		});
		//$(".phase").off("click");
	});
	*/
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
	var AppraisalLevelOrg = $("#embed_AppraisalLevelOrg").val();
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
		url:restfulURL+"/"+serviceName+"/public/appraisal",
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
			"level_id_org":AppraisalLevelOrg,
			"org_id":org_id,
			"position_id":Position,
			"emp_id":EmpID,
			"appraisal_type_id":appraisal_type_id
		},
		success:function(data){

			//console.log(data);

			listDataFn(data);
			setThemeColorFn(tokenID.theme_color);
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

	var Position= $("#Position_id").val();
	//Position=Position[0];
	
	var AppraisalLevel_ = ($("#appraisalType").val() == "1") ? $("#AppraisalOrgLevel").val() : $("#AppraisalEmpLevel").val() ;

	$(".embed_param_search").remove();
	var embedParam="";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_AppraisalYear' name='embed_AppraisalYear' value='"+$("#AppraisalYear").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_AppraisalPeriod' name='embed_AppraisalPeriod' value='"+$("#AppraisalPeriod").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_AppraisalLevel' name='embed_AppraisalLevel' value='"+AppraisalLevel_+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_AppraisalLevelOrg' name='embed_AppraisalLevelOrg' value='"+$("#AppraisalOrgLevel").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_Org' name='embed_Org' value='"+$("#organization").val()+"'>";
	//embedParam+="<input type='hidden' class='embed_param_search' id='embed_Section' name='embed_Section' value='"+$("#Section").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_Position' name='embed_Position' value='"+Position+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_EmpName' name='embed_EmpName' value='"+$("#EmpName_id").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisalType' name='embed_appraisalType' value='"+$("#appraisalType").val()+"'>";

	$("#embedParamSearch").append(embedParam);

	getDataFn();
};

var dropDrowAsignToEditFn = function(paramStageID){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/edit_assign_to",
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
//var dropDrowActionEditFn = function(stage_id,to_appraisal_level_id){
var dropDrowActionEditFn = function(stage_id,employee_code,org_code){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/edit_action_to",
		type:"POST",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		//data:{"stage_id":stage_id,"to_appraisal_level_id":to_appraisal_level_id},
		data:{"stage_id":stage_id,"emp_code":employee_code,"org_code":org_code,"appraisal_type_id":$("#embed_appraisalType").val()},
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
		//http://192.168.1.52/"+serviceName+"/public/appraisal_assignment/appraisal_type_list
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/appraisal_type_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//var data=['à¸—à¸”à¸¥à¸­à¸‡à¸‡à¸²à¸™','à¸›à¸£à¸°à¸ˆà¸³à¸›à¸µ','à¸£à¸±à¸�à¸©à¸²à¸�à¸²à¸£'];
			var htmlOption="";

			//htmlOption+="<option  value=''>All Appraisal Type</option>";
			$.each(data,function(index,indexEntry){
				if(id==undefined){
						if(index==0){
							htmlOption+="<option selected='selected' value="+indexEntry['appraisal_type_id']+">"+indexEntry['appraisal_type_name']+"</option>";
						}else{
							htmlOption+="<option value="+indexEntry['appraisal_type_id']+">"+indexEntry['appraisal_type_name']+"</option>";
						}
				}else{
					if(id==indexEntry['appraisal_type_id']){
							htmlOption+="<option selected='selected' value="+indexEntry['appraisal_type_id']+">"+indexEntry['appraisal_type_name']+"</option>";
						}else{
							htmlOption+="<option value="+indexEntry['appraisal_type_id']+">"+indexEntry['appraisal_type_name']+"</option>";

					}
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
//	     item_result_id: '',
//	     score: ''
//	  },...
//	]"
	var competencyScore_First = "";
	var competencyScore_Second = "";
	var sum_ScoreCompetency = 0;
	var competencyScore_Avg = "";
	
	var appraisal="";
	appraisal+="[";
	$.each($(".itemScore").get(),function(index,indexEntry){
		var typeScore="";
		var item_result_id=$(indexEntry).attr("id");
		item_result_id=item_result_id.split("-");
		typeScore=item_result_id[0];
		item_result_id=item_result_id[1];

		if(index==0){
			appraisal+="{";
		}else{
			appraisal+=",{";
		}
		appraisal+="\"item_result_id\":\""+item_result_id+"\",";
		if(typeScore=="forecast"){
			appraisal+="\"forecast_value\":\""+removeComma($(indexEntry).val())+"\",";
			appraisal+="\"actual_value\":\"\"";
			//appraisal+="\"actual_value\":\""+$("#actual-"+item_result_id).val()+"\",";

		}else if(typeScore=="competencyScore"){
			appraisal+="\"forecast_value\":\"\",";
			appraisal+="\"actual_value\":\"\",";
			appraisal+="\"first_score\":\""+$(indexEntry).val()+"\"";
			
			competencyScore_First = parseInt($(indexEntry).val());
			
		}else if(typeScore=="competencyScore_Second"){
			appraisal+="\"forecast_value\":\"\",";
			appraisal+="\"actual_value\":\"\",";
			appraisal+="\"second_score\":\""+$(indexEntry).val()+"\",";
	
			competencyScore_Second = parseInt($(indexEntry).val());
			sum_ScoreCompetency = competencyScore_First + competencyScore_Second;
			competencyScore_Avg = sum_ScoreCompetency / 2;
			
			appraisal+="\"score\":\""+competencyScore_Avg+"\"";
		}
//			else{
//
//			appraisal+="\"forecast_value\":\"\",";
//			appraisal+="\"actual_value\":\""+$("#actual-"+item_result_id).val()+"\",";
//			appraisal+="\"score\":\"\"";
//
//		}


		appraisal+="}";
	});
	
	appraisal+="]";
	console.log(appraisal);
	var appraisalObject=eval("("+appraisal+")");
	//console.log(appraisalObject);

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/"+$("#emp_result_id").val(),
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
				
				if(emailLinkAppraisal==true) {
					var url_redirect = $(location).attr('href').split("/").splice(0, 5).join("/");
					window.location.replace(url_redirect+"/kpi-result");
					return false;
				}

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
//		url:restfulURL+"/"+serviceName+"/public/appraisal/calculate_weight",
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


var generateGanttChartFn = function(dataSource){

    var revgannttChart = new FusionCharts({
    	type: 'gantt',
        renderAt: 'ganttChart',
        width: '100%',
        //height: '600',
        dataFormat: 'json',
        dataSource: dataSource
    })
    .render();

 return false;
};
var diffDateFn =function(date1,date2){
	// Here are the two dates to compare
	/*
	var date1 = '2011-12-24';
	var date2 = '2012-02-01';
	*/
	// First we split the values to arrays date1[0] is the year, [1] the month and [2] the day
	date1 = date1.split('-');
	date2 = date2.split('-');

	// Now we convert the array to a Date object, which has several helpful methods
	date1 = new Date(date1[0], date1[1], date1[2]);
	date2 = new Date(date2[0], date2[1], date2[2]);

	// We use the getTime() method and get the unixtime (in milliseconds, but we want seconds, therefore we divide it through 1000)
	date1_unixtime = parseInt(date1.getTime() / 1000);
	date2_unixtime = parseInt(date2.getTime() / 1000);

	// This is the calculated difference in seconds
	var timeDifference = date2_unixtime - date1_unixtime;

	// in Hours
	var timeDifferenceInHours = timeDifference / 60 / 60;

	// and finaly, in days :)
	var timeDifferenceInDays = timeDifferenceInHours  / 24;

		if(timeDifferenceInDays>365){
			timeDifferenceInDays=365;
		}
	return timeDifferenceInDays;
}

var getDataGanttChartFn = function(item_result_id,ganttPaneDuration,ganttPaneDurationUnit){
	var ganttPaneDurationVarible="";
	var ganttPaneDurationUnit="";


	if(ganttPaneDurationUnit==undefined || ganttPaneDurationUnit==""){
		ganttPaneDurationUnit='d';
	}else{
		ganttPaneDurationUnit=ganttPaneDurationUnit;
	}



	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/dashboard/gantt",
		type:"get",
		dataType:"json",
		data:{"item_result_id":item_result_id},
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
		//console.log(data);
			var tasksLength=0;
			var startDate="";
			var endDate="";
			tasksLength=data['tasks']['task'].length;
			if(tasksLength>0){

				startDate=data['tasks']['task'][0]['start'];
				endDate=data['tasks']['task'][(tasksLength-1)]['end'];

				console.log("ganttPaneDuration="+ganttPaneDuration);
				if(ganttPaneDuration==undefined || ganttPaneDuration==""){
					ganttPaneDurationVarible=diffDateFn(startDate,endDate);
					console.log(diffDateFn(startDate,endDate));
				}else{
					ganttPaneDurationVarible=ganttPaneDuration;
				}
			//console.log(diffDateFn(startDate,endDate));
			//alert(ganttPaneDurationVarible);
				//$("#selectGanntChartViewDaily").val(ganttPaneDurationVarible);
				$("#selectGanntChartViewDaily").val(365);
			}else{
				$("#selectGanntChartViewDaily").val(1);
			}
		if(data['header']['emp_name']=="" || data['header']['emp_name']==null){
			$(".ganntChartTitleOrg").show();
			$(".ganntChartTitleEmp").hide();
		}else{
			$(".ganntChartTitleOrg").hide();
			$(".ganntChartTitleEmp").show();
		}
		$(".ganttOrgTxt").text(data['header']['org_name']);
		$(".ganttAppraisalItemTxt").text(data['header']['item_name']);
		$(".ganttAppraisalPeriodDescTxt").text(data['header']['appraisal_period_desc']);
		$(".ganttEmpTxt").text(data['header']['emp_name']);

			var dataGantt="";
			var objectGantt={};
			objectGantt={
	            "chart": {
	            	"exportenabled": "1",
	                "exportatclient": "1",
	                //"caption": "Action Plan",
	                //"subcaption": "Planned vs Actual",
	                "dateformat": "dd/mm/yyyy",
	                "outputdateformat": "ddds mns yy",
	                "ganttwidthpercent": "60",
	                "ganttPaneDuration": "365",
	               // "ganttPaneDuration": ganttPaneDurationVarible,
	               // "ganttPaneDurationUnit": "d",
	                "ganttPaneDurationUnit": ganttPaneDurationUnit,
	                "plottooltext": "$processName{br} $label starting date $start{br}$label ending date $end",
	                "legendBorderAlpha": "0",
	                "legendShadow": "0",
	                "usePlotGradientColor": "0",
	                "showCanvasBorder": "0",
	                "flatScrollBars": "1",
	                "gridbordercolor": "#333333",
	                "gridborderalpha": "5",
	                "slackFillColor": "#e44a00",
	                "taskBarFillMix": "light+0"
	            },
	             "categories":data['categories'],
	             "processes":data['processes'],
	             "datatable":data['datatable'],
	             "tasks":data['tasks'],
	             "legend": {
	                 "item": [
	                     {
	                         "label": "Planned",
	                         "color": "#008ee4"
	                     },
	                     {
	                         "label": "Actual",
	                         "color": "#6baa01"
	                     },
	                     {
	                         "label": "Slack (Delay)",
	                         "color": "#e44a00"
	                     }
	                 ]
	             }
	            /*
	            "categories":data['categories'],
	            "processes":data['processes'],
	            "datatable":data['datatable'],
	            "tasks":data['tasks']
	            */

	        }
			//console.log(objectGantt);
			generateGanttChartFn(objectGantt);

			/* test here start*/
			$("#ganttChartModal").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			}).css({"margin-top":"0px"});
			/* test here end.*/
//			var dataGantt="";

//
//				dataGantt+="{";
//				dataGantt+="\"chart\": {";
//				dataGantt+="\"exportenabled\": \"1\",";
//				dataGantt+="\"exportatclient\": \"1\",";
//				dataGantt+="\"caption\": \"Construction management of a new store in Denver\",";
//				dataGantt+="\"subcaption\": \"Planned vs Actual\",";
//				dataGantt+="\"dateformat\": \"dd/mm/yyyy\",";
//				dataGantt+="\"outputdateformat\": \"ddds mns yy\",";
//				dataGantt+="\"ganttwidthpercent\": \"60\",";
//				dataGantt+="\"ganttPaneDuration\": \"40\",";
//				dataGantt+="\"ganttPaneDurationUnit\": \"d\",";
//				dataGantt+="\"plottooltext\": \"$processName{br} $label starting date $start{br}$label ending date $end\",";
//				dataGantt+="\"legendBorderAlpha\": \"0\",";
//				dataGantt+="\"legendShadow\": \"0\",";
//				dataGantt+="\"usePlotGradientColor\": \"0\",";
//				dataGantt+="\"showCanvasBorder\": \"0\",";
//				dataGantt+="\"flatScrollBars\": \"1\",";
//				dataGantt+="\"gridbordercolor\": \"#333333\",";
//				dataGantt+="\"gridborderalpha\": \"20\",";
//				dataGantt+="\"slackFillColor\": \"#e44a00\",";
//				dataGantt+="\"taskBarFillMi\": \"light+0\"";
//				dataGantt+="}";
//				//dataGantt+=data;
//			dataGantt+="}";


		}
	});
};

var listViewDailyOrMonthlyFn = function(){
	html="";
	for(var i=1;i<=365;i++){
		if(i==1){
			html+="<option value="+i+">"+i+" day</option>";
		}else{
			html+="<option value="+i+">"+i+" days</option>";
		}

	}
	$("#selectGanntChartViewDaily").html(html);
}

$(document).ready(function() {

//	var username = getParamValue('username');
//	var password = getParamValue('password');

	username = $('#user_portlet').val();
	password = $('#pass_portlet').val();
	var plid = $('#plid_portlet').val();

	if(username!="" && username!=null & username!=[] && username!=undefined ){
		if(connectionServiceFn(username,password,plid)==true){
			
			var dataClearParam = [
				{'id':'#Position', 'val': ""},
				{'id':'#Position_id', 'val': ""},
				{'id':'#EmpName', 'val': ""},
				{'id':'#EmpName_id', 'val': ""}
			];
			
			var dataSetParam = [
				{'id':'#Position', 'val': ""+cMain_position_name+""},
				{'id':'#Position_id', 'val': cMain_position_id},
				{'id':'#EmpName', 'val': ""+cMain_emp_name+"("+session_emp_code+")"},
				{'id':'#EmpName_id', 'val': cMain_emp_id},
				{'id':'#AppraisalEmpLevel', 'val': ""+cMain_level_id+""}
			];
			
			//Start Action plan by email link here..
			setTimeout(function() {
			  if ($("#param_link").val() == "email") {
			    $("#actionPlanModal").modal({
			    	"backdrop" : setModalPopup[0],
					"keyboard" : setModalPopup[1]
			    }).css({
			      "margin-top": "0px"
			    });
			    getActionPlanFn($("#param_item_result_id").val());
			    $("#action_actionplan").val("add");
			  }
			}, 3000);
			//End Action plan by email link here..

			//Test Fusion Chart Start
			//getDataGanttChartFn();

			$("#assignTo").removeAttr("disabled");
			$("#actionToAssign").removeAttr("disabled");
			$("#btnSubmit").removeAttr("disabled");

	//set parameter start
			
			dropDrowYearListFn();
			$("#AppraisalYear").change(function(){
				dropDrowPeriodListFn($(this).val());
			});
			
			appraisalTypeFn();
			$("#appraisalType").change(function() {
			  if ($("#appraisalType").val() == 1) {
			    $("#Position").val("").prop("disabled", true);
			    $("#EmpName").val("").prop("disabled", true);
				$("#AppraisalEmpLevel").prop("disabled", true);
				dropDrowAppraisalOrgLevelFn();
			  } else {
			    $("#Position").prop("disabled", false);
			    $("#EmpName").prop("disabled", false);
				$("#AppraisalEmpLevel").prop("disabled", false);
				dropDrowAppraisalEmpLevelFn();				
			  }
			});
			$("#appraisalType").change();
			
			$("#AppraisalEmpLevel").change(function(){
				clearParamSearch(dataClearParam);// in cMain.js
				dropDrowIndividualOrgLevelFn($(this).val());
			});
			
			$("#AppraisalOrgLevel").change(function(){
				clearParamSearch(dataClearParam);// in cMain.js
				
				if($("#appraisalType").val() == "1"){
					dropDrowOrgFn($(this).val());
				} else {
					dropDrowIndividualOrgFn($(this).val());
				}
			});
			
			$("#organization").change(function(){
				clearParamSearch(dataClearParam);// in cMain.js
			});
			
			setParamSearch(dataSetParam);// in cMain.js

			//Auto complete Start
			

			$("#Position").autocomplete({
		        source: function (request, response) {
		        	$.ajax({
		        		
		        		url:restfulURL+"/"+serviceName+"/public/appraisal/parameter/auto_position_list",
						type:"post",
						dataType:"json",
						async:false,
						headers:{Authorization:"Bearer "+tokenID.token},
						data:{"emp_code":request.term},
						 data:{
							 	"position_name":request.term ,
							 	"emp_name":($("#EmpName_id").val()==""?"":$("#EmpName").val().split("(")[0]),
							 	"org_id":$("#organization").val()
						 },

						//async:false,
						 headers:{Authorization:"Bearer "+tokenID.token},
		                 error: function (xhr, textStatus, errorThrown) {
		                        console.log('Error: ' + xhr.responseText);
		                    },
						 success:function(data){
							  
								response($.map(data, function (item) {
		                            return {
		                                label: item.position_name,
		                                value: item.position_name,
		                                position_id : item.position_id
		                                
		                            };
		                        }));
							
						},
						beforeSend:function(){
							$("body").mLoading('hide');	
						}
						
						});
		        },
				select:function(event, ui) {
					$("#Position").val(ui.item.value);
		            $("#Position_id").val(ui.item.position_id);
		            galbalDataTemp['position_name'] = ui.item.label;
		            galbalDataTemp['position_id']=ui.item.position_id;
		            return false;
		        },change: function(e, ui) {  

		 
					if ($("#Position").val() == galbalDataTemp['position_name']) {
						$("#Position_id").val(galbalDataTemp['position_id']);
					}  else if (ui.item != null){
						$("#Position_id").val(ui.item.position_id);
					}else {
						$("#Position_id").val("");
					}
		         }
		    });
			var empNameAutoCompelteChangeToPositionName = function(name) {
				
//				var empNameCodeToPosition= $("#empName").val().split("-");
//				empNameCodeToPosition=empNameCodeToPosition[1];
				
				$.ajax({
					url:restfulURL+"/"+serviceName+"/public/appraisal/parameter/auto_position_list",
					type:"post",
					dataType:"json",
					async:false,
					headers:{Authorization:"Bearer "+tokenID.token},
					data:{"emp_name":name},
					success:function(data){
						if(data.length!==0) {
							$("#Position_id").val(data[0].position_id);
							$("#Position").val(data[0].position_name);
							galbalDataTemp['position_name'] = data[0].position_name;
							galbalDataTemp['position_id'] = data[0].position_id;
						}
					}
				});
		}

		$("#EmpName").autocomplete({
				
		        source: function (request, response) {
		        	$.ajax({
						 url:restfulURL+"/"+serviceName+"/public/appraisal/parameter/auto_emp_list",
						 type:"GET",
						 dataType:"json",
						 data:{
							 "emp_name":request.term,
							 "emp_code":session_emp_code,
							 "org_id":$("#organization").val(),
							 "level_id":$("#AppraisalEmpLevel").val()
							 },
						//async:false,
						 headers:{Authorization:"Bearer "+tokenID.token},
		                 error: function (xhr, textStatus, errorThrown) {
		                        console.log('Error: ' + xhr.responseText);
		                    },
						 success:function(data){
							  	console.log(data)
								response($.map(data, function (item) {
		                            return {
		                                label: item.emp_name+"("+item.emp_code+")",
		                                value: item.emp_name,
		                                emp_id: item.emp_id,
		                                emp_code: item.emp_code
		                            };
		                        }));
							
						},
						beforeSend:function(){
							$("body").mLoading('hide');	
						}
						
						});
		        },
				select:function(event, ui) {
					$("#EmpName").val(ui.item.label);
		            $("#EmpName_id").val(ui.item.emp_id);
		            galbalDataTemp['EmpName'] = ui.item.label;
		            galbalDataTemp['EmpName_id']=ui.item.emp_id;
		            empNameAutoCompelteChangeToPositionName(ui.item.value);
		            return false;
		        },change: function(e, ui) {  
					if ($("#EmpName").val() == galbalDataTemp['EmpName']) {
						$("#EmpName_id").val(galbalDataTemp['EmpName_id']);
					} else if (ui.item != null){
						$("#EmpName_id").val(ui.item.emp_id);
					} else {
						$("#EmpName_id").val("");
						
					}
		        	
		         }
		    });
			
			
			
			//Auto Complete End


		// Search
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
				$(".datepicker").focus(function(){
					 $("#ui-datepicker-div").css({"z-index": "999999"});
				 });




				//Autocomplete START.
				 $(".responsible").autocomplete({
				        source: function (request, response) {
				        	$.ajax({
								 url:restfulURL+"/"+serviceName+"/public/appraisal/action_plan/auto_employee_name",
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


		  $(".app_url_hidden").show();


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
					  /*
					  plan_value=$("#plan_value-"+i).val();
					  actual_cost=$("#actual_cost-"+i).val();
					  earned_value=$("#earned_value-"+i).val();*/
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
							  //plan_value: ""+plan_value+"",
							  //actual_cost: ""+actual_cost+"",
							  //earned_value: ""+earned_value+"",
							  completed_percent: ""+completed_percent+"",
							 // responsible: ""+responsible+"",
							  emp_id:emp_id

					   });
			  });
				//console.log("actions");
				//console.log(actions);


					$.ajax({
						     url:restfulURL+"/"+serviceName+"/public/appraisal/action_plan/"+$("#item_result_id").val(),
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
						  /*
						  plan_value=$("#new_plan_value-"+i).val();
						  actual_cost=$("#new_actual_cost-"+i).val();
						  earned_value=$("#new_earned_value-"+i).val();*/
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
								  //plan_value: ""+plan_value+"",
								 // actual_cost: ""+actual_cost+"",
								  //earned_value: ""+earned_value+"",
								  completed_percent: ""+completed_percent+"",
								 // responsible: ""+responsible+"",
								  emp_id:emp_id

						   });
				  });
					//console.log("actions");
					//console.log(actions);

					  $.ajax({
						     url:restfulURL+"/"+serviceName+"/public/appraisal/action_plan/"+$("#item_result_id").val(),
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




			 	// console.log(actions);


					  $.ajax({
						     url:restfulURL+"/"+serviceName+"/public/appraisal/action_plan/"+$("#item_result_id").val(),
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
					     url:restfulURL+"/"+serviceName+"/public/phase",
					     type:"POST",
					     dataType:"json",
					     data:{"phase_name": $("#phaseName").val(),"is_active":is_active,"item_result_id":$("#phase_item_result_id").val()},
						 headers:{Authorization:"Bearer "+tokenID.token},
					     success:function(data,status){

							if(data['status']==200){
								getPhaseFn($("#phase_item_result_id").val());
								clearFormPhaseFn();

							}else if(data['status']=="400"){

								//$("#informConfirm").html("<font color='red'>"+data['data']+"</font>");
								callFlashSlide("<font color=''>"+data['data']['phase_name']+"</font>","error");  

							}


					}
			 	});

		 	}else{

		 		 $.ajax({
						     url:restfulURL+"/"+serviceName+"/public/phase/"+$("#pahse_id_edit").val(),
						     type:"PATCH",
						     dataType:"json",
						     data:{"phase_name": $("#phaseName").val(),"is_active":is_active,"item_result_id":$("#phase_item_result_id").val()},
							 headers:{Authorization:"Bearer "+tokenID.token},
						     success:function(data,status){

								if(data['status']==200){
									getPhaseFn($("#phase_item_result_id").val());
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
		 getPhaseFn($("#phase_item_result_id").val());
	 });
	//Phase End...

	//Reason Start..
	 $(document).on("click","#btnSaveReason",function(){



		 	if($("#reason_action").val()=="add"){


			 	  $.ajax({
					     url:restfulURL+"/"+serviceName+"/public/appraisal/reason/"+$("#reason_item_result_id").val(),
					     type:"POST",
					     dataType:"json",
					     data:{"reason_name": $("#reason_name").val()},
						 headers:{Authorization:"Bearer "+tokenID.token},
					     success:function(data,status){

							if(data['status']==200){
								getReasonFn($("#reason_item_result_id").val());
								clearFormReasonFn();

							}else if(data['status']=="400"){

								//$("#informConfirm").html("<font color='red'>"+data['data']+"</font>");
								callFlashSlide("<font color=''>"+data['data']['reason_name']+"</font>","error");  

							}


					}
			 	});

		 	}else{

		 		 $.ajax({
						     url:restfulURL+"/"+serviceName+"/public/appraisal/reason/"+$("#reason_item_result_id").val(),
						     type:"PATCH",
						     dataType:"json",
						     data:{"reason_name": $("#reason_name").val(),"reason_id":$("#reason_id_edit").val()},
							 headers:{Authorization:"Bearer "+tokenID.token},
						     success:function(data,status){

								if(data['status']==200){
									getReasonFn($("#reason_item_result_id").val());
									clearFormReasonFn();
								}else if(data['status']=="400"){

									//$("#informConfirm").html("<font color='red'>"+data['data']+"</font>");
									callFlashSlide("<font color=''>"+data['data']['phase_name']+"</font>","error");  

								}


						}
				 	});

		 	}

	 });

	 $(document).on("click","#btnCancelReason",function(){
		 clearFormReasonFn();
		 getReasonFn($("#reason_item_result_id").val());
	 });
	//Reason End...



	//binding tooltip start
	 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
	 $('[data-toggle="tooltip"]').tooltip({
		 html:true
	 });
	//binding tooltip end


	 //gantt chart print start
	 $("#btnPrint").click(function(){


		 var url="../../see-kpi-portlet/print/gantt-chart.jsp?restfulURL="+restfulURL+"&item_result_id="+$("#gantt_item_result_id").val()+"&gantt_unit="+$("#gantt_unit").val()+"&gantt_amount="+$("#gantt_amount").val()+"";
		 url+="&entityType="+$("#embed_appraisalType").val();
		 url+="&period="+$(".ganntChartTitleEmpArea .ganttAppraisalPeriodDescTxt").text();
		 url+="&organization="+$(".ganntChartTitleEmpArea  .ganttOrgTxt").text();
		 url+="&appraisalItem="+$(".ganntChartTitleEmpArea  .ganttAppraisalItemTxt").text();
		 url+="&employee="+$(".ganntChartTitleEmpArea  .ganttEmpTxt").text();

		 window.open(url, '_blank');
	 });

	 //gantt chart print edn

	 //gantt chart  view daily or monthly start.
	 listViewDailyOrMonthlyFn();
	 $("#selectGanntChartType").change(function(){

	 	if($(this).val()=="m"){
	 		$("#selectGanntChartViewDaily").hide();
	 		$("#selectGanntChartViewMonthly").show();
	 	}else{
	 		$("#selectGanntChartViewDaily").show();
	 		$("#selectGanntChartViewMonthly").hide();
	 	}
	 	$("#gantt_unit").val($(this).val());
	 });
	 $("#selectGanntChartType").change();
	 $("#btnGanttSubmit").click(function(){

		if($("#gantt_unit").val()=="m"){
			$("#gantt_amount").val($("#selectGanntChartViewMonthly").val());
		}else{
			$("#gantt_amount").val($("#selectGanntChartViewDaily").val());
		}

		getDataGanttChartFn($("#gantt_item_result_id").val(),$("#gantt_amount").val(),$("#gantt_unit").val());

	 });
	 //gantt chart  view daily or monthly end.



	//Button Click Stage History Start.

	$("#slideUpDownStageHistory").click(function(){
		$("#slideStageHistory").slideToggle();
		return false;
	});

	//Button Click Stage History End.



	//####  FILE IMPORT  START ####

	// Add events
	$('#attach_files_attachment').on('change', prepareUpload);

	// Grab the files and set them to our variable
	function prepareUpload(event)
	{
	  files = event.target.files;
	  //start upload file
	  //uploadFiles(event);

	}

	$('form#attachFileForm').on('submit', uploadFiles);
	function uploadFiles(event)
	{
		var validate_header_id="";
		if(!$("#attach_files_attachment").val()){
			return false;

		}
	  event.stopPropagation(); // Stop stuff happening
	  event.preventDefault(); // Totally stop stuff happening

		// Create a formdata object and add the files
		var data = new FormData();
		//console.log(data);
		jQuery_1_1_3.each(files, function(key, value)
		{
			data.append(key, value);
			//data.append("process_type",$("#embedParamSearchProcessType").val());
		});


		jQuery_1_1_3.ajax({
			url:restfulURL+"/"+serviceName+"/public/appraisal/upload_file/"+$("#attach_file_item_result_id").val(),
			type: 'POST',
			data: data,
			cache: false,
			dataType: 'json',
			processData: false, // Don't process the files
			contentType: false, // Set content type to false as jQuery will tell the server its a query string request
			headers:{Authorization:"Bearer "+tokenID.token},
			async:false,
			success: function(data, textStatus, jqXHR)
			{
				//console.log(data);
				if(data['status']==200 && data['data'].length>0){

					callFlashSlideInModal("Upload Successfully.",".information");
					$('#attach_files_attachment').val("");
					$(".dropify-clear").click();

				}else{

					//callFlashSlideInModal("Can't Upload file .","#information3");
				}
			},
			error: function(jqXHR, textStatus, errorThrown)
			{
				// Handle errors here
				//console.log('ERRORS: ' + textStatus);
				callFlashSlideInModal('ERRORS: ' + textStatus,".information");
				// STOP LOADING SPINNER
			}
		});


		return false;
	}
	//### FILE IMPORT END ###
	// download attach file start
	$("#btnDownloadAttachFile").click(function(){

		$("#informConfirm").empty();
		var id=$("#item_result_id").val();
		$("#downloadAttachFileModal").modal({
			"backdrop" : setModalPopup[0],
			"keyboard" : setModalPopup[1]
		}).css({"margin-top":"0px"});
		getAttachFileFn(id);
	});
	//download attahc file end
});
