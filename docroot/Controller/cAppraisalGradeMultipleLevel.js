var globalData="";
var galbalDataTemp=[]; 
//var phaseArray=[];
//var globalCount=0;
var username = "";
var password = "";
const pageNumberDefault=1;
var clearFn = function() {
	$("#information").hide();
	$(".sort-z-score").find('i').removeClass('fa-sort fa-sort-up fa-sort-down icon-sort-color');
	$(".sort-z-score").find('i').addClass('fa-sort');
}

var dropDrowAppraisalEmpLevelFn = function(id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_grade/al_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			htmlOption+="<option value=''>All Level</option>";
			$.each(data,function(index,indexEntry){
				
					htmlOption+="<option value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";				
			});
			$("#Appraisallevel").html(htmlOption);
		}
	});
}
/*var refreshMultiAppraisallevel = function() {
	$("#Appraisallevel").multiselect('refresh').multiselectfilter();
	$("#Appraisallevel_ms").css({'width':'100%'});
	$(".ui-icon-check,.ui-icon-closethick,.ui-icon-circle-close").css({'margin-top':'3px'});
	$('input[name=multiselect_Appraisallevel]').css({'margin-bottom':'6px','margin-right':'3px'});
}
*/

var dropDrowFormTypeFn = function(id){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_grade/form_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
		htmlOption+="<option value=''>All Form</option>";
			$.each(data,function(index,indexEntry){
				htmlOption+="<option value="+indexEntry['appraisal_form_id']+">"+indexEntry['appraisal_form_name']+"</option>";
			});
			$("#AppraisalForm").html(htmlOption);
		}
	});
}



//SearchAdvance
var searchAdvanceFn = function () {

    $("#embedParamSearch").empty();
    var embedParam = "";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_appraisal_form' name='embed_appraisal_form' value='" + $("#AppraisalForm").val() + "'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_appraisal_level_id_emp' name='embed_appraisal_level_id_emp' value='" + $("#Appraisallevel").val() + "'>";
   

    $("#embedParamSearch").append(embedParam);
    
   // to_action();
    getDataFn(pageNumberDefault,$("#rpp").val());
};

//Get Data
var getDataFn = function (page, rpp) {
    var level_id_emp = $("#embed_appraisal_level_id_emp").val();
    var form = $("#embed_appraisal_form").val();
    
    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/appraisal_grade",
        type: "get",
        dataType: "json",
        async: true,
        headers: { Authorization: "Bearer " + tokenID.token },
        data: {
            "page": page,
            "rpp": rpp,
            "appraisal_level_id": level_id_emp,
            "appraisal_form_id": form
        },
        success: function (data) {
        	console.log(data['data']);
        	
        	var htmlHTML="";	
        	if(data.length==0) {
        		htmlHTML +="<tr>";
        		htmlHTML +="<td colspan=\"11\">";
        		htmlHTML +="<div style='margin-top: 40px;margin-bottom: 40px;font-weight: bold;color: #e04747;' align='center'>No Data to Display.</div>";
        		htmlHTML +="</td>";
        		htmlHTML +="</tr";
       		$("#listData").html(htmlHTML);
        		return;
        	}else {
        		htmlHTML +="<tr>";
        		htmlHTML +="<td colspan=\"11\">";
        		htmlHTML +="<div style='margin-top: 40px;margin-bottom: 40px;font-weight: bold;color: #e04747;' align='center'>No Data to Display.</div>";
        		htmlHTML +="</td>";
        		htmlHTML +="</tr";
        	
        	}
        	console.log(data.length==0);
        	//Object.keys(data.data[0].language).length
        
        	getAllFormFn(data['result']);
            setThemeColorFn(tokenID.theme_color);
            globalData = data['result'];
           // paginationSetUpFn(globalData['current_page'], globalData['last_page'], globalData['last_page']);
        }
    });
};

