//-------- Update Criteria Start
var options=[];
var insertCriteriaFn = function () {
	var structure =[];
	var weight = [];
	var criteria = [];
	var checkbox = "";
	//from_data_structure
	$('.from_data_structure').each(function(index, indexEntry) {
		if($(indexEntry).is(":checked")){
			checkbox = "1";
		}else{
			checkbox = "0";
		}
		criteria.push({
			"structure_id": ""+this.id.split("-")[1]+"",
			"weight_percent": ""+$(".from_data_weight[id$="+this.id.split("-")[1]+"]").val()+"",
			"checkbox": ""+checkbox+""
		   });
	});
	
//	$('.from_data_weight').each(function(index, indexEntry) {
//		//console.log("id: "+this.id+" weigth : "+$(indexEntry).val());
//		criteria.push({
//			"structure_id": ""+this.id+"",
//			"weight_percent": ""+$(indexEntry).val()+"",	   	
//		   });
//	});
		$.ajax({
			url:restfulURL+"/"+serviceName+"/public/appraisal_level/"+$("#crierai_id").val()+"/criteria",
			type : "PATCH",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			async:false,
			data:{"criteria":criteria},
			success : function(data) {
				if(data['status']==200){
					callFlashSlide("Add Appraisal Criteria Successfully.");
					
					getDataFn('','',options);
					
					$('#addModalCriteria').modal('hide');
					
				}else if (data['status'] == "400") {
					
					var validate = "<font color='red'>* </font>" + data['data'] + "";
					//alert(validate);
					callFlashSlideInModal(validate,"#information2","error");
					
				} 
			}
		});
	
	return false;
}
// -------- Update Criteria End

//--------  List Criteria  Start

var listAppraisalCriteria = function(id) {
	htmlTable="";
	weight_percent="";
	no_weight = "";
	is_check = "";
	$.ajax({ 
		url:restfulURL+"/"+serviceName+"/public/appraisal_level/"+id+"/criteria",
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			if(data["no_weight"] == 1){
				no_weight="disabled";
			}else{
				no_weight="";
			};

			
			$.each(data['data'],function(index,indexEntry) { 
				console.log(indexEntry["weight_percent"]);
				if(indexEntry["weight_percent"] == null){
					weight_percent="0.00";
				}else{
					weight_percent=indexEntry["weight_percent"];
				}
				if(indexEntry["checkbox"] == 1){
					is_check="checked";
				}else{
					is_check="";
				};
				
				htmlTable+="<tr>";
				htmlTable+="	<td>";
				htmlTable+="		<input  id=\"form_structure_item-"+indexEntry["structure_id"]+"\" class=\"from_data_structure\"";
				htmlTable+="		type='checkbox' "+is_check+" value=\""+indexEntry["structure_id"]+"\">";
				htmlTable+="	</td>";
				htmlTable+="	<td style=\"vertical-align:middle\">";
				htmlTable+=			indexEntry["structure_name"];
				htmlTable+="	</td>";
				htmlTable+="	<td style=\"vertical-align:middle\" >";
				htmlTable+="		<input style='margin-bottom: 0px;' class=\"span12 from_data_weight numberOnly\" "+no_weight+" type='text'  id=\""+indexEntry["structure_id"]+"\" value=\""+weight_percent+"\" />";
				htmlTable+="	</td>";
				htmlTable+="</tr>";
					
				 
			});
			$("#formListAppraisalCriteria").html(htmlTable);
			var getSelectionStart = function (o) {
				if (o.createTextRange) {
					var r = document.selection.createRange().duplicate()
					r.moveEnd('character', o.value.length)
					if (r.text == '') return o.value.length
					return o.value.lastIndexOf(r.text)
				} else return o.selectionStart
			};
			jQuery('.numberOnly').keypress(function (evt) { 
				console.log("Keypress");
				 var charCode = (evt.which) ? evt.which : event.keyCode;
				 var number = this.value.split('.');
				 if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
				    return false;
				 }
				    //just one dot
				 if(number.length>1 && charCode == 46){
				    return false;
				 }
				    //get the carat position
				 var caratPos = getSelectionStart(this);
				 var dotPos = this.value.indexOf(".");
				 if( caratPos > dotPos && dotPos>-1 && (number[1].length > 1)){
				    return false;
				 }
				 return true;
			});
								
		}
	});
}
//--------  List Criteria End

