/*#########################  Main Function Data #######################*/
//Global variable
var globalData=[];

//Get Data
var getDataFn = function(page,rpp) {
	
	var appraisal_level_id = $("embed_appraisal_level_id").val();
	var structure_id= $("embed_structure_id").val();
	var perspective_id= $("embed_perspective_id").val();
	var appraisal_item_id= $("embed_appraisal_item_id").val();
	
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_item",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			"page":page,
			"rpp":rpp,
			
//			"appraisal_level_id":appraisal_level_id,
//			"structure_id":structure_id,
//			"perspective_id":perspective_id,
//			"appraisal_item_id":appraisal_item_id
			
		},
		success:function(data){
			
			
			listDataFn(data['group']);
			globalData=data;
			//paginationSetUpFn(1,1,1);
			paginationSetUpFn(globalData['current_page'],globalData['last_page'],globalData['last_page']);
		}
	})
	
};


//Embed Parameter 
var embedParam = function(id){
	
}

var validationFn = function(data){
//	var data={"status":400,"data":{"appraisal_item_name":["The appraisal item name field is required."],"baseline_value"
//		:["The baseline value field is required."],"formula_cds_id":["The formula cds id field is required."
//		],"formula_cds_name":["The formula cds name field is required."]}};
	var errorData="";
	var count=0;
	$.each(data['data'],function(index,indexEntry){
		
		
		if(index!=undefined){
			if(count==0){
				errorData+=""+indexEntry+"";
			}else{
				errorData+="<br>"+indexEntry+" ";
			}
		}
		
		count++;
	});
	
	return errorData;
	
}
var displayTypeFn  = function(dataValue,dataType){
	
	console.log(dataType);
	var displayType="";	
	
	if(dataType=="text"){
		displayType= dataValue;
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
	
	var  mainContentHTML="";
	$.each(data,function(index,indexEntry){
		//console.log(index);
	//structure_id
		mainContentHTML+="<div class=\"row-fluid\">";
		mainContentHTML+="	<div class=\"span12\">";
		mainContentHTML+="  	<div class=\"ibox-title\">";
		mainContentHTML+=" 			<input type='hidden' name='structure_name' class='' value='"+index+"'>";
		mainContentHTML+=" 			<input type='hidden' name='structure_id' class='' value='"+indexEntry['structure_id']+"'>";
		mainContentHTML+="          <b>"+index+"</b>&nbsp;&nbsp;<button data-toggle=\"modal\" data-target=\"#modal-"+indexEntry['form_url']+"\" id=\"btnAddKPI\" class=\"btn btn-info input-sm\" type=\"button\"><i class=\"fa fa-plus-square\"></i>&nbsp;Add "+index+"</button>";
		mainContentHTML+="      </div>";
				
		mainContentHTML+="		<div class=\"ibox-content\">";
		mainContentHTML+="          	<div class=\"table-responsive\">";
		mainContentHTML+="         		<table class=\"table table-striped\" id=\"\">";
        		
		mainContentHTML+="                  <thead>";
		mainContentHTML+="                      <tr>";
		$.each(indexEntry['columns'],function(columns,columnsEntry){
		mainContentHTML+="                          <th >"+columnsEntry['column_display']+"</th>";
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
		
		mainContentHTML+="                  	<tr>";
		$.each(indexEntry['columns'],function(columns,columnsEntry){
		//mainContentHTML+="                			<td>"+itemsEntry[columnsEntry['column_name']]+"</td>";
		
		if(columnsEntry['data_type']=="number"){
			mainContentHTML+="                			<td>"+itemsEntry[columnsEntry['column_name']]+"</td>";
		}else{
			mainContentHTML+="                			<td>"+displayTypeFn(itemsEntry[columnsEntry['column_name']],columnsEntry['data_type'])+"</td>";
		}
		});
		mainContentHTML+="         					<td style=\"text-align:center\">";
		//mainContentHTML+="<a data-content=\"And here's some amazing content. It's very engaging. right?\" title=\"\" data-toggle=\"popover\" class=\"btn btn-large btn-danger\" href=\"#\" data-original-title=\"A Title\">Click to toggle popover</a>";
		mainContentHTML+="            				<i data-content=\"&lt;button class='btn btn-warning btn-xs btn-gear edit' id=edit-"+itemsEntry['appraisal_item_id']+"-"+itemsEntry['app_url']+" data-target=#addModalRule data-toggle='modal'&gt;Edit&lt;/button&gt;&nbsp;&lt;button id=del-"+itemsEntry['appraisal_item_id']+" class='btn btn-danger btn-xs btn-gear del'&gt;Delete&lt;/button&gt;\" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-edit-del\" trigger=\"click\" data-original-title=\"\" title=\"\"></i>";
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
	

	$(".popover-edit-del").popover();
	$("#main_conntent_list_data").off("click",".popover-edit-del");
	$("#main_conntent_list_data").on("click",".popover-edit-del",function(){
		//Delete Start
		$(".del").on("click",function() {
			
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
			var edit=this.id.split("-");
			var id=edit[1];
			var form_url=edit[2];
			//alert(id+"-----"+form_url);
			findOneFn(id,form_url);
			$(this).parent().parent().parent().children().click();
		});
	});	
	
};



//Delete
var deleteFn = function(id) {
	
	 $.ajax({
      url:restfulURL+"/tyw_api/public/appraisal_item/"+id,
      type:"DELETE",
      dataType:"json",
	  headers:{Authorization:"Bearer "+tokenID.token},
	  success:function(data){ 
		if(data['status']==200){
			
			   callFlashSlide("Delete Successfully.");       
		       getDataFn($("#pageNumber").val(),$("#rpp").val());
			   $("#confrimModal").modal('hide');
			   
		}else if(data['status']=="400"){
			
			callFlashSlide(data['data'],"error");  
			
		}
     }
   });
};

//Search for Edit. 

var findOneFn = function(id,form_url) {
	$.ajax({
	      url:restfulURL+"/tyw_api/public/appraisal_item/"+id,
	      type:"GET",
	      dataType:"json",
		  headers:{Authorization:"Bearer "+tokenID.token},
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
	appraisal_item_id
	*/
	
	$(".embed_param_search").remove();
	var embedParam="";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisal_level_id' name='embed_appraisal_level_id' value='"+$("#appraisalLevel").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_structure_id' name='embed_structure_id' value='"+$("#structure").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_perspective_id' name='embed_perspective_id' value='"+$("#perspective").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisal_item_id' name='embed_appraisal_item_id' value='"+$("#appraisalLevel").val()+"'>";
	$("#embedParamSearch").append(embedParam);
	
	getDataFn();
};
/*#########################  Main Function Data #######################*/
/*#########################  Custom Function Data #######################*/
var appraisalLevelListFn = function(nameArea,id){
	
	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_item/al_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['appraisal_level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['appraisal_level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['appraisal_level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
					
				}
			});
			$("#appraisalLevel"+nameArea).html(htmlOption);
		}
	});
}
//Perspective List
var perspectiveListFn = function(nameArea,id){
	
	
	if(nameArea==undefined){
		nameArea="";
	}
	
	
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_item/perspective_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			
			var htmlOption="";
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
//http://192.168.1.52/tyw_api/public/appraisal_item/uom_list
var uomListFn = function(nameArea,id){
	if(nameArea==undefined){
		nameArea="";
	}

	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_item/uom_list",
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
		url:restfulURL+"/tyw_api/public/appraisal_item/structure_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				htmlOption+="<option value='"+indexEntry['structure_id']+"'>"+indexEntry['structure_name']+"</option>";
			});
			$("#structure"+nameArea).html(htmlOption);
			
		}
	})

}

