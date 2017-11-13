
//Global variable
var galbalDataCDS=[];
//IP Server : 171.96.201.146


var tempCdsId ="";
var tempCdsName ="";
var pageNumberDefault=1;
var restfulPathCDS="/"+serviceName+"/public/cds";
var restfulPathDropDownAppraisalLevel="/"+serviceName+"/public/cds/al_list";
var restfulPathDropDownConnection="/"+serviceName+"/public/cds/connection_list";
var restfulPathAutocomplete="/"+serviceName+"/public/cds/auto_cds";


 


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

var validationSqlFn = function (data) {
	
	//alert(data);
	var validate ="";
	if( data instanceof Array ){
		for ( var obj in data) {
			if (data.hasOwnProperty(obj)) {
				for ( var prop in data[obj]) {
					if (data[obj].hasOwnProperty(prop)) {
						validate+="<font color='red'>*</font> "+prop + ':' + data[obj][prop]+"<br>";
						//console.log(prop + ':' + data[obj][prop]);
						
					}
				}
				
			}
		}
	}else{
		if(data !=undefined){
			validate+="<font color='red'>*</font> "+data+"<br>";
		}		
	}
	callFlashSlideInModal(validate,"#information","error");
}

	
	
	
// --------  Clear Start 
var clearFn = function() {
	
	$("#modalTitleRole").html("Common Data Set");
	$("#modalDescription").html("Common Data Set");
	$("#f_cds_name").val("");
	$("#f_cds_description").val("");
	$("#txt_sql").val("");
	$("#table_Sql").html("");
	$("#table_Sql").hide();
	$("#txt_sample_data").removeAttr("disabled");
	
	$("#f_connection").removeAttr("disabled");
	$("#btn_Execute").removeAttr("disabled");
	
	$("#checkbox_is_sql").prop("checked",false);
	$("#checkbox_is_active").prop("checked",false);
	
	$(".btnModalClose").click();
	
	
	$("#action").val("add");
	$("#btnSubmit").val("Add");

}
//--------  Clear End

//--------  GetData Start
var getDataFn = function(page,rpp){
	//alert("Page : "+page+" - Rpp : "+rpp);

	var CdsName= $("#param_CDS_Id").val();
	var isSql= $("#param_is_sql").val();
	$.ajax({
		url : restfulURL+restfulPathCDS,
		type : "get",
		dataType : "json",
		data:{"page":page,"rpp":rpp,
			"cds_id":CdsName,
			"is_sql":isSql},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,// w8 data 
		success : function(data) {
			//alert("Get Data -->  page : " +page+" rpp :"+rpp);
			listCommonDataSetFn(data['data']);
			//total
			galbalDataCDS=data;
			paginationSetUpFn(galbalDataCDS['current_page'],galbalDataCDS['last_page'],galbalDataCDS['last_page']);
		}
	});
	
	
};
//--------  GetData End

// -------- Search Start
var searchAdvanceFn = function (cdsId,issql) {
	//embed parameter start
	
	var htmlParam="";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_CDS_Id' name='param_CDS_Id' value='"+cdsId+"'>";
	htmlParam+="<input type='hidden' class='param_Embed' id='param_is_sql' name='param_is_sql' value='"+issql+"'>";
	$(".param_Embed").remove();
	$("body").append(htmlParam);
	//embed parameter end
	//alert("search Data --> page : 1 rpp :"+$("#rpp").val());
	getDataFn(pageNumberDefault,$("#rpp").val());
	
}
// -------- Search End

