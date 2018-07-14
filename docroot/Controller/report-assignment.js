 var restfulPathDashboard="/"+serviceName+"/public/cds_result"; 
 var galbalDashboard=[];
 var galbalDataTemp = [];
 var changeAutocomplete=true;
 var mobileStatus=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
 var galbalOrgID=[];
 var orgArray=[];
 var currentUrl = document.URL;
 galbalDataTemp['protocol']=currentUrl.split(":")[0]+"://";
 galbalDataTemp['galbalOrg'] = [];
 galbalDataTemp['extract'] = false;
 galbalDataTemp['All_KPI'] = {};
 galbalDataTemp['collapse_show']="";
 galbalDataTemp['click'];

// console.log(url.split(":")[0]);
//# Generate Drop Down List
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
 			try {
 			    if(Object.keys(data[0])[0] != undefined && Object.keys(data[0])[0] == "item_id"){
 			    	galbalDataTemp["item_id"] = [];
 			    	$.each(data,function(index,indexEntry){
 			    		galbalDataTemp["item_id"].push(indexEntry[Object.keys(indexEntry)[0]]);
 		 			});	
 			    }
 			}
 			catch(err) {
 			    console.log("Error item_id : "+err.message);
 			}

 			
 			$.each(data,function(index,indexEntry){
 				html+="<option value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1] == undefined  ?  Object.keys(indexEntry)[0]:Object.keys(indexEntry)[1]]+"</option>";	
 			});	

 		}
 	});	
 	return html;
 };
 var generateAutocomplete = function(id,url,type,requests){
	 $(id).autocomplete({
	        source: function (request, response) {
	        	requests[Object.keys(requests)] = request.term;
	        	$.ajax({
					 url:url,
					 type:type,
					 dataType:"json",
					 data:requests,
					//async:false,
					 headers:{Authorization:"Bearer "+tokenID.token},
	                 error: function (xhr, textStatus, errorThrown) {
	                        console.log('Error: ' + xhr.responseText);
	                    },
					 success:function(data){
						  
							response($.map(data, function (item) {
	                            return {
	                                label: item[Object.keys(item)[1]],
	                                value: item[Object.keys(item)[1]],
	                                value_id : item[Object.keys(item)[0]]
	                                
	                            };
	                        }));
						
					},
					beforeSend:function(){
						$("body").mLoading('hide');	
					}
					
					});
	        },
			select:function(event, ui) {
				$(id).val(ui.item.value);
	            $(id+"_id").val(ui.item.value_id);
	            changeAutocomplete = true;
	            $("#kpi").html((generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/kpi_list","POST",{"appraisal_level":$("#apprasiaLevel").val(),"org_id":$("#organization").val(),"emp_id":$("#emp_name_id").val(),"appraisal_type_id":$("#app_type").val()})));
	            galbalDataTemp[id] = ui.item.label;
	            galbalDataTemp[id+"_id"]=ui.item.value_id;
	            return false;
	        },change: function(e, ui) {  

	 
				if ($(id).val() == galbalDataTemp[id]) {
					$(id+"_id").val(galbalDataTemp[id+"_id"]);
					changeAutocomplete = true;
				}  else if (ui.item != null){
					$(id+"_id").val(ui.item.value_id);
					changeAutocomplete = true;
				}else {
					$(id+"_id").val("");
					if(changeAutocomplete == true){
						$("#kpi").html((generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/kpi_list","POST",{
							"period":$("#period").val(),
							"level_id":($("#app_type").val() == 1 ? $("#AppraisalEmpLevel").val() : $("#AppraisalOrgLevel").val()),
							"org_id":$("#organization").val(),
							})));
						
						changeAutocomplete = false;
					}
					
				}
				
	         }
	    });
};


