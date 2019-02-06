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
layout = themeDisplay.getLayout();
plid = layout.getPlid();

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
.ui-corner-all {
    padding: 0px !important; 
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
.aui #list_content {
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
		left: 55%;
	}
}

/* Portrait tablet to landscape and desktop */
@media ( min-width : 980px) and (max-width: 1199px) {
	.aui #confrimModal {
		left: 57%;
	}
}

@media ( min-width : 768px) and (max-width: 979px) {
	#ModalEdit {
		left: 15%;
		right: 15%;
	}
	#ModalImport {
		left: 15%;
		right: 15%;
	}
	#ModalLevel {
		left: 15%;
		right: 15%;
	}
	.aui #confrimModal {
		left: 58.5%;
	}
	.aui .ResultsPerPageTop {
		position: absolute;
		left: -20px;
		top: 95px;
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
		left: 23.5%;
	}
	.aui .ResultsPerPageTop {
		position: absolute;
		left: -20px;
		top: 95px;
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
			left: 16.5%;
		}
		.aui .ResultsPerPageTop {
			position: absolute;
			left: -20px;
			top: 95px;
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
/* 	.aui #from_emp_type {
		width: 100%;
	} */
	.aui #confrimModal {
		left: 1%;
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
<div id="container1">
    <div class='row-fluid'>
        <div class='col-xs-12'>
            <div id="slide_status" class="span12" style="z-index: 9000;">
                <div id="btnCloseSlide"><i class='fa fa-times'></i></div>
                <div id="slide_status_area"></div>
            </div>
        </div>
    </div>

    <div class="row-fluid " id="list_content">
        <div class="col-lg-12">
            <div class="ibox-title">
                <h5>Job Code List</h5>
            </div>
            <div class="ibox-content">
                <div class="row-fluid p-t-xxs">
                    <div class="form-group pull-left m-b-none ">
                        <div class="form-group pull-left m-b-none ">
                            <button id="btn_import" type="button" class="btn btn-success btn-sm " style="margin-left: 5px;">
                                <i class="fa fa-upload"></i>&nbsp;Import
                            </button>
                        </div>
                        <div class="form-group pull-left m-b-none ">
                            <form id="formExportToExcel" action="" method="POST" class="pull-left " style="margin-bottom: 0px; margin-left: 5px">
                                <button id="exportToExcel" class="btn btn-warning btn-sm" type="submit">
                                    <i class="fa fa-download"></i> Download
                                </button>
                            </form>
                        </div>
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
                            <select id='countPaginationTop' class="form-control input-sm countPagination">
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
                    <table class="table table-striped" id="tableJobCode" style="max-width: none;">
                        <thead>
                            <tr>
                                <th style='width: 10%; text-align: left;'>Job&nbsp;Code</th>
                                <th style='width: 20%; text-align: right;'>Knowledge&nbsp;Point</th>
                                <th style='width: 20%; text-align: right;'>Capability&nbsp;Point</th>
                                <th style='width: 20%; text-align: right;'>Total&nbsp;Point</th>
                                <th style='width: 20%; text-align: right;'>Baht&nbsp;Per&nbsp;Point</th>
                                <th style='width: auto;text-align: center;' class='objectCenter'>Manage</th>
                            </tr>
                        </thead>
                        <tbody id="listJobCode">

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
                            <select id='countPaginationBottom' class="form-control input-sm countPagination">
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
	
	
<!-- Modal Confirm Start -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="confrimModal" class="modal inmodal in" style="width:400px;left:calc;display: none;">
    <div class="modal-dialog">
        <div class="modal-content  bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" style="padding-top:3px">
                    <span aria-hidden="true"><i class='fa fa-times'></i></span>
                </button>
                <h5 class="modal-title">Confirm Dialog</h5>
            </div>
            <div class="modal-body">
                <div class="form-kpi-mangement">
                    <div class="form-kpi-label" align="center">

                        <label id="label-del">Confirm to Delete Data?</label>
                        <div id="inform_on_confirm" class='information'></div>
                    </div>
                </div>
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
                <div class="alert alert-warning information" id="information" style="display: none;"></div>
            </div>
        </div>
    </div>
</div>
<!-- Modal Confirm End -->


<!-- Modal Import Job Code Role -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="ModalImport" class="modal inmodal" style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content  bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" style="padding-top:5px">
                    <span aria-hidden="true"><i class='fa fa-times'></i></span>
                </button>
                <h4 class="modal-title" id="">Import Job Code</h4>
            </div>
            <div class="modal-body">
                <!-- content start -->
                <!-- form start -->
                <div class="form-group">
                    <form id="fileImportJobCode">
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
                <button class="btn btn-success" type="submit" id="importFileMobile" form="fileImportJobCode">Import</button>
                <button data-dismiss="modal" class="btn btn-danger btnCancle" type="button">Cancel</button>
                <div class="alert alert-warning information" id="informationFile" style="height:120px; overflow-y: auto; position:relative;display: none;"></div>
            </div>
        </div>
    </div>
</div>
<!-- Modal End Role -->


<!-- Modal Start Edit -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="ModalEdit" class="modal inmodal" style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" style="padding-top:5px">
                    <span aria-hidden="true"><i class='fa fa-times'></i></span>
                </button>
                <h4 class="modal-title" id="modalTitleRole">Edit</h4>
            </div>
            <div class="modal-body">
                <!-- content start -->
                <!-- form start -->
                <div class="row-fluid">
                    <div class="span12 form-horizontal p-t-xxs">
                     <div class="form-group p-xxs">
                            <label class="control-label">Job Code:<span class=''>&nbsp;&nbsp;</span></label>
                            <div class="controls">
                                <input disabled type="text" class="form-control input-sm span12" placeholder="" id="from_job_code">
                            </div>
                        </div>
                        <div class="form-group p-xxs">
                            <label class="control-label">Knowledge Point:<span class='redFont'>*</span></label>
                            <div class="controls">
                                <input type="text" class="form-control input-sm span12 autoNumeric" placeholder="" id="from_knowledge_point">
                            </div>
                        </div>
                          <div class="form-group p-xxs">
                            <label class="control-label">Capability Point:<span class='redFont'>*</span></label>
                            <div class="controls">
                                <input type="text" class="form-control input-sm span12 autoNumeric" placeholder="" id="from_capability_point">
                            </div>
                        </div>
                          <div class="form-group p-xxs">
                            <label class="control-label">Total Point:<span class='redFont'>*</span></label>
                            <div class="controls">
                                <input type="text" class="form-control input-sm span12 " placeholder="" id="from_total_point" disabled>
                            </div>
                        </div>
                          <div class="form-group p-xxs">
                            <label class="control-label">Baht Per Point:<span class='redFont'>*</span></label>
                            <div class="controls">
                                <input type="text" class="form-control input-sm span12 autoNumeric" placeholder="" id="from_baht_per_point">
                            </div>
                        </div>
                        <input type="text"  id="from_job_code" style="display:none">
                     </div>
                </div>
                <!-- form End -->
                <!-- content end -->
            </div>
            <div class="modal-footer">
                <button class="btn btn-success" type="button" id="btnEdit">Save</button>
                <button data-dismiss="modal" class="btn btn-danger btnCancle" type="button">Cancel</button>
                <div class="alert alert-warning information" id="information2" style="display: none;"></div>
            </div>
        </div>
    </div>
</div>
<!-- Modal End Edit -->

