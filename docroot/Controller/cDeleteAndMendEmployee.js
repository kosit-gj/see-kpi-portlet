
//Global variable
var galbalDataEmpSnap=[];
var galbalDataTemp=[];
const pageNumberDefault=1;
// restfulPath
galbalDataTemp['restfulPathEmployeeSnapshot']=restfulURL + "/" + serviceName + "/public/employee_snap";
galbalDataTemp['restfulPathEmployeeSnapshot2']=restfulURL + "/" + serviceName + "/public/employee_snap2";
galbalDataTemp['restfulPathDropDownOrg']= restfulURL + "/" + serviceName +"/public/org";
galbalDataTemp['restfulPathDropDownEmpLevel']= galbalDataTemp['restfulPathEmployeeSnapshot']+ "/list_level";
galbalDataTemp['restfulPathEmployeeSnapshotAutocompletePosition']= galbalDataTemp['restfulPathEmployeeSnapshot']+ "/auto_position";
galbalDataTemp['restfulPathEmployeeSnapshotAutocompleteStartDate']= galbalDataTemp['restfulPathEmployeeSnapshot']+ "/auto_start_date";
galbalDataTemp['restfulPathEmployeeSnapshotAutocompleteEmpname']= galbalDataTemp['restfulPathEmployeeSnapshot']+ "/auto_emp";
galbalDataTemp['restfulPathEmployeeSnapshotImportFile']= galbalDataTemp['restfulPathEmployeeSnapshot']+ "/import";
galbalDataTemp['restfulPathEmployeeSnapshotExportFile']= galbalDataTemp['restfulPathEmployeeSnapshot']+ "/export";
galbalDataTemp['restfulPathEmployeeSnapshotListJob']= galbalDataTemp['restfulPathEmployeeSnapshot']+ "/parameter/list_job";

galbalDataTemp['restfulPathEmployeeSnapshotLastStartDate']= galbalDataTemp['restfulPathEmployeeSnapshot']+ "/parameter/last_start_date";
galbalDataTemp['restfulPathEmployeeSnapshotAutocompleteChiefEmpname']= galbalDataTemp['restfulPathEmployeeSnapshot']+ "/parameter/auto_chief_emp";
galbalDataTemp['restfulPathEmployeeSnapshotDelete']= galbalDataTemp['restfulPathEmployeeSnapshot']+ "/delete";
galbalDataTemp['restfulPathEmployeeSnapshotUpdate']= galbalDataTemp['restfulPathEmployeeSnapshot']+ "/update";

// Autocomplete Temp
galbalDataTemp['tempPositonLabel']="";
galbalDataTemp['tempPositonId']="";
galbalDataTemp['tempStartDateLabel']="";
galbalDataTemp['tempStartDateId']="";
galbalDataTemp['tempEmpLabel']="";
galbalDataTemp['tempEmpId']="";
galbalDataTemp['tempChiefEmpLabel']="";
galbalDataTemp['tempChiefEmpId']="";
galbalDataTemp['tempLastStartDate']="";
galbalDataTemp['tempTableEmplist'];
var generateDropDownList = function(url,type,request,initValue,save_name){
 	var html="";
 	
 	if(initValue!=undefined){
 		html+="<option value=''>"+initValue+"</option>";
	}

 	$.ajax ({
 		url:url,
 		type:type ,
 		dataType:"json" ,
 		data:request,
 		headers:{Authorization:"Bearer "+tokenID.token},
 		async:false,
 		success:function(data){
 			 if(save_name !=undefined){
 				galbalDataTemp[save_name]=data;
 			 }	
 			$.each(data,function(index,indexEntry){
 				html+="<option value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1] == undefined  ?  Object.keys(indexEntry)[0]:Object.keys(indexEntry)[1]]+"</option>";	
 			});	

 		}
 	});	
 	return html;
 };
 var generateDropDownListV2 = function(url,type,request,initValue){
	 	var html="";
	 	
	 	if(initValue!=undefined){
	 		html+="<option value=''>"+initValue+"</option>";
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
	 				html+="<option value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[2] == undefined  ?  Object.keys(indexEntry)[0]:Object.keys(indexEntry)[2]]+"</option>";	
	 			});	

	 		}
	 	});	
	 	return html;
	 };
