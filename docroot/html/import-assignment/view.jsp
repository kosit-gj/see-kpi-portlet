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
}
/* Large desktop End######################################*/

/*  desktop Start#########################################*/
@media ( min-width : 980px) and (max-width: 1199px) {
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

.ibox-content {
	background-color: #fff;
	border: 1px solid #ffe57f;
	color: inherit;
	margin-bottom: 5px;
	padding-left: 15px;
	padding-right: 15px;
}

.aui select, .aui textarea, .aui input[type="text"], .aui input[type="password"],
	.aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="date"],
	.aui input[type="month"], .aui input[type="time"], .aui input[type="week"],
	.aui input[type="number"], .aui input[type="email"], .aui input[type="url"],
	.aui input[type="search"], .aui input[type="tel"], .aui input[type="color"],
	.aui .uneditable-input {
	padding: 2px;
}

.aui input[type="color"], .aui input[type="date"], .aui input[type="datetime"],
	.aui input[type="datetime-local"], .aui input[type="email"], .aui input[type="month"],
	.aui input[type="number"], .aui input[type="password"], .aui input[type="search"],
	.aui input[type="tel"], .aui input[type="text"], .aui input[type="time"],
	.aui input[type="url"], .aui input[type="week"], .aui select, .aui textarea,
	.aui .uneditable-input {
	border: 1px solid #ddd;
	color: #8d8d8d;
	font-weight: 200;
	margin-bottom: 0;
}


.aui select {
	width: 100%;
}

.aui input {
	width: 100%;
}

.aui .btn {
	font-size: 14px;
 	padding: 4px 12px; 
	width: auto;
	margin-top: 0px;
	display: inline;
}
.aui .breadcrumbs2 select, .aui breadcrumbs2 textarea, .aui .breadcrumbs2 input[type="text"], .aui input[type="password"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="date"], .aui input[type="month"], .aui input[type="time"], .aui input[type="week"], .aui input[type="number"], .aui input[type="email"], .aui input[type="url"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="color"], .aui .uneditable-input {
    height: 30px;
    padding: none;
    font-size: 14px;
}
.aui  select , .aui  input[type="text"]{font-size: 14px;}

.ui-state-default{
	width: 100% !important;
}
.ui-multiselect{
	padding: 5px;
}
.ui-corner-all, .ui-corner-top, .ui-corner-right, .ui-corner-tr{
	border-top-right-radius: 0;
}

.ui-corner-all, .ui-corner-top, .ui-corner-left, .ui-corner-tl{
	border-top-left-radius: 0;
}

.ui-corner-all, .ui-corner-bottom, .ui-corner-left, .ui-corner-bl{
	border-bottom-left-radius: 0;
}

.ui-corner-all, .ui-corner-bottom, .ui-corner-right, .ui-corner-br{
	border-bottom-right-radius: 0;
}
.ui-multiselect-header span.ui-icon{
	top: 5px;
}
.aui ul, .aui ol{
	margin: 0px 0px 0px 0px;
}
.ui-icon{
	 margin-top: 0;
}
.aui input[type="radio"], .aui input[type="checkbox"]{
	margin: -5px 0 0;
}
.aui label{
	margin-bottom: 0px;
}
.ui-multiselect-checkboxes li{
	padding-right: 0px;
}
</style>
<div class="app_url_hidden">
<!-- app_url_hidden -->
	<div class="row-fluid">
		<!-- start--row-fluid -->

		<div class="span12">
			<div class="ibox float-e-margins">
				<div class="ibox-title">

					<div class='titlePanelSearch'>Advance Search</div>
				</div>

				<div class="ibox-content breadcrumbs2">

					<div class="row-fluid ">

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
								placeholder="Position" class="form-control input-sm span12" disabled
								data-original-title="Position">
								<input type="hidden" id="Position_id">
						</div>



						<div id='appraisalLevelArea' class="form-group pull-left span4"
							style="margin-left: 5px; margin-bottom: 3px;">
							<select data-toggle="tooltip" title="Level" multiple="multiple"
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





						<div class="form-group pull-right m-b-none "
							style="margin-bottom: 5px;">
							<button type="button" class="btn btn-info input-sm"
								name="btnSearchAdvance" id="btnSearchAdvance">
								<i class="fa fa-search"></i>&nbsp;Search
							</button>
							<button type="button" data-target='#ModalAssignment'
								data-toggle='modal' class="btn btn-warning input-sm"
								name="btnAssignment" id="btnAssignment">
								<i class="fa fa-sign-in"></i>&nbsp;Assign
							</button>
						</div>

					</div>



				</div>
				<!-- content end -->
			</div>

		</div>

	</div>
	<!-- end--row-fluid -->
</div>
