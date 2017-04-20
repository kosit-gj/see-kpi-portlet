//IP Server : 171.96.201.146
var restfulURL="http://171.96.200.20";
var restfulPathReport=":3001/api/tyw_report_score_bonus/";


//-------- SearchFn Start
var searchAdvanceFn = function (Year,BnPeriod,Department,PsGroup) {
	//embed parameter start
	var htmlParam="";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_Year' name='param_Year' value='"+Year+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_SalaryPeriod' name='param_BnPeriod' value='"+BnPeriod+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_Department' name='param_Department' value='"+Department+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_PsGroup' name='param_PsGroup' value='"+PsGroup+"'>";
	$(".paramEmbed").remove();
	$("body").append(htmlParam);
	//embed parameter end

	
	$.ajax({
		url : restfulURL+restfulPathReport,
		type : "get",
		dataType : "json",
//		data:{
/*		
		"department_ame":$("#param_Year").val(),
		"section_name":$("#param_BnPeriod").val(),
		"position_name":$("#param_Department").val(),
		"emp_name":$("#param_PsGroup").val(),*/

//		},
		//headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {

			listReportFn(data);
		}
	});
	
	
}
// -------- SearchFn End


//--------  ListData  Start

var listReportFn = function(data) {

	//clear ฟังก์ชัน  data ข้อมูลเก่าทิ้ง 
	$("#listDataReport").empty();
	
	var htmlTable = "";
	var htmlFootTable = "";
	var saraly=[];
	var sumSaraly=0;
	var totalSaraly=[];
	var sumTotalSaraly=0;

	$.each(data,function(index,indexEntry) {
		//console.log();

		
		htmlTable += "<tr class='rowSearch'>";
		htmlTable += "<td class='columnSearch'>"+(index+1)+ "</td>";
		htmlTable += "<td class='columnSearch'>"+indexEntry["description"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+indexEntry["performance_score"]+"</td>";
		htmlTable += "<td class='objectCenter'>"+indexEntry["total_performance_score"]+"</td>";
		htmlTable += "<td class='objectCenter'>"+indexEntry["saraly"]+"</td>";
		htmlTable += "<td class='objectCenter'>"+indexEntry["bonus"]+"</td>";
		htmlTable += "<td class='objectCenter'>"+indexEntry["total_saraly"]+"</td>";
		htmlTable += "</tr>";
		
		saraly[index]=indexEntry["saraly"];
		totalSaraly[index]=indexEntry["total_saraly"];
		
	});
	$.each(saraly,function(index){
		sumSaraly += saraly[index];
	});
	$.each(totalSaraly,function(index){
		sumTotalSaraly += totalSaraly[index];
	});
	function addCommas(nStr)
	{
	    nStr += '';
	    x = nStr.split('.');
	    x1 = x[0];
	    x2 = x.length > 1 ? '.' + x[1] : '';
	    var rgx = /(\d+)(\d{3})/;
	    while (rgx.test(x1)) {
	        x1 = x1.replace(rgx, '$1' + ',' + '$2');
	    }
	    return x1 + x2;
	}
	
	htmlFootTable += "<tr class='rowSearch'>";
	htmlFootTable += "<td class='objectCenter' colspan=\"3\"><h3>รวมทั้งสิ้น</h3></td>";
	htmlFootTable += "<td class='objectCenter'></td>";
	htmlFootTable += "<td class='objectCenter'><h4>"+sumSaraly+"</h4></td>";
	htmlFootTable += "<td class='objectCenter'></td>";
	htmlFootTable += "<td class='objectCenter'><h4>"+sumTotalSaraly+"</h4></td>";
	htmlFootTable += "</tr>";
	
	//alert("ผ่าน");
	$("#listDataReport").html(htmlTable);
	$("#footDataReport").html(htmlFootTable);
	
	
}
//--------  ListData  End




//DropDownList Year
var dropDownListYear = function(){
	var html="";
	html+="<select data-toggle=\"tooltip\" title=\"Year\" class=\"input form-control input-sm\" id=\"paramYear\" name=\"paramYear\" >";
	//html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+":3001/api/tyw_year/" ,
		type:"get" ,
		dataType:"json" ,
		//headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){
					html+="<option  value="+indexEntry["year"]+">"+indexEntry["year"]+"</option>";	
			});	
		}
	});	
	html+="</select>";
	return html;
};

