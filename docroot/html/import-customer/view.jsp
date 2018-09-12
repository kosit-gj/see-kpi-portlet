
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
.aui .modal-header .close {
	font-size: 1.4em !important;
	margin-top: 4px !important;
	padding-top: 5px !important;
}

.aui textarea {
	max-width: 336px;
}

.aui #cus_list_content {
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

					<div class="col-lg-12" style="padding-left: 0px;padding-right: 0px;">
						<div class="ibox float-e-margins">
							<div class="ibox-title">
								<h5>Advance Search</h5>
							</div>

							<div class="ibox-content breadcrumbs2">
					<div class="row-fluid p-t-xxs">
						<div class="form-inline">
						
							<div class="form-group pull-left span3" style="margin-left: 5px" >
									<select data-toggle="tooltip" title="Industry Type"
										class="input span12 m-b-n" id="search_customer_type" name="search_customer_type">
										<option selected value="">All Customer Type</option></select>
								
							</div>
							
							<div class="form-group pull-left span3" style="margin-left: 5px" >
									<select data-toggle="tooltip" title="Customer Classification" 
										class="input span12 m-b-n" id="search_industry_class" name="search_industry_class">
										<option selected value="">All Industry Classification</option></select>
								
							</div>
							
							<div class="form-group pull-left span3" style="margin-left: 5px">
								<input data-toggle="tooltip"  title="Customer Name"
									class="span12 m-b-n ui-autocomplete-input"
									style="margin-bottom: 10px;"  id="search_customer_name" data-placement="top"
									name="search_customer_name" type="text" placeholder="Customer Name"> 
								<input
									class="form-control input-sm" id="search_customer_id" name="search_customer_id"
									value="" type="hidden">
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
				
				
				<div class="row-fluid" id="cus_list_content">
		<div class="col-lg-12" style="padding-left: 0px;padding-right: 0px;">
			<div class="ibox-title">
				<h5>Customer List</h5>
			</div>


			<div class="ibox-content">

			<div class="row-fluid ">
         		<div class="spen12">
	                 <span id="btnAdvanceDownloadOption"><form id="formExportToExcel" action="" method="post" class="" style="display: inline-flex; margin-bottom: 5px; position: relative; top: -1px;">	<button id="exportToExcel" class="btn btn-warning btn-sm" type="submit">		<i class="fa fa-download"></i> Download	</button></form></span>
	                  <span id="btnAdvanceImportOption">   <button style="margin-bottom: 5px;" type="button" class="btn btn-success input-sm" name="btn_import" id="btn_import" ><i class="fa fa-upload"></i>&nbsp;Import</button></span>
                 </div>
         	</div>


				<!-- start table -->
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

				<div class="table-responsive" style="overflow:auto;">
					<table class="table table-striped" id="tableCustomer" style="max-width: none;">
						<thead>
							<tr>
								<th style='width: 10%;white-space: nowrap;'>Customer Code</th>
								<th style='width: 60%;white-space: nowrap;'>Customer Name</th>
								<th style='width: 10%;white-space: nowrap;'>Customer type</th>
								<th style='width: 10%;white-space: nowrap;'>Industry Class</th>
								<th style='width: 10%; text-align: center;'>Manage</th>
							</tr>
						</thead>
						<tbody id="listCustomer">
	
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




<!-- Modal View Edit -->

	<div aria-hidden="true" role="dialog" tabindex="-1" id="ModalViewCustomer"
		class="modal inmodal" style="display: none;">
		<div class="modal-dialog">
			<div class="modal-content bounceInRight">
				<div class="modal-header">
					<button data-dismiss="modal" class="close" type="button" style="padding-top:5px">
						<span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only">Close</span>
					</button>
					<!-- <i class="fa fa-laptop modal-icon"></i> -->
					<h4 class="modal-title" id="modalTitleRole">Customer</h4>
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
								<label class="control-label">Customer Code:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_customer_code" disabled="disabled">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label">Customer Name:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_customer_name" disabled="disabled">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label">Customer Type:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_customer_type" disabled="disabled">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label">Industry Classification:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_industry_class" disabled="disabled">
								</div>
							</div>
							<div class="form-group p-xxs">
								<label class="control-label">Position Code:</label>
								<div class="controls">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_position_code_1" disabled="disabled">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_position_code_2" disabled="disabled">
									<input type="text" class="form-control input-sm span12" placeholder="" id="from_position_code_3" disabled="disabled">
								</div>
							</div>
							
							
	                	
	                	
	                	</div>
                	</div>
					<!-- form End -->
					<!-- content end -->
				</div>
				
				<div class="modal-footer">
<!-- 					<button class="btn btn-success" type="button" id="btnEmpSubmit">Save</button> -->
					<button data-dismiss="modal" class="btn btn-danger btnCancle" type="button">Cancel</button>
						<div class="alert alert-warning information" id="information2"
						style="display: none;"></div>
				</div>
				
			</div>
		</div>
	</div>
	<!-- Modal End View -->

	
<!-- Modal Import Customer -->

	<div aria-hidden="true" role="dialog" tabindex="-1" id="ModalImport"
		class="modal inmodal" style="display: none;">
		<div class="modal-dialog">
			<div class="modal-content  bounceInRight">
				<div class="modal-header" >
					<button data-dismiss="modal" class="close" type="button" style="padding-top:5px">
						<span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only">Close</span>
					</button>
					<!-- <i class="fa fa-laptop modal-icon"></i> -->
					<h4 class="modal-title" id="">Import Customer</h4>
					<!-- 
                <small class="font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                 -->
				</div>
				<div class="modal-body">
					<!-- content start -->
					<!-- form start -->
					<div class="form-group">
					<form id="fileImportCustomer">
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
					<button class="btn btn-success" type="submit" id="importFileMobile" form="fileImportCustomer">Import</button>
					<button data-dismiss="modal" class="btn btn-danger btnCancle"
						type="button">Cancel</button>
						<div class="alert alert-warning information" id="informationFile"
						style="height:120px; overflow-y: scroll; position:relative;display: none;"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal End Import Customer -->
	