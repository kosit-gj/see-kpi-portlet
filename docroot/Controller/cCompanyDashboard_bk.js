
var yearListFn = function(){

	$.ajax({
		url:restfulURL+"/tyw_api/public/dashboard/year_list",
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
		url:restfulURL+"/tyw_api/public/dashboard/month_list",
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

var listBalanceScorecardFn = function(data){
	
	var balanceScorecardHTML="";
	var perspective_name = getDataUninuqe(data,'perspective_name');
	
	//console.log(perspective_name);
	
	$.each(perspective_name,function(index,indexEntry){
		//console.log(index);
		//console.log(indexEntry);
		
		balanceScorecardHTML+=" <div class='title2 yellow2'>";
		balanceScorecardHTML+="<b>"+indexEntry+"</b>";
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
				
				var percentage=(parseInt(indexEntry2['actual_value'])/parseInt(indexEntry2['target_value'])*100).toFixed(2);
				if(percentage == 'NaN'){
					var percentage = 0;
				}
				
				balanceScorecardHTML+="<tr id='id-"+indexEntry2['appraisal_item_id']+"' class='clickable appraisalItem'>";
				balanceScorecardHTML+="<td>"+indexEntry2['appraisal_item_name']+"</td>";
				balanceScorecardHTML+="<td style='width:50px;'><div class='sparkline'>"+parseInt(indexEntry2['target_value'])+","+parseInt(indexEntry2['actual_value'])+",120,80,40</div></td>";
				balanceScorecardHTML+="<td style='width:60px;'>"+percentage+"%</td>";
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
		url:restfulURL+"/tyw_api/public/dashboard/balance_scorecard",
		type:"post",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"period_id":period_id},
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
	option['tooltipTextColor']='white';
	option['location']='n';
	option['placement']='inside';
	option['title']="Monthly Variance";
	option['pointLabels']=true;
	option['pointLabelsFont']='13px';
	//show hide tooltip
	option['tooltip']=true;
	option['y2axis']=true;
	//option['barWidth']="15";
	
	$("#monthlyVariance").empty();
	barChart("monthlyVariance",data,option);	
	

	
}

getDataMonthlyVarianceFn = function(appraisal_year,appraisal_item_id){
	
	var appraisal_item_id =(appraisal_item_id == undefined || appraisal_item_id == ""  ? "" : appraisal_item_id);
	
	$.ajax({
		//url:"../Model/barChartMutiSeries.jsp",
		url:restfulURL+"/tyw_api/public/dashboard/monthly_variance",
		type:"post",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"appraisal_year":appraisal_year,"appraisal_item_id":appraisal_item_id},
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
			
			//console.log(objFormat);
			var objJsonFormat = eval("("+objFormat+")");
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
	option['tooltipTextColor']='white';
	option['location']='n';
	option['placement']='inside';
	option['title']="Monthly Growth";
	option['pointLabels']=true;
	option['pointLabelsFont']='13px';
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
		url:restfulURL+"/tyw_api/public/dashboard/monthly_growth",
		type:"post",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"appraisal_year":appraisal_year,"appraisal_item_id":appraisal_item_id},
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
			
			console.log(objFormat);
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
	option['tooltipTextColor']='white';
	option['location']='n';
	option['placement']='inside';
	option['title']="YTD Growth";
	option['pointLabels']=true;
	option['pointLabelsFont']='13px';
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
		url:restfulURL+"/tyw_api/public/dashboard/ytd_monthly_growth",
		type:"post",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"appraisal_year":appraisal_year,"appraisal_item_id":appraisal_item_id},
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
			
			console.log(objFormat);
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
	option['tooltipTextColor']='white';
	option['location']='n';
	option['placement']='inside';
	option['title']="YTD Variance";
	option['pointLabels']=true;
	option['pointLabelsFont']='13px';
	//show hide tooltip
	option['tooltip']=true;
	//option['barWidth']="15";	
	
	$("#ytdVariance").empty();
	barChart("ytdVariance",data,option);
}
getDataYTDVarianceFn = function(appraisal_year,appraisal_item_id){
	var appraisal_item_id =(appraisal_item_id == undefined || appraisal_item_id == ""  ? "" : appraisal_item_id);
	
	$.ajax({
		url:restfulURL+"/tyw_api/public/dashboard/ytd_monthly_variance",
		type:"post",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"appraisal_year":appraisal_year,"appraisal_item_id":appraisal_item_id},
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
			
			console.log(objFormat);
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
	var username = $('#user_portlet').val();
	var password = $('#pass_portlet').val();
	/*Fixed for Test.*/
	// username = "1";
	// password =	"11";
	
	if(username!="" && username!=null & username!=[] && username!=undefined ){
		if(connectionServiceFn(username,password)==false){
			return false;
		}
	}
	
	
	
	
	
	yearListFn();
	$("#paramYear").change(function(){
		monthListFn($(this).val());
		
		getBalanceScorecardFn($("#paramMonth").val());
		
		
		if(undefined==$("#embed_appraisal_item_id").val()){

			var id = $(".appraisalItem:first").attr("id").split("-");
			id = id[1];
			$(".embed_appraisal_item_id").remove();
			$("body").append("<input type='hidden' id='embed_appraisal_item_id' class='embed_appraisal_item_id' name='embed_appraisal_item_id' value='"+id+"'>");
			
			
		}
		
		
		getDataMonthlyVarianceFn($(this).val(),$("#embed_appraisal_item_id").val());
		getDataMonthlyGrowthFn($(this).val(),$("#embed_appraisal_item_id").val());
		getDataYTDVarianceFn($(this).val(),$("#embed_appraisal_item_id").val());
		getDataYTDGrowthFn($(this).val(),$("#embed_appraisal_item_id").val());
		bindingBulletFn();
	});
	$("#paramYear").change();
	
	$("#paramMonth").change(function(){
		getBalanceScorecardFn($(this).val());
		bindingBulletFn();
	});
	$("#paramMonth").change();


	
	$(document).on("click",".appraisalItem",function(){

		var id = $(this).attr("id").split("-");
		id = id[1];
		$(".embed_appraisal_item_id").remove();
		$("body").append("<input type='hidden' id='embed_appraisal_item_id' class='embed_appraisal_item_id' name='embed_appraisal_item_id' value='"+id+"'>");
		getDataMonthlyVarianceFn($("#paramYear").val(),id);
		getDataMonthlyGrowthFn($("#paramYear").val(),id);
		getDataYTDVarianceFn($("#paramYear").val(),id);
		getDataYTDGrowthFn($("#paramYear").val(),id);
		
	});
	
	$("#YTD_tab").click(function(){
		getDataYTDVarianceFn($("#paramYear").val(),$("#embed_appraisal_item_id").val());
		getDataYTDGrowthFn($("#paramYear").val(),$("#embed_appraisal_item_id").val());
	});
	
	
	
	$("#btnSearchAdvance").click(function(){
		
		getBalanceScorecardFn($("#paramMonth").val());
		
		
		if(undefined==$("#embed_appraisal_item_id").val()){

			var id = $(".appraisalItem:first").attr("id").split("-");
			id = id[1];
			$(".embed_appraisal_item_id").remove();
			$("body").append("<input type='hidden' id='embed_appraisal_item_id' class='embed_appraisal_item_id' name='embed_appraisal_item_id' value='"+id+"'>");
			
			
		}
		
		
		getDataMonthlyVarianceFn($(this).val(),$("#embed_appraisal_item_id").val());
		getDataMonthlyGrowthFn($(this).val(),$("#embed_appraisal_item_id").val());
		getDataYTDVarianceFn($(this).val(),$("#embed_appraisal_item_id").val());
		getDataYTDGrowthFn($(this).val(),$("#embed_appraisal_item_id").val());
		bindingBulletFn();
		
	});
//	$(window).on("orientationchange",function(){
//			$("#paramYear").change();
//	});
	

	
	
});