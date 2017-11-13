var username = $('#user_portlet').val();
var emp_code=username;
var emp_code="2";
var password = $('#pass_portlet').val();
var run_number = 0;
var ex_data = [{
	 "perspective_name":"Financial",
	 "appraisal_item_name":"01.NTS - Net Trade Sales",
  "employee":[{
            "emp_code": "33261-128",
           "emp_name": "Dorian Sprigings",
           "target": 13,
           "actual": 4,
           "score": 2,
           "proformance": 97
         }, {
           "emp_code": "55316-173",
           "emp_name": "Burtie Tomsu",
           "target": 10,
           "actual": 1,
           "score": 4,
           "proformance": 8
         }, {
           "emp_code": "54575-366",
           "emp_name": "Normand McConway",
           "target": 10,
           "actual": 4,
           "score": 4,
           "proformance": 46
         }, {
           "emp_code": "21695-945",
           "emp_name": "Cornela Kasting",
           "target": 15,
           "actual": 2,
           "score": 3,
           "proformance": 72
         }]
         },{
	 "perspective_name":"Financial",
	 "appraisal_item_name":"02.NI - Net Income",
  "employee":[{
           "emp_code": "0078-0311",
           "emp_name": "Nicky Glaister",
           "target": 13,
           "actual": 3,
           "score": 2,
           "proformance": 43
         }, {
           "emp_code": "35356-968",
           "emp_name": "Deedee Scardifield",
           "target": 13,
           "actual": 2,
           "score": 2,
           "proformance": 98
         }]
 },{
	 "perspective_name":"Financial",
	 "appraisal_item_name":"03.GP - Gross Profit",
  "employee":[{
           "emp_code": "54868-5926",
           "emp_name": "Reinhold Braam",
           "target": 11,
           "actual": 1,
           "score": 4,
           "proformance": 26
         }]
 },{
	 "perspective_name":"Financial",
	 "appraisal_item_name":"04.% to NTS (GP - Gross Profit)",
  "employee":[{
           "emp_code": "0722-6920",
           "emp_name": "Tarra Parkin",
           "target": 12,
           "actual": 3,
           "score": 4,
           "proformance": 94
         }, {
           "emp_code": "0093-2204",
           "emp_name": "Bryn Fabri",
           "target": 14,
           "actual": 4,
           "score": 4,
           "proformance": 90
         }, {
           "emp_code": "68405-880",
           "emp_name": "Emmott Dyster",
           "target": 15,
           "actual": 4,
           "score": 2,
           "proformance": 55
         }]
 },{
	 "perspective_name":"Financial",
	 "appraisal_item_name":"05.% to NTS (SG&A - Sel...nd Administrative Exp.).",
  "employee":[{
           "emp_code": "16590-346",
           "emp_name": "Wernher Quillinane",
           "target": 14,
           "actual": 1,
           "score": 3,
           "proformance": 80
         }]
 },{
	 "perspective_name":"Financial",
	 "appraisal_item_name":"06.Credit Limit Control",
  "employee":[{
           "emp_code": "51514-0322",
           "emp_name": "Stacee Harriman",
           "target": 8,
           "actual": 3,
           "score": 1,
           "proformance": 75
         }, {
           "emp_code": "64980-301",
           "emp_name": "Ortensia Rossi",
           "target": 10,
           "actual": 1,
           "score": 1,
           "proformance": 72
         }, {
           "emp_code": "24385-188",
           "emp_name": "Benjy Spaven",
           "target": 9,
           "actual": 3,
           "score": 1,
           "proformance": 93
         }]
 },{
	 "perspective_name":"Internal  Business Process",
	 "appraisal_item_name":"01.NTS - Net Trade Sales",
  "employee":[{
            "emp_code": "33261-128",
           "emp_name": "Dorian Sprigings",
           "target": 13,
           "actual": 4,
           "score": 2,
           "proformance": 97
         }, {
           "emp_code": "55316-173",
           "emp_name": "Burtie Tomsu",
           "target": 10,
           "actual": 1,
           "score": 4,
           "proformance": 8
         }, {
           "emp_code": "54575-366",
           "emp_name": "Normand McConway",
           "target": 10,
           "actual": 4,
           "score": 4,
           "proformance": 46
         }, {
           "emp_code": "21695-945",
           "emp_name": "Cornela Kasting",
           "target": 15,
           "actual": 2,
           "score": 3,
           "proformance": 72
         }]
         },{
	 "perspective_name":"Internal  Business Process",
	 "appraisal_item_name":"02.NI - Net Income",
  "employee":[{
           "emp_code": "0078-0311",
           "emp_name": "Nicky Glaister",
           "target": 13,
           "actual": 3,
           "score": 2,
           "proformance": 43
         }, {
           "emp_code": "35356-968",
           "emp_name": "Deedee Scardifield",
           "target": 13,
           "actual": 2,
           "score": 2,
           "proformance": 98
         }]
 },{
	 "perspective_name":"Internal  Business Process",
	 "appraisal_item_name":"03.GP - Gross Profit",
  "employee":[{
           "emp_code": "54868-5926",
           "emp_name": "Reinhold Braam",
           "target": 11,
           "actual": 1,
           "score": 4,
           "proformance": 26
         }]
 },{
	 "perspective_name":"Internal  Business Process",
	 "appraisal_item_name":"04.% to NTS (GP - Gross Profit)",
  "employee":[{
           "emp_code": "0722-6920",
           "emp_name": "Tarra Parkin",
           "target": 12,
           "actual": 3,
           "score": 4,
           "proformance": 94
         }, {
           "emp_code": "0093-2204",
           "emp_name": "Bryn Fabri",
           "target": 14,
           "actual": 4,
           "score": 4,
           "proformance": 90
         }, {
           "emp_code": "68405-880",
           "emp_name": "Emmott Dyster",
           "target": 15,
           "actual": 4,
           "score": 2,
           "proformance": 55
         }]
 },{
	 "perspective_name":"Internal  Business Process",
	 "appraisal_item_name":"05.% to NTS (SG&A - Sel...nd Administrative Exp.).",
  "employee":[{
           "emp_code": "16590-346",
           "emp_name": "Wernher Quillinane",
           "target": 14,
           "actual": 1,
           "score": 3,
           "proformance": 80
         }]
 },{
	 "perspective_name":"Internal  Business Process",
	 "appraisal_item_name":"06.Credit Limit Control",
  "employee":[{
           "emp_code": "51514-0322",
           "emp_name": "Stacee Harriman",
           "target": 8,
           "actual": 3,
           "score": 1,
           "proformance": 75
         }, {
           "emp_code": "64980-301",
           "emp_name": "Ortensia Rossi",
           "target": 10,
           "actual": 1,
           "score": 1,
           "proformance": 72
         }, {
           "emp_code": "24385-188",
           "emp_name": "Benjy Spaven",
           "target": 9,
           "actual": 3,
           "score": 1,
           "proformance": 93
         }]
 }
 ];
