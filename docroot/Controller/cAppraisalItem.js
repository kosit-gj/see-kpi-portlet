
/*#########################  Main Function Data #######################*/
//Global variable
var globalData=[];

//Get Data
var getDataFn = function(page,rpp) {
	
	
	var appraisal_level_id = $("#embed_appraisal_level_id").val();
	var structure_id= $("#embed_structure_id").val();
	var perspective_id= $("#embed_perspective_id").val();
	var item_id= $("#embed_item_id").val();
	var organization_id= $("#embed_organization").val();
	var kpi_type_id= $("#embed_kpi_type_id").val();
	
	

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_item",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			"page":page,
			"rpp":rpp,
			"level_id":appraisal_level_id,
			"kpi_type_id":kpi_type_id,
			"structure_id":structure_id,
			"perspective_id":perspective_id,
			"item_id":item_id,
			"org_id":organization_id
			
			
		},
		success:function(data){
			
			
			listDataFn(data['group']);
			setThemeColorFn(tokenID.theme_color);
			globalData=data;
			//paginationSetUpFn(globalData['current_page'],globalData['last_page'],globalData['last_page']);
			$(".result_area").show();
		}
	})
	
};


//ห้ามตัวเลขติดลบ

//function IsNumeric(sText,obj)
//{
//	
//	var ValidChars = "0123456789.";
//	var IsNumber=true;
//	var Char;
//		for (i = 0; i < sText.length && IsNumber == true; i++) { 
//			Char = sText.charAt(i); 
//			if (ValidChars.indexOf(Char) == -1) {
//				 IsNumber = false;
//			}
//		}
//		if(IsNumber==false){
//		
//			obj.value=sText.substr(0,sText.length-1);
//		}
//		
//		return IsNumber;
//}
//Embed Parameter 
var embedParam = function(id){
	
}


var displayTypeFn  = function(dataValue,dataType){
	
	//console.log(dataType);
	var displayType="";	
	
	if(dataType=="text"){
		if(parseInt(dataValue)==0){
			displayType= '';
		}else{
			displayType= dataValue;
		}
		
	}else if(dataType=="checkbox"){
		if(dataValue==1){
			displayType= "<input checked type='checkbox' id='' name='' disabled='disabled'>";
		}else{
			displayType= "<input type='checkbox' id='' name='' disabled='disabled'>";
		}
	}
	return displayType;
}

