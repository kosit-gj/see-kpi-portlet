var globalData="";
var galbalDataTemp=[]; 
//var phaseArray=[];
//var globalCount=0;
var username = "";
var password = "";

var dropDrowYearListFn = function(nameArea,id){
	if(nameArea==undefined){
		nameArea="";
	}
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/bonus/advance_search/year",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
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
		url:restfulURL+"/"+serviceName+"/public/bonus/advance_search/period",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"appraisal_year":year},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				
				htmlOption+="<option value="+indexEntry['period_id']+">"+indexEntry['appraisal_period_desc']+"</option>";
			});
			$("#AppraisalPeriod").html(htmlOption);
		}
	});
}

var dropDrowAppraisalOrgLevelFn = function(id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/bonus/advance_search/organization_level",
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
}

var dropDrowAppraisalEmpLevelFn = function(id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/bonus/advance_search/individual_level",
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
			dropDrowOrgFn($("#AppraisalEmpLevel").val());
		}
	});
}


var dropDrowOrgFn = function(id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/bonus/advance_search/organization",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		//data:{"level_id":appraisalLevelId},
		success:function(data){
			var htmlOption="";
			/*htmlOption+="<option value=''>All Organization</option>";*/
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


var dropDrowFormTypeFn = function(id){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/bonus/advance_search/form",
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


var dropDrowPositionFn = function(id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/bonus/advance_search/position_name",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		//data:{"Position":Position},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
			
					htmlOption+="<option value="+indexEntry['position_id']+">"+indexEntry['position_name']+"</option>";				
			});
			$("#Position").html(htmlOption);
			appraisalStatusFn($("#Position").val());
		}
	});
}
var refreshMultiPosition = function() {
	$("#Position").multiselect('refresh').multiselectfilter();
	$("#Position_ms").css({'width':'100%'});
	$(".ui-icon-check,.ui-icon-closethick,.ui-icon-circle-close").css({'margin-top':'3px'});
	$('input[name=multiselect_Position]').css({'margin-bottom':'5px'});
}
var appraisalStatusFn = function (nameArea, id) {
    if (nameArea == undefined) {
        nameArea = "";
    }
    var htmlOption = "";
    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/bonus/advance_search/status",
        type: "get",
        dataType: "json",
        async: false,
        data: {
            "emp_level": $("#AppraisalEmpLevel").val(),
            "org_level": $("#AppraisalOrgLevel").val(),
            "org_id": $("#organization").val(),
            "period_id": $("#AppraisalPeriod").val(),
            //"appraisal_frequency_id": $("#frequency_id").val(),
            "appraisal_year": $("#AppraisalYear").val(),
            "appraisal_type_id": $("#appraisalType").val(),
            "emp_code": ($("#empName_id").val() == "" ? "" : $("#empName_id").val()),
            "position_id": ($("#Position_id").val() == "" ? "" : $("#Position_id").val())
        },
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
        	var htmlOption="";
			htmlOption+="<option value=''>All Status</option>";
            $.each(data, function (index, indexEntry) {
                if (id == indexEntry['status']) {
                    htmlOption += "<option selected='selected' value='" + indexEntry['stage_id'] + "'>" + indexEntry['status'] + "</option>";
                } else {
                    htmlOption += "<option value='" + indexEntry['stage_id'] + "'>" + indexEntry['status'] + "</option>";

                }
            });
            $("#status" + nameArea).html(htmlOption);
        }
    });
}

/*$("#slideUpDownStageHistory").click(function(){
		$("#slideStageHistory").slideToggle();
		return false;
	});

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
*/
//SearchAdvance
var searchAdvanceFn = function () {

    var empNameCode = $("#empName_id").val();
    $(".embed_param_search").remove();
    var embedParam = "";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_appraisal_level_id_org' name='embed_appraisal_level_id_org' value='" + $("#AppraisalOrgLevel").val() +$("#AppraisalEmpLevel").val() +  "'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_appraisal_level_id_emp' name='embed_appraisal_level_id_emp' value='" + $("#AppraisalEmpLevel").val() + "'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_period_id' name='embed_period_id' value='" + $("#AppraisalPeriod").val() + $("#AppraisalYear").val() + "'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_position_id' name='embed_position_id' value='" + $("#Position").val() + "'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_emp_id' name='embed_emp_id' value='" + empNameCode + $("#organization").val() + $("#AppraisalEmpLevel").val() +"'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_year_list' name='embed_year_list' value='" + $("#AppraisalYear").val() + "'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_organization' name='embed_organization' value='" + $("#organization").val() + $("#AppraisalEmpLevel").val() + $("#AppraisalOrgLevel").val() + "'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_status' name='embed_status' value='" + $("#status").val() + "'>";
    embedParam += "<input type='hidden' class='embed_param_search' id='embed_appraisal_form' name='embed_appraisal_form' value='" + $("#appraisalForm").val() + "'>";

    $("#embedParamSearch").append(embedParam);
    getDataFn();
};

