var galbalDataTemp=[]; 

$('.barChart').barChart({

	  // horizontal or vertical
	  type: 'horizontal',

	  // easing effect
	  easing: 'swing',

	  // animation speed
	  animationSpeed: 2000,

	  // row class
	  rowClass: 'barChart__row',

	  //  bar fill class
	  fillClass: 'barChart__barFill'
	  
	});

var getChartLine = function(){
	var dataArr = [];	
	if($("#appraisalType_id").val() == 2){
		dataArr = { 
				"appraisal_type_id": $("#appraisalType_id").val(),
				"org_id": $("#organization_id").val(),
				"level_id": $("#AppraisalEmpLevel_id").val(),
				"appraisal_year": $("#appraisal_year").val(),
				"emp_id": $("#EmpName_id").val(),
				"position_id":$("#Position_id").val()
			}
	}
	else{
		dataArr = { 
				"appraisal_type_id": $("#appraisalType_id").val(),
				"org_id": $("#organization_id").val(),
				"level_id": $("#AppraisalOrgLevel_id").val(),
				"appraisal_year": $("#appraisal_year").val(),
			}
	}
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/dashboard/performance/line_chart",
		type:"get",
		dataType:"json",
		data: dataArr,
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			if(data['status']=='400'||data['status']=='404'){
				console.log(data['data']);
				callFlashSlide("Require:"+data['data']);
				return false;
			}
				if(genTableChartLine(data)) {generateChartbar2D();}
				generateChartLine2D(data);
			
		}
	});
}

var genTableChartLine = function(data){
	var htmlTableChart = "";
		htmlTableChart += "<thead>"
		htmlTableChart += "<tr>";
		htmlTableChart += "<th></th>";
		Max = "";
		Min = "";
		
	$.each(data['categories_table'],function(index,indexEntry){
		$.each(indexEntry['category'],function(index,indexEntry1){
			htmlTableChart += "<th style='line-height: 10px; text-align: right; padding-right: 5px;'><a class='btn-link' id='"+indexEntry1['id']+"' onclick='generateChartbar2D("+indexEntry1['id']+")' style='font-size: 12px; font-weight: bold; '>"+indexEntry1['label']+"</a></th>"
			$("#head-bar").text("Performance by Employee: "+indexEntry1['label']);  //get header bar chart
			$("#head-bar-input").val(indexEntry1['id']);
			
		});
	});
		htmlTableChart += "</tr>";
		htmlTableChart += "</thead>"
		htmlTableChart += "<tbody>"
		
		
	$.each(data['dataset'],function(index,indexEntry){
		htmlTableChart += "<tr>"
		htmlTableChart += "<td style='font-size: 12px; font-weight: bold;'>"+indexEntry['seriesname']+"</td>"	
			$.each(indexEntry['data'],function(index,indexEntry1){
				htmlTableChart += "<td style='font-size: 12px;  text-align: right;'>"+indexEntry1['value']+"%</td>"
				
				if(Max==''&& Min==''){ 
					Max = indexEntry1['value'];
					Min = indexEntry1['value'];
				}	
				MaxMin(indexEntry1['value']);
				
			});
		htmlTableChart += "</tr>"
	});
		htmlTableChart += "</tbody>"
		$("#genTableChart").html(htmlTableChart);
		return 1;
}

var Max ='';
var Min ='';
var MaxMin = function(value){
	if(Max!=''&&Min!=''){
		if(value >= Max) Max = parseInt(value);
		if(value <= Min) Min = parseInt(value);
	}
}