//List Data
var listDataFn = function(data) {
	//console.log(data);
	var  mainContentHTML="";
	$.each(data,function(index,indexEntry){
		//console.log(index);
		//structure_id
		mainContentHTML+="<div class=\"row-fluid\">";
		mainContentHTML+="	<div class=\"span12\">";
		mainContentHTML+="  	<div class=\"ibox-title2\">";
	
		mainContentHTML+=" 			<input type='hidden' name='structure_name' class='' value='"+index+"'>";
		mainContentHTML+=" 			<input type='hidden' name='structure_id' class='' value='"+indexEntry['structure_id']+"'>";
		mainContentHTML+="          <b class='titleQuantityForm' style='position:relative;top:7px'>"+index+"</b>&nbsp;&nbsp;<button style='float:right;' data-toggle=\"modal\" data-target=\"#modal-"+indexEntry['form_url']+"\" id=\"btnAddKPI\" class=\"btn btn-info input-sm btnAdd\" type=\"button\"><i class=\"fa fa-plus-square\"></i>&nbsp;Add "+index+"</button>";
		mainContentHTML+="      </div>";
				
		mainContentHTML+="		<div class=\"ibox-content\">";
		mainContentHTML+="          	<div class=\"table-responsive\">";
		mainContentHTML+="         		<table class=\"table table-striped\" id=\"\">";
        		
		mainContentHTML+="                  <thead>";
		mainContentHTML+="                      <tr>";
		//mainContentHTML+=" 						<th></th>";
		$.each(indexEntry['columns'],function(columns,columnsEntry){
			if(columnsEntry['data_type']=="number"){
				mainContentHTML+="                          <th  style='text-align:right;'>"+columnsEntry['column_display']+"</th>";
			}else if(columnsEntry['data_type']=="checkbox"){
				mainContentHTML+="                			 <th style='text-align:center;'>"+columnsEntry['column_display']+"</th>";
			}else{
				mainContentHTML+="                          <th style='text-align:left;'>"+columnsEntry['column_display']+"</th>";
			}
		});
		
		/*
		mainContentHTML+="                          <th  style='width:20%'>Appraisal Level </th>";
		mainContentHTML+="                          <th  style='width:20%'>Structure</th>";
		mainContentHTML+="                          <th  style='width:15%'>Perspective</th>";
		mainContentHTML+="                          <th  style='width:10%'>UOM</th>";
		mainContentHTML+="                       	<th  style='width:10%'>IsActive</th>";
		*/
		
		mainContentHTML+="                          <th style='width:10%; text-align:center;'>Manage</th>";
		mainContentHTML+="                      </tr>";
		mainContentHTML+="                  </thead>";
		mainContentHTML+="                  <tbody>";
		
		
		$.each(indexEntry['items'],function(items,itemsEntry){
		
		mainContentHTML+=" 					<tr>";
		//mainContentHTML+=" 	<td><input type='checkbox' id='checkboxCopy-"+itemsEntry['item_id']+"' name='checkboxCopy-"+itemsEntry['item_id']+"' class='checkboxCopy' value='"+itemsEntry['item_id']+"'></td> ";	
		$.each(indexEntry['columns'],function(columns,columnsEntry){
		//mainContentHTML+="                			<td>"+itemsEntry[columnsEntry['column_name']]+"</td>";
		
		if(columnsEntry['data_type']=="number"){
			mainContentHTML+="                			<td style=\"text-align:right\">"+itemsEntry[columnsEntry['column_name']]+"</td>";
		}else if(columnsEntry['data_type']=="checkbox"){
			mainContentHTML+="                			<td style=\"text-align:center\">"+displayTypeFn(itemsEntry[columnsEntry['column_name']],columnsEntry['data_type'])+"</td>";
		}else{
			mainContentHTML+="                			<td>"+displayTypeFn(itemsEntry[columnsEntry['column_name']],columnsEntry['data_type'])+"</td>";
		}
		});
		mainContentHTML+="         					<td style=\"text-align:center\">";
		mainContentHTML+="            				<i data-trigger=\"focus\" tabindex=\""+items+"\" data-content=\"&lt;button class='btn btn-warning btn-small btn-gear edit' id=edit-"+itemsEntry['item_id']+"-"+itemsEntry['app_url']+" data-target=#addModalRule data-toggle='modal'&gt;Edit&lt;/button&gt;&nbsp;&lt;button id=del-"+itemsEntry['item_id']+" class='btn btn-danger btn-small btn-gear del'&gt;Delete&lt;/button&gt;\" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-edit-del\" data-original-title=\"\" title=\"\"></i>";
		mainContentHTML+="          				</td>";
		
		mainContentHTML+="           			</tr>";
		});
                          	
		mainContentHTML+="             </tbody>";
		mainContentHTML+="           </table>";
		mainContentHTML+="          </div>";
		mainContentHTML+="</div>";
		mainContentHTML+="</div>";
		mainContentHTML+="</div>";
		
	});
	
	$("#main_conntent_list_data").html(mainContentHTML);
	

	$(".popover-edit-del").popover().css({"width":"120px"});
	$("#main_conntent_list_data").off("click",".popover-edit-del");
	$("#main_conntent_list_data").on("click",".popover-edit-del",function(){
		$(".popover").css({"text-align":"center"});
		//Delete Start
		$(".del").on("click",function() {
			$("#informConfirm").empty();
			var id=this.id.split("-");
			id=id[1];
			$("#confrimModal").modal();
			$(this).parent().parent().parent().children().click();
			$(document).off("click","#btnConfirmOK");
			$(document).on("click","#btnConfirmOK",function(){
				//alert(id);
				deleteFn(id);
				
			});
			
		});
		//findOne Start
		$(".edit").on("click",function() {
			
			$(window).scrollTop(0);
			var edit=this.id.split("-");
			var id=edit[1];
			var form_url=edit[2];
			//alert(id+"-----"+form_url);
			findOneFn(id,form_url);
			$(".modal-body").scrollTop(0);
			$(this).parent().parent().parent().children().click();
		});
	});	
	
};



