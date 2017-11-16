var restfulPathDpAppaisalYear ="/"+serviceName+"/public/appraisal_period/appraisal_year_list";
var restfulPathDpStartYear ="";
var restfulPathDpStartMonth ="/"+serviceName+"/public/appraisal_period/start_month_list";
var restfulPathDpAppraisalFrequency ="/"+serviceName+"/public/appraisal_period/frequency_list";
var restfulPathDpBonusFrequency ="";
var restfulPathDpSalaryRaiseFrequency ="";
var options=[];

//-------------------------------------------------------------------------------------

//********** DropdownAppraisal Year Start ******************************//


var DropdownAppraisalYear = function(){
		
	// Return today's date and time
	var currentTime = new Date()
	var year = currentTime.getFullYear()
	
		var html="";
		html+="<select data-toggle=\"tooltip\" title=\"Year\" class=\"input span12 m-b-n\" id=\"form_app_year\" name=\"form_app_year\">";
		$.ajax({
			url : restfulURL + restfulPathDpAppaisalYear,
			type : "get",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			async:false,
			success : function(data) {
				$.each(data,function(index,indexEntry){
					if(indexEntry['default_value']==1){
						html += "<option selected value=\""+data[index]["appraisal_year"]+"\">"+data[index]["appraisal_year"]+"</option>";	
					}else{
						html += "<option value=\""+data[index]["appraisal_year"]+"\">"+data[index]["appraisal_year"]+"</option>";	
					}
				});	
				html+="</select>";
				$("#dropdownAppYear").html(html);							
			}
		});
};
var DropdownStartYear = function(){
	
	// Return today's date and time
	var currentTime = new Date()
	var year = currentTime.getFullYear()
	
		var html="";
		html+="<select data-toggle=\"tooltip\" title=\"Start Year\" class=\"input span12 m-b-n\" id=\"start_year\" name=\"start_year\">";
		$.ajax({
			url : restfulURL + restfulPathDpAppaisalYear,
			type : "get",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			async:false,
			success : function(data) {
				$.each(data,function(index,indexEntry){
					
					if(indexEntry['default_value']==1){
						html += "<option selected value=\""+data[index]["appraisal_year"]+"\">"+data[index]["appraisal_year"]+"</option>";	
					}else{
						html += "<option value=\""+data[index]["appraisal_year"]+"\">"+data[index]["appraisal_year"]+"</option>";	
					}
				});	
				html+="</select>";
				$("#dropdownStartYear").html(html);							
			}
		});
};

var DropdowStartMonth = function(){
	
	var html="";
	html+="<select data-toggle=\"tooltip\" title=\"Start Month\" class=\"input span12 m-b-n\" id=\"start_month\" name=\"start_month\">";
	$.ajax({
		url : restfulURL+"/"+serviceName+"/public/appraisal_period/start_month_list",
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success : function(data) {
			$.each(data,function(index,indexEntry){
				if(indexEntry['default_month']==1){
					
					html += "<option selected value=\""+data[index]["start_month"]+"\">"+data[index]["start_month_name"]+"</option>";	
					
				}else{
					html += "<option value=\""+data[index]["start_month"]+"\">"+data[index]["start_month_name"]+"</option>";	
					
				}
			});	
			html+="</select>";
			$("#dropdownStartMonth").html(html);							
		}
	});
};
var DropdowAppraisalFrequency = function(){
	
	var html="";
	html+="<select data-toggle=\"tooltip\" title=\"Appraisal Frequency\" class=\"input span12 m-b-n\" id=\"appraisal_frequency\" name=\"appraisal_frequency\">";
	$.ajax({
		url : restfulURL+"/"+serviceName+"/public/appraisal_period/frequency_list",
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success : function(data) {
			$.each(data,function(index,indexEntry){
				
				if(indexEntry['default_appraisal_frequency']==1){
					
					html += "<option selected value=\""+data[index]["frequency_id"]+"\">"+data[index]["frequency_name"]+"</option>";	
					
				}else{
					
					html += "<option value=\""+data[index]["frequency_id"]+"\">"+data[index]["frequency_name"]+"</option>";	
					
				}
			});	
			html+="</select>";
			$("#dropdownAppFrequency").html(html);							
		}
	});
};