var findOneFn = function($this){
	var emp_id = $this.id;
	var year_id = $("#head-bar-input").val();
	if(!emp_id) emp_id = $("#EmpName_id").val();
	if(!year_id) year_id = $("#appraisal_year").val();
	$(".showTable").hide();
	$("#genTable").html(""); // clear table
	 
	var dataArr = [];	
	if($("#appraisalType_id").val() == 2){
		dataArr = { 
				"appraisal_type_id": $("#appraisalType_id").val(),
				"org_id": $("#organization_id").val(),
				"level_id": $("#AppraisalEmpLevel_id").val(),
				"appraisal_year": year_id,
				"emp_id": emp_id,
				"position_id":$("#Position_id").val()
			}
	}
	else{ dataArr = { 
				"appraisal_type_id": $("#appraisalType_id").val(),
				"org_id": $("#organization_id").val(),
				"level_id": $("#AppraisalOrgLevel_id").val(),
				"appraisal_year": year_id,
			}
	}
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/dashboard/performance/table_structure",
		type:"get",
		dataType:"json",
		data : dataArr,
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			if(data['status']=='400'||data['status']=='404'){
				console.log(data['data']);
				callFlashSlide("Require:"+data['data']);
				return false;
			}
			
				$.each(data,function(index,indexEntry){
					if(indexEntry['form_id'] == "1"){
						genTableKPI(indexEntry);
						setThemeColorFn(tokenID.theme_color);
					}
				});
		}
	});
	
	$("#structureName").text($("#"+$this.id).text()+" ("+year_id+")");
}

var genTableKPI = function(data){
var htmlTable = "";
	htmlTable += "<div class='ibox float-e-margins'>";
	htmlTable += "<div class='ibox-title'>";
	htmlTable += "<div class='titlePanel'>"+data['structure_name']+"</div>";
	htmlTable += "</div>";
	htmlTable += "<div class='ibox-content'>";
	htmlTable += "<div class='row-fluid table-responsive scrollbar-inner'>";
	htmlTable += "<table class='table table-striped genTable' style='max-width: none;'>";
	htmlTable += "<thead>";
	htmlTable += "<tr>";
	htmlTable += "<th> <button class='btn btn-link' id='item-all' onclick='slidRowTable(\"item-all\")' type='button' style='color: #000000; padding: 0px; border-width: 0px;'><i class='icon-plus'></i></button></th>";
	htmlTable += "<th style='width: 230px;'>Perspective</th>";
	htmlTable += "<th>KPI Name</th>";
	htmlTable += "<th style='text-align: right;'>Target</th>";
	htmlTable += "<th>UOM</th>";
	htmlTable += "<th style='text-align: right;'>Actual</th>";
	htmlTable += "<th style='text-align: right;'>"+data['name_score_achievement']+"</th>";
	htmlTable += "<th style='text-align: right;'>%Weight</th>";
	htmlTable += "<th style='text-align: right;'>Weight Score</th>";
	htmlTable += "</tr>";
	htmlTable += "</thead>";
	htmlTable += "<tbody>";

var numColor = 1;
var color = 'tr-color-1';
	$.each(data['items'],function(index,indexEntry){
		
		htmlTable += "<tr style='cursor: pointer;' class='"+color+"' onclick='slidRowTable("+indexEntry['item_id']+")'>";
		htmlTable += "<td> <button class='btn btn-link btn-item' id='item-"+indexEntry['item_id']+"' type='button' style='color: #000000; padding: 0px; border-width: 0px;'><i class='icon-plus'></i></button></td>";
		htmlTable += "<td>"+indexEntry['perspective_name']+"</td>";
		htmlTable += "<td>"+indexEntry['item_name']+"</td>";
		htmlTable += "<td style='text-align: right;'>"+addCommas(parseFloat(notNullFn(indexEntry['target_value'])).toFixed(2))+"</td>";
		htmlTable += "<td>"+indexEntry['uom_name']+"</td>";
		htmlTable += "<td style='text-align: right;'>"+addCommas(parseFloat(notNullFn(indexEntry['actual_value'])).toFixed(2))+"</td>";
		htmlTable += "<td style='text-align: right;'>"+addCommas(parseFloat(notNullFn(indexEntry['score_achievement'])).toFixed(2))+"</td>";
		htmlTable += "<td style='text-align: right;'>"+addCommas(parseFloat(notNullFn(indexEntry['weight_percent'])).toFixed(2))+"</td>";
		htmlTable += "<td style='text-align: right;'>"+addCommas(parseFloat(notNullFn(indexEntry['weight_score'])).toFixed(2))+"</td>";
		htmlTable += "</tr>";
		$.each(indexEntry['detail'],function(index,indexEntryDetail){
			htmlTable += "<tr class='item-"+indexEntry['item_id']+" slidRow "+color+"'>";
			htmlTable += "<td></td>";
			htmlTable += "<td>"+indexEntryDetail['appraisal_period_desc']+"</td>";
			htmlTable += "<td>"+indexEntryDetail['item_name']+"</td>";
			htmlTable += "<td style='text-align: right;'>"+addCommas(parseFloat(notNullFn(indexEntryDetail['target_value'])).toFixed(2))+"</td>";
			htmlTable += "<td>"+indexEntryDetail['uom_name']+"</td>";
			htmlTable += "<td style='text-align: right;'>"+addCommas(parseFloat(notNullFn(indexEntryDetail['actual_value'])).toFixed(2))+"</td>";
			htmlTable += "<td style='text-align: right;'>"+addCommas(parseFloat(notNullFn(indexEntryDetail['score_achievement'])).toFixed(2))+"</td>";
			htmlTable += "<td style='text-align: right;'>"+addCommas(parseFloat(notNullFn(indexEntryDetail['weight_percent'])).toFixed(2))+"</td>";
			htmlTable += "<td style='text-align: right;'>"+addCommas(parseFloat(notNullFn(indexEntryDetail['weight_score'])).toFixed(2))+"</td>";
			htmlTable += "</tr>";
		});
		
		/*"+addCommas(parseFloat(notNullFn(indexEntry['percent_achievement'])).toFixed(2))+"*/
		
		if(numColor){ numColor = 0; color = 'tr-color-2';}
		else {numColor = 1; color = 'tr-color-1';}
	});
	$("#genTable").html(htmlTable);
	$(".slidRow").slideToggle();
    $(".showTable").show();
}
var StatusItemAll = 1;
var slidRowTable = function(id){
	if(id!='item-all'){
		 if($('.item-'+id).is(":hidden"))
			 $('#item-'+id).html("<i class='icon-minus'></i>");
		 else
			 $('#item-'+id).html("<i class='icon-plus'></i>");
		 $('.item-'+id).slideToggle();
	}
	else{
		
		console.log($('.slidRow').is(":hidden"));
		if($('.slidRow').is(":hidden")) {
			$('#item-all').html("<i class='icon-minus'></i>");
			$('.btn-item').html("<i class='icon-minus'></i>");
			$(".slidRow ").slideDown();
		}
		else {
			$('#item-all').html("<i class='icon-plus'></i>");
			$('.btn-item').html("<i class='icon-plus'></i>");
			$(".slidRow ").slideUp();
		}		
	}	
}