var ex_data2 = [{
	"emp_name" : "Benjy Spaven",
	"data" : [ {
		"apprasal_structure" : "KPI(CWN)",
		"from_type" : 1,
		"score" : 1.83
	}, {
		"apprasal_structure" : "ICSP",
		"from_type" : 2,
		"score" : 0.32
	}, {
		"apprasal_structure" : "F/C",
		"from_type" : 3,
		"score" : -0.62
	}, {
		"apprasal_structure" : "PI",
		"from_type" : 2,
		"score" : 0.61
	}, {
		"apprasal_structure" : "T/A",
		"from_type" : 3,
		"score" : -0.57
	}, {
		"apprasal_structure" : "Total",
		"from_type" : 0,
		"score" : 3.21
	}, {
		"apprasal_structure" : "proformance",
		"from_type" : 0,
		"score" : 1
	} ]
}, {
	"emp_name" : "Benjy Spaven2",
	"data" : [ {
		"apprasal_structure" : "KPI(CWN)",
		"from_type" : 1,
		"score" : 2.43
	}, {
		"apprasal_structure" : "ICSP",
		"from_type" : 2,
		"score" : 0.21
	}, {
		"apprasal_structure" : "F/C",
		"from_type" : 3,
		"score" : -1.23
	}, {
		"apprasal_structure" : "T/A",
		"from_type" : 3,
		"score" : -0.75
	}, {
		"apprasal_structure" : "Total",
		"from_type" : 0,
		"score" : 2.82
	}, {
		"apprasal_structure" : "proformance",
		"from_type" : 0,
		"score" : 2
	} ]
} ];
var ex_data3 = [{
	 "perspective_name":"Financial",
	 "appraisal_item_name":"01.NTS - Net Trade Sales",
"employee":[{
          "emp_code": "33261-128",
         "emp_name": "Dorian Sprigings",
         "target": 10,
         "actual": 4,
         "score": 4,"weight":35.00,"result": 1.40,"deduct":0,
         "proformance": 100
       }, {
         "emp_code": "55316-173",
         "emp_name": "Burtie Tomsu",
         "target": 10,
         "actual": 5,
         "score": 3,"weight":35.00,"result": 1.05,"deduct":-1,
         "proformance": 75
       }, {
         "emp_code": "54575-366",
         "emp_name": "Normand McConway",
         "target": 10,
         "actual": 4,
         "score": 2,"weight":35.00,"result": 0.70,"deduct":-2,
         "proformance": 50
       }]
       },{
	 "perspective_name":"Financial",
	 "appraisal_item_name":"02.NI - Net Income",
"employee":[{
         "emp_code": "0078-0311",
         "emp_name": "Nicky Glaister",
         "target": 13,
         "actual": 9,
         "score": 3,"weight":35.00,"result": 1.05,"deduct":-1,
         "proformance": 75
       }, {
         "emp_code": "35356-968",
         "emp_name": "Deedee Scardifield",
         "target": 13,
         "actual": 8,
         "score": 3,"weight":35.00,"result": 1.05,"deduct":-1,
         "proformance": 75
       },{
         "emp_code": "54868-5926",
         "emp_name": "Reinhold Braam",
         "target": 13,
         "actual": 1,
         "score": 1,"weight":35.00,"result": 0.35,"deduct":-3,
         "proformance": 20
       }]
},{
	 "perspective_name":"Financial",
	 "appraisal_item_name":"03.GP - Gross Profit",
"employee":[{
         "emp_code": "0722-6920",
         "emp_name": "Tarra Parkin",
         "target": 200,
         "actual": 250,
         "score": 4,"weight":35.00,"result": 1.40,"deduct":0,
         "proformance": 100
       }, {
         "emp_code": "0093-2204",
         "emp_name": "Bryn Fabri",
         "target": 200,
         "actual": 100,
         "score": 2,"weight":35.00,"result": 0.70,"deduct":-3,
         "proformance": 50
       }, {
         "emp_code": "68405-880",
         "emp_name": "Emmott Dyster",
         "target": 200,
         "actual": 111,
         "score": 2,"weight":35.00,"result": 0.70,"deduct":-4,
         "proformance": 50
       }]
},{
	 "perspective_name":"Internal  Business Process",
	 "appraisal_item_name":"01.NTS - Net Trade Sales",
"employee":[{
          "emp_code": "33261-128",
         "emp_name": "Dorian Sprigings",
         "target": 10,
         "actual": 4,
         "score": 4,"weight":35.00,"result": 1.40,"deduct":0,
         "proformance": 100
       }, {
         "emp_code": "55316-173",
         "emp_name": "Burtie Tomsu",
         "target": 10,
         "actual": 5,
         "score": 3,"weight":35.00,"result": 1.05,"deduct":-2,
         "proformance": 75
       }, {
         "emp_code": "54575-366",
         "emp_name": "Normand McConway",
         "target": 10,
         "actual": 4,
         "score": 2,"weight":35.00,"result": 0.70,"deduct":-2,
         "proformance": 50
       }]
       },{
	 "perspective_name":"Internal  Business Process",
	 "appraisal_item_name":"02.NI - Net Income",
"employee":[{
         "emp_code": "0078-0311",
         "emp_name": "Nicky Glaister",
         "target": 13,
         "actual": 9,
         "score": 3,"weight":35.00,"result": 1.05,"deduct":-1,
         "proformance": 75
       }, {
         "emp_code": "35356-968",
         "emp_name": "Deedee Scardifield",
         "target": 13,
         "actual": 8,
         "score": 3,"weight":35.00,"result": 1.05,"deduct":-2,
         "proformance": 75
       },{
         "emp_code": "54868-5926",
         "emp_name": "Reinhold Braam",
         "target": 13,
         "actual": 1,
         "score": 1,"weight":35.00,"result": 0.35,"deduct":-2,
         "proformance": 20
       }]
},{
	 "perspective_name":"Internal  Business Process",
	 "appraisal_item_name":"03.GP - Gross Profit",
"employee":[{
         "emp_code": "0722-6920",
         "emp_name": "Tarra Parkin",
         "target": 200,
         "actual": 250,
         "score": 4,"weight":35.00,"result": 1.40,"deduct":0,
         "proformance": 100
       }, {
         "emp_code": "0093-2204",
         "emp_name": "Bryn Fabri",
         "target": 200,
         "actual": 100,
         "score": 2,"weight":35.00,"result": 0.70,"deduct":-1,
         "proformance": 50
       }, {
         "emp_code": "68405-880",
         "emp_name": "Emmott Dyster",
         "target": 200,
         "actual": 111,
         "score": 2,"weight":35.00,"result": 0.70,"deduct":-1,
         "proformance": 50
       }]
}
];

