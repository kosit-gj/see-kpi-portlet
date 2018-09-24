<%@ page import="javax.portlet.*"%>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="com.liferay.portal.kernel.util.WebKeys" %>

<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui"%>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>
<%@ taglib uri="http://liferay.com/tld/ui" prefix="liferay-ui" %>

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

.aui #employee_list_content {
	display: none;
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
	.aui #widthPersenBottom {
		width: 11%;
	}
	.aui .txtCountPaginationTop {
		position: absolute;
		left: -14.9%;
		top: 51px;
		width: 41.66666667%;
	}
	.aui .selectCountPaginationTop {
		position: absolute;
		left: 86.5%;
		top: 51px;
		width: 24%;
	}
	.aui .txtCountPaginationBottom {
		left: -11.5%;
		top: -45px;
		width: 43.96666667%;
		position: relative;
	}
	.aui .selectCountPaginationBottom {
		left: 90.1%;
		top: -75px;
		width: 25%;
		position: relative;
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
	#widthPersenBottom {
		width: 11.2%;
	}
	.aui .txtCountPaginationTop {
		position: absolute;
		left: -14.9%;
		top: 51px;
		width: 41.66666667%;
	}
	.aui .selectCountPaginationTop {
		position: absolute;
		left: 86.5%;
		top: 51px;
		width: 24%;
	}
	.aui .txtCountPaginationBottom {
		left: -11.5%;
		top: -45px;
		width: 43.96666667%;
		position: relative;
	}
	.aui .selectCountPaginationBottom {
		left: 90.1%;
		top: -75px;
		width: 25%;
		position: relative;
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
	.aui #widthPersenBottom {
		width: 19.1%;
	}
	.aui .height-32-px {
		height: 42px
	}
	.aui .txtCountPaginationTop {
		position: absolute;
		left: -25%;
		top: 40px;
		width: 41.66666667%;
	}
	.aui .selectCountPaginationTop {
		position: absolute;
		left: 78.5%;
		top: 42px;
		width: 24%;
	}
	.aui .txtCountPaginationBottom {
		left: -21.2%;
		top: -5px;
		width: 43.96666667%;
		position: relative;
	}
	.aui .selectCountPaginationBottom {
		left: 82.9%;
		top: -34px;
		width: 25%;
		position: relative;
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


	<div class="row-fluid app_url_hidden">
		<!-- start--row-fluid -->
		<div class="col-lg-12">
			<div class="ibox float-e-margins">
				<div class="ibox-title"> <h5><liferay-ui:message key="advanced-search"/></h5> </div>

				<div class="ibox-content breadcrumbs2">
					<div class="row-fluid p-t-xxs">
						<div id="drop_down_organization"
							class="form-group pull-left span3" style="margin-left: 5px">
							<select data-toggle="tooltip" title="<liferay-ui:message key="organization"/>"
								class="input span12 m-b-n" id="search_org" name="search_org"><option
									selected value="">All Organization</option></select>
						</div>

						<div class="form-group pull-left span2" style="margin-left: 5px">
							<input data-toggle="tooltip" title="<liferay-ui:message key="position"/>"
								data-placement="top" class="span12 m-b-n ui-autocomplete-input"
								placeholder="<liferay-ui:message key="position"/>" id="search_position"
								name="search_position" type="text"> <input
								class="form-control input-sm" id="search_position_id"
								name="search_position_id" value="" type="hidden">
						</div>
						<div class="form-group pull-left span3" style="margin-left: 5px">
							<input data-toggle="tooltip" title="<liferay-ui:message key="employee-name"/>"
								data-placement="top" class="span12 m-b-n ui-autocomplete-input"
								placeholder="<liferay-ui:message key="employee-name"/>" id="search_emp_name"
								name="search_emp_name" type="text"> <input
								class="form-control input-sm" id="search_emp_id"
								name="search_emp_id" value="" type="hidden">
						</div>
							 <div class="form-group pull-right m-b-none ">
							<div class="form-group pull-right m-b-none ">
								<!-- data-target="#ModalLevel"  -->
								<button id="btn_assign_level" type="submit" data-toggle="modal"
									class="btn btn-primary btn-sm " style="margin-left: 5px;">
									<i class="fa fa-pencil-square-o"></i>&nbsp;<liferay-ui:message key="assign"/>&nbsp;<liferay-ui:message key="level"/>
								</button>
							</div>
							<div class="form-group pull-right m-b-none ">
								<button id="btn_import" type="button"
									class="btn btn-success btn-sm " style="margin-left: 5px;">
									<i class="fa fa-upload"></i>&nbsp;<liferay-ui:message key="import"/>
								</button>
							</div>
							<div class="form-group pull-right m-b-none ">
								<form id="formExportToExcel" action="" method="post"
									class="pull-right "
									style="margin-bottom: 0px; margin-left: 5px">
									<button id="exportToExcel" class="btn btn-warning btn-sm"
										type="submit">
										<i class="fa fa-download"></i> <liferay-ui:message key="download"/>
									</button>
								</form>
							</div>
							<div class="form-group pull-right m-b-none ">
								<button type="button" name="btnSearchAdvance"
									id="btnSearchAdvance" class="btn btn-info input-sm "
									style="margin-left: 5px;">
									<i class="fa fa-search"></i>&nbsp;<liferay-ui:message key="search"/>
								</button>
							</div>
						</div> 
					
					</div>
				</div> <!-- content end -->
			</div>
		</div>
	</div> <!-- end--row-fluid -->


	<div class="row-fluid " id="employee_list_content">
		<div class="col-lg-12">
			<div class="ibox-title"> <h5><liferay-ui:message key="employee-list"/></h5> </div>
			<div class="ibox-content">
				<div class="row-fluid">
					<div class="height-32-px"></div>
				</div>
				
				<!-- pagination start -->
				<div class="row-fluid">
					<div id="width-100-persen" class="span9 m-b-xs">
						<span class="pagination_top m-b-none pagination"></span>
					</div>
					<div class="span3 object-right ResultsPerPageTop">
						<div class='pagingDropdown'>
							<select id='countPaginationTop'
								class="form-control input-sm countPagination">
								<option>10</option>
								<option>20</option>
								<option>50</option>
								<option>100</option>
							</select>
						</div>
						<div class='pagingText'><liferay-ui:message key="results-per-page"/></div>
					</div>
				</div> <!-- pagination end -->
				
				<!-- start table -->
				<div class="row-fluid" style="overflow: auto;">
					<table class="table table-striped" id="tableEmployee" style="max-width: none;">
						<thead>
							<tr style="white-space:nowrap">
								<th style='text-align:center'><liferay-ui:message key="select"/></th>
								<th> <liferay-ui:message key="emp-code"/></th>
								<th> <liferay-ui:message key="emp-name"/></th>
								<th> <liferay-ui:message key="organization-name"/></th>
								<th> <liferay-ui:message key="position-name"/> </th>
								<th> <liferay-ui:message key="chief-employee-code"/> </th>
								<th> <liferay-ui:message key="appraisal-level"/> </th>
								<th style='text-align:center' class='objectCenter'><liferay-ui:message key="manage"/>  </th>
							</tr>
						</thead>
						<tbody id="listEmployee">
							<!-- Generate by listImportEmployeeFn() -->
						</tbody>
					</table>
				</div> <!-- end table -->
				
				<!-- pagination start -->
				<div class="row-fluid">
					<div id="width-100-persen" class="span9 m-b-xs ">
						<span class="pagination_bottom m-b-none pagination"></span>
					</div>
					<div class="span3 object-right ResultsPerPageBottom">
						<div class='pagingDropdown'>
							<select id='countPaginationBottom'
								class="form-control input-sm countPagination">
								<option>10</option>
								<option>20</option>
								<option>50</option>
								<option>100</option>
							</select>
						</div>
						<div class='pagingText'><liferay-ui:message key="results-per-page"/></div>
					</div>
				</div>
				<!-- pagination end -->

			</div>
			<!-- content end -->
		</div>
	</div>
</div>


<!-- Modal Import Employee Role -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="ModalImport" class="modal inmodal" style="display: none;">
	<div class="modal-dialog">
		<div class="modal-content  bounceInRight">
			<div class="modal-header">
				<button data-dismiss="modal" class="close" type="button" style="padding-top: 5px">
					<span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only"><liferay-ui:message key="close"/></span>
				</button>
				<h4 class="modal-title" id=""><liferay-ui:message key="import-employee"/></h4>
			</div>
			<div class="modal-body">
				<div class="form-group">
					<form id="fileImportEmployee">
						<h4><liferay-ui:message key="file-import"/></h4>
						<div class="fileUpload ">
							<input type="file" id="file" class="dropify" accept=".xls, .xlsx" /><span></span>
						</div>
					</form>
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-success" type="submit" id="importFileMobile" form="fileImportEmployee"><liferay-ui:message key="import"/></button>
				<button data-dismiss="modal" class="btn btn-danger btnCancle" type="button"><liferay-ui:message key="cancel"/></button>
				<div class="alert alert-warning information" id="informationFile" style="height: 120px; overflow-y: scroll; position: relative; display: none;"></div>
			</div>
		</div>
	</div>
</div>
<!-- Modal End Role -->



<!-- Modal Start Role -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="ModalLevel" class="modal inmodal" style="display: none;">
	<div class="modal-dialog">
		<div class="modal-content bounceInRight">
			<div class="modal-header">
				<button data-dismiss="modal" class="close" type="button" style="padding-top: 5px">
					<span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only"><liferay-ui:message key="close"/></span>
				</button>
				<h4 class="modal-title" id="modalTitleRole"><liferay-ui:message key="assign-level"/></h4>
			</div>
			<div class="modal-body">
				<div class="form-inline p-b-xs" id="txtAssignEmpName">
					<div class="form-group">
						<div class="form-group m-n ">
							<label class="form-label-emp"><liferay-ui:message key="employee-name"/>: </label> &nbsp;
							<label id="from_role_emp_name" class="form-label-emp"> </label> &nbsp;
						</div>
					</div>
				</div>
				<div>
					<!-- start table -->
					<div class="table-responsive">
						<table class="table table-striped" id="formTableAppraisalLevel">
							<thead>
								<tr>
									<th style='width: auto;'><liferay-ui:message key="select"/></th>
									<th style='width: 70%'><liferay-ui:message key="appraisal-level-name"/></th>
								</tr>
							</thead>
							<tbody id="formListAppraisalLevel">
								<!-- Generate by listAppraisalLevel() -->
							</tbody>
						</table>
					</div> <!-- end table -->
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-success" type="button" id="btnLvSubmit"><liferay-ui:message key="save"/></button>
				<button data-dismiss="modal" class="btn btn-danger btnCancle" type="button"><liferay-ui:message key="cancel"/></button>
				<div class="alert alert-warning" id="information3" style="display: none;"></div>
			</div>
		</div>
	</div>
</div>
<!-- Modal End Role -->



<!-- Modal Start Edit -->

	<div aria-hidden="true" role="dialog" tabindex="-1" id="ModalEditEmp"
		class="modal inmodal" style="display: none;">
		<div class="modal-dialog">
			<div class="modal-content bounceInRight">
				<div class="modal-header">
					<button data-dismiss="modal" class="close" type="button" style="padding-top:5px">
						<span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only"><liferay-ui:message key="close"/></span>
					</button>
					<!-- <i class="fa fa-laptop modal-icon"></i> -->
					<h4 class="modal-title" id="modalTitleRole"><liferay-ui:message key="employee"/></h4>
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
								<label class="control-label"><liferay-ui:message key="emp-code"/>:<span class='redFont'>*</span></label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_emp_code">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label"><liferay-ui:message key="emp-name"/>:<span class='redFont '>*</span></label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_emp_name">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label"><liferay-ui:message key="appraisal-level-name"/>:</label>
								<div class="controls">
									<select title="Appraisal Level" class="input span12 m-b-n" id="from_Level_id" name="from_Level_id" style="margin-bottom:5px!important;">
									</select>
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label"><liferay-ui:message key="step"/>:</label>
								<div class="controls">
									<input type="number" class="form-control input-sm span12" placeholder="<liferay-ui:message key="step"/>" id="from_step" step="0.5">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label"><liferay-ui:message key="working-start-date"/>:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_emp_wsd">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label"><liferay-ui:message key="probation-end-date"/>:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_emp_ped">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label"><liferay-ui:message key="acting-end-date"/>:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_emp_aed">
								</div>
							</div>

							<div class="form-group p-xxs">
								<label class="control-label"><liferay-ui:message key="organization-name"/>:</label>
								<div class="controls">
									<select title="Organization" class="input span12 m-b-n" id="from_org_id" name="from_org_id" style="margin-bottom:5px !important;">
									</select>
								</div>
							</div>
							

							<div class="form-group p-xxs">
								<label class="control-label"><liferay-ui:message key="position-name"/>:</label>
								<div class="controls">
									<input title="Position"
										class="form-control input-sm span12"
										placeholder="Position" id="from_position_name"
										name="from_position_name" type="text"> <input
										class="form-control input-sm" id="from_position_id"
										name="from_position_id" value="" type="hidden">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label"><liferay-ui:message key="chief-employee-code"/>:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_sup_emp_code">
								</div>
							</div>
	                		<div class="form-group p-xxs">
								<label class="control-label"><liferay-ui:message key="email"/>:<span class='redFont '>*</span></label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_emp_email">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label"><liferay-ui:message key="salary"/>:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12 numberOnly" placeholder="" id="from_emp_salary">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label"><liferay-ui:message key="erp-user"/>:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_emp_erp_user">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label"><liferay-ui:message key="dotline-code"/>:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_dotline_code">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label"><liferay-ui:message key="employee-type"/>:</label>
								<div id="drop_down_emp_typy" class="controls"></div>
							</div>
							<div class="form-group p-xxs" style="display: none;"  >
								<label class="control-label"><liferay-ui:message key="is-corporate-kpi"/>:</label>
								<div class="controls">
									<label for="" class="checkbox" style="cursor:default">
                  					<input id="from_checkboxIs_corporate_kpi" name="from_checkboxIs_corporate_kpi" type="checkbox"
										value="" style="margin-top: 4px;">
                					</label>
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label"><liferay-ui:message key="has-second-line"/>:</label>
								<div class="controls">
									<label for="" class="checkbox" style="cursor:default">
                  					<input id="from_checkboxHas_second_line" name="from_checkboxHas_second_line" type="checkbox"
										value="" style="margin-top: 4px;">
                					</label>
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label"><liferay-ui:message key="is-active"/>:</label>
								<div class="controls">
									<label for="" class="checkbox" style="cursor:default">
                  					<input id="from_checkboxIs_active" name="from_checkboxIs_active" type="checkbox"
										value="" style="margin-top: 4px;">
                					</label>
								</div>
							</div>
	                	
	                	
	                	</div>
                	</div>
					<!-- form End -->
					<!-- content end -->
				</div>
				<div class="modal-footer">
					<button class="btn btn-success" type="button" id="btnEmpSubmit"><liferay-ui:message key="save"/></button>
					<button data-dismiss="modal" class="btn btn-danger btnCancle"
						type="button"><liferay-ui:message key="cancel"/></button>
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
						<span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only"><liferay-ui:message key="close"/></span>
					</button>
					<h5 class="modal-title"><liferay-ui:message key="confirm-dialog"/></h5>
				</div>
				<div class="modal-body">
					<!-- content start -->
					<!-- <h2><i class="fa fa fa-pencil-square-o icon-title"></i> ADD NEW GRADE</h2>
                <hr>
                 -->
					<!-- form start -->
					<div class="form-kpi-mangement">
						<div class="form-kpi-label" align="center">

							<label><liferay-ui:message key="confirm-to-delete-data"/>?</label>
							<div id="inform_on_confirm" class='information'></div>
						</div>
					</div>

					<!-- form start -->
					<!-- content end -->
				</div>
				<div class="modal-footer">
					<div align="center">
						<button class="btn btn-success" id="btnConfirmOK" type="button">
							&nbsp;&nbsp;<i class="fa fa-check-circle"></i>&nbsp;&nbsp;<liferay-ui:message key="yes"/>&nbsp;&nbsp;
						</button>
						&nbsp;&nbsp;
						<button data-dismiss="modal" class="btn btn-danger" type="button">
							<i class="fa fa-times-circle"></i>&nbsp;<liferay-ui:message key="cancel"/>
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
						<span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only"><liferay-ui:message key="close"/></span>
					</button>
					<h5 class="modal-title"><liferay-ui:message key="confirm-dialog"/></h5>
				</div>
				<div class="modal-body">
					<div class="form-kpi-mangement">
						<div class="form-kpi-label" align="center">

							<label><liferay-ui:message key="do-you-want-to-create-a-user"/>?</label>
							<div id="inform_on_confirm" class='information'></div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<div align="center">
						<button class="btn btn-success" id="btnUserImportOK" type="button">
							&nbsp;&nbsp;<i class="fa fa-check-circle"></i>&nbsp;&nbsp;<liferay-ui:message key="yes"/>&nbsp;&nbsp;
						</button>
						&nbsp;&nbsp;
						<button data-dismiss="modal" class="btn btn-danger" type="button">
							<i class="fa fa-times-circle"></i>&nbsp;<liferay-ui:message key="cancel"/>
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
<%@ include file="/html/language-js-template/view.jsp" %>
<!-- Mainly scripts -->
<!-- <script type="text/javascript">var jQuery_1_1_3 = $.noConflict(true);</script> -->

