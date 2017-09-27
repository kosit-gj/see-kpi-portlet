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
//out.print(plid);

%>
<style>
	
	
	
	
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
	
	

	
	.aui .row-fluid#usageLogAdvanceSearchArea .span3{
		width: 24.5%;
	}
	.aui #btnUsageLogSearchArea{
		width: 99.3%;
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
	
	.aui #usageLogAdvanceSearchArea.row-fluid .span3 {
    	width: 32.5%;
	}
	
	.aui #usageLogAdvanceSearchArea.row-fluid .span9 {
	    width: 98.621%;
	}
	
	.aui #btnUsageLogSearchArea{
		width: 98.621%;
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
	
	.aui #usageLogAdvanceSearchArea.row-fluid .span3 {
	    width: 24.2%;
	}
	
	.aui #usageLogAdvanceSearchArea.row-fluid .span9 {
	    width: 73.909%;
	}
	
	.aui #btnUsageLogSearchArea{
		width:98.731%
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
	.aui #btnUsageLogSearchArea{
		width: 100%;
		
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
	
	.aui #btnUsageLogSearchArea{
		width: 100%;
		
	}
  }
  /* Landscape phones and down End##########################*/
  
  
  .breadcrumbs2 {
    background: rgba(0, 0, 0, 0) linear-gradient(to bottom, #fff 0px, #f6f6f6 47%, #ededed 100%) repeat scroll 0 0;
    border-radius: 0;
    margin-bottom: 0;
    padding-bottom: 5px;
}

.aui #usageLogAdvanceSearchArea input[type="color"], .aui input[type="date"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="email"], .aui input[type="month"], .aui input[type="number"], .aui input[type="password"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="text"], .aui input[type="time"], .aui input[type="url"], .aui input[type="week"], .aui select, .aui textarea, .aui .uneditable-input{
	margin-bottom: 0;
}
.ibox-title{
	min-height: 30px;
}
.aui #breadcrumbs {
    margin-bottom: 0;
}

.aui .table {
    margin-bottom: 0;
}
.aui .pagination {
    margin: 0;
}
</style>
<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">
<input type="hidden" id="plid_portlet" name="plid_portlet" value="<%= plid %>">

<!-- 
This is the <b>Usage Log</b> portlet in View mode.2

 -->


				
<div class="row-fluid" style='display:none;' id='advanceSearchDisplay'>
	<!--  SEARCH ADVANCE START -->
            
            <div class="span12">
                    <div class="ibox float-e-margins">
                        <div class="ibox-title"> 
                             <div class='titlePanel'>Advance Search</div>
                        </div>
                        <div class="ibox-content breadcrumbs2"> 
         					
         					
         					<div  class="row-fluid " id='usageLogAdvanceSearchArea'>
									
									<div id="appraisalTypeArea" class="form-group span3"
										style="margin-left: 5px; margin-bottom: 3px;">
										<select data-toggle="tooltip" title="Entity Type"
											class="input form-control input-sm span12" id="appraisalType"
											name="appraisalType">
								
											<option value="">Appraisal Type</option>
								
										</select>
									</div>
									 <div id="empNameArea" class="form-group span3"
										style="margin-left: 5px; margin-bottom: 3px;">
										<input data-toggle="tooltip" type="text" class="form-control input-sm span12 "
											placeholder="Emp Name" id="empName" data-original-title="Employee Name">
									</div>
									 <div id="PositionArea" class="form-group span3"
										style="margin-left: 5px; margin-bottom: 3px;">
										<input data-toggle="tooltip" type="text" id="Position" placeholder="Position"
											class="form-control input-sm span12" data-original-title="Position">
									</div>
									
									
									
									<div id='appraisalLevelArea' class="form-group span3"
										style="margin-left: 5px; margin-bottom: 3px;">
										<select data-toggle="tooltip" title="Level"
											class="input form-control input-sm span12" id="appraisalLevel"
											name="appraisalLevel">
								
											<option value="">Level</option>
								
								
										</select>
									</div>
									<div class="form-group span3" style="margin-left: 5px; margin-bottom: 3px;">
										<select data-toggle="tooltip" title="" data-original-title="organization"
											class="input form-control input-sm span12" id="organization"
											name="organization">
											<option value=''>All Organization</option>
										</select>
									</div>
									
									
									
									 <div id="usageStartDateArea" class="form-group span3"
										style="margin-left: 5px; margin-bottom: 3px;">
										<input data-toggle="tooltip" type="text" id="usage_start_date" placeholder="Usage Start Date"
											class="form-control input-sm span12" data-original-title="Usage Start Date">
									</div>
									
									 <div id="usageEndDateArea" class="form-group span3"
										style="margin-left: 5px; margin-bottom: 3px;">
										<input data-toggle="tooltip" type="text" id="usage_end_date" placeholder="Usage End Date"
											class="form-control input-sm span12" data-original-title="Usage End Date">
									</div>
									

								<div id='btnUsageLogSearchArea' class="form-group  m-b-none " style="margin-left: 5px; margin-bottom: 3px; text-align: right;  ">
									<button type="button" class="btn btn-info input-sm"
										name="btnSearchAdvance" id="btnSearchAdvance">
										<i class="fa fa-search"></i>&nbsp;Search
									</button>
									
								</div>
							
							</div>	
							
							
							
         					
				         </div>	
                    </div>
                </div>
            
            <!-- SEARCH ADVANCE END -->
</div>
				
<div class="row-fluid display_result" style='display:none;'>

    <div class="span12">
        <div class="ibox float-e-margins">
            <div class="ibox-title">
                  </div>
                  <div class="ibox-content">
                   
                   
                					<!-- pagination start -->
                                   	<div class="row-fluid" style='margin-bottom:0px;'>
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
              <div class='row-fluid'>
              	<div class=''> 
	                <div class="table-responsive">
	        
	                    <!--  main table  start-->
	               		  <table class="table" id="mainTableUsageLog">
	               		  <thead>
	                        <tr  class="active">
								<!-- <th>Usage Log.</th> -->
								
	                        </tr>
	                        </thead>
		               		  	<tbody id="listMainUsageLog">	
			               		<tbody>
	               		  	</table>
	               		<!--  main table end -->
	                </div>
                </div>    
                </div>
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
                <br style='clear:both'>
            </div>
        </div>
    </div>

</div>
<div id='embedParamSearch'></div>







 

