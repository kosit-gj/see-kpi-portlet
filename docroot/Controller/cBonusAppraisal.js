
//Global variable
var globalSevice=[];
var globalDataTemp=[];
var globalData;


const pageNumberDefault=1;
// restfulPath Service see_api/public/bonus/advance_search/year
globalSevice['restfulPathBonusAppraisal']=restfulURL + "/" + serviceName + "/public/bonus";
globalSevice['restfulPathDropDownYear']= globalSevice['restfulPathBonusAppraisal'] +"/advance_search/year";
globalSevice['restfulPathDropDownBonusPeriod']= globalSevice['restfulPathBonusAppraisal']+ "/list_bonus_period";





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

	
// --------  Clear Start 
var clearFn = function() {
	
	$("#modalTitleRole").html("Add Questionnaire");
	
	
	$("#form_questionnaire_type").val($("#form_questionnaire_type option:first").val());
	
	
	$("#form_questionnaire_name").val("");
	$("#form_questionnaire_pass_score").val("");
	
	$("#form_questionnaire_is_active").removeClass('on');
	$("#form_questionnaire_is_active").addClass('on');
    $("#form_questionnaire_is_active").attr("data-value","1");
  
    $("#listSection").empty();
	

	$("#action").val("add");
	$(".btnModalClose").click();
	globalDataTemp['form'].validate().resetForm();
	$("#form_questionnaire_type ,.btnAddSection  ,.numberOnly").prop('disabled', false); 
	$("#form_questionnaire_type ,.btnAddSection  ,.numberOnly").removeClass('cursorNotAllowed');
	
}
var scriptBtnSaveAndCancelFn = function(){
	$("#btn_save_bonus_appraisal , #btn_cancel_bonus_appraisal").off("click");
	$("#btn_save_bonus_appraisal ").on("click",function(){
		$("#from_monthly_bonus_rate").val("");
		$("#inform_on_confirm").html("");
		$("#confrimModal").modal({
			"backdrop" : setModalPopup[0],
			"keyboard" : setModalPopup[1]
		});
		$(document).off("click","#btnConfirmOK");
		$(document).on("click","#btnConfirmOK",function(){
			
			$.ajax({
				 url:globalSevice['restfulPathBonusAppraisal']+"/"+id,
				 type : "post",
				 dataType:"json",
				 async:false,
				 headers:{Authorization:"Bearer "+tokenID.token},
			     success:function(data){
			    	 
			    	 if(data['status']==200){
			    		 
			    		 // Delete user on Liferay //
				    	 if(data["liferay_user_id"] != null){
				    		 $.ajax({
				 				url: lifeRayApiUrl+"/api/jsonws/user/delete-user",
				 				type : "POST",
				 				dataType:"JSON",
				 				async:false,
				 				cache: false,
				 				data:{
				 					"userId" : data["liferay_user_id"],
				 					"p_auth": $("#pAuth").val()
				 				},
				 				beforeSend:function(){
				 					$("body").mLoading('hide');	
				 				},
				 				success:function(dataImp){
				 					var dataException = dataImp.exception;
				 					if(dataException != null){
				 						callFlashSlide(dataException+"");
				 					} else {
				 						callFlashSlide("Delete Successfully.");
				 					}
				 				},
				 				error: function (jqXHR, textStatus, errorThrown) {
				 	                  if (jqXHR.status == 500) {
				 	                	 callFlashSlide('Internal error: ' + jqXHR.responseText);
				 	                  } else {
				 	                	 callFlashSlide('Unexpected error.');
				 	                  }
				 	              }
				 			});					    		 
				    	 } else {
				    		 callFlashSlide("Delete Successfully, But not found user in liferay server.");
				    	 }
				    	 
				    	 getDataFn($("#pageNumber").val(),$("#rpp").val());
				    	 clearFn();
				    	 $("#confrimModal").modal('hide');
				    	 
				     }else if (data['status'] == "400"){
				    	 callFlashSlide(""+data['data']+"");
				    	 //backToTopFn();
				     }
				     	
				 }
			});
			
		});
		
	});
	$("#btn_cancel_bonus_appraisal").on("click",function(){
		$("body").mLoading('show');
		listBonusAppraisal(globalData.data);
		setTimeout(function(){ 
			$("body").mLoading('hide');
		}, 200);
	});
};
//--------  GetData Start
var getDataFn = function(page,rpp){
	//alert("Page : "+page+" - Rpp : "+rpp);

	var year= $("#param_year").val();
	var bonus_period_id= $("#param_bonus_period_id").val();
	
	$.ajax({
		url : "",
		type : "get",
		dataType : "json",
		data:{

			"year":year,
			"bonus_period_id":bonus_period_id

		},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success : function(data) {
			listBonusAppraisal(data['data']);
			globalData=data;
			paginationSetUpFn(globalData['current_page'],globalData['last_page'],globalData['last_page']);
		}
	});
	
	
};
//--------  GetData End
var listBonusAppraisal = function(data){
	var html ="";
	//console.log(data);
	$.each(data,function(index,indexEntry) {

		html += "<tr class='rowSearch'>";
		html += "<td class='columnSearch' >"+ indexEntry.name + "</td>";
		html += "<td class='columnSearch' >"+ indexEntry.name + "</td>";
		html += "<td class='columnSearch' style='text-align: right;'>"+ addCommas(indexEntry.number.toString()) + "</td>";
		html += "<td class='columnSearch' style='text-align: right;'>" ;
		if(indexEntry.edit_flag){
			
			html += "	<div class='float-label-control ' >";
			html += "	<input type='text' class='form-control inputAdjustBonusRateByUnit numberOnly'";
			html += "		data-toggle='tooltip' data-original-title='ปรับผลประเมิน'";
			html += "		placeholder='ปรับผลประเมิน'";
			html += "		id='inputAdjustBonusRateByUnit-1'";
			html += "		name='inputAdjustBonusRateByUnit-1' ";
			html += "		value='0.00' >";
			html += "	</div>";
			
		}else{
			html += addCommas(indexEntry.number.toString()) ;
		}
		html += "</td>";
		html += "<td class='columnSearch' style='text-align: right;'>"+ addCommas(indexEntry.number.toString()) + "</td>";
		html += "<td class='columnSearch' style='text-align: right;'>"+ addCommas(indexEntry.number.toString()) + "</td>";
		html += "<td class='columnSearch' style='text-align: right;'>"+ addCommas(indexEntry.number.toString()) + "</td>";
		html += "<td class='columnSearch' >"+ indexEntry.name + "</td>";
		html += "<td class='columnSearch' style='text-align: right;'>"+ addCommas(indexEntry.number.toString()) + "</td>";
		html += "<td class='columnSearch' style='text-align: right;'>" ;
		if(indexEntry.edit_flag){
			
			html += "	<div class='float-label-control ' >";
			html += "	<input type='text' class='form-control inputAdjustBonusRateByExecutive numberOnly'";
			html += "		data-toggle='tooltip' data-original-title='ปรับผลประเมิน'";
			html += "		placeholder='ปรับผลประเมิน'";
			html += "		id='inputAdjustBonusRateByExecutive-1'";
			html += "		name='inputAdjustBonusRateByExecutive-1' ";
			html += "		value='0.00' >";
			html += "	</div>";
			
		}else{
			html += addCommas(indexEntry.number.toString()) ;
		}
		html += "</td>";

		html += "</tr>";
		

	});

	$("#listBonusAppraisal").html(html);
	scriptBtnSaveAndCancelFn();
	$('.numberOnly').mask('Z99.00', {

		  translation: {
		    'Z': {
		       pattern: /[0-9*]/,
		      //optional: true
		    }
		  }
		});

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
	$("#search_bonus_period_id").html(generateDropDownList(globalSevice['restfulPathDropDownYear'],"GET",{}));
	//$("#form_questionnaire_type").html(generateDropDownList(globalSevice['restfulPathDropDownQuestionnaireType'],"GET",{}));
	
	//getDropDownAnswerTypeFn(globalSevice['restfulPathDropDownAnswerType'],"GET",{});
	
	$('[data-toggle="tooltip"]').css({"cursor":"pointer"});
	$('[data-toggle="tooltip"]').tooltip({
		 html:true
	});
	
	$(".app_url_hidden").show();
	$("#bonus_appraisal_list_content").show();
	$("#btn_search_advance").click(function(){
	
//		searchAdvanceFn(
//				$("#search_year").val(),
//				$("#search_bonus_period_id").val()
//				);
			
		$("#bonus_appraisal_list_content").show();
		
		return false;
	});
	
	$('#from_monthly_bonus_rate').mask('Z9.00', {

		  translation: {
		    'Z': {
		       pattern: /[0-9*]/,
		      //optional: true
		    }
		  }
		});
	
	
	  
	  
	

});
