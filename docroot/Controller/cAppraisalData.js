//Global variable
var galbalDataAppData=[];
var tempAppItemName="";
var tempAppItemId="";
var tempEmpName="";
var tempEmpId="";  
var galbalDataTemp = [];
var pageNumberDefault=1;
var restfulPathAppData="/"+serviceName+"/public/appraisal_data";
 
var restfulPathDropDownStructure=restfulPathAppData+"/structure_list";
var restfulPathDropDownAppraisalLevel=restfulPathAppData+"/al_list";
var restfulPathDropDownAppraisalType=restfulPathAppData+"/appraisal_type_list";
var restfulPathDropDownPeriod=restfulPathAppData+"/period_list";


var restfulPathAutocompleteAppraisalItem=restfulPathAppData+"/auto_appraisal_item";
var restfulPathAutocompleteEmployeeName=restfulPathAppData+"/auto_emp_name";


//------------------- GetData FN Start ---------------------
var getDataFn = function(page,rpp){
	var structure= $("#param_structure").val();
	var app_lv= $("#param_app_lv").val();
	var app_type= $("#param_app_type").val();
	var app_item= $("#param_app_item").val();
	var period= $("#param_period").val();
	var emp_code= $("#param_emp_code").val();
	$.ajax({
		url : restfulURL+restfulPathAppData,
		type : "get",
		dataType : "json",
		data:{"page":page,"rpp":rpp,
			
			"structure_id":structure,
			"level_id":app_lv,
			"appraisal_type_id":app_type,
			"item_id":app_item,
			"period_id":period,
			"emp_id":emp_code
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,// w8 data 
		success : function(data) {
			
			listAppraisalDataFn(data['data']);
			//total
			galbalDataAppData=data;
			paginationSetUpFn(galbalDataAppData['current_page'],galbalDataAppData['last_page'],galbalDataAppData['last_page']);
		}
	});
	
	
};

//------------------- GetData FN END ---------------------

//------------------- Search Appraisal Data FN Start ---------------------

var searchAdvanceFn = function (Structure,AppLv,AppItem,Period,EmpName,app_type) {
	//embed parameter start
	
	var htmlParam="";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_structure' name='param_structure' value='"+Structure+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_lv' name='param_app_lv' value='"+AppLv+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_type' name='param_app_type' value='"+app_type+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_item' name='param_app_item' value='"+AppItem+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_period' name='param_period' value='"+Period+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_emp_code' name='param_emp_code' value='"+EmpName+"'>";
	$(".paramEmbed").remove();
	$("body").append(htmlParam);
	//embed parameter end
	getDataFn(pageNumberDefault,$("#rpp").val());
	
}

//------------------- Search Appraisal Data FN END ---------------------

//------------------- List Appraisal Data FN Start ---------------------

var listAppraisalDataFn = function (data) {
	var htmlTable = "";
	$.each(data,function(index,indexEntry) {
		
		htmlTable += "<tr class='rowSearch'>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["appraisal_period_desc"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["structure_name"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["item_name"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["emp_code"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["emp_name"]+ "</td>";
		htmlTable += "<td class='columnSearch' style='text-align: right;padding-right: 10px;'>"+ addCommas(parseFloat(notNullFn(indexEntry["actual_value"])).toFixed(2))+ "</td>";
		htmlTable += "</tr>";//parseFloat().toLocaleString()
	});
	$("#listAppraisalData").html(htmlTable);
}

//------------------- List Appraisal Data FN END ---------------------
var addCommas =  function(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
//-------------------  Drop Down List Structure FN Strart ---------------------

var dropDownListStructure = function(){
	var html="";
	
	
	html+="<select data-placement='top' id=\"structure\" class=\"input span12 m-b-n\" data-toggle=\"tooltip\" title=\"Structure\" name=\"structure\">";
	html+="<option  selected value=''>All Structure</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownStructure,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){

					html+="<option  value="+indexEntry["structure_id"]+">"+indexEntry["structure_name"]+"</option>";	
		
			});	

		}
	});	
	html+="</select>";
	return html;
};
//-------------------  Drop Down List Structure FN END ---------------------


//-------------------  Drop Down List Appraisal Level FN Strart ---------------------

