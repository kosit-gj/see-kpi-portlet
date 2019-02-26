var globalData="";
var galbalDataTemp=[]; 
var username = "";
var password = "";
const pageNumberDefault=1;

var clearFn = function() {
	$("#information").hide();
	$(".sort-z-score").find('i').removeClass('fa-sort fa-sort-up fa-sort-down icon-sort-color');
	$(".sort-z-score").find('i').addClass('fa-sort');
}


var dropDrowAppraisalEmpLevelFn = function(element, LevelId, allFlag)
{
	$(element).removeAttr("multiple");
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_grade/al_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			if(allFlag){
				htmlOption+="<option value=''> All Level </option>";
			}
			$.each(data,function(index,indexEntry){
				htmlOption+="<option value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";				
			});
			$(element).html(htmlOption);
		}
	});
}


var dropDrowFormTypeFn = function(element, FormId, allFlag)
{
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_grade/form_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			if(allFlag){
				htmlOption+="<option value=''>All Form</option>";
			}
			$.each(data,function(index,indexEntry){
				htmlOption+="<option value="+indexEntry['appraisal_form_id']+">"+indexEntry['appraisal_form_name']+"</option>";
			});
			$(element).html(htmlOption);
		}
	});
}


var dropDrowStructureFn = function(element, StrucId){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_grade/struc_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				htmlOption+="<option value="+indexEntry['structure_id']+">"+indexEntry['structure_name']+"</option>";
			});
			$(element).html(htmlOption);
		}
	});
}


var searchAdvanceFn = function () {

    $("#embedParamSearch").empty();
    var embedParam = "";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_appraisal_form' name='embed_appraisal_form' value='" + $("#AppraisalForm").val() + "'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_appraisal_level_id_emp' name='embed_appraisal_level_id_emp' value='" + $("#Appraisallevel").val() + "'>";
   
    $("#embedParamSearch").append(embedParam);
    
    getDataFn(pageNumberDefault, $("#rpp").val());
};


