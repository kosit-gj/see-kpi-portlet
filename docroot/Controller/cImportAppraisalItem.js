//Global variable
var galbalDataCDSResult=[];
var golbalDataError=[];
var galbalDataTemp = [];
var pageNumberDefault=1;
var restfulPathCdsResult="/"+serviceName_IMPkpi;

var restfulPathDropDownStructure=restfulPathCdsResult+"/appraisal-structure/get";
var restfulPathDropDownTemplateName=restfulPathCdsResult+"/appraisal-template/get";
var restfulPathExportFile = restfulPathCdsResult+"/appraisal";
var restfulPathImportFile = restfulPathCdsResult+"/appraisal";


//-------------------  Drop Down List Appraisal Level FN Strart ---------------------

	var dropDownListStructure = function(){
		var html="";
		html+="<select data-placement='top' id=\"structure_id\" class=\"input span12 m-b-n\" data-toggle=\"tooltip\" title=\"Structure\" name=\"structure_id\">";
		$.ajax ({
			url:restfulURL_IMPkpi+restfulPathDropDownStructure,
			type:"get" ,
			dataType:"json" ,
			async:false,
			success:function(data){
					//galbalDqsRoleObj=data;
				$.each(data,function(index,indexEntry){
	
						html+="<option  value="+indexEntry["structure_id"]+">"+indexEntry["structure_name"]+"</option>";	
			
				});	
	
			}
		});	
		
		html+="</select>";
		return html;
	};
	
	var dropDownListTemplateName = function(){
		var html="";
		
		
		html+="<select data-placement='top' id=\"templatename_id\" class=\"input span12 m-b-n\" data-toggle=\"tooltip\" title=\"Template Name\" name=\"templatename_id\">";
		$.ajax ({
			url:restfulURL_IMPkpi+restfulPathDropDownTemplateName,
			type:"get" ,
			dataType:"json" ,
			async:false,
			success:function(data){
					html+="<option  value="+data[0]["master"]+">"+data[0]["master"]+"</option>";
					html+="<option  value="+data[1]["detail"]+">"+data[1]["detail"]+"</option>";
				/*$.each(data,function(index,indexEntry){
						html+="<option  value="+indexEntry["master"]+">"+indexEntry["detail"]+"</option>";	
			
				});*/	
	
			}
		});	
		html+="</select>";
		return html;
	};
	
	var getBrowserWidth = function(){
	    var wSearchAdvance = $('.cSearchAdvance').width()-4;
	    var wTarget = $('#drop_down_list_appraisal_type').width();
	    var wCalTarget = $('#drop_down_list_appraisal_type').width()*4+20;
	    var height = $('#drop_down_list_appraisal_type').height()+0.25;
	    
			if(window.innerWidth < 980){
				$("#txtEmpInput").css({"width":""});
				$("#txtEmpInput").css({"height":""});
			} else if(window.innerWidth < 1366){
				// Small Device
	    
				$("#txtEmpInput").width(wSearchAdvance-wCalTarget+wTarget);
				$("#txtEmpInput").css({"height":height});
			} else {
				// Large Device
				$("#txtEmpInput").width(wSearchAdvance-wCalTarget+wTarget);
				$("#txtEmpInput").css({"height":height});
		
			}
			//console.log(wSearchAdvance-wCalTarget+wTarget);
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
	$("#org_name").val("");
	$("#position").val("");
	$("#emp_name").val("");
	$("#org_id").val("");
	$("#position_id").val("");
	$("#emp_name_id").val("");
	
	$(".sr-only").hide();
	$("#drop_down_list_appraisal_level").html(dropDownListStructure());
	$("#drop_down_list_organization").html(dropDownListTemplateName());
	$("#countPaginationTop").val( $("#countPaginationTop option:first-child").val());
	$("#countPaginationBottom").val( $("#countPaginationBottom option:first-child").val());

	/*$("#app_lv").change(function(){
		$("#drop_down_list_organization").html(dropDownListOrganization());
	});*/
	$(".app_url_hidden").show();
	getBrowserWidth();

	//Autocomplete Search Position Start
	$("#position").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL_IMPkpi+restfulPathPositionAutocomplete,
				 type:"post",
				 dataType:"json",
				 data:{
					 "position_name":request.term
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
			$("#position").val(ui.item.value);
            $("#position_id").val(ui.item.position_id);
            galbalDataTemp['position_name'] = ui.item.label;
            galbalDataTemp['position_id']=ui.item.position_id;
            return false;
        },change: function(e, ui) {  

 
			if ($("#position").val() == galbalDataTemp['position_name']) {
				$("#position_id").val(galbalDataTemp['position_id']);
			}  else if (ui.item != null){
				$("#position_id").val(ui.item.position_id);
			}else {
				$("#position_id").val("");
			}
         }
    });
	

   
	//Autocomplete Search Position End
	

  //Auto Complete Employee Name end
	
	$("#emp_name").autocomplete({
		
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL_IMPkpi+restfulPathEmployeeAutocomplete,
				 type:"post",
				 dataType:"json",
				 data:{
					 "emp_name":request.term},
				//async:false,
				 headers:{Authorization:"Bearer "+tokenID.token},
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					  
						response($.map(data, function (item) {
                            return {
                                label: item.emp_name,
                                value: item.emp_name,
                                emp_id: item.emp_id
                            };
                        }));
					
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        },
		select:function(event, ui) {
			$("#emp_name").val(ui.item.value);
            $("#emp_name_id").val(ui.item.emp_id);
            galbalDataTemp['emp_name'] = ui.item.value;
            galbalDataTemp['emp_id']=ui.item.emp_id;
            return false;
        },change: function(e, ui) {  
			if ($("#emp_name").val() == galbalDataTemp['emp_name']) {
				$("#emp_name_id").val(galbalDataTemp['emp_id']);
			} else if (ui.item != null){
				$("#emp_name_id").val(ui.item.emp_id);
			} else {
				$("#emp_name_id").val("");
				
			}
        	
         }
    });
    
  //Auto Complete Employee Name end
	
	$("#app_type").change(function(){
		if($("#app_type").val() == "2"){

			$("#position").removeAttr('disabled');
			$("#emp_name").removeAttr('disabled');
		}else if($("#app_type").val() == "1"){
			$("#position").attr("disabled", 'disabled');
			$("#emp_name").attr("disabled", 'disabled');
			$("#position").val("");
			$("#position_id").val("");
			$("#emp_name").val("");
			$("#emp_name_id").val("");
			
		}
	});
	$("#app_type").change();
	
	
	
	//#### Call Export User Function Start ####
	$("#exportToExcelImportAppraisalItem").click(function(){
		
		var structure = $("#structure_id option:selected").text().toLowerCase().replace(' ','-');
		var templatename = $("#templatename_id").val().toLowerCase();

		window.location = restfulURL_IMPkpi+restfulPathExportFile+"/"+templatename+"/export?structure_id="+$("#structure_id").val();
		

	});
    //#### Call Export User Function End ####
	
	//FILE IMPORT MOBILE START
	$("#btn_import").click(function () {
		$('#file').val("");
		$(".btnModalClose").click();
		$(".dropify-clear").click();
		$("#structure_id_import").val($("#structure_id").val())
		$("#alert_import").removeClass();
		$("#alert_import").html("");
	});