// -------- findOne
var findOneFn = function(id) {
	$.ajax({
		url:restfulURL+restfulPathCDS+"/"+id,
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {		
	
			$("#f_cds_name").val(data['cds_name']);
			$("#f_cds_description").val(data['cds_desc']);
			
			//Appraisal Level
			//$("#f_app_lv").val(data['appraisal_level_id']);
			//$("#drop_down_list_from_appraisal_level").html(dropDownListAppraisalLevel(data['appraisal_level_id'],"f_app_lv"));
			//Connection
			
			//$("#f_connection").val(data['connection_id']);
			$("#drop_down_list_connection").html(dropDownListConnection(data['connection_id']));
			
			//IsSQL
			if(data['is_sql']==1){
				$('#checkbox_is_sql').prop('checked', true);
				$("#btn_Execute").removeAttr("disabled");
				$("#f_connection").removeAttr("disabled");
			}else{
				$('#checkbox_is_sql').prop('checked', false);
				$("#btn_Execute").attr("disabled","disabled");
				$("#f_connection").attr("disabled","disabled");
			}
			
			//IsAction
			if(data['is_active']==1){
				$('#checkbox_is_active').prop('checked', true);
			}else{
				$('#checkbox_is_active').prop('checked', false);
			}
			
			$("#txt_sql").val(data['cds_sql']);
			//$("#txt_sample_data").val(data['txtSampleData']);
			
			


		}
	});
};
//--------- findOne


// --------  ListData  Start

var listCommonDataSetFn = function(data) {
	//alert("listCommonDataSetFn");
	var htmlTable = "";
	var IsSQL ="";
	var IsActive ="";
	$.each(data,function(index,indexEntry) {
		
		//console.log(indexEntry["cdsName"]+indexEntry["appraisalLevel"]+indexEntry["isSql"]+indexEntry["isActive"]);
		if (indexEntry["is_sql"]== "1"){
			//IsSQL = "<div class=\"checkbox m-n \"><input disabled value=\"1\" type=\"checkbox\" checked><label> </label></div>";
			IsSQL ="<input disabled type=\"checkbox\"  value=\"1\" checked>";
		}else if (indexEntry["is_sql"]== "0"){
			//IsSQL = "<div class=\"checkbox m-n \"><input disabled value=\"0\" type=\"checkbox\" ><label> </label></div>";
			IsSQL ="<input disabled type=\"checkbox\"  value=\"0\">";
		}
		if (indexEntry["is_active"]=="1"){
			//IsActive = "<div class=\"checkbox m-n \"><input disabled value=\"1\" type=\"checkbox\" checked><label> </label></div>";
			
			IsActive ="<input disabled type=\"checkbox\"  value=\"1\" checked>";
		}else if (indexEntry["is_active"]=="0"){
			//IsActive = "<div class=\"checkbox m-n \"><input disabled value=\"0\" type=\"checkbox\" ><label> </label></div>";
			IsActive ="<input disabled type=\"checkbox\"  value=\"0\" >";
		}
		htmlTable += "<tr class='rowSearch'>";
//		htmlTable += "<td id=\"objectCenter\" class='objectCenter 'style=\"\">"+"<input  style=\"margin-bottom: 3px;\"type=\"checkbox\"  class='selectCdsCheckbox' id=kpiCheckbox-"+indexEntry["cds_id"]+" value=\""+indexEntry["cds_id"]+"\">"+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ indexEntry["cds_name"]+ "</td>";
//		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ indexEntry["appraisal_level_name"]+ "</td>";
		htmlTable += "<td id=\"objectCenter\" >"+IsSQL+"</td>";
		htmlTable += "<td id=\"objectCenter\" >"+IsActive+"</td>";
		
		htmlTable += "<td id=\"objectCenter\" style=\"vertical-align: middle;\"><i class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-trigger=\"focus\" tabindex=\""+index+"\" data-content=\"<button class='btn btn-warning btn-xs edit' id="+ indexEntry["cds_id"]+ " data-target=#ModalCommonData data-toggle='modal'>Edit</button>&nbsp;" ;
		htmlTable += "<button id="+indexEntry["cds_id"]+" class='btn btn-danger btn-xs del'>Delete</button>\"></i></td>";
		htmlTable += "</tr>";
	});
	//alert("ผ่าน");
	$("#listCommonDataSet").html(htmlTable);
//	$("#tableCommonDataSet_wrapper").click(function(){
//		$(".popover-edit-del").popover();
//	});
	
	//function popover
	$(".popover-edit-del").popover();
	
	$("#tableCommonDataSet").off("click",".popover-edit-del");
	$("#tableCommonDataSet").on("click",".popover-edit-del",function(){
		
			$(".edit").on("click",function() {
			clearFn();
			$("#modalTitleRole").html("Common Data Set");
			$("#modalDescription").html("Common Data Set");
			
			$(this).parent().parent().parent().children().click();
			//alert($(this).parent().parent().parent().children().click());
			$("#btnAddAnother").hide();
			//$("#txt_sample_data").attr("disabled","disabled"); 
			
			findOneFn(this.id);
			//alert($("#checkbox_is_sql:checked").is(":checked"));
			
			$("#id").val(this.id);
			$("#action").val("edit");
			$("#btnSubmit").val("Edit");		
			
			
		});
		
		
		$(".del").on("click",function(){
			var id = this.id;
			$(this).parent().parent().parent().children().click();
			 
			$("#confrimModal").modal();
			$(document).off("click","#btnConfirmOK");
			$(document).on("click","#btnConfirmOK",function(){
			
				$.ajax({
					 url:restfulURL+restfulPathCDS+"/"+id,
					 type : "delete",
					 dataType:"json",
					 headers:{Authorization:"Bearer "+tokenID.token},
					success:function(data){    
				    	 
					     if(data['status']==200){
					    	 
					       callFlashSlide("Delete Successfully.");
					       getDataFn($("#pageNumber").val(),$("#rpp").val());
					       clearFn();
					       $("#confrimModal").modal('hide');
					       
					     }else if (data['status'] == "400"){
					    	 callFlashSlideInModal(data['data'],"#inform_on_confirm","error");
					    	}
					 }
				});
				
			});
			
		});	
		
	});
	
	
}

