<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet"%>
<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui"%>
<%@ page import="javax.portlet.*"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme"%>
<%@ page import="com.liferay.portal.kernel.util.WebKeys"%>
<%@ page import="com.liferay.portal.util.PortalUtil"%>
<liferay-theme:defineObjects />
<portlet:defineObjects />

<%
	String username = themeDisplay.getUser().getScreenName();
	String password = (String) request.getSession().getAttribute(WebKeys.USER_PASSWORD);
	layout = themeDisplay.getLayout();
	plid = layout.getPlid();
%>
<input type="hidden" id="user_portlet" name="user_portlet"
	value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet"
	value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet"
	value="<%=renderRequest.getContextPath()%>">
<input type="hidden" id="plid_portlet" name="plid_portlet"
	value="<%=plid%>">
<input type="hidden" id="get_year_id" name="get_year_id"
	value="<%=PortalUtil.getOriginalServletRequest(request).getParameter("param_year")%>">
<input type="hidden" id="get_period_id" name="get_period_id"
	value="<%=PortalUtil.getOriginalServletRequest(request).getParameter("param_period")%>">
<input type="hidden" id="get_appraisal_type_id"
	name="get_appraisal_type_id"
	value="<%=PortalUtil.getOriginalServletRequest(request).getParameter("param_app_type")%>">
<input type="hidden" id="get_emp_id" name="get_emp_id"
	value="<%=PortalUtil.getOriginalServletRequest(request).getParameter("param_emp")%>">
<input type="hidden" id="get_emp_name" name="get_emp_name"
	value="<%=PortalUtil.getOriginalServletRequest(request).getParameter("param_emp_name")%>">
<input type="hidden" id="get_position_id" name="get_position_id"
	value="<%=PortalUtil.getOriginalServletRequest(request).getParameter("param_position")%>">
<input type="hidden" id="get_level_id" name="get_level_id"
	value="<%=PortalUtil.getOriginalServletRequest(request).getParameter("param_app_lv")%>">
<input type="hidden" id="get_org_id" name="get_org_id"
	value="<%=PortalUtil.getOriginalServletRequest(request).getParameter("param_org_id")%>">
<input type="hidden" id="get_item_id" name="get_item_id"
	value="<%=PortalUtil.getOriginalServletRequest(request).getParameter("param_item")%>">
<input type="hidden" id="get_sending_status" name="get_sending_status"
	value="<%=PortalUtil.getOriginalServletRequest(request).getParameter("sending_status")%>">