//	$("form#fileImportCdsResult").submit(function(e) {
//	    e.preventDefault();    
//	    var formData = new FormData(this);
//		var structure = $("#structure_id option:selected").text().toLowerCase().replace(' ','-');
//		var templatename = $("#templatename_id").val().toLowerCase();
//	     $.ajax({
//	        url: restfulURL_IMPkpi+restfulPathImportFile+structure+"/"+templatename+"/import",
//	        type: 'POST',
//	        data: formData,
//	        success: function (data) {
//	        	console.log(data.result_status)
//	        	if (data.result_status == 0) {
//	        		$("#alert_import").removeClass().addClass( "alert alert-danger");
//	           		$("#alert_import").html("<h5><strong>" + data.code + " ! </strong> " + data.msg + "</h5>");
//	        	}else{
//	        		$("#alert_import").removeClass().addClass( "alert alert-success");
//	           		$("#alert_import").html("<h5><strong>" + data.code + " ! </strong> " + data.msg + "</h5>");
//	        	}
//
//	        },
//	        cache: false,
//	        contentType: false,
//	        processData: false
//	    });
//	});
		

//	$("#importFileMobile").click(function () {
//		$('#file').val("");
//	});
	// Variable to store your files
	var files;
	// Add events
	$('#file').on('change', prepareUpload2);

	// Grab the files and set them to our variable
	function prepareUpload2(event)
	{
	  files = event.target.files;
	}
	$('form#fileImportAppraisalItem').on('submit', uploadFiles);

	// Catch the form submit and upload the files
	function uploadFiles(event)
	{
		
		event.stopPropagation(); // Stop stuff happening
		event.preventDefault(); // Totally stop stuff happening

		// START A LOADING SPINNER HERE

		var structure = $("#structure_id option:selected").text().toLowerCase().replace(' ','-');
		var templatename = $("#templatename_id").val().toLowerCase();
		// Create a formdata object and add the files
		var data = new FormData();
		$.each(files, function(key, value)
		{
			data.append(key, value);
		});
		data.append("structure_id",$("#structure_id").val());
		data.append("user_id",$("#user_id").val());
		$("body").mLoading();
		
		$.ajax({
			url: restfulURL_IMPkpi+restfulPathImportFile+"/"+templatename+"/import",
			type: 'POST',
			data: data,
			cache: false,
			processData: false, // Don't process the files
			contentType: false, // Set content type to false as jQuery will tell the server its a query string request
			success: function(data)
			{
				if (data.result_status == 0) {
	        		$("#alert_import").removeClass().addClass( "alert alert-danger");
	           		$("#alert_import").html("<h5><strong>" + data.code + " ! </strong> " + data.msg + "</h5>");
	        	}else{
	        		$("#alert_import").removeClass().addClass( "alert alert-success");
	           		$("#alert_import").html("<h5><strong>" + data.code + " ! </strong> " + data.msg + "</h5>");
	        	}
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
         	 default: 'Glissez-d�posez un fichier ici ou cliquez',
             replace: 'Glissez-d�posez un fichier ou cliquez pour remplacer',
             remove:  'Supprimer',
             error:   'D�sol�, le fichier trop volumineux'
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
 	
 	$(window).on('resize',function(){
 		getBrowserWidth();
 	});
 	
});