//Get Data
var getDataFn = function (page, rpp) {

    var appraisal_level_id_org = $("#embed_appraisal_level_id_org").val();
    var appraisal_level_id_emp = $("#embed_appraisal_level_id_emp").val();
    var period_id = $("#embed_period_id").val();
    var position_id = $("#embed_position_id").val();/*.split("-");
    embed_position_id = embed_position_id[0];*/
    var emp_id = $("#embed_emp_id").val();    
    var embed_organization = $("#embed_organization").val();
    var status = $("#embed_status").val();
    

    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/bonus/adjustment",
        type: "get",
        dataType: "json",
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        data: {
            "page": page,
            "rpp": rpp,
            "emp_level": appraisal_level_id_emp,
            "org_level": appraisal_level_id_org,
            "period_id": period_id,
            "position_id": position_id,        
            "org_id": embed_organization,
            "emp_id": emp_id,
            "stage_id": status,
        },
        success: function (data) {
            listDataFn(data);
            setThemeColorFn(tokenID.theme_color);
            globalData = data;
            paginationSetUpFn(globalData['current_page'], globalData['last_page'], globalData['last_page']);
        }
    })
};

var listDataFn = function(data){
	console.log(data);
	htmlHTML="";
	$.each(data,function (index, indexEntry) {
	        if (index != 'p0') {
	            htmlHTML += "<th style=\"width:5%; text-align:center; \" class=\"object-center\">";
	            htmlHTML += "<input style=\"margin-bottom: 5px;\" type=\"checkbox\" name=\"statusSelectAll\" id=\"statusSelectAll\" style=\"margin-top:-3px;\">";
	            htmlHTML += "</th>";
	        } else {
	            htmlHTML += "<th style=\"width:5%; text-align:center;\" class=\"object-center\">";
	            htmlHTML += "<input type=\"checkbox\" name=\"unassignSelectAll\" id=\"unassignSelectAll\" style=\"margin-top:-3px;\">";
	            htmlHTML += "</th>";
	        }
            htmlHTML += " <tbody>";
            
            htmlHTML += " </tbody>";
            htmlHTML += "  </table>";

            htmlHTML += " </div>";
            htmlHTML += "</div>";
            htmlHTML += "</div>";
            htmlHTML += "</div>";

	});
	$("#listDatas").html(htmlHTML);
};


$(document).ready(function() {

	username = $('#user_portlet').val();
	password = $('#pass_portlet').val();
	var plid = $('#plid_portlet').val();

	if(username!="" && username!=null & username!=[] && username!=undefined ){
		if(connectionServiceFn(username,password,plid)==true){
	
	//set parameter start
	
	dropDrowYearListFn();
	$("#AppraisalYear").change(function(){
		dropDrowPeriodListFn($(this).val());
	});
	
	dropDrowFormTypeFn();
	$("#AppraisalForm").change(function() {
	   clearParamSearch(dataClearParam); // in cMain.js
	    	
	    });
	
	dropDrowAppraisalEmpLevelFn();
	dropDrowAppraisalOrgLevelFn();
	$("#AppraisalEmpLevel").change(function(){
		clearParamSearch(dataClearParam);// in cMain.js
		dropDrowAppraisalOrgLevelFn($(this).val());
		refreshMultiPosition();
	});
	
	dropDrowPositionFn();
	$("#Position").multiselect({minWidth:'100%;'}).multiselectfilter();
	  refreshMultiPosition();
	
	$("#EmpName").autocomplete({
		
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+"/"+serviceName+"/public/bonus/advance_search/employee_name",
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
	
	
		}
	}
	//listDataFn();
	
	 //Search Start
    $("#btnSearchAdvance").click(function () {
    	console.log(searchAdvanceFn);
        searchAdvanceFn();
        $(".countPagination").val(10);
        $("#rpp").remove();
        $(".search_result").show();
    });
});
//binding tooltip start
$('[data-toggle="tooltip"]').css({"cursor":"pointer"});
$('[data-toggle="tooltip"]').tooltip({
	 html:true
});
