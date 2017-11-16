<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet"%>
<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui"%>
<%@ page import="javax.portlet.*"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme"%>
<%@ page import="com.liferay.portal.kernel.util.WebKeys"%>
<liferay-theme:defineObjects />
<portlet:defineObjects />
<%
	String username = themeDisplay.getUser().getScreenName();
	String password = (String) request.getSession().getAttribute(WebKeys.USER_PASSWORD);
	layout = themeDisplay.getLayout();
	plid = layout.getPlid();
	//out.print(plid);
%>
<style>

/* Large desktop Start#####################################*/
@media ( min-width : 1200px) {
	.modal.large {
		width: 90%;
		margin-left: -45%;
		top: 0px;
	}
	.aui .modal-body {
		/*max-height: 400px;*/
		
	}
	.aui .displayWeightOnMobile {
		display: none;
	}
	.aui .ibox-content .control-label {
		text-align: right;
	}
	.aui .row-fluid#usageLogAdvanceSearchArea .span3 {
		width: 24.5%;
	}
	.aui #btnUsageLogSearchArea {
		width: 99.3%;
	}
}
/* Large desktop End######################################*/

/*  desktop Start#########################################*/
@media ( min-width : 980px) and (max-width: 1199px) {
	.modal.large {
		width: 90%;
		margin-left: -45%;
		top: 0px;
	}
	.aui .modal-body {
		/*max-height: 400px;*/
		
	}
	.aui .displayWeightOnMobile {
		display: none;
	}
	.aui .ibox-content .control-label {
		text-align: right;
	}
	.aui #usageLogAdvanceSearchArea.row-fluid .span3 {
		width: 32.5%;
	}
	.aui #usageLogAdvanceSearchArea.row-fluid .span9 {
		width: 98.621%;
	}
	.aui #btnUsageLogSearchArea {
		width: 98.621%;
	}
}
/*  desktop End############################################*/

/* Portrait tablet to landscape and desktop Start##########*/
@media ( min-width : 768px) and (max-width: 979px) {
	.modal.large {
		width: 90%;
		margin-left: -45%;
		top: 0px;
	}
	.pagingText {
		display: block;
	}
	.aui .p-t-xxs {
		text-align: right;
	}
	.pagianation_area {
		position: '';
	}
	.aui .modal-body {
		/*max-height: 400px;	*/
		
	}
	.checkWeigthOver {
		display: 'block';
	}
	.aui .btnManagement {
		width: '';
	}
	.aui .displayWeightOnMobile {
		display: none;
	}
	.aui .ibox-content .control-label {
		text-align: right;
	}
	.aui #usageLogAdvanceSearchArea.row-fluid .span3 {
		width: 24.2%;
	}
	.aui #usageLogAdvanceSearchArea.row-fluid .span9 {
		width: 73.909%;
	}
	.aui #btnUsageLogSearchArea {
		width: 98.731%
	}
}
/* Portrait tablet to landscape and desktop End############*/

/* Landscape phone to portrait tablet Start################*/
@media ( max-width : 767px) {
	.modal.large {
		width: '';
		top: 0px;
	}
	#grandTototalWeightArea {
		position: relative;
		top: -385px;
	}
	.aui .ibox-content .control-label {
		text-align: left;
	}
	.pagianation_area {
		/*position:absolute;*/
		
	}
	.aui .modal-body {
		/*max-height: 300px;	*/
		
	}
	.checkWeigthOver {
		display: none;
	}
	.aui .displayWeightOnMobile {
		display: inline;
	}
	.aui .btnAssignment {
		float: right;
	}
	.aui .btnManagement {
		width: 100%;
	}
	.aui .p-t-xxs {
		text-align: right;
	}
	.aui #btnUsageLogSearchArea {
		width: 100%;
	}
}
/* Landscape phone to portrait tablet End##################*/

