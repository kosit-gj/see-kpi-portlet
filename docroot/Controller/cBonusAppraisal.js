
//Global variable
var globalSevice=[];
var globalDataTemp=[];
globalDataTemp['MonthlyBonusRate'];
var globalData;

const pageNumberDefault=1;

globalSevice['restfulPathGlobal']=restfulURL + "/" + serviceName + "/public/bonus";

//Parameter Sevice
globalSevice['restfulPathDropDownYear']= globalSevice['restfulPathGlobal'] +"/advance_search/year";
globalSevice['restfulPathDropDownBonusPeriod']= globalSevice['restfulPathGlobal']+ "/advance_search/period";

//Bonus Appraisal Sevice
globalSevice['restfulPathBonusAppraisal']=globalSevice['restfulPathGlobal'] + "/bonus_appraisal";
//globalSevice['restfulPathBonusAppraisalCalculate']=globalSevice['restfulPathBonusAppraisal']+"/calculate";

//Monthly Bonus Rate Sevice
globalSevice['restfulPathMonthlyBonusRate']=restfulURL + "/" + serviceName + "/public/system_config";





var generateDropDownList = function(url,type,request,initValue){
 	var html="";
 	var firstItem=false;
 	if(initValue!=undefined){
 		html+="<option selected value=''>"+initValue+"</option>";
	}else{
	 	var firstItem=true;
	}

 	$.ajax ({
 		url:url,
 		type:type ,
 		dataType:"json" ,
 		data:request,
 		headers:{Authorization:"Bearer "+tokenID.token},
 		async:false,
 		success:function(data){
 			 			
 			$.each(data,function(index,indexEntry){
 				if(firstItem == true){
 					html+="<option selected value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1] == undefined  ?  Object.keys(indexEntry)[0]:Object.keys(indexEntry)[1]]+"</option>";
 					firstItem=false;
 				}else{
 					html+="<option value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1] == undefined  ?  Object.keys(indexEntry)[0]:Object.keys(indexEntry)[1]]+"</option>";
 				}
 					
 			});	

 		}
 	});	
 	return html;
 };



//Check Validation
var validationFn = function(data){
	var validate = "";
	var count = 0;
	$.each(data['data'], function(index, indexEntry) {

		if (index != undefined) {
			if (count == 0) {
				validate += "<font color='red'>* </font>" + indexEntry + "";
			} else {
				validate += "<br><font color='red'>* </font> " + indexEntry + " ";
			}
		}

		count++;
	});
	
	callFlashSlideInModal(validate,"#information","error");
};	

var getPathMonthlyBonusRateFn = function(){
	
	var monthly_bonus_rate=0;
	
 	$.ajax ({
 		url:globalSevice['restfulPathMonthlyBonusRate'],
 		type:"get" ,
 		dataType:"json" ,
 		//data:request,
 		headers:{Authorization:"Bearer "+tokenID.token},
 		async:false,
 		success:function(data){
 			 			
 			monthly_bonus_rate=data.monthly_bonus_rate;

 		}
 	});	
 	return monthly_bonus_rate;
 	
};


//--------  GetData Start
var getDataFn = function(page,rpp){

	var year= $("#param_year").val();
	var period_id= $("#param_bonus_period_id").val();
	
	$.ajax({
		url : globalSevice['restfulPathBonusAppraisal'],
		type : "post",
		dataType : "json",
		data:{"page":page,"rpp":rpp,
			"appraisal_year":year,
			"period_id":period_id,
			"action": "search"},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success : function(response) {
			
			globalData = response;
			if(response.status == 200){ 
				listBonusAppraisal(response);
				paginationSetUpFn(response.datas.current_page, response.datas.last_page, response.datas.last_page);
				
				if(response.edit_flag == 1 && response.datas.data.length > 0){
					$("#btn_search_recalculate").prop("disabled", false);
					$("#btn_save_bonus_appraisal").prop("disabled", false);
					$("#btn_cancel_bonus_appraisal").prop("disabled", false);
				} else {
					$("#btn_search_recalculate").prop("disabled", true);
					$("#btn_save_bonus_appraisal").prop("disabled", true);
					$("#btn_cancel_bonus_appraisal").prop("disabled", true);
					callFlashSlide(response.message);
				}
			} else {
				callFlashSlide(response.message);
			}
		}
	});
};