//Delete
var deleteFn = function(id) {
	
	 $.ajax({
      url:restfulURL+"/"+serviceName+"/public/appraisal_item/"+id,
      type:"DELETE",
      dataType:"json",
	  headers:{Authorization:"Bearer "+tokenID.token},
	  success:function(data){ 
		if(data['status']==200){
			
			   callFlashSlide("Delete Successfully.");       
		       getDataFn($("#pageNumber").val(),$("#rpp").val());
			   $("#confrimModal").modal('hide');
			   
		}else if(data['status']=="400"){
			
			//$("#informConfirm").html("<font color='red'>"+data['data']+"</font>");
			callFlashSlide("<font color=''>"+data['data']+"</font>","error");  
			
		}
     }
   });
};


//set paginate local start
var paginationSetUpFn2 = function(pageIndex,pageButton,pageTotal){
	if(pageTotal==0){
		pageTotal=1
	}
	$('.pagination_top2,.pagination_bottom2').off("page");
	$('.pagination_top2,.pagination_bottom2').bootpag({
	    total: pageTotal,//page Total
	    page: pageIndex,//page index
	    maxVisible: 5,//จำนวนปุ่ม
	    leaps: true,
	    firstLastUse: true,
	    first: '←',
	    last: '→',
	    wrapClass: 'pagination',
	    activeClass: 'active',
	    disabledClass: 'disabled',
	    nextClass: 'next',
	    prevClass: 'prev',
	    next: 'next',
	    prev: 'prev',
	    lastClass: 'last',
	    firstClass: 'first'
	}).on("page", function(event, num){
		var rpp=10;
		if($("#rpp2").val()==undefined){
			rpp=10;
		}else{
			rpp=$("#rpp2").val();
			
		}
		
		//findOneFn($("#validate_header_id").val(),num,rpp);
		cdsGetFn(num,rpp);
		
	    $(".pagingNumber2").remove();
	    var htmlPageNumber= "<input type='hidden' id='pageNumber2' name='pageNumber2' class='pagingNumber2' value='"+num+"'>";
	    
	    $("#paramPagingCDS").append(htmlPageNumber);
	   
	}); 

	$(".countPagination2").off("change");
	$(".countPagination2").on("change",function(){

		$("#countPaginationTop2").val($(this).val());
		$("#countPaginationBottom2").val($(this).val());
		
		//getDataFn(1,$(this).val());
		
		cdsGetFn(1,$(this).val());
		
		$(".rpp2").remove();
	    var htmlRrp= "<input type='hidden' id='rpp2' name='rpp2' class='rpp2' value='"+$(this).val()+"'>";
	    $("#paramPagingCDS").append(htmlRrp);
	});
}
//set paginate local end

//Search for Edit. 