var getOrgFn = function(data){
	galbalDataTemp['galbalOrg'] = [];
	var tempOrg=[];
	try {
		tempOrg = data[5]['org'];
		
		}
		catch(err) {
		    console.log(err.message);
		    tempOrg = data[0]['org'];
		}
	  if(tempOrg!=undefined){
	   $.each(tempOrg,function(index,indexEntry){
		   
		galbalDataTemp['galbalOrg'].push({"org_id":indexEntry['org_id'],"org_name":indexEntry['org']});
	    //console.log(indexEntry['org']);
	   });
	   
	   listHeaderFn(galbalDataTemp['galbalOrg']);
	  }
	  
};
var getOrgFn = function(dataOrg,data){
	 
	 galbalDataTemp['galbalOrg'] = [];
	 galbalOrgID=[];
	 
	 if(data[0]['org']!=undefined){
	  
	     $.each(data[0]['org'],function(index,indexEntry){   
	    var orgId = index.split("_");
	    orgId = orgId[1];
	    galbalOrgID.push(orgId);

	     });
	   
	     $.each(galbalOrgID,function(index,indexEntry){   
	   galbalDataTemp['galbalOrg'].push({"org_id":indexEntry,"org_name":dataOrg["id_"+indexEntry]});
	     });
	 
	     listHeaderFn(galbalDataTemp['galbalOrg']);	    
	 }  			
};
var setScrollFn = function () {
	$("#scrollOrg *").scrollTop(0).scrollLeft(0);
	$('#subTableKPI1 , #subTableKPI2').css('margin-top', "0");
	$("#subTableKPI1").html($("#tableAllKPI1 > thead").clone()).show();
	$("#subTableKPI2").html($("#tableAllKPI2 > thead").clone()).show(); 
	 if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		 //"touchmove"
		 //"touchend"
		 $("#scrollOrg *").unbind( "touchmove , scroll" );
		 $('#scrollSubOrg2').bind('touchmove', function(e) { 
				console.log("Org2 "+$(this).scrollTop()); // Replace this with your code.
				$("#scrollSubOrg3").unbind( "scroll" );
			    $("#scrollSubOrg2").bind("scroll", function() {
			            
								    var offset = $(this).scrollTop();
								    //console.log(offset);
								    $('#scrollSubOrg3').scrollTop(offset);
							        $('#subTableKPI1').css('margin-top', offset);
							        $('#subTableKPI2').css('margin-top', offset);

								});
				});	
		 $('#scrollSubOrg3').bind('touchmove', function(e) { 
				console.log("Org3 "+$(this).scrollTop()); // Replace this with your code.
				 $("#scrollSubOrg2").unbind("scroll");
				 $("#scrollSubOrg3").bind("scroll", function() {
					var offset = $(this).scrollTop();
				    $('#scrollSubOrg2').scrollTop(offset);
					$('#subTableKPI1').css('margin-top', offset);
					$('#subTableKPI2').css('margin-top', offset);
				 	});
				});	
	 }else{
		 $("#scrollOrg *").unbind( "mouseenter , mouseleave, scroll" );
			$( "#scrollSubOrg1" ).bind({
			  mouseenter: function() {
			   
			    //console.log("in");
			    $("#scrollSubOrg3").unbind( "scroll" );
			    $("#scrollSubOrg2").bind("scroll", function() {
			            
								    var offset = $(this).scrollTop();
								    //console.log(offset);
								    $('#scrollSubOrg3').scrollTop(offset);
							        $('#subTableKPI1').css('margin-top', offset);
							        $('#subTableKPI2').css('margin-top', offset);

								});
			    
			    
			  },
			  mouseleave: function() {
			    $("#scrollSubOrg2").unbind("scroll");
			    //console.log("out");
			    $("#scrollSubOrg3").bind("scroll", function() {
			             //$("#scrollSubOrg2").unbind( "scroll" );
								    var offset = $(this).scrollTop();
			         
								    $('#scrollSubOrg2').scrollTop(offset);
							        $('#subTableKPI1').css('margin-top', offset);
							        $('#subTableKPI2').css('margin-top', offset);

								});
			  }
			});
			$("#scrollSubOrg3").bind("scroll", function() {
								    var offset = $(this).scrollTop();
			         
								    $('#scrollSubOrg2').scrollTop(offset);
							        $('#subTableKPI1').css('margin-top', offset);
							        $('#subTableKPI2').css('margin-top', offset);

								});
	 }
	
}
var getDataFn2 = function() {
	var year= $("#year").val();
	var period= $("#period").val();
	var app_lv= $("#AppraisalEmpLevel").val();
	var app_lv_org= $("#AppraisalOrgLevel").val();
	var org= $("#organization").val();

	var parameter = {
			param_year: year,
			param_period: period,
			param_level_emp: app_lv,
			param_level_org: app_lv_org,
			param_org_id: org,
			
	}
	var data = JSON.stringify(parameter);
	
	//$('#iFrame_report').attr('src',url_report_jasper);
	var url_report_jasper = restfulURL+"/"+serviceName+"/public/generate?template_name=kpiapus&template_format=xls&used_connection=1&inline=1&data="+data;
	window.open(url_report_jasper,"_blank");
	return false;
};
 
