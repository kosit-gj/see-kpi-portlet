<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui"%>
<%@ page import="javax.portlet.*"%>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>
<%@ page import="com.liferay.portal.kernel.util.WebKeys" %>
<liferay-theme:defineObjects />
<portlet:defineObjects />
<%
String username = themeDisplay.getUser().getScreenName();
String password = (String)request.getSession().getAttribute(WebKeys.USER_PASSWORD);

%>
<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">

<style>




 /* Large desktop Start#####################################*/
    @media (min-width: 1200px) { 
		
     }
     /* Large desktop End######################################*/
     
     /*  desktop Start#########################################*/
    @media (min-width: 980px) and (max-width: 1199px) {
    
    	
     }
    /*  desktop End############################################*/
    
    /* Portrait tablet to landscape and desktop Start##########*/
    @media (min-width: 768px) and (max-width: 979px) {
    	.year-label{
    		text-align:right;
    	}
    	.period-label{
    		text-align:right;
    	}
    	.wrapper-content {
		    padding: 0px 10px;
		} 
     }
    /* Portrait tablet to landscape and desktop End############*/ 
    
    /* Landscape phone to portrait tablet Start################*/
    @media (max-width: 767px) { 
   	 	.year-label{
    		text-align:left;
    	}
    	.period-label{
    		text-align:left;
    	}
    	.wrapper-content {
		    padding: 0px 0px;
		}
     }
    /* Landscape phone to portrait tablet End##################*/ 
    
    /* Landscape phones and down Start#########################*/
    @media (max-width: 480px) { 
    	
    	.year-label{
    		text-align:left;
    	}
    	.period-label{
    		text-align:left;
    	}
    	.wrapper-content {
		    padding: 0px 0px;
		}
		    	
    	
     }
     /* Landscape phones and down End##########################*/
     
     
     



	.aui #breadcrumbs {
	    margin-bottom: 0px;
	}
	.aui .portlet-content, .aui .portlet-minimized .portlet-content-container {
	  background-color: #fafafa;
	}
	.jqplot-table-legend-label{width: 79px;}
	
	.ibox-content{
		padding:5px;
	}
	.ibox-title{
		min-height: auto;
	}
	.ibox-title {
	
		padding: 5px;
	
	}
	.aui .table th, .aui .table td{
	 padding: 3px;
	 padding-left:5px;
	 font-size: 13px;
	}
	.aui .nav-tabs > li > a
	 border-radius: 0px 0px 0px 0px;
	}
	
	
	.aui .tab-content {
    overflow: visible;
	}
	
	.ball{
		width:20px;
		height:20px;border-radius:100px; 
		float:left;
	}
	
	.ibox-content{
		display: none;
	}
	.aui .titleL{
	float:left;
	}
	
	.aui .titleR{
	float:right;
	}
	.aui .ballStatus{
	height:20px;
	width:20px;
	border-radius:100%;
	}
	
	.aui .clicked{
		background-color:white;
	}
	
/* Au */

.aui .number-down {
 	color: #c52f61;
    font-weight: 800;
}
.aui .number-up {
 	color: #46a546;
    font-weight: 800;
}
.aui .text-totol {
	font-weight: 800;
    color: #1c84c6;
}
.aui .text-zero {
    color: #f8ac59;
    font-weight: 800;
    }
.aui .text-bold {
    color: #555;
    font-weight: 600;
    }
.aui .number-bold {
    color: #555;
    font-weight: 800;
    }
        
    
.aui .panel {
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
}
.aui .panel-group .panel {
    margin-bottom: 5px;
    border-radius: 4px;
}
.aui .panel-default {
    border-color: #fc0;
    
}    
    
