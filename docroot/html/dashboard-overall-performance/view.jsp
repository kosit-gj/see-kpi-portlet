<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui"%>
<%@ page import="javax.portlet.*"%>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>
<%@ page import="com.liferay.portal.kernel.util.WebKeys" %>

<liferay-theme:defineObjects />
<portlet:defineObjects />


<style>
.aui #breadcrumbs {
	margin-bottom: 0px;
}
.aui input[type="radio"], .aui input[type="checkbox"]{
	margin: -5px 0 0;
}
.aui label{
	margin-bottom: 0px;
}
.aui form{
	margin: 0 0 5px;
}
.aui .filter{
	margin-bottom: 5px;
    margin-top: 5px;
}
.aui .form-group > .control-label-search{
	padding-top: 5px;
}
.aui .titlePanelSearch {
    font-weight: bold;
}

 /* Large desktop Start#####################################*/
 @media (min-width: 1200px) { 
	
	.modal.large {
		width: 80%;
		margin-left: -25.5%;
		top: 0px;
		max-width: 768px;
	}
	.aui .advance-search .span3{width: 29.354%;}
	
  }
  /* Large desktop End######################################*/
  
  /*  desktop Start#########################################*/
 @media (min-width: 980px) and (max-width: 1199px) {
 		.modal.large {
			width: 80%;
			margin-left: -40%;
			top: 0px;
		}
		.aui .advance-search .span3{width: 28.754%;}
		/*All Start*/
		.aui #btnSearchAdvance{
		margin-bottom:5px;
		width:100%;
		}
		
		/*All End*/
 	
  }
 /*  desktop End############################################*/
 
 /* Portrait tablet to landscape and desktop Start##########*/
 @media (min-width: 768px) and (max-width: 979px) {
 		
	.modal.large {
		    width: 80%;
		    margin-left:-40%;  
		    top:0px;
		}
	.modal.medium {
		    width: 50%;
		    margin-left:-25%;  
		    top:0px;
		}
	.aui .modal{
		  left:1%;
		}	
	.aui .ibox-title2{
		height:45px;
	}
	
	.aui .ibox-title{
		min-height: 0px;
	}
	
	
	.aui .advance-search .span3{width: 27.938%;}
	/*All Form Start*/
	
	.aui #btnSearchAdvance{
		margin-bottom:5px;
		width:100%;
	}
	/*All Form End*/
  }
 /* Portrait tablet to landscape and desktop End############*/ 
 
 /* Landscape phone to portrait tablet Start################*/
 @media (max-width: 767px) { 
 .modal.large {
		width: '';
		top: 0px;
	}

	
  }
 /* Landscape phone to portrait tablet End##################*/ 
 
 /* Landscape phones and down Start#########################*/
 @media (max-width: 480px) { 
 	
	

  }
  /* Landscape phones and down End##########################*/
  
  
  
  /* main start*/
 
       .aui .portlet-content, .aui .portlet-minimized .portlet-content-container {
	    -moz-border-bottom-colors: none;
	    -moz-border-left-colors: none;
	    -moz-border-right-colors: none;
	    -moz-border-top-colors: none;
	    border-color: #eaeaea;
	    border-image: none;
	    border-style: solid;
	    border-width: 0 1px 1px;
	    padding: 10px 10px 10px;
	}

.aui select {
    background-color: white;
    border: 1px solid #ccc;
    width: 100%;
}
.aui input{
	width: 100%;
}

.ibox-content {
    background-color: #fff;
    border: 1px solid #ffe57f;
    color: inherit;
    margin-bottom: 5px;
    padding: 5px;
}

.aui .pagination {
    margin: 0;
}
.aui #listSubordinate{
	display:none;
/*  	height: 430px;  */
    position: relative;
}
.display-none{
	display:none;
}
.pagingText {
    float: right;
    margin-right: 5px;
    padding-top: 5px;
}
.gray-bg {
    background-color: #f3f3f4;
}

.ibox-content {
    background-color: #fff;
    border: 1px solid #ffe57f;
    color: inherit;
    margin-bottom: 5px;
    padding-left: 15px;
    padding-right: 15px;
}

