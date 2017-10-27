<%@ page contentType="text/html; charset=UTF-8" %>
<style media="print">

 @page {
  size: auto;
  margin: 0px;
 }


</style>
<style>
 .ganntChartTititle {
    border: 1px solid #f1d875;
    margin-top:3px;
}

.breadcrumbs2 {
    background: rgba(0, 0, 0, 0) linear-gradient(to bottom, #fff 0px, #f6f6f6 47%, #ededed 100%) repeat scroll 0 0;
    border-radius: 0;
    margin-bottom: 0;
}

</style>
<script src="/see-kpi-portlet/js/jquery-2.1.1.js"></script> 

<link  href="/see-kpi-portlet/js/bootstrap2.3.2/css/bootstrap.min.css" rel="stylesheet" type="text/css"> 
<script src="/see-kpi-portlet/js/bootstrap2.3.2/js/bootstrap.min.js"></script>   
<script src="/see-kpi-portlet/js/fusioncharts/js/fusioncharts.js"></script>               
<script src="/see-kpi-portlet/js/fusioncharts/js/fusioncharts.charts.js"></script>
<script src="/see-kpi-portlet/js/fusioncharts/js/fusioncharts.widgets.js"></script>
<script src="/see-kpi-portlet/js/fusioncharts/js/themes/fusioncharts.theme.fint.js"></script>
<%
	String restfulURL = request.getParameter("restfulURL");
	String item_result_id = request.getParameter("item_result_id");
	String gantt_unit = request.getParameter("gantt_unit");
	String gantt_amount = request.getParameter("gantt_amount");
	
	String entityType = request.getParameter("entityType");
	String period = request.getParameter("period");
	String organization = request.getParameter("organization");
	String appraisalItem = request.getParameter("appraisalItem");
	String employee = request.getParameter("employee");
if(entityType.equals("2")){
	%>
	<div class='container-fluid'>
		<div class='row-fluid   ganntChartTititle ganntChartTitleOrg '  >
		     <div class='span4 ' style='font-weight:bold;padding:10px;'>
		          Period: <span class='ganttAppraisalPeriodDescTxt'><%=period%></span>
		   	</div>
		    <div class='span4 ' style='font-weight:bold;padding:10px;'>
		          Organization: <span class='ganttOrgTxt'><%=organization%></span>
		    </div>
		    <div class='span4 ' style='font-weight:bold;padding:10px;'>
		          Appraisal Item: <span class='ganttAppraisalItemTxt'><%=appraisalItem%></span>
		    </div>
		</div>	
	</div>
	
	<%
}else{
	%>
	
	<div class='ganntChartTititle'>
	   <div class='row-fluid   ganntChartTitleEmp'  >
	   	<div class='span6 ' style='font-weight:bold;padding:10px;padding-bottom:0px'>
	   		Period: <span  class='ganttAppraisalPeriodDescTxt'><%=period%></span>
	   	</div>
	   	<div class='span6 ' style='font-weight:bold;padding:10px;padding-bottom:0px'>
	   		Organization: <span class='ganttOrgTxt'><%=organization%></span>
	   	</div>
	   </div>
	   <div class='row-fluid  ganntChartTitleEmp'>
	   	<div class='span6 ' style='font-weight:bold;padding:10px; padding-top:5px'>
	   		Employee: <span class='ganttEmpTxt'><%=employee%></span>
	   	</div>
	   	<div class='span6 ' style='font-weight:bold;padding:10px; padding-top:5px'>
	   		Appraisal Item: <span class='ganttAppraisalItemTxt'><%=appraisalItem%></span>
	   	</div>
	   </div>  
	</div>
	
	<%
}
%>
<div id='ganttChart' ></div>
<script>

var restfulURL="<%=restfulURL%>";
var item_result_id="<%=item_result_id%>";
var gantt_unit="<%=gantt_unit%>";
var gantt_amount="<%=gantt_amount%>";


var generateGanttChartFn = function(dataSource){
	
    var revgannttChart = new FusionCharts({
    	type: 'gantt',
        renderAt: 'ganttChart',
        width: '100%',
        //height: '600',
        dataFormat: 'json',
        dataSource: dataSource
    })
    .render();
	
 return false;
};

/*
var getDataGanttChartFn = function(item_result_id,ganttPaneDuration){
	var ganttPaneDurationVarible="";
	if(ganttPaneDuration==undefined || ganttPaneDuration==""){
		ganttPaneDurationVarible==10
	}else{
		ganttPaneDurationVarible=ganttPaneDuration
	}
	$.ajax({
		url:restfulURL+"/see_api/public/dashboard/gantt",
		type:"get",
		dataType:"json",
		data:{"item_result_id":item_result_id},
		async:false,
		success:function(data){
		//console.log(data);
		console.log(data['processes']);
		
			var dataGantt="";
			var objectGantt={};
			objectGantt={
	            "chart": {
	            	//"exportenabled": "1",
	                //"exportatclient": "1",
	                //"caption": "Action Plan",
	                //"subcaption": "Planned vs Actual",                
	                "dateformat": "dd/mm/yyyy",
	                "outputdateformat": "ddds mns yy",
	                "ganttwidthpercent": "60",
	                "ganttPaneDuration": ganttPaneDurationVarible,
	               // "ganttPaneDurationUnit": "d",
	                "ganttPaneDurationUnit": "m",
	                "plottooltext": "$processName{br} $label starting date $start{br}$label ending date $end",
	                "legendBorderAlpha": "0",
	                "legendShadow": "0",
	                "usePlotGradientColor": "0",
	                "showCanvasBorder": "0",
	                "flatScrollBars": "1",
	                "gridbordercolor": "#333333",
	                "gridborderalpha": "20",
	                "slackFillColor": "#e44a00",
	                "taskBarFillMix": "light+0"
	            }, 
	             "categories":data['categories'],
	             "processes":data['processes'],
	             "datatable":data['datatable'],
	             "tasks":data['tasks'],
	             "legend": {
	                 "item": [
	                     {
	                         "label": "Planned",
	                         "color": "#008ee4"
	                     },
	                     {
	                         "label": "Actual",
	                         "color": "#6baa01"
	                     },
	                     {
	                         "label": "Slack (Delay)",
	                         "color": "#e44a00"
	                     }
	                 ]
	             }
	        
	        }
			generateGanttChartFn(objectGantt);
		}
	});
};
*/

var getDataGanttChartFn = function(item_result_id,ganttPaneDuration,ganttPaneDurationUnit){
	var ganttPaneDurationVarible="";
	var ganttPaneDurationUnit="";
	
	
	if(ganttPaneDurationUnit==undefined || ganttPaneDurationUnit==""){
		ganttPaneDurationUnit='d';
	}else{
		ganttPaneDurationUnit=ganttPaneDurationUnit;
	}
	
	
	
	$.ajax({
		url:restfulURL+"/see_api/public/dashboard/gantt",
		type:"get",
		dataType:"json",
		data:{"item_result_id":item_result_id},
		async:false,
		success:function(data){
		//console.log(data);
			var tasksLength=0;
			var startDate="";
			var endDate="";
			tasksLength=data['tasks']['task'].length;
			if(tasksLength>0){
				
				startDate=data['tasks']['task'][0]['start'];
				endDate=data['tasks']['task'][(tasksLength-1)]['end'];
				
				console.log("ganttPaneDuration="+ganttPaneDuration);
				if(ganttPaneDuration==undefined || ganttPaneDuration==""){
					ganttPaneDurationVarible=diffDateFn(startDate,endDate);
					console.log(diffDateFn(startDate,endDate));
				}else{
					ganttPaneDurationVarible=ganttPaneDuration;
				}
			//console.log(diffDateFn(startDate,endDate));
			//alert(ganttPaneDurationVarible);
				
			}
			
		
		
			var dataGantt="";
			var objectGantt={};
			objectGantt={
	            "chart": {
	            	//"exportenabled": "1",
	                //"exportatclient": "1",
	                //"caption": "Action Plan",
	                //"subcaption": "Planned vs Actual",                
	                "dateformat": "dd/mm/yyyy",
	                "outputdateformat": "ddds mns yy",
	                "ganttwidthpercent": "60",
	               // "ganttPaneDuration": 12,
	                "ganttPaneDuration": ganttPaneDurationVarible,
	               // "ganttPaneDurationUnit": "d",
	                "ganttPaneDurationUnit": ganttPaneDurationUnit,
	                "plottooltext": "$processName{br} $label starting date $start{br}$label ending date $end",
	                "legendBorderAlpha": "0",
	                "legendShadow": "0",
	                "usePlotGradientColor": "0",
	                "showCanvasBorder": "0",
	                "flatScrollBars": "1",
	                "gridbordercolor": "#333333",
	                "gridborderalpha": "5",
	                "slackFillColor": "#e44a00",
	                "taskBarFillMix": "light+0"
	            }, 
	             "categories":data['categories'],
	             "processes":data['processes'],
	             "datatable":data['datatable'],
	             "tasks":data['tasks'],
	             "legend": {
	                 "item": [
	                     {
	                         "label": "Planned",
	                         "color": "#008ee4"
	                     },
	                     {
	                         "label": "Actual",
	                         "color": "#6baa01"
	                     },
	                     {
	                         "label": "Slack (Delay)",
	                         "color": "#e44a00"
	                     }
	                 ]
	             }
	        }
			generateGanttChartFn(objectGantt);
			 
			/* test here start*/
			$("#ganttChartModal").modal().css({"margin-top":"0px"});

			
			
		}
	});
};



$(document).ready(function(){
	//alert("hello jquery");
	/*
	alert(item_result_id);
	alert(zoom);
	alert(restfulURL);
	*/
	getDataGanttChartFn(item_result_id,gantt_amount,gantt_unit);
	
	setTimeout(function(){
		window.print();
	},3000);
	 
});
</script>