.aui .panel-default>.panel-heading {
    color: #333;
/*     background-color: #fc0; */
	background: rgba(255,217,46,1);
	background: -moz-linear-gradient(left, rgba(255,217,46,1) 0%, rgba(255,208,0,1) 40%, rgba(255,208,0,1) 100%);
	background: -webkit-gradient(left top, right top, color-stop(0%, rgba(255,217,46,1)), color-stop(40%, rgba(255,208,0,1)), color-stop(100%, rgba(255,208,0,1)));
	background: -webkit-linear-gradient(left, rgba(255,217,46,1) 0%, rgba(255,208,0,1) 40%, rgba(255,208,0,1) 100%);
	background: -o-linear-gradient(left, rgba(255,217,46,1) 0%, rgba(255,208,0,1) 40%, rgba(255,208,0,1) 100%);
	background: -ms-linear-gradient(left, rgba(255,217,46,1) 0%, rgba(255,208,0,1) 40%, rgba(255,208,0,1) 100%);
	background: linear-gradient(to right, rgba(255,217,46,1) 0%, rgba(255,208,0,1) 40%, rgba(255,208,0,1) 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffd92e', endColorstr='#ffd000', GradientType=1 );

    border-color: #fc0;
    padding: 1px;
    padding-bottom:5px;
    max-height: 30px;
}

.aui .panel-group .panel-heading {
    border-bottom: 0;
}
.aui .panel-heading {
    display: block;
    text-decoration: none;
    margin: 0px 0px;
    border-bottom: 1px solid transparent;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
}

.aui .panel-heading a { 
    display: block !important;
    font-size: 16px !important;
    font-weight: bold !important;
    padding: 9px 10px 8px 10px;
    margin: -11px 0px;
	text-decoration: none; 
 } 
.aui .panel-heading a:hover {
	display: block;
    color: #ffffff !important;
    text-decoration: none;
}

.aui .panel-body{
	margin: 10px;
}
.aui #fieldNumberOfRight{
	vertical-align: middle;
	text-align: right;
	padding-right: 5px;
	min-width:50px;
}
.aui tbody:hover td[rowspan],.aui tr:hover td {
   background-color: #edf8fd; 
}
    
 .aui .progress {
    margin-bottom: 0px;  
    }
.aui .progress-success.progress-striped .bar, .aui .progress-striped .bar-success {
    background-color: #a04dff;
    } 
    
</style>

</head>

<body class="top-navigation gray-bg ">

<!--  #####################Content data here ######################-->
<div class="">
<!-- 
<h2>
	<i class="fa fa fa-dashboard icon-title"></i> 
	<span id="modalDescription"> Company Dashboard</span> 
</h2>
 -->
				<div class="row-fluid"><!-- start--row-fluid -->

                    <div class="span12">
                        <div class="ibox float-e-margins">
                            <div class="ibox-title" style='padding-bottom:0px;'>
								<div class='container-fluid'>
									<div class='span2 '>
									  <div class="titlePanelSearch" style="margin-left:0px;margin-bottom:10px;">KPI DASHBOARD</div>
									</div>
									<div class='span10 object-right'>
										
										<div class="span3 offset4 inputFormSearch">
											<div class="form-group">
												<label class="span4 control-label year-label numberOnly">Year:</label>
												<div id="connection_name0" class="span8  inputFormSearch">
												
												<select style="width:100%" name="paramYear" id="paramYear" class="form-control input-sm">
												
												</select>
												
												</div>
											</div>
										</div>
										<div class="span3 inputFormSearch">
											<div class="form-group">
												<label class="span4 control-label period-label numberOnly">Period:</label>
												<div id="connection_name0" class="span8 inputFormSearch">
												
												<select style="width:100%" name="paramMonth" id="paramMonth" class="form-control input-sm">
												
												</select>
												
												</div>
											</div>
										</div>
<!-- 										<div class="span3 inputFormSearch"> -->
<!-- 											<div class="form-group"> -->
<!-- 												<label class="span4 control-label period-label numberOnly">Employee: </label> -->
<!-- 												<div id="connection_name0" class="span8 inputFormSearch"> -->
												
<!-- 												<select style="width:100%" name="paramEmp" id="paramEmp" class="form-control input-sm"> -->
													
<!-- 												</select> -->
												
