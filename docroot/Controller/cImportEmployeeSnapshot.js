
//Global variable
var galbalDataEmpSnap=[];
var galbalDataTemp=[];
const pageNumberDefault=1;
// restfulPath
galbalDataTemp['restfulPathEmployeeSnapshot']=restfulURL + "/" + serviceName + "/public/employee_snap";
galbalDataTemp['restfulPathDropDownOrg']= restfulURL + "/" + serviceName +"/public/org";
galbalDataTemp['restfulPathDropDownEmpLevel']= galbalDataTemp['restfulPathEmployeeSnapshot']+ "/list_level";
galbalDataTemp['restfulPathEmployeeSnapshotAutocompletePosition']= galbalDataTemp['restfulPathEmployeeSnapshot']+ "/auto_position";
galbalDataTemp['restfulPathEmployeeSnapshotAutocompleteStartDate']= galbalDataTemp['restfulPathEmployeeSnapshot']+ "/auto_start_date";
galbalDataTemp['restfulPathEmployeeSnapshotAutocompleteEmpname']= galbalDataTemp['restfulPathEmployeeSnapshot']+ "/auto_emp";
galbalDataTemp['restfulPathEmployeeSnapshotImportFile']= galbalDataTemp['restfulPathEmployeeSnapshot']+ "/import";
galbalDataTemp['restfulPathEmployeeSnapshotExportFile']= galbalDataTemp['restfulPathEmployeeSnapshot']+ "/export";
// Autocomplete Temp
galbalDataTemp['tempPositonLabel']="";
galbalDataTemp['tempPositonId']="";
galbalDataTemp['tempStartDateLabel']="";
galbalDataTemp['tempStartDateId']="";
galbalDataTemp['tempEmpLabel']="";
galbalDataTemp['tempEmpId']="";

