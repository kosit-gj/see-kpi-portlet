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
//out.print(username);
//out.print("password2="+password);
%>
<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">

<style>

 /* Large desktop Start#####################################*/
 @media (min-width: 1200px) { 
 
	.modal.large {
		    width: 90%;
		    margin-left:-45%;  
		    top:0px;
		}
		
	.aui .modal-body{
		max-height: 400px;	
	}
	
  }
  /* Large desktop End######################################*/
  
  /*  desktop Start#########################################*/
 @media (min-width: 980px) and (max-width: 1199px) {
 
 	.modal.large {
		    width: 90%;
		    margin-left:-45%;  
		    top:0px;
		}
		
	.aui .modal-body{
		max-height: 400px;	
	}
 	
  }
 /*  desktop End############################################*/
 
 /* Portrait tablet to landscape and desktop Start##########*/
 @media (min-width: 768px) and (max-width: 979px) {
 
	
	.modal.large {
		    width: 90%;
		    margin-left:-45%;  
		    top:0px;
		}
	.pagingText{
		display:block;
	}
	.aui .p-t-xxs {
    	text-align: right;
	}
	.pagianation_area{
		position:'';
	}
	
	.aui .modal-body{
		max-height: 400px;	
	}
	
  }
 /* Portrait tablet to landscape and desktop End############*/ 
 
 /* Landscape phone to portrait tablet Start################*/
 @media (max-width: 767px) { 
 	
 	.modal.large {
 	
	    width: '';
	    top:0px;    
	}
	#grandTototalWeightArea{
		position: relative;
    	top: -385px;
	}
	.aui .p-t-xxs {
    	text-align: left;
	}
	
	
		.pagianation_area{
		/*position:absolute;*/
	}
	
	.aui .modal-body{
		max-height: 300px;	
	}
	
 
  }
 /* Landscape phone to portrait tablet End##################*/ 
 
 /* Landscape phones and down Start#########################*/
 @media (max-width: 480px) { 
 	
 	.pagingText{
		display:none;
	}
	.aui .p-t-xxs {
    	text-align: left;
	}
	.pagianation_area{
		/*position:absolute;*/
	}
	.aui .modal-body{
		max-height: 300px;	
	}

 

  }
  /* Landscape phones and down End##########################*/
  
  

.ibox-content {
    background-color: #fff;
    border: 1px solid #ffe57f;
    color: inherit;
    margin-bottom: 5px;
    padding-left: 15px;
    padding-right: 15px;
}

#countPaginationTop{
	width:60px;
}
#countPaginationBottom{
	width:60px;
}
#btnPaginationTop{
	width:300px;
	float:left;
}
#dropdownPaginationTop{
	/*width:100px;*/
	float:right;
}
#btnPaginationBottom{
	width:300px;
	float:left;
}
#dropdownPaginationBottom{
	/*width:100px;*/
	float:right;
}
.aui .pagination {
   margin: 0;
}
.pagingText {
    float: right;
    margin-right: 5px;
    padding-top: 5px;
}
.aui .popover-content {
    padding: 5px;
}
.aui .modal-footer {
  
    border-radius: 0;
   
}