var generateChartbar2D = function(id){  //chart bar by Daris
	var htmlBar = "";
	var appraisal_year;
	var button="";
	var param_id = "";
	var yoy = "";
	
	if(id){ appraisal_year = id; $("#head-bar-input").val(id);}
	else { appraisal_year = $("#appraisal_year").val();}
	
	var dataArr = [];	
	if($("#appraisalType_id").val() == 2){
		dataArr = { 
				"appraisal_type_id": $("#appraisalType_id").val(),
				"org_id": $("#organization_id").val(),
				"level_id": $("#AppraisalEmpLevel_id").val(),
				"appraisal_year": appraisal_year,
				"emp_id": $("#EmpName_id").val(),
				"position_id":$("#Position_id").val()
			}
		param_id = $("#EmpName_id").val();
	}
	else{ dataArr = { 
				"appraisal_type_id": $("#appraisalType_id").val(),
				"org_id": $("#organization_id").val(),
				"level_id": $("#AppraisalOrgLevel_id").val(),
				"appraisal_year": appraisal_year,
			}
	param_id = $("#organization_id").val();
	}
	
   
   if(id){ $("#head-bar-input").val(id); $("#head-bar").text("Performance by Employee: "+$("#"+id).text());}
   else { $("#head-bar-input").val(id);}// get id to parameter 
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/dashboard/performance/bar_chart",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data: dataArr,
		success:function(data){
			if(data['status']=='400'||data['status']=='404'){
				console.log(data['data']);
				callFlashSlide("Require:"+data['data']);
				return false;
			}
			htmlBar += "<div class='barChart' style='white-space: nowrap;'>"
			$.each(data,function(index,indexEntry){
				if(indexEntry['id']== param_id)
					button = "<a class='btn-link' onclick='findOneFn(this)' style='color: #ff9900; ' id='"+indexEntry['id']+"'>"+indexEntry['name']+"</a>";
				else
					button = "<a class='btn-link' onclick='findOneFn(this)' style='color: #0d0d0d;' id='"+indexEntry['id']+"'>"+indexEntry['name']+"</a>";
				
				if(indexEntry['yoy'] == 0.00) 
					yoy = "<span class='barChart__value' style='text-align: right;'>"+indexEntry['yoy']+"%&nbsp;&nbsp;</span>"
				else if(indexEntry['yoy'] < 0)
					yoy = "<span class='barChart__value' style='text-align: right; color: #e60000;'>-"+indexEntry['yoy']+"%&nbsp;&nbsp;</span>"
				else
					yoy = "<span class='barChart__value' style='text-align: right; color: #00802b;'>+"+indexEntry['yoy']+"%&nbsp;&nbsp;</span>"
					
					
				htmlBar += "<div class='barChart__row' data-value='"+indexEntry['total']+"'>";
				htmlBar += "<div class='row-fluid'>"
				htmlBar += "<span class='barChart__label'>"+button+"</span>";
				htmlBar += "</div>"
				htmlBar += yoy;
				htmlBar += "<span class='barChart__bar'>";
				htmlBar += "<span class='barChart__barFill'style='padding-top: 2px;'>";
				htmlBar += "<p style='text-align: center; color:#000000;'>"+indexEntry['total']+"%</p>";
				htmlBar += "</span>";
				htmlBar += "</span>";
				htmlBar += "</div>";
			});
			$(".body-chart").show();
			$("#showChart").show();
		}
	});
	htmlBar += "</div>"
	$("#chart-bar").html(htmlBar);
	$('.barChart').barChart();
    $('[data-toggle="tooltip"]').tooltip({
        html: true
      });
}