var getDataFn = function (page, rpp) {
	
    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/appraisal_grade",
        type: "get",
        dataType: "json",
        async: true,
        headers: { Authorization: "Bearer " + tokenID.token },
        data: {
            "page": page,
            "rpp": rpp,
            "appraisal_level_id": $("#embed_appraisal_level_id_emp").val(),
            "appraisal_form_id": $("#embed_appraisal_form").val()
        },
        success: function (respData) {
        	console.log(respData);
        	if("status" in respData){
        		if(respData.status == 404){
        			callFlashSlide("<font color=''>" + respData.data + "</font>", "error");
        		}
        	} else {
        		var htmlHTML="";
        		if(respData.data.length == 0){
        			htmlHTML +="<tr>";
            		htmlHTML +="<td colspan='7'>";
            		htmlHTML +="<div style='margin-top: 40px;margin-bottom: 40px;font-weight: bold;color: #e04747;' align='center'>No Data to Display.</div>";
            		htmlHTML +="</td>";
            		htmlHTML +="</tr";
            		$("#listData").html(htmlHTML);
        		} else {
        			$.each(respData.data, function(index,indexEntry) {
        				htmlHTML +="<tr>";
                		htmlHTML +="<td> "+indexEntry.appraisal_form_name+" </td>";
                		htmlHTML +="<td> "+indexEntry.appraisal_level_name+" </td>";
                		htmlHTML +="<td> "+indexEntry.grade+" </td>";
                		htmlHTML +="<td style='width: auto; text-align: right; vertical-align: middle;'> "+indexEntry.begin_score+" </td>";
                		htmlHTML +="<td style='width: auto; text-align: right; vertical-align: middle;'> "+indexEntry.end_score+" </td>";
                		htmlHTML +="<td style='width: auto; text-align: right; vertical-align: middle;'> "+indexEntry.salary_raise_amount+" </td>";
                		htmlHTML +="<td style='width: auto; text-align: center; vertical-align: middle;'> <input type='checkbox' disabled='' "+((indexEntry.is_active==1)?"checked=''":"")+"/> </td>";
                		htmlHTML +="<td style='width: auto; text-align: center; vertical-align: middle;'> <i data-trigger=\"focus\" tabindex=\""+index+"\" data-content=\"";
                		htmlHTML +=" &lt;button class='btn btn-warning btn-small btn-gear edit' id='edit-"+indexEntry.grade_id+"'&gt;Edit&lt;/button&gt;&nbsp;&lt;button id='del-"+indexEntry.grade_id+"' class='btn btn-danger btn-small btn-gear del'&gt;Delete&lt;/button&gt;\" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-edit-del\" data-original-title=\"\" title=\"\"></i>";
                		htmlHTML +="</tr>";
        			});
        			$("#listData").html(htmlHTML);
        			
        			$(".popover-edit-del").popover(setPopoverDisplay);
        			$("#table-appraisalForm").off("click",".popover-edit-del");
        			$("#table-appraisalForm").on("click",".popover-edit-del",function(){ console.log('popover click');
                		      
        			// item edit
        			$(".edit").on("click",function() {
        				// destroy multiple seletion 
        				if($("#action").val() == 'add'){
        					$('#appraisal_level_id').multiselect("destroy");
        					$('#appraisal_level_id').removeAttr("multiple");
        				}
        				
            			var id = $(this).attr("id").split("-")[1];
            			$(this).parent().parent().parent().children().click();
            			$("#action").val("edit");
            			$("#id").val(id);
            			
            			var itemEdit = findOneFn(id);
            			
            			// render edit form
            			ClearAppraisalFormFn();
            			$("#btnSubmitAnother, #information").hide();
        				ClearAppraisalFormFn('ClearAll');
        				dropDrowFormTypeFn("#appraisal_form_id", null, false);
        				dropDrowAppraisalEmpLevelFn("#appraisal_level_id", null, false);
        				dropDrowStructureFn("#structure_id", null);
        				SetSalaryRaise();
        				
        				// set value form
        				$("#appraisal_form_id option[value='"+itemEdit.appraisal_form_id+"']").prop('selected', true);
        				$("#appraisal_level_id option[value='"+itemEdit.appraisal_level_id+"']").prop('selected', true);
        				$("#grade").val(itemEdit.grade);
        				$("#begin_score").val(itemEdit.begin_score);
        				$("#end_score").val(itemEdit.end_score);
        				$("#salary_raise_amount").val(itemEdit.salary_raise_amount);
        				$("#appraisal_level_id option[value='"+itemEdit.structure_id+"']").prop('selected', true);
        				$("#is_judgement").prop('checked', ((itemEdit.is_judgement==1)?true:false));
        				$("#raise_type option[value='"+itemEdit.raise_type+"']").prop('selected', true);
        				$("#is_active").prop('checked', ((itemEdit.is_active==1)?true:false));
        				
        				// render modal
        				$("#add-edit-modal").modal({
        					"backdrop": setModalPopup[0],
        					"keyboard": setModalPopup[1]
        				});
            		});
            		
            		// item delete 
            		$(".del").on("click",function(){
            			var id = $(this).attr("id").split("-")[1];
            			$(this).parent().parent().parent().children().click();
            			 
            			$("#confrimModal").modal({
            				"backdrop" : setModalPopup[0],
            				"keyboard" : setModalPopup[1]
            			});
            			
            			$(document).off("click","#btnConfirmOK");
            			$(document).on("click","#btnConfirmOK",function(){
            			
            				$.ajax({
            					 url:restfulURL+"/"+serviceName+"/public/appraisal_grade/"+id,
            					 type : "delete",
            					 dataType:"json",
            					 headers:{Authorization:"Bearer "+tokenID.token},
            					 success:function(data){            				    	 
            					     if(data['status'] == 200){
            					    	 callFlashSlide("Delete Successfully.");
            					    	 $("#confrimModal").modal('hide');
            					    	 getDataFn();
            					     }else if (data['status'] == 400){
            					    	 callFlashSlideInModal(data['data'],"#inform_on_confirm","error");
            					    }
            					 }
            				});
            				
            			});
            			
            		});	
            		
            	});
        			
        		}
        	}
        	//setThemeColorFn(tokenID.theme_color);
        	globalData = respData;
            paginationSetUpFn(globalData['current_page'], globalData['last_page'], globalData['last_page']);

        }
    });
};