/*
.aui .modal {
    background-clip: padding-box;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    left: 23%;
    margin-left: -280px;
    outline: 0 none;
    position: fixed;
    top: 0%;
    width: 90%;
    z-index: 1050;
}
*/
.aui input, .aui textarea, .aui .uneditable-input {
   /* width: 47px;*/
}

 .aui .table td {
    border-top: 1px solid #ddd;
    line-height: 16px;
    padding: 5px;
    text-align: left;
    vertical-align: top;
}
.aui input[type="color"], .aui input[type="date"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="email"], .aui input[type="month"], .aui input[type="number"], .aui input[type="password"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="text"], .aui input[type="time"], .aui input[type="url"], .aui input[type="week"], .aui select, .aui textarea, .aui .uneditable-input {
    border: 1px solid #ddd;
    color: #8d8d8d;
    font-weight: 200;
    margin-bottom: 0;
    
}
.aui #breadcrumbs {
    margin-bottom: 0;
}
.breadcrumbs2{

	background: rgba(0, 0, 0, 0) linear-gradient(to bottom, #fff 0px, #f6f6f6 47%, #ededed 100%) repeat scroll 0 0;
    border-radius: 0;
    margin-bottom: 0;
  	padding-bottom: 0px

}
.aui .searchAdvanceText{
	/*width:94%;*/
}
.aui select, .aui textarea, .aui input[type="text"], .aui input[type="password"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="date"], .aui input[type="month"], .aui input[type="time"], .aui input[type="week"], .aui input[type="number"], .aui input[type="email"], .aui input[type="url"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="color"], .aui .uneditable-input{
	padding:5px;
	padding-top:0px;
	height: 30px;
}
.aui .p-t-xxs{
 padding-top: 5px;
 /*text-align: right;
 font-weight: bold;*/
}
.aui .p-t-xxsg{
 padding-top: 5px;
 text-align: right;
 font-weight: bold;
}

.aui .pagination ul > li:last-child > a, .aui .pagination ul > li:last-child > span{
   border-bottom-right-radius: 0;
   border-top-right-radius: 0;
}
.aui .pagination ul > li:first-child > a, .aui .pagination ul > li:first-child > span{
	border-bottom-left-radius: 0;
    border-top-left-radius: 0;
}
.aui .table td{
	font-size: 13px;
}
/*
.modal.large {
    width: 90%;
    margin-left:-45%;  
    top:0px;
}
*/
.aui #assignTo{
	width:100%;
}
.aui #actionToAssign{
	width:100%;
}

.aui .row-fluid [class*="span"]{
min-height: auto;
margin-bottom:1px;
}

.textInfo{
	font-wieght:bold;
}
/*
.aui label {
    color: #555;
    font-size: 16px;
}
*/
.aui #btnSearchAdvance{
	left:4px; position:relative;
}
.aui .textData{
	  font-weight: bold;
}

/* Important part */
.modal-dialog{
    overflow-y: initial !important
}
.modal-body{
    max-height: calc(100vh - 200px);
    overflow-y: auto;
}
	
</style>

<body class=" gray-bg ">
<div class='row-fluid'>
	<div id="slide_status" class='span12'>
		<div id="btnCloseSlide">×</div>
		<div id="slide_status_area"></div>
	</div>