.form-file-mangement {
    height: 37px;
}
.form-label-customs{
	font-weight: bold;
}
.aui hr{
	margin: 10px 0;
}
/* main end*/

/*local start*/


.breadcrumbs2{

	background: rgba(0, 0, 0, 0) linear-gradient(to bottom, #fff 0px, #f6f6f6 47%, #ededed 100%) repeat scroll 0 0;
    border-radius: 0;
    margin-bottom: 0;
  	padding-bottom: 5px

}
.wrapper-content{
	padding: 10px;
}
.aui .table thead th{
	font-weight:bold;
}
.aui .form-group > .control-label-search{
   	/*font-weight:bold;*/
}


/*local end*/
/* Update by au */
.aui .btn {
	font-size: 14px;
 	padding: 4px 12px; 
	width: auto;
	margin-top: 0px;
	display: inline;
}
.aui select, .aui textarea, .aui input[type="text"], .aui input[type="password"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="date"], .aui input[type="month"], .aui input[type="time"], .aui input[type="week"], .aui input[type="number"], .aui input[type="email"], .aui input[type="url"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="color"], .aui .uneditable-input {
    height: 30px;
    padding: none;
    font-size: 14px;
}



.fontBold {
	font-weight: bold;
}

.aui .alert, .aui .portlet-msg-alert, .aui .portlet-msg-error, .aui .portlet-msg-help,
	.aui .portlet-msg-info, .aui .portlet-msg-progress, .aui .portlet-msg-success
	{
	padding: 8px 8px 8px 14px;
	color: #555;
	margin-bottom: 0;
}

.aui select, .aui textarea, .aui input[type="text"], .aui input[type="password"],
	.aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="date"],
	.aui input[type="month"], .aui input[type="time"], .aui input[type="week"],
	.aui input[type="number"], .aui input[type="email"], .aui input[type="url"],
	.aui input[type="search"], .aui input[type="tel"], .aui input[type="color"],
	.aui .uneditable-input {
	height: '';
}

.aui input[type="color"], .aui input[type="date"], .aui input[type="datetime"],
	.aui input[type="datetime-local"], .aui input[type="email"], .aui input[type="month"],
	.aui input[type="number"], .aui input[type="password"], .aui input[type="search"],
	.aui input[type="tel"], .aui input[type="text"], .aui input[type="time"],
	.aui input[type="url"], .aui input[type="week"], .aui select, .aui textarea,
	.aui .uneditable-input {
	margin-bottom: 0px;
}


/* Next & Back */
.arrow {
	cursor: pointer;
	position: relative;
	display: block;
	top: 43%; //
	margin: 100px 0 0 100px;
	width: 25px;
	height: 25px;
	border: solid 3px #999;
	border-radius: 100%;
	z-index: 1;
	transition: all .2s linear;
	opacity: 0.3;
}

.arrow:before, .arrow:after {
	content: "";
	position: absolute;
	width: 35%;
	height: 10%;
	top: 41%;
	left: 55%;
	background: #999;
	z-index: 2;
	transform: translate(-50%, -50%) rotate(45deg);
	transition: all .2s linear;
}

.arrow:after {
	z-index: 3;
	top: 59%;
	left: 55%;
	transform: translate(-50%, -50%) rotate(-45deg);
}

.arrow:hover {
	border: solid 6px #777;
}

.arrow:hover:after, .arrow:hover:before {
	background: #777;
}

.arrow:active {
	border: solid 6px #111;
}

.arrow:active:after, .arrow:active:before {
	background: #111;
}

.aui #previous {
	transform: rotate(180deg);
	display: block;
	float: left;
	margin-left: 0px;
	position: absolute;
}

.aui #next {
	position: absolute;
	right: 0px;
	margin-right: 15px;
	margin-top: 0px;
}
/* Next & Back */
#nameDiv{
    font-size: 14px;
    border-bottom: 1px dashed #666666;
    font-weight:bold;
    padding-bottom: 3px;
    margin-bottom: 3px;
    display: inline-block;
}
.graphLTopHeader {
	font-weight: bold;
	font-size: 18px;
	color: black;
	text-align: center;
	margin-top: 15px;
}
#listBubbleChart{
  	min-width: 600px; 
}
#listPieChart tspan {
/*     font-weight: bold; */
}
.aui .modal-dialog{
    overflow-y: initial !important;
}
.aui .modal-body{
    max-height: calc(100vh - 200px);
    overflow-y: auto;
}