var findOneFn = function(id) {
	var respData;
	$.ajax({
		url : restfulURL + "/" + serviceName + "/public/appraisal_grade/" + id,
		type : "get",
		dataType : "json",
		data : {},
		async : false,
		headers : {
			Authorization : "Bearer " + tokenID.token
		},
		success : function(data) {
			respData = data;
		}
	});

	return respData;
};


var UpdateAppraisalFormFn = function() {
	$.ajax({
		url : restfulURL + "/" + serviceName + "/public/appraisal_grade/" + $("#id").val(),
		type : "PATCH",
		dataType : "json",
		data : $("#appraisal-grade-form").serialize(),
		async : false,
		headers : {
			Authorization : "Bearer " + tokenID.token
		},
		success : function(data) {
			if (data['status'] == 200) {
				callFlashSlide("Update successed.");
				getDataFn();
				$("#add-edit-modal").modal('toggle');
				ClearAppraisalFormFn('ClearAll');
			} else if (data['status'] == 400) {
				callFlashSlideInModal(validationFn(data), "#information", "error");
			}
		}
	});
}


var ClearAppraisalFormFn = function(action){
	if(action == 'ClearAll'){
		$("#appraisal_form_id option:first").prop('selected', true);

		if (document.getElementById('appraisal_level_id').multiple) {
			$('#appraisal_level_id').multiselect("uncheckAll");
		} else {
			$("#appraisal_level_id option:first").prop('selected', true);
		}		
	}
	
	$("#grade").val("");
	$("#begin_score").val("");
	$("#end_score").val("");
	$("#salary_raise_amount").val("");
	$("#add-edit-modal #is_active").prop('checked', true);

}

var validaFn = function(data){
	var errorData="";
	var count=0;
	$.each(data['data'],function(index,indexEntry){
		if(index!=undefined){
			if(count==0){
				errorData+=""+indexEntry+"<br>";
			}else{
				errorData+=""+indexEntry+"<br>";
			}
		} 			
		count++;
	});      		
    
	return errorData; 		
}

var InsertAppraisalGradeFn = function(Status){	
	$.ajax({
        url: restfulURL+"/"+serviceName+"/public/appraisal_grade",
        type: "post",
        dataType: "json",
        data: $("#appraisal-grade-form").serialize(),
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {       	     	
        	if(data['status']==200){
        		  		
        		if(Status == 'Save'){
        			callFlashSlide("Insert successed.");
        			ClearAppraisalFormFn('ClearAll');
        			$("#add-edit-modal").modal('toggle');
        			getDataFn();
        		}else if(Status == 'SaveAnother'){
        			callFlashSlideInModal("Insert success.","#information","");
        			$("#table-appraisalForm thead th").css("vertical-align", "middle");
        			getDataFn();
        			ClearAppraisalFormFn('Clear');
        		}
        	
        	}else if(data['status']==400){
        		console.log(validaFn(data));
        		callFlashSlideInModal(validaFn(data),"#information","error");
			}
        }
	});
}