var listHeaderFn=function(galbalOrg){
	 var htmlHeader1 = "";
	 var htmlHeader2 = "";
	 var htmlHeaderMain = "";
	 var htmlHeaderSummary1 = "";
	 var htmlHeaderSummary2 = "";
	 var org= ($("#param_emp").val() == "" ? $("#param_org_id").val() :$("#param_emp").val());
	 htmlHeader1+="<th style='width:120px;'>";
	 htmlHeader1+="<div class='fontBold '> Perspective</div>";
	 htmlHeader1+="</th>";
	 
	 htmlHeader1+="<th style='width:237px;'>";
	 htmlHeader1+="<div class='fontBold '>KPI</div>";
	 htmlHeader1+="</th>";
	 
	 htmlHeader1+="<th style='width:73px;'>";
	 htmlHeader1+="<div class='fontBold '>UOM</div>";
	 htmlHeader1+="</th>";
	 
	 $.each(galbalOrg,function(index,indexEntry){
	  //console.log(indexEntry);
	  if(indexEntry['org_id']==org){
	   htmlHeaderMain+="<th style='min-width:325px;'>";
	    htmlHeaderMain+="<div class='fontBold fontCenter'>"+indexEntry['org_name']+"</div>";
	   htmlHeaderMain+="</th>";
	  }else{
	   htmlHeader2+="<th style='min-width:325px;'>";
	    htmlHeader2+="<div class='fontBold fontCenter'>"+indexEntry['org_name']+"</div>";
	   htmlHeader2+="</th>";
	  }
	 });
	 htmlHeaderSummary1+=htmlHeader1;
	 htmlHeaderSummary1+=htmlHeaderMain;
	 htmlHeaderSummary2+=htmlHeader2;
	 $("#listHeader1").html(htmlHeaderSummary1);
	 $("#listHeader2").html(htmlHeaderSummary2);
	 
	 
};