var getDataReCalculateFn = function(){
	//alert("Page : "+page+" - Rpp : "+rpp);


	var appraisal_year= $("#param_year").val();
	var period_id= $("#param_bonus_period_id").val();
	var data_bonus = [];
	$.each($("#listBonusAppraisal").find("tr[edit_flag='1']").get(),function(index,indexEntry){
		data_bonus.push({
			 "org_result_judgement_id"	: $(this).attr("org_result_judgement_id"),
		     "adjust_result_score"		: $(this).find('.inputAdjustResultScore').autoNumeric('get'),
		     "emp_result_judgement_id"	: $(this).attr("emp_result_judgement_id"),
		     "emp_adjust_result_score"	: ($(this).attr("emp_result_judgement_id") == "" ? "" : $(this).find('.inputEmpAdjustResultScore ').autoNumeric('get')),
		     "emp_result_score"	: ($(this).attr("emp_result_judgement_id") == "" ? "" : $(this).find('.inputEmpResultScore ').text())
		});
  
	 });
	
	$.ajax({
		url : globalSevice['restfulPathBonusAppraisal'],
		type : "post",
		dataType : "json",
		data:{
			"page"				:	$("#pageNumber").val(),
			"rpp"				:	$("#rpp").val(),
			"appraisal_year"	:	appraisal_year,
			"period_id"			:	period_id,
			"data" 				: 	data_bonus,
			"calculate_flag"	:	0,
			"action"			:	"re-calculate"
			},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success : function(response) {
			listBonusAppraisal(response);
			globalData=response;
			paginationSetUpFn(response.datas.current_page, response.datas.last_page, response.datas.last_page);
		}
	});
	
	
};
//--------  GetData End
var listBonusAppraisal = function(response){
	var html ="";
	if(response.length==0) {
		html +="<tr>";
		html +="<td colspan=\"10\">";
		html +="<div style='margin-top: 40px;margin-bottom: 40px;font-weight: bold;color: #e04747;' align='center'>No Data to Display.</div>";
		html +="</td>";
		html +="</tr";
		$("#listBonusAppraisal").html(htmlHTML);

		return;
	}
	$.each(response.datas.data,function(index,indexEntry) {

		if(indexEntry.org_code == indexEntry.parent_org_group){
			html += scriptGenerateHtmlListBonusAppraisalFn(indexEntry,"",response.edit_flag);
		} else {
			html += scriptGenerateHtmlListBonusAppraisalFn(indexEntry,"&emsp;",response.edit_flag);
		}
		
	});

	$("#listBonusAppraisal").html(html);
	scriptBtnSaveAndCancelFn();
	scriptDataToggleFn();
	var option ={
			vMin : '0',
			vMax : '100',
			lZero: 'deny',
			wEmpty: 'zero',
			//aSign : ' %',
			//pSign : 's'
		};
	scriptInputAutoNumeric(".numberOnly",option);
};