var getEmpListFn = function(){
	//http://192.168.1.58/"+serviceName+"/public/dashboard/emp_list?emp_code=2007004
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/dashboard/emp_list",
		type:"post",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"emp_code":emp_code},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
			
					htmlOption+="<option value="+indexEntry['emp_code']+">"+indexEntry['emp_name']+"</option>";
					
			});
			$("#paramEmp").html(htmlOption);
		}
	});	
}
var yearListFn = function(){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/dashboard/year_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
			
					htmlOption+="<option value="+indexEntry['appraisal_year']+">"+indexEntry['appraisal_year']+"</option>";
					
			});
			$("#paramYear").html(htmlOption);
		}
	});
}
var monthListFn = function(appraisal_year){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/dashboard/month_list",
		type:"post",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"appraisal_year":appraisal_year},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
					//alert(indexEntry['"period_id']);
					//console.log(indexEntry['period_id']);
					htmlOption+="<option value='"+indexEntry['period_id']+"'>"+indexEntry['monthname']+"</option>";
					
				
			});
			$("#paramMonth").html(htmlOption);
			$("#paramAppraisal_year").html(appraisal_year);
		}
	});
}
var getDataUninuqe = function(object,key){

	var dataObject = [];
	$.each(object,function(index,indexEntry){

		if(jQuery.inArray(indexEntry[key],dataObject) == -1){
			
			dataObject.push(indexEntry[key]);
		}
	});

	return dataObject;
	

}
var notNaNFn = function(paramNumber){
	var number=0;
	
	if(paramNumber == 'NaN' ||  paramNumber == null || paramNumber == 'null'){
		number= 0.00;
	}else{
		number=paramNumber;
	}
	
	return number;
}
var ballStatusFn = function(paramScore){
	var ball="";
	if(paramScore==1){
		ball="<div class='ballStatus' style='background-color:red;'><span style='padding-left:6px;'>1</span></div>";
	}else if(paramScore==2){
		ball="<div class='ballStatus' style='background-color:orange;' ><span style='padding-left:6px;'>2</span></div>";
	}else if(paramScore==3){
		ball="<div class='ballStatus' style='background-color:yellow;' ><span style='padding-left:6px;'>3</span></div>";
	}else if(paramScore==4){
		ball="<div class='ballStatus' style='background-color:#00ff00;' ><span style='padding-left:6px;'>4</span></div>";
	}else if(paramScore==5){
		ball="<div class='ballStatus' style='background-color:#2aad2a;' ><span style='padding-left:6px;'>5</span></div>";
	}else{
		ball="<div class='ballStatus' style='background-color:#dddddd;' ></div>";
	}
	return ball;
	
	
}
var listApprasalStricture = function(data){
	var tableTheadHtml = '';
	var tableTbodyHtml = '';
	var feildsHeader=[];
	//alert(data[0]["data"].length);
	var num;
	if(run_number%2 == 0){num=1;}else{num=0;}
	tableTheadHtml += "<tr><th class='' rowspan='2' class='objectCenter' style='width:20%;min-width:250px;text-align:center;vertical-align: middle;' >Employee</th>";
	tableTheadHtml += "	<th class='' colspan='"+data[num]["data"].length+"' style='width: auto; text-align: center;'>Apprasal Structure</th> </tr>";
	console.log(data[num]["data"]);	/* Loop	*/
	$.each(data[num]["data"],function(index,indexEntry){
		if(index < data[num]["data"].length-1){
		if(indexEntry["apprasal_structure"] != "Total"){
		tableTheadHtml += "<th id='fieldNumberOfRight'>"+indexEntry["apprasal_structure"]+"</th>";
		}else{
			tableTheadHtml += "<th colspan='2' id='fieldNumberOfRight'>"+indexEntry["apprasal_structure"]+"</th>";}
		}
		feildsHeader.push(indexEntry["apprasal_structure"]);
	});										
	
	//tableTheadHtml += "	<th id='fieldNumberOfRight'>Total </th>";			
	tableTheadHtml += "</tr> ";
	/* Loop Tbody */
	tableTbodyHtml += "<tr> ";
	tableTbodyHtml += " <td style='vertical-align: middle;font-weight: 800;'>"+data[num]["emp_name"]+"</td>";	
	$.each( data[num]["data"],function(index,indexEntry){
		
		console.log(index);
		if(index == data[num]["data"].length-1){
			tableTbodyHtml+="   <td style='width:25px;'>"+ballStatusFn(indexEntry['score'])+"</td>";
		}else if(index == data[num]["data"].length-2){
			tableTbodyHtml += " <td id='fieldNumberOfRight'><span class='text-totol'>"+indexEntry["score"]+" <i class='fa fa-bolt'></i></span></td>";	

		}else if( indexEntry["score"] == 0){
			tableTbodyHtml += " <td id='fieldNumberOfRight'><span class='text-zero'> <i class='fa fa-sort'></i> "+indexEntry["score"]+"</span></td>";	
		}else if( indexEntry["score"] > 0){
			tableTbodyHtml += " <td id='fieldNumberOfRight'><span class='number-up'> <i class='fa fa-caret-up'></i> "+indexEntry["score"]+"</span></td>";	
		}else if( indexEntry["score"] < 0){
			tableTbodyHtml += " <td id='fieldNumberOfRight'><span class='number-down'> <i class='fa fa-caret-down'></i> "+indexEntry["score"]+"</span></td>";	
		}
		
	});
	tableTbodyHtml += "</tr> ";
	
	console.log(feildsHeader);
	$("#listHeadAppraisalStructure").html(tableTheadHtml);
	$("#listAppraisalStructure").html(tableTbodyHtml);
	
	
}
var listQuantityBalanceScorecardHTML = function(data){
	//$("#accordion").empty();
	console.log(data);
	run_number+=1;
	var txtdata= "KPI";
	 var perspective_name = getDataUninuqe(data,'perspective_name');
	 console.log(perspective_name);
	
	var accordionHtml = "";
	accordionHtml += "<div class='panel panel-default'>";		
	accordionHtml += "	<div class='panel-heading' role='tab' id='heading_"+run_number+"'>";
	accordionHtml += "		<h4 class='panel-title'>";
	accordionHtml += "			 <a class='collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#collapse_"+run_number+"' aria-expanded='false' aria-controls='collapse_"+run_number+"' style='color: black;font-weight: bold;'>";
	accordionHtml += "<span class='fa fa-chevron-up'></span> "+txtdata;	
	accordionHtml += "			</a>";	
	accordionHtml += "		</h4>";	
	accordionHtml += "	</div>";	
	accordionHtml += "	<div id='collapse_"+run_number+"' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading_"+run_number+"'>";	
	accordionHtml += "		<div class='panel-body'>";
	accordionHtml += "	<div class='row-fluid'>";
	accordionHtml += "		<div class='span12'>";
	accordionHtml += "			<div class='ibox float-e-margins'>";
	accordionHtml += "				<div class='ibox-title'>";
	accordionHtml += "					<div class='titlePanelSearch2'>Balance Scorecard</div>";
	accordionHtml += "				</div>";
	accordionHtml += "				<div class='ibox-content' >";
	$.each(perspective_name, function (index,indexEntry){
		accordionHtml+=" <div class='title2 yellow2'>";
		accordionHtml+="	<div class='titleL'>"+indexEntry+"</div>";
		accordionHtml+=" 	<br style='clear:both'>";
		accordionHtml+=" </div>";
		accordionHtml += "<div class='table-responsive' style='overflow:auto'>";
		accordionHtml += "<table class='table table-hover'>";
		accordionHtml += "	<thead>";
		accordionHtml += "	<tr>";
		accordionHtml += "	<th style='width:25%;min-width:310px;' class='text-bold'>KPI Name&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>";
		accordionHtml += "	<th style='min-width: 200px;'>Employee</th>";
		accordionHtml += "	<th id='fieldNumberOfRight'>Target</th>";
		accordionHtml += "	<th id='fieldNumberOfRight'>Actual</th>";
		accordionHtml += "	<th id='fieldNumberOfRight' >Score</th>";
		accordionHtml += "	<th id='fieldNumberOfRight' >% Weight</th>";
		accordionHtml += "	<th id='fieldNumberOfRight' >Result</th>";
		accordionHtml += "	<th style='width: 30%;'>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>";																		
		accordionHtml += "	</tr>";
		accordionHtml += "	</thead>";
//		LoopData
		$.each(data,function(index2,indexEntry2){
			if(indexEntry==indexEntry2['perspective_name']){
			accordionHtml += "<tbody>";
			
			$.each(indexEntry2['employee'],function(index3,indexEntry3){
				accordionHtml += "	<tr>";
				if(index3 ==  0){
					accordionHtml += "		<td rowspan='"+indexEntry2['employee'].length+"' style='vertical-align: top;'class='text-bold'>"+indexEntry2['appraisal_item_name']+"</td>";
				}
				accordionHtml += " 		<td style='vertical-align: middle;' class='text-bold'>"+indexEntry3['emp_name']+"</td>";
				accordionHtml += " 		<td id='fieldNumberOfRight'><span class='number-bold'>"+indexEntry3['target']+"</span></td>";
				accordionHtml += " 		<td id='fieldNumberOfRight'><span class='number-bold'>"+indexEntry3['actual']+"</span></td>";
				accordionHtml += " 		<td id='fieldNumberOfRight' class='number-bold'>"+indexEntry3['score']+"</td>";
				accordionHtml += " 		<td id='fieldNumberOfRight' class='number-bold'>"+indexEntry3['weight']+"</td>";
				accordionHtml += " 		<td id='fieldNumberOfRight' class='number-bold'>"+indexEntry3['result']+"</td>";
				accordionHtml += " 		<td id='fieldNumberOfRight' >";
				if( index2 % 2 == 0){
					accordionHtml += " 	<div class='progress progress-striped progress-success active'>";
					accordionHtml += " 	  <div class='bar' style='width: "+indexEntry3['result']*100/4+"%;'>"+indexEntry3['result']+"/4</div>";
					accordionHtml += " 	</div>";
				}
				else{
					accordionHtml += " 	<div class='progress progress-striped  active'>";
					accordionHtml += " 	  <div class='bar' style='width: "+indexEntry3['result']*100/4+"%;'>"+indexEntry3['result']+"/4</div>";
					accordionHtml += " 	</div>";
				}
				accordionHtml += " 		</td>";		
				
				accordionHtml+="	</tr>"; 
			});
			accordionHtml +="</tbody>";
			

				}
		});
//		LoopData	
		accordionHtml += "</table>";
		accordionHtml += "</div>";
	});
	
	accordionHtml += "						</div>";
	accordionHtml += "					</div>";
	accordionHtml += "				</div>";
	accordionHtml += "			</div>";
	accordionHtml += "		</div>";	
	accordionHtml += "	</div>";	
	accordionHtml += "</div>";
	$("#accordion").append(accordionHtml);
	
}
var listQualityBalanceScorecardHTML = function(data){
	//$("#accordion").empty();
	//console.log(data);
	run_number+=1;
	var txtdata= "ICSP";
	 var perspective_name = getDataUninuqe(data,'perspective_name');
	 console.log(perspective_name);
	
	var accordionHtml = "";
	accordionHtml += "<div class='panel panel-default'>";		
	accordionHtml += "	<div class='panel-heading' role='tab' id='heading_"+run_number+"'>";
	accordionHtml += "		<h4 class='panel-title'>";
	accordionHtml += "			 <a class='collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#collapse_"+run_number+"' aria-expanded='false' aria-controls='collapse_"+run_number+"' style='color: black;font-weight: bold;'>";
	accordionHtml += "<span class='fa fa-chevron-up'></span> "+txtdata;	
	accordionHtml += "			</a>";	
	accordionHtml += "		</h4>";	
	accordionHtml += "	</div>";	
	accordionHtml += "	<div id='collapse_"+run_number+"' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading_"+run_number+"'>";	
	accordionHtml += "		<div class='panel-body'>";
	accordionHtml += "	<div class='row-fluid'>";
	accordionHtml += "		<div class='span12'>";
	accordionHtml += "			<div class='ibox float-e-margins'>";
	accordionHtml += "				<div class='ibox-title'>";
	accordionHtml += "					<div class='titlePanelSearch2'>Balance Scorecard</div>";
	accordionHtml += "				</div>";
	accordionHtml += "				<div class='ibox-content' >";
	//$.each(perspective_name, function (index,indexEntry){

		accordionHtml += "<div class='table-responsive' style='overflow:auto'>";
		accordionHtml += "<table class='table table-hover'>";
		accordionHtml += "	<thead>";
		accordionHtml += "	<tr>";
		accordionHtml += "	<th style='width:25%;min-width:310px;' class='text-bold'>KPI Name&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>";
		accordionHtml += "	<th style='min-width: 200px;'>Employee</th>";
		accordionHtml += "	<th id='fieldNumberOfRight'>Target</th>";
		accordionHtml += "	<th id='fieldNumberOfRight' >Score</th>";
		accordionHtml += "	<th id='fieldNumberOfRight' >% Weight</th>";
		accordionHtml += "	<th id='fieldNumberOfRight' >Result</th>";
		accordionHtml += "	<th style='width: 30%;'>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>";																		
		accordionHtml += "	</tr>";
		accordionHtml += "	</thead>";
//		LoopData
		$.each(data,function(index2,indexEntry2){
			//if(indexEntry==indexEntry2['perspective_name']){
			accordionHtml += "<tbody>";
			
			$.each(indexEntry2['employee'],function(index3,indexEntry3){
				accordionHtml += "	<tr>";
				if(index3 ==  0){
					accordionHtml += "		<td rowspan='"+indexEntry2['employee'].length+"' style='vertical-align: middle;'class='text-bold'>"+indexEntry2['appraisal_item_name']+"</td>";
				}
				accordionHtml += " 		<td style='vertical-align: top;' class='text-bold'>"+indexEntry3['emp_name']+"</td>";
				accordionHtml += " 		<td id='fieldNumberOfRight'><span class='number-bold'>"+indexEntry3['target']+"</span></td>";
				accordionHtml += " 		<td id='fieldNumberOfRight' class='number-bold'>"+indexEntry3['score']+"</td>";
				accordionHtml += " 		<td id='fieldNumberOfRight' class='number-bold'>"+indexEntry3['weight']+"</td>";
				accordionHtml += " 		<td id='fieldNumberOfRight' class='number-bold'>"+indexEntry3['result']+"</td>";
				accordionHtml += " 		<td id='fieldNumberOfRight' >";
				if( index2 % 2 == 0){
					accordionHtml += " 	<div class='progress progress-striped progress-success active'>";
					accordionHtml += " 	  <div class='bar' style='width: "+indexEntry3['result']*100/4+"%;'>"+indexEntry3['result']+"/4</div>";
					accordionHtml += " 	</div>";
				}
				else{
					accordionHtml += " 	<div class='progress progress-striped  active'>";
					accordionHtml += " 	  <div class='bar' style='width: "+indexEntry3['result']*100/4+"%;'>"+indexEntry3['result']+"/4</div>";
					accordionHtml += " 	</div>";
				}
				accordionHtml += " 		</td>";		
				
				accordionHtml+="	</tr>"; 
			});
			accordionHtml +="</tbody>";
			

				//}
		});
//		LoopData	
		accordionHtml += "</table>";
		accordionHtml += "</div>";
	//});
	
	accordionHtml += "						</div>";
	accordionHtml += "					</div>";
	accordionHtml += "				</div>";
	accordionHtml += "			</div>";
	accordionHtml += "		</div>";	
	accordionHtml += "	</div>";	
	accordionHtml += "</div>";
	$("#accordion").append(accordionHtml);
	
	
}