var findOneFn = function(id,form_url) {
	$.ajax({
	      url:restfulURL+"/"+serviceName+"/public/appraisal_item/"+id,
	      type:"GET",
	      dataType:"json",
		  headers:{Authorization:"Bearer "+tokenID.token},
		  async:false,
		  success:function(data){ 
			$("#modal-"+form_url).modal();
			if(form_url=="quantity"){
				
				initailQuantityFormFn('edit',data['structure_id'],data['structure_name'],data);
				
			}else if(form_url=="quality"){
				
				initailQualityFormFn('edit',data['structure_id'],data['structure_name'],data);
				
			}else if(form_url=="deduct"){
				
				initailDeductScoreFormFn('edit',data['structure_id'],data['structure_name'],data);
				
			}
			
			
		}
	});
}
//SearchAdvance
var searchAdvanceFn = function() {
	/*
	appraisal_level_id,
	structure_id,
	perspective_id,
	item_id
	*/
	
	$(".embed_param_search").remove();
	
	var apraisalItemId=$("#appraisalItemName").val().split("-");
	apraisalItemId=apraisalItemId[0];
	
	var Organization=$("#Organization").val().split("-");
	Organization=Organization[0];
	
	var structure = $("#structure").val().split("-");
	structure=structure[0];
	
	
	var embedParam="";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisal_level_id' name='embed_appraisal_level_id' value='"+$("#appraisalLevel").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_kpi_type_id' name='embed_kpi_type_id' value='"+$("#kpiType").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_perspective_id' name='embed_perspective_id' value='"+$("#perspective").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_structure_id' name='embed_structure_id' value='"+structure+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_item_id' name='embed_item_id' value='"+apraisalItemId+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_organization' name='embed_organization' value='"+Organization+"'>";
	
	$("#embedParamSearch").append(embedParam);
	
	getDataFn();
};
/*#########################  Main Function Data #######################*/
/*#########################  Custom Function Data #######################*/
var appraisalLevelListFn = function(nameArea,id,defaultAll,multiSelect){

	var level_array=[];

	if(multiSelect==true){
	
		if(id!=undefined && id!=''){
			$.each(id,function(index,indexEntry){
				level_array.push(indexEntry['level_id']);
			});
			//console.log(level_array);
		}
		
	}

	
	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_item/al_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			if(multiSelect==true){
				htmlOption+="<select class=\"form-control input-sm multipleSelect span12\" data-toggle=\"tooltip\" title=\"Level\"  multiple=\"multiple\" id=\"appraisalLevel"+nameArea+"\">";
			}else{
				htmlOption+="<select class=\"form-control input-sm multipleSelect span12\" data-toggle=\"tooltip\" title=\"Level\"  id=\"appraisalLevel"+nameArea+"\">";	
			}
			if(defaultAll==false){
				
			}else{
				htmlOption+="<option  value=\"\">All Level</option>";
			}
			$.each(data,function(index,indexEntry){
				
					htmlOption+="<option value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
					
				
			});
			htmlOption+="</select>";
			
			$("#appraisalLevelArea"+nameArea).html(htmlOption);
			
			if(multiSelect==true){
			
				$("#appraisalLevel"+nameArea).val(level_array);
				 //binding multi select start
				$("#appraisalLevel"+nameArea).multiselect({
					 minWidth:'100%;'
				});
				
			}
			 //select multi select end
		}
	});
}
//Perspective List
var perspectiveListFn = function(nameArea,id,defaultAll){
	
	
	if(nameArea==undefined){
		nameArea="";
	}
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_item/perspective_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			
			var htmlOption="";
			if(defaultAll==false){
			
			}else{
				htmlOption+="<option  value=\"\">All Perspective</option>";
			}
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['perspective_id']){
					htmlOption+="<option selected value='"+indexEntry['perspective_id']+"'>"+indexEntry['perspective_name']+"</option>";
				}else{
					htmlOption+="<option value='"+indexEntry['perspective_id']+"'>"+indexEntry['perspective_name']+"</option>";
				}
				
			});
			$("#perspective"+nameArea).html(htmlOption);
			
		}
	})

}
//http://192.168.1.52/"+serviceName+"/public/appraisal_item/uom_list
var uomListFn = function(nameArea,id){
	if(nameArea==undefined){
		nameArea="";
	}

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_item/uom_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['uom_id']){
					htmlOption+="<option selected value='"+indexEntry['uom_id']+"'>"+indexEntry['uom_name']+"</option>";
				}else{
					htmlOption+="<option  value='"+indexEntry['uom_id']+"'>"+indexEntry['uom_name']+"</option>";
					
				}
			});
			$("#uom"+nameArea).html(htmlOption);
			
		}
	});
	
}

//Structure List
var structureListFn = function(nameArea){
	/*
	    "structure_id": 2,
        "structure_name": "Competency"
	 */
	
	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_item/structure_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			
			var htmlOption="";
			htmlOption+="<option value=''>All Structure</option>";
			$.each(data,function(index,indexEntry){
				htmlOption+="<option value='"+indexEntry['structure_id']+"-"+indexEntry['form_name']+"'>"+indexEntry['structure_name']+"</option>";
			});
			$("#structure"+nameArea).html(htmlOption);
			
		}
	})

}

var dropDrowValueTypeFn =function(nameArea,id,defaultAll){
	/*
    "kpi_type_id": 3,
    "kpi_type_name": "Deduct"
	 */

	
	
	//value_type_id": 1,
    //"value_type_name": "Bigger is better"
    	
	if(nameArea==undefined){
		nameArea="";
	}
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_item/value_type_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			if(defaultAll==true){
				htmlOption+="<option value=''>All Value Type</option>";
			}
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['value_type_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['value_type_id']+">"+indexEntry['value_type_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['value_type_id']+">"+indexEntry['value_type_name']+"</option>";
				}
			});
			$("#valueType"+nameArea).html(htmlOption);
		}
	});
	
	
}