<!-- 												</div> -->
<!-- 											</div> -->
<!-- 										</div> -->
										
										<div class="span2">
										
											<button id="btnSearchAdvance" name="btnSearchAdvance" class="btn btn-info input-sm" type="submit" style="margin-bottom: 5px;">&nbsp;<span>Submit</span></button>
			
										</div>
										
									</div>
								</div>                               
                                 
         					</div>
         					
         						<div class="ibox-content"> 
         							<!-- content start -->
         							<div class="row-fluid">
							<div class="table-responsive" style="overflow:auto">
								<table class="table table-hover " id="tableAppraisalStructure" >
									<thead id="listHeadAppraisalStructure">
										  <tr>
										    <th class="" rowspan="2" class="objectCenter" style='width:20%;min-width:250px;text-align:center;vertical-align: middle;' >Employee</th>
										    <th class="" colspan="7" style='width: auto; text-align: center;'>Apprasal Structure</th>
										  </tr>
										<tr>
											<th id="fieldNumberOfRight">KPI(CWN)</th>
											<th id="fieldNumberOfRight">ICSP</th>
											<th id="fieldNumberOfRight">F/C</th>
											<th id="fieldNumberOfRight">PI</th>
											<th id="fieldNumberOfRight">T/A</th>
											<th id="fieldNumberOfRight" colspan="2">Total</th>
											
											
										</tr>
									</thead>
									<tbody id="listAppraisalStructure">
										<tr>
											<td style='vertical-align: middle;font-weight: 800;'>ว่าที่ร้อยตรีหญิงสุชาดา  สิงห์เชิดชูวงศ์</td>
											<td id="fieldNumberOfRight"><span class="number-up"> <i class="fa fa-caret-up"></i> 1.81</span></td>
											<td id="fieldNumberOfRight"><span class="number-up"> <i class="fa fa-caret-up"></i> 0.52</span></td>
											<td id="fieldNumberOfRight"><span class="number-up"> <i class="fa fa-caret-up"></i> 0.33</span></td>
											<td id="fieldNumberOfRight"><span class="number-up"> <i class="fa fa-caret-up"></i> 0.81</span></td>
											<td id="fieldNumberOfRight"><span class="number-down"> <i class="fa fa-caret-down"></i> -1.81</span></td>
											<td id="fieldNumberOfRight"><span class="text-totol">2.80 <i class="fa fa-bolt"></i></span> </td>
											<td style="width:25px;"><div style="background-color:orange;" class="ballStatus"><span style="padding-left:6px;">2</span></div></td>
										</tr>
										<tr>
											<td style='vertical-align: middle;font-weight: 800;'>ว่าที่ร้อยตรีหญิงสุชาดา  สิงห์เชิดชูวงศ์</td>
											<td id="fieldNumberOfRight"><span class="number-up"> <i class="fa fa-caret-up"></i> 1.81</span></td>
											<td id="fieldNumberOfRight"><span class="number-up"> <i class="fa fa-caret-up"></i> 0.52</span></td>
											<td id="fieldNumberOfRight"><span class="number-up"> <i class="fa fa-caret-up"></i> 0.35</span></td>
											<td id="fieldNumberOfRight"><span class="number-up"> <i class="fa fa-caret-up"></i> 0.86</span></td>
											<td id="fieldNumberOfRight"><span class="text-zero"> <i class="fa fa-sort"></i> 0.00</span></td>
											<td id="fieldNumberOfRight" ><span class="text-totol">2.80 <i class="fa fa-bolt"></i></span></td>
											<td style="width:25px;"><div style="background-color:#00ff00;" class="ballStatus"><span style="padding-left:6px;">4</span></div></td>
										</tr>
										<tr>
											<td style='vertical-align: middle;font-weight: 800;'>ว่าที่ร้อยตรีหญิงสุชาดา  สิงห์เชิดชูวงศ์</td>
											<td id="fieldNumberOfRight"><span class="number-up"> <i class="fa fa-caret-up"></i> 1.83</span></td>
											<td id="fieldNumberOfRight"><span class="number-up"> <i class="fa fa-caret-up"></i> 0.50</span></td>
											<td id="fieldNumberOfRight"><span class="number-up"> <i class="fa fa-caret-up"></i> 0.31</span></td>
											<td id="fieldNumberOfRight"><span class="number-up"> <i class="fa fa-caret-up"></i> 0.84</span></td>
											<td id="fieldNumberOfRight"><span class="number-down"> <i class="fa fa-caret-down"></i> -1.8</span></td>
											<td id="fieldNumberOfRight" ><span class="text-totol">2.80 <i class="fa fa-bolt"></i></span></td>
											<td style="width:25px;"><div style="background-color:red;" class="ballStatus"><span style="padding-left:6px;">1</span></div></td>
										</tr>
										<tr>
											<td style='vertical-align: middle;font-weight: 800;'>ว่าที่ร้อยตรีหญิงสุชาดา  สิงห์เชิดชูวงศ์</td>
											<td id="fieldNumberOfRight"><span class="number-up"> <i class="fa fa-caret-up"></i> 1.81</span></td>
											<td id="fieldNumberOfRight"><span class="number-up"> <i class="fa fa-caret-up"></i> 0.51</span></td>
											<td id="fieldNumberOfRight"><span class="text-zero"> <i class="fa fa-sort"></i> 0.00</span></td>
											<td id="fieldNumberOfRight"><span class="number-up"> <i class="fa fa-caret-up"></i> 0.81</span></td>
											<td id="fieldNumberOfRight"><span class="number-down"> <i class="fa fa-caret-down"></i> -1.82</span></td>
											<td id="fieldNumberOfRight" ><span class="text-totol">2.80 <i class="fa fa-bolt"></i></span></td>
											<td style="width:25px;"><div style="background-color:yellow;;" class="ballStatus"><span style="padding-left:6px;">3</span></div></td>
										</tr>
									</tbody>
								</table>


							</div>
         							
         							</div>
         							<div class="row-fluid">
										<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
