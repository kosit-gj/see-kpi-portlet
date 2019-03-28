<%@ page import="com.liferay.portal.kernel.util.WebKeys" %>
<%@ page import="javax.portlet.*"%>
<%@ page contentType="text/html; charset=UTF-8" %>

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

<style>
.titlePanel {
    font-size: 14px;
    font-weight: bold;
    margin-right: 5px;
    padding-top: 0;
}
.form-label-customs {
    float: left;
    padding-right: 5px;
    padding-top: 1px;
    text-align: right;
    width: 150px;
}
#advanceSearchArea{
	display:none;
}
.resultArea{
display:none;
}
.inputFormSearch{
	 padding-right: 0;
}
.ibox-content {
    background-color: #fff;
    border: 1px solid #ffe57f;
    color: inherit;
    margin-bottom: 5px;
    padding-left: 15px;
    padding-right: 15px;
}

.modal-backdrop, .modal-backdrop.fade.in {
    background-color: #000 !important;
    }

#btnAdd{
margin-bottom:5px
}
.aui select {
    line-height: 0px;
}
.pagingText{
 	/*display:none;*/
 	}
 	#btnPaginationTop{
 		width:300px;
 		float:left;
 	}
	
	#btnPaginationBottom{
 		width:300px;
 		float:left;
 	}
	
	.pagingText{
	padding-top: 5px;
	}
	.aui .pagination ul{
	margin: 0
	}
	
	.aui form {
    margin: 0;
}
.aui .table td{
	padding-top:5px;
	padding-bottom:5px;
}

#countPaginationTop{
	width:60px;
}
#countPaginationBottom{
	width:60px;
}

.aui #breadcrumbs {
    margin-bottom: 0px;
}

.aui .breadcrumb {
    background-color: #f5f5f5;
    border-radius: 2px;
    list-style: outside none none;
    margin: 0 0 0px;
    padding: 0px 15px;
}
.aui #file{
	width: 100%;
	height: 100%;
}
.aui .portlet-content, .aui .portlet-minimized .portlet-content-container {
    -moz-border-bottom-colors: none;
    -moz-border-left-colors: none;
    -moz-border-right-colors: none;
    -moz-border-top-colors: none;
    border-color: #eaeaea;
    border-image: none;
    border-style: solid;
    border-width: 0 1px 1px;
    padding: 10px 5px 5px;
}

.aui .portlet-content, .aui .portlet-minimized .portlet-content-container {
  background-color: #fafafa;
}

.aui .form-group {
    margin-bottom: 7px;
}


/* Css by Au Start */
.aui .modal-header .close{
	font-size: 1.4em !important;
    margin-top: 4px !important;
    padding-top: 5px !important;
}
.gray-bg {
	background-color: #f3f3f4;
}
.ibox-title{
	padding: 1px 10px;
}
.titlePanel {
	margin: 7px 0;
}
.form-group {
    margin-bottom: 10px;
}
.control-label{
	cursor: default;
}

.aui .ibox-title .control-label{
	text-align: right;
}

form {
    margin: 0 0 0;
}
.countPagination {
    width: 70px;

}
.aui .popover-content {
    padding: 5px 5px 5px 5px;
}



.aui .modal.fade.in{top:3%;}
#confrimModal{width: 400px;}

.aui .modal-footer{
	border-radius: 0;
}
.form_list_content{
	display: none;
}

/* Large desktop */

@media ( min-width : 1200px) {
	#confrimModal {
			left: 56%;
		}
}

/* Portrait tablet to landscape and desktop */
@media ( min-width : 980px) and (max-width: 1199px) {
	#confrimModal {
		left: 57%;
	}
	
}
@media ( min-width : 768px) and (max-width: 979px) {
	#confrimModal {
		left: 58.5%;
	}
	
}

/* Landscape phone to portrait tablet */
@media ( max-width : 767px) {
	#confrimModal {
		left: 23.5%;
	}
	
}		
@media ( min-width : 481px) and (max-width: 615px) {
	#confrimModal {
			left: 16.5%;
		}
	.redFont{
		float:right;
	}
	
	
}

/* Landscape phones and down */
@media ( max-width : 480px) {
	#confrimModal {
		left: 1%;
	}
	.redFont{
		float:left;
	}
	.aui .ibox-title .control-label{
		text-align: left;
	}
}
@media ( min-width : 0px) and (max-width: 468px) {
		
		
}
.aui .btn {
	font-size: 14px;
 	padding: 4px 12px; 
	width: auto;
	margin-top: 0px;
	display: inline;
}
.aui select, .aui textarea, .aui input[type="text"], .aui input[type="password"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="date"], .aui input[type="month"], .aui input[type="time"], .aui input[type="week"], .aui input[type="number"], .aui input[type="email"], .aui input[type="url"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="color"], .aui .uneditable-input {
    height: 30px;
    padding: none;
    font-size: 14px;
}
.popover {
	width: 135px;
}
/* Css by Au End1 */
</style>


<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">
<input type="hidden" id="plid_portlet" name="plid_portlet" value="<%= plid %>">