var listDeductBalanceScorecardHTML = function(data){
	run_number+=1;
	var txtdata= "F/C";
	 var perspective_name = getDataUninuqe(data,'perspective_name');
	 console.log(perspective_name);
	
	var accordionHtml = "";
	accordionHtml += "<div class='panel panel-default'>";		
	accordionHtml += "	<div class='panel-heading' role='tab' id='heading_"+run_number+"'>";
	accordionHtml += "		<h4 class='panel-title'>";
	accordionHtml += "			 <a class='collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#collapse_"+run_number+"' aria-expanded='false' aria-controls='collapse_"+run_number+"' style='color: black;font-weight: bold;'>";
	accordionHtml += "<span class='fa fa-chevron-up'></span> "+txtdata;	
	accordionHtml += "			</a>";	
	accordionHtml += "		</h4>";	
	accordionHtml += "	</div>";	
	accordionHtml += "	<div id='collapse_"+run_number+"' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading_"+run_number+"'>";	
	accordionHtml += "		<div class='panel-body'>";
	accordionHtml += "	<div class='row-fluid'>";
	accordionHtml += "		<div class='span12'>";
	accordionHtml += "			<div class='ibox float-e-margins'>";
	accordionHtml += "				<div class='ibox-title'>";
	accordionHtml += "					<div class='titlePanelSearch2'>Balance Scorecard</div>";
	accordionHtml += "				</div>";
	accordionHtml += "				<div class='ibox-content' >";
	//$.each(perspective_name, function (index,indexEntry){

		accordionHtml += "<div class='table-responsive' style='overflow:auto'>";
		accordionHtml += "<table class='table table-hover'>";
		accordionHtml += "	<thead>";
		accordionHtml += "	<tr>";
		accordionHtml += "	<th style='width:25%;min-width:310px;' class='text-bold'>KPI Name&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>";
		accordionHtml += "	<th style='min-width: 200px;'>Employee</th>";
		accordionHtml += "	<th id='fieldNumberOfRight'>Over Value</th>";
		accordionHtml += "	<th id='fieldNumberOfRight'>Deduct/Unit</th>";
		accordionHtml += "	<th id='fieldNumberOfRight' >Result</th>";
		accordionHtml += "	<th style='width: 30%;'>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>";																		
		accordionHtml += "	</tr>";
		accordionHtml += "	</thead>";
//		LoopData
		$.each(data,function(index2,indexEntry2){
			//if(indexEntry==indexEntry2['perspective_name']){
			accordionHtml += "<tbody>";
			
			$.each(indexEntry2['employee'],function(index3,indexEntry3){
				accordionHtml += "	<tr>";
				if(index3 ==  0){
					accordionHtml += "		<td rowspan='"+indexEntry2['employee'].length+"' style='vertical-align: middle;'class='text-bold'>"+indexEntry2['appraisal_item_name']+"</td>";
				}
				accordionHtml += " 		<td style='vertical-align: middle;' class='text-bold'>"+indexEntry3['emp_name']+"</td>";
				accordionHtml += " 		<td id='fieldNumberOfRight'><span class='number-bold'>"+indexEntry3['score']+"</span></td>";
				accordionHtml += " 		<td id='fieldNumberOfRight'><span class='number-bold'>"+indexEntry3['actual']+"</span></td>";
				accordionHtml += " 		<td id='fieldNumberOfRight' class='number-bold'>"+indexEntry3['deduct']+"</td>";
				accordionHtml += " 		<td id='fieldNumberOfRight' >";
				if( index2 % 2 == 0){
					accordionHtml += " 	<div class='progress progress-striped progress-success active'>";
					accordionHtml += " 	  <div class='bar' style='width: "+(100-Math.abs(indexEntry3['deduct'])*100/5)+"%;'>"+indexEntry3['deduct']+"</div>";
					accordionHtml += " 	</div>";
				}
				else{
					accordionHtml += " 	<div class='progress progress-striped  active'>";
					accordionHtml += " 	  <div class='bar' style='width: "+(100-Math.abs(indexEntry3['deduct'])*100/5)+"%;'>"+indexEntry3['deduct']+"</div>";
					accordionHtml += " 	</div>";
				}
				accordionHtml += " 		</td>";		
				
				accordionHtml+="	</tr>"; 
			});
			accordionHtml +="</tbody>";
			

				//}
		});
//		LoopData	
		accordionHtml += "</table>";
		accordionHtml += "</div>";
	//});
	
	accordionHtml += "						</div>";
	accordionHtml += "					</div>";
	accordionHtml += "				</div>";
	accordionHtml += "			</div>";
	accordionHtml += "		</div>";	
	accordionHtml += "	</div>";	
	accordionHtml += "</div>";
	$("#accordion").append(accordionHtml);
	
}

