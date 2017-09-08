//binding tooltip.
var golbalData=[];
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});


var dropDownListBranchLocal = function(){
	$.ajax({			
		url:restfulURL+"/dqs_api/public/dqs_monitoring/branch_list",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			
		checkMaintenanceFn(data);
		var html="";
		html+="<select class=\"form-control input-sm listBranch\" id=\"listBranch\">";
		html+="<option selected='selected'  value=''> All Branch</option>";
		
		$.each(data,function(index,indexEntry){
			
				html+="<option  value="+indexEntry["brcd"]+">"+indexEntry["desc"]+"</option>";	
					
		});	
		html+="</select>";
		$("#listBranchArea").html(html);
		
		}
		
	});
		

};


var listDataFn = function(data){
	
			 var htmlTable="";
			 $("#listMainUsageLog").empty();
			   $.each(data['group'],function(index,indexEntry){
				
				    htmlTable+="<tr>";
						htmlTable+="<td>";
							htmlTable+="<div class=\"ibox float-e-margins\">";
								htmlTable+="<div class=\"ibox-title\">";
									htmlTable+="<h5>Branch : "+index+"</h5>";
								htmlTable+="</div>";
								htmlTable+="<div class=\"ibox-content\" style='padding: 0 0px 0px;'>";
								//SUB TABLE HERE..
								
								htmlTable+="<table class=\"table\">";
								htmlTable+="<thead>";
									htmlTable+="<tr  class=\"active\">";
										htmlTable+="<th style='width:30px;'>No.</th>";
										htmlTable+="<th style='width:100px;'>Usage Date</th>";
										htmlTable+="<th style='width:80px;'>Personnel Id</th>";
										htmlTable+="<th style='width:100px;'>Personnel Name</th>";
										htmlTable+="<th style='width:400px;'>Menu</th>";
										
									htmlTable+="</tr>";
								htmlTable+="</thead>";
									htmlTable+="<tbody>";
									//LOOP START
									
									var count=1;
									 $.each(indexEntry['items'],function(index2,indexEntry2){
										htmlTable+="<tr>";
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2['seq']+"</div></td>";
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2['usage_dttm']+"</div></td>";
											htmlTable+=" <td><div class='text-inline-table'>"+indexEntry2['personnel_id']+"</div></td>";
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2['thai_full_name']+"</div></td>";  
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2['menu_name']+"  </div></td>";
											
										htmlTable+="</tr>";
										count++;
									});
									//LOOP END
								htmlTable+="</tbody>";
							htmlTable+=" </table>";
		                       //SUB TABLE HERE..
							
								htmlTable+="</div>";
							htmlTable+="</div>";
						htmlTable+="</td>";
					htmlTable+="</tr>";
					
			   });
				
			  $("#listMainUsageLog").html(htmlTable);
			  
			
			
			
	
};
var getDataFn = function(page,rpp){
	
	
	$.ajax({
		url : restfulURL+"/dqs_api/public/dqs_maintenance/usage_log",
		type : "get",
		dataType : "json",
		data:{"page":page,"rpp":rpp,
			"branch_code":$("#embedParamlistBranch").val(),"personnel_name":$("#embedParamPersonnelName").val(),"usage_start_date":$("#embedParamUsageStartDate").val(),"usage_end_date":$("#embedParamUsageEndDate").val()
			},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			//console.log(data);
			checkMaintenanceFn(data);
			listDataFn(data);
			golbalData=data;
			paginationSetUpFn(golbalData['current_page'],golbalData['last_page'],golbalData['last_page']);
			
			
		}
	});

	
};
var searchAdvance = function(){

	var htmlParameter="";
	htmlParameter+="<input type='hidden' id='embedParamlistBranch' name='embedParamlistBranch' class='embedParam' value='"+$("#listBranch").val()+"' >";
	htmlParameter+="<input type='hidden' id='embedParamPersonnelName' name='embedParamPersonnelName' class='embedParam' value='"+$("#personnel_name").val()+"' >";
	htmlParameter+="<input type='hidden' id='embedParamUsageStartDate' name='embedParamUsageStartDate' class='embedParam' value='"+$("#usage_start_date").val()+"' >";
	htmlParameter+="<input type='hidden' id='embedParamUsageEndDate' name='embedParamUsageEndDate' class='embedParam' value='"+$("#usage_end_date").val()+"' >";
	$(".embedParam").remove();
	$("body").append(htmlParameter);
	//getDataFn();
	getDataFn(1,$("#rpp").val());
}



$(document).ready(function(){
	
	dropDownListBranchLocal();
	
	//parameter date start
	$("#usage_start_date").datepicker();
    $("#usage_start_date").datepicker( "option", "dateFormat", "yy-mm-dd" );
    //$("#usage_start_date").val(firstDayInMonthFn());
    
    $("#usage_end_date").datepicker();
    $("#usage_end_date").datepicker( "option", "dateFormat", "yy-mm-dd" );
   // $("#usage_end_date").val(currentDateFn());
    
    $(".ui-datepicker").hide();
	//parameter date end
    

	
	
	//Search Data Here..
	$("#btnSearchAdvance").click(function(){
		searchAdvance();
		$(".display_result").show();
	});
	//$("#btnSearchAdvance").click();
	//Search Data Here..
	
	//Auto Complete personnelID start
	$("#personnel_name").autocomplete({
        source: function (request, response) {
        	 $.ajax({
				    url:restfulURL+"/dqs_api/public/dqs_maintenance/personnel_name",
				    type:"post",
				    dataType:"json",
					headers:{Authorization:"Bearer "+tokenID.token},
					data:{"q":request.term},
					//async:false,
                    error: function (xhr, textStatus, errorThrown) {
                    	console.log('Error: ' + xhr.responseText);
                    },
				    success:function(data){
					checkMaintenanceFn(data);
						response($.map(data, function (item) {
                            return {
                                label: item.thai_full_name,
                                value: item.thai_full_name
                               
                            }
                        }));
					
				    },
					beforeSend:function(){
						$("body").mLoading('hide');	
					}
				   });
        	
        }
    });
	
	//Export
	$("#exportToExcel").click(function(){
		
		var param="";
		param+="&branch_code="+$("#embedParamlistBranch").val();
		param+="&personnel_name="+$("#embedParamPersonnelName").val();
		param+="&usage_start_date="+$("#embedParamUsageStartDate").val();
		param+="&usage_end_date="+$("#embedParamUsageEndDate").val();
		
		$("form#formExportToExcel ").attr("action",restfulURL+"/dqs_api/public/dqs_maintenance/usage_log/export?token="+tokenID.token+""+param);
		$("form#formExportToExcel ").submit();
	});
	
	
});