/*#########################  Custom Function Data #######################*/


//Ready to call Function.
$(document).ready(function(){
	
	
	

	//load form start
	$('#include_deduct_score').load(""+$("#url_portlet").val()+"/Form/deduct-score.html");
	$('#include_quality').load($("#url_portlet").val()+"/Form/quality.html");
	$('#include_quantity_form').load($("#url_portlet").val()+"/Form/quantity.html");
	//load form  end
	
	//parameter start
	appraisalLevelListFn();
	perspectiveListFn();
	structureListFn();
	//parameter end
	
	
	

	//Autocomplete Search Start

	$("#appraisalItemName").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+"/tyw_api/public/appraisal_item/auto_appraisal_name",
				 type:"post",
				 dataType:"json",
				 headers:{Authorization:"Bearer "+tokenID.token},
				 data:{"appraisal_item_name":request.term,"perspective_id":$("#perspective").val(),"appraisal_level_id":$("#appraisalLevel").val(),"structure_id":$("#structure").val()},
				 //async:false,
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
						response($.map(data, function (item) {
                            return {
                                label: item.appraisal_item_name,
                                value: item.appraisal_item_name
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
	
	//Search Start
	$("#btnSearchAdvance").click(function(){
		
		searchAdvanceFn();
	});
	//$("#btnSearchAdvance").click();
	//Search End
	

	 $('#example').popover({
		 trigger: "click"
	 });
	
	
});
