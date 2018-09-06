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
%>
<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">
<input type="hidden" id="plid_portlet" name="plid_portlet" value="<%= plid %>">


<div class="container1">
				<div class='row-fluid '>

					<div class='col-xs-12'>
						<div id="slide_status" class="span12" style="z-index: 9000;">
							<div id="btnCloseSlide"><i class='fa fa-times'></i></div>
							<div id="slide_status_area"></div>
						</div>
					</div>

				</div>



				<div class="row-fluid app_url_hidden">
					<!-- start--row-fluid -->

					<div class="col-lg-12">
						<div class="ibox float-e-margins">
							<div class="ibox-title">
								<h5>Advance Search</h5>
							</div>

							<div class="ibox-content breadcrumbs2">
					<div class="row-fluid p-t-xxs">
						<div class="form-inline">
													
							<div class="form-group pull-left span2" style="margin-left: 5px;margin-bottom: 3px;">
								<select name="year" id="year"
								class="input form-control input-sm span12" title=""
								data-toggle="tooltip" style="cursor: pointer;"
								data-original-title="year">
								<!-- <option value="">All </option> -->
								</select>
								<input type='hidden' value="" id="param_year">
								
							</div>
							<div class="form-group pull-left span2" style="margin-left: 5px;margin-bottom: 3px;">
								<select name="level" id="level"
								class="input form-control input-sm span12" title=""
								data-toggle="tooltip" style="cursor: pointer;"
								data-original-title="level">
								
								<!-- <option value="">All level</option> -->
								</select>
								<input type='hidden' value="" id="param_level">
							</div>
							<div class="form-group pull-right m-b-none ">
							<button id="btn_import" type="button" class="btn btn-success btn-sm " style="margin-left: 5px;">
								<i class="fa fa-upload"></i>&nbsp;Import</button>
						    </div>
							<div class="form-group pull-right m-b-none ">
								<form id="formExportToExcel" action="" method="post"
												class="pull-right " style="margin-bottom: 0px; margin-left: 5px">
												<button id="exportToExcel" class="btn btn-warning btn-sm"
													type="submit">
													<i class="fa fa-download"></i> Download
												</button>
								</form>
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
							<!-- content end -->
						</div>

					</div>

				</div>
				<!-- end--row-fluid -->
				
				
				<div class="row-fluid" id="salary_list_content" style="display:none">
		<div class="col-lg-12">
			<div class="ibox-title">
				<h5>Position List</h5>
			</div>
		
			<div class="ibox-content">
				<div class="table-responsive" style=" padding-top: 30px;">
					<table class="table table-striped" id="tableSalaryRange" style="max-width: none;">
						<thead>
							<tr>
								<th style='width: auto'>Year&emsp;</th>
								<th style='width: auto;'>Level&emsp;</th>
								<th style='width: auto;'>Step&emsp;</th>
								<th style='width: auto;'>Salary&emsp;</th>								
								<th style='width: 10%;'>Manage</th>
							</tr>
						</thead>
						<tbody id="listSalaryRange">
	
						</tbody>
					</table>


				</div>
				

				<!-- end table -->
			</div>
			<!-- content end -->
		</div>
	</div>
</div>			
</div>
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
									<input disabled class="form-control input-sm span12" id="from_step" >
								</div>
							</div>
							<div class="form-group p-xxs" style="padding-top: 8px;">
								<label class="control-label">Salary:<span class='redFont'>*</span></label>
								<div class="controls">
									<input  title="salary" type="text" class="form-control input-sm span12" placeholder="" id="from_salary">
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