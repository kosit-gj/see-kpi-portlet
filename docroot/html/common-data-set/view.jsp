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

<style>
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
.aui .modal-header .close{
	font-size: 1.4em !important;
    margin-top: 4px !important;
    padding-top: 5px !important;
}
.aui textarea{
	max-width: 336px;
}
.aui #cds_list_content{
	display:none;
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
	@media ( min-width : 481px) and (max-width: 622px) {
		#confrimModal {
			left: 16.5%;
		}
		.aui .ResultsPerPageTop {
			position: absolute;
			left: -20px;
			top: 42px;
		}
		.aui .ResultsPerPageBottom {
			position: static;
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
	#confrimModal {
		left: 1%;
	}
	.aui .ResultsPerPageTop {
		position: absolute;
		left: -20px;
		top: 42px;
	}
	.aui .ResultsPerPageBottom {
		position: static;
	}
	.aui #width-100-persen {
		width: 110%;
	}
	.aui #widthPersenTop {
		width: 16%;
	}
	.aui #widthPersenBottom {
		width: 18%;
	}
	.aui .height-32-px {
		height: 32px
	}
	.aui .txtCountPaginationTop {
		position: absolute;
		left: -25%;
		top: 40px;
		width: 41.66666667%;
	}
	.aui .selectCountPaginationTop {
		position: absolute;
		left: 77.7%;
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
		left: 82.0%;
		top: -34px;
		width: 25%;
		position: relative;
	}
}
</style>

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
							
							<div class="form-group pull-left span6" style="margin-left: 5px">
								<input data-toggle="tooltip"  title="CDS Name"
									class="span12 m-b-n ui-autocomplete-input"
									style="margin-bottom: 10px;"  id="cds_name" data-placement="top"
									name="cds_name" type="text" placeholder="CDS Name"> <input
									class="form-control input-sm" id="cds_id" name="cds_id"
									value="" type="hidden">
							</div>
							<div class="form-group pull-left span2" style="margin-left: 5px;margin-bottom: 3px;">
								<select name="is_sql" id="is_sql"
								class="input form-control input-sm span12" title=""
								data-toggle="tooltip" style="cursor: pointer;"
								data-original-title="IsSQL">
								
								<option value="">All IsSQL</option>
								<option value="1">Yes</option>
								<option value="0">No</option>

								</select>
							</div>
<!-- 							<div class="form-group pull-right m-b-none p-b-xxs"> -->
<!-- 								data-target="#ModalCopy" data-toggle="modal" -->
<!-- 								<button id="btn_copy" type="button" -->
<!-- 									class="btn btn-primary btn-sm " style="margin-left: 5px"> -->
<!-- 									&nbsp;<i class="fa fa-copy"></i>&nbsp;Copy&nbsp;&nbsp; -->
<!-- 								</button> -->
<!-- 							</div> -->
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
				
				
				<div class="row-fluid" id="cds_list_content">
		<div class="col-lg-12">
			<div class="ibox-title">
				<h5>Common Data Set List</h5>
			</div>


			<div class="ibox-content">

				<div class="row-fluid">
					<div class="span12">
						<button type="button" class="btn btn-success" id="btnAddCommonDataSet" data-target="#ModalCommonData" data-toggle="modal" >
							<i class="fa fa-plus-square"></i>&nbsp;Add CDS
						</button>
					</div>
				</div>


				<!-- start table -->
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

				<div class="table-responsive" style="overflow:auto;">
					<table class="table table-striped" id="tableCommonDataSet">
						<thead>
							<tr>
<!-- 								<th style='width: auto text-align:center;'>Select</th> -->
								<th style='width: auto'>CDS&nbsp;Name&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
<!-- 								<th style='width: auto'>Appraisal&nbsp;Level&emsp;</th> -->
								<th style='width: auto; text-align: center;'>IsSQL&emsp;</th>
								<th style='width: auto; text-align: center;'>IsActive&emsp;</th>
								<th style='width: 10%; text-align: center;'>Manage</th>
							</tr>
						</thead>
						<tbody id="listCommonDataSet">
	
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

				<!-- end table -->
			</div>
			<!-- content end -->
		</div>
	</div>