//DropDownList BnPeriod
var dropDownListBnPeriod = function(year){
	//console.log("Year : "+year);
	var html="";
	html+="<select data-toggle=\"tooltip\" title=\"Bonus Period\" class=\"input form-control input-sm\" id=\"paramBnPeriod\" name=\"paramBnPeriod\" >";
	//html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+":3001/api/tyw_year/" ,
		type:"get" ,
		dataType:"json" ,
		//data:{"year":year},
		//headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			if(year == "2017"){
				html+="<option  value=\""+"งวดที่ 1"+"\">"+"งวดที่ 1"+"</option>";
				html+="<option  value=\""+"งวดที่ 2"+"\">"+"งวดที่ 2"+"</option>";
				html+="<option  value=\""+"งวดที่ 3"+"\">"+"งวดที่ 3"+"</option>";
				html+="<option  value=\""+"งวดที่ 4"+"\">"+"งวดที่ 4"+"</option>";
				html+="<option  value=\""+"งวดที่ 5"+"\">"+"งวดที่ 5"+"</option>";
			}else{
				html+="<option  value=\""+"งวดที่ 1"+"\">"+"งวดที่ 1"+"</option>";
				html+="<option  value=\""+"งวดที่ 2"+"\">"+"งวดที่ 2"+"</option>";
				html+="<option  value=\""+"งวดที่ 3"+"\">"+"งวดที่ 3"+"</option>";

			}
/*			$.each(data,function(index,indexEntry){
					html+="<option  value="+indexEntry["year"]+">"+indexEntry["year"]+"</option>";	
			});	*/
		}
	});	
	html+="</select>";
	return html;
};


//DropDownList Department
var dropDownListDepartment = function(){
	var html="";
	html+="<select data-toggle=\"tooltip\" title=\"Department\" class=\"input form-control input-sm\" id=\"paramDepartment\" name=\"paramDepartment\" >";
	html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+":3001/api/tyw_import_employee/" ,
		type:"get" ,
		dataType:"json" ,
		//headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){
				html+="<option  value="+indexEntry["department_ame"]+">"+indexEntry["department_ame"]+"</option>";		
			});	
		}
	});	
	html+="</select>";
	return html;
};

//DropDownList PsGroup
var dropDownListPsGroup = function(){
	var html="";
	html+="<select data-toggle=\"tooltip\" title=\"Position Group\" class=\"input form-control input-sm\" id=\"paramPsGroup\" name=\"paramPsGroup\" >";
	html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+":3001/api/tyw_import_employee/" ,
		type:"get" ,
		dataType:"json" ,
		//headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){
				html+="<option  value="+indexEntry["position_group"]+">"+indexEntry["position_group"]+"</option>";		
			});	
		}
	});	
	html+="</select>";
	return html;
};


$(document).ready(function() {
	$("#dropDownListYear").html(dropDownListYear());
	$("#dropDownListBnPeriod").html(dropDownListBnPeriod($("#paramYear").val()));
	$("#dropDownListDepartment").html(dropDownListDepartment());
	$("#dropDownListPsGroup").html(dropDownListPsGroup());
	
	$("#paramYear").change(function(){  
		$("#dropDownListBnPeriod").html(dropDownListBnPeriod($("#paramYear").val()));
	});
	
	$("#btnSearchAdvance").click(function(){
		searchAdvanceFn(
				$("#paramYear").val(),
				$("#paramBnPeriod").val(),
				$("#paramDepartment").val(),
				$("#paramPsGroup").val()
				);
		document.getElementById('txtParamYear').innerHTML = $("#paramYear").val();
		document.getElementById('txtParamBnPeriod').innerHTML = $("#paramBnPeriod").val();

		return false;
	});
	$("#btnSearchAdvance").click();
		
	
	
	
});