<%@ page contentType="text/html; charset=UTF-8" %>




<form name="searchAdvanceForm">
	<div class="ibox float-e-margins">
		<div class="ibox-title" style="background-color: rgb(199, 131, 27); border-color: rgb(199, 131, 27); padding: 1px;">
		<div class="titlePanel" style="padding-left: 10px; padding-bottom: 10px;">Advance Search</div>
		<div class="ibox-content breadcrumb" style="border-color: rgb(199, 131, 27); padding: 20px;" >
		<div class="span9">
		<div class="form-group pull-left span3" style="margin-left:5px">
			<select data-toggle="tooltip" data-original-title="Appraisal Year" class="span12 m-b-n"  name="appraisal_year" style="width: 100%; cursor: pointer;  margin-top: -22px;">
				<option value="2017">2017</option>
				<option value="2018">2018</option>
				<option value="2019">2019</option>
			</select>
		</div>
		<div class="form-group pull-left span3" style="margin-left:5px">
			<select data-toggle="tooltip" data-original-title="level" class="span12 m-b-n"  name="appraisal_level" style="width: 100%; cursor: pointer;  margin-top: -22px;">
				<option value="1">All</option>
				<option value="2">Branch</option>
				<option value="3">Corporate</option>
				<option value="5">Department</option>
				<option value="6">Director</option>
				<option value="7">District</option>
				<option value="8">Division</option>
				<option value="9">Group</option>
				<option value="10">Manager</option>
				<option value="11">MD</option>
				<option value="12">Officer</option>
				<option value="13">Operator</option>
				<option value="14">Section</option>
				<option value="15">SubSection</option>
				<option value="16">Supervisor</option>
			</select>
		</div>
		</div>
		<div class="span3 " align="right">
		<div >
			<button style="margin-bottom: 5px;  margin-top: -22px;" type="submit" class="btn btn-info input-sm" name="btnSearchAdvance" ><i class="fa fa-search"></i>&nbsp;Search</button>
		</div>
		</div>
		</div>
		</div>
		</div>