var dropDownListAppraisalLevel = function(){
	var html="";
	
	
	html+="<select data-placement='top' id=\"app_lv\" class=\"input span12 m-b-n\" data-toggle=\"tooltip\" title=\"Level\" name=\"app_lv\">";
	html+="<option  selected value=''>All Level</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownAppraisalLevel ,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){

					html+="<option  value="+indexEntry["level_id"]+">"+indexEntry["appraisal_level_name"]+"</option>";	
		
			});	

		}
	});	
	html+="</select>";
	return html;
};
//-------------------  Drop Down List Appraisal Level FN END ---------------------

//-------------------  Drop Down List Appraisal Type FN Strart ---------------------

var dropDownListAppraisalType = function(){
	var html="";
	
	
	html+="<select data-placement='top'  id=\"app_type\" class=\"input span12 m-b-n\" data-toggle=\"tooltip\" title=\"Entity Type\" name=\"app_type\">";
	
	$.ajax ({
		url:restfulURL+restfulPathDropDownAppraisalType ,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){

					html+="<option  value="+indexEntry["appraisal_type_id"]+">"+indexEntry["appraisal_type_name"]+"</option>";	
		
			});	

		}
	});	
	html+="</select>";
	return html;
};
//-------------------  Drop Down List Appraisal Type FN END ---------------------

//-------------------  Drop Down List Period FN Strart ---------------------

var dropDownListPeriod = function(){
	var html="";
	
	
	html+="<select data-placement='top' data-placement='top' id=\"period\" class=\"input span12 m-b-n\" data-toggle=\"tooltip\" title=\"Period\" name=\"period\">";
	//html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownPeriod,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){

					html+="<option  value="+indexEntry["period_id"]+">"+indexEntry["appraisal_period_desc"]+"</option>";	
		
			});	

		}
	});	
	html+="</select>";
	return html;
};
//-------------------  Drop Down List Appraisal Item FN END ---------------------