var listBalanceScorecardFn = function(data){
	
	var balanceScorecardHTML="";
	
	console.log(data);
	
	var perspective_name = getDataUninuqe(data,'perspective_name');
	
	console.log(perspective_name);
	
	$.each(perspective_name,function(index,indexEntry){
		//console.log(index);
		//console.log(indexEntry);
		
		balanceScorecardHTML+=" <div class='title2 yellow2'>";
		balanceScorecardHTML+="<div class='titleL'>"+indexEntry+"</div><div class='titleR'>Actual</div> ";
		balanceScorecardHTML+=" <br style='clear:both'>";
		balanceScorecardHTML+=" </div>";
		balanceScorecardHTML+=" <table class='table table-hover'>";
		balanceScorecardHTML+="<tbody>";
		
		$.each(data,function(index,indexEntry2){
			if(indexEntry==indexEntry2['perspective_name']){
//				console.log(indexEntry);
//				console.log(indexEntry2['appraisal_item_id']);
//				console.log(indexEntry2['appraisal_item_name']);
//				console.log(indexEntry2['target_value']);
//				console.log(indexEntry2['actual_value']);
				
				//var percentage=(parseInt(indexEntry2['actual_value'])/parseInt(indexEntry2['target_value'])*100).toFixed(2);
				
				
				balanceScorecardHTML+="<tr id='id-"+indexEntry2['appraisal_item_id']+"' class='clickable appraisalItem'>";
				balanceScorecardHTML+="<td>"+indexEntry2['appraisal_item_name']+"</td>";
				
				balanceScorecardHTML+="<td style='width:25px;'>"+ballStatusFn(indexEntry2['score'])+"</td>";
				
				//balanceScorecardHTML+="<td style='width:50px;'><div class='sparkline'>"+notNaNFn(parseInt(indexEntry2['target_value']))+","+notNaNFn(parseInt(indexEntry2['actual_value']))+",120,80,40</div></td>";
				
				
				balanceScorecardHTML+="<td style='width:50px;text-align:right; padding-right:5px;'>"+notNaNFn(addCommas(indexEntry2['actual_value']))+"</td>";
				balanceScorecardHTML+="</tr>";   
			}
			
		});
		balanceScorecardHTML+="</tbody>";
		balanceScorecardHTML+="</table>";
		//console.log("--------------------");
	});

	$("#ibox-content-bsc").html(balanceScorecardHTML);
	$("#ibox-content-bsc2").html(balanceScorecardHTML);
	
};

