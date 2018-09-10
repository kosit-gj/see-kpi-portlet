<%@ page import="javax.portlet.*"%>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="com.liferay.portal.kernel.util.WebKeys" %>

<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui"%>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>

<liferay-theme:defineObjects />
<portlet:defineObjects />

<%
String username = themeDisplay.getUser().getScreenName();
String password = (String)request.getSession().getAttribute(WebKeys.USER_PASSWORD);
layout = themeDisplay.getLayout();
plid = layout.getPlid();
long companyID = themeDisplay.getCompanyId();
String pAuth = com.liferay.portal.security.auth.AuthTokenUtil.getToken(request);
%>

<style>
.progressBar {
	display: none;
	margin: 15px 0 0;
	position: relative;
	height:25px;
	text-align:center;
}
.progressBarText {
	color: blue;
    position: absolute;
    margin: 3px -30px 0px !important;
}
.test-right{
	text-align: right;
	padding-right: 10px;
}
.text-center{
	text-align:center;
}
.ui-corner-all {
    padding: 0px !important; 
}

.aui .breadcrumbs2 {
	background: rgba(0, 0, 0, 0)
		linear-gradient(to bottom, #fff 0px, #f6f6f6 47%, #ededed 100%) repeat
		scroll 0 0;
	border-radius: 0;
	margin-bottom: 0;
	padding-bottom: 0px
}

.aui #breadcrumbs {
	margin-bottom: 0px;
}

.portlet-content, .portlet-minimized .portlet-content-container {
	background-color: #fafafa;
}

.aui .countPagination {
	width: 70px;
	margin-bottom: 0px:
}

.popover {
	width: 150px;
}

.aui .pagination {
	margin: 5px 0;
}

.pagingDropdown {
	float: right;
	padding-top: 5px;
}

.aui .btn {
	font-size: 14px;
	padding: 5px 12px;
	width: auto;
	margin-top: 0px;
	display: inline;
}

.aui input[type="color"], .aui input[type="date"], .aui input[type="datetime"],
	.aui input[type="datetime-local"], .aui input[type="email"], .aui input[type="month"],
	.aui input[type="number"], .aui input[type="password"], .aui input[type="search"],
	.aui input[type="tel"], .aui input[type="text"], .aui input[type="time"],
	.aui input[type="url"], .aui input[type="week"], .aui select, .aui textarea,
	.aui .input-prepend .add-on, .aui .navbar-search .search-query, .aui .uneditable-input
	{
	font-size: 14px;
	height: auto;
	line-height: normal;
}

.p-t-xxs {
	padding-top: 5px;
}

.p-t-xs {
	padding-top: 10px;
}

.p-b-xxs {
	padding-bottom: 5px;
}

.p-b-xs {
	padding-bottom: 10px;
}

.aui .form-horizontal .form-group {
	margin-left: 0px;
	margin-right: 0px;
}

.aui .form-horizontal .checkbox, .aui .form-horizontal .checkbox-inline,
	.aui .form-horizontal .radio, .aui .form-horizontal .radio-inline {
	margin-bottom: 0;
	margin-top: 0;
	padding-top: 0px;
}

.aui #ui-datepicker-div, .aui .ui-datepicker {
	z-index: 99999 !important;
}

.aui .from_data_role, .aui  .selectEmpCheckbox {
	cursor: pointer;
	height: 17px;
	width: 17px;
}

.aui .checkbox label, .aui .radio label {
	cursor: default;
}

/* new */
.aui .modal-header .close{
	font-size: 1.4em !important;
    margin-top: 4px !important;
    padding-top: 5px !important;
}
.aui .ui-autocomplete{
	z-index: 1300;
}
.aui #from_emp_type {
	width: 170px;
}

.aui .form-group {
	margin-bottom: 5px;
}

.aui .control-label {
	cursor: default;
}

.aui input[type="radio"], .aui  input[type="checkbox"] {
	margin: 1px 0 0;
}

.ibox-title {
	padding: 1px 10px;
}

.ibox-content {
	background-color: #fff;
	border: 1px solid #ffe57f;
	color: inherit;
	margin-bottom: 5px;
	padding-left: 15px;
	padding-right: 15px;
}

.aui h5 {
	margin: 7px 0;
}

.gray-bg {
	background-color: #f3f3f4;
}

#objectCenter {
	text-align: center;
	vertical-align: middle;
}

.aui .checkbox input[type="checkbox"] {
	opacity: 1;
	z-index: 1;
}

#table_Sql {
	border-left-width: 1px;
}