<!-- 										  <div class="panel panel-default"> -->
<!-- 										    <div class="panel-heading" role="tab" id="headingOne"> -->
<!-- 										      <h4 class="panel-title"> -->
<!-- 										        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style='color: black;font-weight: bold;'> -->
<!-- 										          <span class="fa fa-plus"></span> KPI(CWN) (Quantity) -->
<!-- 										        </a> -->
<!-- 										      </h4> -->
<!-- 										    </div> -->
<!-- 										    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne"> -->
<!-- 										      <div class="panel-body"> -->
<!-- 										        <div class='row-fluid'> -->
<!-- 										        	<div class="span12"> -->
<!-- 										                    <div class="ibox float-e-margins"> -->
<!-- 										                        <div class="ibox-title"> -->
<!-- 										                            <div class='titlePanelSearch2'>Balance Scorecard</div> -->
										                            
<!-- 										                        </div> -->
<!-- 										                        <div class="ibox-content" id='ibox-content-bsc3' >style='overflow:auto;max-height:310px;' -->
<!-- 																	<div class="title2 yellow2"> -->
<!-- 																		<div class="titleL">Financial </div>   -->
<!-- 																		<br style="clear:both">  -->
<!-- 																	</div> -->
<!-- 																	<div class="table-responsive" style="overflow:auto"> -->
<!-- 																	<table class="table table-hover"> -->
<!-- 																	<thead> -->
<!-- 																		<tr> -->
<!-- 																			<th style='width:25%;min-width:310px;' class='text-bold'>KPI Name&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th> -->
<!-- 																			<th style='min-width: 200px;'>Employee</th> -->
<!-- 																			<th id="fieldNumberOfRight">Target</th> -->
<!-- 																			<th id="fieldNumberOfRight">Actual</th> -->
<!-- 																			<th id="fieldNumberOfRight" >Score</th> -->
<!-- 																			<th style='width: 35%;'>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th> -->
																			
<!-- 																		</tr> -->
<!-- 																	</thead> -->
<!-- 																	<tbody> -->
<!-- 																		<tr id="id-1412" class="clickable appraisalItem"> -->
<!-- 																			<td rowspan="2" style='vertical-align: middle;'class="text-bold">01.NTS - Net Trade Sales</td> -->
<!-- 																			<td style='vertical-align: middle;' class="text-bold">ว่าที่ร้อยตรีหญิงสุชาดา  สิงห์เชิดชูวงศ์</td> -->
<!-- 																			<td id="fieldNumberOfRight"><span class="number-bold">10</span></td> -->
<!-- 																			<td id="fieldNumberOfRight"><span class="number-bold">4</span></td> -->
<!-- 																			<td id="fieldNumberOfRight" class="number-bold">2</td> -->
<!-- 																			<td id="fieldNumberOfRight" > -->
<!-- 																				<div class="progress progress-striped progress-success active"> -->
<!-- 																				  <div class="bar" style="width: 40%;"></div> -->
<!-- 																				</div> -->
<!-- 																			</td> -->
																			
																			
<!-- 																		</tr> -->
<!-- 																		<tr id="id-1412" class="clickable appraisalItem"> -->
																			
<!-- 																			<td style='vertical-align: middle;font-weight: 600;'>ว่าที่ร้อยตรีหญิงสุชาดา  สิงห์เชิดชูวงศ์2</td> -->
<!-- 																			<td id="fieldNumberOfRight"><span class="number-bold">10</span></td> -->
<!-- 																			<td id="fieldNumberOfRight"><span class="number-bold">4</span></td> -->
<!-- 																			<td id="fieldNumberOfRight" class="number-bold">2</td> -->
<!-- 																			<td id="fieldNumberOfRight"> -->
<!-- 																				<div class="progress progress-striped progress-success active"> -->
<!-- 																				  <div class="bar" style="width: 55%;"></div> -->
<!-- 																				</div> -->
<!-- 																			</td> -->
<!-- 																		</tr> -->
<!-- 																	</tbody> -->
<!-- 																	<tbody> -->
<!-- 																		<tr id="id-1413" class="clickable appraisalItem"> -->
<!-- 																			<td rowspan="2" style='vertical-align: middle;'class="text-bold">02.NI - Net Income</td> -->
<!-- 																			<td style='vertical-align: middle;' class="text-bold">ว่าที่ร้อยตรีหญิงสุชาดา  สิงห์เชิดชูวงศ์3</td> -->
<!-- 																			<td id="fieldNumberOfRight"><span class="number-bold">10</span></td> -->
<!-- 																			<td id="fieldNumberOfRight"><span class="number-bold">4</span></td> -->
<!-- 																			<td id="fieldNumberOfRight" class="number-bold">2</td> -->
<!-- 																			<td id="fieldNumberOfRight"> -->
<!-- 																				<div class="progress progress-striped  active"> -->
<!-- 																				  <div class="bar" style="width: 20%;"></div> -->
<!-- 																				</div> -->
<!-- 																			</td> -->
<!-- 																		</tr> -->
<!-- 																		<tr id="id-1413" class="clickable appraisalItem"> -->
																			
