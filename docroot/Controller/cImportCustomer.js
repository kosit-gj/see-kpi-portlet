
//Global variable
var galbalDataCustomer=[];
//IP Server : 171.96.201.146


var tempCusId ="";
var tempCusName ="";
var pageNumberDefault=1;
var restfulPathCus = restfulURL + "/" + serviceName + "/public/customer";
var restfulPathDropDownCusType = restfulPathCus + "/list_cus_type";
var restfulPathDropDownCusIndustry = restfulPathCus + "/list_industry";
var restfulPathCusAutocomplete = restfulPathCus + "/auto_cus";
var restfulPathCusImportFile = restfulPathCus + "/import";
var restfulPathCusImportFile = restfulPathCus + "/import";

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
	

	
	$("#from_customer_code").val("");
	$("#from_customer_name").val("");
	$("#from_customer_type").val("");
	$("#from_position_code_1").val("");
	$("#from_position_code_2").val("");
	$("#from_position_code_3").val("");
	$("#from_position_code_1").hide();
	$("#from_position_code_2").hide();
	$("#from_position_code_3").hide();
	$("#from_position_code_1").prop('disabled', true);
	$("#from_position_code_2").prop('disabled', true);
	$("#from_position_code_3").prop('disabled', true);
	$("#from_industry_class").val("");
		
	
	
	$(".btnModalClose").click();
	
}
//--------  Clear End

