<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui"%>
<%@ page import="javax.portlet.*"%>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>
<%@ page import="com.liferay.portal.kernel.util.WebKeys" %>
<%@ page import="com.liferay.portal.util.PortalUtil" %>
<liferay-theme:defineObjects />
<portlet:defineObjects />
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
<input type="hidden" id="get_year_id" name="get_year_id" value="<%= PortalUtil.getOriginalServletRequest(request).getParameter("param_year")%>">
<input type="hidden" id="get_period_id" name="get_period_id" value="<%= PortalUtil.getOriginalServletRequest(request).getParameter("param_period")%>">
<input type="hidden" id="get_appraisal_type_id" name="get_appraisal_type_id" value="<%= PortalUtil.getOriginalServletRequest(request).getParameter("param_app_type")%>">
<input type="hidden" id="get_emp_id" name="get_emp_id" value="<%= PortalUtil.getOriginalServletRequest(request).getParameter("param_emp")%>">
<input type="hidden" id="get_emp_name" name="get_emp_name" value="<%= PortalUtil.getOriginalServletRequest(request).getParameter("param_emp_name")%>">
<input type="hidden" id="get_position_id" name="get_position_id" value="<%=PortalUtil.getOriginalServletRequest(request).getParameter("param_position")%>">
<input type="hidden" id="get_level_id" name="get_level_id" value="<%= PortalUtil.getOriginalServletRequest(request).getParameter("param_app_lv")%>">
<input type="hidden" id="get_org_id" name="get_org_id" value="<%= PortalUtil.getOriginalServletRequest(request).getParameter("param_org_id")%>">
<input type="hidden" id="get_item_id" name="get_item_id" value="<%=PortalUtil.getOriginalServletRequest(request).getParameter("param_item")%>">
<input type="hidden" id="get_sending_status" name="get_sending_status" value="<%=PortalUtil.getOriginalServletRequest(request).getParameter("sending_status")%>">

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
		    width: 90%;
		    margin-left:-45%;  
		    top:0px;
		}
		
	.modal.medium {
		    width: 50%;
		    margin-left:-25%;  
		    top:0px;
		}
	.aui .advance-search .span3{width: 24.504%;}
	.graphLTop {
		width: 28.1% !important;
		}
  }
  /* Large desktop End######################################*/
  
  /*  desktop Start#########################################*/
 @media (min-width: 980px) and (max-width: 1199px) {
 
 	.modal.large {
		    width: 90%;
		    margin-left:-45%;  
		    top:0px;
		}
		
		.modal.medium {
		    width: 50%;
		    margin-left:-25%;  
		    top:0px;
		}
		.aui .advance-search .span3{width: 24.364%;}
		/*All Start*/
		.aui #btnSearchAdvance{
		margin-bottom:5px;
		width:100%;
		}
		.aui #btnCoppy{
			width:100%;
		}
		/*All End*/
		.graphLTop {
		width: 27.362% !important;
		}
 	
  }
 /*  desktop End############################################*/
 
 /* Portrait tablet to landscape and desktop Start##########*/
 @media (min-width: 768px) and (max-width: 979px) {
 		
	.modal.large {
		    width: 90%;
		    margin-left:-45%;  
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
	
	
	.aui .btnAdd{
		position: relative;
   		top: 0px;
	}
	.aui .advance-search .span3{width: 26.5612%;}
	/*All Form Start*/
	.aui .modal-body{
		max-height: 400px;
	}
	.aui #btnSearchAdvance{
		margin-bottom:5px;
		width:100%;
	}
	.aui #btnCoppy{
		width:100%;
	}
	.graphLTop {
	width: 25.72% !important;
	}
	/*All Form End*/
  }
 /* Portrait tablet to landscape and desktop End############*/ 
 
 /* Landscape phone to portrait tablet Start################*/
 @media (max-width: 767px) { 
 
 .modal.large {
 	
	    width: '';
	    top:0px;    
	}
	
	.modal.medium {
		   width: '';
	   	   top:0px;  
		}
	
 	.pagingText{
 		display:none;
 	}
	.aui .form-group > .control-label-search {
    	text-align: left;
	}
	
	.aui .ibox-title2{
		height:63px;
	}
	
	.aui .btnAdd{
		position: relative;
   		top: -22px;
	}
	/*All Form Start*/
	.aui .modal-body{
		max-height: 350px;
	}
	/*All Form End*/
	
  }
 /* Landscape phone to portrait tablet End##################*/ 
 
 /* Landscape phones and down Start#########################*/
 @media (max-width: 480px) { 
 	
	.aui .form-group > .control-label-search{
    	text-align: left;
	}
	
	.aui .ibox-title2{
		height:63px;
	}
	
	.aui .btnAdd{
		position: relative;
   		top: -22px;
	}
	.aui .graphLTop {
		width:95%;
	}
	/*All Form Start*/
	/*
	.aui .modal-body{
		max-height: 300px;
	}
	*/
	/*All Form End*/
 	
 	

  }
  /* Landscape phones and down End##########################*/
  
  
  
  /* main start*/
        table {
            width: 100%;
        }
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
	/*
	.aui #modal-quantity{
    background-clip: padding-box;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    left: 34%;
    margin-left: -280px;
    outline: 0 none;
    position: fixed;
    top: 0%;
    width: 1000px;
    z-index: 1050;
    */
}
.aui .modal-footer {
    background-color: #f5f5f5;
    border-radius: 0;
    border-top: 1px solid #ddd;
    box-shadow: 0 1px 0 white inset;
    margin-bottom: 0;
    padding: 14px 15px 15px;
    text-align: right;
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
	border-collapse: collapse !important;
}
.aui .pagination {
    margin: 0;
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
.aui .pagination{
 /*display:absolute;*/
}
.aui .popover-content{
padding:5px;
}


.aui .table th, .aui .table td{
	font-size: 13px;
}
.aui .countPagination2{
	height:30px;
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
</style>
<style>
.boxActionPlainArea {
	
}

.boxActionPlainArea .boxActionL {
	float: left;
	width: 50%;
	/*border:1px solid #cccccc;*/
}

.boxActionPlainArea .boxActionR {
	float: right;
	width: 565px;
	/*border:1px solid #cccccc;*/
}

.boxTargetArea {
	width: 25%;
	float: right;
	border-width: 1px 1px 1px 1px;
	border-color: #cccccc;
	border-style: solid;
	margin: 1px;
	padding: 5px;
	height: 89px;
	background: #fff;
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

.ui-accordion .ui-accordion-header {
	margin: 0px;
	padding: 0px;
}

/* accordian */

.aui .panel {
	margin-bottom: 20px;
	background-color: #fff;
	border: 1px solid transparent;
	border-radius: 0px;
	-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
	box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}

.aui .panel-group .panel {
	margin-bottom: 5px;
	border-radius: 0px;
}

.aui .panel-default {
	border-color: #C5C5C5;
}

.aui .panel-default:HOVER {
	border-color: #CCCCCC;
}

.aui .panel-default>.panel-heading {
	color: #333;
	/*     background-color: #fc0; */
	background: #f6f6f6;
	border-color: #fc0;
	padding: 1px;
	padding-bottom: 1px;
/* 	max-height: 32px; */
}

.aui .panel-default>.panel-heading:HOVER {
	background: #ededed;
}

.aui .panel-group .panel-heading {
	border-bottom: 0;
}

.aui .panel-heading {
	display: block;
	text-decoration: none;
	margin: 0px 0px;
	border-bottom: 1px solid transparent;
	/*     border-top-left-radius: 3px; */
	/*     border-top-right-radius: 3px; */
}

.aui .panel-heading a {
	display: block !important;
	font-size: 14px !important;
	font-weight: bold !important;
	padding: 9.5px 10px 8px 10px;
	margin: -11px 0px;
	text-decoration: none;
}

.aui .panel-heading a:hover {
	display: block;
	/*     color: dimgrey !important; */
	text-decoration: none;
}
.aui .accordion-content{
		width: auto !important;
		margin-top: 0px; 
		float: left !important; 
		display:flex !important;
	}
.aui .accordion-btn {
/*     text-align: right; */
/*     margin-top: 5px; */
	display: inline-block;
    float: right;
}
.aui .panel-body {
	margin: 10px;
}

.aui #accordion {
	display: none;
}
/* accordian */
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
	margin-left: 10px;
	position: absolute;
}

.aui #next {
	position: absolute;
	right: 0px;
	margin-right: 20px;
	margin-top: 0px;
}
/* Next & Back */
.graphLTop {
	float: left;
	padding: 5px;
	border: 1px solid #cccccc;
	margin: 2px;
	width: 28.8%;
	font-weight: bold;
	background: #ddd;
}

