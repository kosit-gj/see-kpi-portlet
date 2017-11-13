var username = $('#user_portlet').val(); 
var emp_code=username;
//var emp_code="2";
var password = $('#pass_portlet').val();


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

var listBalanceScorecardFn = function(data){
	
	var balanceScorecardHTML="";
	var perspective_name = getDataUninuqe(data,'perspective_name');
	
	//console.log(perspective_name);
	
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
	
};

var getBalanceScorecardFn = function(period_id){
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/dashboard/balance_scorecard",
		type:"post",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"emp_code":$("#embedParamEmp").val(),"period_id":period_id},
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
	barLineChart("monthlyVariance",data,option);	
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
		data:{"emp_code":$("#embedParamEmp").val(),"appraisal_year":appraisal_year,"appraisal_item_id":appraisal_item_id},
		success:function(data){

			
		
			if(data==""){
//				$(".itemName").hide();
//				$(".ibox-content").hide();
				$("#monthlyVariance").empty();
				return false;
			}
			$(".itemName").show();
			$(".ibox-content").show();
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
		data:{"emp_code":$("#embedParamEmp").val(),"appraisal_year":appraisal_year,"appraisal_item_id":appraisal_item_id},
		success:function(data){
			if(data==""){
				//alert("ok")
//				$(".itemName").hide();
//				$(".ibox-content").hide();
				$("#monthlyGrowth").empty();
				return false;
			}
			$(".itemName").show();
			$(".ibox-content").show();
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
		data:{"emp_code":$("#embedParamEmp").val(),"appraisal_year":appraisal_year,"appraisal_item_id":appraisal_item_id},
		success:function(data){
			if(data==""){
				//alert("ok")
//				$(".itemName").hide();
//				$(".ibox-content").hide();
				$("#ytdGrowth").empty();
				return false;
			}
			$(".itemName").show();
			$(".ibox-content").show();
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
		data:{"emp_code":$("#embedParamEmp").val(),"appraisal_year":appraisal_year,"appraisal_item_id":appraisal_item_id},
		success:function(data){
			if(data==""){
				//alert("ok")
//				$(".itemName").hide();
//				$(".ibox-content").hide();
				$("#ytdVariance").empty();
				return false;
			}
			$(".itemName").show();
			$(".ibox-content").show();
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
	getEmpListFn();
	
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
		//getDataYTDVarianceFn($("#embedParamYear").val(),id);
		//getDataYTDGrowthFn($("#embedParamYear").val(),id);
		
	
		
		
	});
	
	$(".cick_tab").remove();
	$("body").append("<input type='hidden' value='monthly_tab' class='cick_tab' id='monthly_tab_embed' name='monthly_tab_embed'>");
	
	$("#YTD_tab").click(function(){
		getDataYTDVarianceFn($("#embedParamYear").val(),$("#embed_appraisal_item_id").val());
		getDataYTDGrowthFn($("#embedParamYear").val(),$("#embed_appraisal_item_id").val());
		$(".cick_tab").remove();
		$("body").append("<input type='hidden' value='tyd_tab' class='cick_tab' id='ytd_tab_embed' name='ytd_tab_embed'>");
	});
	
	$("#Monthly_tab").click(function(){
		getDataMonthlyVarianceFn($("#embedParamYear").val(),$("#embed_appraisal_item_id").val());
		getDataMonthlyGrowthFn($("#embedParamYear").val(),$("#embed_appraisal_item_id").val());
		
		$(".cick_tab").remove();
		$("body").append("<input type='hidden' value='monthly_tab' class='cick_tab' id='monthly_tab_embed' name='monthly_tab_embed'>");
	});
	
	
	$("#btnSearchAdvance").click(function(){
		
		$(".itemName ").html("");
		$(".ibox-content").hide();
		 var paramHtml="";
		 paramHtml += "<input type='hidden' name='embedParamYear' id='embedParamYear' class='embedParam' value='"+$("#paramYear").val()+"'>";
		 paramHtml += "<input type='hidden' name='embedParamMonth' id='embedParamMonth' class='embedParam' value='"+$("#paramMonth").val()+"'>";
		 paramHtml += "<input type='hidden' name='embedParamEmp' id='embedParamEmp' class='embedParam' value='"+$("#paramEmp").val()+"'>";
		 
		 $(".embedParam").remove();
		
		$("body").append(paramHtml);
		
		
		
		getBalanceScorecardFn($("#embedParamMonth").val());
//		setTimeout(function(){
//			bindingBulletFn();
//		},500);
		
//		alert($("#embed_appraisal_item_id").val());
//		if(undefined==$("#embed_appraisal_item_id").val()){
		
			$(".embed_appraisal_item_id").remove();
			if($(".appraisalItem:first").attr("id")!=undefined){

				var id = $(".appraisalItem:first").attr("id").split("-");
				id = id[1];
				$(".embed_appraisal_item_id").remove();
				$("body").append("<input type='hidden' id='embed_appraisal_item_id' class='embed_appraisal_item_id' name='embed_appraisal_item_id' value='"+id+"'>");
				$(".itemName").html($(".appraisalItem:first td:first").text());
				
			}
		//}
		

		if($("#monthly_tab_embed").val()=="monthly_tab"){
			getDataMonthlyVarianceFn($("#embedParamYear").val(),$("#embed_appraisal_item_id").val());
			getDataMonthlyGrowthFn($("#embedParamYear").val(),$("#embed_appraisal_item_id").val());
		
		}else{
			
			getDataYTDVarianceFn($("#embedParamYear").val(),$("#embed_appraisal_item_id").val());
			getDataYTDGrowthFn($("#embedParamYear").val(),$("#embed_appraisal_item_id").val());
		}
		
		
		
		
		//$(".ibox-content").show();
		
	});
	
	

	
	//check Orientation Start
	var getBrowserWidth = function(){
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
	};

	//getBrowserWidth();
	$(window).on('resize',function(){
		getBrowserWidth();
	});
	//check Orientation End
});