</div>

			
</div>
	<!-- Modal Start Edit -->
	<!-- Modal Start Copy -->

	<div aria-hidden="true" role="dialog" tabindex="-1" id="ModalCopy"
		class="modal inmodal" style="display: none;">
		<div class="modal-dialog">
			<div class="modal-content bounceInRight">
				<div class="modal-header">
					<button data-dismiss="modal" class="close" type="button" style="padding-top:5px">
						<span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only">Close</span>
					</button>
					<!-- <i class="fa fa-laptop modal-icon"></i> -->
					<h4 class="modal-title" id="">Copy</h4>
					<!-- 
                <small class="font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                 -->
				</div>
				<div class="modal-body">
					<!-- content start -->
					<div class="row-fluid">
					<div class="col-lg-12">
						<div class="span12" style="padding: 0px 10px; height:65px;">
							<h1>
							<i class="fa fa fa-pencil-square-o icon-title"></i>
							<small style=" position:absolute;top:37px;left:85px">Copy to</small>
							</h1>
						</div>
					</div>
					</div>
					<hr>

					<!-- form start -->

					<div>
						<!-- start table -->
						<div class="table-responsive">
							<table class="table table-striped" id="formTableCopy">
								<thead>
									<tr>
										<th style='width: auto; '>Select</th>
										<th style='width: 80%'>Appraisal Level Name</th>
									</tr>
								</thead>
								<tbody id="formListCopy">

								</tbody>
							</table>
						</div>

						<!-- end table -->



					</div>
					<!-- form End -->
					<!-- content end -->
				</div>
				<div class="modal-footer">
					<button class="btn btn-success" type="button" id="btnCopySubmit">Save</button>
					<button data-dismiss="modal" class="btn btn-danger btnCancle"
						type="button">Cancel</button>
					<div class="alert alert-warning information" id="information3"
 						style="display: none;"></div> 
				</div>
			</div>
		</div>
	</div>
	<!-- Modal End Copy -->

  <div aria-hidden="true" role="dialog" tabindex="-1" id="ModalCommonData" class="modal inmodal" style="display: none;">
    <div class="modal-dialog">
    <div class="modal-content  bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" style="padding-top:5px"><span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only">Close</span></button>
                <!-- <i class="fa fa-laptop modal-icon"></i> -->
                <h4 class="modal-title" id="modalTitleRole">ADD Common Data Set</h4>
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
							<label class="control-label">CDS Name:<span class='redFont'>*</span></label>
								<div class="controls">
									<textarea type="text" class="form-control input-sm span12" placeholder="" id="f_cds_name"></textarea>
								</div>
											

						</div>
						<div class="form-group p-xxs">
							<label class="control-label">CDS Description:</label>
								<div class="controls">
									<textarea type="text" class="form-control input-sm span12" placeholder="" id="f_cds_description"></textarea>
								</div>
											

						</div>
<!-- 						<div class="form-group p-xxs" style="display:none;"> -->
<!-- 							<label class="control-label">Appraisal Level:</label> -->
<!-- 								<div class="controls" id="drop_down_list_from_appraisal_level"> -->
<!-- 								</div> -->
											
 
<!-- 						</div> -->
						<div class="form-group p-xxs">
								<label class="control-label">Is SQL:</label>
								<div class="controls">
									<label for="" class="checkbox" style="cursor:default">
                  					<input id="checkbox_is_sql" name="checkbox_is_sql" type="checkbox"
										value="" style="margin-top: 2px;">
                					</label>
								</div>
						</div>
						<div class="form-group p-xxs">
							<label class="control-label">Connection:</label>
								<div class="controls" id="drop_down_list_connection">
								</div>
						</div>
						
						<div class="form-group p-xxs">
							<label class="control-label">SQL: <button class="btn btn-xs btn-white " type="button" id="btn_Execute">Execute</button>&nbsp;</label>
								<div class="controls">
									<textarea id="txt_sql" class="form-control span12" placeholder="" style="height: 95px;"></textarea>
								</div>
											

						</div>
						<div class="form-group p-xxs">
							<label class="control-label">Sample Data:</label>
								<div style="overflow:auto ;min-height: 145px;border:1px solid #cccccc;  border-radius: 5px; " class="controls">
									
										<table class="table table-bordered" id="table_Sql">

										</table>
							
								</div>
						</div>
						<div class="form-group p-xxs">
								<label class="control-label">Is Active:</label>
								<div class="controls">
									<label for="" class="checkbox" style="cursor:default">
                  					<input id="checkbox_is_active" name="checkbox_is_active" type="checkbox"
										value="" style="margin-top: 2px;">
                					</label>
								</div>
						</div>
						
					</div>
                </div>
                



					<!-- form End -->
                <!-- content end -->
            </div>
            <div class="modal-footer">
           	 	<input type="hidden" name="id" id="id" value="">
   				<input type="hidden" name="action" id="action" value="add">
   				
   				<button class="btn btn-success" type="button" id="btnSubmit">Save</button>
   				<button class="btn btn-success" type="button" id="btnAddAnother">Save & Add Another</button>
                <button data-dismiss="modal" class="btn btn-danger btnCancle" type="button">Cancel</button>
                <div class="alert alert-warning information" id="information" style="display: none;max-height:45px; overflow-y: scroll; position:relative;"></div>
            </div>
        </div>
    </div>
</div>
	<!-- Modal End Edit -->
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
				</div>
			</div>
		</div>
	</div>
	<!-- Modal Confirm End -->
		