.graphLTop .textGRaphTop {
	text-align: center;
}

.graphLTopHeader {
	font-weight: bold;
	font-size: 18px;
	color: black;
}

/* Start All KPI */
.fontBold{
	font-size:16px;
	font-weight:bold;
}
.fontNumber{
	text-align:right;
}
.fontString{
	text-align:left;
}
.fontCenter{
	text-align:center;
}
.tableInside{
	width:100%;
}
table#tableAllKPI1 .aui .table th, .aui .table td{
	padding: 2px;
}
table#tableAllKPI2 .aui .table th, .aui .table td{
	padding: 2px;
}
.aui .header-fixed-kpi1 { 
    position: absolute; 
    top: -1px; display:none;
    width:740px;
}
.aui .header-fixed-kpi2 { 
    position: absolute; 
    top: -1px; display:none;
    width:310px;
}
.aui .modal-body{
	overflow-x: auto !important;
}
/* End All KPI */
.aui #ModalKPI .modal-body ,.aui #ModalKPI #scrollSubOrg3 , .aui #ModalKPI #scrollSubOrg3 table{
-webkit-overflow-scrolling: touch ; 
/* overflow-scrolling:touch !important; */
overflow:auto;
}

</style>


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

								<option value="1">2016</option>
								<option value="2">2017</option>

							</select>
						</div>
						<div style="margin-left: 5px; margin-bottom: 3px;"
							class="form-group pull-left span3" id="periodArea">
							<select name="period" id="period"
								class="input form-control input-sm" title=""
								data-toggle="tooltip" style="cursor: pointer;"
								data-original-title="Period">

								<option value="">Period1</option>
								<option value="">Period1</option>

							</select>
						</div>
						<div class="form-group pull-left span3" style="margin-left: 5px;margin-bottom: 3px;">
							<select name="app_type" id="app_type" 
								class="input form-control input-sm" title=""
								data-toggle="tooltip" style="cursor: pointer;"
								data-original-title="Entity Type">

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

								<option value="">Appraisal Level1</option>
								<option value="">Appraisal Level2</option>

							</select>
						</div>
						<div style="margin-left: 5px; margin-bottom: 3px;"
							class="form-group pull-left span3" id="organizationArea">
							<select name="organization" id="organization"
								class="input form-control input-sm" title=""
								data-toggle="tooltip" style="cursor: pointer;"
								data-original-title="Organization" >

								<option value="">Organization 1</option>
								<option value="">Organization 2</option>

							</select>
						</div>
						<div style="margin-left: 5px; margin-bottom: 3px;"
							class="form-group pull-left span3" id="kpiArea">
							<select name="kpi" id="kpi" class="input form-control input-sm"
								title="" data-toggle="tooltip" style="cursor: pointer;"
								data-original-title="KPI">

								<option value="">KPI1</option>
								<option value="">KPI2</option>

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
	<div class="panel-group" id="accordion" role="tablist"
		aria-multiselectable="true">
	
	</div>
	<!-- content accordion end -->




	
