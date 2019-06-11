<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui"%>
<%@ page import="javax.portlet.*"%>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>
<%@ page import="com.liferay.portal.kernel.util.WebKeys" %>
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
String password = (String)request.getSession().getAttribute(WebKeys.USER_PASSWORD);
layout = themeDisplay.getLayout();
plid = layout.getPlid();
//out.print(username);
//out.print("password2="+password);

long companyID = themeDisplay.getCompanyId();
String pAuth = com.liferay.portal.security.auth.AuthTokenUtil.getToken(request);
%>
<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">
<input type="hidden" id="plid_portlet" name="plid_portlet" value="<%= plid %>">

<input type="hidden" id="companyID" name="companyID" value="<%= companyID %>">
<input type="hidden" id="pAuth" name="pAuth" value="<%= pAuth %>">


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

@media ( min-width : 1200px) {
	.aui .width-col-lg-2 {
		width: 11.66666667%;
	}
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

.aui textarea {
	max-width: 336px;
}

.aui #EmpSnap_list_content {
	display: none;
}

#btnAddCommonDataSet {
	position: relative;
	z-index: 10;
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
/* Large desktop */
@media ( min-width : 1200px) {
	#confrimModal {
		left: 55%;
	}
}

/* Portrait tablet to landscape and desktop */
@media ( min-width : 980px) and (max-width: 1199px) {
	#confrimModal {
		left: 57%;
	}
}

@media ( min-width : 768px) and (max-width: 979px) {
	#ModalCommonData {
		left: 15%;
		right: 15%;
	}
	#confrimModal {
		left: 58.5%;
	}
	.aui .ResultsPerPageTop {
		position: absolute;
		left: -20px;
		top: 78px;
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
	.aui .height-32-px {
		height: 32px
	}
	.aui .txtCountPaginationTop {
		position: absolute;
		left: -15%;
		top: 81px;
		width: 41.66666667%;
	}
	.aui .selectCountPaginationTop {
		position: absolute;
		left: 86.5%;
		top: 81px;
		width: 24%;
	}
	.aui .txtCountPaginationBottom {
		left: -12.5%;
		top: -45px;
		width: 43.96666667%;
		position: relative;
	}
	.aui .selectCountPaginationBottom {
		left: 89.1%;
		top: -75px;
		width: 25%;
		position: relative;
	}
}

/* Landscape phone to portrait tablet */
@media ( max-width : 767px) {
	#confrimModal {
		left: 23.5%;
	}
	.aui .ResultsPerPageTop {
		position: absolute;
		left: -20px;
		top: 78px;
	}
	.aui .ResultsPerPageBottom {
		position: relative;
		top: -40px;
	}
@media ( min-width : 481px) and (max-width: 615px) {
/* 		.aui #confrimModalCdsResult { */
/* 			left: 16.5%; */
/* 		} */
		.aui .height-32-px {
			height: 42px
		}

		.aui .ResultsPerPageTop {
			position: absolute;
			left: -20px;
			top: 78px;
		}
		.aui .ResultsPerPageBottom {
			position: static;
		}
		.aui #width-100-persen {
			
		}
		.aui #widthPersenTop {
			width: 10.3%;
		}
		.aui #widthPersenBottom {
			width: 11.2%;
		}
		.aui .txtcountCdsPaginationTop {
			position: absolute;
			left: -14.9%;
			top: 51px;
			width: 41.66666667%;
		}
		.aui .selectcountCdsPaginationTop {
			position: absolute;
			left: 86.5%;
			top: 51px;
			width: 24%;
		}
		.aui .txtcountCdsPaginationBottom {
			left: -11.5%;
			top: -45px;
			width: 43.96666667%;
			position: relative;
		}
		.aui .selectcountCdsPaginationBottom {
			left: 90.1%;
			top: -75px;
			width: 25%;
			position: relative;
		}
	}
	.aui #width-100-persen {
		
	}
	.aui #widthPersenTop {
		width: 10.1%;
	}
	.aui #widthPersenBottom {
		width: 11%;
	}
	.aui .height-32-px {
		height: 32px
	}
	.aui .txtCountPaginationTop {
		position: absolute;
		left: -15%;
		top: 81px;
		width: 41.66666667%;
	}
	.aui .selectCountPaginationTop {
		position: absolute;
		left: 86.5%;
		top: 81px;
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
.aui #confrimModalCdsResult {
			left: 1%;
		}
		.aui .ResultsPerPageTop {
			position: absolute;
			left: -20px;
			top: 78px;
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
		.aui .txtcountCdsPaginationTop {
			position: absolute;
			left: -25%;
			top: 40px;
			width: 41.66666667%;
		}
		.aui .selectcountCdsPaginationTop {
			position: absolute;
			left: 78.5%;
			top: 42px;
			width: 24%;
		}
		.aui .txtcountCdsPaginationBottom {
			left: -21.2%;
			top: -5px;
			width: 43.96666667%;
			position: relative;
		}
		.aui .selectcountCdsPaginationBottom {
			left: 82.9%;
			top: -34px;
			width: 25%;
			position: relative;
		}
}