.aui .modal {
	top: 2%;
}

#container {
	width: 93.5%;
}

.aui #file {
	width: 100%;
	height: 100%;
}
/* Large desktop */
@media ( max-width : 1310px) {
	.aui [class*="span"], .aui  .uneditable-input[class*="span"], .aui .row-fluid [class*="span"]
		{
		display: block;
		float: none;
		width: 100%;
		margin-left: 0;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
}
@media ( min-width : 1200px) {
	.aui #confrimModal {
		left: 55%;
	}
}

/* Portrait tablet to landscape and desktop */
@media ( min-width : 980px) and (max-width: 1199px) {
	.aui #confrimModal {
		left: 57%;
	}
}

@media ( min-width : 768px) and (max-width: 979px) {
	#ModalEditEmp {
		left: 15%;
		right: 15%;
	}
	#ModalImport {
		left: 15%;
		right: 15%;
	}
	#ModalLevel {
		left: 15%;
		right: 15%;
	}
	.aui #confrimModal {
		left: 58.5%;
	}
	.aui .ResultsPerPageTop {
		position: absolute;
		left: -20px;
		top: 46px;
	}
	.aui .ResultsPerPageBottom {
		position: relative;
		top: -40px;
	}
	.aui [class*="span"], .aui  .uneditable-input[class*="span"], .aui .row-fluid [class*="span"]
		{
		display: block;
		float: none;
		width: 100%;
		margin-left: 0;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.aui #widthPersenTop {
		width: 10.1%;
	}
}

/* Landscape phone to portrait tablet */
@media ( max-width : 767px) {
	.aui #confrimModal {
		left: 23.5%;
	}
	.aui .ResultsPerPageTop {
		position: absolute;
		left: -20px;
		top: 46px;
	}
	.aui .ResultsPerPageBottom {
		position: relative;
		top: -40px;
	}
	@media ( min-width : 481px) and (max-width: 615px) {
		.aui .height-32-px {
			height: 42px
		}
		.aui #confrimModal {
			left: 16.5%;
		}
		.aui .ResultsPerPageTop {
			position: absolute;
			left: -20px;
			top: 46px;
		}
		.aui .ResultsPerPageBottom {
			position: static;
		}
	}
	.aui #width-100-persen {
		
	}
	.aui #widthPersenTop {
		width: 10.3%;
	}
}

/* Landscape phones and down */
@media ( max-width : 480px) {
	.aui #from_emp_type {
		width: 100%;
	}
	.aui #confrimModal {
		left: 1%;
	}
	.aui .ResultsPerPageBottom {
		position: static;
	}
	.aui #width-100-persen {
		width: 110%;
	}
	.aui #widthPersenTop {
		width: 17%;
	}
	.aui .height-32-px {
		height: 42px
	}
}

</style>

<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">
<input type="hidden" id="plid_portlet" name="plid_portlet" value="<%= plid %>">
<input type="hidden" id="companyID" name="companyID" value="<%= companyID %>">
<input type="hidden" id="pAuth" name="pAuth" value="<%= pAuth %>">