<!-- 																			<td style='vertical-align: middle;' class="text-bold">ว่าที่ร้อยตรีหญิงสุชาดา  สิงห์เชิดชูวงศ์</td> -->
<!-- 																			<td id="fieldNumberOfRight"><span class="number-bold">10</span></td> -->
<!-- 																			<td id="fieldNumberOfRight"><span class="number-bold">5</span></td> -->
<!-- 																			<td id="fieldNumberOfRight" class="number-bold">2</td> -->
<!-- 																			<td id="fieldNumberOfRight"> -->
<!-- 																				<div class="progress progress-striped  active"> -->
<!-- 																				  <div class="bar" style="width: 86%;"></div> -->
<!-- 																				</div> -->
<!-- 																			</td> -->
<!-- 																		</tr>	 -->
<!-- 																	</tbody> -->
<!-- 																	</table> -->
<!-- 																	</div> -->
<!-- 																	<div class="title2 yellow2"> -->
<!-- 																		<div class="titleL">Internal Business Process</div>  -->
<!-- 																		<br style="clear:both">  -->
<!-- 																	</div> -->
<!-- 																	<table class="table table-hover"> -->
<!-- 																	<thead> -->
<!-- 																		<tr> -->
<!-- 																			<tr> -->
<!-- 																			<th style='width:25%;min-width:310px;' class='text-bold'>KPI Name&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th> -->
<!-- 																			<th style='min-width: 200px;' class='text-bold'>Employee</th> -->
<!-- 																			<th id="fieldNumberOfRight">Target</th> -->
<!-- 																			<th id="fieldNumberOfRight">Actual</th> -->
<!-- 																			<th id="fieldNumberOfRight" >Score</th> -->
<!-- 																			<th style='width: 35%;'>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th> -->
<!-- 																		</tr> -->
<!-- 																		</tr> -->
<!-- 																	</thead> -->
<!-- 																	<tbody> -->
<!-- 																		<tr id="id-1414" class="clickable appraisalItem"> -->
<!-- 																			<td rowspan="3">01.NTS - Net Trade Sales</td> -->
<!-- 																			<td>ว่าที่ร้อยตรีหญิงสุชาดา  สิงห์เชิดชูวงศ์</td> -->
<!-- 																			<td id="fieldNumberOfRight">10</td> -->
<!-- 																			<td id="fieldNumberOfRight">-4</td> -->
<!-- 																			<td id="fieldNumberOfRight">6</td> -->
<!-- 																			<td id="fieldNumberOfRight"> -->
<!-- 																				<div class="progress progress-striped progress-success active"> -->
<!-- 																				  <div class="bar" style="width: 10%;"></div> -->
<!-- 																				</div> -->
<!-- 																			</td> -->
																			
<!-- 																		</tr> -->
<!-- 																		<tr id="id-1414" class="clickable appraisalItem"> -->
																			
<!-- 																			<td>ว่าที่ร้อยตรีหญิงสุชาดา  สิงห์เชิดชูวงศ์</td> -->
<!-- 																			<td id="fieldNumberOfRight">10</td> -->
<!-- 																			<td id="fieldNumberOfRight">-4</td> -->
<!-- 																			<td id="fieldNumberOfRight">6</td> -->
<!-- 																			<td id="fieldNumberOfRight"> -->
<!-- 																				<div class="progress progress-striped progress-success active"> -->
<!-- 																				  <div class="bar" style="width: 74%;"></div> -->
<!-- 																				</div> -->
<!-- 																			</td> -->
<!-- 																		</tr> -->
<!-- 																		<tr id="id-1414" class="clickable appraisalItem"> -->
																			