/* Landscape phones and down Start#########################*/
@media ( max-width : 480px) {
	.pagingText {
		display: none;
	}
	.aui .ibox-content .control-label {
		text-align: left;
	}
	.pagianation_area {
		/*position:absolute;*/
		
	}
	.aui .modal-body {
		/*max-height: 300px;	*/
		
	}
	.checkWeigthOver {
		display: none;
	}
	.total_weigth_all {
		display: block
	}
	.aui .btnAssignment {
		float: '';
	}
	.aui .displayWeightOnMobile {
		display: inline;
	}
	.aui .p-t-xxs {
		text-align: left;
	}
	.aui #btnUsageLogSearchArea {
		width: 100%;
	}
}
/* Landscape phones and down End##########################*/
.breadcrumbs2 {
	background: rgba(0, 0, 0, 0)
		linear-gradient(to bottom, #fff 0px, #f6f6f6 47%, #ededed 100%) repeat
		scroll 0 0;
	border-radius: 0;
	margin-bottom: 0;
	padding-bottom: 5px;
}

.aui #usageLogAdvanceSearchArea input[type="color"], .aui input[type="date"],
	.aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="email"],
	.aui input[type="month"], .aui input[type="number"], .aui input[type="password"],
	.aui input[type="search"], .aui input[type="tel"], .aui input[type="text"],
	.aui input[type="time"], .aui input[type="url"], .aui input[type="week"],
	.aui select, .aui textarea, .aui .uneditable-input {
	margin-bottom: 0;
}

.ibox-title {
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

.branchText {
	float: left;
}

.branchPerformance {
	float: right;
	position: absolute;
	right: 5px;
	top: 5px;
}

.ui-state-active, .ui-widget-content .ui-state-active, .ui-widget-header .ui-state-active,
	a.ui-button:active, .ui-button:active, .ui-button.ui-state-active:hover
	{
	background: whitesmoke;
}

.aui h1, .aui h2, .aui h3 {
	line-height: 65px;
}

.ui-accordion .ui-accordion-content {
	padding: 5px;
}

.aui .table td {
	padding-top: 3px;
	padding-bottom: 3px;
}

.aui #noData {
	text-align: center;
	font-size: 16px;
	font-weight: bold;
	color: #993300;
	padding: 150px 0px;
}

.aui .fixed {
	position: fixed;
 	top: 36px; 
}
.aui .tableInside{
	width:100%;
}
.ui-state-active, .ui-widget-content .ui-state-active, .ui-widget-header .ui-state-active, a.ui-button:active, .ui-button:active, .ui-button.ui-state-active:hover {
	border-color: #ccc;
}
/* Let's get this party started */
::-webkit-scrollbar {
    width: 12px;
}

.aui #detailArea *{
-webkit-overflow-scrolling: touch; 
overflow:auto;
}
.aui #detailArea h3{
overflow:hidden !important;
}
 
/* /* Track */ */
/* ::-webkit-scrollbar-track { */
/*     -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  */
/*     -webkit-border-radius: 10px; */
/*     border-radius: 10px; */
/* } */
 
/* /* Handle */ */
/* ::-webkit-scrollbar-thumb { */
/*     -webkit-border-radius: 10px; */
/*     border-radius: 10px; */
/*     background: rgba(255,0,0,0.8);  */
/*     -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);  */
/* } */
/* ::-webkit-scrollbar-thumb:window-inactive { */
/* 	background: rgba(255,0,0,0.4);  */
/* } */
</style>
<input type="hidden" id="user_portlet" name="user_portlet"
	value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet"
	value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet"
	value="<%=renderRequest.getContextPath()%>">
<input type="hidden" id="plid_portlet" name="plid_portlet"
	value="<%=plid%>">

<!-- 
This is the <b>Usage Log</b> portlet in View mode.2

 -->



<div class="row-fluid app_url_hidden" style='' id='advanceSearchDisplay'>
	<!--  SEARCH ADVANCE START -->

	<div class="span12">
		<div class="ibox float-e-margins">
			<div class="ibox-title">
				<div class='titlePanel'>Advance Search</div>
			</div>
			<div class="ibox-content breadcrumbs2">


				<div class="row-fluid " id='usageLogAdvanceSearchArea'>

					<div id="appraisalTypeArea" class="form-group span2"
						style="margin-left: 5px; margin-bottom: 3px;">

						<select name="year" id="year"
							class="input form-control input-sm span12" title=""
							data-toggle="tooltip" style="cursor: pointer;"
							data-original-title="Year">

							<option value="1">2017</option>


						</select>
					</div>
					<div id='xxxArea' class="form-group span2"
						style="margin-left: 5px; margin-bottom: 3px;">
						<select name="period" id="period"
							class="input form-control input-sm span12" title=""
							data-toggle="tooltip" style="cursor: pointer;"
							data-original-title="Period">

							<option value=""></option>

						</select>
					</div>


					<div id='xxxArea' class="form-group span2"
						style="margin-left: 5px; margin-bottom: 3px;">
						<select name="region" id="region"
							class="input form-control input-sm span12" title=""
							data-toggle="tooltip" style="cursor: pointer;"
							data-original-title="Region">

							<option value="">ทุกฝ่าย</option>
							<option value="1">ฝ่ายสาขาภาคเหนือ</option>

						</select>

					</div>



					<div id='appraisalLevelArea' class="form-group span2"
						style="margin-left: 5px; margin-bottom: 3px;">
						<select name="district" id="district"
							class="input form-control input-sm span12" title=""
							data-toggle="tooltip" style="cursor: pointer;"
							data-original-title="District">

							<option value="">ทุกเขต</option>
							<option value="10">กรุงเทพมหานคร</option>

						</select>
					</div>
					<div class="form-group span2"
						style="margin-left: 5px; margin-bottom: 3px;">
						<select name="kpi" id="kpi"
							class="input form-control input-sm span12" title=""
							data-toggle="tooltip" style="cursor: pointer;"
							data-original-title="KPI">

							<option value="">KPI1</option>
							<option value="">KPI2</option>

						</select>
					</div>





					<div id='btnUsageLogSearchArea' class="form-group  m-b-none "
						style="margin-left: 5px; margin-bottom: 3px; text-align: right;">
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