// --------  ListData  End

// -------- Update Start
var updateFn = function () {

	
	var IsSQL = "";
	var IsAction="";
	
	if($("#checkbox_is_sql:checked").is(":checked")){
		checkboxIsSQL="1";
	}else{
		checkboxIsSQL="0";
	}
	if($("#checkbox_is_active:checked").is(":checked")){
		checkboxIsActive="1";
	}else{
		checkboxIsActive="0";
	}
	
	$.ajax({
		url:restfulURL+restfulPathCDS+"/"+$("#id").val(),
		type : "PATCH",
		dataType : "json",
		data : {
			"cds_name":$("#f_cds_name").val(),
			"cds_desc":$("#f_cds_description").val(),
			//"appraisal_level_id":$("#f_app_lv").val(),
			"connection_id":$("#f_connection").val(),
			"is_sql":checkboxIsSQL ,
			"cds_sql":$("#txt_sql").val(),
			"is_active":checkboxIsActive
		},	
		//headers:{Authorization:"Bearer "+tokenID.token},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			if (data['status'] == "200") {
				getDataFn($("#pageNumber").val(),$("#rpp").val());
				clearFn();
				$('#ModalCommonData').modal('hide');
				callFlashSlide("Update Successfully.");
				
			}else if (data['status'] == "400") {
				//alert("Error ?");
				validationFn(data);
			}
		}
	});
	return false;
}
// -------- Update End


// --------  Insert  Start
var insertFn = function (param) {
	 var checkboxIsSQL = "";
	 var checkboxIsActive = "";
	 
	if($("#checkbox_is_sql:checked").is(":checked")){
		checkboxIsSQL="1";
	}else{
		checkboxIsSQL="0";
	}
	if($("#checkbox_is_active:checked").is(":checked")){
		checkboxIsActive="1";
	}else{
		checkboxIsActive="0";
	}
	
	$.ajax({
		url:restfulURL+restfulPathCDS,
		type : "POST",
		dataType : "json",
		data : {
			"cds_name":$("#f_cds_name").val(),
			"cds_desc":$("#f_cds_description").val(),
			//"appraisal_level_id":$("#f_app_lv").val(),
			"connection_id":$("#f_connection").val(),
			"is_sql":checkboxIsSQL ,
			"cds_sql":$("#txt_sql").val(),
			"is_active":checkboxIsActive
		},	
		//headers:{Authorization:"Bearer "+tokenID.token},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			if (data['status'] == "200") {
				 
				   if(param !="saveAndAnother"){
					   //alert("!saveAndAnother" );
					   callFlashSlide("Insert Successfully.");
					   getDataFn($(".pagination .active").attr( "data-lp" ),$("#rpp").val());
					   clearFn();
				 	   $('#ModalCommonData').modal('hide');
					}else{
						//alert("saveAndAnother" );
						getDataFn($(".pagination .active").attr( "data-lp" ),$("#rpp").val());
						clearFn();
						$("#checkbox_is_sql").prop("checked",true);
						$("#checkbox_is_active").prop("checked",true);
						callFlashSlideInModal("Insert Data is Successfully.");
					}
			}else if (data['status'] == "400") {
				//alert("Error ?");
				validationFn(data);
			}  
				   
				   
			
		}
	});
	
	

	
}

