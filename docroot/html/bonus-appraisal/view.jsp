<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet"%>
<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui"%>
<%@ page import="javax.portlet.*"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme"%>
<%@ page import="com.liferay.portal.util.PortalUtil" %>
<%@ taglib uri="http://liferay.com/tld/ui" prefix="liferay-ui" %>
<%@ page import="com.liferay.portal.kernel.util.WebKeys"%>

<liferay-theme:defineObjects />
<portlet:defineObjects />
<%
	/*
	PortletSession portletSession1 = renderRequest.getPortletSession();
	portletSession1.setAttribute("password", "authenticated", PortletSession.APPLICATION_SCOPE);
	String pwd = (String) portletSession1.getAttribute("password", PortletSession.APPLICATION_SCOPE);
	out.print(pwd);
	String password=PortalUtil.getUser(request).getPassword();
	*/

	String username = themeDisplay.getUser().getScreenName();
	String password = (String) request.getSession().getAttribute(WebKeys.USER_PASSWORD);
	layout = themeDisplay.getLayout();
	plid = layout.getPlid();
	//out.print(username);
	//out.print("password2="+password);

	long companyID = themeDisplay.getCompanyId();
	String pAuth = com.liferay.portal.security.auth.AuthTokenUtil.getToken(request);
%>
<input type="hidden" id="user_portlet" name="user_portlet"
	value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet"
	value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet"
	value="<%=renderRequest.getContextPath()%>">
<input type="hidden" id="plid_portlet" name="plid_portlet"
	value="<%=plid%>">

<input type="hidden" id="companyID" name="companyID"
	value="<%=companyID%>">
<input type="hidden" id="pAuth" name="pAuth" value="<%=pAuth%>">


<style>

.aui .url_report_cursor, .aui .cursorNotAllowed, .aui #tableBonusAppraisal .cursorNotAllowed tr:hover>td,
	.aui #tableBonusAppraisal .cursorNotAllowed tr:hover>th {
	cursor: not-allowed !important;
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

.aui .modal-body .form-horizontal .form-group {
	margin-left: 0px;
	margin-right: 0px;
	margin-bottom: 10px;
}

.aui .form-horizontal .checkbox, .aui .form-horizontal .checkbox-inline,
	.aui .form-horizontal .radio, .aui .form-horizontal .radio-inline {
	margin-bottom: 0;
	margin-top: 0;
	padding-top: 0px;
}

#ui-datepicker-div, .ui-datepicker {
	z-index: 99999 !important;
}

/* new */
.aui .modal-header .close {
	font-size: 1.4em !important;
	margin-top: 4px !important;
	padding-top: 5px !important;
}

.aui #bonus_appraisal_list_content {
	display: none;
}

.aui .form-group {
	margin-bottom: 5px;
}

.aui .control-label {
	cursor: default;
}

.ibox-title {
	padding: 1px 10px;
}

.ibox-content {
	background-color: #fff;
	border: 1px solid #ffe57f;
	color: inherit;
	margin-bottom: 5px;
	padding-left: 5px;
	padding-right: 5px;
}

.aui h5 {
	margin: 7px 0;
}

.gray-bg {
	background-color: #f3f3f4;
}

#objectCenter {
	text-align: center;
}

.aui .modal {
	top: 2%;
}
/* Large desktop */
@media ( min-width : 1200px) {
	#confrimModal {
		left: 51%;
	}
	.modal.large {
		width: 90%;
		margin-left: -45%;
		top: 0px;
	}
}

/* Portrait tablet to landscape and desktop */
@media ( min-width : 980px) and (max-width: 1199px) {
	#confrimModal {
		left: 57%;
	}
	.modal.large {
		width: 90%;
		margin-left: -45%;
		top: 0px;
	}
}