var listDashBoardFn = function(data){
	 
	 $("#accordion").empty();
	 $("#accordion").hide();
	 var org= $("#param_org_id").val();
	 var emp= $("#param_emp").val();
	 
	 var html = "";
	 if(emp == ""){
		 $.each(data , function(inedx,indexEntry){
			 if(org == indexEntry['org_id'] ){
				 html+=generateAccordionHTML(indexEntry,"group1","org");
				 return false;
			 };
			 
		 });
		 $.each(data , function(inedx,indexEntry){
			 if(org != indexEntry['org_id']){
				 html+=generateAccordionHTML(indexEntry,"","org");
			 };
		 });
	 }else{
		 $.each(data , function(inedx,indexEntry){
			 if(emp == indexEntry['emp_id'] ){
				 html+=generateAccordionHTML(indexEntry,"group1","emp");
				 return false;
			 };
			 
		 });
		 $.each(data , function(inedx,indexEntry){
			 if(emp != indexEntry['emp_id']){
				 html+=generateAccordionHTML(indexEntry,"emp");
			 };
		 }); 
	 }
	 
	 
	 $("#accordion").html(html);
	 
	 
	 $.each(data , function(inedx,indexEntry){
//		 generateChartGaugeFn(indexEntry);
//		 generateChartBarFn(indexEntry);
		 $.when(
				 generateChartGaugeFn(indexEntry,(emp == "" ? "org" :"emp")),
				 indexEntry['chart_type'] == "yearly" ? 
						 generateChartBarLineDualFn(indexEntry,(emp == "" ? "org" :"emp")) : 
						 generateChartBarLineAreaFn(indexEntry,(emp == "" ? "org" :"emp"))
				).then(function() {
				    //console.log(inedx+" Loading Chart: Success");
		});
	 });
	 

		// Add minus icon for collapse element which is open by default
	    $(".collapse.in").each(function(){
	    	$(this).siblings(".panel-heading").find(".fa").addClass("fa-caret-down").removeClass("fa-caret-right");
	    });
	    
	    // Toggle plus minus icon on show hide of collapse element
	    $(".collapse").on('show.bs.collapse', function(){
	    	$(this).prev().css({"background": "#"+tokenID.theme_color});
	    	$(this).parent().css({"border-color": "#"+tokenID.theme_color});
	    	$(this).parent().find(".fa").removeClass("fa-caret-right").addClass("fa-caret-down");
	    	$("#btn_kpi").find(".fa").removeClass("fa-caret-down").addClass("fa-table");
	    }).on('hide.bs.collapse', function(){
	    	$(this).parent().css({"border-color": "#c5c5c5"});
	    	$(this).prev().css({"background": "#f6f6f6"});
	    	$(this).parent().find(".fa").removeClass("fa-caret-down").addClass("fa-caret-right");
	    	$("#btn_kpi").find(".fa").removeClass("fa-caret-right").addClass("fa-table");
	    });


	    //Open Parent Org

			$("#next , #previous").off("click");
			$("#next , #previous").on("click",function() {
				  //console.log("Next KPI : "+$(this).attr("data-next"));
							galbalDataTemp['collapse_show'] = $(".collapse.in").get();///Memory Collapse Show
							
							$("#param_kpi_id").val($(this).attr("data-"+this.id));
							$("#kpi").val($(this).attr("data-"+this.id));
							//console.log($(this).attr("data-"+this.id));
							getDataFn();

				  			$("#accordion").show();
				  			$("#accordion").children().children().next().eq(0).collapse('show');
				  			$.each(galbalDataTemp['collapse_show'],function(index,indexEntry){
				  				$("#"+this.id).collapse('show');
				  			});
				  			return false;
				  
				});
			
			$("#btn_extract").off("click");
			$("#btn_extract").click(function(event){
				  event.stopPropagation();
				  if(galbalDataTemp['extract'] == true){
					  //console.log(galbalDataTemp['extract']);
				    $("#btn_extract").find(".fa").removeClass("fa-minus-square").addClass("fa-plus-square");
				    
				    $("#accordion").children().children().next().collapse('hide');
				    galbalDataTemp['extract'] = false;
				  }
				  else if(galbalDataTemp['extract'] == false){
					  //console.log(galbalDataTemp['extract']);
					  $("#btn_extract").find(".fa").removeClass("fa-plus-square").addClass("fa-minus-square");
					  $("#btn_kpi").find(".fa").removeClass("fa-plus-square").addClass("fa-table");
					    $("#accordion").children().children().next().collapse('show');
					    galbalDataTemp['extract'] = true;
				  }
				});
			$("#btn_kpi").off("click");
			$("#btn_kpi").click(function(event){
				  event.stopPropagation();
				  event.preventDefault();
				  //$("#ModalKPI").modal('hide');
				  getDataKPIFn();
				  
				  $("body").mLoading();
				  
//				  document.body.scrollTop = 0;
//				  document.documentElement.scrollTop = 0;
				  $('html, body').animate({
				        scrollTop: $("#ModalKPI").offset().top
				    }, 0);
				  

				  
				  //https://localhost/"+serviceName+"/public/dashboard/all_content
				});
			$( "#accordion" ).sortable({
				 // revert: true
				 items: '.sortableItem:not(#orgParent)'
				});
			$('#accordion').disableSelection();
 };

var dropDownKpi = function(){

	 $("#kpi").html((generateDropDownList(
			restfulURL+"/"+serviceName+"/public/dashboard/kpi_list",
			"POST",{
			"period":$("#period").val(),			
			"appraisal_level":($("#app_type").val() == 1 ? $("#AppraisalOrgLevel").val() : $("#AppraisalEmpLevel").val()),
			"org_id":$("#organization").val(),
			"emp_id":$("#emp_name_id").val(), 
//			"position_id":$("#position_id").val()
			})));
}

