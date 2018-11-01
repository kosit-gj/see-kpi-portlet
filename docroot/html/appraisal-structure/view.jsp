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

<div>	
	<div id="mainContent"> 
		<!-- Generate by Controller -->
	</div>
</div>


<!-- Modal Add/Edit -->
<!-- <div role="dialog" id="saveStructureModal" class="modal inmodal" style="display: none;"> -->
<div class="modal fade" id="saveStructureModal" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content bounceInRight">
			
			<div class="modal-header">
				<button data-dismiss="modal" class="close setWeightCloseModal" type="button" style="padding-top: 5px">
					<i class="fa fa-times" aria-hidden="true"></i><span class="sr-only" style="display: none;"></span>
				</button>
				<h4 class="modal-title">Appraisal Structure</h4>
			</div>
			
			<div class="modal-body">
				<div class="row-fluid"> 
					<div class="span12 form-horizontal p-t-xxs">
						<div class="form-group p-xxs" id="form-group-seq_no">
							<label class="control-label">Seq <span class="redFont">*</span> </label>
							<div class="controls">
								<input style="width:250px" class="span12 m-b-n numberOnly" placeholder="Seq" id="seq_no" name="seq_no" value="" maxlength="14" type="text"/>
							</div>
						</div>
						<div class="form-group p-xxs" id="form-group-structure_name">
							<label class="control-label"> Structure Name <span class="redFont">*</span> </label>
							<div class="controls">
								<input style="width: 250px" class="span12 m-b-n" placeholder="Structure Name" id="structure_name" name="structure_name" value="" type="text"/>
							</div>
						</div>
						<div class="form-group p-xxs" id="form-group-nof_target_score">
							<label class="control-label"> #Target Score <span class="redFont">*</span> </label>
							<div class="controls">
								<input style="width: 250px" class="span12 m-b-n numberOnly" placeholder="Target Score" id="nof_target_score" name="nof_target_score" value="0" maxlength="14" type="text"/>
							</div>
						</div>
						<div class="form-group p-xxs" id="form-group-form_id">
							<label class="control-label"> Form Type </label>
							<div class="controls"> 
								<select class="span12 m-b-n" id="form_id" name="form_id" style="width: 250px"> </select>
							</div>
						</div>
						<div class="form-group p-xxs" id="form-group-is_derive">
							<label class="control-label"> IsDerive </label>
							<div class="controls">
								<input checked="" class="checkbox" placeholder="Is Derive" id="is_derive" name="is_derive" type="checkbox">
							</div>
						</div>
						<div class="form-group p-xxs" id="form-group-level_id">
							<label class="control-label"> Level </label>
							<div class="controls">
								<select class="span12 m-b-n" id="level_id" name="level_id" style="width: 250px"> </select>
							</div>
						</div>
						<div class="form-group p-xxs" id="form-group-is_active">
							<label class="control-label"> IsActive </label>
							<div class="controls">
								<input checked="" class="checkbox" placeholder="Is Active" id="is_active" name="is_active" type="checkbox">
							</div>
						</div>
						<div id="is_unlimited_reward_header" class="form-group p-xxs" style="display: none;">
							<label class="control-label"> Unlimited Reward </label>
							<div class="controls">
								<input class="checkbox" placeholder="Unlimited Reward" id="is_unlimited_reward" name="is_unlimited_reward" type="checkbox">
							</div>
						</div>
						<div id="is_unlimited_deduction_header" class="form-group p-xxs" style="display: none;">
							<label class="control-label"> Unlimited Deduction </label>
							<div class="controls">
								<input class="checkbox" placeholder="" id="is_unlimited_deduction" name="is_unlimited_deduction" type="checkbox">
							</div>
						</div>
						<div id="is_value_get_zero_header" class="form-group p-xxs" style="display: none;">
							<label class="control-label"> Value Get Zero </label>
							<div class="controls">
								<input class="checkbox" placeholder="" id="is_value_get_zero" name="is_value_get_zero" type="checkbox">
							</div>
						</div>
						<div id="is_no_raise_value_header" class="form-group p-xxs" style="display: none;">
							<label class="control-label"> No Raise Value </label>
							<div class="controls">
								<input class="checkbox" placeholder="" id="is_no_raise_value" name="is_no_raise_value" type="checkbox">
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="modal-footer">
				<button class="btn btn-primary" type="button" id="btnSetweightSubmit">Save</button>
				<button class="btn btn-primary" type="button" id="btnSetweightSubmitAnother">Save & Add Another</button>
				<button data-dismiss="modal" class="btn btn-danger btnCancle setWeightCloseModal" type="button">Cancel</button>
			</div>
			
		
			<div class="alert alert-warning information" id="information" style="display: none;">
				<!-- System Message -->
			</div>
			
		</div>
	</div>
</div>