<style>
/* Large desktop Start#####################################*/
@media ( min-width : 1200px) {
	.aui .portlet-frame .row-fluid .span4 {
		width: 32.624%;
	}
}
/* Large desktop End######################################*/
/*  desktop Start#########################################*/
@media ( min-width : 980px) and (max-width: 1199px) {
	.aui .portlet-frame .row-fluid .span4 {
		width: 32.624%;
	}
}
/*  desktop End############################################*/
/* Portrait tablet to landscape and desktop Start##########*/
@media ( min-width : 768px) and (max-width: 979px) {
}
/* Portrait tablet to landscape and desktop End############*/
/* Landscape phone to portrait tablet Start################*/
@media ( max-width : 767px) {
}
/* Landscape phone to portrait tablet End##################*/
/* Landscape phones and down Start#########################*/
@media ( max-width : 480px) {
}
/* Landscape phones and down End##########################*/
.aui #breadcrumbs {
	margin-bottom: 0;
}
.breadcrumbs2 {
	background: rgba(0, 0, 0, 0)
		linear-gradient(to bottom, #fff 0px, #f6f6f6 47%, #ededed 100%) repeat
		scroll 0 0;
	border-radius: 0;
	margin-bottom: 0;
	padding-bottom: 5px
}
.ibox-title {
	padding: 1px 10px;
}
.ibox-title2 {
	-moz-border-bottom-colors: none;
	-moz-border-left-colors: none;
	-moz-border-right-colors: none;
	-moz-border-top-colors: none;
	border-bottom-style: none;
	border-bottom-width: 0;
	border-image-outset: 0 0 0 0;
	border-image-repeat: stretch stretch;
	border-image-slice: 100% 100% 100% 100%;
	border-image-source: none;
	border-image-width: 1 1 1 1;
	border-left-style: solid;
	border-left-width: 0;
	border-right-style: solid;
	border-right-width: 0;
	border-top-style: solid;
	border-top-width: 3px;
	color: black;
	margin-bottom: 0;
	min-height: 32px;
	padding-bottom: 0;
	padding-left: 10px;
	padding-right: 10px;
	padding-top: 0;
}
.aui .modal-header .close {
	font-size: 1.4em !important;
	margin-top: 4px !important;
	padding-top: 5px !important;
}
.aui #file {
	width: 100% !important;
	height: 100% !important;
}
.aui .titlePanelIbox {
	margin-bottom: 7px;
	margin-left: 0;
	margin-right: 0;
	margin-top: 7px;
	font-size: 14px;
	font-weight: bold;
	line-height: 20px;
	text-rendering: optimizelegibility;
}
.aui .titlePanelIboxSub {
	margin-bottom: 7px;
	margin-left: 0;
	margin-right: 0;
	margin-top: 7px;
	font-size: 14px;
	font-weight: bold;
	line-height: 17px;
	text-rendering: optimizelegibility;
}
.ibox-content {
	background-color: #fff;
	border: 1px solid #ffe57f;
	color: inherit;
	margin-bottom: 5px;
	padding-left: 15px;
	padding-right: 15px;
}
.aui .portlet-frame  select, .aui .portlet-frame textarea, .aui .portlet-frame input[type="text"],
	.aui .portlet-frame input[type="password"], .aui .portlet-frame input[type="datetime"],
	.aui .portlet-frame input[type="datetime-local"], .aui .portlet-frame input[type="date"],
	.aui .portlet-frame input[type="month"], .aui .portlet-frame input[type="time"],
	.aui .portlet-frame input[type="week"], .aui .portlet-frame input[type="number"],
	.aui .portlet-frame input[type="email"], .aui .portlet-frame input[type="url"],
	.aui .portlet-frame input[type="search"], .aui .portlet-frame input[type="tel"],
	.aui .portlet-frame input[type="color"], .aui .portlet-frame .uneditable-input
	{
	padding: 2px;
}
.aui .portlet-frame input[type="color"], .aui .portlet-frame input[type="date"],
	.aui .portlet-frame input[type="datetime"], .aui .portlet-frame input[type="datetime-local"],
	.aui .portlet-frame input[type="email"], .aui .portlet-frame input[type="month"],
	.aui .portlet-frame input[type="number"], .aui .portlet-frame input[type="password"],
	.aui .portlet-frame input[type="search"], .aui .portlet-frame input[type="tel"],
	.aui .portlet-frame input[type="text"], .aui .portlet-frame input[type="time"],
	.aui .portlet-frame input[type="url"], .aui .portlet-frame input[type="week"],
	.aui .portlet-frame select, .aui .portlet-frame textarea, .aui .portlet-frame .uneditable-input
	{
	border: 1px solid #ddd;
	color: #8d8d8d;
	font-weight: 200;
	margin-bottom: 0;
}
.aui .breadcrumbs2 select {
	width: 100%;
}
.aui .portlet-frame input {
	width: 100%;
}
.aui .portlet-frame .btn {
	font-size: 14px;
	padding: 4px 12px;
	width: auto;
	margin-top: 0px;
	display: inline;
}
.aui .breadcrumbs2 select, .aui breadcrumbs2 textarea, .aui .breadcrumbs2 input[type="text"],
	.aui .portlet-frame input[type="password"], .aui .portlet-frame input[type="datetime"],
	.aui .portlet-frame input[type="datetime-local"], .aui .portlet-frame input[type="date"],
	.aui .portlet-frame input[type="month"], .aui .portlet-frame input[type="time"],
	.aui .portlet-frame input[type="week"], .aui .portlet-frame input[type="number"],
	.aui .portlet-frame input[type="email"], .aui .portlet-frame input[type="url"],
	.aui .portlet-frame input[type="search"], .aui .portlet-frame input[type="tel"],
	.aui .portlet-frame input[type="color"], .aui .portlet-frame .uneditable-input
	{
	height: 30px;
	padding: none;
	font-size: 14px;
}
.aui .portlet-frame  select, .aui .portlet-frame  input[type="text"] {
	font-size: 14px;
}
.ui-state-default {
	width: 100% !important;
}
.ui-multiselect {
	padding: 5px;
	line-height: 18px !important;
}
.ui-corner-all, .ui-corner-top, .ui-corner-right, .ui-corner-tr {
	border-top-right-radius: 0;
}
.ui-corner-all, .ui-corner-top, .ui-corner-left, .ui-corner-tl {
	border-top-left-radius: 0;
}
.ui-corner-all, .ui-corner-bottom, .ui-corner-left, .ui-corner-bl {
	border-bottom-left-radius: 0;
}
.ui-corner-all, .ui-corner-bottom, .ui-corner-right, .ui-corner-br {
	border-bottom-right-radius: 0;
}
.ui-multiselect-header span.ui-icon {
	top: 5px;
}
.aui ul, .aui ol {
	margin: 0px 0px 0px 0px;
}
.ui-icon {
	margin-top: 0;
}
.aui input[type="radio"], .aui input[type="checkbox"] {
	margin: -2px 0 0;
}
.aui label {
	margin-bottom: 0px;
}
.ui-multiselect-checkboxes li {
	padding-right: 0px;
}
.aui #import_assignment_list_content {
	display: none;
}
.aui input[type="color"], .aui input[type="date"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="email"], .aui input[type="month"], .aui input[type="number"], .aui input[type="password"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="text"], .aui input[type="time"], .aui input[type="url"], .aui input[type="week"], .aui select, .aui textarea, .aui .uneditable-input {
    border: 1px solid #ddd;
    color: #8d8d8d;
    font-weight: 200;
    margin-bottom: 0;
}
</style>