var generateDropDownList = function(url,type,request,initValue){
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

	
var validateFileFn = function(data){
	var validateFile="";

	$.each(data,function(index,indexEntry){
		if(indexEntry[Object.keys(indexEntry)[0]]!= undefined || indexEntry[Object.keys(indexEntry)[0]]==null){
		
			if(indexEntry[Object.keys(indexEntry)[0]]== null){//The employee code field is null
				validateFile+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> "+Object.keys(indexEntry)[0]+" : null <i class='fa fa-level-down'></i><br>";
			}else{
				validateFile+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> "+Object.keys(indexEntry)[0]+": "+indexEntry[Object.keys(indexEntry)[0]]+" <i class='fa fa-level-down'></i><br>";
			}
			if(indexEntry['errors']!=null || indexEntry['errors']!=undefined || indexEntry['errors']!=""){
				//validateFile+="<font color='red'>&emsp;*</font> "+indexEntry['errors']+"<br>";
				for (var key in indexEntry['errors']) {
	 			    if (indexEntry['errors'].hasOwnProperty(key)) {
	 			    	validateFile+="<font color='red'>&emsp;*</font> "+indexEntry['errors'][key]+"<br>";
	 			    }
	 			}
			}
		}
		 
//	     $.each(indexEntry['errors'],function(index2,indexEntry2){
//	    	 console.log("test4");
//	    	 //validateFile+="<font color='red'>&emsp;*</font> "+indexEntry2+"<br>";
//	     });
	 
	});
	callFlashSlideInModal(validateFile,"#informationFile","error");
}
	
// --------  Clear Start 
var clearFn = function() {
	

	
	$("#from_start_date").val("");
	$("#from_emp_id").val("");
	$("#from_emp_code").val("");
	$("#from_emp_name").val("");
	$("#from_email").val("");
	$("#from_org_name").val("");
	$("#from_level_name").val("");
	$("#from_position_code").val("");
	$("#from_chief_emp_code").val("");
	$("#from_distributor_code").val("");
	$("#from_distributor_name").val("");
	$("#from_region").val("");
		
	
	
	$(".btnModalClose").click();
	
}
//--------  Clear End

var ImportLiferayUser = function(data) {
	$("#userImportModal").modal();
	$(document).off("click","#btnUserImportOK");
	$(document).on("click","#btnUserImportOK",function(){
		
		var importResp = [], importIdx = 0, progressTxt = 1;
		
		$("body").mLoading('hide');	
		$("#btnUserImportOK").prop('disabled', true);
		$("#userImportProgressbar").toggle();
		
		$.each(data.emp, function( key, value ) {
					
			//console.log( key + ": Code:" + value.emp_code + ", Fname:" + fname + ", Lname:" + lname + ", Email:" + value.email );
					
			$.ajax({
				url: lifeRayApiUrl+"/api/jsonws/user/add-user",
				type : "POST",
				dataType:"JSON",
				async:false,
				cache: false,
				data:{
					"companyId": $("#companyID").val(),
				    "autoPassword": false,
				    "password1": value.emp_code,
					"password2": value.emp_code,
					"autoScreenName": false,
					"screenName": value.emp_code,
					"emailAddress": value.email,
					"facebookId": 0,
					"openId": null,
					"locale": 0,
					"firstName": value.emp_name,
					"middleName": null,
					"lastName": null,
					"prefixId": 0,
					"suffixId": 0,
					"male": true,
					"birthdayMonth": 1,
					"birthdayDay": 1,
					"birthdayYear": 1970,
					"jobTitle": null,
					"groupIds": null,
					"organizationIds": null,
					"roleIds": value.role_id,
					"userGroupIds": null,
					"sendEmail": false,
					"p_auth": $("#pAuth").val()
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				},
				success:function(dataImp){
					// console.log(data2);
					var dataException = dataImp.exception;
					if(dataException != null){
						importResp[importIdx] = {"emp_code":value.emp_code, "exception":dataImp.exception};
						importIdx = importIdx + 1;
						//console.log(dataImp.exception);
					}
				}
			});
			
			// Progress bar //
			var progressVal = (progressTxt / data.emp.length) * 100;
		    $("#userImportProgressbar").progressbar({
		        value: progressVal
		    });
		    if(progressTxt == data.emp.length){
		    	$("#progressText").html("<b> Complete!! </b>");
		    }else{
		    	$("#progressText").html("<b>"+progressTxt+" / "+data.emp.length+"  ("+progressVal.toFixed(2)+"%)</b>");
		    }		    
		    progressTxt = progressTxt + 1;
		});
		
		// Display Import Response //
		if(importResp.length > 0){
			//$("#btnUserImportOK").prop('disabled', true);
			var validateFile="";
			$.each(importResp, function(index, indexEntry){
				validateFile+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> "+indexEntry.emp_code+" : "+indexEntry.exception+" <br>";
			});
			callFlashSlideInModal(validateFile, "#userImportInfo", "error");
		}else{
			$("#userImportModal").modal('hide');
			callFlashSlide("Import User Successfully");
		}
	});
}
//--------  GetData Start
var getDataFn = function(page,rpp){
	//alert("Page : "+page+" - Rpp : "+rpp);

	var orgId= $("#param_org_id").val();
	var levelId= $("#param_level_id").val();
	var positionId= $("#param_position_id").val();
	var startDate= $("#param_start_date").val();
	var empId= $("#param_emp_id").val();
	$.ajax({
		url : galbalDataTemp['restfulPathEmployeeSnapshot'],
		type : "get",
		dataType : "json",
		data:{
			"page":page,"rpp":rpp,
			"org_id":orgId,
			"level_id":levelId,
			"position_id":positionId,
			"start_date":startDate,
			"emp_snapshot_id":empId
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success : function(data) {

			listEmployeeSnapFn(data['data']);
			//total
			galbalDataEmpSnap=data;
			paginationSetUpFn(galbalDataEmpSnap['current_page'],galbalDataEmpSnap['last_page'],galbalDataEmpSnap['last_page']);
		}
	});
	
	
};
//--------  GetData End

// -------- Search Start
var searchAdvanceFn = function (org,level,position,startDate,emp) {
	//embed parameter start
	var htmlParam="";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_org_id' name='param_org_id' value='"+org+"'>";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_level_id' name='param_level_id' value='"+level+"'>";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_position_id' name='param_position_id' value='"+position+"'>";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_start_date' name='param_start_date' value='"+startDate+"'>";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_emp_id' name='param_emp_id' value='"+emp+"'>";
	$(".param_Embed").remove();
	$("body").append(htmlParam);

	getDataFn(pageNumberDefault,$("#rpp").val());
	
}
// -------- Search End

// -------- findOne
var findOneFn = function(id) {
	var count = 1
	$.ajax({
		url:galbalDataTemp['restfulPathEmployeeSnapshot']+"/"+id,
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {		
			$("#from_start_date").val(data['start_date']);
			$("#from_emp_id").val(data['emp_id']);
			$("#from_emp_code").val(data['emp_code']);
			$("#from_emp_name").val(data['emp_first_name']+" "+data['emp_last_name']);
			$("#from_email").val(data['email']);
			$("#from_org_name").val(data['org_name']);
			$("#from_level_name").val(data['appraisal_level_name']);
			$("#from_position_code").val(data['position_code']);
			$("#from_chief_emp_code").val(data['chief_emp_code']);
			$("#from_distributor_code").val(data['distributor_code']);
			$("#from_distributor_name").val(data['distributor_name']);
			$("#from_region").val(data['region']);
		}
	});
};
//--------- findOne


// --------  ListData  Start

var listEmployeeSnapFn = function(data) {
	//alert("listEmployeeSnapFn");
	var htmlTable = "";

	$.each(data,function(index,indexEntry) {
      
		htmlTable += "<tr class='rowSearch'>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ indexEntry["start_date"]+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ indexEntry["emp_code"]+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ indexEntry["emp_first_name"]+" "+indexEntry["emp_last_name"]+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ notNullTextFn(indexEntry["org_name"])+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ notNullTextFn(indexEntry["position_code"])+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ notNullTextFn(indexEntry["chief_emp_code"])+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ notNullTextFn(indexEntry["appraisal_level_name"])+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ notNullTextFn(indexEntry["distributor_code"])+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ notNullTextFn(indexEntry["region"])+ "</td>";
		
		htmlTable += "<td id=\"objectCenter\" style=\"vertical-align: middle;\"><button id="+indexEntry["emp_snapshot_id"]+" data-target=#ModalViewEmployee data-toggle='modal' data-backdrop='"+setModalPopup[0]+"' data-keyboard='"+setModalPopup[1]+"' class='btn btn-primary btn-xs view'><i class='fa fa-eye' aria-hidden='true'></i></button></td>";

		htmlTable += "</tr>";
	});


	$("#listEmployee").html(htmlTable);

	
	//function popover
	//$(".popover-edit-del").popover(setPopoverDisplay);
	
	$("#tableEmployee").off("click",".view");
	$("#tableEmployee").on("click",".view",function(){
		
			clearFn();
			findOneFn(this.id);	
			
	});
	
	
}

// --------  ListData  End



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
	$("#search_emp_id #search_start_date #search_position_name").val("");
	$("#search_org").html(generateDropDownListV2(galbalDataTemp['restfulPathDropDownOrg'],"GET",{},"All Organization"));
	$("#search_level").html(generateDropDownList(galbalDataTemp['restfulPathDropDownEmpLevel'],"GET",{},"All Level"));


	
	
	$(".app_url_hidden").show();
	$("#btn_search_advance").click(function(){
		searchAdvanceFn(
				$("#search_org").val(),
				$("#search_level").val(),
				$("#search_position_id").val(),
				$("#search_start_date_id").val(),
				$("#search_emp_id").val()
				);
		$("#EmpSnap_list_content").show();
		return false;
	});
	
	
	
	$(".btnCancle").click(function() {
		clearFn();
	});


	
	//Autocomplete Search Start
	$("#search_position_name").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:galbalDataTemp['restfulPathEmployeeSnapshotAutocompletePosition'],
				 type:"get",
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
					 "org_id":$("#search_org").val(),
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
	
   
	//Autocomplete Search End
	
	$("#exportToExcel").click(function(){
		$("form#formExportToExcel").attr("action",galbalDataTemp['restfulPathEmployeeSnapshotExportFile']+"?token="+tokenID.token+"");
	});
	
	
	//FILE IMPORT MOBILE START
	$("#btn_import").click(function () {
		$("#ModalImport").modal({
			"backdrop" : setModalPopup[0],
			"keyboard" : setModalPopup[1]
		});
		$('#file').val("");
		$(".btnModalClose").click();
		$(".dropify-clear").click(); 
	});

	// Variable to store your files
	var files;
	// Add events
	$('#file').on('change', prepareUpload2);

	// Grab the files and set them to our variable
	function prepareUpload2(event)
	{
	  files = event.target.files;
	}
	$('form#fileImportEmployee').on('submit', uploadFiles);

	// Catch the form submit and upload the files
	function uploadFiles(event)
	{
		
		event.stopPropagation(); // Stop stuff happening
		event.preventDefault(); // Totally stop stuff happening

		// START A LOADING SPINNER HERE

		// Create a formdata object and add the files
		var data = new FormData();
		$.each(files, function(key, value)
		{
			data.append(key, value);
		});
		$("body").mLoading();
		$.ajax({
			url:galbalDataTemp['restfulPathEmployeeSnapshotImportFile'],
			type: 'POST',
			data: data,
			cache: false,
			dataType: 'json',
			processData: false, // Don't process the files
			contentType: false, // Set content type to false as jQuery will tell the server its a query string request
			headers:{Authorization:"Bearer "+tokenID.token},
			success: function(data, textStatus, jqXHR)
			{
				
				//console.log(data);
				if(data['status']==200 && data['errors'].length==0){
							
					callFlashSlide("Import Employee Successfully");
					getDataFn($(".pagination .active").attr( "data-lp" ),$("#rpp").val());
					$("body").mLoading('hide');
					$('#ModalImport').modal('hide');
					if(data["emp"].length > 0){
						ImportLiferayUser(data);
					}
					
				}else{
					validateFileFn(data['errors']);
					getDataFn($(".pagination .active").attr( "data-lp" ),$("#rpp").val());
					$("body").mLoading('hide');
					if(data["emp"].length > 0){
						ImportLiferayUser(data);
					}
					

				}
			},
			error: function(jqXHR, textStatus, errorThrown)
			{
				// Handle errors here
				callFlashSlide('Format Error : ' + textStatus);
				// STOP LOADING SPINNER
			}
		});
		return false;
	}
	
	
	//binding tooltip start
	 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
	 $('[data-toggle="tooltip"]').tooltip({
		 html:true
	 });
	//binding tooltip end
	// Basic
     $('.dropify').dropify();

     // Translated
      $('.dropify-fr').dropify({
         messages: {
         	 'default': 'Glissez-dposez un fichier ici ou cliquez',
             replace: 'Glissez-dposez un fichier ou cliquez pour remplacer',
             remove:  'Supprimer',
             error:   'Dsol, le fichier trop volumineux'
         }
     });
	// Used events
      
      
     var drEvent = $('#input-file-events').dropify();

     drEvent.on('dropify.beforeClear', function(event, element){
         return confirm("Do you really want to delete \"" + element.file.name + "\" ?");
     });

     drEvent.on('dropify.afterClear', function(event, element){
         alert('File deleted');
     });

     drEvent.on('dropify.errors', function(event, element){
         console.log('Has Errors');
     });

     var drDestroy = $('#input-file-to-destroy').dropify();
     drDestroy = drDestroy.data('dropify');
     $('#toggleDropify').on('click', function(e){
         e.preventDefault();
         if (drDestroy.isDropified()) {
             drDestroy.destroy();
         } else {
             drDestroy.init();
         }
     });	
	// ------------------- Employee END -------------------
	

});