//--------  Insert  End

// --------------- DropDownList Appraisal Level ----------------
var dropDownListAppraisalLevel = function(id,inputId){
	//id = f_app_lv
	//id = app_lv
	var html="";
	//html+="<select  style='cursor: pointer;' data-original-title='Appraisal Level' data-toggle=\"tooltip\" title=\"Appraisal Level\" data-placement='top' class=\"input span12 m-b-n\" id=\""+inputId+"\" name=\""+inputId+"\">";
	if(inputId == "app_lv"){
		html+="<select  style='cursor: pointer;' data-original-title='Appraisal Level' data-toggle=\"tooltip\" title=\"Appraisal Level\" data-placement='top' class=\"input span12 m-b-n\" id=\""+inputId+"\" name=\""+inputId+"\">";
		html+="<option selected value=''>All Appraisal Level</option>";
		}else{
			html+="<select    class=\"input span12 m-b-n\" id=\""+inputId+"\" name=\""+inputId+"\">";
		}

	$.ajax ({
		url:restfulURL+restfulPathDropDownAppraisalLevel,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
				
				//galbalDqsRoleObj=data;
			$.each(data,function(index,indexEntry){
				if(id==indexEntry["appraisal_level_id"]){
					html+="<option selected value="+indexEntry["appraisal_level_id"]+">"+indexEntry["appraisal_level_name"]+"</option>";			
				}else{
					html+="<option  value="+indexEntry["appraisal_level_id"]+">"+indexEntry["appraisal_level_name"]+"</option>";	
				}
			});	

		}
	});	
	html+="</select>";
	return html;
};
 
// --------------- DropDownList Connection ---------------
var dropDownListConnection = function(id){
	var html="";
	
	html+="<select class=\"input span12 m-b-n\" id=\"f_connection\" name=\"f_connection\">";
	//html+="<option  value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownConnection ,
		type:"get" ,
		dataType:"json" ,
		//headers:{Authorization:"Bearer "+tokenID.token},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
				//galbalDqsRoleObj=data;
			$.each(data,function(index,indexEntry){
				if(id==indexEntry["connection_id"]){
					html+="<option selected value="+indexEntry["connection_id"]+">"+indexEntry["connection_name"]+"</option>";			
				}else{
					html+="<option  value="+indexEntry["connection_id"]+">"+indexEntry["connection_name"]+"</option>";	
				}
			});	
		}
	});	
	html+="</select>";
	return html;
};

var executeSQLFn = function (txtSQL) {
	

	$.ajax({
		url : restfulURL + restfulPathCDS+"/test_sql",
		type : "POST",
		dataType : "json",
		data : {"connection_id":$("#f_connection").val(),
		"sql":txtSQL},
		headers:{Authorization:"Bearer "+tokenID.token},
		async : false,
		success : function(data) {
			if (data['status'] == "200") {
				listSqlFn(data['data']);
				
			} else if (data['status'] == "400") {
				$("#table_Sql").hide();
				$("#table_Sql").html("");
				validationSqlFn(data['data']);
			}
		}
	});
}