$(document).ready(function(){
        	//alert(createTableFn());
	
	
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==true){
	 		
	 	
			 		options={
		 			"colunms":[
		 			         
		 			           {"colunmsDisplayName":"Appraisal Level Name","width":"30%","id":"appraisal_level_name","colunmsType":"text"},
		 			           {"colunmsDisplayName":"View All Employee","width":"20%","id":"is_all_employee","colunmsType":"checkbox"},
		 			           {"colunmsDisplayName":"Is HR","width":"10%","id":"is_hr","colunmsType":"checkbox"},
		 			           {"colunmsDisplayName":"No Weight","width":"10%","id":"no_weight","colunmsType":"checkbox"},
		 			           {"colunmsDisplayName":"District","width":"10%","id":"district_flag","colunmsType":"checkbox"},
		 			           {"colunmsDisplayName":"Is Active","width":"10%","id":"is_active","colunmsType":"checkbox"},
		 			           {"colunmsDisplayName":"Parent","width":"20%","id":"parent_level_name","colunmsType":"text"}
		 			          
		 			           
		 			          ],
		
		 	    			
		 	    			"form":[{
		 	    				"label":"Appraisal Level Name","inputType":"text","placeholder":"Appraisal Level Name",
		 	        			"id":"appraisal_level_name","width":"250px","required":true
		 	    					
		 	    				},
		 	    			    {
		 	    				"label":"View All Employee","inputType":"checkbox","default":"uncheck",
		 	    				"id":"is_all_employee","width":"250px"
		 	    				},
		 	    				{
		 	 	    			"label":"Is HR","inputType":"checkbox","default":"uncheck",
		 	 	    			"id":"is_hr","width":"200px"
		 	 	    			},
		 	    			    {
			 	    			"label":"No Weight","inputType":"checkbox","default":"uncheck",
			 	    			"id":"no_weight","width":"200px"
			 	    			},
			 	    			{
			 	    				"label":"District","inputType":"checkbox","default":"uncheck",
			 	    				"id":"district_flag","width":"200px"
			 	    			},{
		 	    				"label":"IsActive","inputType":"checkbox","default":"checked",
		 	    				"id":"is_active","width":"200px"
		 	    				},{
		    					"label":"Parent Appraisal Level","inputType":"dropdown","initValue":"","updateList":true,
		    					"id":"parent_id","width":"250px","url":""+restfulURL+"/"+serviceName+"/public/appraisal_level"
		    					},  
		 	    				
		 	    					
		 	    			],
		 	    			
		 	    			
		 			 "formDetail":{"formSize":"modal-dialog","formName":"Appraisal Level","id":"appraisalLevelForm","pk_id":"level_id"},       
		 			 "serviceName":[restfulURL+"/"+serviceName+"/public/appraisal_level"],
		 			 "tokenID":tokenID,
		 			 "pagignation":false,
		 			 "expressSearch":false,
		 			 "advanceSearchSet":false,
		 			 "btnManageOption":{"id":"addModalCriteria","name":"Criteria"}
		 	}
		 	//console.log(options['tokenID'].token);
		 	createDataTableFn(options);
		 	
		 	 
		 	//alert("helo");
		 	$(document).on('click','.addModalCriteria',function(){
		 		
		 		var id = this.id.split("-");
		 		id=id[1];
		 		$("#crierai_id").val(id);
		 		//console.log("3");
		 		//console.log($(this).parent().parent().parent().prev().prev().prev().prev().prev().get());
		 		$("#ac_appraisal_level_name").html("<b>"+$(this).parent().parent().parent().prev().prev().prev().prev().prev().prev().text()+"</b>");
		 		listAppraisalCriteria(id);
		 		$("#addModalCriteria").modal();
		 		
		 		$("#btnCriteriaSubmit").off("click");
		 		$("#btnCriteriaSubmit").on("click",function(){
		 			$(".btnModalClose").click();
		 			insertCriteriaFn();
		 			
		 		});
		 			 			
		 	});
 	
	 	}
	 }
 	
 	});


 	
 	
    	
    	
    