@media ( min-width : 768px) and (max-width: 979px) {
	#tableBonusAppraisal {
		left: 2%;
		right: 2%;
	}
	.modal.large {
		width: 90%;
		margin-left: -45%;
		top: 0px;
	}
	#confrimModal {
		left: 58.5%;
	}
	.aui [class*="span"], .aui .uneditable-input[class*="span"], .aui .row-fluid [class*="span"]
		{
		display: block;
		float: none;
		width: 100%;
		margin-left: 0;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.aui .section-parent {
		margin-top: 15px;
	}
	.aui .answer-type {
		margin-top: 15px;
	}
}

/* Landscape phone to portrait tablet */
@media ( max-width : 767px) {
	#confrimModal {
		left: 23.5%;
	}
	.modal.large {
		width: '';
		top: 0px;
	}
	@media ( min-width : 481px) and (max-width: 615px) {
	}
	.aui .section-parent {
		margin-top: 15px;
	}
	.aui .answer-type {
		margin-top: 15px;
	}
}

/* Landscape phones and down */
@media ( max-width : 480px) {
	.aui #confrimModalCdsResult, .aui  #confrimModal {
		left: 1%;
	}
	.aui .section-parent {
		margin-top: 15px;
	}
	.aui .answer-type {
		margin-top: 15px;
	}
}


 #tableBonusAppraisal tbody tr td .input-xs{ 
 	line-height: 10px; height: 5px; font-size: 10px; width: 100px; text-align: right; 
 } 

.aui #tableBonusAppraisal .float-label-control { position: relative; margin-bottom: 0 px;font-size: smaller; }
   /* .aui #tableBonusAppraisal .float-label-control ::-webkit-input-placeholder { color: transparent; }
    .aui #tableBonusAppraisal .float-label-control :-moz-placeholder { color: transparent; }
    .aui #tableBonusAppraisal .float-label-control ::-moz-placeholder { color: transparent; }
    .aui #tableBonusAppraisal .float-label-control :-ms-input-placeholder { color: transparent; }*/
    .aui #tableBonusAppraisal .float-label-control input:-webkit-autofill,
    .aui #tableBonusAppraisal .float-label-control textarea:-webkit-autofill { background-color: transparent !important; -webkit-box-shadow: 0 0 0 1000px white inset !important; -moz-box-shadow: 0 0 0 1000px white inset !important; box-shadow: 0 0 0 1000px white inset !important; }
    .aui #tableBonusAppraisal .float-label-control input, .aui #tableBonusAppraisal .float-label-control textarea, .aui #tableBonusAppraisal .float-label-control label { font-size: 1.3em; box-shadow: none; -webkit-box-shadow: none; }
        .aui #tableBonusAppraisal .float-label-control input:focus,
        .aui #tableBonusAppraisal .float-label-control textarea:focus { box-shadow: none; -webkit-box-shadow: none ; border-bottom-width: 3px !important;; padding-bottom: 0 !important;; border-color:#673ab7 !important; }
        .aui #tableBonusAppraisal .float-label-control textarea:focus { padding-bottom: 4px; }
    .aui #tableBonusAppraisal .float-label-control input, .aui #tableBonusAppraisal .float-label-control textarea { display: block; width: 100%; padding: 0.1em 0em 1px 0em; border: none; border-radius: 0px; border-bottom: 1px solid #aaa !important; outline: none; margin: 0px; background: none; }
    .aui #tableBonusAppraisal .float-label-control textarea { padding: 0.1em 0em 5px 0em; }
    .aui #tableBonusAppraisal .float-label-control label { position: absolute; font-weight: normal; /*top: -1.0em;*/top: 1.9em;  left: 0.08em; color: #aaaaaa !important; z-index: -1; font-size: 0.85em; -moz-animation: float-labels 300ms none ease-out; -webkit-animation: float-labels 300ms none ease-out; -o-animation: float-labels 300ms none ease-out; -ms-animation: float-labels 300ms none ease-out; -khtml-animation: float-labels 300ms none ease-out; animation: float-labels 300ms none ease-out; /* There is a bug sometimes pausing the animation. This avoids that.*/ animation-play-state: running !important; -webkit-animation-play-state: running !important; }
    .aui #tableBonusAppraisal .float-label-control input.empty + label,
    .aui #tableBonusAppraisal .float-label-control textarea.empty + label { top: 0.1em; font-size: 1.5em; animation: none; -webkit-animation: none; }
    .aui #tableBonusAppraisal .float-label-control input:not(.empty) + label,
    .aui #tableBonusAppraisal .float-label-control textarea:not(.empty) + label { z-index: 1; }
    .aui #tableBonusAppraisal .float-label-control input:not(.empty):focus + label,
    .aui #tableBonusAppraisal .float-label-control textarea:not(.empty):focus + label { color: #aaaaaa !important; }
    .aui #tableBonusAppraisal .float-label-control.label-bottom label { -moz-animation: float-labels-bottom 300ms none ease-out; -webkit-animation: float-labels-bottom 300ms none ease-out; -o-animation: float-labels-bottom 300ms none ease-out; -ms-animation: float-labels-bottom 300ms none ease-out; -khtml-animation: float-labels-bottom 300ms none ease-out; animation: float-labels-bottom 300ms none ease-out; }
    .aui #tableBonusAppraisal .float-label-control.label-bottom input:not(.empty) + label,
    .aui #tableBonusAppraisal .float-label-control.label-bottom textarea:not(.empty) + label { top: 3em; }
	
	.aui #tableBonusAppraisal .float-label-control input{font-size: 12px;text-align: right;}