var generateChartLine2D = function(data){
	var topProductsChart = new FusionCharts({
	    type: "msline",
	    renderAt: "chart-line2d",
	    width: "100%",
	    height: '250',
	    dataFormat: "json",
	    dataSource: 
	    {
	        "chart": {
	        	/*"subcaptionFontSize": "14",
	            "subcaptionFontBold": "0",
	            "paletteColors": "#0075c2,#1aaf5d,#ffff00,#e60000",
	            "bgcolor": "#ffffff",
	            "showBorder": "0",
	            "showShadow": "0",
	            "showCanvasBorder": "0",
	            "usePlotGradientColor": "0",
	            "legendBorderAlpha": "0",
	            "legendShadow": "0",
	            "legendPosition":"BOTTOM",
	            "showAxisLines": "0",
	            "showAlternateHGridColor": "0",
	            "divlineThickness": "1",
	            "divLineDashed": "1",
	            "divLineDashLen": "1",
	            "baseFontSize" :"11",
	            "showValues": "0",
	            "toolTipColor": "#ffffff",
	 	        "toolTipBorderThickness": "0",
	 	        "toolTipBgColor": "#000000",
	 	        "toolTipBgAlpha": "80",
	 	        "toolTipBorderRadius": "2",
	 	        "toolTipPadding": "5",
	 	        "yAxisMaxValue" : Max+5,
	 	        "yAxisMinValue" : Min-5,*/
	             "paletteColors": "#0075c2,#1aaf5d,#ffff00,#e60000",
	             "bgAlpha": "0",
	             "borderAlpha": "20",
	             "canvasBorderAlpha": "0",
	             "LegendShadow": "0",
	             "legendBorderAlpha": "0",
	             "showXAxisLine": "1",
	             "showValues": "0",
	             "showBorder": "0",
	             "showAlternateHgridColor": "0",
	             "base": "11",
	             "axisLineAlpha": "10",
	             "divLineAlpha": "10",
	             "toolTipColor": "#ffffff",
	             "toolTipBorderThickness": "0",
	             "toolTipBgColor": "#000000",
	             "toolTipBgAlpha": "80",
	             "toolTipBorderRadius": "2",
	             "toolTipPadding": "5",
	             "numberSuffix" : "%",
	 	 	     "yAxisMaxValue" : Max+2,
		 	     "yAxisMinValue" : Min-2,
		 	     "theme":"fusion"
	        },
	        "categories": data['categories_chart'],
	        "dataset": data['dataset']
	    }
	  }).render();
}