var generateManageText = function(value,title){
	var html="";
	// สำหรับไว้แสดงข้อมูลเท่านั้น
	html+="<div class='manageItemView'>"+ value+ "</div>" ;
	// สำหรับแก้ไขข้อมูล
	html+="<div class='manageItemEdit'>";
	html+="		<input data-toggle='tooltip' title='' class='' style='margin-bottom: 0px;' data-placement='top' type='text' " ;
	html+="			   placeholder='"+title+"' data-original-title='"+title+"' value='"+value+"'  >";
	html+="</div>" ;
	 	
	return html;
};
var generateManageDropDownList = function(id,value,type,title){
	//Type List -level -job
//	console.log(id);
	var html="";
	// สำหรับไว้แสดงข้อมูลเท่านั้น
	html+="<div class='manageItemView'>"+ value+ "</div>" ;
	// สำหรับแก้ไขข้อมูล
	html+="<div class='manageItemEdit'>" ;
	html+="		<select data-toggle='tooltip' class='input span12 m-b-n manageItemEdit' style='min-width:120px' data-original-title='"+ title+ "'>" 
				$.each((type == 'level' ? galbalDataTemp['level']:galbalDataTemp['job']),function(index,indexEntry){
						
						if(id == indexEntry[Object.keys(indexEntry)[0]]){
							html+="<option selected value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1] == undefined  ?  Object.keys(indexEntry)[0]:Object.keys(indexEntry)[1]]+"</option>";	
						}else{
							html+="<option value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1] == undefined  ?  Object.keys(indexEntry)[0]:Object.keys(indexEntry)[1]]+"</option>";	
						}
					});	
	html+="		</select>" ;
	html+="</div>" ;
	 	
	return html;
};
	//-------- Update Start
	var updateFn = function () {
		
		var emp_list=[];
		$.each($(".selectEmpCheckbox:checked").parent().parent().get(),function(index,indexEntry){
				var emp_first_name = notNullTextFn($(indexEntry).children().eq(3).find("input").val().split(" ")[0]);
				var emp_last_name = notNullTextFn($(indexEntry).children().eq(3).find("input").val().split(" ")[1]);
				
				

				emp_list.push({
					"emp_snapshot_id": $(indexEntry).attr("emp_snapshot_id"),
					"emp_first_name": emp_first_name,
					"emp_last_name": emp_last_name,
					"chief_emp_code": notNullTextFn($(indexEntry).children().eq(5).find("input").val()),
					"level_id": $(indexEntry).children().eq(6).find("select").val(),
					"job_function_id": $(indexEntry).children().eq(7).find("select").val(),
					"distributor_code": notNullTextFn($(indexEntry).children().eq(8).find("input").val()),
					//"distributor_name": notNullTextFn($(indexEntry).children().eq(-).find("input").val(),
					"region": notNullTextFn($(indexEntry).children().eq(9).find("input").val()),
					"is_active": ($(indexEntry).find(".manageCheckBox").is(":checked") == true ? 1 : 0)
				});
		});
//		console.log(emp_list);
		$(".form-kpi-label label").text("Confirm to Mend Data?");
		$("#confrimModal").modal({
			"backdrop" : setModalPopup[0],
			"keyboard" : setModalPopup[1]
		});
		$(document).off("click","#btnConfirmOK");
		$(document).on("click","#btnConfirmOK",function(){
			$.ajax({
				url:galbalDataTemp['restfulPathEmployeeSnapshotUpdate']+"/0",
				type : "PATCH",
				dataType : "json",
				headers:{Authorization:"Bearer "+tokenID.token},
				data : {"emp_snapshot" : emp_list},	
				success : function(data) {
					
					 if(data['status']==200){

			    		 callFlashSlide("Update Successfully.");

				    	 getDataFn($("#pageNumber").val(),$("#rpp").val());
				    	 $("#confrimModal").modal('hide');
				    	 
				     }else if (data['status'] == "400"){
				    	 $("#btnConfirmOK").hide();
				    	 getDataFn($("#pageNumber").val(),$("#rpp").val());
				    	 validationFn(data,"#information2");
				     }
				}
			});
			
		});
		return false;
	}
	// -------- Update End
	

	//Check Validation