.aui #listBubbleChart path {
    stroke: #999999 !important;
    stroke-opacity: 0.9 !important;
}
.aui .fusioncharts-caption{
	font-weight: bold;
}
.tableInside{
	width:100%;
}
.aui .table th, .aui .table td {
    border-top: 1px solid #ddd;
    line-height: 20px;
    padding-bottom: 3px;
    padding-right: 0;
    padding-top: 3px;
    text-align: left;
    vertical-align: top;
}
.aui .table-bordered {
/* 	border-collapse: collapse !important; */
}
.aui .table th, .aui .table td{
	font-size: 13px;
}
table#tableAllKPI .aui .table th, .aui .table td{
	padding: 2px;
}
.aui #showAllKPI{
	display: inline-block;
    float: right;
}
.aui #btn_kpi{
	display: none;
	margin-left: 5px; font-weight: 700; display: inline-block; margin-top: 3px;
}
.table-fixed thead {
  width: 97%;
}
.table-fixed tbody {
  height: 100%;
  overflow-y: auto;
  width: 100%;
}
.table-fixed thead, .table-fixed tbody, .table-fixed tr, .table-fixed td, .table-fixed th {
  display: block;
}
.table-fixed tbody td, .table-fixed thead > tr> th {
  float: left;
  border-bottom-width: 0;
}

.aui #ModalKPI .modal-body *{
-webkit-overflow-scrolling: touch ; 
/* overflow-scrolling:touch !important; */
overflow:auto;
}
</style>


<%
	String username = themeDisplay.getUser().getScreenName();
	String password = (String) request.getSession().getAttribute(WebKeys.USER_PASSWORD);
	layout = themeDisplay.getLayout();
	plid = layout.getPlid();
%>
<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">
<input type="hidden" id="plid_portlet" name="plid_portlet" value="<%= plid %>">
<div class='row-fluid '>
	<div class='col-xs-12'>
		<div id="slide_status" class="span12" style="z-index: 9000;">
			<div id="btnCloseSlide"><i class='fa fa-times'></i></div>
			<div id="slide_status_area"></div>
		</div>
	</div>
</div>
<div class="app_url_hidden" style="display: block;">
	<div class="row-fluid app_url_hidden">
		<!-- start--row-fluid -->

		<div class="span12">
			<div class="ibox float-e-margins">
				<div class="ibox-title"
					style="background-color: rgb(83, 120, 253); border-color: rgb(83, 120, 253); min-height: 0px;">
					<div class="titlePanelSearch">Advance Search</div>
				</div>

				<div class="ibox-content breadcrumbs2 advance-search"
					style="border-color: rgb(83, 120, 253);">

					<div class="row-fluid ">

						<div style="margin-left: 5px; margin-bottom: 3px;"
							class="form-group pull-left span3" id="yearArea">
							<select name="year" id="year" class="input form-control input-sm"
								title="" data-toggle="tooltip" style="cursor: pointer;"
								data-original-title="Year">

<!-- 								<option value="1">2016</option> -->
<!-- 								<option value="2">2017</option> -->

							</select>
						</div>
						<div style="margin-left: 5px; margin-bottom: 3px;"
							class="form-group pull-left span3" id="periodArea">
							<select name="period" id="period"
								class="input form-control input-sm" title=""
								data-toggle="tooltip" style="cursor: pointer;"
								data-original-title="Period">

								

							</select>
						</div>
						<div class="form-group pull-left span3" style="margin-left: 5px;margin-bottom: 3px;">
							<select name="app_type" id="app_type"
								class="input form-control input-sm" title=""
								data-toggle="tooltip" style="cursor: pointer;"
								data-original-title="Entity Type" >

								<option value="1">Individual Test</option>
								<option value="2">Organization Test</option>

							</select>
						</div>
						<div class="form-group pull-left span3" style="margin-left: 5px;margin-bottom: 3px;" id="txtEmpInput">
							<input data-toggle="tooltip" data-placement="top" disabled
								title="Employee Name" class="span12 m-b-n ui-autocomplete-input"
								placeholder="Employee Name" id="emp_name" name="emp_name"
								type="text"> <input class="form-control input-sm"
								id="emp_name_id" name="emp_name_id" value="" type="hidden">
						</div>