var DropdowBonusFrequency = function(){
	
	var html="";
	html+="<select data-toggle=\"tooltip\" title=\"Bonus Frequency\" class=\"input span12 m-b-n\" id=\"bonus_frequency\" name=\"bonus_frequency\">";
	$.ajax({
		url : restfulURL+"/"+serviceName+"/public/appraisal_period/frequency_list",
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success : function(data) {
			$.each(data,function(index,indexEntry){

				if(indexEntry['default_bonus_frequency']==1){
					
					html += "<option selected value=\""+data[index]["frequency_id"]+"\">"+data[index]["frequency_name"]+"</option>";	
					
				}else{
					
					html += "<option value=\""+data[index]["frequency_id"]+"\">"+data[index]["frequency_name"]+"</option>";	
					
				}
			});	
			html+="</select>";
			$("#dropdownBonusFrequency").html(html);							
		}
	});
};
var DropdowSalaryRaiseFrequency = function(){
	
	var html="";
	html+="<select data-toggle=\"tooltip\" title=\"Salary Raise Frequency\" class=\"input span12 m-b-n\" id=\"salary_raise_frequency\" name=\"salary_raise_frequency\">";
	$.ajax({
		url : restfulURL+"/"+serviceName+"/public/appraisal_period/frequency_list",
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success : function(data) {
			$.each(data,function(index,indexEntry){
				
				if(indexEntry['default_salary_frequency']==1){
					
					html += "<option selected value=\""+data[index]["frequency_id"]+"\">"+data[index]["frequency_name"]+"</option>";	
					
				}else{
					
					html += "<option value=\""+data[index]["frequency_id"]+"\">"+data[index]["frequency_name"]+"</option>";	
					
				}
			});	
			html+="</select>";
			$("#dropdownSalaryFrequncy").html(html);							
		}
	});
};
var clearAppraisalPeriodFn = function(){
	//$("#form_app_year").val($("#form_app_year option:first").val());
	//$("#start_month").val($("#start_month option:first").val());
	//$("#appraisal_frequency").val($("#appraisal_frequency option:first").val());
	$("#a_p_d").val("");
	//$("#bonus_frequency").val($("#bonus_frequency option:first").val());
	$("#b_p_d").val("");
	//$("#salary_raise_frequency").val($("#salary_raise_frequency option:first").val());
	$("#s_r_d").val("");
}
var createAppraisalPeriodFn = function(){
	//http://192.168.1.55/"+serviceName+"/public/appraisal_period/create
	var form_app_year = $("#form_app_year").val();
	var start_year = $("#start_year").val();
	var start_month = $("#start_month").val();
	var start_year = $("#start_year").val();
	var appraisal_frequency = $("#appraisal_frequency").val();
	var a_p_d = $("#a_p_d").val();
	var bonus_frequency = $("#bonus_frequency").val();
	var b_p_d = $("#b_p_d").val();
	var salary_raise_frequency = $("#salary_raise_frequency").val();
	var s_r_d = $("#s_r_d").val();
	
//	alert("form_app_year="+form_app_year);
//	alert("start_year="+start_year);
//	alert("start_month="+start_month);
//	alert("appraisal_frequency="+appraisal_frequency);
//	alert("a_p_d="+a_p_d);
//	alert("bonus_frequency="+bonus_frequency);
//	alert("b_p_d="+b_p_d);
//	alert("salary_raise_frequency="+salary_raise_frequency);
//	alert("s_r_d="+s_r_d);
	
	$.ajax({
		url : restfulURL+"/"+serviceName+"/public/appraisal_period/create",
		type : "post",
		dataType : "json",
		data:{
			"appraisal_year":form_app_year,
			"start_year":start_year,
			"start_month":start_month,
			"appraisal_frequency_id":appraisal_frequency,
			"appraisal_period_desc":a_p_d,
			"bonus_frequency_id":bonus_frequency,
			"bonus_period_desc":b_p_d,
			"salary_raise_frequency_id":salary_raise_frequency,
			"salary_period_desc":s_r_d
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success : function(data) {
			if(data['status']=='200'){
				
				callFlashSlide("Insert successed.");
				clearAppraisalPeriodFn();
				$("#Modalcreate").modal('hide');
				getDataFn('','',options);
				
			}else if(data['status']=='400'){
				callFlashSlideInModal(validationFn(data),"#information2","error");
			}
		}
	});
};




//********** DropdownAppraisal Year End *****************************//


$(document).ready(function(){
    	
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==true){
    	
		 
		    	 options={
		    			"colunms":[
		    			         
		    			           {"colunmsDisplayName":"Year","width":"15%","id":"appraisal_year","colunmsType":"text"},
		    			           {"colunmsDisplayName":"Period","width":"15%","id":"period_no","colunmsType":"text"},
		    			           {"colunmsDisplayName":"Description","width":"20%","id":"appraisal_period_desc","colunmsType":"text"},
		    			           {"colunmsDisplayName":"Start Date","width":"20%","id":"start_date","colunmsType":"text"},
		    			           {"colunmsDisplayName":"End Date","width":"20%","id":"end_date","colunmsType":"text"},
		    			           {"colunmsDisplayName":"Edit Flag","width":"20%","id":"edit_flag","colunmsType":"hidden"}
		    			          ],
		    			"form":[{
		    	    				"label":"Year","inputType":"dropdown","default":"All",
		    	    				"id":"appraisal_year","width":"100px","url":""+restfulURL+"/"+serviceName+"/public/appraisal_period/appraisal_year_list"
		    	    				},
		    	    				{
		        	    				"label":"Appraisal Frequency","inputType":"dropdown",
		        	    				"id":"appraisal_frequency_id","width":"100px","url":""+restfulURL+"/"+serviceName+"/public/appraisal_period/add_frequency_list","required":true
		        	    				
		    	    				},
		    	    			    {
		    	    				"label":"Period","inputType":"text","placeholder":"Period",
		    	        			"id":"period_no","width":"100px","dataTypeInput":"number","required":true
		    	    					
		    	    				},
		    	    			    {
		    	    				"label":"Description","inputType":"text","placeholder":"Description",
		    	    				"id":"appraisal_period_desc","width":"250px","required":true
		    	    				},
		    	    			    {
		    	    				"label":"Start Date","inputType":"date","placeholder":"Start Date",
		    	    				"id":"start_date","width":"200px","required":true
		    	    				},
		    	    			    {
		    	    				"label":"End Date","inputType":"date","placeholder":"End Date",
		    	    				"id":"end_date","width":"200px","required":true
		    	    				}
		    	    					
		    	    			],
		    	    			
		    	    	"advanceSearch":[{
		    	 					"label":"Appraisal Year","label_tooltip":"Appraisal Year","inputType":"dropdown",
		    	 					"id":"appraisal_year","width":"100%",
		    	 					"url":""+restfulURL+"/"+serviceName+"/public/appraisal_period/appraisal_year_list"
		    	 					},{
		        	 				"label":"Description","label_tooltip":"Description","inputType":"text","placeholder":"Description",
		        	 				"id":"appraisal_period_desc","width":"100%","default":"",
		        	 				"url":""+restfulURL+"/"+serviceName+"/public/appraisal_period/auto_desc"
		        				    },],
		    	    			
		    	    		
		    	    			
		    	    			
		    			 "formDetail":{"formSize":"modal-dialog","formName":"Appraisal Period","id":"appraisalPeriod","pk_id":"period_id"},       
		    			 "serviceName":[restfulURL+"/"+serviceName+"/public/appraisal_period"],
		    			 "tokenID":tokenID,
		    			 "pagignation":false,
		    			 "expressSearch":false,
		    			 "advanceSearchSet":true,
		    			 "btnAdvanceSearchOption":{"id":"btnCreate","name":"<i class=\"fa fa-plus-square\"></i>&nbsp;Appraisal Period(System)"}
		    	}
		    	//console.log(options['tokenID'].token);
		    	createDataTableFn(options);
		    	
		    	 //setTimeout(function(){
		
		    		 	$("#advanceSearchArea  #appraisal_year").val($("#advanceSearchParamArea  #appraisal_year  option:eq(1)").val());
		        	 	//$("#btnAdd").click(function(){
			        	//$(document).off('click','#btnAdd');
			        	$(document).on('click','#btnAdd',function(){
			        		 $("form#appraisalPeriod  #appraisal_year").val($("form#appraisalPeriod  #appraisal_year option:eq(1)").val());
			        	 });
			        	
			        	$("#btnAdd").html("<i class=\"fa fa-plus-square\"></i><span id=\"btnAddData\">&nbsp;Appraisal Period(Manual)</span>");
		    	 //},500);
		    	
		    	
		    	//auto complete start
		   
		    	$("#advanceSearchArea  #appraisal_period_desc").autocomplete({
		            source: function (request, response) {
		            	$.ajax({
		    				 url:restfulURL+"/"+serviceName+"/public/appraisal_period/auto_desc",
		    				 type:"post",
		    				 dataType:"json",
		    				 headers:{Authorization:"Bearer "+tokenID.token},
		    				 data:{"appraisal_period_desc":request.term},
		    				 //async:false,
		                     error: function (xhr, textStatus, errorThrown) {
		                            console.log('Error: ' + xhr.responseText);
		                        },
		    				 success:function(data){
		    						response($.map(data, function (item) {
		                                return {
		                                    label:item.appraisal_period_desc,
		                                    value:item.appraisal_period_desc
		                                };
		                            }));
		    				},
		    				beforeSend:function(){
		    					$("body").mLoading('hide');	
		    				}
		    				
		    				});
		            }
		        });
		    	//auto complete end	
		    	
		    	//create Appraisal bath start
		    	
		    	$(document).on('click','#btnCreate',function(){
		    		clearAppraisalPeriodFn();
		     		DropdownAppraisalYear();
		     		DropdownStartYear();
		     		DropdowStartMonth();
		     		DropdowAppraisalFrequency();
		     		DropdowBonusFrequency();
		     		DropdowSalaryRaiseFrequency();
		     		$("#Modalcreate").modal();
		     		
		     		$("#btnAppPeriod").click(function(){
		     			
		     			createAppraisalPeriodFn();
		     			
		     		});
		     		
		     			 			
		    	});
    	
	 	}
	 }
	//binding tooltip start
	 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
	 $('[data-toggle="tooltip"]').tooltip({
		 html:true
	 });
	//binding tooltip end
    });