<!-- 																			<td>ว่าที่ร้อยตรีหญิงสุชาดา  สิงห์เชิดชูวงศ์</td> -->
<!-- 																			<td id="fieldNumberOfRight">10</td> -->
<!-- 																			<td id="fieldNumberOfRight">-4</td> -->
<!-- 																			<td id="fieldNumberOfRight">6</td> -->
<!-- 																			<td id="fieldNumberOfRight"> -->
<!-- 																				<div class="progress progress-striped progress-success active"> -->
<!-- 																				  <div class="bar" style="width: 29%;"></div> -->
<!-- 																				</div> -->
<!-- 																			</td> -->
<!-- 																		</tr> -->
<!-- 																	</tbody> -->
<!-- 																	<tbody> -->
<!-- 																		<tr id="id-1417" class="clickable appraisalItem"> -->
<!-- 																			<td>04.SG&A - Selling, General and Administrative Exp.</td> -->
<!-- 																			<td>ว่าที่ร้อยตรีหญิงสุชาดา  สิงห์เชิดชูวงศ์</td> -->
<!-- 																			<td id="fieldNumberOfRight">10</td> -->
<!-- 																			<td id="fieldNumberOfRight">-4</td> -->
<!-- 																			<td id="fieldNumberOfRight">6</td> -->
<!-- 																			<td id="fieldNumberOfRight"> -->
<!-- 																				<div class="progress progress-striped  active"> -->
<!-- 																				  <div class="bar" style="width: 65%;"></div> -->
<!-- 																				</div> -->
<!-- 																			</td> -->
<!-- 																		</tr>	 -->
<!-- 																	</tbody> -->
<!-- 																	</table> -->
<!-- 										                        </div> -->
														
<!-- 														</div> -->
<!-- 										            </div> -->
				         							
<!-- 										        </div> -->
<!-- 										      </div> -->
<!-- 										    </div> -->
<!-- 										  </div> -->
<!-- 										  <div class="panel panel-default"> -->
<!-- 										    <div class="panel-heading" role="tab" id="headingTwo"> -->
<!-- 										      <h4 class="panel-title"> -->
<!-- 										        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" style='color: black;font-weight: bold;'> -->
<!-- 										          <span class="fa fa-plus"></span> ICSP (Quantity) -->
<!-- 										        </a> -->
<!-- 										      </h4> -->
<!-- 										    </div> -->
<!-- 										    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo"> -->
<!-- 										      <div class="panel-body"> -->
<!-- <!-- List Quality Start										         --> 
<!-- 												<div class='row-fluid'> -->
<!-- 										        	<div class="span12"> -->
<!-- 										                    <div class="ibox float-e-margins"> -->
<!-- 										                        <div class="ibox-title"> -->
<!-- 										                            <div class='titlePanelSearch2'>Balance Scorecard</div> -->
										                            
<!-- 										                        </div> -->
<!-- 										                        <div class="ibox-content" id='ibox-content-bsc3' >style='overflow:auto;max-height:310px;' -->
<!-- 																	<div class="table-responsive" style="overflow:auto"> -->
<!-- 																	<table class="table table-hover"> -->
<!-- 																	<thead> -->
<!-- 																		<tr> -->
<!-- 																			<th style='width:25%;min-width:310px;' class='text-bold'>KPI Name&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th> -->
<!-- 																			<th style='min-width: 200px;' class='text-bold'>Employee</th> -->
<!-- 																			<th id="fieldNumberOfRight" class='number-bold'>Target</th> -->
<!-- 																			<th id="fieldNumberOfRight" class='number-bold' >Score</th> -->
<!-- 																			<th style='width: 35%;'>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th> -->
																			
<!-- 																		</tr> -->
<!-- 																	</thead> -->
<!-- 																	<tbody> -->
<!-- 																		<tr id="id-1412" class="clickable appraisalItem"> -->
<!-- 																			<td rowspan="2">01.NTS - Net Trade Sales</td> -->
<!-- 																			<td>ว่าที่ร้อยตรีหญิงสุชาดา  สิงห์เชิดชูวงศ์</td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'>10</td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'>1</td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'> -->
<!-- 																				<div class="progress progress-striped progress-success active"> -->
<!-- 																				  <div class="bar" style="width: 25%;"></div> -->
<!-- 																				</div> -->
<!-- 																			</td> -->
																			
																			
<!-- 																		</tr> -->
<!-- 																		<tr id="id-1412" class="clickable appraisalItem"> -->
																			
<!-- 																			<td>ว่าที่ร้อยตรีหญิงสุชาดา  สิงห์เชิดชูวงศ์2</td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'>10</td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'>4 </td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'> -->
<!-- 																				<div class="progress progress-striped progress-success active"> -->
<!-- 																				  <div class="bar" style="width: 100%;"></div> -->
<!-- 																				</div> -->
<!-- 																			</td> -->
<!-- 																		</tr> -->
<!-- 																	</tbody> -->
<!-- 																	<tbody> -->
<!-- 																		<tr id="id-1413" class="clickable appraisalItem"> -->
<!-- 																			<td rowspan="2">02.NI - Net Income</td> -->
<!-- 																			<td>ว่าที่ร้อยตรีหญิงสุชาดา  สิงห์เชิดชูวงศ์3</td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'>10</td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'>3 </td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'> -->
<!-- 																				<div class="progress progress-striped  active"> -->
<!-- 																				  <div class="bar" style="width: 75%;"></div> -->
<!-- 																				</div> -->
<!-- 																			</td> -->
<!-- 																		</tr> -->
<!-- 																		<tr id="id-1413" class="clickable appraisalItem"> -->
																			
