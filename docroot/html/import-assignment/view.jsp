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
@media ( min-width : 1200px) {
	.aui .portlet-frame .row-fluid .span4 {
		width: 32.624%;
	}
}
/* Large desktop End######################################*/

/*  desktop Start#########################################*/
@media ( min-width : 980px) and (max-width: 1199px) {
	.aui .portlet-frame .row-fluid .span4{
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

.aui .portlet-frame  select, .aui .portlet-frame textarea, .aui .portlet-frame input[type="text"], .aui .portlet-frame input[type="password"],
	.aui .portlet-frame input[type="datetime"], .aui .portlet-frame input[type="datetime-local"], .aui .portlet-frame input[type="date"],
	.aui .portlet-frame input[type="month"], .aui .portlet-frame input[type="time"], .aui .portlet-frame input[type="week"],
	.aui .portlet-frame input[type="number"], .aui .portlet-frame input[type="email"], .aui .portlet-frame input[type="url"],
	.aui .portlet-frame input[type="search"], .aui .portlet-frame input[type="tel"], .aui .portlet-frame input[type="color"],
	.aui .portlet-frame .uneditable-input {
	padding: 2px;
}

.aui .portlet-frame input[type="color"], .aui .portlet-frame input[type="date"], .aui .portlet-frame input[type="datetime"],
	.aui .portlet-frame input[type="datetime-local"], .aui .portlet-frame input[type="email"], .aui .portlet-frame input[type="month"],
	.aui .portlet-frame input[type="number"], .aui .portlet-frame input[type="password"], .aui .portlet-frame input[type="search"],
	.aui .portlet-frame input[type="tel"], .aui .portlet-frame input[type="text"], .aui .portlet-frame input[type="time"],
	.aui .portlet-frame input[type="url"], .aui .portlet-frame input[type="week"], .aui .portlet-frame select, .aui .portlet-frame textarea,
	.aui .portlet-frame .uneditable-input {
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
	.aui .portlet-frame input[type="password"], .aui .portlet-frame input[type="datetime"], .aui .portlet-frame input[type="datetime-local"],
	.aui .portlet-frame input[type="date"], .aui .portlet-frame input[type="month"], .aui .portlet-frame input[type="time"],
	.aui .portlet-frame input[type="week"], .aui .portlet-frame input[type="number"], .aui .portlet-frame input[type="email"],
	.aui .portlet-frame input[type="url"], .aui .portlet-frame input[type="search"], .aui .portlet-frame input[type="tel"],
	.aui .portlet-frame input[type="color"], .aui .portlet-frame .uneditable-input {
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
</style>
<div class='row-fluid'>

	<div class='col-xs-12'>
		<div id="slide_status" class="span12" style="z-index: 9000;">
			<div id="btnCloseSlide">
				<i class='fa fa-times'></i>
			</div>
			<div id="slide_status_area"></div>
		</div>
	</div>

</div>
<div class="app_url_hidden portlet-frame">
<!-- app_url_hidden -->
	<div class="row-fluid" >
		<!-- start--row-fluid -->

		<div class="span12">
			<div class="ibox float-e-margins">
				<div class="ibox-title">

					<div class='titlePanelIbox'>Advance Search</div>
				</div>

				<div class="ibox-content breadcrumbs2">

<!-- 					<div class="row-fluid"> -->
<!-- 						<div id="appraisalTypeArea" class="form-group pull-left span4" -->
<!-- 							style="margin-left: 5px; margin-bottom: 3px;"> -->
<!-- 							<select data-toggle="tooltip" title="Entity Type" -->
<!-- 								class="input form-control input-sm" id="appraisalType" -->
<!-- 								name="appraisalType"> -->
<!-- 								<option value="0"></option> -->
<!-- 							</select> -->
<!-- 						</div> -->
<!-- 					</div> -->
					<div class="row-fluid">
<!-- 						<div id='appraisalLevelEmpArea' class="form-group pull-left span4" -->
<!-- 							style="margin-left: 5px; margin-bottom: 3px;"> -->
<!-- 							<select data-toggle="tooltip" title="Emp Level" multiple="multiple" -->
<!-- 								class="input form-control input-sm" id="appraisalLevelEmp" -->
<!-- 								name="appraisalLevelEmp"> -->
<!-- 								<option value="0"></option> -->
<!-- 							</select> -->
<!-- 						</div> -->
						<div id="appraisalTypeArea" class="form-group pull-left span4"
							style="margin-left: 5px; margin-bottom: 3px;">
							<select data-toggle="tooltip" title="Entity Type"
								class="input form-control input-sm" id="appraisalType"
								name="appraisalType">
								<option value="0"></option>
							</select>
						</div>
						<div id="empNameArea" class="form-group pull-left span4"
							style="margin-left: 5px; margin-bottom: 3px;">
							<input data-toggle="tooltip" type="text"
								class="form-control input-sm span12 " placeholder="Emp Name"
								id="empName" data-original-title="Employee Name" disabled>
							<input type="hidden" id="empName_id">
						</div>
						<div id="PositionArea" class="form-group pull-left span4"
							style="margin-left: 5px; margin-bottom: 3px;">
							<input data-toggle="tooltip" type="text" id="Position"
								placeholder="Position" class="form-control input-sm span12"
								disabled data-original-title="Position"> <input
								type="hidden" id="Position_id">
						</div>
					</div>
					<div class="row-fluid">
						<div id='appraisalLevelArea' class="form-group pull-left span4"
							style="margin-left: 5px; margin-bottom: 3px;">
							<select data-toggle="tooltip" title="Org Level" multiple="multiple"
								class="input form-control input-sm" id="appraisalLevel"
								name="appraisalLevel">
								<option value="0"></option>
							</select>
						</div>
						<div class="form-group pull-left span4" style="margin-left: 5px">
							<select data-toggle="tooltip" title=""
								data-original-title="organization" multiple="multiple"
								class="input form-control input-sm span12" id="organization"
								name="organization">
								<option value=''>All Organization</option>
							</select>
						</div>
						<div id='yearArea' class="form-group pull-left span4"
							style="margin-left: 5px; margin-bottom: 3px;">
							<select data-toggle="tooltip" title="Year"
								class="input form-control input-sm" id="YearList"
								name="YearList">
								<option value="0"></option>
							</select>
						</div>
					</div>
					<div class="row-fluid">
						<div id="periodFrequencyArea" class="form-group pull-left span4"
							style="margin-left: 5px; margin-bottom: 3px;">
							<select data-toggle="tooltip" title="Period frequency"
								class="input form-control input-sm" id="periodFrequency"
								name="periodFrequency">
								<option value="0"></option>
							</select>
						</div>
						<div id="assignFrequencyArea" class="form-group pull-left span4"
							style="margin-left: 5px; margin-bottom: 3px;">
							<select data-toggle="tooltip" title="Assign Frequency"
								class="input form-control input-sm" id="assignFrequency"
								name="assignFrequency">
								<option value="1">ครั้งเดียวทุกงวด</option>
								<option value="2">ทีละงวด</option>
							</select>
						</div>
						<div id="periodArea" class="form-group pull-left span4"
							style="margin-left: 5px; margin-bottom: 3px;">
							<select data-toggle="tooltip" disabled='disabled'
								data-toggle="Period" title="Period"
								class="input form-control input-sm" id="period_id"
								name="period_id">
								<option value=""></option>
							</select>
						</div>
					</div>
					<div class="row-fluid">
						<form id="formExportToExcel" action="" method="post"
							class="form-group pull-right m-b-none"
							style="margin-bottom: 0px;">
							<div class="form-group pull-right m-b-none "
								style="margin-bottom: 5px;">
								<button type="button" class="btn btn-info input-sm"
									name="btnSearchAdvance" id="btnSearchAdvance" style="margin-bottom: 3px">
									<i class="fa fa-search"></i>&nbsp;Search
								</button>
								<button id="exportToExcel" class="btn btn-warning btn-sm"
									type="button" style="margin-bottom: 3px">
									<i class="fa fa-download"></i> Export
								</button>
								<button id="btn_import" type="button" data-target="#ModalImport"
									data-toggle="modal" class="btn btn-success btn-sm "
									style="margin-bottom: 3px">
									<i class="fa fa-upload"></i>&nbsp;Import&nbsp;&nbsp;
								</button>
							</div>
						</form>
					</div>
				</div>
				<!-- content end -->
			</div>
		</div>
	</div>
	<!-- end--row-fluid -->
	<div class="row-fluid" id="import_assignment_list_content">

		<div class="ibox-title">
			<div class='titlePanelIboxSub'>Import Assignment List</div>
		</div>

		<div id="listAssignment" class="ibox-content"
			style="position: relative;" style="position: relative;">
			<!-- start table -->




			<!-- end table -->

		</div>
		<!-- content end -->

	</div>

</div>
<div id="embedParamSearch"></div>



<!-- Modal Import Assignment -->

	<div aria-hidden="true" role="dialog" tabindex="-1" id="ModalImport"
		class="modal inmodal portlet-frame" style="display: none;">
		<div class="modal-dialog">
			<div class="modal-content animated bounceInRight">
				<div class="modal-header">
					<button data-dismiss="modal" class="close" type="button" style="padding-top:5px">
						<span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only"></span>
					</button>
					<!-- <i class="fa fa-laptop modal-icon"></i> -->
					<h4 class="modal-title" id="">Import Assignment</h4>
					<!-- 
                <small class="font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                 -->      
				</div>
				<div class="modal-body">
					<!-- content start -->
					
    
					<!-- form start -->
					 

					<div class="form-group">
					<form id="fileImportAssignment">
						 
							<h4>FILE IMPORT</h4>
							<div class="fileUpload ">
								<input type="file" id="file" class="dropify" accept=".xls, .xlsx"  /><span></span>
							</div>
							
							<h6 class="label-content-import-export">

<!-- 							<input class="btn btn-success" type="submit" -->
<!-- 								name="importFileMobile" id="importFileMobile" value="Import" -->
<!-- 								style="margin-top: 0px; margin-bottom: 0px;"> -->
							<!-- 								<strong>Note</strong> : Data size should de less 10MB -->

							</h6>
						
					</form>
					
						<!-- start table -->
					</div>
					<!-- form End -->
					<!-- content end -->
				</div>
				<div class="modal-footer">
					<button class="btn btn-success" type="submit" id="importFileMobile" form="fileImportAssignment">Import</button>
					<button data-dismiss="modal" class="btn btn-danger btnCancle"
						type="button">Cancel</button>
						<div class="alert alert-warning information" id="information"
						style="display: none;height:120px; overflow-y: scroll; position:relative;"></div>
				</div>
			</div>
		</div>
	</div>
<!-- Modal End  -->