<div class='row-fluid '>
	<div class='col-xs-12'>
		<div id="slide_status" class="span12" style="z-index: 9000;">
			<div id="btnCloseSlide">
				<i class='fa fa-times'></i>
			</div>
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
					<div class="titlePanelIbox">Advance Search</div>
				</div>

				<div class="ibox-content breadcrumbs2 advance-search"
					style="border-color: rgb(83, 120, 253);">

					<div class="row-fluid">

						<div style="margin-bottom: 2px;"
							class="form-group pull-left span3" id="yearArea">
							<select name="year" id="year" class="input form-control input-sm"
								title="" data-toggle="tooltip" style="cursor: pointer;"
								data-original-title="Year">
								<option value="2017">2017</option>
							</select>
						</div>

						<div style="margin-bottom: 2px;"
							class="form-group pull-left span3" id="periodArea">
							<select name="period" id="period"
								class="input form-control input-sm" title=""
								data-toggle="tooltip" style="cursor: pointer;"
								data-original-title="Period">
								<option value="">Period</option>
							</select>
						</div>
						
					<div class="form-group pull-left span3" style="margin-bottom: 2px;">
							<select id="appraisalType" name="appraisalType"
								data-toggle="tooltip" title=""
								data-original-title="Entity Type "
								class="input form-control input-sm span12">
							</select>
						</div>

						<div style="margin-bottom: 2px;"
							class="form-group pull-left span3" id="apprasiaLevelArea">
							<select name="apprasiaLevel" id="apprasiaLevel"
								class="input form-control input-sm" title=""
								data-toggle="tooltip" style="cursor: pointer;"
								data-original-title="Emp Level">
								<option value="">Level</option>
							</select>
						</div>
					</div>

					<div class="row-fluid">
						<div style="margin-bottom: 2px;"
							class="form-group pull-left span3" id="apprasiaLevelArea2">
							<select name="apprasiaLevelOrg" id="apprasiaLevelOrg"
								class="input form-control input-sm" title=""
								data-toggle="tooltip" style="cursor: pointer;"
								data-original-title="Org Level">
								<option value="">Level</option>
							</select>
						</div>


						<div style="margin-bottom: 2px;"
							class="form-group pull-left span3" id="organizationArea">
							<select data-toggle="tooltip" title="Organization"
								data-original-title="organization" multiple="multiple"
								class="input form-control input-sm span12" id="organization"
								name="organization">
							</select>
						</div>
						<div style="margin-bottom: 2px;"
							class="form-group pull-left span3" id="statusArea">
							<select name="status" id="status"
								class="input form-control input-sm" title=""
								data-toggle="tooltip" style="cursor: pointer;"
								data-original-title="Status">
							</select>
						</div>
							<div style=""
							class="form-group pull-left span3" id="kpiArea">
							<select name="output_type" id="output_type"
								class="input form-control input-sm" title=""
								data-toggle="tooltip" style="cursor: pointer;"
								data-original-title="Output Type">
								<option value="pdf">PDF</option>
								<option value="xls">Excel</option>
							</select>
						</div>
					
					</div>
					<div class="row-fluid">						
						<div class="form-group span9 m-b-none pull-right"
							style="margin-left: 5px; text-align: right;">
						<button type="button" class="btn btn-info input-sm" name="btnSearchAdvance" id="btnSearchAdvance">
                      		<i class="icon-download-alt"></i>&nbsp;Export
                    	</button> &nbsp;
						</div>
					</div>
				</div>
				<!-- content end -->
			</div>

		</div>

	</div>

	<!-- content accordion start -->
	<div style="position: relative;">







		<div>
			<!-- 		<aside id="sticky-social" style="position: absolute;"> -->
			<!-- 		    <ul id="report_download_ul" style="display:none;"> -->
			<!-- 		        <li><a href="#" id="pdf_download" class="entypo-facebook ex-pdf"><span>PDF</span><i class="fa fa-file-pdf-o fa-1x" aria-hidden="true"></i></a></li> -->
			<!-- 		        <li><a href="#" id="excel_download" class="entypo-twitter ex-excel"><span>Excel</span><i class="fa fa-file-excel-o fa-1x" aria-hidden="true"></i></a></li> -->
			<!-- 		    </ul> -->
			<!-- 		</aside> -->
		</div>
		<iframe id="iFrame_report" frameborder="0"
			style="width: 100%; height: 500px;">
			<p>Your browser does not support iframes.</p>
		</iframe>
	</div>

	<!-- content accordion end -->


	<form id="linkParam" method="POST" target="_blank" action="POST">

	</form>


</div>