var getBalanceScorecardFn = function(period_id){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/dashboard/balance_scorecard",
		type:"post",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"emp_code":emp_code,"period_id":period_id},
		success:function(data){
			
			listBalanceScorecardFn(data);
			
		}
	});
}
createGraphMonthlyVarianceFn = function(data){
	option=[];
	option['cateRotate']=-30;
	//option['theme']=theme;
	//1#0075c2,2#62c78f,3#f3d965
	option['theme']=["#62c78f","#0075c2","#f3d965"];
	option['stackSeries']=false;
	option['tooltipTextColor']='black';
	option['location']='n';
	option['placement']='inside';
	option['title']="Monthly Variance";
	option['pointLabels']=true;
	option['pointLabelsFont']='10px';
	//show hide tooltip
	option['tooltip']=true;
	option['y2axis']='Bar';
	//option['barWidth']="12";
	
	$("#monthlyVariance").empty();
	lineChart("monthlyVariance",data,option);	
	/*
	$.jqplot('monthlyVariance', [
	                    [54551.94,15192.79,37937.26,11417.67,11799.59,18377.53,49207.82,168235.42,16654.29,62145.78],
	                    [132.19,2.99,6.09,50.38,1.44,4.41,25.25,3.37,68.60,2.14],
	                    [2.1,2,6,5,1,4.41,2.25,3.37,6.60,2.14]
	                ], {
	                seriesDefaults : {
	                    renderer : $.jqplot.BarRenderer,
	                    rendererOptions : {  
	                        highlightMouseOver : true,
	                        barWidth : 10
	                    }
	                },  
	                legend : {
	                    show : true,
	                    placement : 'outsideGrid'
	                },                  

	                axes : {                  
	                    xaxis : {
	                        renderer : $.jqplot.CategoryAxisRenderer,
	                        tickOptions : {
	                          angle : 45    
	                        },
	                        ticks : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
	                    },
	                    yaxis : {
	                        label : 'axis1',
	                        renderer : $.jqplot.LogAxisRenderer                        
	                    },
	        
	                    
	                    
	                },
	                series : [{
	                    yaxis : 'yaxis',
	                    label : 'dataForAxis1'
	                }, {
	                    yaxis : 'y2axis',
	                    label : 'dataForAxis2',
	                   
	                }, {
	                    yaxis : 'y3axis',
	                    label : 'dataForAxis3'
	                }]
	            });
	 */
	

	
}

getDataMonthlyVarianceFn = function(appraisal_year,appraisal_item_id){
	
	var appraisal_item_id =(appraisal_item_id == undefined || appraisal_item_id == ""  ? "" : appraisal_item_id);
	
	$.ajax({
		//url:"../Model/barChartMutiSeries.jsp",
		url:restfulURL+"/"+serviceName+"/public/dashboard/monthly_variance",
		type:"post",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"emp_code":emp_code,"appraisal_year":appraisal_year,"appraisal_item_id":appraisal_item_id},
		success:function(data){

			if(data==""){
				
				return false;
			}
			/*
			[["May","Hotel","200"],["June","Hotel","600"],["Junly","Hotel","700"],["Agust","Hotel","1000"],["Octember","Hotel","1000"],
			 ["May","Event Regristration","400"],["June","Event Regristration","210"],["Junly","Event Regristration","690"],["Agust","Event Regristration","820"],["Octember","Event Regristration","820"],
			 ["May","Airfare","260"],["June","Airfare","440"],["Junly","Airfare","320"],["Agust","Airfare","200"],["Octember","Airfare","200"]] 
			*/
			//console.log(data[0]);
			
			//var objFormat="[["+data[0]['substr(monthname(p.start_date),1,3)']+",\"Target\","+data[0]['target_value']+"]]";
			var objFormat="";
			var category="[{\"target_value\":\"Target\"},{\"actual_value\":\"Actual\"},{\"variance_value\":\"Variance\"}]";
			category = eval("("+category+")");
			objFormat+="[";
			$.each(category,function(index,indexEntry){
				if(index==0){
					objFormat+="[";
				}else{
					objFormat+=",[";
				}//Actual,Variance
//				console.log(index);
//				console.log(Object.keys(indexEntry)[0]);
//				console.log(indexEntry[Object.keys(indexEntry)]);
				$.each(data,function(index2,indexEntry2){
					if(index2==0){
						
					}else{
						objFormat+=",[";
					}//Actual,Variance
						objFormat+="\""+indexEntry2['substr(monthname(p.start_date),1,3)']+"\",\""+indexEntry[Object.keys(indexEntry)]+"\",\""+indexEntry2[Object.keys(indexEntry)[0]]+"\"";
					objFormat+="]";
				});
				
			});
				
			objFormat+="]";
			var json="";
			json+="[[\"May\",\"Hotel\",\"-200\"],[\"June\",\"Hotel\",\"600\"],[\"Junly\",\"Hotel\",\"700\"],[\"Agust\",\"Hotel\",\"1000\"],[\"Octember\",\"Hotel\",\"1000\"],";
			json+="[\"May\",\"Event Regristration\",\"-400\"],[\"June\",\"Event Regristration\",\"210\"],[\"Junly\",\"Event Regristration\",\"690\"],[\"Agust\",\"Event Regristration\",\"820\"],[\"Octember\",\"Event Regristration\",\"820\"],";
			json+="[\"May\",\"Airfare\",\"-260\"],[\"June\",\"Airfare\",\"440\"],[\"Junly\",\"Airfare\",\"320\"],[\"Agust\",\"Airfare\",\"200\"],[\"Octember\",\"Airfare\",\"200\"]]";

			//console.log(objFormat);
			var objJsonFormat = eval("("+objFormat+")");
			//var objJsonFormat = eval("("+json+")");
			//console.log(objJsonFormat);
			createGraphMonthlyVarianceFn(objJsonFormat);
			
		}
	});
}
var createGraphMonthlyGrowthFn = function(data){
//	option=[];
//	option['cateRotate']=-30;
//	option['theme']=theme;
//	option['stackSeries']=false;
//	option['tooltipTextColor']='white';
//	option['location']='e';
//	option['placement']='inside';
//	option['title']="Month";
//	option['pointLabels']=true;
//	option['pointLabelsFont']='13px';
//	//show hide tooltip
//	option['tooltip']=true;
//	option['barWidth']="15";	
//	barChart("monthlyGrowth",data,option);
//	
	option=[];
	option['cateRotate']=0;
	//option['theme']=theme;
	option['theme']=["#62c78f","#0075c2","#f3d965"];
	option['tooltipTextColor']='black';
	option['location']='n';
	option['placement']='inside';
	option['title']="Monthly Growth";
	option['pointLabels']=true;
	option['pointLabelsFont']='10px';
	//show hide tooltip
	option['tooltip']=true;
	//show y2axis
	option['y2axis']=true;
	$("#monthlyGrowth").empty();
	barLineChart("monthlyGrowth",data,option);	
	
}
getDataMonthlyGrowthFn = function(appraisal_year,appraisal_item_id){
	
	var appraisal_item_id =(appraisal_item_id == undefined || appraisal_item_id == ""  ? "" : appraisal_item_id);
	
	$.ajax({
		//url:"../Model/barChartMutiSeries.jsp",
		url:restfulURL+"/"+serviceName+"/public/dashboard/monthly_growth",
		type:"post",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"emp_code":emp_code,"appraisal_year":appraisal_year,"appraisal_item_id":appraisal_item_id},
		success:function(data){
			if(data==""){
				//alert("ok")
				return false;
			}
			var objFormat="";
			var category="[{\"pyear\":\"Previous Year\"},{\"cyear\":\"Actual\"},{\"growth_percent\":\"%Growth\"}]";
			category = eval("("+category+")");
			objFormat+="[";
			$.each(category,function(index,indexEntry){
				if(index==0){
					objFormat+="[";
				}else{
					objFormat+=",[";
				}//Actual,Variance
//				console.log(index);
//				console.log(Object.keys(indexEntry)[0]);
//				console.log(indexEntry[Object.keys(indexEntry)]);
				$.each(data,function(index2,indexEntry2){
					if(index2==0){
						
					}else{
						objFormat+=",[";
					}
						objFormat+="\""+indexEntry2['period_desc']+"\",\""+indexEntry[Object.keys(indexEntry)]+"\",\""+indexEntry2[Object.keys(indexEntry)[0]]+"\"";
					objFormat+="]";
				});
				
			});
				
			objFormat+="]";
			
			//console.log(objFormat);
			var objJsonFormat = eval("("+objFormat+")");
			createGraphMonthlyGrowthFn(objJsonFormat);
			
		}
	});
}



