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
%>
<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">


<style>

.c-1-color { background: red; }
.c-2-color { background: yellow; }
.c-3-color { background: green; }
.c-4-color { background: blue; }
.c-5-color { background: purple; }

 /* Large desktop Start#####################################*/
 @media (min-width: 1200px) { 
 
	.modal.large {
		    width: 90%;
		    margin-left:-45%;  
		    top:0px;
		}
		
	.aui .modal-body{
		/*max-height: 400px;*/
	}
	.aui .displayWeightOnMobile{
	display:none;

	}
	.aui .ibox-content .control-label{
    	text-align: right;
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
		/*max-height: 400px;*/	
	}
	.aui .displayWeightOnMobile{
	display:none;
	}
	.aui .ibox-content .control-label{
    	text-align: right;
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
		/*max-height: 400px;	*/
	}
	.checkWeigthOver{
		display:'block';
	}
	
	.aui .btnManagement{
		width:'';
	}
	.aui .displayWeightOnMobile{
	display:none;
	}
	
	
	.aui .ibox-content .control-label{
    	text-align: right;
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
	.aui .ibox-content .control-label {
    	text-align: left;
	}
	
	
		.pagianation_area{
		/*position:absolute;*/
	}
	
	.aui .modal-body{
		/*max-height: 300px;	*/
	}
	.checkWeigthOver{
		display:none;
	}
	.aui .displayWeightOnMobile{
	display:inline;
	}
	.aui .btnAssignment{
		float:right;
	}
	
	.aui .btnManagement{
		width:100%;
	}
	.aui .p-t-xxs {
    	text-align: right;
	}
 
  }
 /* Landscape phone to portrait tablet End##################*/ 
 
 /* Landscape phones and down Start#########################*/
 @media (max-width: 480px) { 
 	
 	.pagingText{
		display:none;
	}
	.aui .ibox-content .control-label{
    	text-align: left;
	}
	.pagianation_area{
		/*position:absolute;*/
	}
	.aui .modal-body{
		/*max-height: 300px;	*/
	}
	
	.checkWeigthOver{
		display:none;
	}
	.total_weigth_all{
		display:block
	}
	.aui .btnAssignment{
		float:'';
	}
	.aui .displayWeightOnMobile{
	display:inline;
	}
	
	.aui .p-t-xxs {
    	text-align: left;
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
    padding: 2px;
    text-align: left;
    vertical-align: top;
    font-size:13px;
}
.aui select, .aui textarea, .aui input[type="text"], .aui input[type="password"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="date"], .aui input[type="month"], .aui input[type="time"], .aui input[type="week"], .aui input[type="number"], .aui input[type="email"], .aui input[type="url"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="color"], .aui .uneditable-input{
	padding: 2px;
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
.aui select{
 	width: 100%;
}
.aui input{
	width: 100%;
}
.breadcrumbs2{

	background: rgba(0, 0, 0, 0) linear-gradient(to bottom, #fff 0px, #f6f6f6 47%, #ededed 100%) repeat scroll 0 0;
    border-radius: 0;
    margin-bottom: 0;
  	padding-bottom: 5px

}
.aui .pagination ul > li:last-child > a, .aui .pagination ul > li:last-child > span{
   border-bottom-right-radius: 0;
   border-top-right-radius: 0;
}
.aui .pagination ul > li:first-child > a, .aui .pagination ul > li:first-child > span{
	border-bottom-left-radius: 0;
    border-top-left-radius: 0;
}

.aui .ibox-content  .control-label{
    	/*font-weight:bold;*/
	}
.aui .table thead th{
	font-weight:bold;
}
.aui .input-sm-small{
	width:40px;
	
}
.aui .table {
    margin-bottom: 1px;
}
.aui .grandTotalWeight{
	font-size: 24px;
    font-weight: bold;
    margin-bottom:5px;
}
.aui. #grandTotalWeightP{
	font-size: 30px;
}
.aui .grandTotalWeight{
 	font-size: 16px;
}
.aui .employee_row{
	min-height:25px;
}
.p-t-xxs{
	padding-top:5px;
}
.aui .textInfo{
	min-height:auto;
}
.aui .textData{
	font-weight:bold;
}
/* Update by au */
.aui .btn {
	font-size: 14px;
 	padding: 4px 12px; 
	width: auto;
	margin-top: 0px;
	display: inline;
}
.aui .breadcrumbs2 select, .aui breadcrumbs2 textarea, .aui .breadcrumbs2 input[type="text"], .aui input[type="password"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="date"], .aui input[type="month"], .aui input[type="time"], .aui input[type="week"], .aui input[type="number"], .aui input[type="email"], .aui input[type="url"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="color"], .aui .uneditable-input {
    height: 30px;
    padding: none;
    font-size: 14px;
}
.aui  select , .aui  input[type="text"]{font-size: 14px;}

</style>

<body class="gray-bg ">


<!--  #####################Content data here ######################-->
<div class='row-fluid'>
	<div id="slide_status" class='span12'>
		<div id="btnCloseSlide">×</div>
		<div id="slide_status_area"></div>
	</div>
</div>


<div class="app_url_hidden">
<div class="container1">


<!-- 
<h2><i class="fa fa fa-pencil-square-o icon-title"></i> <span id="modalDescription"> Appraisal Assignment</span> </h2>
 -->
				<div class="row-fluid"><!-- start--row-fluid -->

                    <div class="span12">
                        <div class="ibox float-e-margins">
                            <div class="ibox-title">
                               
                                  <div class='titlePanelSearch'>Advance Search</div> 
         					</div>
         					
         						<div class="ibox-content breadcrumbs2"> 
         						
         						<div  class="row-fluid ">

									
									<div id='appraisalLevelArea' class="form-group pull-left span2"
										style="margin-left: 5px; margin-bottom: 3px;">
										<select data-toggle="tooltip" title="Level"
											class="input form-control input-sm" id="appraisalLevel"
											name="appraisalLevel">
								
											<option value="0"></option>
								
								
										</select>
									</div>
									<div id='DepartmentArea' class="form-group pull-left span2"
										style="margin-left: 5px; margin-bottom: 3px;">
										<select data-toggle="tooltip" title="Department"
											class="input form-control input-sm" id="Department" name="Department">
										</select>
									</div>
									<div id="appraisalTypeArea" class="form-group pull-left span2"
										style="margin-left: 5px; margin-bottom: 3px;">
										<select data-toggle="tooltip" title="Entity Type"
											class="input form-control input-sm" id="appraisalType"
											name="appraisalType">
								
											<option value="0"></option>
								
										</select>
									</div>
								 
									<div id='yearArea' class="form-group pull-left span2"
										style="margin-left: 5px; margin-bottom: 3px;">
										<select data-toggle="tooltip" title="Year"
											class="input form-control input-sm" id="YearList" name="YearList">
								
											<option value="0"></option>
								
										</select>
									</div>
									<div id="periodFrequencyArea" class="form-group pull-left span2"
										style="margin-left: 5px; margin-bottom: 3px;">
										<select data-toggle="tooltip" title="Period frequency"
											class="input form-control input-sm" id="periodFrequency"
											name="periodFrequency">
											<option value="0"></option>
										</select>
									</div>
									<div id="assignFrequencyArea" class="form-group pull-left span2"
										style="margin-left: 5px; margin-bottom: 3px;">
										<select data-toggle="tooltip" title="Assign Frequency"
											class="input form-control input-sm" id="assignFrequency"
											name="assignFrequency">
								
											<option value="1">ครั้งเดียวทุกงวด</option>
											<option value="2">ทีละงวด</option>
								
										</select>
									</div>
									<div id="periodArea" class="form-group pull-left span2"
										style="margin-left: 5px; margin-bottom: 3px;">
										<select data-toggle="tooltip" disabled='disabled' data-toggle="Period" title="Period"
											class="input form-control input-sm" id="period_id" name="period_id">
								
											<option value=""></option>
								
										</select>
								</div>
								<div id="organizationArea" class="form-group pull-left span2"
									style="margin-left: 5px; margin-bottom: 3px;">
									<input data-toggle="tooltip" type="text" class="form-control input-sm span12 "
										placeholder="Organization" id="organization" data-original-title="Organization">
								</div>
								<div id="empNameArea" class="form-group pull-left span2"
									style="margin-left: 5px; margin-bottom: 3px;">
									<input data-toggle="tooltip" type="text" class="form-control input-sm span12 "
										placeholder="Emp Name" id="empName" data-original-title="Employee Name">
								</div>
								<div id="PositionArea" class="form-group pull-left span2"
									style="margin-left: 5px; margin-bottom: 3px;">
									<input data-toggle="tooltip" type="text" id="Position" placeholder="Position"
										class="form-control input-sm span12" data-original-title="Position">
								</div>
							
								<div class="form-group pull-right m-b-none "
									style="margin-bottom: 5px;">
									<button type="button" class="btn btn-info input-sm"
										name="btnSearchAdvance" id="btnSearchAdvance">
										<i class="fa fa-search"></i>&nbsp;Search
									</button>
									<button type="button" data-target='#ModalAssignment'
										data-toggle='modal' class="btn btn-warning input-sm"
										name="btnAssignment" id="btnAssignment">
										<i class="fa fa-sign-in"></i>&nbsp;Assign
									</button>
								</div>
							
							</div>
         						
         						
         					<!--		
											<div class='row-fluid'>
												
				                                    <div class="span4 m-b-xs">
					                                    <div class="form-group"><label class="span5 control-label">Appraisal Level</label>
			
						                                    <div class="span7" id='appraisalLevelArea'>
						                                    
							                                    <select data-toggle="tooltip" title="Flag 2" class="input form-control input-sm"  id="appraisalLevel" name="appraisalLevel">
							                                    	
							                                    	<option value="0"></option>
																	
																	
																</select>
																
						                                    </div>
						                                </div>
													</div>
													
													<div class="span4 m-b-xs">
					                                    <div class="form-group"><label class="span5 control-label">Department</label>
			
						                                    <div class="span7" id='DepartmentArea'>
						                                    
							                                    <select data-toggle="tooltip" title="Flag 2" class="input form-control input-sm"  id="Department" name="Department">
							                                    	
							                                   
																	
																	
																</select>
																
						                                    </div>
						                                </div>
													</div>
													 
													<div class="span4 m-b-xs">
					                                    <div class="form-group"><label class="span5 control-label">Appraisal Type</label>
			
						                                    <div class="span7" id="appraisalTypeArea">
						                                    
							                                    <select data-toggle="tooltip" title="Appraisal Type" class="input form-control input-sm"  id="appraisalType" name="appraisalType">
							                                    	
							                                    	<option value="0"></option>
																	
																</select>
																
						                                    </div>
						                                </div>
													</div>
													
											
											</div>
											<div class='row-fluid'>
													<div class="span4 m-b-xs">
					                                    <div class="form-group"><label class="span5 control-label">Year </label>
			
						                                    <div class="span7" id='yearArea'>
						                                    
							                                  
																  <select data-toggle="tooltip" title="Year" class="input form-control input-sm"  id="YearList" name="YearList">
							                                    	
							                                    	<option value="0"></option>
																	
																</select>
																
						                                    </div>
						                                </div>
													</div>
													
													
													<div class="span4 m-b-xs" id="periodfrequencyArea">
					                                    <div class="form-group"><label class="span5 control-label">Period frequency</label>
			
						                                    <div class="span7" id="periodFrequencyArea">
						                                    
							                                    <select data-toggle="tooltip" title="Period frequency" class="input form-control input-sm"  id="periodFrequency" name="periodFrequency">
							                                    	<option value="0"></option>
																</select>
																
						                                    </div>
						                                </div>
													</div>
													
													<div class="span4 m-b-xs">
					                                    <div class="form-group"><label class="span5 control-label">Assign Frequency</label>
			
						                                    <div class="span7" id='assignFrequencyArea'>
						               
							                                    <select data-toggle="tooltip" title="Assign Frequency" class="input form-control input-sm"  id="assignFrequency" name="assignFrequency">
							                                    
							                                    	<option value="1">ครั้งเดียวทุกงวด</option>
							                                    	<option value="2">ทีละงวด</option>
																	
																</select>
																
						                                    </div>
						                                </div>
													</div>
												</div>
											<div class='row-fluid'>
													<div class="span4 m-b-xs">
					                                    <div class="form-group"><label class="span5 control-label">Period</label>
			
						                                    <div class="span7" id="periodArea">
						                                    
							                                    <select disabled='disabled' data-toggle="Period" title="Period" class="input form-control input-sm"  id="period_id" name="period_id">
							                                    	
							                                    	<option  value=""></option>
																	
																</select>
																
						                                    </div>
						                                </div>
													</div>
													
													<div class="span4 m-b-xs">
					                                    <div class="form-group"><label class="span5 control-label">Emp Name</label>
			
						                                    <div class="span7" id="empNameArea">
						                                    
							                         
																<input type="text" class="form-control input-sm span12 " placeholder="Emp Name" id="empName">
																
																
						                                    </div>
						                                </div>
													</div>
													<div class="span4 m-b-xs">
					                                    <div class="form-group"><label class="span5 control-label">Position </label>
			
						                                    <div class="span7" id='PositionArea'>
						                                    
							                                  
																
																<input type="text" id="Position" placeholder="Position" class="form-control input-sm span12">
													
						                                    </div>
						                                </div>
													</div>
												</div>
											<div class='row-fluid'>
													<div class='span12 object-right' style='text-align:right;' >
										
												
														
			                                  
				                                     	<div id="btnSearchArea">
			                                         		<button type="button" class="btn btn-info input-sm" name="btnSearchAdvance" id="btnSearchAdvance"><i class="fa fa-search"></i>&nbsp;Search</button>
			                                         		<button type="button"  data-target='#ModalAssignment' data-toggle='modal' class="btn btn-warning input-sm" name="btnAssignment" id="btnAssignment"><i class="fa fa-sign-in"></i>&nbsp;Assign</button>
			                                         	</div>
		                                         
				                                     	
                                     	
													</div>

											</div>
							-->
				         		</div><!-- content end -->
				         		</div>
				         		
         				</div>
	
         			</div><!-- end--row-fluid -->
         			<div class="row-fluid search_result">
				         		<div class="span12">
					         	<div class="ibox-title">
	                                <div class='titlePanel'>Employee List</div>
	         					</div>
	         					
	         					
	         					<div class="ibox-content"> 
	         					
                                    	<!-- start table -->
                                    	<!-- pagination start -->
                                    	<div class="row-fluid">
	                                    	<div class="span6 pagianation_area">
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
                                    	 
                                    	 <!-- content row-fluid 1 start-->
                                    	 <div id='listDatas'>
                                    	 
                                    	 </div>
	         							<!-- content row-fluid 1 end-->
	         							
	         							
	         							

                                        
                                        <!-- row-fluid start -->
                                    	<div class="row-fluid">
	                                    	<div class="span6 pagianation_area">
	
												  <p class="pagination_bottom pagination"></p>
												<!-- 
												<ul class="pagination bootpag"><li class="first disabled" data-lp="1"><a href="javascript:void(0);">←</a></li><li class="prev disabled" data-lp="1"><a href="javascript:void(0);">prev</a></li><li data-lp="1" class="active"><a href="javascript:void(0);">1</a></li><li data-lp="2"><a href="javascript:void(0);">2</a></li><li class="next" data-lp="2"><a href="javascript:void(0);">next</a></li><li class="last" data-lp="2"><a href="javascript:void(0);">→</a></li></ul>
	                   							 -->
	                                    	</div>
	                                    
		                                    <div class="span6 object-right paging-text ">
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
		                                    <!-- 
		                                    <div class="span1">
	                                    	<select name="countPagination" id='countPaginationBottom'  class="form-control input-sm countPagination">
		                                        <option>10</option>
		                                     	<option>20</option>
		                                     	<option>50</option>
		                                     	<option>100</option>
		                                    </select> 
	                                    	</div>
	                                    	 -->
                                    	</div> 
                                    	 <!-- row-fluid end -->
                                    	<!-- end table -->
                                    	<br style='clear:both'>
         						</div><!-- content end -->
         					</div>
         					</div>
         					 
  </div>
 </div>
  
  <div id='embedParamSearch'></div>
  <div id='embedStructureCheckWeight'></div>           					
      <!-- <button data-toggle="modal" data-target="#ModalKPI" id="btnAddKPI" class="btn btn-info input-sm" type="button"><i class="fa fa-plus-square"></i>&nbsp;Assign KPI</button>	 -->				
<!-- Modal KPI Start Edit -->

  <div aria-hidden="true" role="dialog" tabindex="-1" id="ModalAssignment" class="modal inmodal  large" style="display: none;">
    <div class="modal-dialog  ">
    <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only"></span></button>
             
                <h4 class="modal-title" id="modalTitleRole">Appraisal Assignment</h4>
               
            </div>
            <div class="modal-body">
            	
                <!-- content start -->
                <!-- 
                <h2><i class="fa fa fa-pencil-square-o icon-title"></i> <span id="modalDescription"> Assign Appraisal Item</span> </h2>
                <hr>
                -->
             
                <!-- panel0 start -->
                <div class="row-fluid cus_information_area" >
	  					<div class="span12">
	                      <div class="ibox-title2">
	                          <div class='titlePanel'>Employee Information</div>
	                      </div>
	   					
	   					<div class="ibox-content">
	   							
	   							<!-- content table start-->	
	   							<!-- 
	   								<div class='row-fluid wrapper employee_information_area'>
	   									<div style='min-height:25px;'  class='span4 employee_row'>
	   										<div class='label_info'>Employee Code:</div>
	   										<div class='text_info' id='employee_code'></div>
	   									</div>
	   									<div style='min-height:25px;' class='span4 employee_row'>
	   										<div class='label_info'>Section:</div>
	   										<div class='text_info' id='section'> </div>
	   									</div>
	   									<div style='min-height:25px;' class='span4 employee_row'>
	   										<div class='label_info'>Appraisal Type:</div>
	   										<div class='text_info' id='appraisal_type'></div>
	   									</div>
	   								</div>
	   								<div class='row-fluid '>
	   									<div style='min-height:25px;' class='span4 employee_row'>
	   										<div class='label_info'>Employee Name:</div>
	   										<div class='text_info' id='employee_name'></div>
	   									</div>
	   								
	   									<div style='min-height:25px;' class='span4 employee_row'>
	   										<div class='label_info'>Department:</div>
	   										<div class='text_info' id='department'></div>
	   									</div>
	   									<div style='min-height:25px;' class='span4 employee_row'>
	   										<div class='label_info'>Period:</div>
	   										<div class='text_info' id='period_label'> </div>
	   									</div>
	   								</div>
	   								<div class='row-fluid '>
	   									<div style='min-height:25px;' class='span4 employee_row'>
	   										<div class='label_info'>Start Working Date:</div>
	   										<div class='text_info' id='start_working_date'> </div>
	   									</div>
	   									<div style='min-height:25px;' class='span4 employee_row'>
	   										<div class='label_info'>Chief Employee Code:</div>
	   										<div class='text_info' id='chief_employee_code'> </div>
	   									</div>
	   									<div style='min-height:25px;' class='span4 employee_row'>
	   										<div class='label_info'>Position:</div>
	   										<div class='text_info' id='position'> </div>
	   									</div>
	   								</div>
	   								<div class='row-fluid '>
	   									<div style='min-height:25px;' class='span4 employee_row'>
	   										<div class='label_info'>Chief Employee Name:</div>
	   										<div class='text_info'id='chief_employee_name'> </div>
	   									</div>
	   									
	   								</div>
	   								-->
	   								<div class="row-fluid">
										<label style='min-height:auto;' class="span3 textInfo">Employee code:</label>
										<label style='min-height:auto;' class="span3 textInfo textData" id="employee_code"></label>
										<label style='min-height:auto;' class="span3 textInfo">Employee Name:</label>
										<label style='min-height:auto;' class="span3 textInfo textData" id="employee_name"></label>
									</div>
									<div class="row-fluid">
										<label style='min-height:auto;' class="span3 textInfo">Position:</label>
										<label style='min-height:auto;' class="span3 textInfo textData" id="position"></label>
										<label style='min-height:auto;' class="span3 textInfo">Department:</label>
										<label style='min-height:auto;' class="span3 textInfo textData" id="department"></label>
									</div>
									<div class="row-fluid">
										<label style='min-height:auto;' class="span3 textInfo">Section:</label>
										<label style='min-height:auto;' class="span3 textInfo textData" id="section"></label>
										<label style='min-height:auto;' class="span3 textInfo">Chief Employee Code:</label>
										<label style='min-height:auto;' class="span3 textInfo textData" id="chief_employee_code"></label>
									</div>
									<div class="row-fluid">
										<label style='min-height:auto;' class="span3 textInfo">Chief Employee Name:</label>
										<label style='min-height:auto;' class="span3 textInfo textData" id="chief_employee_name"></label>
										<label style='min-height:auto;' class="span3 textInfo">Appraisal Type:</label>
										<label style='min-height:auto;' class="span3 textInfo textData" id="appraisal_type"></label>
									</div>
									<div class="row-fluid">
										<label style='min-height:auto;' class="span3 textInfo">Period:</label>
										<label style='min-height:auto;' class="span3 textInfo textData"  id="period_label"></label>
										<label style='min-height:auto;' class="span3 textInfo">Start Working Date:</label>
										<label style='min-height:auto;' class="span3 textInfo textData"  id="start_working_date"></label>
									</div>
									
						          <br style="clear:both">
	                            <!-- content table end-->				
	   					</div>
	   				</div>
	   			</div>
                <!-- panel0 end -->
                <!-- panel1 start -->
                <div id='appraisal_template_area'></div>
                <!-- panel1 end -->
                
                
               
                
                <!-- content end -->
            </div>
            <div class="modal-footer">
            
            	<div class="row-fluid">
            		<div class='span12 grandTotalWeight' >
            		Grand Total Weight % <span id="grandTotalWeight"  class='perscentage'>0.00</span>
            		</div>
            	</div>
            	
            	<div class="row-fluid">
            		<div class="span3 ">
            		
            			<div class="form-group "> 
							 <label class="span5 p-t-xxs"><b>Assign to:</b></label> 
							 <div class="span7"> 
								 <select id='assignTo' class='input form-control input-sm'>
				   				 </select>
							 </div> 
						 </div> 
						 
            		</div>
            		<div class="span3 ">
            		
	            			<div class="form-group "> 
							 <label class="span4 p-t-xxs"><b>Action:</b></label> 
							 <div class="span8"> 
									<select id='actionAssign' class='input form-control input-sm'>
				   					</select>
							 </div> 
						  </div> 
					 
            		</div>
            		<div class="span4 offset2">
            				<input type="hidden" name="id" id="id" value="">
		   					<input type="hidden" name="period_id_edit" id="period_id_edit" value="">
			   				<input type="hidden" name="action" id="action" value="add">
			   				<button class="btn btn-primary" type="button" id="btnSubmit">Submit</button>
			                <button data-dismiss="modal" class="btn btn-white btnCancle" type="button">Cancel</button>
            		</div>
            	</div>
            	
            	
   				<div class="alert alert-warning information" id="information" style="display: none;"></div>
	   			
	   			
			   	<!-- 
            	<div class="row-fluid">
            		<div class='span12'>

		   				<div class='btnAssignment'>

	            			<div class='labelAssign'>Assign to:&nbsp; </div>
	            			<div class='dropdownListAssign' id='assignToArea'>
	            			
		            			<select id='assignTo' class='input form-control input-sm'>
				   				</select>
			   				</div>
			   				
			   				<div class='labelAssign'>Action:&nbsp; </div>
	            			<div class='dropdownListAssign' id='actionAssignArea'>
		            			<select id='actionAssign' class='input form-control input-sm'>
				   				</select>
			   				</div>
			   				
		   				</div>
		   				
		   				<div class='btnManagement'>
		   					<input type="hidden" name="id" id="id" value="">
		   					<input type="hidden" name="period_id_edit" id="period_id_edit" value="">
			   				<input type="hidden" name="action" id="action" value="add">
			   				<button class="btn btn-primary" type="button" id="btnSubmit">Submit</button>
			                <button data-dismiss="modal" class="btn btn-white btnCancle" type="button">Cancel</button>
			                
		   				</div>
		   				
            		
		            		
		   				<br style='clear:both'>
		   				<div class="alert alert-warning information" id="information" style="display: none;"></div>
			   			<br style='clear:both'>
			   			<br style='clear:both'>
		   			</div>
		   		
		   			
   				</div>
            	-->
           	 	
            </div>
        </div>
    </div>
    
</div>                      
<!-- Modal KPI End Edit -->


<!-- Modal Confirm Start -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="confrimModal" class="modal inmodal " style="display: none;">
    <div class="modal-dialog">
    <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only"></span></button>
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
	                </div>
                </div>
                               
                <!-- form start -->
                <!-- content end -->
            </div>
            <div class="modal-footer">
            	<div align="center">
	                <button class="btn btn-success" id="btnConfirmOK" type="button">&nbsp;&nbsp;<i class="fa fa-check-circle"></i>&nbsp;&nbsp;Yes&nbsp;&nbsp;</button>&nbsp;&nbsp;
	                <button data-dismiss="modal" class="btn btn-danger" type="button"><i class="fa fa-times-circle"></i>&nbsp;Cancel</button>
            	</div>
            </div>
        </div>
    </div>
    
    
   
</div>
<!-- Modal Confirm End -->
      
          
</body>