<!-- 																			<td>ว่าที่ร้อยตรีหญิงสุชาดา  สิงห์เชิดชูวงศ์</td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'>10</td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'>2</td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'> -->
<!-- 																				<div class="progress progress-striped  active"> -->
<!-- 																				  <div class="bar" style="width: 50%;"></div> -->
<!-- 																				</div> -->
<!-- 																			</td> -->
<!-- 																		</tr>	 -->
<!-- 																	</tbody> -->
<!-- 																	</table> -->
<!-- 																	</div> -->
<!-- 										                        </div> -->
<!-- 														</div> -->
<!-- 										            </div> -->
				         							
<!-- 										        </div> -->
<!-- <!-- List Quality END										         --> 
<!-- 										      </div> -->
<!-- 										    </div> -->
<!-- 										  </div> -->
<!-- 										  <div class="panel panel-default"> -->
<!-- 										    <div class="panel-heading" role="tab" id="headingThree"> -->
<!-- 										      <h4 class="panel-title"> -->
<!-- 										        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree" style='color: black;font-weight: bold;'style='color: black;font-weight: bold;'> -->
<!-- 										        <span class="fa fa-plus"></span> F/C (Deduct) -->
<!-- 										        </a> -->
<!-- 										      </h4> -->
<!-- 										    </div> -->
<!-- 										    <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree"> -->
<!-- 										      <div class="panel-body"> -->
<!-- <!-- List Deduct Start										         --> 
<!-- 												<div class='row-fluid'> -->
<!-- 										        	<div class="span12"> -->
<!-- 										                    <div class="ibox float-e-margins"> -->
<!-- 										                        <div class="ibox-title"> -->
<!-- 										                            <div class='titlePanelSearch2'>Balance Scorecard</div> -->
										                            
<!-- 										                        </div> -->
<!-- 										                        <div class="ibox-content" id='ibox-content-bsc3' >style='overflow:auto;max-height:310px;' -->
<!-- 																	<div class="table-responsive" style="overflow:auto"> -->
<!-- 																	<table class="table table-hover"> -->
<!-- 																	<thead> -->
<!-- 																		<tr> -->
<!-- 																			<th style='width:25%;min-width:310px;' >KPI Name&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th> -->
<!-- 																			<th style='min-width: 200px;' >Employee</th> -->
<!-- 																			<th id="fieldNumberOfRight" class='number-bold'>Max Value</th> -->
<!-- 																			<th id="fieldNumberOfRight" class='number-bold' >Actual Value</th> -->
<!-- 																			<th id="fieldNumberOfRight" class='number-bold' >Over Value</th> -->
<!-- 																			<th style='width: 35%;'>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th> -->
																			
<!-- 																		</tr> -->
<!-- 																	</thead> -->
<!-- 																	<tbody> -->
<!-- 																		<tr id="id-1412" class="clickable appraisalItem"> -->
<!-- 																			<td rowspan="2" class='text-bold'>01.NTS - Net Trade Sales</td> -->
<!-- 																			<td class='text-bold'>ว่าที่ร้อยตรีหญิงสุชาดา  สิงห์เชิดชูวงศ์</td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'>0</td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'>3</td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'>-3</td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'> -->
<!-- 																				<div class="progress progress-striped progress-danger active"> -->
<!-- 																				  <div class="bar" style="width: 25%;">-3</div> -->
<!-- 																				</div> -->
<!-- 																			</td> -->
																			
																			
<!-- 																		</tr> -->
<!-- 																		<tr id="id-1412" class="clickable appraisalItem"> -->
																			
<!-- 																			<td class='text-bold'>ว่าที่ร้อยตรีหญิงสุชาดา  สิงห์เชิดชูวงศ์2</td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'>0</td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'>2 </td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'>-4 </td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'> -->
<!-- 																				<div class="progress progress-striped progress-danger active"> -->
<!-- 																				  <div class="bar" style="width: 50%;">-4</div> -->
<!-- 																				</div> -->
<!-- 																			</td> -->
<!-- 																		</tr> -->
<!-- 																	</tbody> -->
<!-- 																	<tbody> -->
<!-- 																		<tr id="id-1413" class="clickable appraisalItem"> -->
<!-- 																			<td class='text-bold' rowspan="2">02.NI - Net Income</td> -->
<!-- 																			<td class='text-bold' >ว่าที่ร้อยตรีหญิงสุชาดา  สิงห์เชิดชูวงศ์3</td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'>0</td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'>0</td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'>0</td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'> -->
<!-- 																				<div class="progress progress-striped progress-warning active"> -->
<!-- 																				  <div class="bar" style="width: 0%;">0</div> -->
<!-- 																				</div> -->
<!-- 																			</td> -->
<!-- 																		</tr> -->
<!-- 																		<tr id="id-1413" class="clickable appraisalItem"> -->
																			