var dropDrowremindConditionFn =function(nameArea,id,defaultAll){
	/*
    "kpi_type_id": 3,
    "kpi_type_name": "Deduct"
	 */
	//"remind_condition_id": 1,
    //"remind_condition_name": "Monthly"
    	
	if(nameArea==undefined){
		nameArea="";
	}
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_item/remind_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			if(defaultAll==true){
				htmlOption+="<option value=''>All Remind Condition</option>";
			}else if(defaultEmpty==true){
				htmlOption+="<option value=''></option>";
			}
			
			
			$.each(data,function(index,indexEntry){
				
				if(id==indexEntry['remind_condition_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['remind_condition_id']+">"+indexEntry['remind_condition_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['remind_condition_id']+">"+indexEntry['remind_condition_name']+"</option>";
				}
			});
			$("#remindCOndition"+nameArea).html(htmlOption);
		}
	});
}

var dropDrowkpiTypeFn = function(nameArea,id,defaultAll){
	/*
    "kpi_type_id": 3,
    "kpi_type_name": "Deduct"
	 */

	
	
	
	if(nameArea==undefined){
		nameArea="";
	}
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/kpi_type",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			if(defaultAll==true){
				htmlOption+="<option value=''>All KPI Type</option>";
			}
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['kpi_type_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['kpi_type_id']+">"+indexEntry['kpi_type_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['kpi_type_id']+">"+indexEntry['kpi_type_name']+"</option>";
				}
			});
			$("#kpiType"+nameArea).html(htmlOption);
		}
	});
	
	
}
var dropDrowDepartmentFn = function(nameArea,id,defaultAll){
	if(nameArea==undefined){
		nameArea="";
	}
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_item/department_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			if(defaultAll==true){
				htmlOption+="<option value=''>All Department</option>";
			}
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['department_code']){
					htmlOption+="<option selected='selected' value="+indexEntry['department_code']+">"+indexEntry['department_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['department_code']+">"+indexEntry['department_name']+"</option>";
				}
			});
			$("#department"+nameArea).html(htmlOption);
		}
	});
	
}


var dropDrowOrgFn = function(nameArea,id,defaultAll){
	
	
	/*
		org_id": 3,
        "org_code": "003",
        "org_name": "Anubis",
        "is_active": 1,
        "parent_org_name": null,
        "parent_org_code": null
	*/
	
	var org_array=[];
	if(id!=undefined && id!=''){
		$.each(id,function(index,indexEntry){
			org_array.push(indexEntry['org_id']);
		});
		//console.log(org_array);
	}
	
	
	if(nameArea==undefined){
		nameArea="";
	}
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/org",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			
			htmlOption+="<select multiple=\"multiple\" size=\"10\" name=\"organization"+nameArea+"[]\" id='organization"+nameArea+"'>";

			if(defaultAll==true){
				htmlOption+="<option value=''>All Org</option>";
			}
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['org_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['org_id']+">"+indexEntry['org_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['org_id']+">"+indexEntry['org_name']+"</option>";
				}
			});
			htmlOption+="</select>";
			
			$("#org"+nameArea+"Form").html(htmlOption);
			$("#organization"+nameArea).val(org_array);
			$('select[name="organization'+nameArea+'[]"]').bootstrapDualListbox();
			
		}
	});
	
}
var dropDrowPositionFn = function(nameArea,id,defaultAll){

	/*
		"position_id": 2,
        "position_name": "Major",
        "is_active": 1
	*/
	
	var position_array=[];
	if(id!=undefined){
		$.each(id,function(index,indexEntry){
			position_array.push(indexEntry['position_id']);
		});
		//console.log(position_array);
	}
	
	if(nameArea==undefined){
		nameArea="";
	}
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/position",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			
			htmlOption+="<select multiple=\"multiple\" size=\"10\" name=\"position"+nameArea+"[]\" id='position"+nameArea+"'>";
		     
			if(defaultAll==true){
				htmlOption+="<option value=''>All Position</option>";
			}
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['position_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['position_id']+">"+indexEntry['position_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['position_id']+">"+indexEntry['position_name']+"</option>";
				}
			});
			htmlOption+="</select>";
			$("#position"+nameArea+"Form").html(htmlOption);
			$("#position"+nameArea).val(position_array);
			$('select[name="position'+nameArea+'[]"]').bootstrapDualListbox();
			
		}
	});
	
}


