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

<div class=''>	
	<div id="mainContent">
	</div>
</div>

<style>
.popover {
	width: 210px;
}
</style>

<!-- Modal Import Appraisal Criteria -->

	<div aria-hidden="true" role="dialog" tabindex="-1" id="addModalCriteria"
		class="modal inmodal" style="display: none;">
		<div class="modal-dialog">
			<div class="modal-content bounceInRight">
				<div class="modal-header">
					<button data-dismiss="modal" class="close" type="button" style="padding-top:5px">
						<span aria-hidden="true">×</span><span class="sr-only" style="display:none;"></span>
					</button>
					<!-- <i class="fa fa-laptop modal-icon"></i> -->
					<h4 class="modal-title" id="">Appraisal Criteria</h4>
					<!-- 
                <small class="font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                 -->
				</div>
				<div class="modal-body">
					<!-- content start -->


					<!-- form start -->
					<div class="form-inline p-b-xs" id="">
						<div class="">
							<div class="form-group m-n " >
								<label class="form-label-emp">Appraisal Level Name: </label>&nbsp; <label
									id="ac_appraisal_level_name" class="form-label-emp"> </label>&nbsp;
							</div>

						</div>
					</div>

					<div>
						<!-- start table -->
						<div class="table-responsive">
							<table class="table table-striped" id="formTableRole">
								<thead>
									<tr>
 										 <th style='width: 10%; '>Select</th> 
										<th style='width: 65%'><b>Structure&nbsp;Name</b></th>
										<th style='width: 15%;text-align: center;'><b>%</b></th>
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
				
					<input type='hidden' id='crierai_id' name='crierai_id'>
					<button class="btn btn-success" type="button" id="btnCriteriaSubmit">Save</button>
					<button data-dismiss="modal" class="btn btn-danger btnCancle"
						type="button">Cancel</button></div>
				<div class="alert alert-warning information" id="information2" style="display: none;"></div>
				</div>
			</div>
		</div>

	<!-- Modal End Appraisal Criteria -->
		