<div class='row-fluid'>
	<div class='col-xs-12'>
		<div id="slide_status" class="span12" style="z-index: 9000;">
			<div id="btnCloseSlide"><i class='fa fa-times'></i></div>
			<div id="slide_status_area"></div>
		</div>
	</div>
</div>

<div class="row-fluid form_list_content" >
	<div class="span12">
	
		<div class="ibox-title">
			<div id="titlePanel" class="titlePanel">Appraisal Form List</div>
		</div>
		
		<div class="ibox-content"> 
			<div class="row-fluid ">
				<div class="spen9">
					<button type="button" class="btn btn-success" id="btnAdd" data-target="#saveFormModal" data-toggle="modal" data-backdrop="static" data-keyboard="false" ><i class="fa fa-plus-square"></i>&nbsp;Add&nbsp;<span id="btnAddData">Appraisal Form</span></button>
				</div>
			</div>

			<div class="table-responsive" id="tableArea" style="overflow: auto;">
				<table class="table table-striped" id="table-appraisalForm"
					style="max-width: none;">
					<thead>
						<tr>
							<th style="width: auto; vertical-align: middle; white-space: nowrap;"><b>Appraisal Form Name</b></th>
							<th style="width: 10%; text-align: center; vertical-align: middle;"><b>IsBonus</b></th>			
							<th style="width: 10%; text-align: center; vertical-align: middle;"><b>IsRaise</b></th>
							<th style="width: 10%; text-align: center; vertical-align: middle;"><b>IsJobEvaluation</b></th>
							<th style="width: 10%; text-align: center; vertical-align: middle;"><b>IsMPI</b></th>
							<th style="width: 10%; text-align: center; vertical-align: middle;"><b>IsActive</b></th>
							<th style="text-align: center; vertical-align: middle;"><b>Manage</b></th>
						</tr>
					</thead>
					<tbody id="listData">
						<!-- Generate by getAllFormFn() -->
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
<input type="hidden" name="id" id="id" value="">
<input type="hidden" name="action" id="action" value="add">


<!-- Modal Add/Edit -->
<!-- <div role="dialog" id="saveFormModal" class="modal inmodal" style="display: none;"> -->
<div class="modal fade" id="saveFormModal" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content bounceInRight">
			
			<div class="modal-header">
				<button data-dismiss="modal" class="close setWeightCloseModal" type="button" style="padding-top: 5px">
					<i class="fa fa-times" aria-hidden="true"></i><span class="sr-only" style="display: none;"></span>
				</button>
				<h4 class="modal-title">Appraisal Form</h4>
			</div>
			
			<div class="modal-body">
				<div class="row-fluid"> 
					<div class="span12 form-horizontal p-t-xxs">
						<div class="form-group p-xxs" id="form-group-appraisal_form_name">
							<label class="control-label"> Appraisal Form Name <span class="redFont">*</span> </label>
							<div class="controls">
								<input style="width: 250px" class="span12 m-b-n" placeholder="Appraisal Form Name" id="appraisal_form_name" name="appraisal_form_name" value="" type="text"/>
							</div>
						</div>
						<div class="form-group p-xxs" id="form-group-is_bonus">
							<label class="control-label"> IsBonus </label>
							<div class="controls">
								<input checked="" class="checkbox" placeholder="Is Bonus" id="is_bonus" name="is_bonus" type="checkbox">
							</div>
						</div>	
						<div class="form-group p-xxs" id="form-group-is_raise">
							<label class="control-label"> IsRaise </label>
							<div class="controls">
								<input checked="" class="checkbox" placeholder="Is Salary" id="is_raise" name="is_raise" type="checkbox">
							</div>
						</div>
						<div class="form-group p-xxs" id="form-group-is_job_evaluation">
							<label class="control-label"> IsJobEvaluation </label>
							<div class="controls">
								<input checked="" class="checkbox" placeholder="Is Job Evaluation" id="is_job_evaluation" name="is_job_evaluation" type="checkbox">
							</div>
						</div>
						<div class="form-group p-xxs" id="form-group-is_mpi">
							<label class="control-label"> IsMPI </label>
							<div class="controls">
								<input checked="" class="checkbox" placeholder="Is MPI" id="is_mpi" name="is_mpi" type="checkbox">
							</div>
						</div>
						<div class="form-group p-xxs" id="form-group-is_active">
							<label class="control-label"> IsActive </label>
							<div class="controls">
								<input checked="" class="checkbox" placeholder="Is Active" id="is_active" name="is_active" type="checkbox">
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

<!-- Modal Confirm Start -->
	<div aria-hidden="true" role="dialog" tabindex="-1" id="confrimModal"
		class="modal inmodal in" style="width:400px;left:calc;display: none;">
		<div class="modal-dialog">
			<div class="modal-content  bounceInRight">
				<div class="modal-header">
					<button data-dismiss="modal" class="close" type="button" style="padding-top:3px">
						<span aria-hidden="true"><i class='fa fa-times'></i></span>
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
					<div class="alert alert-warning information" id="information2"
						style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>
<!-- Modal Confirm End -->
		