var getAllFormFn = function(id)
{
	$.ajax({
        url: restfulURL+"/"+serviceName+"/public/appraisal_grade/"+id,
        type: "get",
        dataType: "json",
        data: { },
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
        	console.log(data['data']);
        	var htmlBody = "";
        	$.each(data,function(index,indexEntry) {
        		htmlBody += "<tr>";
        		htmlBody += "	<td>"+indexEntry.appraisal_form_name+"</td>";
        		htmlBody += "	<td>"+indexEntry.appraisal_level_name+"</td>";
        		htmlBody += "	<td>"+indexEntry.grade+"</td>";
        		htmlBody += "	<td>"+indexEntry.begin_score+"</td>";
        		htmlBody += "	<td>"+indexEntry.end_score+"</td>";
        		htmlBody += "	<td>"+indexEntry.salary_raise_amount+"</td>";
        		htmlBody += "	<td style='text-align: center;'> <input type='checkbox' disabled='disabled'  "+((indexEntry.is_active==1)?"checked":"")+"> </td>";
        		htmlBody += "	<td style='text-align: center;'> <i data-trigger='focus' tabindex='"+index+"' data-content=\"" +
        				"<button class='btn btn-warning btn-small btn-gear edit' id='edit-"+indexEntry.appraisal_form_id+"'>Edit</button>&nbsp;" +
        				"<button id='del-"+indexEntry.appraisal_form_id+"' class='btn btn-danger btn-small btn-gear del'>Delete</button>\" " +
        				"data-placement='top' data-toggle='popover' data-html='true' class='fa fa-cog font-gear popover-edit-del' data-original-title='' title=''></i> </td>";
        		htmlBody += "</tr>";
        	});
        	
        	$("#listData").html(htmlBody);
        	$(".popover-edit-del").popover(setPopoverDisplay);
        	$("#table-appraisalForm").off("click",".popover-edit-del");
        	$("#table-appraisalForm").on("click",".popover-edit-del",function(){
        		
        			
        			$(".edit").on("click",function() {
        			ClearAppraisalFormFn();
        			var id = $(this).attr("id").split("-")[1];
        			$(this).parent().parent().parent().parent().parent().children().click();
        			
        			$("#btnSetweightSubmitAnother").hide();
        			
        			
        			findOneFn(id);
        			      			
        			$("#id").val(id);
        			$("#action").val("edit");

        			
        		});
        		
        		
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
        					 url:restfulURL+"/"+serviceName+"/public/appraisal_form/"+id,
        					 type : "delete",
        					 dataType:"json",
        					 headers:{Authorization:"Bearer "+tokenID.token},
        					success:function(data){    
        				    	 
        					     if(data['status']==200){
        					    	 
        					       callFlashSlide("Delete Successfully.");
        					       $("#confrimModal").modal('hide');
        					       getAllFormFn();
        					     }else if (data['status'] == "400"){
        					    	 callFlashSlideInModal(data['data'],"#inform_on_confirm","error");
        					    	}
        					 }
        				});
        				
        			});
        			
        		});	
        		
        	});
        	
        }
	});
}


var findOneFn = function(id){
	$.ajax({
        url: restfulURL+"/"+serviceName+"/public/appraisal_grade/"+id,
        type: "get",
        dataType: "json",
        data: {},
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
        	console.log(data);
        	$("#id").val(data.grade_id);
        	$("#appraisal_form_name").val(data.appraisal_form_name);
        	$("#appraisal_level_name").val(data.appraisal_level_name);
        	$("#grade").val(data.grade);
        	$("#begin_score").val(data.begin_score);
        	$("#end_score").val(data.end_score);
        	$("#salary_raise").val(data.salary_raise_amount);
        	$("#is_active").prop('checked', data.is_active);
        	
        	
        	$("#addModal").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			});
        	
        }
	});
};

var UpdateAppraisalFormFn = function()
{
	var appraisal_form_name = $("#appraisal_form_name").val();
	var appraisal_level_name = $("#appraisal_level_name").val();
	var grade = $("#grade").val();
	var begin_score = $("#begin_score").val();
	var end_score = $("#end_score").val();
	var salary_raise = $("#salary_raise").val();
	var is_active = Number($('#is_active').prop('checked'));
	

	$.ajax({
        url: restfulURL+"/"+serviceName+"/public/appraisal_grade/"+$("#id").val(),
        type: "PATCH",
        dataType: "json",
        data: {
        	"appraisal_form_name":appraisal_form_name,
        	"appraisal_level_name":appraisal_level_name,
        	"grade":grade,
        	"begin_score":begin_score,
        	"end_score":end_score,
        	"salary_raise_amount":salary_raise,
        	"is_active":is_active,
        	
        },
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) { 
        	if(data['status']=='200'){
        		  		
        		callFlashSlide("Update successed.");
        		$("#table-appraisalForm thead th").css("vertical-align", "middle");
        		getAllFormFn();
    			$("#addModal").modal('hide');
    			ClearAppraisalFormFn();
    		       	
        	}else if(data['status']=='400'){
        		callFlashSlideInModal(validationFn(data),"#information","error");
			}
        }
	});
}