var createGraphYTDGrowthFn = function(data){
//	option=[];
//	option['cateRotate']=-30;
//	//option['theme']=theme;
//	option['theme']=["#62c78f","#0075c2","#f3d965"];
//	option['stackSeries']=false;
//	option['tooltipTextColor']='white';
//	option['location']='e';
//	option['placement']='inside';
//	option['title']="Month";
//	option['pointLabels']=true;
//	option['pointLabelsFont']='13px';
//	//show hide tooltip
//	option['tooltip']=true;
//	option['barWidth']="15";	
//	$("#ytdGrowth").empty();
//	
//	barChart("ytdGrowth",data,option);
	
	option=[];
	option['cateRotate']=0;
	option['theme']=["#62c78f","#0075c2","#f3d965"];
	option['tooltipTextColor']='black';
	option['location']='n';
	option['placement']='inside';
	option['title']="YTD Growth";
	option['pointLabels']=true;
	option['pointLabelsFont']='10px';
	//show hide tooltip
	option['tooltip']=true;
	//show y2axis
	option['y2axis']=true;
	$("#ytdGrowth").empty();
	barLineChart("ytdGrowth",data,option);	
	
}
getDataYTDGrowthFn = function(appraisal_year,appraisal_item_id){
	var appraisal_item_id =(appraisal_item_id == undefined || appraisal_item_id == ""  ? "" : appraisal_item_id);
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/dashboard/ytd_monthly_growth",
		type:"post",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"emp_code":emp_code,"appraisal_year":appraisal_year,"appraisal_item_id":appraisal_item_id},
		success:function(data){
			if(data==""){
				//alert("ok")
				return false;
			}
			var objFormat="";
			var category="[{\"pyear\":\"Previous Year\"},{\"cyear\":\"Actual\"},{\"growth_percent\":\"%Growth\"}]";
			category = eval("("+category+")");
			objFormat+="[";
			$.each(category,function(index,indexEntry){
				if(index==0){
					objFormat+="[";
				}else{
					objFormat+=",[";
				}//Actual,Variance
				$.each(data,function(index2,indexEntry2){
					if(index2==0){
						
					}else{
						objFormat+=",[";
					}
						objFormat+="\""+indexEntry2['period_desc']+"\",\""+indexEntry[Object.keys(indexEntry)]+"\",\""+indexEntry2[Object.keys(indexEntry)[0]]+"\"";
					objFormat+="]";
				});
				
			});
				
			objFormat+="]";
			
			//console.log(objFormat);
			var objJsonFormat = eval("("+objFormat+")");
			createGraphYTDGrowthFn(objJsonFormat);
			
		}
	});
}

var createGraphYTDVarianceFn = function(data){
	option=[];
	option['cateRotate']=-30;
	option['theme']=["#62c78f","#0075c2","#f3d965"];
	option['stackSeries']=false;
	option['tooltipTextColor']='black';
	option['location']='n';
	option['placement']='inside';
	option['title']="YTD Variance";
	option['pointLabels']=true;
	option['pointLabelsFont']='10px';
	//show hide tooltip
	option['tooltip']=true;
	//option['barWidth']="";	
	option['y2axis']='Bar';
	$("#ytdVariance").empty();
	barLineChart("ytdVariance",data,option);
}
getDataYTDVarianceFn = function(appraisal_year,appraisal_item_id){
	var appraisal_item_id =(appraisal_item_id == undefined || appraisal_item_id == ""  ? "" : appraisal_item_id);
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/dashboard/ytd_monthly_variance",
		type:"post",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"emp_code":emp_code,"appraisal_year":appraisal_year,"appraisal_item_id":appraisal_item_id},
		success:function(data){
			if(data==""){
				//alert("ok")
				return false;
			}
			var objFormat="";
			var category="[{\"target_value\":\"Target\"},{\"actual_value\":\"Actual\"},{\"variance_value\":\"Variance\"}]";
			category = eval("("+category+")");
			objFormat+="[";
			$.each(category,function(index,indexEntry){
				if(index==0){
					objFormat+="[";
				}else{
					objFormat+=",[";
				}//Target,Actual,Variance
			  
				$.each(data,function(index2,indexEntry2){
					if(index2==0){
						
					}else{
						objFormat+=",[";
					}
						objFormat+="\""+indexEntry2['month_name']+"\",\""+indexEntry[Object.keys(indexEntry)]+"\",\""+indexEntry2[Object.keys(indexEntry)[0]]+"\"";
					objFormat+="]";
				});
				
			});
				
			objFormat+="]";
			
			//console.log(objFormat);
			var objJsonFormat = eval("("+objFormat+")");
			createGraphYTDVarianceFn(objJsonFormat);
			
		}
	});
}
var bindingBulletFn = function(){
	$(".sparkline").sparkline('html', {
	    type: 'bullet',
	    targetColor: '#7d3f2d',
	    performanceColor: '#0075c2',
	    rangeColors: ['#62c78f','#f3d965','#e2855a']});
	
}

