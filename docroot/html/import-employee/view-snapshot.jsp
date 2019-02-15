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
							<div  class="form-group pull-left span2" style="margin-left: 5px">
								<select data-toggle="tooltip" title="Organization"
									class="input span12 m-b-n" id="search_org" name="search_org"><option
										selected value="">All Organization</option></select>
							</div>
	
							<div id="drop_down_level" class="form-group pull-left span2"
								style="margin-left: 5px">
								<select data-toggle="tooltip" title="Level"
									class="input span12 m-b-n" id="search_level" name="search_level">
									<option selected value="">All Level</option>
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
	
							<div class="form-group pull-left span3" style="margin-left: 5px">
								<input data-toggle="tooltip" title="Employee Name"
									class="span12 m-b-n ui-autocomplete-input"
									style="margin-bottom: 10px;" id="search_emp_name"
									data-placement="top" name="search_emp_name" type="text"
									placeholder="Employee Name"> <input
									class="form-control input-sm" id="search_emp_id"
									name="search_emp_id" value="" type="hidden">
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
						<div class="row-fluid ">
         					<div class="spen12">
			                 <span id="btnAdvanceDownloadOption"><form id="formExportToExcel" action="" method="post" class="" style="display: inline-flex; margin-bottom: 5px; position: relative; top: -1px;">	<button id="exportToExcel" class="btn btn-warning btn-sm" type="submit">		<i class="fa fa-download"></i> Download	</button></form></span>
			                  <span id="btnAdvanceImportOption">   <button style="margin-bottom: 5px;" type="button" class="btn btn-success input-sm" name="btn_import" id="btn_import" ><i class="fa fa-upload"></i>&nbsp;Import</button></span>
                 			</div>
         				</div>
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
											<th style='width: 5%;white-space: nowrap;'>Start Date</th>
											<th style='width: 10%;white-space: nowrap;'>Emp Code</th>
											<th style='width: 20%;white-space: nowrap;'>Emp Name</th>
											<th style='max-width:138px; min-width:138px; white-space: nowrap;'>Org Name</th>
											<th style='width: 10%;white-space: nowrap;'>Position Name</th>
											<th style='width: 10%;white-space: nowrap;'>Chief Emp</th>
											<th style='width: 10%;white-space: nowrap;'>Level Code</th>
											<th style='width: 10%;white-space: nowrap;'>Job Function</th>
											<th style='width: 10%; text-align: center;'>Distributor</th>
											<th style='width: 10%; text-align: center;'>Region</th>
											<th style='width: 10%; white-space: nowrap; text-align: center;'>Is Active</th>
											<th style='width: 10%;text-align: center;' class='objectCenter'>Manage</th>
										</tr>
									</thead>
									<tbody id="listEmployee">

									</tbody>
								</table>
							</div>

							<!-- end table -->
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



	
<!-- Modal View Edit -->

	<div aria-hidden="true" role="dialog" tabindex="-1" id="ModalEditEmployee"
		class="modal inmodal" style="display: none;">
		<div class="modal-dialog">
			<div class="modal-content bounceInRight">
				<div class="modal-header">
					<button data-dismiss="modal" class="close" type="button" style="padding-top:5px">
						<span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only">Close</span>
					</button>
					<!-- <i class="fa fa-laptop modal-icon"></i> -->
					<h4 class="modal-title" id="modalTitleRole">Edit Employee</h4>
					
				</div>
				<div class="modal-body">
					<!-- content start -->
					<!-- form start -->
					<input type="text"  id="param_emp_snapshot_id" style="display:none;">
					<div class="row-fluid">
	                	<div class="span12 form-horizontal p-t-xxs">
	                		<div class="form-group p-xxs">
								<label class="control-label">Start Date:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_start_date" disabled="disabled">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label">Employee Id:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_emp_id" disabled="disabled">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label">Employee Code:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_emp_code" disabled="disabled">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label">First Name:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_first_name" >
								</div>
							</div>
								<div class="form-group p-xxs">
								<label class="control-label">LastName:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_last_name" >
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label">Email:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_email" >
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label">Org Name:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_org_name" disabled="disabled">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label">Level Name:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_level_name" disabled="disabled">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label">Position Code:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_position_code" disabled="disabled">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label">Job Function:</label>
								<div class="controls">
									<select class="form-control input-sm span12" id="from_fob_function" name="search_level"></select>
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label">Chief Emp Code:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_chief_emp_code" disabled="disabled">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label">Distributor Code:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_distributor_code">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label">Distributor Name:</label>
								<div class="controls">
									<textarea type="text" class="form-control input-sm span12" placeholder="" id="from_distributor_name" style="min-height:95px; resize: vertical;"></textarea>
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label">Region:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_region">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label">Is Active:</label>
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
				<button class="btn btn-primary" id="btnEmpSubmit" type="button">Save</button>
				<button data-dismiss="modal" class="btn btn-danger btnCancle" type="button">Cancel</button>
						<div class="alert alert-warning information" id="information"
						style="display: none;"></div>
				</div>

			</div>
		</div>
	</div>
	<!-- Modal End View -->
	
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
					<div id="userImportProgressbar" style="padding-left: 0px;padding-right: 0px;" class="progressBar"> <span id="progressText" class="progressBarText"></span> </div> 
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

<!-- Mainly scripts -->
<!-- <script type="text/javascript">var jQuery_1_1_3 = $.noConflict(true);</script> -->