</div>


	<div class="">
		<div class="container1">
			<div id="includePage" class="ng-view ng-scope">
			<!-- 
				<h2><i class="fa fa fa-pencil-square-o icon-title"></i> <span id="modalDescription"> Appraisal</span> </h2>
 			-->
				<div class="row-fluid">
					<!-- start--row-fluid -->

					<div class="span12">
						<div class="ibox float-e-margins">
							<div class="ibox-title">
								<div class='titlePanel'>Advance Search</div>
							</div>

							<div class="ibox-content breadcrumbs2">
									<div class="row-fluid">
										<div class="span4">
											<div class="form-group p-xxs">
												<label class="span5 p-t-xxs">Appraisal Year</label>
												<div class="span7">
													<select data-toggle="tooltip" title=""
														class="input form-control input-sm span12" id="AppraisalYear"
														name="AppraisalYear">
														
													</select>
												</div>
	
											</div>
										</div>
	
										<div class="span4">
											<div class="form-group p-xxs">
												<label class="span5 p-t-xxs">Appraisal Period</label>
												<div class="span7">
													<select data-toggle="tooltip" title=""
														class="input form-control input-sm span12"
														id="AppraisalPeriod" name="AppraisalPeriod">
														<option>All</option>
													</select>
												</div>
	
											</div>
	
										</div>
										<div class="span4">
											<div class="form-group p-xxs">
												<label class="span5 p-t-xxs">Appraisal Level</label>
												<div class="span7">
													<select data-toggle="tooltip" title=""
														class="input form-control input-sm span12"
														id="AppraisalLevel" name="AppraisalLevel">
														<option>All</option>
														<option>ระดับบริหาร</option>
														<option>ระดับการจัดการ</option>
														<option>ระดับบังคับบัญชา</option>
														<option>ระดับเจ้าหน้าที่</option>
														<option>HR</option>
													</select>
												</div>
	
											</div>
										</div>
								</div>
								<div class="row-fluid">
										<div class="span4">
											<div class="form-group p-xxs">
												<label class="span5 p-t-xxs">Department</label>
												<div class="span7">
													<select data-toggle="tooltip" title=""
														class="input form-control input-sm span12"
														id="Department" name="Department">
														<option>All</option>
													</select>
												</div>
	
											</div>
										</div>
										<div class="span4">
											<div class="form-group p-xxs">
												<label class="span5 p-t-xxs">Section</label>
												<div class="span7">
													<select data-toggle="tooltip" title=""
														class="input form-control input-sm span12"
														id="Section" name="Section">
														<option value=''>All</option>
													</select>
												</div>
	
											</div>
										</div>
	
										<div class="span4">
											<div class="form-group p-xxs">
												<label class="span5 p-t-xxs">Position</label>
												<div class="span7">
													<input data-toggle="tooltip" title=""
														class="form-control input-sm searchAdvanceText span12" placeholder="Position"
														type="text" id="Position" name="Position">
												</div>
	
											</div>
										</div>
							</div>
							<div class="row-fluid">
										<div class="span4">
											<div class="form-group p-xxs m-b-none">
												<label class="span5 p-t-xxs">Employee Name</label>
												<div class="span7">
													<input data-toggle="tooltip" title=""
														class="form-control input-sm searchAdvanceText span12" placeholder="Employee Name"
														type="text" id="EmpName" name="EmpName">
												</div>
	
											</div>
										</div>
										<div class="span4">
											<div class="form-group p-xxs m-b-none">
												<label class="span5 p-t-xxs">Appraisal Type</label>
												<div class="span7">
													
													<select data-toggle="tooltip" title=""
														class="input form-control input-sm span12"
														id="appraisalType" name="appraisalType">
														
													</select>
													
													
												</div>
	
											</div>
										</div>
										<div class="span4">
											<div class="form-group  ">
												
												<div class="form-group pull-right p-xxs m-b-none">
													
	
													<button type="button" class="btn btn-info input-sm"
														name="btnSearchAdvance" id="btnSearchAdvance">
														<i class="fa fa-search"></i>&nbsp;Search
													</button>&nbsp;
	
												</div>
	
											</div>
										</div>
								</div>
								
							
								</div>

							</div>
							<!-- content end -->
						</div>

					</div>

				</div>
				<!-- end--row-fluid -->

				<div class="row-fluid search_result" >
					<div class="span12">
						<div class="ibox-title">
							<div class='titlePanel'>Appraisal List</div>
						</div>


						<div class="ibox-content">

							<!-- start table -->
							<!-- pagination start -->
                                    	<div class="row-fluid">
	                                    	<div class="span6 pagianation_area" >
												<div class="pagination_top pagination"></div>
	                                    	</div>
	                                    
		                                    <div class="span6 object-right paging-text">
		                                    
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
						




							
							<div id="listAppraisal"></div>	

							<!-- pagination start -->
							<div class="row-fluid">
	                                    	<div class="span6 pagianation_area">
	
												  <p class="pagination_bottom pagination"></p>
												
	                                    	</div>
	                                    
		                                    <div class="span6 object-right paging-text">
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
	</div>
	
	<!-- Modal Start Appraisal -->

	<div aria-hidden="true" role="dialog" tabindex="-1" id="ModalAppraisal"
		class="modal inmodal large" style="display: none;">
		<div class="modal-dialog " >
			<div class="modal-content animated bounceInRight">
				<div class="modal-header">
					<button data-dismiss="modal" class="close" type="button">
						<span aria-hidden="true">×</span><span class="sr-only"></span>
					</button>
					<!-- <i class="fa fa-laptop modal-icon"></i> -->
					<h4 class="modal-title" id="modalTitleRole">Appraisal</h4>
					<!-- 
                <small class="font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                 -->
				</div>
				<div class="modal-body">
					<!-- content start -->
					<!-- 
					<h2>
						<i class="fa fa fa-pencil-square-o icon-title"></i> <span
							id="modalDescription">Appraisal</span>
					</h2>
					<hr>
					 -->
					
					<!-- -------------From Employee Start------------- -->
					<div class="row-fluid">
					<div class="span12">
						<div class="ibox float-e-margins">
							<div class="ibox-title">
								<div class='titlePanel'>Employee Information</div>
							</div>
							<!-- ibox-content-radius -->
							<div class="ibox-content ">
								<div class="container-fluid">
									<div class="span10 ">
											
											<div class="row-fluid">
											
												<label class="span3 textInfo">Employee code:</label>
												<label class="span3 textInfo textData" id="txtEmpCode"></label>
												<label class="span3 textInfo">Employee Name:</label>
												<label class="span3 textInfo textData" id="txtEmpName"></label>
											</div>
											<div class="row-fluid">
												<label class="span3 textInfo">Position:</label>
												<label class="span3 textInfo textData" id="txtPosition"></label>
												<label class="span3 textInfo">Department:</label>
												<label class="span3 textInfo textData" id="txtDepartment"></label>
											</div>
											<div class="row-fluid">
												<label class="span3 textInfo">Section:</label>
												<label class="span3 textInfo textData" id="txtSection"></label>
												<label class="span3 textInfo">Chief Employee Code:</label>
												<label class="span3 textInfo textData" id="txtChiefEmpCode"></label>
											</div>
											<div class="row-fluid">
												<label class="span3 textInfo">Chief Employee Name:</label>
												<label class="span3 textInfo textData" id="txtChiefEmpName"></label>
												<label class="span3 textInfo">Appraisal Type:</label>
												<label class="span3 textInfo textData" id="txtAppraisalType"></label>
											</div>
											<div class="row-fluid">
												<label class="span3 textInfo">Period:</label>
												<label class="span3 textInfo textData"  id="txtPeriod"></label>
											</div>
									</div>
									<div class="span2" id='grandTototalWeightArea'>
											<label class="span12 p-t-xxsg text-center ">Grand Total Weight %</label>
											<label class="span12 p-t-xxsg text-center " id="txtGrandTotalWeigh" style="font-size: 300%;"></label>
									
									</div>
									

								</div>

							</div>
						</div>

					</div>

				</div>
				<!-- -------------From Employee Start------------- -->
				
				
				
				
					
					
					<!-- -------------From Appraisal Start------------- -->
					<div class="row-fluid">
					<div class="span12">
						<div class="ibox float-e-margins">
							<div class="ibox-title">
								<div class='titlePanel'>Appraisal</div>
							</div>
					
							<div class="ibox-content ibox-content-radius">
									
									<div id='appraisal_template_area'></div>


								</div>
						</div>

					</div>

				</div>
				<!-- -------------From Appraisal Start------------- -->

		
					<!-- content end -->
				</div>
				<div class="modal-footer">
				
					
					<div class='row-fluid'>
					
						<div class="span3 ">
							 <div class="form-group p-xxs"> 
								 <label class="span5 p-t-xxs"><b>Assign to:</b></label> 
								 <div class="span7"> 
									 <select data-toggle="tooltip" title="" class="input form-control input-sm" id="assignTo" name="assignTo">
							
									 </select>
								 </div> 
							 </div> 
						 </div>
						 
						 <div class="span3 ">
							 <div class="form-group p-xxs"> 
								 <label class="span4 p-t-xxs"><b>Action:</b></label> 
								 <div class="span8"> 
									<select data-toggle="tooltip" title="" class="input form-control input-sm" id="actionToAssign" name="actionToAssign">
								
									</select>
								 </div> 
							 </div> 
						 </div>
						 
						  <div class="span4 offset2">
						  
							  	<button class="btn btn-success" type="button" id="btnSubmit">Submit</button>
								<input type='hidden' id='emp_result_id' name='emp_result_id' value=''>
								<button data-dismiss="modal" class="btn btn-danger btnCancle" type="button">Cancel</button>
						  
						  </div>
					
					</div>
					
					

					<div class="alert alert-warning" id="information"
						style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>
	<input type="hidden" name="id" id="id" value="">
	<input type="hidden" name="action" id="action" value="add">
	<!-- Modal End Appraisal -->



	<!-- New Modal Appraisal Start -->
	    <!-- Button to trigger modal -->
	    <!-- 
    <a href="#myModal" role="button" class="btn" data-toggle="modal">Launch demo modal</a>
      -->
    <!-- Modal -->
    <div id="myModal" class="modal  fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	       <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		        <h3 id="myModalLabel">Modal header</h3>
	      </div>
	      <div class="modal-body">
	        	<p>One fine body… </p>
	      </div>
	      <div class="modal-footer">
		        <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
		        <button class="btn btn-primary">Save changes</button>
	      </div>
    </div>
	<!--  New Modal APpraisal End -->

	<div id="embedParamSearch"></div>
	
</body>
	
	








	

    
    	
    



