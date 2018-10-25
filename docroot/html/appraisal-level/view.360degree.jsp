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
%>

<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">
<input type="hidden" id="plid_portlet" name="plid_portlet" value="<%= plid %>">

<div class=''>	
	<div id="mainContent">
	</div>
</div>

<style>
.popover {
	width: 210px;
}
.aui .table thead th {
    font-size: 13px;
    font-weight: normal;
}
.not-active {
  pointer-events: none;
  cursor: default;
  text-decoration: none;
  color: gray !important;
}
</style>

<!-- Modal Import Appraisal Criteria -->
<div aria-hidden="true" role="dialog" id="addModalCriteria"
	class="modal inmodal" style="display: none;">
	<div class="modal-dialog">
		<div class="modal-content bounceInRight">
			
			<div class="modal-header">
				<button data-dismiss="modal" class="close" type="button" style="padding-top: 5px">
					<span aria-hidden="true">×</span><span class="sr-only" style="display: none;"></span>
				</button>
				<h4 class="modal-title" id="">Appraisal Criteria</h4>
			</div>
			
			<div class="modal-body">
				<div class="form-inline p-b-xs" id="">
					<div class="">
						<div class="form-group m-n">
							<label class="form-label-emp">Appraisal Level : </label>&nbsp;
							<label id="ac_appraisal_level_name" class="form-label-emp"></label>&nbsp;
						</div>
						<div class="form-group m-n">
							<label class="form-label-emp">Appraisal Form : </label>&nbsp;
							<!-- <label id="ac_appraisal_level_name" class="form-label-emp"></label>&nbsp; -->
							<select id="ac_appraisal_form" class="form-label-emp" onchange="AppraisalFormChange(this.value)">
							</select>
						</div>
					</div>
				</div>

				<div>
					<div class="table-responsive">
						<table class="table table-striped" id="formTableRole">
							<thead>
								<tr>
									<th style='width:10%;'>Select</th>
									<th style='width:65%'><b>Structure&nbsp;Name</b></th>
									<th style='width:15%; text-align: center;'><b>%</b></th>
								</tr>
							</thead>
							<tbody id="formListAppraisalCriteria">

							</tbody>
						</table>
					</div>

					<!-- end table -->



				</div>
				<!-- form End -->
				<!-- content end -->
			</div>
			<div class="modal-footer">				
				<button class="btn btn-primary btnCriteriaSubmit" type="button" value="close">Save</button>
				<button class="btn btn-primary btnCriteriaSubmit" type="button" value="freeze">Save & Add Another</button>
				<button id="btnCriteriaClose" data-dismiss="modal" class="btn btn-danger btnCancle" type="button">Cancel</button>
			</div>
			<div class="alert alert-warning information" id="information2"
				style="display: none;"></div>
		</div>
	</div>
</div>
<!-- Modal End Appraisal Criteria -->


<!-- Modal Import Set Weight -->
<div aria-hidden="true" role="dialog"
	id="addModalCriteriaSetWeightModal" class="modal inmodal"
	style="display: none;">
	<div class="modal-dialog">
		<div class="modal-content bounceInRight">
			<div class="modal-header">
				<button data-dismiss="modal" class="close setWeightCloseModal"
					type="button" style="padding-top: 5px">
					<i class="fa fa-times" aria-hidden="true"></i><span class="sr-only"
						style="display: none;"></span>
				</button>
				<!-- <i class="fa fa-laptop modal-icon"></i> -->
				<h4 class="modal-title" id="">360 Degree Weighting</h4>
			</div>
			<div class="modal-body">
				<!-- content start -->
				<!-- form start -->
				<div class="form-inline p-b-xs" id="">
					<div class="">
						<div class="form-group m-n ">
							<label class="form-label-emp" id="ac_Structure_name"> </label>
						</div>

					</div>
				</div>
				<div>
					<!-- start table -->
					<div class="table-responsive">
						<table class="table table-striped" id="formTableRole">
							<thead>
								<tr>
									<th style='width: 10%;'>Select</th>
									<th style='width: 35%'><b>Group</b></th>
									<th style='width: 10%; text-align: center;'><b>%</b></th>
								</tr>
							</thead>
							<tbody id="formListCriteriaSetWeight">

							</tbody>
						</table>
					</div>
					<!-- content end -->
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-success" type="button" id="btnSetweightSubmit">Save</button>
				<button data-dismiss="modal" class="btn btn-danger btnCancle setWeightCloseModal" type="button">Cancel</button>
			</div>
			<div class="alert alert-warning information" id="information3" style="display: none;"></div>
		</div>
	</div>
</div>
<!-- Modal END Set Weight -->