var getColorBall = function(position,color){
	var ballScoll="";
	if(position==1){
		ballScoll+="<div id=\"ball1\"  class=\"ball\" style=\"background-color:"+color+"\"></div>";
		ballScoll+="<div id=\"ball2\"  class=\"ball\" style=\"background-color:#cccccc\"></div>";
		ballScoll+="<div id=\"ball3\"  class=\"ball\" style=\"background-color:#cccccc\"></div>";

	}else if(position==2){
		ballScoll+="<div id=\"ball1\"  class=\"ball\" style=\"background-color:#cccccc\"></div>";
		ballScoll+="<div id=\"ball2\"  class=\"ball\" style=\"background-color:"+color+"\"></div>";
		ballScoll+="<div id=\"ball3\"  class=\"ball\" style=\"background-color:#cccccc\"></div>";
	}else if(position==3){
		ballScoll+="<div id=\"ball1\"  class=\"ball\" style=\"background-color:#cccccc\"></div>";
		ballScoll+="<div id=\"ball2\"  class=\"ball\" style=\"background-color:#cccccc\"></div>";
		ballScoll+="<div id=\"ball3\"  class=\"ball\" style=\"background-color:"+color+"\"></div>";
	}
	return  ballScoll;
}


$(document).ready(function(){
		

    
    
    
	
	
//	var username = getParamValue('username');
//	var password = getParamValue('password');
	
	/*Fixed for Test.*/
	// username = "1";
	// password =	"11";
	
	if(username!="" && username!=null & username!=[] && username!=undefined ){
		if(connectionServiceFn(username,password)==false){
			return false;
		}
	}
	
	
	
	
	
	yearListFn();
	//getEmpListFn();
	
	$("#paramYear").change(function(){
		monthListFn($(this).val());

	});
	$("#paramYear").change();
	
//	$("#paramMonth").change(function(){
//		getBalanceScorecardFn($(this).val());
//		bindingBulletFn();
//	});
//	$("#paramMonth").change();


	
	$(document).on("click",".appraisalItem",function(){
		
		$(".appraisalItem").removeClass("clicked");
		$(this).addClass("clicked");
		
//		$(".appraisalItem").removeAttr("bgcolor");
//		$(this).attr("bgcolor","#FF0000");
		
		$(".itemName").html($("td:first",this).text());
		
		var id = $(this).attr("id").split("-");
		id = id[1];
		$(".embed_appraisal_item_id").remove();
		$("body").append("<input type='hidden' id='embed_appraisal_item_id' class='embed_appraisal_item_id' name='embed_appraisal_item_id' value='"+id+"'>");
		
		
			
		getDataMonthlyVarianceFn($("#embedParamYear").val(),id);
		getDataMonthlyGrowthFn($("#embedParamYear").val(),id);
		getDataYTDVarianceFn($("#embedParamYear").val(),id);
		getDataYTDGrowthFn($("#embedParamYear").val(),id);
		
	
		
		
	});
	
	$("#YTD_tab").click(function(){
		getDataYTDVarianceFn($("#embedParamYear").val(),$("#embed_appraisal_item_id").val());
		getDataYTDGrowthFn($("#embedParamYear").val(),$("#embed_appraisal_item_id").val());
	});
	
	$("#Monthly_tab").click(function(){
		getDataMonthlyVarianceFn($("#embedParamYear").val(),$("#embed_appraisal_item_id").val());
		getDataMonthlyGrowthFn($("#embedParamYear").val(),$("#embed_appraisal_item_id").val());
	});
	
	
	$("#btnSearchAdvance").click(function(){
		 var paramHtml="";
		 paramHtml += "<input type='hidden' name='embedParamYear' id='embedParamYear' class='embedParam' value='"+$("#paramYear").val()+"'>";
		 paramHtml += "<input type='hidden' name='embedParamMonth' id='embedParamMonth' class='embedParam' value='"+$("#paramMonth").val()+"'>";
		$(".embedParam").remove();
		
		$("body").append(paramHtml);
		
		
		/*
		getBalanceScorecardFn($("#embedParamMonth").val());
//		setTimeout(function(){
//			bindingBulletFn();
//		},500);
		
		
		if(undefined==$("#embed_appraisal_item_id").val()){
			
			if($(".appraisalItem:first").attr("id")!=undefined){

				var id = $(".appraisalItem:first").attr("id").split("-");
				id = id[1];
				$(".embed_appraisal_item_id").remove();
				$("body").append("<input type='hidden' id='embed_appraisal_item_id' class='embed_appraisal_item_id' name='embed_appraisal_item_id' value='"+id+"'>");
				$(".itemName").html($(".appraisalItem:first td:first").text());
				
			}
		}
		
		
		getDataMonthlyVarianceFn($("#embedParamYear").val(),$("#embed_appraisal_item_id").val());
		getDataMonthlyGrowthFn($("#embedParamYear").val(),$("#embed_appraisal_item_id").val());
		getDataYTDVarianceFn($("#embedParamYear").val(),$("#embed_appraisal_item_id").val());
		getDataYTDGrowthFn($("#embedParamYear").val(),$("#embed_appraisal_item_id").val());
		*/
		$("#accordion").empty();
		listApprasalStricture(ex_data2);
		listQuantityBalanceScorecardHTML(ex_data3);
		listQualityBalanceScorecardHTML(ex_data3);
		listDeductBalanceScorecardHTML(ex_data3);
		
	    // Add minus icon for collapse element which is open by default
	    $(".collapse.in").each(function(){
	    	$(this).siblings(".panel-heading").find(".fa").addClass("fa-chevron-down").removeClass("fa-chevron-up");
	    });
	    
	    // Toggle plus minus icon on show hide of collapse element
	    $(".collapse").on('show.bs.collapse', function(){
	    	$(this).parent().find(".fa").removeClass("fa-chevron-up").addClass("fa-chevron-down");
	    }).on('hide.bs.collapse', function(){
	    	$(this).parent().find(".fa").removeClass("fa-chevron-down").addClass("fa-chevron-up");
	    });
		
		$(".ibox-content").show();
		
	});
	
	
	
	
	//check Orientation Start
	/*var getBrowserWidth = function(){
		if(window.innerWidth < 768){
			// Extra Small Device
			$("#btnSearchAdvance").click();
			
		} else if(window.innerWidth < 991){
			// Small Device
			$("#btnSearchAdvance").click();
			
		} else if(window.innerWidth < 1199){
			// Medium Device
			$("#btnSearchAdvance").click();
		
		} else {
			// Large Device
			$("#btnSearchAdvance").click();
	
		}
	};*/

	//getBrowserWidth();
	/*$(window).on('resize',function(){
		getBrowserWidth();
	});*/
	//check Orientation End
});