var listErrorFn =function(data){
	var errorData="";
	
	$.each(data,function(index,indexEntry){	
		if(data[index]['employee_code']!= undefined || data[index]['employee_code']==null){
			if(data[index]['employee_code']== null){//The employee code field is null
				errorData+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> Employee Code : null <i class='fa fa-level-down'></i><br>";
			}else{
				errorData+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> Employee Code : "+data[index]['employee_code']+" <i class='fa fa-level-down'></i><br>";}
		}
		if(typeof data[index]['errors'] != 'object'){
			errorData+="<font color='red'>*</font> "+data[index]['errors']+"<br>";
		}
		if(data[index]['errors']['employee_code']!=undefined){
			errorData+="<font color='red'>*</font> "+data[index]['errors']['employee_code']+"<br>";
		}
		if(data[index]['errors']['period_id']!=undefined){
			errorData+="<font color='red'>*</font> "+data[index]['errors']['period_id']+"<br>";
		}
		if(data[index]['errors']['item_id']!=undefined){
			errorData+="<font color='red'>*</font> "+data[index]['errors']['item_id']+"<br>";
		}
		if(data[index]['errors']['data_value']!=undefined){
			errorData+="<font color='red'>*</font> "+data[index]['errors']['data_value']+"<br>";
		}
		
		
	});
	//alert(errorData);
	callFlashSlideInModal(errorData,"#information","error");
	//callFlashSlideInModal(errorData);
	
	/*return errorData;*/
}
$(document).ready(function() {
	// -------------------  Appraisal Data  ---------------------
	var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==false){
	 		return false;
	 	}
	 }

	$(".sr-only").hide();
	$("#drop_down_list_structure").html(dropDownListStructure());
	$("#drop_down_list_appraisal_level").html(dropDownListAppraisalLevel());
	$("#drop_down_list_appraisal_type").html(dropDownListAppraisalType());
	$("#drop_down_list_period").html(dropDownListPeriod());
	
	$("#app_item").val("");
	$("#emp_name").val("");
	$("#app_item_id").val("");
	$("#emp_name_id").val("");
	
	$("#countPaginationTop").val( $("#countPaginationTop option:first-child").val());
	$("#countPaginationBottom").val( $("#countPaginationBottom option:first-child").val());
	$(".app_url_hidden").show();
	$("#btnSearchAdvance").click(function(){
		
		searchAdvanceFn(
				$("#structure").val(),
				$("#app_lv").val(),
				$("#app_item_id").val(),
				$("#period").val(),
				$("#emp_name_id").val()
				,$("#app_type").val()
		);
				
		$("#appraisal_data_list_content").show();
		return false;
	});
	//$("#btnSearchAdvance").click();
	
	
	//Autocomplete Search Position Start
	$("#app_item").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+restfulPathAutocompleteAppraisalItem,
				 type:"post",
				 dataType:"json",
				 data:{
					 "structure_id":$("#structure").val(),
					 "level_id":$("#app_lv").val(),
					 "item_name":request.term},
				 async:false,
				 headers:{Authorization:"Bearer "+tokenID.token},
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					  
						response($.map(data, function (item) {
                            return {
                                label: item.item_name,
                                value: item.item_name,
                                item_id : item.item_id
                                
                            };
                        }));
					
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        },
		select:function(event, ui) {
			$("#app_item").val(ui.item.value);
            $("#app_item_id").val(ui.item.item_id);
            tempAppItemName = ui.item.label;
            tempAppItemId=ui.item.item_id;
            return false;
        },change: function(e, ui) {  
			if ($("#app_item").val() == tempAppItemName) {
				$("#app_item_id").val(tempAppItemId);
			}  else if (ui.item != null){
				$("#app_item_id").val(ui.item.item_id);
			}else {
				$("#app_item_id").val("");
			}
         }
    });
	

   
	//Autocomplete Search Position End
	

  //Auto Complete Employee Name end
	
	$("#emp_name").autocomplete({
		
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+restfulPathAutocompleteEmployeeName,
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
	
	
    // -------------------  Appraisal Data END ---------------------	
	
	//#### Call Export User Function Start ####
	$("#exportToExcel").click(function(){
		var paramStructure= $("#structure").val();
		var paramAppLv= $("#app_lv").val();
		var paramAppType= $("#app_type").val();
		var paramAppItem= $("#app_item_id").val();
		var paramPeriod= $("#period").val();
		var paramEmpCode= $("#emp_name_id").val();
		
		
		var param="";
		param+="&structure_id="+paramStructure;
		param+="&level_id="+paramAppLv;
		param+="&appraisal_type_id="+paramAppType;
		param+="&item_id="+paramAppItem;
		param+="&period_id="+paramPeriod;
		param+="&emp_id="+paramEmpCode;
		//alert(restfulURL+restfulPathCdsResult+"/export?token="+tokenID.token+""+param);
		$("form#formExportToExcel").attr("action",restfulURL+restfulPathAppData+"/export?token="+tokenID.token+""+param);
		$("form#formExportToExcel").submit();
	});
    //#### Call Export User Function End ####	
	//FILE IMPORT MOBILE START
	$("#btn_import").click(function () {
		$('#file').val("");
		$(".btnModalClose").click();
		$(".dropify-clear").click();
	});
	
	// Variable to store your files
	var files2;
	// Add events
	$('#file').on('change', prepareUpload2);

	// Grab the files and set them to our variable
	function prepareUpload2(event)
	{
	  files = event.target.files;
	}
	$('form#fileAppraisalData').on('submit', uploadFiles);

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
			url:restfulURL+restfulPathAppData,
			type: 'POST',
			data: data,
			cache: false,
			dataType: 'json',
			processData: false, // Don't process the files
			contentType: false, // Set content type to false as jQuery will tell the server its a query string request
			headers:{Authorization:"Bearer "+tokenID.token},
			success: function(data, textStatus, jqXHR)
			{
				
				console.log(data);
				if(data['status']==200 && data['errors'].length==0){
							
					callFlashSlide("Import CDS Result Successfully");
					getDataFn($(".pagination .active").attr( "data-lp" ),$("#rpp").val());
					$('#file').val("");
					$("body").mLoading('hide');
					$('#ModalImport').modal('hide');
					
				}else{
					listErrorFn(data['errors']);
					getDataFn($(".pagination .active").attr( "data-lp" ),$("#rpp").val());
					$('#file').val("");
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
});