//var connectionServiceFn = function(username,password){
//	$.ajax({
//		
//		url:restfulURL+"/"+serviceName+"/public/session",
//		//url:"http://localhost/"+serviceName+"/public/session",
//		type:"POST",
//		dataType:"text",
//		data:{"username":username,"password":password},
//		//data:{"username":"2015019","password":"2015019"},
//		error: function(jqXHR, textStatus, errorThrown) {
//			console.log("error login");
//		},
//		success:function(data){
//			//console.log(data);
//			localStorage.setItem("tokenID",data);
//			console.log("Login is Success");
//			
//		}
//	})			
//}
//function getParamValue(paramName)
//{
//    var url = window.location.search.substring(1); //get rid of "?" in querystring
//    var qArray = url.split('&'); //get key-value pairs
//    for (var i = 0; i < qArray.length; i++) 
//    {
//        var pArr = qArray[i].split('='); //split key and value
//        if (pArr[0] == paramName) 
//            return pArr[1]; //return value
//    }
//}

var copyItemToLevelFn = function(appraisal_item_code,appraisal_level_code){
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_item/copy",
		type:"post",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			"appraisal_level":appraisal_level_code,
			"appraisal_item":appraisal_item_code
		},
		success:function(data){
		
			if(data['status']==200){
				$("#copyModal").modal('hide');
				callFlashSlide("Copy success.");
			}
		}
	});
	
}
var listLevelForCopyFn = function(){
	var htmlOption="";
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_item/al_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		
		success:function(data){
		
			$.each(data,function(index,indexEntry){
				htmlOption+="<tr>";
					htmlOption+="<td></td>";
					htmlOption+="<td>";
					htmlOption+="<input type='checkbox' id='levelCheckbox-"+indexEntry['appraisal_level_id']+"' name='levelCheckbox-"+indexEntry['appraisal_level_id']+"' class='levelCheckbox' value='"+indexEntry['appraisal_level_id']+"'> "+indexEntry['appraisal_level_name']+"";
					htmlOption+="</td>";
				htmlOption+="</tr>";
			});
		}
	});
	return htmlOption;
}
/*#########################  Custom Function Data #######################*/