var getDataFn = function() { 
$("body").mLoading('show'); //Loading
 getChartLine();
$("body").mLoading('hide'); //Loading
};

var dropDrowYearListFn = function(nameArea,id){
	if(nameArea==undefined){
		nameArea="";
	}
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/year_list_assignment",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(index==0){
					htmlOption+="<option selected='selected' value="+indexEntry['appraisal_year']+">"+indexEntry['appraisal_year']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['appraisal_year']+">"+indexEntry['appraisal_year']+"</option>";
				}
			});
			$("#AppraisalYear"+nameArea).html(htmlOption);
		}
	});
	
//	dropDrowPeriodListFn($("#AppraisalYear").val()); #close
}



var dropDrowPeriodListFn = function(year, id) { //period #close
  $.ajax({
    url: restfulURL + "/" + serviceName + "/public/appraisal/period_list",
    type: "get",
    dataType: "json",
    async: false,
    headers: {
      Authorization: "Bearer " + tokenID.token
    },
    data: {
      "appraisal_year": year
    },
    success: function(data) {
      var htmlOption = "";
      $.each(data, function(index, indexEntry) {
        if (id == indexEntry['period_id']) {
          htmlOption += "<option selected='selected' value=" + indexEntry['period_id'] + ">" + indexEntry['appraisal_period_desc'] + "</option>";
        } else {
          htmlOption += "<option value=" + indexEntry['period_id'] + ">" + indexEntry['appraisal_period_desc'] + "</option>";
        }
      });
      $("#AppraisalPeriod").html(htmlOption);
    }
  });
}

var appraisalTypeFn = function(nameArea,id){

	if(nameArea==undefined){
		nameArea="";
	}

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/appraisal_type_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==undefined){
						if(index==0){
							htmlOption+="<option selected='selected' value="+indexEntry['appraisal_type_id']+">"+indexEntry['appraisal_type_name']+"</option>";
						}else{
							htmlOption+="<option value="+indexEntry['appraisal_type_id']+">"+indexEntry['appraisal_type_name']+"</option>";
						}
				}else{
					if(id==indexEntry['appraisal_type_id']){
							htmlOption+="<option selected='selected' value="+indexEntry['appraisal_type_id']+">"+indexEntry['appraisal_type_name']+"</option>";
						}else{
							htmlOption+="<option value="+indexEntry['appraisal_type_id']+">"+indexEntry['appraisal_type_name']+"</option>";
					}
				}

			});
			$("#appraisalType"+nameArea).html(htmlOption);
		}
	});
}

var dropDrowAppraisalEmpLevelFn = function(id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/parameter/emp_level",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
//			htmlOption+="<option value=''>All Level</option>";
			$.each(data,function(index,indexEntry){

				if(id==indexEntry['level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}
			});
			$("#AppraisalEmpLevel").html(htmlOption);
		}
	});
}

var dropDrowIndividualOrgLevelFn = function(id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/parameter/org_level_individual",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"level_id": $("#AppraisalEmpLevel").val()},
		success:function(data){
			var htmlOption="";
//			htmlOption+="<option value=''>All Level</option>";
			$.each(data,function(index,indexEntry){

				if(id==indexEntry['level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}
			});
			$("#AppraisalOrgLevel").html(htmlOption);
		}
	});
	dropDrowIndividualOrgFn();
}