<!-- 
	<button id='btnCreateMap'>Create Map</button>		
	<button id='btnCreateGoogleMap'>Create Google Map</button>	
	 -->
<div class="row-fluid ">

	<div class='span6' id='mapArea'>
		<!-- 
   		<div id='mapPerfomanceArea'  style='height:597px;'></div>
   		<div id='mapGooglePerfomanceArea' style='width:500px; height:500px;'></div>
   	    -->
	</div>
	<div class='span6' id='detailArea' style='display: none;'>


		<h3 style='text-align: center; color: black;' id='BranchPerTitle'></h3>
		<div id="detailPerfomanceArea">

			<!-- 
			  <h3><span style='padding-top:10px;'>สาขา: เซ็นต์หลุยส์ 3</span>
	   			
	   
				 	
				 	<div class='branchPerformance'>
				  		<svg id="fillgauge2" width="70px" height="70px" onclick="gauge1.update(NewValue());"></svg>
				   	</div>
				   	<br style='clear:both'>
	   			</h3>
	   			
			  <div>
			    <p>
			    Sed non urna. Donec et ante. Phasellus eu ligula. Vestibulum sit amet
			    purus. Vivamus hendrerit, dolor at aliquet laoreet, mauris turpis porttitor
			    velit, faucibus interdum tellus libero ac justo. Vivamus non quam. In
			    suscipit faucibus urna.
			    </p>
			  </div>
			  
			  <h3><span style='padding-top:10px;'>สาขา: ดอนเมือง</span>
	   			
	   
				 	
				 	<div class='branchPerformance'>
				  		<svg id="fillgauge3" width="70px" height="70px" onclick="gauge1.update(NewValue());"></svg>
				   	</div>
				   	<br style='clear:both'>
	   			</h3>
	   			
			  <div>
			    <p>
			    Nam enim risus, molestie et, porta ac, aliquam ac, risus. Quisque lobortis.
			    Phasellus pellentesque purus in massa. Aenean in pede. Phasellus ac libero
			    ac tellus pellentesque semper. Sed ac felis. Sed commodo, magna quis
			    lacinia ornare, quam ante aliquam nisi, eu iaculis leo purus venenatis dui.
			    </p>
			    <ul>
			      <li>List item one</li>
			      <li>List item two</li>
			      <li>List item three</li>
			    </ul>
			  </div>
			  
			  <h3><span style='padding-top:10px;'>สาขา: สะพานสูง</span>
	   			
	   
				 	
				 	<div class='branchPerformance'>
				  		<svg id="fillgauge4" width="70px" height="70px" onclick="gauge1.update(NewValue());"></svg>
				   	</div>
				   	<br style='clear:both'>
	   			</h3>
			  <div>
			    <p>
			    Cras dictum. Pellentesque habitant morbi tristique senectus et netus
			    et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in
			    faucibus orci luctus et ultrices posuere cubilia Curae; Aenean lacinia
			    mauris vel est.
			    </p>
			    <p>
			    Suspendisse eu nisl. Nullam ut libero. Integer dignissim consequat lectus.
			    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
			    inceptos himenaeos.
			    </p>
			  </div>
			 -->





		</div>
	</div>

</div>



<div id='embedParamSearch'></div>
<!-- 
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAK3RgqSLy1toc4lkh2JVFQ5ipuRB106vU&callback=initMap" async defer></script>
 -->
<script
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCPuP76ST9iq964sAptAX-tZ9KVa-LXgSI"
	async defer></script>