@keyframes float-labels {
    0% { opacity: 1; color: #aaa; top: 0.1em; font-size: 1.5em; }
    20% { font-size: 1.5em; opacity: 0; }
    30% { top: 0.1em; }
    50% { opacity: 0; font-size: 0.85em; }
    100% { top: -1em; opacity: 1; }
}

@-webkit-keyframes float-labels {
    0% { opacity: 1; color: #aaa; top: 0.1em; font-size: 1.5em; }
    20% { font-size: 1.5em; opacity: 0; }
    30% { top: 0.1em; }
    50% { opacity: 0; font-size: 0.85em; }
    100% { top: -1em; opacity: 1; }
}

@keyframes float-labels-bottom {
    0% { opacity: 1; color: #aaa; top: 0.1em; font-size: 1.5em; }
    20% { font-size: 1.5em; opacity: 0; }
    30% { top: 0.1em; }
    50% { opacity: 0; font-size: 0.85em; }
    100% { top: 3em; opacity: 1; }
}

@-webkit-keyframes float-labels-bottom {
    0% { opacity: 1; color: #aaa; top: 0.1em; font-size: 1.5em; }
    20% { font-size: 1.5em; opacity: 0; }
    30% { top: 0.1em; }
    50% { opacity: 0; font-size: 0.85em; }
    100% { top: 3em; opacity: 1; }
}
#tableBonusAppraisal thead tr th {
	white-space: nowrap;
	text-align: center;
	vertical-align: middle;
	font-size: 14 px;
}
.font-bold {
    font-weight: bold;
}


.aui .list-data-table .table-bordered th{
/* 	background-color: #666666 !important; */
/* 	color: #ffffff; */
/* 	vertical-align: top; */
	font-weight: 700;
/* 	text-align: center; */
}
.aui .list-data-table .table-bordered td{
	vertical-align: top;
/* 	text-align: center; */
	font-size: 12px;
/* 	background-color: #fcfcfc; */
	border-top: 1px solid #ddd;
	line-height: 16px;
	padding: 5px;

}
.aui .list-data-table .table-bordered td .btn-gear{
	width: 100%;
}
.aui .inputNetSalary{text-align: right;}
.aui #confrimModal .form-horizontal .control-label{ width: 250px;}
.aui #confrimModal .form-horizontal .controls{ margin-left: 250px;}
.aui #btnConfirmOK , .aui #btnConfirmNO{width: 122px;}

.row-darker > td{
	background-color: #f2f2f2 !important;
}

.aui .table td {
    background-color: #ffffff;
}

</style>
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

		<div class="col-lg-12" style="padding-left: 0px; padding-right: 0px;">
			<div class="ibox float-e-margins">
				<div class="ibox-title">
					<h5><liferay-ui:message key="advanced-search"/></h5>
				</div>

				<div class="ibox-content breadcrumbs2">
					<div class="row-fluid p-t-xxs">
						<div class="form-inline">
							<div class="form-group pull-left span3" style="margin-left: 5px">
								<select data-toggle="tooltip" title="<liferay-ui:message key="year"/>"
									class="input span12 m-b-n" id="search_year" name="search_year"><option
										selected value=""><liferay-ui:message key="year"/></option></select>
							</div>
							<div class="form-group pull-left span3" style="margin-left: 5px">
								<select data-toggle="tooltip" title="<liferay-ui:message key="bonus-period"/>"
									class="input span12 m-b-n" id="search_bonus_period_id"
									name="search_bonus_period_id"><option selected
										value=""></option></select>
							</div>

							<div class="form-group pull-right m-b-none p-b-xxs">
								<div class="form-group pull-right m-b-none ">
									<button type="button" name="btn_search_recalculate" onclick="getDataReCalculateFn()"
										id="btn_search_recalculate" class="btn btn-warning input-sm "
										style="margin-left: 5px;" disabled="disabled">
										<i class="fa fa-calculator"></i>&nbsp;<liferay-ui:message key="pre-calculate"/>
									</button>
								</div>
								<div class="form-group pull-right m-b-none ">
									<button type="button" name="btn_search_advance"
										id="btn_search_advance" class="btn btn-info input-sm "
										style="margin-left: 5px;">
										<i class="fa fa-search"></i>&nbsp;<liferay-ui:message key="search"/>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- content end -->
			</div>

		</div>

	</div>
	<!-- end--row-fluid -->



	<div class="row-fluid " id="bonus_appraisal_list_content">
		<div class="col-lg-12" style="padding-left: 0px; padding-right: 0px;">
			<div class="ibox-title">
				<h5><liferay-ui:message key="bonus-appraisal-list"/></h5>
			</div>


			<div class="ibox-content">
			
				<!-- pagination start -->
							<div class="row-fluid">
								<div id="width-100-persen" class="span9 m-b-xs">
									
									<span class="pagination_top m-b-none pagination"></span>

								</div>
								<div class="span3 object-right ResultsPerPageTop">
		                                    
			                                    <div class='pagingDropdown'>
		                                 			<select  id='countPaginationTop'  class="form-control input-sm countPagination">
					                                     <option>10</option>
					                                     <option>20</option>
					                                     <option>50</option>
					                                     <option>100</option>
					                                 </select>
		                                 		
		                                 		</div>
												<div class='pagingText'>Results per page</div>
		                                    
		                          </div>
							</div>
							<!-- pagination end -->
				<!-- start table -->
				<div class="row-fluid list-data-table" style="overflow: auto;">
					<table class="table table-bordered" id="tableBonusAppraisal"
						style="max-width: none; min-width: 800;margin-bottom: 0px;">
						<thead>
							<tr>
								<th rowspan="2" style="width: 10%; min-width: 100px;"><liferay-ui:message key="level"/></th>
								<th rowspan="2" style="width: 26%; min-width: 150px;"><liferay-ui:message key="org-name"/></th>
								<th colspan="5" style="width: 34%;"><liferay-ui:message key="organization-evaluation"/></th>
								<th colspan="3" style="width: 30%;"><liferay-ui:message key="manager-evaluation"/></th>
							</tr>
							<tr>
								<th style="width: 7%; min-width: 60px;"><liferay-ui:message key="avg-score"/></th>
								<th style="width: 7%; min-width: 60px;"><liferay-ui:message key="adjust-score"/></th>
								<th style="width: 7%; min-width: 80px;"><liferay-ui:message key="net-salary"/></th>
								<th style="width: 8%; min-width: 90px;"><liferay-ui:message key="weight"/></th>
								<th style="width: 5%; min-width: 40px;">%</th>
								<th style="width: 14%; min-width: 120px;"><liferay-ui:message key="emp-name"/></th>
								<th style="width: 8%;min-width: 60px;"><liferay-ui:message key="emp-result-score"/></th>
								<th style="width: 8%; min-width: 60px;"><liferay-ui:message key="adjust-score"/></th>
							</tr>
						</thead>
						<tbody id="listBonusAppraisal">
							
						</tbody>
					</table>
				</div>
							<!-- pagination start -->
							
							<div class="row-fluid">
								<div id="width-100-persen" class="span9 m-b-xs ">

									<span class="pagination_bottom m-b-none pagination"></span>

								</div>
								<div class="span3 object-right ResultsPerPageBottom">
		                                    
		                                    	<div class='pagingDropdown'>
		                                 			<select  id='countPaginationBottom'  class="form-control input-sm countPagination">
					                                     <option>10</option>
					                                     <option>20</option>
					                                     <option>50</option>
					                                     <option>100</option>
					                                 </select> 
			                                 	</div>
												<div class='pagingText'>Results per page</div>
		                        </div>
							</div>
							<!-- pagination end -->
							
				<div class="row-fluid p-t-xxs">
					<div class="form-inline">

						<div class="form-group pull-right m-b-none p-b-xxs">
							<button type="button" class="btn btn-info input-sm"
								name="btn_save_bonus_appraisal" id="btn_save_bonus_appraisal"
								style="margin-left: 5px" disabled="disabled">
								&nbsp;<liferay-ui:message key="save"/>
							</button>
							
							<button type="button" class="btn btn-danger input-sm"
								name="btn_cancel_bonus_appraisal"
								id="btn_cancel_bonus_appraisal" style="margin-left: 5px" disabled="disabled">
								&nbsp;<liferay-ui:message key="cancel"/>
							</button>
						</div>
					</div>
				</div>

				<!-- end table -->


			</div>
			<!-- content end -->
		</div>
	</div>

</div>



<input type="hidden" name="id" id="id" value="">
<input type="hidden" name="action" id="action" value="add">

<!-- Modal Confirm Start -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="confrimModal"
	class="modal inmodal in"
	style="width: 400px; left: calc; display: none;">
	<div class="modal-dialog">
		<div class="modal-content  bounceInRight">
			<div class="modal-header">
				<button data-dismiss="modal" class="close" type="button"
					style="padding-top: 5px">
					<span aria-hidden="true"><i class='fa fa-times'></i></span>
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

						<label>คุณต้องการให้ระบบคำนวณเงินรางวัลพิเศษเลยหรือไม่ ?</label>
						<div class="row-fluid">
							<div class="form-inline" style="text-align: left;">
								<div class="form-group pull-left span12" style="text-align: center;" >
									<label style="">จำนวนเดือนที่จ่ายเงินรางวัลพิเศษ:&nbsp;&nbsp;</label>
									<input type="text" class="form-control input-sm"
										placeholder="" id="from_monthly_bonus_rate"
										style="margin-top: 7px; width: 40px;">
								</div>
							</div>
						</div>
						<div id="inform_on_confirm" class='information'></div>
					</div>
				</div>

				<!-- form start -->
				<!-- content end -->
			</div>
			<div class="modal-footer">
				<div align="center">
					<button class="btn btn-success" id="btnConfirmOK" type="button">
						&nbsp;&nbsp;<i class="fa fa-check-circle"></i>&nbsp;&nbsp;<liferay-ui:message key="calculate"/>&nbsp;&nbsp;
					</button>
					&nbsp;&nbsp;
					<button data-dismiss="modal" class="btn btn-danger" id="btnConfirmNO" type="button">
						<i class="fa fa-times-circle"></i>&nbsp;&nbsp;<liferay-ui:message key="cancel"/>&nbsp;&nbsp;
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- Modal Confirm End -->

	<!-- Language Template for js -->
	<%@ include file="/html/language-js-template/view.jsp" %>

