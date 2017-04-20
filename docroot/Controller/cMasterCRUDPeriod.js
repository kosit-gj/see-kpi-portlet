//Global Variable
var golbalDataCRUD =[];
var dataSearch="";

//set paginate start
var paginationSetUpCRUDFn = function(pageIndex,pageTotal,options){
	
	if(pageTotal==0){
		pageTotal=1
	}
	$('.pagination_top,.pagination_bottom').off("page");
	$('.pagination_top,.pagination_bottom').bootpag({
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
		if($("#rpp").val()==undefined){
			rpp=10;
		}else{
			rpp=$("#rpp").val();
		}
		
		getDataFn(num,rpp,options,dataSearch);
		
	    $(".pagingNumber").remove();
	    var htmlPageNumber= "<input type='hidden' id='pageNumber' name='pageNumber' class='pagingNumber' value='"+num+"'>";
	    $("body").append(htmlPageNumber);
	   
	}); 

	$(".countPagination").off("change");
	$(".countPagination").on("change",function(){

		$("#countPaginationTop").val($(this).val());
		$("#countPaginationBottom").val($(this).val());
		
		getDataFn(1,$(this).val(),options,dataSearch);
		
		$(".rpp").remove();
	    var htmlRrp= "<input type='hidden' id='rpp' name='rpp' class='rpp' value='"+$(this).val()+"'>";
	    $("body").append(htmlRrp);
	});
}
//set paginate end
var searchMultiFn=function(search,searchName){
	var paramSearchName="";
	 if(searchName==undefined){
		 paramSearchName="";
	 }else{
		 paramSearchName =searchName;
	 }
	 
	 var search = search.trim().toLowerCase();
	 $(".rowSearch"+paramSearchName).hide();
     $.each( $(".rowSearch"+paramSearchName),function(index1,indexEntry1){
    	 //console.log(indexEntry1);	
    	 var i=0;
    	 $.each($(".columnSearch"+paramSearchName,this),function(index2,indexEntry2){
    		 //console.log($(indexEntry2).text());
    		 //console.log($(indexEntry2).text().indexOf(search));
    		 if($(indexEntry2).text().trim().toLowerCase().indexOf(search)>=0){
    			 $(this).parent().show();
    			 return false;
    		 }
    	 });
     });
}