</form>
<div class="row-fluid resultArea"  ><!-- style="display: block;" -->
		
		<div class="ibox-title" style="background-color: rgb(199, 131, 27); border-color: rgb(199, 131, 27); padding: 1px;">
	    <div id="titlePanel" class="titlePanel" style="padding-left: 10px;">Position List</div>
	    </div>
	    <div class="ibox-content breadcrumb" style="border-color: rgb(199, 131, 27);"> 
	      <div class="row-fluid ">
	         <div class="spen9">         								
		          <button style="margin-bottom: 5px;" type="button" class="btn btn-warning input-sm"   data-backdrop="static" data-keyboard="false"><i class=" icon-download-alt"></i><span id="btnAddData">&nbsp;Download</span></button>
		          <button style="margin-bottom: 5px;" type="button" class="btn btn-success input-sm" name="btnCreate"><i class="fa fa-upload" aria-hidden="true"></i>&nbsp;import</button></span>
		         
		         
	         </div>                                     	
            <div class="spen3"><!--  id="expressSearchArea" -->
                                     		
				                       		<!--  <div class="input-group"><input type="text" class="input-sm form-control" id="searchText" placeholder="Search"> <span class="input-group-btn">
				                          		<button id="btnSearch" class="btn btn-sm btn-primary" type="button">&nbsp;<i class="fa fa-search"></i></button> </span>
				                          	</div> 
				                          	-->
				                          	 
			</div>
     	 </div>
                                    	<!-- start table -->
                                    	<!-- pagination start -->
         <div class="row-fluid paginationControl" style="display: none;">
	     <div class="span6 " id="paginationTop">
		  	<span class="pagination_top pagination">
												<!-- Test -->
												<!-- 
												<span class="pagination_top"><ul class="pagination bootpag"><li class="first disabled" data-lp="1"><a href="javascript:void(0);">à¸£à¸‚à¹‚â‚¬Â&nbsp;à¹�à¸Ÿà¸�</a></li><li class="prev disabled" data-lp="1"><a href="javascript:void(0);">prev</a></li><li data-lp="1" class="active"><a href="javascript:void(0);">1</a></li><li data-lp="2"><a href="javascript:void(0);">2</a></li><li data-lp="3"><a href="javascript:void(0);">3</a></li><li class="next" data-lp="2"><a href="javascript:void(0);">next</a></li><li class="last" data-lp="3"><a href="javascript:void(0);">à¸£à¸‚à¹‚â‚¬Â&nbsp;à¹‚â‚¬ï¿½</a></li></ul></span>
												 -->
												<!-- Test -->
												</span>
	    </div>
		<div class="span6 object-right ResultsPerPageTop">		                                    
		<div id="dropdownPaginationTop" class="pagingDropdown">
			<select id="countPaginationTop" class="form-control input-sm countPagination">
					 <option>10</option>
					 <option>20</option>
					 <option>50</option>
					 <option>100</option>
			</select>		                                 		
		</div>
		<div class="pagingText">Results per page</div>		                                    
		</div>		                                   
        </div> 
                                    	 <!-- pagination end -->
                                    	 
        <div class="table-responsive" id="tableArea" style="overflow:auto;">
        <table class="table table-striped" id="table-appraisalPeriod" style="max-width: none;">   
         <thead>        
         <tr>            
         <th style="width:15%"><b>ปี</b></th>            
         <th style="width:15%"><b>ระดับ</b></th>            
         <th style="width:20%"><b>ขั้น</b></th>            
         <th style="width:20%"><b>เงินเดือน</b></th>            
         <th style="width:20%"><b>Is Active</b></th>                     	 	
         <th style="text-align:center;"><b>Manage</b></th>        
         </tr>    
         </thead>    
         <tbody id="listData">    	
         <tr class="rowSearchappraisalPeriod">    	
         <td >2018</td>    		
         <td>ระดับ 6</td>    		
         <td>1 </td>    		
         <td>14,160</td>    		
         <td ><input type="checkbox" checked="checked"></td>    		
         <td style="text-align:center">    		
         <i data-trigger="focus" tabindex="0" data-content="			
         <button class='btn btn-warning btn-small btn-gear edit' id='edit-1' data-target=#addModalRule data-toggle='modal'>Edit</button>&nbsp;
         <button id='del-1' class='btn btn-danger btn-small btn-gear del'>Delete</button>" data-placement="top" data-toggle="popover" data-html="true" class="fa fa-cog font-gear popover-edit-del" data-original-title="" title="">
         </i>    	
         </td>    
         </tr>    	
         <tr class="rowSearchappraisalPeriod">    	
         <td >2018</td>    		
         <td>ระดับ 6</td>    		
         <td>1.5 </td>    		
         <td>14,590</td>    		
         <td ><input type="checkbox" checked="checked"></td>    		
         <td style="text-align:center">    		
         <i data-trigger="focus" tabindex="0" data-content="			
         <button class='btn btn-warning btn-small btn-gear edit' id='edit-1' data-target=#addModalRule data-toggle='modal'>Edit</button>&nbsp;
         <button id='del-1' class='btn btn-danger btn-small btn-gear del'>Delete</button>" data-placement="top" data-toggle="popover" data-html="true" class="fa fa-cog font-gear popover-edit-del" data-original-title="" title="">
         </i>    	
         </td>    
         </tr>    	
          <tr class="rowSearchappraisalPeriod">    	
         <td >2018</td>    		
         <td>ระดับ 6</td>    		
         <td>2 </td>    		
         <td>15,000</td>    		
         <td ><input type="checkbox" checked="checked"></td>    		
         <td style="text-align:center">    		
         <i data-trigger="focus" tabindex="0" data-content="			
         <button class='btn btn-warning btn-small btn-gear edit' id='edit-1' data-target=#addModalRule data-toggle='modal'>Edit</button>&nbsp;
         <button id='del-1' class='btn btn-danger btn-small btn-gear del'>Delete</button>" data-placement="top" data-toggle="popover" data-html="true" class="fa fa-cog font-gear popover-edit-del" data-original-title="" title="">
         </i>    	
         </td>    
         </tr>   	
          <tr class="rowSearchappraisalPeriod">    	
         <td >2018</td>    		
         <td>ระดับ 6</td>    		
         <td>2.5 </td>    		
         <td>15,4400</td>    		
         <td ><input type="checkbox" checked="checked"></td>    		
         <td style="text-align:center">    		
         <i data-trigger="focus" tabindex="0" data-content="			
         <button class='btn btn-warning btn-small btn-gear edit' id='edit-1' data-target=#addModalRule data-toggle='modal'>Edit</button>&nbsp;
         <button id='del-1' class='btn btn-danger btn-small btn-gear del'>Delete</button>" data-placement="top" data-toggle="popover" data-html="true" class="fa fa-cog font-gear popover-edit-del" data-original-title="" title="">
         </i>    	
         </td>    
         </tr>   	
         <tr class="rowSearchappraisalPeriod">    	
         <td >2018</td>    		
         <td>ระดับ 6</td>    		
         <td>3 </td>    		
         <td>15,890</td>    		
         <td ><input type="checkbox" checked="checked"></td>    		
         <td style="text-align:center">    		
         <i data-trigger="focus" tabindex="0" data-content="			
         <button class='btn btn-warning btn-small btn-gear edit' id='edit-1' data-target=#addModalRule data-toggle='modal'>Edit</button>&nbsp;
         <button id='del-1' class='btn btn-danger btn-small btn-gear del'>Delete</button>" data-placement="top" data-toggle="popover" data-html="true" class="fa fa-cog font-gear popover-edit-del" data-original-title="" title="">
         </i>    	
         </td>    
         </tr>    	
          <tr class="rowSearchappraisalPeriod">    	
         <td >2018</td>    		
         <td>ระดับ 6</td>    		
         <td>3.5 </td>    		
         <td>16,350</td>    		
         <td ><input type="checkbox" checked="checked"></td>    		
         <td style="text-align:center">    		
         <i data-trigger="focus" tabindex="0" data-content="			
         <button class='btn btn-warning btn-small btn-gear edit' id='edit-1' data-target=#addModalRule data-toggle='modal'>Edit</button>&nbsp;
         <button id='del-1' class='btn btn-danger btn-small btn-gear del'>Delete</button>" data-placement="top" data-toggle="popover" data-html="true" class="fa fa-cog font-gear popover-edit-del" data-original-title="" title="">
         </i>    	
         </td>    
         </tr>  
         			</tbody>
         			</table>
         			</div>
                                       
             <div class="row-fluid paginationControl" style="display: none;">
	         <div class="span6 ">
				<span class="pagination_bottom pagination">
												<!-- Test -->
												<!-- 
												<span class="pagination_top"><ul class="pagination bootpag"><li class="first disabled" data-lp="1"><a href="javascript:void(0);">à¸£à¸‚à¹‚â‚¬Â&nbsp;à¹�à¸Ÿà¸�</a></li><li class="prev disabled" data-lp="1"><a href="javascript:void(0);">prev</a></li><li data-lp="1" class="active"><a href="javascript:void(0);">1</a></li><li data-lp="2"><a href="javascript:void(0);">2</a></li><li data-lp="3"><a href="javascript:void(0);">3</a></li><li class="next" data-lp="2"><a href="javascript:void(0);">next</a></li><li class="last" data-lp="3"><a href="javascript:void(0);">à¸£à¸‚à¹‚â‚¬Â&nbsp;à¹‚â‚¬ï¿½</a></li></ul></span>
												 -->
												<!-- Test -->
												
				</span>
	         </div>
	                                    
		     <div id="dropdownPaginationBottom" class="span6 object-right ResultsPerPageBottom">
		                                    
		           <div class="pagingDropdown">
		                <select id="countPaginationBottom" class="form-control input-sm countPagination">
					         <option>10</option>
					         <option>20</option>
					         <option>50</option>
					         <option>100</option>
					    </select> 
			        </div>
			<div class="pagingText">Results per page</div>
		    </div>                                  	 
            </div> 
                                    	
                                    	<!-- end table -->
           <br style="clear:both">
     </div><!-- content end -->
     </div>