var ClearAppraisalFormFn = function(){
	$("#appraisal_form_name").val("");
	$("#appraisal_level_name").val("");
	$("#grade").val("");
	$("#begin_score").val("");
	$("#end_score").val("");
	$("#salary_raise").val("");
	$("#addModal #is_active").prop('checked', true);

}

var InsertAppraisalFormFn = function(Status){
	var appraisal_form_name = $("#appraisal_form_name").val();
	var appraisal_level_name = $("#appraisal_level_name").val();
	var grade = $("#grade").val();
	var begin_score = $("#begin_score").val();
	var end_score = $("#end_score").val();
	var salary_raise = $("#salary_raise").val();
	var is_active = Number($('#is_active').prop('checked'));

	
	$.ajax({
        url: restfulURL+"/"+serviceName+"/public/appraisal_grade",
        type: "post",
        dataType: "json",
        data: {
        	"appraisal_form_name":appraisal_form_name,
        	"appraisal_level_name":appraisal_level_name,
        	"grade":grade,
        	"begin_score":begin_score,
        	"end_score":end_score,
        	"salary_raise_amount":salary_raise,
        	"is_active":is_active,
        },
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) { 
        	if(data['status']=='200'){
        		  		
        		if(Status == 'Save'){
        			callFlashSlide("Insert successed.");
        			ClearAppraisalFormFn();
        			$("#addModal").modal('hide');
        			
        			$("#table-appraisalForm thead th").css("vertical-align", "middle");
        			getAllFormFn();
        		}else if(Status == 'SaveAnother'){
        			callFlashSlideInModal("Insert success.","#information","");
        			$("#table-appraisalForm thead th").css("vertical-align", "middle");
        			getAllFormFn();
        			ClearAppraisalFormFn();
        		}
        	
        	}else if(data['status']=='400'){
        		callFlashSlideInModal(validationFn(data),"#information","error");
			}
        }
	});
}

$(document).ready(function(){
	
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
		 if(connectionServiceFn(username,password,plid)==true){	
			 dropDrowFormTypeFn();
			 dropDrowAppraisalEmpLevelFn();
			 //getAllFormFn();
			 $(".form_list_content").show();
			 $("#addModal").hide();

			/* $("#Appraisallevel").change(function() {
				 dropDrowAppraisalEmpLevelFn();
	
				});
			 
			 $("#Appraisallevel").multiselect({minWidth:'100%;'}).multiselectfilter();
			 refreshMultiAppraisallevel();*/
			  
			 $("#btnSearchAdvance").click(function () {
			        searchAdvanceFn();
			    	if($("#rpp").val()=='' || $("#rpp").val() == undefined){  // default  
						$(".countPagination").val('All');
						$("#rpp").remove();
					}
			        $("#search_result").show();
			        clearFn();
			        
			    });
			 
			
			 
			 //$("#saveFormModal").hide();
			 $("#btnAddapraisalgrade").click(function(){
				 ClearAppraisalFormFn();
				 $("#addModal").show(); 
				 $("#btnSetweightSubmitAnother").show();
				 
				 $("#action").val("add");
			 });
			 
			 $(".btnCancle , .setWeightCloseModal").click(function(){
				 ClearAppraisalFormFn();
				 $("#btnSetweightSubmitAnother").show();
				 $("#addModal").show(); 
				 
			 });
			 
			 
			
			 
			 $("#btnSetweightSubmit").click(function(){
				 
				 if($("#action").val() == "add" || $("#action").val() == ""){
					 InsertAppraisalFormFn("Save");
				 }else{
					 UpdateAppraisalFormFn();
				 }
			 });
			 
			 $("#btnSetweightSubmitAnother").click(function(){
				 InsertAppraisalFormFn("SaveAnother");
			 });
			  
			    $("#advanceSearchAppraisalGroup").show();
			}
		}
		 
	});