var insertFn = function(data,options,param){
	
	$.ajax({
		
		url:options['serviceName'],
		type : "POST",
		dataType : "json",
		data : data,
		headers:{Authorization:"Bearer "+options['tokenID'].token},
		success : function(data,status) {
			if(data['status']=="200"){
				//alert("Insert Success");
//				callFlashSlide("Insert success.");
//				getDataFn($("#pageNumber").val(),$("#rpp").val(),options);
//				clearFn(options);
				
				
				
				  if(param !="saveAndAnother"){
					  	callFlashSlide("Insert success.");
					
						getDataFn($("#pageNumber").val(),$("#rpp").val(),options,dataSearch);
						clearFn(options);
						
						$("#modal-"+options['formDetail']['id']).modal('hide');
					}else{
						
						//callFlashSlide("Insert success.");
						callFlashSlideInModal("Insert success.","#information","");
						
						getDataFn($("#pageNumber").val(),$("#rpp").val(),options,dataSearch);
						clearFn(options);
						 
					}
				  
				  
			}else if(data['status']=="400"){
				callFlashSlideInModal(validationFn(data),"#information","error");
			}
			
		}
	});
}
var deleteFn = function(id,options){

	$.ajax({
		
		url:options['serviceName']+"/"+id,
		type : "delete",
		dataType : "json",
		async:false,
		headers:{Authorization:"Bearer "+options['tokenID'].token},
		success : function(data) {
			if(data['status']==200){
				
			getDataFn($("#pageNumber").val(),$("#rpp").val(),options,dataSearch);
			clearFn(options);
			$("#confrimModal").modal('hide');
			}else if(data['status']==400){
				
				//inform_on_confirm
				callFlashSlideInModal(data['data'],"#inform_on_confirm","error");
				//$("#confrimModal").modal('hide');
			}
		}
	}); 
}
var clearFn = function(options){
	$("#id").val("");
	$("#action").val("add");
	$("#information").hide();
	$.each(options['form'],function(index,indexEntry){

		if(indexEntry['inputType']=="text" || indexEntry['inputType']=="date"){
			$("form#"+options['formDetail']['id']+" #"+indexEntry['id']).val("");
		}else if(indexEntry['inputType']=="dropdown"){
			$("form#"+options['formDetail']['id']+" > #"+indexEntry['id']).val($("#"+indexEntry['id']+" option:first").val());
		}
	});
	
}
var updateFn = function(data,options){
	
	$.ajax({
			url:options['serviceName']+"/"+$("#id").val(),
			type : "patch",
			dataType : "json",
			data : data,
			headers:{Authorization:"Bearer "+options['tokenID'].token},
			success : function(data,status) {
				if(data['status']=="200"){
					//alert("Update Success");
					callFlashSlide("Update success.");
					$("#modal-"+options['formDetail']['id']).modal('hide');
					getDataFn($("#pageNumber").val(),$("#rpp").val(),options,dataSearch);
					clearFn(options);
					
				}else if(data['status']=="400"){
					callFlashSlideInModal(validationFn(data),"#information","error");
				}
				
			}
		});
}
var mapObjectToFormFn  =function(data,options){
	
	/*
	"form":[{
	"label":"Connection Name","inputType":"text","default":"DefultText",
	"id":"connectionName","width":"350px","required":true
	},
	 */
	
	$.each(options['form'],function(index,indexEntry){

		if(indexEntry['inputType']=="text" || indexEntry['inputType']=="date"){
			$("form#"+options['formDetail']['id']+"  #"+indexEntry['id']).val(data[indexEntry['id']]);
		}else if(indexEntry['inputType']=="dropdown"){
			$("form#"+options['formDetail']['id']+" > #"+indexEntry['id']).val(data[indexEntry['id']]);
		}
		else if(indexEntry['inputType']=="checkbox"){
			
			if(data[indexEntry['id']]==1){
				
				$(".checkbox-"+indexEntry['id']).prop('checked',true);
				
			}else{
				$(".checkbox-"+indexEntry['id']).prop('checked',false);
			}
			
		}
		

		
	});
		
	
//	$.each(data,function(index,indexEntry){
//		if(options[''])
//		$("#"+index).val(indexEntry);
//	});
	$("#modal-"+options['formDetail']['id']).modal();
}
var fineOneFn = function(id,options){
	$.ajax({
		
		url:options['serviceName']+"/"+id,
		type : "GET",
		dataType : "json",
		async:false,
		headers:{Authorization:"Bearer "+options['tokenID'].token},
		success : function(data) {
			$("#id").val(data[options['formDetail']['pk_id']]);
			$("#action").val('edit');
			$("#btnAddAnother").hide();
			mapObjectToFormFn(data,options);
		}
	});
}
var displayTypeFn = function(colunms,options){
	var htmlTbody="";
	if(colunms['colunmsType']=='checkbox'){
	htmlTbody+="<td class=\"columnSearch"+options['formDetail']['id']+"\">"+indexEntry[indexEntry2['id']]+"</td>";
	}else{
	htmlTbody+="<td class=\"columnSearch"+options['formDetail']['id']+"\">"+indexEntry[indexEntry2['id']]+"</td>";	
	}
	return htmlTbody;
};
var listDataFn = function(data,options){
	
	var htmlTbody="";
	$.each(data,function(index,indexEntry) {
		console.log(indexEntry);
		htmlTbody+="    	<tr class=\"rowSearch"+options['formDetail']['id']+"\">";
		$.each(options['colunms'],function(index2,indexEntry2){
			
			if(indexEntry2['colunmsType']=='checkbox'){
				if(indexEntry[indexEntry2['id']]==1){
					htmlTbody+="<td class=\"columnSearch"+options['formDetail']['id']+"\"><input type='checkbox' disabled='disabled' checked='checked'></td>";
				}else{
					htmlTbody+="<td class=\"columnSearch"+options['formDetail']['id']+"\"><input type='checkbox' disabled='disabled'></td>";
				}
				
			}else if(indexEntry2['colunmsType']=='text'){
				
				htmlTbody+="    		<td class=\"columnSearch"+options['formDetail']['id']+"\">"+indexEntry[indexEntry2['id']]+"</td>";
			
			}
		});
		htmlTbody+="    		<td style=\"text-align:center\">";
		htmlTbody+="    		<i data-trigger=\"focus\" tabindex=\""+index+"\" data-content=\"";
		
		if(options['btnManageOption']!=undefined){
		htmlTbody+="    		&lt;button id='"+options['btnManageOption']['id']+"-"+indexEntry[options['formDetail']['pk_id']]+"' class='btn btn-info btn-small btn-gear "+options['btnManageOption']['id']+"'&gt;"+options['btnManageOption']['name']+"&lt;/button&gt;";
		}
		
		htmlTbody+="			&lt;button class='btn btn-warning btn-small btn-gear edit' id='edit-"+indexEntry[options['formDetail']['pk_id']]+"' data-target=#addModalRule data-toggle='modal'&gt;Edit&lt;/button&gt;&nbsp;&lt;button id='del-"+indexEntry[options['formDetail']['pk_id']]+"' class='btn btn-danger btn-small btn-gear del'&gt;Delete&lt;/button&gt;\" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-edit-del\" data-original-title=\"\" title=\"\"></i>";
		htmlTbody+="    		</td>";
		htmlTbody+="    	</tr>";
		//&lt;button id='id-"+indexEntry[options['formDetail']['pk_id']]+"' class='btn btn-danger btn-small btn-gear del'&gt;Delete&lt;/button&gt;
	});
	
	$("#listData").html(htmlTbody);
	$(".popover-edit-del").popover();
	$("#table-"+options['formDetail']['id']).off("click",".popover-edit-del");
	$("#table-"+options['formDetail']['id']).on("click",".popover-edit-del",function(){
		//Delete Start
		$(".del").on("click",function() {
			//alert(this.id);
			var id=this.id.split("-");
			id=id[1];
			$("#confrimModal").modal();
			$(this).parent().parent().parent().children().click();
			$(document).off("click","#btnConfirmOK");
			$(document).on("click","#btnConfirmOK",function(){
				deleteFn(id,options);
			});
		});
		//findOne Start
		$(".edit").on("click",function() {
			//alert(this.id);
			$("#information").hide();
			$(this).parent().parent().parent().children().click();
			var id=this.id.split("-");
			id=id[1];
			fineOneFn(id,options);
			$("#action").val("edit");
		});
	});	
	
	
	
}
var getDataFn = function(page,rpp,options,search){
	
	var paramPage =(page == undefined || page == ""  ? "1" : page);
	var paramrpp =(rpp == undefined || rpp == "" ? "" : rpp);
	var pagignation =(options['pagignation'] == '' || options['pagignation'] == undefined  ? false : options['pagignation']);
	
	
	var data="";
	if(search!=undefined){
		data=search+"&page="+paramPage+"&rpp="+paramrpp;
	}else{
		data="page="+paramPage+"&rpp="+paramrpp;
	}
	$.ajax({
		url : options['serviceName'],
		type : "get",
		dataType : "json",
		async:false,
		//data:{"page":page,"rpp":rpp},
		data:data,
		headers:{Authorization:"Bearer "+options['tokenID'].token},
		success : function(data) {
			//alert(data['data'].length);
			//if(data['data'].length>0){
				var dataResult="";
				if(pagignation==true){
					dataResult=data['data'];
				}else{
					dataResult=data;
				}
				listDataFn(dataResult,options);
				golbalDataCRUD=data;
				
				if(pagignation==true){
					$(".paginationControl").show();
					//alert(golbalDataCRUD['current_page']);
					paginationSetUpCRUDFn(golbalDataCRUD['current_page'],golbalDataCRUD['last_page'],options);
					
				}else{
					$(".paginationControl").hide();
				}
			
				$(".resultArea").show();
			//}
			
			
		}
	});
}
//getDataFn();


