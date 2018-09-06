//Global variable
var galbalDataSalary=[];
var pageNumberDefault=1;
var gUpdateYearId, gUpdateLevelId, gUpdateStep;
var gDeleteYearId, gDeleteLevelId, gDeleteStep;

$(document).ready(function() {		
	var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==false){
	 		return false;
	 	}
	 }	 
	 getYearFn();
	 getLevelFn();
	 $(".app_url_hidden").show();
	 
	$("#btn_search_advance").click(function(){
			$("#param_year").val($("#year").val());
			$("#param_level").val($("#level").val());
			getDetailFn();
	});

	
 });
// dropdownYear
var getYearFn = function(){
	$("body").mLoading('show');	
	var htmlYear="";
	$.ajax({
		url : restfulURL+"/"+serviceName+"/public/salary_structure/all_list_year",
		 type:"get",
		 dataType:"json",
		 headers:{Authorization:"Bearer "+tokenID.token},
		 //async:false,
        error: function (xhr, textStatus, errorThrown) {
               console.log('Error: ' + xhr.responseText);
           },
		 success:function(data){
		
				$.each(data,function(index,indexEntry){
				htmlYear+="<option value='"+indexEntry['appraisal_year_id']+"'>"+indexEntry['appraisal_year']+"</option>"
				});	
				 $("#year").html(htmlYear);
			 console.log(data);
		 },
		beforeSend:function(){
			$("body").mLoading('hide');	
		}
		
		});
} 
// dropdownlevel
var getLevelFn = function(){
	$("body").mLoading('show');	
	var htmlLevel="";
	htmlLevel+="<option value=''>All level</option>"
	$.ajax({
		url : restfulURL+"/"+serviceName+"/public/salary_structure/all_list_level",
		 type:"get",
		 dataType:"json",
/*		 data: { "data": JSON.stringify(dataChangeComment) },*/
		 headers:{Authorization:"Bearer "+tokenID.token},
		 //async:false,
        error: function (xhr, textStatus, errorThrown) {
               console.log('Error: ' + xhr.responseText);
           },
		 success:function(data){
		
				$.each(data,function(index,indexEntry){
				htmlLevel+="<option value='"+indexEntry['level_id']+"'>"+indexEntry['appraisal_level_name']+"</option>"
				});	
				 $("#level").html(htmlLevel);
			 console.log(data);
		 },
		beforeSend:function(){
			$("body").mLoading('hide');	
		}
		
		});
} 