var validationFn = function(data,id){
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
	
	callFlashSlideInModal(validate,id,"error");
};	

	
// --------  Clear Start 
var clearFn = function() {
	

	$(".btnModalClose").click();
	
}
//--------  Clear End

var getLastStartDate = function() {
	
	$.ajax({
		url : galbalDataTemp['restfulPathEmployeeSnapshotLastStartDate'],
		type : "get",
		dataType : "json",
		data:{},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success : function(data) {
			galbalDataTemp['tempLastStartDate'] = data.start_date;
		}
	});
	
	
}
//--------  GetData Start
var getDataFn = function(page,rpp){
	//alert("Page : "+page+" - Rpp : "+rpp);
	
	
	$.ajax({
		url : galbalDataTemp['restfulPathEmployeeSnapshot2'],
		type : "get",
		dataType : "json",
		data:{
			"page":page,"rpp":rpp,
			"job_function_id":$("#param_job_function_id").val(),
			"level_id":$("#param_level_id").val(),
			"position_id":$("#param_position_id").val(),
			"start_date":$("#param_start_date").val(),
			"emp_snapshot_id":$("#param_emp_id").val(),
			"chief_emp_code": $("#param_chief_emp_code").val(),
			"more_position": $("#param_cbx_position").val(),
			"more_chief_emp": $("#param_cbx_chief_emp").val(),
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success : function(data) {
			$(".selectEmpCheckboxAll").prop('checked', false);
			listEmployeeSnapFn(data['data']);
			//total
			
			galbalDataEmpSnap=data;
			paginationSetUpFn(galbalDataEmpSnap['current_page'],galbalDataEmpSnap['last_page'],galbalDataEmpSnap['last_page']);
		}
	});
	
	
};
//--------  GetData End

// -------- Search Start
var searchAdvanceFn = function (job,level,position,startDate,emp,chief,cbx_position,cbx_chief) {
	//embed parameter start
	var htmlParam="";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_job_function_id' name='param_job_function_id' value='"+job+"'>";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_level_id' name='param_level_id' value='"+level+"'>";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_position_id' name='param_position_id' value='"+position+"'>";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_start_date' name='param_start_date' value='"+startDate+"'>";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_emp_id' name='param_emp_id' value='"+emp+"'>";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_chief_emp_code' name='param_chief_emp_code' value='"+chief+"'>";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_cbx_position' name='param_cbx_position' value='"+cbx_position+"'>";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_cbx_chief_emp' name='param_cbx_chief_emp' value='"+cbx_chief+"'>";
	$(".param_Embed").remove();
	$("body").append(htmlParam);

	getDataFn(pageNumberDefault,$("#rpp").val());
	
}
// -------- Search End



// --------  ListData  Start

var listEmployeeSnapFn = function(data,type) {
	$("#listEmployee").empty();
	var htmlTable = "";

	$.each(data,function(index,indexEntry) {
      // is active
		var is_active_html = "";
		if(notNullTextFn(indexEntry["is_active"])==1){
			is_active_html = "checked";
		}
		
		htmlTable += "<tr class='rowSearch' emp_snapshot_id='"+indexEntry["emp_snapshot_id"]+"' >";
		htmlTable += "<td id=\"objectCenter\" class='objectCenter 'style=\"\">"+"" +
						"<input  style=\"margin-bottom: 3px;\"type=\"checkbox\"  class='selectEmpCheckbox' " +
							"id=kpiCheckbox-"+indexEntry["emp_snapshot_id"]+" value=\""+indexEntry["emp_snapshot_id"]+"\">"+
					"</td>";
		
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ indexEntry["start_date"]+ 	"</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ indexEntry["emp_code"]+ 	"</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ generateManageText(indexEntry["emp_first_name"]+" "+indexEntry["emp_last_name"], "Employee Name")+"</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ notNullTextFn(indexEntry["position_code"])+ "</div></td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ generateManageText(indexEntry["chief_emp_code"], "Chief Employee Name")+"</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ generateManageDropDownList(indexEntry["level_id"],notNullTextFn(indexEntry["appraisal_level_name"]),"level","Level")+"</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ generateManageDropDownList(indexEntry["job_function_id"],notNullTextFn(indexEntry["job_function_name"]),"job","Job Function")+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ generateManageText(notNullTextFn(indexEntry["distributor_code"]), "Distributor Code")+"</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ generateManageText(notNullTextFn(indexEntry["region"]), "Region")+"</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;text-align:center;\"><input type='checkbox' class='manageCheckBox' style='margin-top: 4px;' "+is_active_html+" disabled></td>";
		
		//htmlTable += "<td id=\"objectCenter\" style=\"vertical-align: middle;\"><button id="+indexEntry["emp_snapshot_id"]+" data-target=#ModalEditEmployee data-toggle='modal' data-backdrop='"+setModalPopup[0]+"' data-keyboard='"+setModalPopup[1]+"' class='btn btn-primary btn-xs edit'><i class='icon-edit' aria-hidden='true'></i></button></td>";

		htmlTable += "</tr>";
	});


	$("#listEmployee").html(htmlTable);
	$('[data-toggle="tooltip"]').css({"cursor":"pointer"});
	 $('[data-toggle="tooltip"]').tooltip({
		 html:true
	 });
	 if(type == "edit"){
		
		 $(".manageItemView , .pagination-display").hide();
		 $(".manageItemEdit").show();
		 $(".manageCheckBox").prop('disabled', false);
	 }else{
		 $(".manageItemView , .pagination-display").show();
		 $(".manageItemEdit").hide();
		 $(".manageCheckBox").prop('disabled', true);
	 }
	
	// Checkbox Select All
	 
	$(".selectEmpCheckboxAll").off("click");
	$(".selectEmpCheckboxAll").prop('checked', false);
	$(".selectEmpCheckboxAll").click(function(){
		console.log($(".selectEmpCheckboxAll").is(":checked"));
		if($(".selectEmpCheckboxAll").is(":checked")){$(".selectEmpCheckbox").prop('checked', true);}else{$(".selectEmpCheckbox").prop('checked', false);}
	});
	
	
	
}

// --------  ListData  End
var deleteDataFn = function(){
	
	var emp_snapshot_id=[];
	$.each($("input.selectEmpCheckbox:checked").get(),function(index,indexEntry){
	    emp_snapshot_id.push({
	    		emp_snapshot_id : $(indexEntry).val()
	    	});
	});
	
	$("#confrimModal").modal({
		"backdrop" : setModalPopup[0],
		"keyboard" : setModalPopup[1]
	});
	$(".form-kpi-label label").text("Confirm to Delete Data?");
	$(document).off("click","#btnConfirmOK");
	$(document).on("click","#btnConfirmOK",function(){
	
		$.ajax({
			 url:galbalDataTemp['restfulPathEmployeeSnapshotDelete'],
			 type : "delete",
			 dataType:"json",
			 data:{"emp_snapshot_id":emp_snapshot_id},
			 async:false,
			 headers:{Authorization:"Bearer "+tokenID.token},
		     success:function(data){
		    	 
		    	 if(data['status']==200){

		    		 callFlashSlide("Delete Successfully.");

			    	 getDataFn($("#pageNumber").val(),$("#rpp").val());
			    	 $("#confrimModal").modal('hide');
			    	 
			     }else if (data['status'] == "400"){
			    	 $("#btnConfirmOK").hide();
			    	 getDataFn($("#pageNumber").val(),$("#rpp").val());
			    	 validationFn(data,"#information2");
			    	 
			    	 //backToTopFn();
			     }
			     	
			 }
		});
		
	});
	
};


$(document).ready(function() {

		
	var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==false){
	 		return false;
	 	}
	 }
  
	

	// ------------------- Employee -------------------
	$(".sr-only").hide();
	$("#search_position_name,#search_position_id,#search_emp_name,#search_emp_id,#search_chief_emp_code,#search_chief_emp_name").val("");
	$("#search_emp_id #search_start_date #search_position_name").val("");
	$('#cbx_more_position,#cbx_chief_code').prop('checked', false);

	$("#search_job_function").html(generateDropDownList(galbalDataTemp['restfulPathEmployeeSnapshotListJob'],"GET",{},"All Job Function","job"));
	$("#search_level").html(generateDropDownList(galbalDataTemp['restfulPathDropDownEmpLevel'],"GET",{},"All Level","level"));
	getLastStartDate();

	
	
	$(".app_url_hidden").show();
	$("#btn_search_advance").click(function(){
		searchAdvanceFn(//job,level,position,startDate,emp,chief,cbx_position,cbx_chief
				$("#search_job_function").val(),
				$("#search_level").val(),
				$("#search_position_id").val(),
				$("#search_start_date_id").val(),
				$("#search_emp_id").val(),
				$("#search_chief_emp_code").val(),
				$('#cbx_more_position').is(':checked'),
				$('#cbx_chief_code').is(':checked')
				);
		$("#EmpSnap_list_content").show();
		return false;
	});
	
	$("#btn_edit").off("click");
	$("#btn_edit").click(function(){
		$("#btn_delete").prop('disabled', true);
		$("#btn_save").prop('disabled', false);
		$("#btn_cancel").prop('disabled', false);
		
		$("body").mLoading();
		listEmployeeSnapFn(galbalDataEmpSnap['data'],"edit");
		$("body").mLoading('hide');

	});
	$("#btn_delete").off("click");
	$("#btn_delete").click(function(){
		if ($('input.selectEmpCheckbox:checked').val() == undefined){
			callFlashSlide("Please Select Employee !!!");
		}else {
			$("#btnConfirmOK").show();
			deleteDataFn();
		}
		
		$("#btn_edit").prop('disabled', false);
		$("#btn_save").prop('disabled', true);
		$("#btn_cancel").prop('disabled', true);

	});
	$("#btn_cancel,#btn_save").off("click");
	$("#btn_save").click(function(){
		
		if( $(".selectEmpCheckbox:checked").length != 0 ) {
			$("#btnConfirmOK").show();
			updateFn();
			$("#btn_edit").prop('disabled', false);
			$("#btn_save").prop('disabled', true);
			$("#btn_cancel").prop('disabled', true);
			$("#btn_delete").prop('disabled', false);
			
			
		}else{
			callFlashSlide("Please Select Employee !!!");
		}
		
		

	});
	$("#btn_cancel").click(function(){
		$("#btn_edit").prop('disabled', false);
		$("#btn_save").prop('disabled', true);
		$("#btn_cancel").prop('disabled', true);
		$("#btn_delete").prop('disabled', false);
		$(".manageCheckBox").prop('disabled', true);
		
		$("body").mLoading();
		listEmployeeSnapFn(galbalDataEmpSnap['data'],"restore");
		$("body").mLoading('hide');
	});
	
	$(".btnCancle").click(function() {
		clearFn();
	});

	

	
	//Autocomplete Search Start
	$("#search_position_name").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:galbalDataTemp['restfulPathEmployeeSnapshotAutocompletePosition'],
				 type:"GET",
				 dataType:"json",
				 headers:{Authorization:"Bearer "+tokenID.token},
				 data:{"position_code":request.term},
				 //async:false,
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					  
						response($.map(data, function (item) {
                            return {
                                label: item.position_code,
                                value: item.position_code,
                                position_id:item.position_id
                            };
                        }));
					
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        },
		select:function(event, ui) {
			$("#search_position_name").val(ui.item.value);
            $("#search_position_id").val(ui.item.position_id);
            galbalDataTemp['tempPositonLabel'] = ui.item.value;
            galbalDataTemp['tempPositonId']=ui.item.position_id;
            return false;
        },change: function(e, ui) {  
			if ($("#search_position_name").val() == galbalDataTemp['tempPositonLabel']) {
				$("#search_position_id").val(galbalDataTemp['tempPositonId']);
			} else if (ui.item != null) {
				$("#search_position_id").val(ui.item.position_id);
			} else {
				$("#search_position_id").val("");
			}
        	
         }
    });
	// Default Start Date
	galbalDataTemp['tempStartDateLabel'] = galbalDataTemp['tempLastStartDate'];
    galbalDataTemp['tempStartDateId']= galbalDataTemp['tempLastStartDate'];
    $("#search_start_date , #search_start_date_id").val(galbalDataTemp['tempLastStartDate']);
  
	$("#search_start_date").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:galbalDataTemp['restfulPathEmployeeSnapshotAutocompleteStartDate'],
				 type:"get",
				 dataType:"json",
				 headers:{Authorization:"Bearer "+tokenID.token},
				 data:{"start_date":request.term},
				 //async:false,
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					  
						response($.map(data, function (item) {
                            return {
                                label: item.start_date,
                                value: item.start_date,
                                start_date_id :item.start_date
                            };
                        }));
					
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        },
		select:function(event, ui) {
			$("#search_start_date").val(ui.item.value);
            $("#search_start_date_id").val(ui.item.start_date_id);
            galbalDataTemp['tempStartDateLabel'] = ui.item.value;
            galbalDataTemp['tempStartDateId']=ui.item.start_date_id;
            return false;
        },change: function(e, ui) {  
			if ($("#search_start_date").val() == galbalDataTemp['tempStartDateLabel']) {
				$("#search_start_date_id").val(galbalDataTemp['tempStartDateId']);
			} else if (ui.item != null) {
				$("#search_start_date_id").val(ui.item.start_date_id);
			} else {
				$("#search_start_date_id").val("");
			}
        	
         }
    });
	$("#search_emp_name").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:galbalDataTemp['restfulPathEmployeeSnapshotAutocompleteEmpname'],
				 type:"get",
				 dataType:"json",
				 headers:{Authorization:"Bearer "+tokenID.token},
				 data:{
					 "job_function_id":$("#search_job_function").val(),
					 "level_id":$("#search_level").val(),
					 "position_id":$("#search_position_id").val(),
					 "start_date":$("#search_start_date_id").val(),
					 "emp_name":request.term
					 },
				 //async:false,
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					  
						response($.map(data, function (item) {
                            return {
                                label: item.emp_name,
                                value: item.emp_name,
                                mp_snapshot_id :item.emp_snapshot_id
                            };
                        }));
					
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        },
		select:function(event, ui) {
			$("#search_emp_name").val(ui.item.value);
            $("#search_emp_id").val(ui.item.mp_snapshot_id);
            galbalDataTemp['tempEmpLabel'] = ui.item.value;
            galbalDataTemp['tempEmpId']=ui.item.mp_snapshot_id;
            return false;
        },change: function(e, ui) {  
			if ($("#search_emp_name").val() == galbalDataTemp['tempEmpLabel']) {
				$("#search_emp_id").val(galbalDataTemp['tempEmpId']);
			} else if (ui.item != null) {
				$("#search_emp_id").val(ui.item.mp_snapshot_id);
			} else {
				$("#search_emp_id").val("");
			}
        	
         }
    });
	
	$("#search_chief_emp_name").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:galbalDataTemp['restfulPathEmployeeSnapshotAutocompleteChiefEmpname'],
				 type:"get",
				 dataType:"json",
				 headers:{Authorization:"Bearer "+tokenID.token},
				 data:{
					 "emp_snapshot_id":$("#search_emp_id").val(),
					 "start_date":$("#search_start_date_id").val(),
					 "emp_name":request.term
					 },
				 //async:false,
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					  
						response($.map(data, function (item) {
                            return {
                                label: item.emp_name,
                                value: item.emp_name,
                                mp_emp_code :item.emp_code
                            };
                        }));
					
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        },
		select:function(event, ui) {
			$("#search_chief_emp_name").val(ui.item.value);
            $("#search_chief_emp_code").val(ui.item.mp_emp_code);
            galbalDataTemp['tempChiefEmpLabel'] = ui.item.value;
            galbalDataTemp['tempChiefEmpId']=ui.item.mp_emp_code;
            return false;
        },change: function(e, ui) {  
			if ($("#search_chief_emp_name").val() == galbalDataTemp['tempChiefEmpLabel']) {
				$("#search_chief_emp_code").val(galbalDataTemp['tempChiefEmpId']);
			} else if (ui.item != null) {
				$("#search_chief_emp_code").val(ui.item.mp_snapshot_id);
			} else {
				$("#search_chief_emp_code").val("");
			}
        	
         }
    });
   
	//Autocomplete Search End	

	
	//binding tooltip start
	 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
	 $('[data-toggle="tooltip"]').tooltip({
		 html:true
	 });
	
	

});