var CreateOrgWhitEmpLevelOrgLevel = function(){
	if(galbalDataTemp["#emp_name_id"]==undefined) { var emp_id = ""; } else { var emp_id = galbalDataTemp["#emp_name_id"]; }
	//console.log(emp_id)
	$("#organization").html( generateDropDownList(
		restfulURL+"/"+serviceName+"/public/appraisal/parameter/org_individual",
		"GET",
		{"emp_level":$("#AppraisalEmpLevel").val(),"org_level":$("#AppraisalOrgLevel").val()//, "emp_id":emp_id//,"period_id": $("#period").val()
			
		}
	));
}

var CreateOrgLevelWhitEmpLevel = function(){
	$("#AppraisalOrgLevel").html(generateDropDownList(
		restfulURL+"/"+serviceName+"/public/appraisal/parameter/org_level_individual",
		"GET",
		{"level_id": $("#AppraisalEmpLevel").val()//,"period_id": $("#period").val()
			
		}
	));
}




 $(document).ready(function(){
	var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==false){
	 		return false;
	 	}
		 
		 var dataClearParam = [
				{'id':'#position', 'val': ""},
				{'id':'#position_id', 'val': ""},
				{'id':'#emp_name', 'val': ""},
				{'id':'#emp_name_id', 'val': ""}
			];
		 
		 var dataSetParam = [
				{'id':'#position', 'val': ""+cMain_position_name+""},
				{'id':'#position_id', 'val': cMain_position_id},
				{'id':'#emp_name', 'val': ""+cMain_emp_name+""},
				{'id':'#emp_name_id', 'val': cMain_emp_id},
				{'id':'#AppraisalEmpLevel', 'val': ""+cMain_level_id+""}
			];
		 
	 	$(".advance-search input").val("");
	 	
	 	$("#btnSearchAdvance").click(function(){
	 		getDataFn2();
		});
	 	
	 	
	 	//Generate DropDown List
	 	if($("#get_sending_status").val() == "true" && $("#get_sending_status").val() != null){
	 		$("#year").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/appraisal/year_list_assignment","GET"));
			$("#year").val($("#get_year_id").val());
			$("#period").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/period_list","POST",{"appraisal_year":$("#year").val()}));
			$("#period").val($("#get_period_id").val());
			
//			$("#app_type").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/appraisal_assignment/appraisal_type_list","GET"));
//			$("#app_type").val($("#get_appraisal_type_id").val());
			
//			$("#emp_name").val($("#get_emp_name").val());
//			$("#emp_name_id").val($("#get_emp_id").val());
			
			$("#apprasiaLevel").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/appraisal/al_list","GET"));
			$("#apprasiaLevel").val($("#get_level_id").val());
			
			$("#organization").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/org_list","POST",{"appraisal_level":$("#apprasiaLevel").val()}));
			$("#organization").val($("#get_org_id").val());

			$("#kpi").html((generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/kpi_list","POST",{"appraisal_level":$("#apprasiaLevel").val(),"org_id":$("#organization").val(),"emp_id":$("#emp_name_id").val(),"appraisal_type_id":$("#app_type").val()})));

	
			$("#btnSearchAdvance").click();
			$("#get_sending_status").val("false");
			//#Change Param Function
			$("#year").change(function(){$("#period").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/period_list","POST",{"appraisal_year":$("#year").val()}));});
			$("#apprasiaLevel").change(function(){$("#organization").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/org_list","POST",{"appraisal_level":$("#apprasiaLevel").val()}));$("#organization").change();});
			$("#organization").change(function(){console.log("organization change");$("#kpi").html((generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/kpi_list","POST",{"appraisal_level":$("#apprasiaLevel").val(),"org_id":$("#organization").val(),"emp_id":$("#emp_name_id").val(),"appraisal_type_id":$("#app_type").val()})));});
		}else{
		
			

			
			/**
			 * Generate DropDown List.
			 */
			$("#year").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/appraisal/year_list_assignment","GET"));			
			$("#app_type").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/appraisal_assignment/appraisal_type_list","GET"));
			
			
			
			/**
			 * Change Parameter Function.
			 */
			// Change on #year for create #period
			$("#year").change(function(){$("#period").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/period_list","POST",{"appraisal_year":$("#year").val()}));});
			$("#period").change(function(){
				dropDownKpi();
			});
			
					// Create #AppraisalOrgLevel
					$("#AppraisalOrgLevel").html( generateDropDownList(
						restfulURL+"/"+serviceName+"/public/appraisal/parameter/org_level",
						"GET")
					);
					
					$("#organization").html( generateDropDownList(
						restfulURL+"/"+serviceName+"/public/dashboard/org_list",
						"POST",
						{"appraisal_level":$("#AppraisalOrgLevel").val()}
					));
				
					dropDownKpi(); // Create #kpi	
					// Create #
					$("#AppraisalEmpLevel").prop("disabled", false).html( generateDropDownList(
						restfulURL+"/"+serviceName+"/public/appraisal/parameter/emp_level",
						"GET"
					));
					
					
					CreateOrgLevelWhitEmpLevel(); // Create #AppraisalOrgLevel (cascade -> #)
					CreateOrgWhitEmpLevelOrgLevel(); // Create #organization whit # and #AppraisalOrgLevel
					dropDownKpi(); // Create #kpi
//				}
//			});
			
			$("#AppraisalOrgLevel").change(function(){
				clearParamSearch(dataClearParam);// in cMain.js
				
				if($("#app_type").val() == "1"){
					// Create #organization whit #AppraisalOrgLevel
					$("#organization").html( generateDropDownList(
						restfulURL+"/"+serviceName+"/public/dashboard/org_list",
						"POST",
						{"appraisal_level":$("#AppraisalOrgLevel").val()}
					));
					
					dropDownKpi(); // Create #kpi
				} else {
					CreateOrgWhitEmpLevelOrgLevel(); // Create #organization whit # and #AppraisalOrgLevel
					dropDownKpi(); // Create #kpi
				}
			});
			
			$("#AppraisalEmpLevel").change(function(){
				clearParamSearch(dataClearParam);// in cMain.js
				CreateOrgLevelWhitEmpLevel(); // Create #AppraisalOrgLevel (cascade -> #)
				CreateOrgWhitEmpLevelOrgLevel(); // Create #organization whit # and #AppraisalOrgLevel
				dropDownKpi(); // Create #kpi
			});
			
			$("#organization").change(function(){
				clearParamSearch(dataClearParam);// in cMain.js
				dropDownKpi(); // Create #kpi
			});

			
			/**
			 * Change parameter event.
			 */
			$("#year").change(); // Change for create #period
//			$("#app_type").change(); // Change for create #apprasiaEmpLevel or #apprasiaOrgLevel -> #organization
			setParamSearch(dataSetParam);// in cMain.js
			
		}
		
		$(".app_url_hidden").show();
		
	
		//binding tooltip start
		 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
		 $('[data-toggle="tooltip"]').tooltip({
			 html:true
		 });
		//binding tooltip end
		 $(".lfr-hudcrumbs").removeClass("lfr-hudcrumbs");
		 
		 if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			    // is mobile..
			 //alert(navigator.userAgent);
			 $("#scrollSubOrg2").css({'max-height':500});
			 $("#scrollSubOrg1").css({'max-height':500});
			 $("#scrollSubOrg1").height(500);
			 $("#scrollSubOrg2").width(740);
			 
		 }
		 $(window).on('resize',function(){
			 var widthBody = $(" #scrollOrg").width();
			 var widthScrollSubOrg1 = $("#scrollSubOrg1").width()+20;
			 console.log("Resize \n widthBody : "+widthBody+"\n widthScrollSubOrg1 : "+widthScrollSubOrg1+"\n Total : "+(widthBody-widthScrollSubOrg1));
			 $("#scrollSubOrg3").width(widthBody-widthScrollSubOrg1);
		 });
	 }
 });