var dropDrowPositionFn = function(EmpName_id,id){ // dropDrowPositionFn by Daris
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/dashboard/performance/position",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"emp_id":$("#EmpName_id").val()},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['position_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['position_id']+">"+indexEntry['position_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['position_id']+">"+indexEntry['position_name']+"</option>";
				}
			});
			$("#Position").html(htmlOption);
		}
	});
}


var dropDrowIndividualOrgFn = function(appraisalLevelId,id){
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/parameter/org_individual",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"emp_level":$("#AppraisalEmpLevel").val(), "org_level":$("#AppraisalOrgLevel").val()},
		success:function(data){
			var htmlOption="";
//			htmlOption+="<option value=''>All Organization</option>";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['org_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['org_id']+">"+indexEntry['org_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['org_id']+">"+indexEntry['org_name']+"</option>";
				}
			});
			$("#organization").html(htmlOption);
		}
	});
}



var dropDrowAppraisalOrgLevelFn = function(id){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/parameter/org_level",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
//			htmlOption+="<option value=''>All Level</option>";
			$.each(data,function(index,indexEntry){

				if(id==indexEntry['level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}
			});
			$("#AppraisalOrgLevel").html(htmlOption);
		}
	});
	
	if($("#appraisalType").val() == "1"){
		dropDrowOrgFn($("#AppraisalOrgLevel").val());
	} else {
		dropDrowIndividualOrgFn($("#AppraisalOrgLevel").val());
	}
}



var dropDrowOrgFn = function(appraisalLevelId,id){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/org",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"level_id":appraisalLevelId},
		success:function(data){
			var htmlOption="";
//			htmlOption+="<option value=''>All Organization</option>";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['org_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['org_id']+">"+indexEntry['org_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['org_id']+">"+indexEntry['org_name']+"</option>";
				}
			});
			$("#organization").html(htmlOption);
		}
	});
}