</div>
 
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
				<div id="scrollOrg"style="overflow:auto;min-width:1184px;max-height:500px;" class="table-responsive p-b-xxs">
				<div id="scrollSubOrg1"style='width: 740px;max-height:482px; float: left;overflow: hidden;position: relative;'>
					<div id="scrollSubOrg2" style="float: left; position: relative; overflow-y: scroll; width: 757px; overflow-x: hidden; max-height: 482px;">
					<table class='table table-bordered' id='tableAllKPI1'>

						<thead>
							<tr id="listHeader1" style='height: 66px;'>

							</tr>
						</thead>
						<tbody id='listData1'>

						</tbody>

					</table>
					<table class='table table-bordered header-fixed-kpi1' id='subTableKPI1'></table>
					</div>
				</div>

				<div id="scrollSubOrg3" style='width: 444px;max-height:500px; float: left; overflow-x: auto;overflow-y: auto;position: relative;'>
					<table class='table table-bordered' id='tableAllKPI2' style="width: 325px;">

						<thead>
							<tr id="listHeader2" style='height: 66px;'>

							</tr>
						</thead>
						<tbody id='listData2'>

						</tbody>

					</table>
					<table class='table table-bordered header-fixed-kpi2' id='subTableKPI2'></table>
				</div>
				</div>
<!-- ############################################################################ -->
					<!-- content end -->
				</div>
				<div class="modal-footer">
				
				</div>
			</div>
		</div>
	</div>
	<form id="linkParam" method="POST" target="_blank" action="POST">
		<input type="hidden" value="" name="param_item_result_id" id="param_item_result_id" class="">
		<input type="hidden" value="email" name="param_link" id="param_link" class="" >
		
	</form>
 