<div id="container1">

	<!--  nav bar -->
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


	<!-- Start -- Advance Search ---------- -->
	<div class="row-fluid app_url_hidden">
		<div class="col-lg-12">
			<div class="ibox float-e-margins">
				<div class="ibox-title">
					<h5>Advance Search</h5>
				</div>

				<div class="ibox-content breadcrumbs2">
					<div class="row-fluid p-t-xxs">

						<div class="form-group pull-left span2" style="margin-left: 5px">
							<select name="year" id="year"
								class="input form-control input-sm span12" data-toggle="tooltip"
								style="cursor: pointer;" data-original-title="Year">
								<option value="">All Year</option>
							</select> <input type='hidden' value="" id="param_year">
						</div>

						<div class="form-group pull-left span2" style="margin-left: 5px">
							<select name="level" id="level"
								class="input form-control input-sm span12" data-toggle="tooltip"
								style="cursor: pointer;" data-original-title="Level">
								<option value="">All Level</option>
							</select> <input type='hidden' value="" id="param_level">
						</div>

						<div class="form-group pull-left span2" style="margin-left: 5px">
							<input type="number" step="0.5" id="param_step_from"
								class="form-control input-sm span12" name="param_step_from"
								data-toggle="tooltip" title="Step From" placeholder="Step From"
								value="" />
						</div>

						<div class="form-group pull-left span2" style="margin-left: 5px">
							<input type="number" step="0.5" id="param_step_to"
								class="form-control input-sm span12" name="param_step_to"
								data-toggle="tooltip" title="Step To" placeholder="Step To"
								value="" />
						</div>

						<div class="form-group pull-right m-b-none ">
							<div class="form-group pull-right m-b-none ">
								<button id="btn_import" type="button"
									class="btn btn-success btn-sm" style="margin-left: 5px;">
									<i class="fa fa-upload"></i> Import
								</button>
							</div>
							<div class="form-group pull-right m-b-none ">
								<form id="formExportToExcel" action="" method="post"
									class="pull-right"
									style="margin-bottom: 0px; margin-left: 5px;">
									<button type="submit" id="exportToExcel"
										class="btn btn-warning btn-sm">
										<i class="fa fa-download"></i> Download
									</button>
								</form>
							</div>
							<div class="form-group pull-right m-b-none p-b-xxs">
								<button type="button" id="btn_search_advance"
									class="btn btn-info input-sm" name="btn_search_advance"
									style="margin-left: 5px">
									<i class="fa fa-search"></i> Search
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- End -- Advance Search ---------- -->


	<!-- Start -- Salary Structure  List ---------- -->
	<div class="row-fluid" id="salary_range_list_content" style="display:none;">
		<div class="col-lg-12">
			<div class="ibox-title"> <h5>Salary Structure  List</h5> </div>
			<div class="ibox-content">
				<div class="row-fluid"> <div class="height-32-px"></div> </div>

				<div class="row-fluid" style="overflow: auto;">
					<table class="table table-striped" id="tableSalaryRange" style="max-width: none;">
						<thead>
							<tr style="white-space:nowrap;">
								<th class="test-right">Year</th>
								<th style="">Level</th>
								<th class="test-right">Step</th>
								<th class="test-right">Salary</th>
								<th class="test-right">Minimum Amount</th>
								<th class="text-center" style="text-align: center;">Manage</th>
							</tr>
						</thead>
						<tbody id="listSalaryRange">
							<!-- Generate by getDetailFn() -->
						</tbody>
					</table>
				</div>

			</div>
		</div>
	</div>
	<!-- End -- Salary Structure  List ---------- -->
	
</div>



	<!-- Modal Import Employee Role -->

	<div aria-hidden="true" role="dialog" tabindex="-1" id="ModalImport"
		class="modal inmodal" style="display: none;">
		<div class="modal-dialog">
			<div class="modal-content  bounceInRight">
				<div class="modal-header" >
					<button data-dismiss="modal" class="close" type="button" style="padding-top:5px">
						<span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only"></span>
					</button>
					<!-- <i class="fa fa-laptop modal-icon"></i> -->
					<h4 class="modal-title" id="">Import Salary Range</h4>
					<!-- 
                <small class="font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                 -->
				</div>
				<div class="modal-body">
					<!-- content start -->
					<!-- form start -->
					<div class="form-group">
					<form id="fileImportSalaryRange">
						<h4>FILE IMPORT</h4>
						<div class="fileUpload ">
							<input type="file" id="file" class="dropify" accept=".xls, .xlsx" style="width: 100%; height: 100%;"/><span></span>
						</div>
					</form>
					</div>
					<!-- form End -->
					<!-- content end -->
				</div>
				<div class="modal-footer">
					<button class="btn btn-success" type="submit" id="importFileMobile" form="fileImportSalaryRange">Import</button>
					<button data-dismiss="modal" class="btn btn-danger btnCancle"
						type="button">Cancel</button>
						<div class="alert alert-warning information" id="informationFile"
						style="height:120px; overflow-y: scroll; position:relative;display: none;"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal End Role -->
	