var scriptGenerateHtmlListBonusAppraisalFn = function(indexEntry,sub_departments,editFlag){
	var fontBold = "";
	if(sub_departments == ""){
		fontBold = "font-bold row-darker";
	}
	var html ="";
	html += "<tr class='rowSearch "+fontBold+"' " +
			"org_result_judgement_id='"+indexEntry.org_result_judgement_id+"' " +
			"emp_result_judgement_id='"+ notNullTextFn(indexEntry.emp_result_judgement_id)+"' " +
			"edit_flag='"+editFlag+"' >";
	html += "<td class='columnSearch' >"+ sub_departments +indexEntry.appraisal_level_name + "</td>";
	html += "<td class='columnSearch' >"+ indexEntry.org_name + "</td>";
	html += "<td class='columnSearch' style='text-align: right;'>"+ addCommas(notNullTextFn(indexEntry.avg_result_score.toString())) + "</td>";
	html += "<td class='columnSearch' style='text-align: right;'>" ;
	if(editFlag && indexEntry.org_result_judgement_id != null){
		
		html += "	<div class='float-label-control ' >";
		html += "	<input type='text' class='form-control inputAdjustResultScore numberOnly'";
		html += "		data-toggle='tooltip' data-original-title='"+$(".lt-adjust-result-score").val()+"' ";
		html += "		placeholder='ปรับผลประเมิน'";
		//html += "		id='inputAdjustResultScore'";
		//html += "		name='inputAdjustResultScore' ";
		html += "		value='"+indexEntry.adjust_result_score+"' >";
		html += "	</div>";
		
	}else{
		html += addCommas(notNullTextFn(indexEntry.adjust_result_score).toString()) ;
	}
	html += "</td>";
	html += "<td class='columnSearch' style='text-align: right;'>"+ addCommas(notNullTextFn(indexEntry.total_salary).toString()) + "</td>";
	html += "<td class='columnSearch' style='text-align: right;'>"+ addCommas(notNullTextFn(indexEntry.bonus_score).toString()) + "</td>";
	html += "<td class='columnSearch' style='text-align: right;'>"+ addCommas(notNullTextFn(indexEntry.bonus_percent).toString()) + "</td>";
	html += "<td class='columnSearch' >"+ notNullTextFn(indexEntry.emp_name) + "</td>";
	html += "<td class='columnSearch inputEmpResultScore' style='text-align: right;'>"+ addCommas(notNullTextFn(indexEntry.emp_result_score).toString()) + "</td>";
	html += "<td class='columnSearch' style='text-align: right;'>" ;
	if(editFlag  && indexEntry.emp_result_judgement_id != null){
		
		html += "	<div class='float-label-control ' >";
		html += "	<input type='text' class='form-control inputEmpAdjustResultScore numberOnly'";
		html += "		data-toggle='tooltip' data-original-title='"+$(".lt-adjust-result-score").val()+"'";
		html += "		placeholder='ปรับผลประเมิน'";
		//html += "		id='inputEmpAdjustResultScore'";
		//html += "		name='inputEmpAdjustResultScore' ";
		html += "		value='"+indexEntry.emp_adjust_result_score+"' >";
		html += "	</div>";
		
	}else{
		html += addCommas(notNullTextFn(indexEntry.emp_adjust_result_score).toString()) ;
	}
	html += "	</td>";
	html += "</tr>";
	
	return html;

};
var scriptBtnSaveAndCancelFn = function(){
	
	$("#btn_save_bonus_appraisal , #btn_cancel_bonus_appraisal").off("click");
	$("#btn_save_bonus_appraisal ").on("click",function(){
		
		$("#from_monthly_bonus_rate").val(getPathMonthlyBonusRateFn());
		$("#inform_on_confirm").html("");
		
		$("#confrimModal").modal({
			"backdrop" : setModalPopup[0],
			"keyboard" : setModalPopup[1]
		});
		
		scriptBtnConfirmYesFn();
		scriptBtnConfirmNoFn();
		
		
	});
	$("#btn_cancel_bonus_appraisal").on("click",function(){
		$("body").mLoading('show');
		listBonusAppraisal(globalData);
		setTimeout(function(){ 
			$("body").mLoading('hide');
		}, 150);
	});
};
var scriptBtnConfirmYesFn = function(){
	$(document).off("click","#btnConfirmOK");
	$(document).on("click","#btnConfirmOK",function(){
		var appraisal_year= $("#param_year").val();
		var period_id= $("#param_bonus_period_id").val();
		var monthly_bonus_rate = $("#restfulPathBonusAppraisal").val();
		var data_bonus = [];
		$.each($("#listBonusAppraisal").find("tr[edit_flag='1']").get(),function(index,indexEntry){
			data_bonus.push({
				 "org_result_judgement_id"	: $(this).attr("org_result_judgement_id"),
			     "adjust_result_score"		: $(this).find('.inputAdjustResultScore').autoNumeric('get'),
			     "emp_result_judgement_id"	: $(this).attr("emp_result_judgement_id"),
			     "emp_adjust_result_score"	: ($(this).attr("emp_result_judgement_id") == "" ? "" : $(this).find('.inputEmpAdjustResultScore ').autoNumeric('get')),
			     "emp_result_score"	: ($(this).attr("emp_result_judgement_id") == "" ? "" : $(this).find('.inputEmpResultScore ').text())
			});
	  
		 });
		
		$.ajax({
			 url: globalSevice['restfulPathBonusAppraisal'],
			 type : "patch",
			 dataType:"json",
			 async:false,
			 data:{
				 
				 appraisal_year		:	appraisal_year,
				 period_id			:	period_id,
				 monthly_bonus_rate : 	$("#from_monthly_bonus_rate").val(),
				 data 				: 	data_bonus,
				 calculate_flag		:	1
			 },
			 headers:{Authorization:"Bearer "+tokenID.token},
		     success:function(data){
			     	if(data.status == 200){
			     		
			     		getDataFn($("#pageNumber").val(),$("#rpp").val());
			     		callFlashSlide("Save and Recalculate Bonus Successfully.");
					    $("#confrimModal").modal('hide');
					    
			     	}else if(data.status == 400){
			     		callFlashSlideInModal(data['data'],"#inform_on_confirm","error");
			     	}
			 }
		});
		
	});
};
var scriptBtnConfirmNoFn = function(){
	$(document).off("click","#btnConfirmNO");
	$(document).on("click","#btnConfirmNO",function(){
		
		var appraisal_year= $("#param_year").val();
		var period_id= $("#param_bonus_period_id").val();
		var data_bonus = [];
		$.each($("#listBonusAppraisal").find("tr[edit_flag='1']").get(),function(index,indexEntry){
			data_bonus.push({
				 "org_result_judgement_id"	: $(this).attr("org_result_judgement_id"),
			     "adjust_result_score"		: $(this).find('.inputAdjustResultScore').autoNumeric('get'),
			     "emp_result_judgement_id"	: $(this).attr("emp_result_judgement_id"),
			     "emp_adjust_result_score"	: ($(this).attr("emp_result_judgement_id") == "" ? "" : $(this).find('.inputEmpAdjustResultScore ').autoNumeric('get')),
			     "emp_result_score"	: ($(this).attr("emp_result_judgement_id") == "" ? "" : $(this).find('.inputEmpResultScore ').text())
			});
	  
		 });
		
		$.ajax({
			 url: globalSevice['restfulPathBonusAppraisal'],
			 type : "patch",
			 dataType:"json",
			 async:false,
			 data:{
				 
				 appraisal_year		: $("#param_year").val(),
				 period_id 			: $("#param_bonus_period_id").val(),
				 data 				: 	data_bonus,
				 calculate_flag		:	0
			 },
			 headers:{Authorization:"Bearer "+tokenID.token},
		     success:function(data){
			     	if(data.status == 200){
			     		
			     		getDataFn($("#pageNumber").val(),$("#rpp").val());
			     		callFlashSlide("Save Successfully.");
					    $("#confrimModal").modal('hide');
					    
			     	}else if(data.status == 400){
			     		callFlashSlideInModal(data['data'],"#inform_on_confirm","error");
			     	}
			 }
		});
		
	});
};
var scriptDataToggleFn = function(){
	$('[data-toggle="tooltip"]').css({"cursor":"pointer"});
	$('[data-toggle="tooltip"]').tooltip({
		 html:true
	});
};
var scriptInputAutoNumeric = function(id,option){
	$(id).autoNumeric('init');
	$(id).autoNumeric('update', option);
};
// -------- Search Start
var searchAdvanceFn = function (year,bonus_period_id) {
	//embed parameter start
	var htmlParam="";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_year' name='param_year' value='"+year+"'>";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_bonus_period_id' name='param_bonus_period_id' value='"+bonus_period_id+"'>";
	$(".param_Embed").remove();
	$("body").append(htmlParam);

	getDataFn(pageNumberDefault,$("#rpp").val());
	
}
// -------- Search End