<!-- 						<div class="form-group pull-left span3" style="margin-left: 5px;margin-bottom: 3px;" > -->
<!-- 							<input data-toggle="tooltip" data-placement="top" -->
<!-- 								title="Position" class="span12 m-b-n ui-autocomplete-input" -->
<!-- 								placeholder="Position" id="position" name="position" type="text"> -->
<!-- 							<input class="form-control input-sm" id="position_id" -->
<!-- 								name="position_id" value="" type="hidden"> -->
<!-- 						</div> -->
						<div style="margin-left: 5px; margin-bottom: 3px;"
							class="form-group pull-left span3" id="apprasiaLevelArea">
							<select name="apprasiaLevel" id="apprasiaLevel"
								class="input form-control input-sm" title=""
								data-toggle="tooltip" style="cursor: pointer;"
								data-original-title="Level" >

<!-- 								<option value="">Appraisal Level : List Error</option> -->

							</select>
						</div>
						<div style="margin-left: 5px; margin-bottom: 3px;"
							class="form-group pull-left span3" id="organizationArea">
							<select name="organization" id="organization"
								class="input form-control input-sm" title=""
								data-toggle="tooltip" style="cursor: pointer;"
								data-original-title="Organization" >

<!-- 								<option value="">Organization : List Error</option> -->

							</select>
						</div>
						


						<div style="margin-bottom: 5px;"
							class="form-group pull-right m-b-none ">
							<button id="btnSearchAdvance" name="btnSearchAdvance"
								class="btn btn-info input-sm" type="button">
								<i class="fa fa-search"></i>&nbsp;Search
							</button>

						</div>

					</div>

				</div>
				<!-- content end -->
			</div>

		</div>

	</div>
	
	<!-- content accordion start -->
	<div class="ibox-content" id="listSubordinate" >
		
		
		<div style="">
		<div class="row-fluid ">
			<div class="span5 " >
				<div class="row-fluid ">
					<div class="span12" id="captionPieChart"></div>
				</div>
				<div class="row-fluid ">
					<div class="span12" id="listPieChart"></div>
				</div>
			</div>
			<div class="span7 " >
				<div class="row-fluid ">
					<div class="span12" id="captionBubbleChart"></div>
				</div>
				<div class="row-fluid " style="overflow:auto">
					<div class="span12" id="listBubbleChart"></div>
				</div>
			</div>
		</div>
		</div>
		
	</div>
	<!-- content accordion end -->




	<form id="linkParam" method="POST" target="_blank" action="POST">
		
	</form>
	<div aria-hidden="true" role="dialog" tabindex="-1" id="ModalKPI"
		class="modal inmodal large" style="display: none;">
		<div class="modal-dialog " >
			<div class="modal-content animated bounceInRight">
				<div class="modal-header">
					<button data-dismiss="modal" class="close" type="button" style="padding-top:5px">
						<span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only"></span>
					</button>
					<h4 class="modal-title" id="modalTitleRole">All KPI</h4>

				</div>
				<div class="modal-body">
					<!-- ############################################################################ -->
				<div style="overflow: auto" class="table-responsive p-b-xxs" >
					<table style="width: 100%;min-width: 720px;" class="table table-bordered fixedHeader" id="tableAllKPI">
						<thead style="height: 66px !important;">
							<tr>
								<th>Perspective</th>
								<th style="min-width: 130px;">KPI</th>
								<th style="min-width: 65px;">UOM</th>
								<th style="text-align: center; min-width: 250px;" id='overall_name_on_list_kpi'>KPI Result</th>
							</tr>
						</thead>
						<tbody id="kpiList">
						</tbody>
					</table>
				</div>
					<!-- ############################################################################ -->
					<!-- content end -->
				</div>
				<div class="modal-footer">
				
				</div>
			</div>
		</div>
	</div>
</div>
 
 