<!-- Modal Start Edit -->

	<div aria-hidden="true" role="dialog" tabindex="-1" id="ModalEdit"
		class="modal inmodal" style="display: none;">
		<div class="modal-dialog">
			<div class="modal-content bounceInRight">
				<div class="modal-header">
					<button data-dismiss="modal" class="close" type="button" style="padding-top:5px">
						<span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only"></span>
					</button>
					<!-- <i class="fa fa-laptop modal-icon"></i> -->
					<h4 class="modal-title" id="modalTitleRole">Salary Range</h4>
					<!-- 
                <small class="font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                 -->
				</div>
				<div class="modal-body">
					<!-- content start -->
					<!-- form start -->
					<div class="row-fluid">
	                	<div class="span12 form-horizontal p-t-xxs">
	                		<div class="form-group p-xxs">
								<label class="control-label">Year:</label>
								<div class="controls">
									<input disabled type="text" class="form-control input-sm span12" placeholder="" id="from_year">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label">Level:</label>
								<div class="controls">
									<input disabled type="text" class="form-control input-sm span12" placeholder="" id="from_level">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label">Step:</label>
								<div class="controls">
									<input disabled  type="text"  class="form-control input-sm span12" id="from_step" >
								</div>
							</div>
							<div class="form-group p-xxs" style="padding-top: 8px;">
								<label class="control-label">Salary:<span class='redFont'>*</span></label>
								<div class="controls">
									<input  title="salary" type="text" class="form-control input-sm span12" placeholder="" id="from_salary">
								</div>
							</div>
							<div class="form-group p-xxs" style="padding-top: 8px;">
								<label class="control-label">Minimum Amount:<span class='redFont'>*</span></label>
								<div class="controls">
									<input  title="salary" type="text" class="form-control input-sm span12" placeholder="" id="from_minimumsalary">
								</div>
							</div>																						          	                	
	                	</div>
                	</div>
					<!-- form End -->
					<!-- content end -->
				</div>
				<div class="modal-footer">
					<button class="btn btn-success" type="button" id="btnSalarySubmit">Save</button>
					<button data-dismiss="modal" class="btn btn-danger btnCancle"
						type="button">Cancel</button>
						<div class="alert alert-warning information" id="information2"
						style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal End Edit -->


	<!-- Modal Confirm Start -->
	<div aria-hidden="true" role="dialog" tabindex="-1" id="confrimModal"
		class="modal inmodal in" style="width:400px;left:calc;display: none;">
		<div class="modal-dialog">
			<div class="modal-content  bounceInRight">
				<div class="modal-header">
					<button data-dismiss="modal" class="close" type="button" style="padding-top:3px">
						<span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only"></span>
					</button>
					<h5 class="modal-title">Confirm Dialog</h5>
				</div>
				<div class="modal-body">
					<!-- content start -->
					<!-- <h2><i class="fa fa fa-pencil-square-o icon-title"></i> ADD NEW GRADE</h2>
                <hr>
                 -->
					<!-- form start -->
					<div class="form-kpi-mangement">
						<div class="form-kpi-label" align="center">

							<label>Confirm to Delete Data?</label>
							<div id="inform_on_confirm" class='information'></div>
						</div>
					</div>

					<!-- form start -->
					<!-- content end -->
				</div>
				<div class="modal-footer">
					<div align="center">
						<button class="btn btn-success" id="btnConfirmOK" type="button">
							&nbsp;&nbsp;<i class="fa fa-check-circle"></i>&nbsp;&nbsp;Yes&nbsp;&nbsp;
						</button>
						&nbsp;&nbsp;
						<button data-dismiss="modal" class="btn btn-danger" type="button">
							<i class="fa fa-times-circle"></i>&nbsp;Cancel
						</button>
					</div>
					<div class="alert alert-warning information" id="information"
						style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal Confirm End -->
	
	
	
	<!-- Modal User Import Start -->
	<div aria-hidden="true" role="dialog" tabindex="-1" id="userImportModal"
		class="modal inmodal in" style="width:400px;left:calc;display: none;">
		<div class="modal-dialog">
			<div class="modal-content  bounceInRight">
				<div class="modal-header">
					<button data-dismiss="modal" class="close" type="button" style="padding-top:3px">
						<span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only">Close</span>
					</button>
					<h5 class="modal-title">Confirm Dialog</h5>
				</div>
				<div class="modal-body">
					<div class="form-kpi-mangement">
						<div class="form-kpi-label" align="center">

							<label>Do you want to create a user?</label>
							<div id="inform_on_confirm" class='information'></div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<div align="center">
						<button class="btn btn-success" id="btnUserImportOK" type="button">
							&nbsp;&nbsp;<i class="fa fa-check-circle"></i>&nbsp;&nbsp;Yes&nbsp;&nbsp;
						</button>
						&nbsp;&nbsp;
						<button data-dismiss="modal" class="btn btn-danger" type="button">
							<i class="fa fa-times-circle"></i>&nbsp;Cancel
						</button>
					</div>
					<div id="userImportProgressbar" class="progressBar"> <span id="progressText" class="progressBarText"></span> </div> 
					<div class="alert alert-warning information" id="userImportInfo"
						style="height:220px; overflow-y: scroll; position:relative; display: none;">
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal User Import End -->
	
	
	
<input type="hidden" name="id" id="id" value="">
<input type="hidden" name="action" id="action" value="add">