.aui #list-info {
	position: absolute;
	bottom: 90px;
	left: -69px;
	z-index: 3000;
	opacity: 0;
	width: 320px;
	padding: 8px;
	background-color: #333333;
	border: 1px solid rgba(255, 255, 255, 0.9);
	-webkit-transition: opacity 0.2s ease-out, bottom 0.2s ease-out;
	-moz-transition: opacity 0.2s ease-out, bottom 0.2s ease-out;
	-o-transition: opacity 0.2s ease-out, bottom 0.2s ease-out;
	transition: opacity 0.2s ease-out, bottom 0.2s ease-out;
}
.aui #file {
	width: 100%;
	height: 100%;
}
.aui  #list-info p {
	color: #ffffff;
	font-weight: 400;
	font-size: 0.9em;
	text-align: left;
}
.testOverFlow {
  max-width: 137px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
 }
 .testOverFlow:hover {
  max-width: 138px;
     text-overflow: clip;
     white-space: normal;
     word-break: break-all;
 }
 .cbx {
  -webkit-perspective: 20;
  perspective: 20;
  position: absolute;
  top: 50%;
  left: 11px;
  margin: -12px;
  border: 2px solid #e8e8eb;
  background: #e8e8eb;
  border-radius: 4px;
  transform: translate3d(0, 0, 0);
  cursor: pointer;
  transition: all 0.3s ease;
}
.cbx:hover {
  border-color: #0b76ef;
}
.flip {
  display: block;
  transition: all 0.4s ease;
  transform-style: preserve-3d;
  position: relative;
  width: 20px;
  height: 20px;
}
#cbx_more_position ,#cbx_chief_code{
  display: none;
}
#cbx_more_position:checked + .cbx ,#cbx_chief_code:checked + .cbx  {
  border-color: #0b76ef;
}
#cbx_more_position:checked + .cbx .flip,#cbx_chief_code:checked + .cbx .flip {
  transform: rotateY(180deg);
}
.front,
.back {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 2px;
}
.front {
  background: #fff;
  z-index: 1;
}
.back {
  transform: rotateY(180deg);
  background: #0b76ef;
  text-align: center;
  color: #fff;
  line-height: 20px;
  box-shadow: 0 0 0 1px #0b76ef;
}
.back svg {
  margin-top: 3px;
  fill: none;
}
.back svg path {
  stroke: #fff;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.saveAndCancelArea{
	text-align: right;
}
.manageItemEdit{
	display: none;
}
</style>
<div id="container1" >
				<!--  nav bar -->
				<div class='row-fluid'>

					<div class='col-xs-12'>
						<div id="slide_status" class="span12" style="z-index: 9000;">
						
							<div id="btnCloseSlide"><i class='fa fa-times'></i></div>
							<div id="slide_status_area"></div>
						</div>
					</div>

				</div>


	<div class="row-fluid app_url_hidden">
		<!-- start--row-fluid -->

		<div class="col-lg-12" style="padding-left: 0px;padding-right: 0px;">
			<div class="ibox float-e-margins">
				<div class="ibox-title">
					<h5>Advance Search</h5>
				</div>

				<div class="ibox-content breadcrumbs2">
					<div class="row-fluid p-t-xxs">
						<div class="form-inline">

							<div id="drop_down_level" class="form-group pull-left span2"
								style="margin-left: 5px">
								<select data-toggle="tooltip" title="Level"
									class="input span12 m-b-n" id="search_level" name="search_level">
									<option selected value="">All Level</option>
								</select>
	
							</div>
							<div id="drop_down_level" class="form-group pull-left span2"
								style="margin-left: 5px">
								<select data-toggle="tooltip" title="Level"
									class="input span12 m-b-n" id="search_job_function" name="search_job_function">
									<option selected value="">All Job Function</option>
								</select>
	
							</div>
	
	
							<div class="form-group pull-left span2" style="margin-left: 5px">
								<input data-toggle="tooltip" title="Position Name"
									class="span12 m-b-n ui-autocomplete-input"
									style="margin-bottom: 10px;" id="search_position_name"
									data-placement="top" name="search_position_name" type="text"
									placeholder="Position Name"> <input
									class="form-control input-sm" id="search_position_id"
									name="search_customer_id" value="" type="hidden">
							</div>
	
							<div class="form-group pull-left span2" style="margin-left: 5px">
								<input data-toggle="tooltip" title="Start Date"
									class="span12 m-b-n ui-autocomplete-input"
									style="margin-bottom: 10px;" id="search_start_date"
									data-placement="top" name="search_start_date" type="text"
									placeholder="Start Date"> <input
									class="form-control input-sm" id="search_start_date_id"
									name="search_start_date_id" value="" type="hidden">
							</div>
	
							<div class="form-group pull-left span2" style="margin-left: 5px">
								<input data-toggle="tooltip" title="Employee Name"
									class="span12 m-b-n ui-autocomplete-input"
									style="margin-bottom: 10px;" id="search_emp_name"
									data-placement="top" name="search_emp_name" type="text"
									placeholder="Employee Name"> <input
									class="form-control input-sm" id="search_emp_id"
									name="search_emp_id" value="" type="hidden">
							</div>
							<div class="form-group pull-left span2" style="margin-left: 5px">
								<input data-toggle="tooltip" title="Chief Employee Name"
									class="span12 m-b-n ui-autocomplete-input"
									style="margin-bottom: 10px;" id="search_chief_emp_name"
									data-placement="top" name="search_chief_emp_name" type="text"
									placeholder="Chief Employee Name"> 
									<input
									class="form-control input-sm" id="search_chief_emp_code"
									name="search_chief_emp_code" value="" type="hidden">
							</div>

							<div style="margin-left: 5px; position: relative" class="form-group pull-left span5">
								<input id="cbx_more_position" name="cbx_more_position" type="checkbox"> 
								<label class="cbx" for="cbx_more_position">
									<div class="flip" >
										<div class="front"></div>
										<div class="back">
											<svg width="16" height="14" viewBox="0 0 16 14"> 
												<path d="M2 8.5L6 12.5L14 1.5"></path>
											</svg>
										</div>
									</div>
								</label> 
								<label class="checkbox"style="padding-left: 30px; padding-top: 5px;" for="cbx_more_position">
									More than one position at same start date
								</label>
							</div>
							<div style="margin-left: 5px; position: relative" class="form-group pull-left span5">
								<input id="cbx_chief_code" name="cbx_chief_code" type="checkbox"> 
								<label class="cbx" for="cbx_chief_code">
									<div class="flip" >
										<div class="front"></div>
										<div class="back">
											<svg width="16" height="14" viewBox="0 0 16 14"> 
												<path d="M2 8.5L6 12.5L14 1.5"></path>
											</svg>
										</div>
									</div>
								</label> 
								<label class="checkbox"style="padding-left: 30px; padding-top: 5px;" for="cbx_chief_code">
									Chief code is self employee code
								</label>
							</div>
							<div class="form-group pull-right m-b-none p-b-xxs">
								<button type="button" class="btn btn-info input-sm"
									name="btn_search_advance" id="btn_search_advance"
									style="margin-left: 5px">
									<i class="fa fa-search"></i>&nbsp;Search
								</button>
							</div>
						</div>
					</div>
				</div>
				<!-- content end -->
			</div>

		</div>

	</div>
	<!-- end--row-fluid -->



	<div class="row-fluid " id="EmpSnap_list_content">
					<div class="col-lg-12" style="padding-left: 0px;padding-right: 0px;">
						<div class="ibox-title">
							<h5>Employee List</h5>
						</div>


						<div class="ibox-content">
						<div class="row-fluid" style="margin-top:5px;margin-bottom:5px;">
						<div class=" alert alert-block" style="margin-bottom: 0px;padding: 8px 8px 4px 8px;margin-top: 0px;">
							<div class="span6">
								<span id="">   <button style="margin-bottom: 5px;" type="button" class="btn btn-success input-sm" name="btn_edit" id="btn_edit" ><i class="fa fa-pencil"></i> &nbsp;Edit</button></span>
			                 	<span id="">   <button style="margin-bottom: 5px;" type="button" class="btn btn-danger input-sm" name="btn_delete" id="btn_delete" ><i class="fa fa-trash "></i> &nbsp;Delete</button></span>
							</div>
							<div class="span6">
								<div class="saveAndCancelArea">
									
			                 		<span id="">   <button style="margin-bottom: 5px;" type="button" class="btn btn-primary input-sm" name="btn_save" id="btn_save"  disabled><i class="fa fa-floppy-o " ></i> &nbsp;Save</button></span>
			                  		<span id="">   <button style="margin-bottom: 5px;" type="button" class="btn btn-danger input-sm" name="btn_cancel" id="btn_cancel"  disabled><i class="fa fa-ban" ></i> &nbsp;Cancel</button></span>
			                 		
				
								</div>
							</div>
							<br style="clear:both">
						</div>
					</div>
						
						<div class="row-fluid pagination-display">
								<div class="height-32-px"></div>
						</div>
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
							<div class="row-fluid" style="overflow:auto;">
								<table class="table table-striped" id="tableEmployee" style="max-width: none;min-width: 800;">
									<thead>
										<tr>
											<th style='width: auto text-align:center;'><input style="margin-bottom: 3px;" type="checkbox" class="selectEmpCheckboxAll" id="" ></th>
											<th style='width: 5%;white-space: nowrap;'>Start Date</th>
											<th style='width: 10%;white-space: nowrap;'>Emp Code</th>
											<th style='width: 20%;white-space: nowrap;'>Emp Name</th>
											<th style='width: 10%;white-space: nowrap;'>Position Name</th>
											<th style='width: 10%;white-space: nowrap;'>Chief Emp</th>
											<th style='width: 10%;white-space: nowrap;'>Level Code</th>
											<th style='width: 10%;white-space: nowrap;'>Job Function</th>
											<th style='width: 10%; text-align: center;'>Distributor</th>
											<th style='width: 10%; text-align: center;'>Region</th>
											<th style='width: 10%; white-space: nowrap; text-align: center;'>Is Active</th>
										</tr>
									</thead>
									<tbody id="listEmployee">

									</tbody>
								</table>
							</div>

							<!-- end table -->
							<!-- pagination start -->
							
							<div class="row-fluid pagination-display" >
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
					
						</div>
						<!-- content end -->
					</div>
				</div>

		</div>
	