function SetSalaryRaise(){
	 // set salary_raise_amount enable/disable //
	 $.ajax({
		 url: restfulURL+"/"+serviceName+"/public/system_config",
		 type: "get",
		 dataType: "json",
		 headers: {Authorization:"Bearer "+tokenID.token},
		 async: false,
		 success: function(data) {
			 if(data.raise_type == 3){
				 $("#form-group-salary_raise_amount label").html("Raise Step <span class='redFont'>*</span>");
				 $("#salary_raise_amount").attr("placeholder", "Raise Step");
				 
				 $("#salary_raise_amount").parent().append("<p style='padding-top:5px;'><font size='2.5' color='red'> ( Use salary structure table ) </font></p>");
				 
			 } else {
				 $("#form-group-salary_raise_amount label").html("Salary Raise <span class='redFont'>*</span>");
				 $("#salary_raise_amount").attr("placeholder", "Salary Raise");
				 
				 $("#form-group-structure_id").hide();
				 $("#form-group-is_judgement").hide();
			 }
			 
			 $("#raise_type option[value='"+data.raise_type+"']").prop('selected', true);
		 }
	 });
}


function DeleteFn(id){
	$.ajax({
		 url: restfulURL+"/"+serviceName+"/public/appraisal_grade/"+id,
		 type: "delete",
		 dataType: "json",
		 headers: {Authorization:"Bearer "+tokenID.token},
		 async: false,
		 success: function(data) {
			 if(data.status == 200){
				 callFlashSlide("Delete successed.");
			 } else if(data.status == 400){
				 callFlashSlide(data.data, "error");
			 }
		 }
	 });
}


$(document).ready(function() {
	
	var username = $('#user_portlet').val();
	var password = $('#pass_portlet').val();
	var plid = $('#plid_portlet').val();
			
	if (username != "" && username != null & username != [] && username != undefined) {
		if (connectionServiceFn(username, password, plid) == true) {
			$(".app_url_hidden").show();
			// generate parameter
			dropDrowFormTypeFn("#AppraisalForm", null, true);
			dropDrowAppraisalEmpLevelFn("#Appraisallevel", null, true);
			
			// search 
			$("#btnSearchAdvance").click(function() {
				searchAdvanceFn();
				if ($("#rpp").val() == '' || $("#rpp").val() == undefined) { // default
					$(".countPagination").val(10);
					//$("#rpp").remove();
				}
				
				$("#search_result").show();
				clearFn();
			});
			
			// Add/Edit Form
			$("#add-edit-modal").hide();
			$("#btnAddapraisalgrade").click(function() {
				$("#action").val("add");
				$('#information').hide()
				ClearAppraisalFormFn('ClearAll');
				dropDrowFormTypeFn("#appraisal_form_id", null, false);
				dropDrowAppraisalEmpLevelFn("#appraisal_level_id", null, false);
				$("#appraisal_level_id").attr("multiple", "multiple").multiselect().multiselectfilter();
				$(".ui-multiselect-menu, ui-widget-header").css("z-index", "1100");
				$("#appraisal_level_id").multiselect('refresh').multiselectfilter();
				dropDrowStructureFn("#structure_id", null);
				$("#btnSubmitAnother").show();
				SetSalaryRaise();
				
				// render modal
				$("#add-edit-modal").modal({
					"backdrop": setModalPopup[0],
					"keyboard": setModalPopup[1]
				});
			});
			
			// submit
			$("#btnSubmit").click(function() {
				if ($("#action").val() == "add" || $("#action").val() == "") {
					InsertAppraisalGradeFn("Save");
				} else {
					UpdateAppraisalFormFn();
				}
			});

			// submit another
			$("#btnSubmitAnother").click(function() {
				InsertAppraisalGradeFn("SaveAnother");
			});
			$("#advanceSearchAppraisalGroup").show();
			
			// cancel
			$(".btnCancle, .setCloseModal").click(function() {
				ClearAppraisalFormFn('ClearAll');
				$("#btnSubmitAnother").hide();
				$("#add-edit-modal").modal('toggle');
			});
			
			
			/*$( ".countPagination" ).change(function() {
				$("#rpp").val(this.val);
				//console.log(this.val);
				getDataFn(pageNumberDefault, $("#rpp").val());
			});*/
		}
	}

});

