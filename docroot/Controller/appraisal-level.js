//-------- Update Criteria Start
var options=[];
var insertCriteriaFn = function () {
	var structure =[];
	var weight = [];
	var criteria = [];
	$('.from_data_weight').each(function(index, indexEntry) {
		console.log("id: "+this.id+" weigth : "+$(indexEntry).val());
		criteria.push({
			"structure_id": ""+this.id+"",
			"weight_percent": ""+$(indexEntry).val()+"",	   	
		   });
	});
		$.ajax({
			url:restfulURL+"/tyw_api/public/appraisal_level/"+$("#crierai_id").val()+"/criteria",
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
	$.ajax({ 
		url:restfulURL+"/tyw_api/public/appraisal_level/"+id+"/criteria",
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			$.each(data,function(index,indexEntry) { 
				//console.log(data[index]["weight_percent"]);
				if(data[index]["weight_percent"] == null){
					weight_percent="0.00";
				}else{
					weight_percent=data[index]["weight_percent"];
				};
				htmlTable+="<tr>";
//				htmlTable+="	<td>";
//				htmlTable+="		<input  id=\"form_structure_item-"+data[index]["structure_id"]+"\" class=\"from_data_structure\"";
//				htmlTable+="		type='checkbox' value=\""+data[index]["structure_id"]+"\">";
//				htmlTable+="	</td>";
				htmlTable+="	<td style=\"vertical-align:middle\">";
				htmlTable+=			data[index]["structure_name"];
				htmlTable+="	</td>";
				htmlTable+="	<td style=\"vertical-align:middle\" >";
				htmlTable+="		<input onkeydown='return ( event.ctrlKey || event.altKey || (47<event.keyCode && event.keyCode<58 && event.shiftKey==false) || (95<event.keyCode && event.keyCode<106) || (event.keyCode==8) || (event.keyCode==9) || (event.keyCode>34 && event.keyCode<40) || (event.keyCode==46)|| (event.keyCode==110)|| (event.keyCode==190))' style='margin-bottom: 0px;' class=\"span12 from_data_weight numberOnly\" type='text'  id=\""+data[index]["structure_id"]+"\" value=\""+weight_percent+"\" />";
				htmlTable+="	</td>";
				htmlTable+="</tr>";
					
				 
			});
			$("#formListAppraisalCriteria").html(htmlTable);
								
		}
	});
}
//--------  List Criteria End

$(document).ready(function(){
        	//alert(createTableFn());
	
	
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
	 	if(connectionServiceFn(username,password)==true){
	 		
	 	
			 		options={
		 			"colunms":[
		 			         
		 			           {"colunmsDisplayName":"Appraisal Level Name","width":"30%","id":"appraisal_level_name","colunmsType":"text"},
		 			           {"colunmsDisplayName":"View All Employee","width":"20%","id":"is_all_employee","colunmsType":"checkbox"},
		 			           {"colunmsDisplayName":"Is Active","width":"10%","id":"is_active","colunmsType":"checkbox"},
		 			           {"colunmsDisplayName":"Is HR","width":"10%","id":"is_hr","colunmsType":"checkbox"},
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
		 	    				"label":"IsActive","inputType":"checkbox","default":"checked",
		 	    				"id":"is_active","width":"200px"
		 	    				},{
		    					"label":"Parent Appraisal Level","inputType":"dropdown","initValue":"",
		    					"id":"parent_id","width":"250px","url":""+restfulURL+"/tyw_api/public/appraisal_level"
		    					},  
		 	    				
		 	    					
		 	    			],
		 	    			
		 	    			
		 			 "formDetail":{"formSize":"modal-dialog","formName":"Appraisal Level","id":"appraisalLevelForm","pk_id":"appraisal_level_id"},       
		 			 "serviceName":[restfulURL+"/tyw_api/public/appraisal_level"],
		 			 "tokenID":tokenID,
		 			 "pagignation":false,
		 			 "expressSearch":false,
		 			 "advanceSearchSet":false,
		 			 "btnManageOption":{"id":"addModalCriteria","name":"Criteria"}
		 	}
		 	console.log(options['tokenID'].token);
		 	createDataTableFn(options);
		 	
		 	 
		 	//alert("helo");
		 	$(document).on('click','.addModalCriteria',function(){
		 		
		 		var id = this.id.split("-");
		 		id=id[1];
		 		$("#crierai_id").val(id);
		 		//console.log("3");
		 		//console.log($(this).parent().parent().parent().prev().prev().prev().prev().prev().get());
		 		$("#ac_appraisal_level_name").html("<b>"+$(this).parent().parent().parent().prev().prev().prev().prev().prev().text()+"</b>");
		 		listAppraisalCriteria(id);
		 		$("#addModalCriteria").modal();
		 		
		 		$("#btnCriteriaSubmit").off("click");
		 		$("#btnCriteriaSubmit").on("click",function(){
		 			
		 			insertCriteriaFn();
		 			
		 		});
		 			 			
		 	});
 	
	 	}
	 }
 	
 	});


 	
 	
    	
    	
    