<!-- Modal Import Employee Role -->

	<div aria-hidden="true" role="dialog" tabindex="-1" id="ModalImport"
		class="modal inmodal" style="display: none;">
		<div class="modal-dialog">
			<div class="modal-content  bounceInRight">
				<div class="modal-header" >
					<button data-dismiss="modal" class="close" type="button" style="padding-top:5px">
						<span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only">Close</span>
					</button>
					<!-- <i class="fa fa-laptop modal-icon"></i> -->
					<h4 class="modal-title" id="">Import Employee</h4>
					<!-- 
                <small class="font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                 -->
				</div>
				<div class="modal-body">
					<!-- content start -->
					<!-- form start -->
					<div class="form-group">
					<form id="fileImportEmployee">
						<h4>FILE IMPORT</h4>
						<div class="fileUpload ">
							<input type="file" id="file" class="dropify" accept=".xls, .xlsx" /><span></span>
						</div>
					</form>
					</div>
					<!-- form End -->
					<!-- content end -->
				</div>
				<div class="modal-footer">
					<button class="btn btn-success" type="submit" id="importFileMobile" form="fileImportEmployee">Import</button>
					<button data-dismiss="modal" class="btn btn-danger btnCancle"
						type="button">Cancel</button>
						<div class="alert alert-warning information" id="informationFile"
						style="height:120px; overflow-y: scroll; position:relative;display: none;"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal End Role -->



	

	<!-- Modal Confirm Start -->
	<div aria-hidden="true" role="dialog" tabindex="-1" id="confrimModal"
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
					<!-- content start -->
					<!-- <h2><i class="fa fa fa-pencil-square-o icon-title"></i> ADD NEW GRADE</h2>
                <hr>
                 -->
					<!-- form start -->
					<div class="form-kpi-mangement">
						<div class="form-kpi-label" align="center">

							<label>Confirm to Delete Data?</label>
							<div id="inform_on_confirm" class='information2'></div>
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
					<div class="alert alert-warning information" id="information2"
						style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal Confirm End -->

<input type="hidden" name="id" id="id" value="">
<input type="hidden" name="action" id="action" value="add">

<!-- Mainly scripts -->
<!-- <script type="text/javascript">var jQuery_1_1_3 = $.noConflict(true);</script> -->