var listSqlFn = function (data) {
	var tableSql = "";
	var tableSqlHead = "";
	var tableSqlBody = "";
	tableSqlHead+="<thead><tr>";
	tableSqlBody+="<tbody id=\"listSqlData\">";
   
	for ( var obj in data) {
		if (data.hasOwnProperty(obj)) {
			
			tableSqlBody+="<tr class='rowSearch'>";
			for ( var prop in data[obj]) {
				
				if (data[obj].hasOwnProperty(prop)) {
					if(obj == 0){
						tableSqlHead+="<th>"+prop+"</th>";
					}
					tableSqlBody += "<td class='columnSearch'>"+ data[obj][prop]+ "</td>";
					//console.log(prop + ':' + data[obj][prop]);
					
				}
			}
			tableSqlBody+="</tr>";
		}
	}
	
	tableSqlHead+="</tr></thead>";
	tableSqlBody+="</tbody>";
	tableSql=tableSqlHead+tableSqlBody;
	$("#table_Sql").show();
	$("#table_Sql").html(tableSql);
	
}
var backToTopFn = function(){
	$('body,html').animate({
		scrollTop: 0
	}, 800);
	return false;
}


$(document).ready(function() {

		
	var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==false){
	 		return false;
	 	}
	 }
  
	

	// ------------------- Common Data Set -------------------
	$(".sr-only").hide();
	//$("#drop_down_list_from_appraisal_level").html(dropDownListAppraisalLevel("","f_app_lv"));
	$("#drop_down_list_connection").html(dropDownListConnection());
	
	
	$("#cds_name").val("");
	$("#cds_id").val("");
	$("#countPaginationTop").val( $("#countPaginationTop option:first-child").val());
	$("#countPaginationBottom").val( $("#countPaginationBottom option:first-child").val());
	$(".app_url_hidden").show();
	$("#btn_search_advance").click(function(){
		///alert($("#cds_name").val().split("-", 1));
		
		searchAdvanceFn($("#cds_id").val(),$("#is_sql").val());
		$("#cds_list_content").show();
		return false;
	});
	//$("#btn_search_advance").click();
	
	
	
	
	$("#btnAddCommonDataSet").click(function(){
		clearFn();
		//$("#f_app_lv").val( $("#f_app_lv option:first-child").val());
		$("#f_connection").val( $("#f_connection option:first-child").val());
		$("#btnAddAnother").show();
		$("#checkbox_is_sql").prop("checked",true);
		$("#checkbox_is_active").prop("checked",true);
		
	});
	
	$("#btnSubmit").click(function(){
		if ($("#action").val() == "add"|| $("#action").val() == "") {
			insertFn();
		}else{
			updateFn();
		}
		return false;
	});
	
	$("#btnAddAnother").click(function(){
		insertFn("saveAndAnother");
	});
	
	$(".btnCancle").click(function() {
		clearFn();
	});

	$("#checkbox_is_sql").change(function name() {
		if($("#checkbox_is_sql:checked").is(":checked")){
			$("#btn_Execute").removeAttr("disabled");
			$("#f_connection").removeAttr("disabled");
			//executeFn();
		}else{
			$("#btn_Execute").attr("disabled","disabled");
			$("#f_connection").attr("disabled","disabled");
		}
	});
	
	
	


	            
	            
	
	
	
	
	 $("#btn_Execute").click(function () {
		 executeSQLFn($("#txt_sql").val());
		 
		 //buildHtmlTable('#excelDataTable');
	});
	

	
	//Autocomplete Search Start
	$("#cds_name").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+restfulPathAutocomplete,
				 type:"post",
				 dataType:"json",
				 headers:{Authorization:"Bearer "+tokenID.token},
				 data:{"cds_name":request.term},
				 //async:false,
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					  
						response($.map(data, function (item) {
							console.log(item.cds_id);
							//alert(item.cds_id);
                            return {
                                label: item.cds_name,
                                value: item.cds_name,
                                cds_id:item.cds_id
                            };
                        }));
					
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        },
		select:function(event, ui) {
			$("#cds_name").val(ui.item.value);
            $("#cds_id").val(ui.item.cds_id);
            tempCdsName = ui.item.value;
            tempCdsId=ui.item.cds_id;
            return false;
        },change: function(e, ui) {  
			if ($("#cds_name").val() == tempCdsName) {
				$("#cds_id").val(tempCdsId);
			} else if (ui.item != null) {
				$("#cds_id").val(ui.item.cds_id);
			} else {
				$("#cds_id").val("");
			}
        	
         }
    });
   
	//Autocomplete Search End
	
	$("#btn_copy").click(function(){
		var chackSelect =  false;
		$(".btnModalClose").click();
		$.each($(".selectCdsCheckbox").get(),function(index,indexEntry){
			if($(indexEntry).is(":checked")){
				chackSelect = true;
				return false;
			}
		});
		if (chackSelect == true){
			listAppraisalLevel();
			
			$("#ModalCopy").modal();
			}
		else{
			callFlashSlide("Please Select Common Data Set !!!");
		}
		
		
	});
	$("#btnCopySubmit").click(function(){
		copyCdsFn();
		
		return false;
	});
	
	
	//binding tooltip start
	 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
	 $('[data-toggle="tooltip"]').tooltip({
		 html:true
	 });
	//binding tooltip end
	
	// ------------------- Common Data Set END -------------------
	

});
var listAppraisalLevel = function() {
	var htmlTable="";
	$.ajax ({
		url:restfulURL+restfulPathDropDownAppraisalLevel ,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
//			console.log(data);
//			console.log(data.length);
			$.each(data,function(index,indexEntry){
				htmlTable+="<tr>";
//				if(index == 0){
//					htmlTable+="<td rowspan='"+data.length+"'>Appraisal Level:</td>";
//				}
				htmlTable+="<td>";
				htmlTable+="<input  style=\"margin-bottom: 2px;\" id=\"form_copy_item-"+indexEntry["appraisal_level_id"]+"\" class=\"from_data_copy\"";
				htmlTable+="type='checkbox' value=\""+indexEntry["appraisal_level_id"]+"\">";
				htmlTable+="</td>";
				htmlTable+="<td style=\"vertical-align:middle\">"+indexEntry["appraisal_level_name"]+"</td>";
				htmlTable+="</tr>";
					
//				}		
			});	

		}
	});	
	$("#formListCopy").html(htmlTable);
}
var copyCdsFn = function () {
	var chackSelect =  false;
	var cds =[];
	var appraisal = [];
	$.each($(".selectCdsCheckbox").get(),function(index,indexEntry){
		if($(indexEntry).is(":checked")){
			cds.push($(indexEntry).val());
		}
	});
	console.log($(".from_data_copy").get());
	$.each($(".from_data_copy").get(),function(index,indexEntry){
		if($(indexEntry).is(":checked")){
			appraisal.push($(indexEntry).val());
			chackSelect = true;
		}
	});
	if (chackSelect == false){callFlashSlideInModal("<font color='red'>*</font> Please Select Appraisal level !!!","#information3"); return false;}

	console.log(cds);
	console.log(appraisal);
		$.ajax({
			url : restfulURL+restfulPathCDS+"/copy",
			type : "POST",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			async:false,
			data:{"cds":cds,"appraisal_level":appraisal},
			success : function(data) {
				console.log(data);
				
				if(data['status']==200 && data['duplicates'].length == 0 ){
					callFlashSlide("Copy Successfully.");
					getDataFn($("#pageNumber").val(),$("#rpp").val());
					$('#ModalCopy').modal('hide');
					
				}else if(data['duplicates'].length > 0){
					var validate = "";
					validate += "<font color='red'>* </font> The field is Duplicates  ↓ <br>";
					$.each(data['duplicates'], function(index, indexEntry) {
						
						if(indexEntry['cds_name']!=undefined){
							validate+="<font color='red'>&nbsp&nbsp* </font> cds name: "+indexEntry['cds_name']+" ,";
						}
						if(indexEntry['appraisal_level']!=undefined){
							validate+="<font color='red'>&nbsp</font> appraisal level: "+indexEntry['appraisal_level']+"<br>";
						}
					});
					callFlashSlideInModal(validate,"#information3","error");
					
					
				}
			}
		});
	
	return false;
}