var createInputTypeFn  = function(object,tokenID){
	
	var initValue =(object['initValue'] == '' || object['initValue'] == undefined  ? false : object['initValue']);
	
	var inputType="";
/*
{
"label":"Database Type","inputType":"dropdown","default":"All",
"id":"databaseType","width":"250px","url":"","required":true
},
 */
	
	if(object['inputType']=="dropdown"){
		
		$.ajax({
			url:object['url'],
			dataType:"json",
			type:"get",
			async:false,
			headers:{Authorization:"Bearer "+tokenID.token},
			success:function(data){
				inputType="<select class='span12 m-b-n' id="+object['id']+" name=\""+object['id']+"\" style='width:"+object['width']+"'>";			
				//initValue
				if(object['initValue']!=undefined){
					inputType+="<option value=''>"+object['initValue']+"</option>";
				}
				
				$.each(data,function(index,indexEntry){
					
					//console.log(Object.keys(indexEntry)[0]);
					//inputType+="<option value="+index+">"+indexEntry+"</option>";
					if(dataSearch==indexEntry[Object.keys(indexEntry)[0]]){
						
						inputType+="<option selected value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1]]+"</option>";
					}else{
						inputType+="<option value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1]]+"</option>";
					}
				});
				inputType+="<select>";
			}
		})
		
	}else if(object['inputType']=="text" || object['inputType']=="autoComplete"){

		var dataTypeInput =(object['dataTypeInput'] == 'number' ? "numberOnly" : "");
		if(object['placeholder']!=undefined){
			
			inputType+="<input type=\"text\" style='width:"+object['width']+"' class=\"span12 m-b-n "+dataTypeInput+"\" placeholder=\""+object['placeholder']+"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
			
		}else{
			inputType+="<input type=\"text\" style='width:"+object['width']+"' class=\"span12 m-b-n "+dataTypeInput+"\" placeholder=\"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
			
		}
		
	}else if(object['inputType']=="date"){

		
		var dataTypeInput =(object['dataTypeInput'] == 'number' ? "numberOnly" : "");
		if(object['placeholder']!=undefined){
			
			inputType+="<input type=\"text\" style='width:"+object['width']+"' class=\"span12 m-b-n datepicker "+dataTypeInput+"\" placeholder=\""+object['placeholder']+"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
			
		}else{
			inputType+="<input type=\"text\" style='width:"+object['width']+"' class=\"span12 datepicker m-b-n "+dataTypeInput+"\" placeholder=\"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
			
		}
		
	}else if(object['inputType']=="checkbox"){
	
		var checked =(object['default'] == 'checked' ? "checked" : "");

		inputType+="<input type=\"hidden\"  id=\""+object['id']+"\" name=\""+object['id']+"\" value='0'>";
		inputType+="<input type='checkbox' "+checked+" class=\"checkbox checkbox-"+object['id']+"\" placeholder=\"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
		
		
	}else if(object['inputType']=="radio"){
		
		inputType+="<input type='radio' class=\"radio\" placeholder=\"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
		
	}else if(object['inputType']=="password"){
		
		if(object['placeholder']!=undefined){
			inputType+="<input type=\"password\" style='width:"+object['width']+"' class=\"span12 m-b-n \" placeholder=\""+object['placeholder']+"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
			
		}else{
			inputType+="<input type=\"password\" style='width:"+object['width']+"' class=\"span12 m-b-n \" placeholder=\"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
			
		}
	}
	return inputType;
}
var createExpressSearchFn = function(){
var expressSearch="";
expressSearch+="<div class=\"input-group\"><input type=\"text\" class=\"input-sm form-control\" id=\"searchText\" placeholder=\"Search\"> <span class=\"input-group-btn\">";
expressSearch+="<button id=\"btnSearch\" class=\"btn btn-sm btn-primary\" type=\"button\">&nbsp;<i class=\"fa fa-search\"></i></button> </span>";
expressSearch+="</div>";

return expressSearch;
}
var createFormFn = function(options){
	
var formHTML="";
formHTML+="<form id='"+options['formDetail']['id']+"' name='"+options['formDetail']['id']+"'>";
formHTML+="<div aria-hidden=\"true\" role=\"dialog\" tabindex=\"-1\" id=\"modal-"+options['formDetail']['id']+"\" class=\"modal inmodal\" style=\"display: none;\">";
formHTML+="<div class=\"modal-dialog\">";
formHTML+="<div class=\"modal-content  bounceInRight\">";
formHTML+="        <div class=\"modal-header\">";
formHTML+="            <button style=\"padding-top:5px\" data-dismiss=\"modal\" class=\"close\" type=\"button\"><span aria-hidden=\"true\">×</span><span class=\"sr-only\" style=\"display: none;\">Close</span></button>";
formHTML+="            <h4 class=\"modal-title\" id=\""+options['formDetail']['id']+"\">"+options['formDetail']['formName']+"</h4>";
formHTML+="        </div>";
formHTML+="        <div class=\"modal-body\">";
formHTML+="            <div class=\"row-fluid\"><div class=\"col-lg-12\"><div class=\"span12\" style=\"padding: 0px 10px; height:65px;\"><h1><i class=\"fa fa fa-pencil-square-o icon-title\"></i><small id=\"modalDescription\" style=\" position:absolute;top:37px;left:85px\">"+options['formDetail']['formName']+"</small>";
formHTML+="           </h1></div></div></div> <hr>";
formHTML+="           <div class=\"row-fluid\">";
formHTML+="           <div class=\"span12 form-horizontal p-t-xxs\">";

/*
="row-fluid"
	                		<div class="form-group p-xxs">
								<label class="control-label">Emp Code:<span class="redFont">*</span></label>
								<div class="controls">
									<input class="form-control input-sm span12" placeholder="" id="from_emp_code" type="text">
								</div>
							</div>
 */
 
$.each(options['form'],function(index,indexEntry){
	formHTML+="           <div class=\"form-group p-xxs\">";
	formHTML+="                <label class=\"control-label\">";
	formHTML+="                "+indexEntry['label']+"";
								if(indexEntry['required']==true){
									formHTML+="<span class='redFont '>*</span>";
								}
	formHTML+="                </label>";
	formHTML+="                <div class=\"controls\">";
	formHTML+=					createInputTypeFn(indexEntry,options['tokenID']);
	formHTML+="                </div>";
	formHTML+="                </div>";


});
formHTML+="        </div></div></div></div>";
formHTML+="        <div class=\"modal-footer\">";
formHTML+="       	 	<input type=\"hidden\" name=\"id\" id=\"id\" value=\"\">";
formHTML+="				<input type=\"hidden\" name=\"action\" id=\"action\" value=\"add\">";
formHTML+="				<button class=\"btn btn-primary\" type=\"button\" id=\"btnSubmit\">Save</button>";
formHTML+="				<button class=\"btn btn-primary\" type=\"button\" id=\"btnAddAnother\">Save & Add Another</button>";
formHTML+="            <button data-dismiss=\"modal\" class=\"btn btn-danger btnCancle\" type=\"button\">Cancel</button>";
formHTML+="            <div class=\"alert alert-warning information\" id=\"information\" style=\"display: none;\"></div>";
formHTML+="        </div>";
formHTML+="    </div>";
formHTML+="</div>";
formHTML+="</div>";   
formHTML+="</form>"; 
return formHTML;
}
var createBtnAdvanceSearchOptionFn = function(object){
	
	var AdvanceSearchOption="";
	//AdvanceSearchOption+="	<div class=\"input-group\" >";
	//AdvanceSearchOption+="     	<div id=\"btnSearchArea\">";
	AdvanceSearchOption+="    		<button style=\"margin-bottom: 5px;\"  type=\"button\" class=\"btn btn-success input-sm\" name=\""+object['id']+"\" id=\""+object['id']+"\">"+object['name']+"</button>";
	//AdvanceSearchOption+="     	</div>";
	//AdvanceSearchOption+=" 	</div>";
 	
 	return AdvanceSearchOption;
}
var createAvanceSearchFn = function(options){
	var avanceSearchHTML="";
	$.each(options['advanceSearch'],function(index,indexEntry){
/*
 <div class=\"span4 form-horizontal \">
										<div class="form-group p-xxs ">
											<label class="control-label">CDS Name</label>
											<div class="controls">
												<input data-toggle="tooltip" title="CDS Name" class="span12 m-b-n ui-autocomplete-input" placeholder="CDS Name" id="cds_name" name="cds_name" type="text">
												<input class="form-control input-sm" id="cds_id" name="cds_id" value="" type="hidden">
											</div>
											

										</div>
									</div>
 */
		if(indexEntry['inputType']=='dropdown'){
		
			avanceSearchHTML+="<div class=\"span6 form-horizontal \">";
				avanceSearchHTML+="<div class=\"form-group p-xxs\"><label class=\"control-label\">"+indexEntry['label']+"</label>";
					avanceSearchHTML+="<div class=\"controls\" id=\""+indexEntry['id']+"\">";
					avanceSearchHTML+=createInputTypeFn(indexEntry,options['tokenID']);
					avanceSearchHTML+="</div>";
				avanceSearchHTML+="</div>";
			avanceSearchHTML+="</div>";
			
		}else if(indexEntry['inputType']=='text'){
			var dataTypeInput =(indexEntry['dataTypeInput'] == 'number' ? "numberOnly" : "");
			avanceSearchHTML+="<div class=\"span6 form-horizontal\">";
				avanceSearchHTML+="<div class=\"form-group p-xxs\"><label class=\"control-label "+dataTypeInput+"\">"+indexEntry['label']+"</label>";
				avanceSearchHTML+="<div class=\"controls\" id='"+indexEntry['id']+"'>";
				avanceSearchHTML+=createInputTypeFn(indexEntry,options['tokenID']);
				avanceSearchHTML+="</div>";
				avanceSearchHTML+="</div>";
			avanceSearchHTML+="</div>";
			
		}
	});
	
	

	return avanceSearchHTML;
	

	
	
}
var createDataTableFn = function(options){
	
	//options['advanceSearchSet']
	var advanceSearchSet =(options['advanceSearchSet'] == '' || options['advanceSearchSet'] == undefined  ? false : options['advanceSearchSet']);
	var expressSearch =(options['expressSearch'] == '' || options['expressSearch'] == undefined  ? false : options['expressSearch']);
	
	$.ajax({
		url:$("#url_portlet").val()+"/theme/basic.html",
		dataType:"html",
		type:"get",
		async:false,
		success:function(data){
			
			
			
			$("#mainContent").html(data);
			
			if(expressSearch==true){
				$("#expressSearchArea").html(createExpressSearchFn());
			}
			$("#btnAddData").html(options['formDetail']['formName']);
			$("#titilePage").html(options['formDetail']['formName']);
			$("#titlePanel").html(options['formDetail']['formName']+" List");
			//data-target="#modal-databaseConnection"
			$("#btnAdd").attr("data-target","#modal-"+options['formDetail']['id']);
	
			var tableHTML="";                	
			tableHTML+="<table class=\"table table-striped\" id=\"table-"+options['formDetail']['id']+"\">" ;                               		
			tableHTML+="    <thead>";
			tableHTML+="        <tr>"
			$.each(options['colunms'],function(index,indexEntry){
				tableHTML+="            <th  style='width:"+indexEntry['width']+"'><b>"+indexEntry['colunmsDisplayName']+"</b></th>";
			});
			tableHTML+="           	 	<th style='text-align:center;'><b>Manage</b></th>";
			
			tableHTML+="        </tr>";
			tableHTML+="    </thead>";
			tableHTML+="    <tbody id=\"listData\">";
			
			
			tableHTML+="    </tbody>";
			tableHTML+="</table>";
			$("#tableArea").html(tableHTML);
			
			$("#modalFormArea").html(createFormFn(options));
			
			
			//binding date picker start
			$( ".datepicker" ).datepicker({ dateFormat: "yy-mm-dd" });
			//binding date picker end
		
		
			if(advanceSearchSet==true){
				
				$("#advanceSearchParamArea").html(createAvanceSearchFn(options));
				if(options['btnAdvanceSearchOption']!=undefined){
					$("#btnAdvanceSearchOption").html(createBtnAdvanceSearchOptionFn(options['btnAdvanceSearchOption']));
				}
				$("#advanceSearchArea").show();
			
			}else{
				$("#advanceSearchArea").hide();
			}
			
			
			$(".numberOnly").keydown(function (e) {
				        // Allow: backspace, delete, tab, escape, enter and .
					
				        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				             // Allow: Ctrl+A, Command+A
				            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
				             // Allow: home, end, left, right, down, up
				            (e.keyCode >= 35 && e.keyCode <= 40)) {
				                 // let it happen, don't do anything
				                 return;
				        }
				        // Ensure that it is a number and stop the keypress
				        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
				            e.preventDefault();
				        }
				});
			
			//AutoComplete Search Start
			
			//AutoComplete Search End
			
			$("#btnSubmit").click(function(){
				//
				//alert("hellojquery");
				var checkboxes = $("form#"+options['formDetail']['id']).find('input[type="checkbox"]');
				$.each( checkboxes, function( key, value ) {
				    if (value.checked === false) {
				        value.value = 0;
				       
				    } else {
				        value.value = 1;
				    
				    }
				   // $(value).attr('type', 'hidden');
				});
				
				var data = $("form#"+options['formDetail']['id']).serialize();
				//console.log(data);
				
				if($("#action").val()=="add"){
					
					insertFn(data,options);
				}else{
					
					updateFn(data,options);
				}
			});
			
			
			$("#btnAddAnother").click(function(){
				var data = $("form#"+options['formDetail']['id']).serialize();
				insertFn(data,options,'saveAndAnother');
			});
			
			$("#btnSearch")	.click(function(){
				searchMultiFn($("#searchText").val(),options['formDetail']['id']);
			});
			
			$("#btnAdd").click(function(){
				//$("#modalFormArea").html(createFormFn(options));
				clearFn(options);
				$("#btnAddAnother").show();
				
			});
			
			//advance search start
	    	$("form#searchAdvanceForm").submit(function(){
	    		
	    		
	    		sessionStorage.setItem("searchAdvanceForm",$(this).serialize());
	    		dataSearch = sessionStorage.getItem("searchAdvanceForm");
	    		getDataFn($("#pageNumber").val(),$("#rpp").val(),options,dataSearch);
	    		
	    		return false;
	    	});
	    	
	    	if(advanceSearchSet==false){
	    		getDataFn($("#pageNumber").val(),$("#rpp").val(),options,dataSearch);
	    	}
	    	//advance search end
	
		}
	});
}