<!-- 																			<td class='text-bold'>ว่าที่ร้อยตรีหญิงสุชาดา  สิงห์เชิดชูวงศ์</td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'>0</td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'>1</td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'>-1</td> -->
<!-- 																			<td id="fieldNumberOfRight" class='number-bold'> -->
<!-- 																				<div class="progress progress-striped progress-warning active"> -->
<!-- 																				  <div class="bar" style="width: 10%;">-1</div> -->
<!-- 																				</div> -->
<!-- 																			</td> -->
<!-- 																		</tr>	 -->
<!-- 																	</tbody> -->
<!-- 																	</table> -->
<!-- 																	</div> -->
<!-- 										                        </div> -->
<!-- 														</div> -->
<!-- 										            </div> -->
				         							
<!-- 										        </div> -->
<!-- <!-- List Deduct END										         --> 
<!-- 										      </div> -->
<!-- 										    </div> -->
<!-- 										  </div> -->
										
										</div>         							
         							
         							
         							</div>
         							<div class='row-fluid' style="display:none;">
         								
         								
	         							<div class="span4">
							                    <div class="ibox float-e-margins">
							                        <div class="ibox-title">
							                            <div class='titlePanelSearch2'>Balance Scorecard</div>
							                            
							                        </div>
							                        <div class="ibox-content" id='ibox-content-bsc'>

							                        </div>
							                    </div>
							            </div>
							            
							            <div class="span8 " style='margin-left: 5px;'>
	<ul class="nav nav-tabs" style="width:30; margin-bottom: 0px;">
		<li class="active"><a data-toggle="tab" href="#monthly" id="Monthly_tab" style='border-radius: 0px;'>Monthly</a></li>
		<li><a data-toggle="tab" href="#YTD" id="YTD_tab" style=' border-radius: 0px;'>YTD</a></li>
	</ul>
	
	<div class="tab-content" style='overflow: visible; '>
	<div class='itemName ' style='text-align:center; padding:5px; font-weight:bold; margin: 5px;'></div>
    <div id="monthly" class="tab-pane fade in active">
    										<div class='row-fluid wrapper-content'>
							            		<div class='span12'>
								                    <div class="ibox float-e-margins">
								                        <!--<div class="ibox-title">
								                             <div class='titlePanelSearch2'>Monthly</div> 
								                            
								                        </div>-->
								                        <div class="ibox-content">
								                            
								                            <div class='row-fluid'>
								                            	
								                            	<div class='span12'  id='monthlyVarianceArea'>
								                            		<div class='chart'  style="width:100%" id='monthlyVariance'></div>
								                            	</div>
								                            </div>
								                            <div class='row-fluid'>	
								                            	<div class='span12' id='monthlyGrowthArea'>
								                            		<div class='chart'  style="width:100%" id='monthlyGrowth'></div>
								                            	</div>
								                            </div>
								                            
								                        </div>
								                    </div>
							                   	</div>
							                </div>
    
    </div>
    <div id="YTD" class="tab-pane fade">
    										<div class='row-fluid  wrapper-content'>
							            		<div class='span12'>
								                    <div class="ibox float-e-margins">
								                        <!--<div class="ibox-title">
								                              <div class='titlePanelSearch2'>YTD</div>
								                            
								                        </div> -->
								                        <div class="ibox-content">
								                        
								                            <div class='row-fluid'>
								                           <!-- <div class='itemName yellow2' style='text-align:center; padding:5px; font-weight:bold; margin-bottom: 5px;'></div> --> 
								                            	<div class='span12' id='ytdVarianceArea'>
								                            		<div class='chart' style="width:100%" id='ytdVariance'></div>
								                            	</div>
								                            </div>
								                            <div class='row-fluid'>
								                            	<div class='span12' id='ytdGrowthArea'>
								                            		<div class='chart' style="width:100%" id='ytdGrowth'></div>
								                            	</div>
								                            </div>
								                            
								                        </div>
								                    </div>
							                   	</div>
							                </div>
							                
    </div>
</div>  
							            </div>
							            
         							
         							</div>
         							<!-- content end -->
				         		</div>
				         		
				         		</div>
				         		
         				</div>
	
         			</div><!-- end--row-fluid -->
         			
         					 
  </div>       					
 <!--  #####################Content data here ######################-->
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 




 
 