$(document).ready(function() {

  var username = $('#user_portlet').val();
  var password = $('#pass_portlet').val();
  var plid = $('#plid_portlet').val();
  if (username != "" && username != null & username != [] && username != undefined) {

    if (connectionServiceFn(username, password, plid) == false) {
      return false;
    }
    $('[data-toggle="tooltip"]').css({
      "cursor": "pointer"
    });
    $('[data-toggle="tooltip"]').tooltip({
      html: true
    });
    console.log(tokenID.token);
    var dataClearParam = [{
        'id': '#Position',
        'val': ""
      },
      {
        'id': '#Position_id',
        'val': ""
      },
      {
        'id': '#EmpName',
        'val': ""
      },
      {
        'id': '#EmpName_id',
        'val': ""
      }
    ];

    var dataSetParam = [{
        'id': '#Position',
        'val': "" + cMain_position_name + ""
      },
      {
        'id': '#Position_id',
        'val': cMain_position_id
      },
      {
        'id': '#EmpName',
        'val': "" + cMain_emp_name + "(" + session_emp_code + ")"
      },
      {
        'id': '#EmpName_id',
        'val': cMain_emp_id
      },
      {
        'id': '#AppraisalEmpLevel',
        'val': "" + cMain_level_id + ""
      }
    ];

    dropDrowYearListFn();
    $("#AppraisalYear").change(function() {
//      dropDrowPeriodListFn($(this).val()); #close
    });
    
    appraisalTypeFn();
    $("#appraisalType").change(function() {
      if ($("#appraisalType").val() == 1) {
        $("#Position").val("").prop("disabled", true);
        $("#EmpName").val("").prop("disabled", true);
        $("#AppraisalEmpLevel").prop("disabled", true);
        dropDrowAppraisalOrgLevelFn();
      } else {
        $("#Position").prop("disabled", false);
        $("#EmpName").prop("disabled", false);
        $("#AppraisalEmpLevel").prop("disabled", false);
        dropDrowAppraisalEmpLevelFn();
      }
    });
    $("#appraisalType").change();

    $("#AppraisalEmpLevel").change(function() {
      clearParamSearch(dataClearParam); // in cMain.js
      dropDrowIndividualOrgLevelFn($(this).val());
    });

    $("#AppraisalOrgLevel").change(function() {
      clearParamSearch(dataClearParam); // in cMain.js

      if ($("#appraisalType").val() == "1") {
        dropDrowOrgFn($(this).val());
      } else {
        dropDrowIndividualOrgFn($(this).val());
      }
    });

    $("#organization").change(function() {
      clearParamSearch(dataClearParam); // in cMain.js
    });

    setParamSearch(dataSetParam); // in cMain.js

    //Auto complete Start
    
    $("#EmpName").autocomplete({
  
      source: function(request, response) {
        $.ajax({
          url: restfulURL + "/" + serviceName + "/public/appraisal/parameter/auto_emp_list",
          type: "GET",
          dataType: "json",
          data: {
            "emp_name": request.term,
            "emp_code": session_emp_code,
            "org_id": $("#organization").val(),
            "level_id": $("#AppraisalEmpLevel").val()
          },
          //async:false,
          headers: {
            Authorization: "Bearer " + tokenID.token
          },
          error: function(xhr, textStatus, errorThrown) {
            console.log('Error: ' + xhr.responseText);
          },
          success: function(data) {
            console.log(data)
            $("#Position").html('');
            response($.map(data, function(item) {
              return {
                label: item.emp_name + "(" + item.emp_code + ")",
                value: item.emp_name,
                emp_id: item.emp_id,
                emp_code: item.emp_code
              };
            }));

          },
          beforeSend: function() {
            $("body").mLoading('hide');
          }

        });
      },
      select: function(event, ui) {
        $("#EmpName").val(ui.item.label);
        $("#EmpName_id").val(ui.item.emp_id);
        galbalDataTemp['EmpName'] = ui.item.label;
        galbalDataTemp['EmpName_id'] = ui.item.emp_id;
        //empNameAutoCompelteChangeToPositionName(ui.item.value);
        dropDrowPositionFn();
        return false;
      },
      change: function(e, ui) {
        if ($("#EmpName").val() == galbalDataTemp['EmpName']) {
          $("#EmpName_id").val(galbalDataTemp['EmpName_id']);
        } else if (ui.item != null) {
          $("#EmpName_id").val(ui.item.emp_id);
        } else {
          $("#EmpName_id").val("");
          $("#Position").html('');

        }

      }
    });

    $("#btnSearch").click(function(){
    $("#showChart").hide();  // panel chart 
    $(".showTable").hide();  // panel table
    $(".body-chart").hide(); // body chart
    if(
    	($("#Position").val() != ""
/*    	&& $("#Period_id").val($("#AppraisalPeriod").val()) !="" #close*/ 
    	&& $("#appraisalType").val() !=""
    	&& $("#AppraisalEmpLevel").val() !=""
    	&& $("#AppraisalOrgLevel").val() !=""
    	&& $("#organization").val() != ""
    	&& $("#EmpName_id").val() != ""
    	&& $("#AppraisalYear").val() != "")
    	|| $("#appraisalType").val() == "1"
    	){
    	
    	$("#Position_id").val($("#Position").val());
    	$("#appraisalType_id").val($("#appraisalType").val());
    	$("#AppraisalEmpLevel_id").val($("#AppraisalEmpLevel").val());
    	$("#AppraisalOrgLevel_id").val($("#AppraisalOrgLevel").val());
    	$("#organization_id").val($("#organization").val());
    	$("#appraisal_year").val($("#AppraisalYear").val());
    	getDataFn();
    	
    }
    else{
    	callFlashSlide("Employee Name is Require !");
    	return false;
    }	
	});
    
    $(".app_url_hidden").show();
    dropDrowIndividualOrgLevelFn($("#AppraisalEmpLevel").val());
		
  }
});