//Ready to call Function.
$(document).ready(function(){
	

	 
	var username = $('#user_portlet').val();
	var password = $('#pass_portlet').val();
	var plid = $('#plid_portlet').val();
	
	if(username!="" && username!=null & username!=[] && username!=undefined ){
		if(connectionServiceFn(username,password,plid)==true){
	
	
	

	
	//$('#include_deduct_score').load($("#url_portlet").val()+'/Form/deduct-score.html');
	//$('#include_quality').load($("#url_portlet").val()+'/Form/quality.html');
	//$('#include_quantity_form').load($("#url_portlet").val()+'/Form/quantity.html');
	//load form  end
	
	//parameter start
	//dropDrowDepartmentFn('','',defaultAll=true);
	appraisalLevelListFn('','',defaultAll=true,multiSelect=false);
	perspectiveListFn();
	structureListFn();
	dropDrowkpiTypeFn('','',defaultAll=true);
	$(".app_url_hidden").show();
	//parameter end
	
	
	

	//Autocomplete Search Start
	var splitOrgIdFn = function(Organization){
		
		var orgId = Organization.split("-");
		orgId=orgId[0]
		return orgId;
	}
	$("#appraisalItemName").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+"/"+serviceName+"/public/appraisal_item/auto_appraisal_name",
				 type:"post",
				 dataType:"json",
				 headers:{Authorization:"Bearer "+tokenID.token},
				 data:{
					 "item_name":request.term,
					 /*
					 "perspective_id":$("#perspective").val(),
					 "appraisal_level_id":$("#appraisalLevel").val(),
					 "structure_id":$("#structure").val()
					 */
					 
					 "level_id":$("#appraisalLevel").val(),
					 "kpi_type_id":$("#kpiType").val(),
					 "structure_id":$("#structure").val(),
					 "perspective_id":$("#perspective").val(),
					 "org_id":splitOrgIdFn($("#Organization").val())
					 },
				 //async:false,
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
						response($.map(data, function (item) {
                            return {
                                label: item.item_id+"-"+item.item_name,
                                value: item.item_id+"-"+item.item_name
                            };
                        }));
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        }
    });
	//Autocomplete Search End
	

	//Autocomplete Organization Search Start

	$("#Organization").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+"/"+serviceName+"/public/org/auto_org_name",
				 type:"post",
				 dataType:"json",
				 headers:{Authorization:"Bearer "+tokenID.token},
				 data:{"org_name":request.term,"level_id":$("#appraisalLevel").val()},
				 //async:false,
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
						response($.map(data, function (item) {
                            return {
                                label: item.org_id+"-"+item.org_name,
                                value: item.org_id+"-"+item.org_name
                            };
                        }));
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        }
    });
	//Autocomplete Organization Search End
	
	
	
	//Search Start
	$("#btnSearchAdvance").click(function(){
		
		searchAdvanceFn();
	});
	//$("#btnSearchAdvance").click();
	//Search End
	

	
	
	  
		
		}
	}
	
	$("#btnCoppy").click(function(){
		
		var appraisal_item_code=[];
		
		$.each($(".checkboxCopy").get(),function(index,indexEntry){
			if($(indexEntry).is(":checked")){
				//console.log($(indexEntry).val());
				appraisal_item_code.push($(indexEntry).val());
			}
		});
		//console.log(appraisal_item_code);
		if(appraisal_item_code.length==0){
			callFlashSlide("Please choose Appraisal item for Copy.");
			return false;
		}else{
		
			$("#listLevelData").html(listLevelForCopyFn());
			$("#copyModal").modal();
			
			$("#btnCopyOK").off("click");
			$("#btnCopyOK").on("click",function(){
		
				var appraisal_level_code=[];
				$.each($(".levelCheckbox").get(),function(index,indexEntry){
					if($(indexEntry).is(":checked")){
						//console.log($(indexEntry).val());
						appraisal_level_code.push($(indexEntry).val());
					}
				});
				
				if(appraisal_level_code.length==0){
					//callFlashSlide("Please choose Appraisal Level for Copy to.");
					callFlashSlideInModal("Please choose Appraisal Level for Copy to.","#information_copy");
					return false;
				}else{
					
					copyItemToLevelFn(appraisal_item_code,appraisal_level_code);
					
				}
				
			});
		}
	});
	
	
	$(document).off("click",".btnAdd");
	$(document).on("click",".btnAdd",function(){
		$(window).scrollTop(0);
		$(".modal-body").scrollTop(0);
	});
	

	//binding tooltip start
	 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
	 $('[data-toggle="tooltip"]').tooltip({
		 html:true
	 });
	//binding tooltip end
	 
	 
	 //check structure type
	 $("#structure").change(function(){
		var  structureType=$(this).val().split("-");
		structureType=structureType[1];
		if(structureType=="Quality" || structureType=="Deduct Score"){

			$("#kpiType").prop("disabled",true);
			$("#appraisalItemName").prop("disabled",true);
			$("#perspective").prop("disabled",true);
			
		}else{

			$("#kpiType").prop("disabled",false);
			$("#appraisalItemName").prop("disabled",false);
			$("#perspective").prop("disabled",false);
			
		}
	 });
	 
	 //binding advance multi select start
	 
	  //var demo1 = $('select[name="duallistbox_demo1[]"]').bootstrapDualListbox();
	  /*
	  $("#demoform").submit(function() {
	      alert($('[name="duallistbox_demo1[]"]').val());
	      return false;
	  });
	  */
		  
	 // var demo2 = $('select[name="duallistbox_demo2[]"]').bootstrapDualListbox();
	 /*
	  $("#demoform2").submit(function() {
	      alert($('[name="duallistbox_demo2[]"]').val());
	      return false;
	  });
	  */
	 //binding advance multi select end
});