//table
var getDetailFn = function(){
	$("body").mLoading('show');	
	var htmltable="";
	$.ajax({
		url : restfulURL+"/"+serviceName+"/public/salary_structure",
		 type:"get",
		 dataType:"json",
		 data: { 
			 "year": $("#param_year").val(),
			 "level": $("#param_level").val(),
			 },
		 headers:{Authorization:"Bearer "+tokenID.token},
		 //async:false,
        error: function (xhr, textStatus, errorThrown) {
               console.log('Error: ' + xhr.responseText);
           },
		 success:function(data){
//		
				$.each(data,function(index,indexEntry){
					htmltable+="<tr >"
					htmltable+="<td style='width: auto' id=\"year-"+indexEntry["appraisal_year"]+"__"+indexEntry["level_id"]+"__"+split(indexEntry["step"])+"\">"+indexEntry['appraisal_year']+"</td>"
					htmltable+="<td style='width: auto' id=\"level-"+indexEntry["appraisal_year"]+"__"+indexEntry["level_id"]+"__"+split(indexEntry["step"])+"\">"+indexEntry['appraisal_level_name']+"</td>"
					htmltable+="<td style='width: auto' id=\"step-"+indexEntry["appraisal_year"]+"__"+indexEntry["level_id"]+"__"+split(indexEntry["step"])+"\">"+indexEntry['step']+"</td>"
					htmltable+="<td style='width: auto' id=\"salary-"+indexEntry["appraisal_year"]+"__"+indexEntry["level_id"]+"__"+split(indexEntry["step"])+"\">"+indexEntry['s_amount']+"</td>"
					htmltable+= "<td id=\"objectCenter\" style=\"vertical-align: middle;\"><i class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-trigger=\"focus\" tabindex=\""+index+"\" data-content=\"<button class='btn btn-warning btn-xs edit' id=edit-"+indexEntry["appraisal_year"]+"__"+indexEntry["level_id"]+"__"+split(indexEntry["step"])+ " data-target=#ModalEdit data-toggle='modal' data-backdrop='"+setModalPopup[0]+"' data-keyboard='"+setModalPopup[1]+"'>Edit</button>&nbsp;" ;
					htmltable+= "<button id=del-"+indexEntry["appraisal_year"]+"__"+indexEntry["level_id"]+"__"+split(indexEntry["step"])+" class='btn btn-danger btn-xs del'>Delete</button>\"></i></td>";
					
					htmltable+="</tr>"
				});	
			 $("#listSalaryRange").html(htmltable);
			 $("#salary_list_content").show();
			 console.log(data);
			 $(".popover-edit-del").popover(setPopoverDisplay);
			 $("#tableSalaryRange").off("click",".popover-edit-del");
			 $("#tableSalaryRange").on("click",".popover-edit-del",function(){
						$(".edit").on("click",function() {
						$(".btnModalClose").click();
						findOneFn(this.id);	
						
						});
						
						$(".del").on("click",function(){
							var delid = this.id.split("-")[1];
						
						     gDeleteYearId= delid.split("__")[0];
						     gDeleteLevelId= delid.split("__")[1];
						     gDeleteStep= delid.split("__")[2]+"."+delid.split("__")[3];
						     
							alert(gDeleteYearId);
							 
							$("#confrimModal").modal({
								"backdrop" : setModalPopup[0],
								"keyboard" : setModalPopup[1]
							});
							$(document).off("click","#btnConfirmOK");
							$(document).on("click","#btnConfirmOK",function(){
							
								$.ajax({
									 url:restfulURL+"/"+serviceName+"/public/salary_structure",
									 type : "delete",
									 dataType:"json",
									 data : {
											'appraisal_year': gDeleteYearId,
												'level_id': gDeleteLevelId,
													'step':gDeleteStep
									 },
									 async:false,
									 headers:{Authorization:"Bearer "+tokenID.token},
								     success:function(data){
								    	 
								    	 if(data['status']==200){			  	 									   
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
						
					});
			 
			 $(".edit").on("click",function() {
					$(".btnModalClose").click();
			 });
			
		 },
		beforeSend:function(){
			$("body").mLoading('hide');	
		}
		
		});
} 
$("#exportToExcel").click(function(){
	$("form#formExportToExcel").attr("action",$("#url_portlet").val()+"/file/import_SalaryRange_template.xlsx");
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
//$("#importFileMobile").click(function () {
//	$('#file').val("");
//});
// Variable to store your files
var files;
// Add events
$('#file').on('change', prepareUpload2);

// Grab the files and set them to our variable
function prepareUpload2(event)
{
  files = event.target.files;
}
$('form#fileImportSalaryRange').on('submit', uploadFiles);

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
		url:restfulURL+"/"+serviceName+"/public/salary_structure/import",
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
						
				callFlashSlide("Import Salary Range Successfully");
				$("body").mLoading('hide');
				$('#ModalImport').modal('hide');
				getDetailFn();
			}else{
				validateFileFn(data['errors']);
				$("body").mLoading('hide');
			
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
 
 
 var split = function(id){
	 
     return id.replace(".","__");;
 }
 
//-------- findOne
 var findOneFn = function(id) {
	 var id = id.split("-");
     id = id[1]
     gUpdateYearId = id.split("__")[0];
     gUpdateLevelId = id.split("__")[1];
     gUpdateStep = id.split("__")[2]+"."+id.split("__")[3];
     
 		$("#from_year").val($("#year-"+id).text());
		$("#from_level").val($("#level-"+id).text());
		$("#from_step").val($("#step-"+id).text());
		$("#from_salary").val($("#salary-"+id).text());		
		
		$("#btnSalarySubmit").click(function(){
			updateFn(gUpdateYearId, gUpdateLevelId, gUpdateStep);
			return false;
		});
 };
 //--------- findOne
 var updateFn = function(year, level, step){
	 $.ajax({
			url:restfulURL+"/"+serviceName+"/public/salary_structure/update",
			type : "PATCH",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			data : {
				"appraisal_year": year,
				"level_id": level,
				"step": step,
				"s_amount":$("#from_salary").val()	
			},	
			success : function(data) {

				if (data['status'] == "200") {
					clearFn();
					$('#ModalEdit').modal('hide');
					callFlashSlide("Update Successfully.");
					getDetailFn();
				}else if (data['status'] == "400") {
					
					validationFn(data);
				}
			}
	 })
 };
 var clearFn = function() {
				
		$("#from_year").val("");
		$("#from_level").val("");
		$("#from_step").val("");
		$("#from_salary").val("");
		$('#file').val("");
 };
 //Check Validation Start
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
 	
 	callFlashSlideInModal(validate,"#information2","error");
 	//callFlashSlideInModal(validate);
 };
 
//Check Validation Edd
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
 	});
 	callFlashSlideInModal(validateFile,"#informationFile","error");
 }