$(document).ready(function() {

		
	var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==false){
	 		return false;
	 	}
	 }

	

	// ------------------- Questionnaire -------------------
	$(".sr-only").hide();

	$("#search_year").html(generateDropDownList(globalSevice['restfulPathDropDownYear'],"GET",{}));
	$("#search_bonus_period_id").html(generateDropDownList(globalSevice['restfulPathDropDownBonusPeriod'],"GET",{appraisal_year:$("#search_year").val()}));
	scriptDataToggleFn();
	
	$("#search_year").change(function(){
		$("#search_bonus_period_id").html(generateDropDownList(globalSevice['restfulPathDropDownBonusPeriod'],"GET",{appraisal_year:$("#search_year").val()}));
	});
	
	
	
	$(".app_url_hidden").show();
	$("#btn_search_advance").click(function(){
	
		searchAdvanceFn(
				$("#search_year").val(),
				$("#search_bonus_period_id").val()
				);
		
		if($("#rpp").val()=='' || $("#rpp").val() == undefined){  // default  
			$(".countPagination").val('All');
			$("#rpp").remove();
		}
		
		$("#bonus_appraisal_list_content").show();
//		$("#btn_search_recalculate").prop("disabled",false)
		return false;
	});

	var option ={
			vMin : '0',
			vMax : '99.99',
			lZero: 'deny',
			aPad: false,
			wEmpty: 'zero'
		};
	scriptInputAutoNumeric("#from_monthly_bonus_rate",option);

	
	
	  
	  
	

});
