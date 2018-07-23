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
.input-to-button {
    width: 200px;
    height: 20px;
    padding-right: 50px;
}

.button-to-input {
    margin-left: -50px;
    height: 25px;
    width: 50px;
    background: blue;
    color: white;
    border: 0;
    -webkit-appearance: none;
}
.aui .table td {
	background-color: #ffffff;
	border: none;
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
		left: 50%;
	}
}

/* Portrait tablet to landscape and desktop */
@media ( min-width : 980px) and (max-width: 1199px) {
	.aui #confrimModal {
		left: 50%;
	}
}

@media ( min-width : 768px) and (max-width: 979px) {
	.aui #confrimModal {
		left: 15%;
		right: 15%;
	}
	
	#ModalLevel {
		left: 15%;
		right: 15%;
	}
	
	#ModalImport {
		left: 15%;
		right: 15%;
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
		left: 20%;
		right: 20%;
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
			left: 10%;
			right: 10%;
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
		left: 5%;
		right: 5%;
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
				<div class="ibox-title" style="background-color: rgb(83, 120, 253); border-color: rgb(83, 120, 253); min-height: 0px;">
					<h5>Monitor ETL</h5>
				</div>
				<div class="ibox-content breadcrumbs2 advance-search" style="border-color: rgb(83, 120, 253);">

					<div class="row-fluid">
						<div id="listJobLog">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- Modal KPI Start Edit -->
	  <div aria-hidden="true" role="dialog" tabindex="-1" id="ModalJobLog" class="modal inmodal" style="display: none;">
	    <div class="modal-dialog">
	    <div class="modal-content bounceInRight">
	            <div class="modal-header">
	                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only"></span></button>
	                <h4 class="modal-title" id="modalTitleRole">Monitor ETL</h4>
	            </div>
	            <div class="modal-body">
	                <!-- panel0 start -->
	                <div class="row-fluid">
		  				<div class="span12">
							<div class="row-fluid">
	                				<div class="span12 form-horizontal p-t-xxs">
	                					<h4>Job Log Setting</h4>
	                					<hr />
								        <div class="form-group p-xxs">
								            <label class="control-label"><strong>Job Log name :</strong></label>
								            <div class="controls">
								            	<input type="hidden" id="edit_job_log_id">
								                <input type="text" class="form-control input-sm span10" placeholder="" id="edit_job_log_name"> </div>
								        </div>
								        <div class="form-group p-xxs">
								            <label class="control-label"><strong>Start Date :</strong></label>
									            <div class="controls">
									                <input type="text" class="form-control input-sm span10" placeholder="" id="edit_start_date">
									            </div>
								        	</div>
								        <div class="form-group p-xxs">
								            <label class="control-label"><strong>End Date :</strong></label>
								            <div class="controls">
								                <input type="text" class="form-control input-sm span10" placeholder="" id="edit_end_date"> </div>
								        </div>
								        <div class="form-group p-xxs">
								        	<label class="control-label"><strong></strong></label>
								        	<div class="controls">
								        		<button type="button" id="btnadven" class="btn">Advanced Setting</button>
								        	</div>
								        </div>
									    <div id="demo">
									    	<div class="form-group p-xxs">
									            <label class="control-label"><strong>Path Batch File :</strong></label>
									            <div class="controls">
									                <input type="text" class="form-control input-sm span10" id="edit_path_batch_file">
									            </div>
									        </div>
									    </div>
									    <h4>Email Setting</h4>
	                					<hr />
								        <div class="form-group p-xxs">
								            <label class="control-label"><strong>Destination Address :</strong></label>
								            <div class="controls">
								                <input type="text" class="form-control input-sm span10" placeholder="" id="edit_destination_address"> </div>
								        </div>
								        <div class="wrap" id="edit_cc">
									        <div class="row-fluid row_data">
									            <label class="control-label"><strong>CC :</label>
									            <div class="controls" style="display:flex">
									                <input class="form-control input-sm span10" type="text">&nbsp;
									                <button class="btn btn-success btn-small modal-add" style="margin-bottom: 7px;"
										                data-tr='
											                <div class="row-fluid row_data">
											                	<label class="control-label"></label>
											                	<div class="controls" style="display:flex">
											                		<input class="form-control input-sm span10" type="text">&nbsp;
											                		<button class="btn btn-danger btn-small del-row" style="margin-bottom: 7px;"><i class="fa fas fa-times"></i></button>
											                	</div>
											                </div>
											            '>
											    		<i class="fa fas fa-plus"></i>
											    	</button>
									        	</div>
									        </div>
									        <div class="list_input"></div>
								        </div>
								        <div class="wrap" id="edit_bcc">
									        <div class="row-fluid row_data">
									            <label class="control-label"><strong>BCC :</strong></label>
									            <div class="controls" style="display:flex">
									                <input class="form-control input-sm span10" type="text">&nbsp;
									                <button class="btn btn-success btn-small modal-add" style="margin-bottom: 7px;"
										                data-tr='
											                <div class="row-fluid row_data">
											                	<label class="control-label"></label>
											                	<div class="controls" style="display:flex">
											                		<input class="form-control input-sm span10" type="text">&nbsp;
											                		<button class="btn btn-danger btn-small del-row" style="margin-bottom: 7px;"><i class="fa fas fa-times"></i></button>
											                	</div>
											                </div>
											            '>
											    		<i class="fa fas fa-plus"></i>
											    	</button>
									        	</div>
									        </div>
									        <div class="list_input"></div>
								        </div>
								         <div class="form-group p-xxs">
								        	<label class="control-label"><strong></strong></label>
								        	<div class="controls">
								        		<button type="button" id="btnadven2" class="btn">Advanced Setting</button>
								        	</div>
								        </div>
								        	<div id="demo2">
										        <div class="form-group p-xxs">
										            <label class="control-label"><strong>Sender Name :</strong></label>
										            <div class="controls">
										                <input type="text" class="form-control input-sm span10" id="edit_sender_name"> </div>
										        </div>
										        <div class="form-group p-xxs">
										            <label class="control-label"><strong>Sender Address :</strong></label>
										            <div class="controls">
										                <input type="text" class="form-control input-sm span10" id="edit_sender_address"> </div>
										        </div>
										        <div class="form-group p-xxs">
										            <label class="control-label"><strong>Path Log File :</strong></label>
										            <div class="controls">
										                <input type="text" class="form-control input-sm span10" id="edit_path_log_file">
										            </div>
										        </div>
										        <div class="form-group p-xxs">
										            <label class="control-label"><strong>Subject Error :</strong></label>
										            <div class="controls">
										                <input type="text" class="form-control input-sm span10" id="edit_subject_error">
										            </div>
										        </div>
										        <div class="form-group p-xxs">
										            <label class="control-label"><strong>Message Error :</strong></label>
										            <div class="controls">
										            	<textarea class="form-control input-sm-small span10" id="edit_scomment_error" placeholder="Comment Error" style="height: 100px; margin: 0px 0px 5px; resize: vertical;" value=""></textarea>
										            </div>
										        </div>
									        </div>
								    	</div>
									</div>		
		   					</div>
		   				</div>
	                <!-- panel0 end -->
	                <!-- content end -->
	            </div>
	            <div class="modal-footer">
					<button class="btn btn-success" type="button" id="btnSubmitUpdate">Save</button>
					<button data-dismiss="modal" class="btn btn-danger btnCancle"
						type="button">Cancel</button>
						<div class="alert alert-warning information" id="information2"
						style="display: none;"></div>
				</div>
	        </div>
	    </div>
	    
	</div>                      
	<!-- Modal KPI End Edit -->
	
	<!-- Modal Confirm Start -->
	<div aria-hidden="true" role="dialog" tabindex="-1" id="confrimModal" class="modal inmodal" style="display: none;">
	    <div class="modal-dialog">
	    <div class="modal-content animated bounceInRight">
	            <div class="modal-header">
	                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only"></span></button>
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
		                		<input type="hidden" id="run_job_log_id">
		                 		<label>Confirm to Run?</label>
		                </div>
	                </div>
	                               
	                <!-- form start -->
	                <!-- content end -->
	            </div>
	            <div class="modal-footer">
	            	<div align="center">
		                <button class="btn btn-success" id="btnConfirmOK" type="button">&nbsp;&nbsp;<i class="fa fa-check-circle"></i>&nbsp;&nbsp;Yes&nbsp;&nbsp;</button>&nbsp;&nbsp;
		                <button data-dismiss="modal" class="btn btn-danger" type="button"><i class="fa fa-times-circle"></i>&nbsp;Cancel</button>
	            	</div>
	            </div>
	        </div>
	    </div>
	</div>
	<!-- Modal Confirm End -->
</div>
 
 