//--------  GetData Start
var getDataFn = function(page,rpp){
	//alert("Page : "+page+" - Rpp : "+rpp);

	var cusType= $("#param_customer_type").val();
	var indusClsss= $("#param_industry_class").val();
	var cusId= $("#param_customer_id").val();
	$.ajax({
		url : restfulPathCus,
		type : "get",
		dataType : "json",
		data:{
			"page":page,"rpp":rpp,
			"customer_type":cusType,
			"industry_class":indusClsss,
			"customer_id":cusId,
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success : function(data) {

			listCustomerFn(data['data']);
			//total
			galbalDataCustomer=data;
			paginationSetUpFn(galbalDataCustomer['current_page'],galbalDataCustomer['last_page'],galbalDataCustomer['last_page']);
		}
	});
	
	
};
//--------  GetData End

// -------- Search Start
var searchAdvanceFn = function (cus_type,cus_indus,cus_id) {
	//embed parameter start
	
	var htmlParam="";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_customer_type' name='param_customer_type' value='"+cus_type+"'>";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_industry_class' name='param_industry_class' value='"+cus_indus+"'>";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_customer_id' name='param_customer_id' value='"+cus_id+"'>";
	$(".param_Embed").remove();
	$("body").append(htmlParam);

	getDataFn(pageNumberDefault,$("#rpp").val());
	
}
// -------- Search End

// -------- findOne
var findOneFn = function(id) {
	var count = 1
	$.ajax({
		url:restfulPathCus+"/"+id,
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {		
			$("#from_customer_code").val(data['customer_code']);
			$("#from_customer_name").val(data['customer_name']);
			$("#from_customer_type").val(data['customer_type']);
			
			if(data['customer_position'] != undefined && data['customer_position'] != null && data['customer_position'] != ""){
				$.each(data['customer_position'],function(index,indexEntry) {
					$("#from_position_code_"+count).val(indexEntry['position_code']);
					$("#from_position_code_"+count).show();
					count++;
				});
			}else{
				$("#from_position_code_1").val("");
				$("#from_position_code_1").show();
			}
			$("#from_industry_class").val(data['industry_class']);
			$("#from_checkboxIs_active").prop('checked', (data['is_active'] == 1 ? true:false));;

		}
	});
};
//--------- findOne


// --------  ListData  Start

var listCustomerFn = function(data) {
	//alert("listCustomerFn");
	var htmlTable = "";

	$.each(data,function(index,indexEntry) {
		

		htmlTable += "<tr class='rowSearch'>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ indexEntry["customer_code"]+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ indexEntry["customer_name"]+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ indexEntry["customer_type"]+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ notNullTextFn(indexEntry["industry_class"])+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\"> <div align='center'><input type='checkbox' "+ (indexEntry["is_active"]=="1" ? "checked" : "")+ " disabled></div> </td>";
		htmlTable += "<td id=\"objectCenter\" style=\"vertical-align: middle;\"><button id="+indexEntry["customer_id"]+" data-target=#ModalViewCustomer data-toggle='modal' data-backdrop='"+setModalPopup[0]+"' data-keyboard='"+setModalPopup[1]+"' class='btn btn-primary btn-xs view'><i class='fa fa-eye' aria-hidden='true'></i></button></td>";

		htmlTable += "</tr>";
	});


	$("#listCustomer").html(htmlTable);

	
	//function popover
	//$(".popover-edit-del").popover(setPopoverDisplay);
	
	$("#tableCustomer").off("click",".view");
	$("#tableCustomer").on("click",".view",function(){
		
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
  
	

	// ------------------- Customer -------------------
	$(".sr-only").hide();
	//$("#drop_down_list_from_appraisal_level").html(dropDownListAppraisalLevel("","f_app_lv"));
	$("#search_customer_type").html(generateDropDownList(restfulPathDropDownCusType,"GET",{},"All Customer Type"));
	$("#search_industry_class").html(generateDropDownList(restfulPathDropDownCusIndustry,"GET",{},"All Industry Classification"));
	
	$("#countPaginationTop").val( $("#countPaginationTop option:first-child").val());
	$("#countPaginationBottom").val( $("#countPaginationBottom option:first-child").val());
	$(".app_url_hidden").show();
	$("#btn_search_advance").click(function(){
		searchAdvanceFn($("#search_customer_type").val(),$("#search_industry_class").val(),$("#search_customer_id").val());
		$("#cus_list_content").show();
		return false;
	});
	//$("#btn_search_advance").click();
	
	
	$(".btnCancle").click(function() {
		clearFn();
	});


	
	//Autocomplete Search Start
	$("#search_customer_name").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulPathCusAutocomplete,
				 type:"get",
				 dataType:"json",
				 headers:{Authorization:"Bearer "+tokenID.token},
				 data:{"customer_name":request.term,"customer_type":"","industry_class":""},
				 //async:false,
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					  
						response($.map(data, function (item) {
                            return {
                                label: item.customer_name+" ("+item.customer_code+")",
                                value: item.customer_name+" ("+item.customer_code+")",
                                cus_id:item.customer_id
                            };
                        }));
					
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        },
		select:function(event, ui) {
			$("#search_customer_name").val(ui.item.value);
            $("#search_customer_id").val(ui.item.cus_id);
            tempCusName = ui.item.value;
            tempCusId=ui.item.cus_id;
            return false;
        },change: function(e, ui) {  
			if ($("#search_customer_name").val() == tempCusName) {
				$("#search_customer_id").val(tempCusId);
			} else if (ui.item != null) {
				$("#search_customer_id").val(ui.item.cus_id);
			} else {
				$("#search_customer_id").val("");
			}
        	
         }
    });
   
	//Autocomplete Search End
	
	$("#exportToExcel").click(function(){
		$("form#formExportToExcel").attr("action",$("#url_portlet").val()+"/file/import_customer.csv");
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
	$('form#fileImportCustomer').on('submit', uploadFiles);

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
			url:restfulPathCusImportFile,
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
							
					callFlashSlide("Import Customer Successfully");
					getDataFn($(".pagination .active").attr( "data-lp" ),$("#rpp").val());
					$("body").mLoading('hide');
					$('#ModalImport').modal('hide');
					
					
				}else{
					validateFileFn(data['errors']);
					getDataFn($(".pagination .active").attr( "data-lp" ),$("#rpp").val());
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
	// ------------------- Customer END -------------------
	

});