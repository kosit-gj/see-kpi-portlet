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

.ui-multiselect-menu{
	z-index: 5555;
}
.ui-multiselect{
	padding: 5px;
}
.ui-corner-all, .ui-corner-top, .ui-corner-right, .ui-corner-tr{
	border-top-right-radius: 0;
}

.ui-corner-all, .ui-corner-top, .ui-corner-left, .ui-corner-tl{
	border-top-left-radius: 0;
}

.ui-corner-all, .ui-corner-bottom, .ui-corner-left, .ui-corner-bl{
	border-bottom-left-radius: 0;
}

.ui-corner-all, .ui-corner-bottom, .ui-corner-right, .ui-corner-br{
	border-bottom-right-radius: 0;
}
.ui-multiselect-header span.ui-icon{
	top: 5px;
}
.aui ul, .aui ol{
	margin: 0px 0px 0px 0px;
}
.ui-icon{
	 margin-top: 0;
}
.aui input[type="radio"], .aui input[type="checkbox"]{
	margin: -5px 0 0;
}
.aui label{
	margin-bottom: 0px;
}
.ui-multiselect-checkboxes li{
	padding-right: 0px;
}
.aui form{
	margin: 0 0 5px;
}
.aui .filter{
	margin-bottom: 5px;
    margin-top: 5px;
}
.aui .form-group > .control-label-search{
	padding-top: 5px;
}

 /* Large desktop Start#####################################*/
 @media (min-width: 1200px) { 

	.modal.large {
		    width: 90%;
		    margin-left:-45%;  
		    top:0px;
		}
		
	.modal.medium {
		    width: 50%;
		    margin-left:-25%;  
		    top:0px;
		}
	
		/*Qauntity Start*/
		.form-label-quantity{
		text-align: right;
		}
		.form-input-customs-title{
			width: 250px;
		}
		.aui .redFont{
 		
	 		  float: right;
	 	}
	 	.form-label-customs{
	 		text-align: right;
	 	}
	 	.aui .row-fluid .span4{
			width: 32.624%;
		}
		
		#positionBox{
			width:49.718%
		}
		#organizationBox{
			width:49.718%
		}
		#formulaDescriptionAreaQuantity{
		width:72.5%;
		}
		/*Quantity End*/
		
	 	.ibox-content .row-fluid .span4{
			width: 32.831%;
		}
			
  }
  /* Large desktop End######################################*/
  
  /*  desktop Start#########################################*/
 @media (min-width: 980px) and (max-width: 1199px) {
 
 	body{
 	 background:red;
 	}
 	.modal.large {
		    width: 90%;
		    margin-left:-45%;  
		    top:0px;
		}
		
		.modal.medium {
		    width: 50%;
		    margin-left:-25%;  
		    top:0px;
		}
		/*All Start*/
		.aui #btnSearchAdvance{
		margin-bottom:5px;
		width:100%;
		}
		.aui #btnCoppy{
			width:100%;
		}
		/*All End*/
		
		/*Qauntity Start*/
		.form-label-quantity{
		text-align: left;
		}
		.form-input-customs-title{
			width: 250px;
		}
		.aui .redFont{
 		
	 		  float: right;
	 	}
	 	.form-label-customs{
	 		text-align: right;
	 	}
	 	.aui .row-fluid .span4{
			width: 32.624%;
		}
		#positionBox{
			width:100%
		}
		#organizationBox{
			width:100%
		}
		/*
		#formulaDescriptionLabelAreaQuantity{
			width:100%;
		}
		*/
		#formulaDescriptionAreaQuantity{
			width:75%;
		}
		/*Quantity End*/
		
		 .ibox-content .row-fluid .span4{
		width: 32.69%;
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
	.modal.medium {
		    width: 50%;
		    margin-left:-25%;  
		    top:0px;
		}
		
	.aui .ibox-title2{
		height:32px;
	}
	
	.aui .btnAdd{
		position: relative;
   		top: 0px;
	}
	/*All Form Start*/
	.aui .modal-body{
		max-height: 400px;
	}
	.aui #btnSearchAdvance{
		margin-bottom:5px;
		width:100%;
	}
	.aui #btnCoppy{
		width:100%;
	}
	
	/*All Form End*/
	/*Deduct Score Start*/
 	.aui .form-file-mangement{
 		height: 45px;
 	}
 	.aui .form-label-customs{
 		text-align: right;
 	}
 	
 	.aui .redFont{
 		
 		  float: right;
 	}
 	/*Deduct Score Start*/
 	
 	/*Qauntity Start*/
 	.form-label-quantity{
		text-align: left;
		}
	.form-input-customs-title{
		width: 250px;
	}
	.aui .redFont{
 		
 		  float: left;
 	}
 	.aui .pagianation_area{
		/*position:relative;*/
	}
	.aui #textarea_cds{
		height: 150px;
	}
	
	#positionBox{
		width:100%
	}
	#organizationBox{
		width:100%
	}
	#formulaDescriptionAreaQuantity{
		width:100%;
	}
	#formulaDescriptionLabelAreaQuantity{
		width:100%;
	}
	/*Qauntity End*/
	.ibox-content .row-fluid .span4{
		width: 32.4917%
	}
	
  }
 /* Portrait tablet to landscape and desktop End############*/ 
 
 /* Landscape phone to portrait tablet Start################*/
 @media (max-width: 767px) { 
 
 
 .modal.large {
 	
	    width: '';
	    top:0px;    
	}
	
	.modal.medium {
		   width: '';
	   	   top:0px;  
		}
	
 	.pagingText{
 		display:none;
 	}
 	#btnPaginationTop{
 		width:300px;
 		float:left;
 	}
	#dropdownPaginationTop{
		width:100px;
 		float:right;
	}
	#btnPaginationBottom{
 		width:300px;
 		float:left;
 	}
	#dropdownPaginationBottom{
		width:100px;
 		float:right;
	}
	.aui .form-group > .control-label-search {
    	text-align: left;
	}
	
	.aui .ibox-title2{
	/*
		height:63px;
		*/
		height:32px;
	}
	
	.aui .btnAdd{
		position: relative;
		/*
   		top: -22px;
   		*/
   		top: 0px;
	}
	/*All Form Start*/
	.aui .modal-body{
		max-height: 350px;
	}
	/*All Form End*/
	/*Deduct Score Start*/
 	.aui .form-file-mangement{
 		height: 50px;
 	}
 	.aui .form-label-customs{
 		 text-align: left;
 	}
 	.aui .redFont{
 		 
 		  float: left;
 	}
 	#modalDeductScoreDescription{
 		font-size:25px;
 	}
 	
 	/*Deduct Score Start*/
 	/*Quality Start*/
 	#modalQualityDescription{
 		font-size:25px;
 	}
 	/*Quality End*/
 	
 	/*Quantity Start*/
 	#modalTitleQuantity{
 		font-size:25px;
 	}

 	.form-label-quantity{
		text-align: left;
	}
	
	.form-input-customs-title{
		width: 250px;
	}
	#cdsNameLabel{
		display:none;
	}
	.aui .pagianation_area{
		/*position:absolute;*/
	}
	.aui #textarea_cds{
		height: 77px;
	}
	.titleQuantityForm{
 		display:none;
 	}
	
	#positionBox{
		width:100%
	}
	#organizationBox{
		width:100%
	}
	#formulaDescriptionAreaQuantity{
		width:100%;
	}
	#formulaDescriptionLabelAreaQuantity{
		width:100%;
	}
 	/*Quantity End*/
 	
 	 .ibox-content .row-fluid .span4{
		width: 100%
	}
	
  }
 /* Landscape phone to portrait tablet End##################*/ 
 
 /* Landscape phones and down Start#########################*/
 @media (max-width: 480px) { 
 	
 	
 
 	#btnPaginationTop{
 		width:300px;
 		float:left;
 	}
	#dropdownPaginationTop{
		width:100px;
 		float:right;
	}
	#btnPaginationBottom{
 		width:300px;
 		float:left;
 	}
	#dropdownPaginationBottom{
		width:100px;
 		float:right;
	}
	.aui .form-group > .control-label-search{
    	text-align: left;
	}
	
	.aui .ibox-title2{
	/*
		height:63px;
	*/
		height:32px;
	}
	
	.aui .btnAdd{
		position: relative;
		/*
   		top: -22px;
   		*/
   		top: 0px;
	}
	/*All Form Start*/
	/*
	.aui .modal-body{
		max-height: 300px;
	}
	*/
	/*All Form End*/
 	
 	/*Deduct Score Start*/
 	.aui .form-file-mangement{
 		height: 50px;
 	}
 	.aui .form-label-customs{
 		 text-align: left;
 		 
 	}
 	.aui .redFont{
 		
 		 float: left;
 	}
 	#modalDeductScoreDescription{
 		font-size:20px;
 	}
 	/*Deduct Score Start*/
 	/*Quality Start*/
 	#modalQualityDescription{
 		font-size:20px;
 	}

 	/*Quality End*/
 	
 	/*Quantity Start*/
 	#modalTitleQuantity{
 		font-size:20px;
 	}
 	.form-label-quantity{
		text-align: left;
	}
	.form-input-customs{
		width: 100%;
	}
	#cdsNameLabel{
		display:none;
	}
	.paging-text2{
		display:none;
	}
	.form-input-customs-title{
		width: 100%;
	}
	.aui .pagianation_area{
		/*position:static;*/
	}
	.aui .pagingDropdown{
		float: left;
	}
	.aui #textarea_cds{
		height: 77px;
	}
	#formulaDescriptionAreaQuantity{
		width:100%;
	}
	#formulaDescriptionLabelAreaQuantity{
		width:100%;
	}
 	/*Quantity End*/
 	
 	.aui .ibox-title2 .btn{
 		font-size:12px;
 	}
 	.titleQuantityForm{
 		display:none;
 	}
 	
 	#positionBox{
		width:100%
	}
	#organizationBox{
		width:100%
	}
	
	.ibox-content .row-fluid .span4{
		width: 100%
	}

  }
  /* Landscape phones and down End##########################*/
  
  
  
  /* main start*/
        table {
            width: 100%;
        }
        .aui #breadcrumbs {
		    margin-bottom: 0px;
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
	    padding: 10px 10px 10px;
	}
	/*
	.aui #modal-quantity{
    background-clip: padding-box;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    left: 34%;
    margin-left: -280px;
    outline: 0 none;
    position: fixed;
    top: 0%;
    width: 1000px;
    z-index: 1050;
    */
}
.aui .modal-footer {
    background-color: #f5f5f5;
    border-radius: 0;
    border-top: 1px solid #ddd;
    box-shadow: 0 1px 0 white inset;
    margin-bottom: 0;
    padding: 14px 15px 15px;
    text-align: right;
}
.aui select {
    background-color: white;
    border: 1px solid #ccc;
    width: 100%;
}
.aui input{
	width: 100%;
}

.ibox-content {
    background-color: #fff;
    border: 1px solid #ffe57f;
    color: inherit;
    margin-bottom: 5px;
    padding: 5px;
}
.aui .table th, .aui .table td {
    border-top: 1px solid #ddd;
    line-height: 20px;
    padding-bottom: 3px;
    padding-right: 0;
    padding-top: 3px;
    text-align: left;
    vertical-align: top;
}
.aui .pagination {
    margin: 0;
}
.display-none{
	display:none;
}
.pagingText {
    float: right;
    margin-right: 5px;
    padding-top: 5px;
}
.gray-bg {
    background-color: #f3f3f4;
}

.ibox-content {
    background-color: #fff;
    border: 1px solid #ffe57f;
    color: inherit;
    margin-bottom: 5px;
    padding-left: 15px;
    padding-right: 15px;
}
/*
.aui .portlet-content, .aui .portlet-minimized .portlet-content-container {
    -moz-border-bottom-colors: none;
    -moz-border-left-colors: none;
    -moz-border-right-colors: none;
    -moz-border-top-colors: none;
    background: #f3f3f4 none repeat scroll 0 0;
    border-color: #eaeaea;
    border-image: none;
    border-style: solid;
    border-width: 0 1px 1px;
    padding: 1px 10px 10px;
}
*/
.form-file-mangement {
    height: 37px;
}
.form-label-customs{
	font-weight: bold;
}
.aui hr{
	margin: 10px 0;
}
/* main end*/

/*local start*/
/*
.aui #modal-quality{
    background-clip: padding-box;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    left: 50%;
    margin-left: -280px;
    outline: 0 none;
    position: fixed;
    top: 10%;
    width: 500px;
    z-index: 1050;
}
*/
.form-label-customs {
    float: left;
    padding-top: 1px;
    width: 170px;
    /*text-align:right;*/
}

.form-label-quantity {
    float: left;
    padding-top: 1px;
    width: 170px;
    font-weight:bold;
    /*text-align:right;*/
}

.form-group > .control-label-search{
	/*font-weight:bold;*/
	text-align:right;
}

.breadcrumbs2{

	background: rgba(0, 0, 0, 0) linear-gradient(to bottom, #fff 0px, #f6f6f6 47%, #ededed 100%) repeat scroll 0 0;
    border-radius: 0;
    margin-bottom: 0;
  	padding-bottom: 5px

}
.wrapper-content{
	padding: 10px;
}
.aui .table thead th{
	font-weight:bold;
}
.aui .form-group > .control-label-search{
   	/*font-weight:bold;*/
}
.aui .pagination{
 /*display:absolute;*/
}
.aui .popover-content{
padding:5px;
}

/*
.aui .modal-body{
overflow-y: visible;
}
*/
/*
.modal{
    max-height: calc(100vh - 0px);
    overflow-y: auto;
}*/

.aui .table th, .aui .table td{
	font-size: 13px;
}
.aui .countPagination2{
	height:30px;
}

/*local end*/
/* Update by au */
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

.aui .ibox-content input[type="color"], .aui input[type="date"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="email"], .aui input[type="month"], .aui input[type="number"], .aui input[type="password"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="text"], .aui input[type="time"], .aui input[type="url"], .aui input[type="week"], .aui select, .aui textarea, .aui .uneditable-input{
	margin-bottom: 5px;
}
#formulaDescriptionAreaQuantity{
	float:left;
}


/* .portlet-borderless-container{ */
/*  position: unset; */
/* } */
.ui-state-default{
	width: 100% !important;
}
</style>
<body class=" gray-bg ">
<!--  #####################Content data here ######################-->
<div class="app_url_hidden">
<div class="container1">
<div class='row-fluid'>
	<div id="slide_status" class='span12'>
		<div id="btnCloseSlide">×</div>
		<div id="slide_status_area"></div>
	</div>
</div>
<!-- 
<h2><i class="fa fa fa-pencil-square-o icon-title"></i> <span id="modalDescription"> Appraisal Item</span> </h2>
 -->   


				<div class="row-fluid"><!-- start--row-fluid -->

                    <div class="span12">
                        <div class="ibox float-e-margins">
                            <div class="ibox-title">
                               
                                  <div class='titlePanelSearch'>Advance Search</div> 
         					</div>
         					
         						<div class="ibox-content breadcrumbs2">
							<div class="row-fluid p-t-xxs">
									
									<div id="appraisalLevelArea" class="form-group pull-left span4" style="margin-left: 5px">
											<select data-toggle="tooltip" title="Level"
											class="input form-control input-sm" id="appraisalLevel"
											name="appraisalLevel">

											<option value="0"></option>

										</select>
									</div>
									
									<div id="OrganizationArea"
										class="form-group pull-left span4" style="margin-left: 5px">
										<input data-toggle="tooltip" title="Organization "
											placeholder="Organization " type='text'
											name='Organization'
											class='input form-control input-sm span12'
											id='Organization'>
									</div>
									 
									 
									<div id="structureArea" class="form-group pull-left span4"
										style="margin-left: 5px">
										<select data-toggle="tooltip" title="Structure"
											class="input form-control input-sm" id="structure"
											name="structure">

											<option value="0"></option>

										</select>
									</div>
									
									 
									 <div id="kpiTypeArea" class="form-group pull-left span4"
										style="margin-left: 5px">
										<select data-toggle="tooltip" title="KPI Type"
											class="input form-control input-sm" id="kpiType"
											name="kpiType">

											<option value="0"></option>

										</select>
									</div>
									<div id="appraisalItemNameArea"
										class="form-group pull-left span4" style="margin-left: 5px">
										<input data-toggle="tooltip" title="KPI"
											placeholder="KPI" type='text'
											name='appraisalItemName'
											class='input form-control input-sm span12'
											id='appraisalItemName'>
									</div>
									
									
									<div id="perspectiveArea" class="form-group pull-left span4"
										style="margin-left: 5px">
										<select data-toggle="tooltip" title="Perspective"
											class="input form-control input-sm" id="perspective"
											name="perspective">

											<option value="0"></option>

										</select>
									</div>
									
									 <!-- 
									<div id="DepartmentArea" class="form-group pull-left span3"
										style="margin-left: 5px">
										<select data-toggle="tooltip" title="Department"
											class="input form-control input-sm" id="department"
											name="department">
										</select>
									</div>
									 -->
									 
									  
									 
									
									 
									
								
								
									<div class="form-group pull-right m-b-none ">
										<button type="button" class="btn btn-info input-sm"
											name="btnSearchAdvance" id="btnSearchAdvance">
											<i class="fa fa-search"></i>&nbsp;Search
										</button>
										<!-- 
										<button id="btnCoppy" name="btnCoppy"
											class="btn btn-warning  input-sm" type="button">
											<i class="fa fa-copy"></i>&nbsp;Copy
										</button>
										 -->
									</div>
								
							</div>
							<!--
							<div class="row-fluid">
										
										
												
				                                    <div class="span4 m-b-xs">
					                                    <div class="form-group"><label class="span5 control-label-search">Level</label>
			
						                                    <div class="span7" id="appraisalLevelArea">
						                                    
							                                    <select data-toggle="tooltip" title="Level" class="input form-control input-sm"  id="appraisalLevel" name="appraisalLevel">
							                                    	
							                                    	<option value="0"></option>
																	
																	
																</select>
																
						                                    </div>
						                                </div>
													</div>
													<div class="span4 m-b-xs">
					                                    <div class="form-group"><label class="span5 control-label-search">Perspective</label>
			
						                                    <div class="span7" id="perspectiveArea">
						                                    
							                                    <select data-toggle="tooltip" title="Perspective" class="input form-control input-sm"  id="perspective" name="perspective">
							                                    	
							                                    	<option value="0"></option>
																	
																</select>
																
						                                    </div>
						                                </div>
													</div>
													<div class="span4 m-b-xs">
					                                    <div class="form-group"><label class="span5 control-label-search">Structure </label>
			
						                                    <div class="span7" id='structureArea'>
						                                    
							                                    <select data-toggle="tooltip" title="Structure" class="input form-control input-sm"  id="structure" name="structure">
							                                    	
							                                    	<option value="0"></option>
																	
																</select>
																
						                                    </div>
						                                </div>
													</div>
													
													
										</div>
										<div class="row-fluid">
										
													<div class="span4 m-b-xs">
					                                    <div class="form-group"><label class="span5 control-label-search">Department</label>
			
						                                    <div class="span7" id='DepartmentArea'>
						                                    
							                                    <select data-toggle="tooltip" title="Flag 2" class="input form-control input-sm"  id="department" name="department">
							                                    	
							                                   
																	
																	
																</select>
																
						                                    </div>
						                                </div>
													</div>
													
													<div class="span4 m-b-xs">
					                                    <div class="form-group"><label class="span5 control-label-search">Appraisal Item </label>
			
						                                    <div class="span7" id='appraisalItemNameArea'>
						                                    
																<input data-toggle="tooltip" title="Appraisal Item " placeholder="Appraisal Item " type='text' name='appraisalItemName' class='input form-control input-sm span12' id='appraisalItemName'>
																
						                                    </div>
						                                </div>
													</div>
													
													<div class="span4" style='text-align:right;'>
					                                    
					                                    
					                                     <div class="form-group"><label class="span5 control-label-search">&nbsp;</label>
			
						                                    <div class="span7" id='appraisalItemNameArea'>
						                                    
																<button type="button" class="btn btn-info input-sm" name="btnSearchAdvance" id="btnSearchAdvance"><i class="fa fa-search"></i>&nbsp;Search</button>
																<button id="btnCoppy" name="btnCoppy" class="btn btn-warning  input-sm" type="button"><i class="fa fa-plus-square"></i>&nbsp;Copy</button>
						                                    </div>
						                                </div>
						                                
					                                  
													</div>
													
										</div>
													
													
										
										
										<!-- 
										<div class='span1' align="right">
										
												
												
			                                     	<div class="input-group" >
				                                     	<div id="btnSearchArea">
			                                         		<button type="button" class="btn btn-info input-sm" name="btnSearchAdvance" id="btnSearchAdvance"><i class="fa fa-search"></i>&nbsp;Search</button>
			                                         	</div>
		                                         	</div>
		                                     	
                                     	
										</div>
										 -->
										

	                                    
                                    
                                     	 
                             		</div>
				         		</div><!-- content end -->
				         		</div>
				         		
         				</div>
	
         			</div><!-- end--row-fluid -->
         			<div class="row-fluid result_area">
				         		<div class="span12">
					         	<div class="ibox-title">
	                                <div class='titlePanelSearch'>Appraisal Item List</div>
	         					</div>
	         					
	         					
	         					<div class="ibox-content"> 
	         					
                                    	<!-- start table -->
                                    	
                                    	<!-- mian content start -->
                                    	
                                    		<div id='main_conntent_list_data'></div>
                                    	
                                    	<!-- mian content end -->
                                     
                                    	<!-- end table -->
                                    	<br style='clear:both'>
         						</div><!-- content end -->
         					</div>
         					</div>
        					
</div>         					






<div id='include_deduct_score'></div>
<div id='include_quality'></div>
<div id='include_quantity_form'></div>


<!-- Modal Confirm Start -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="confrimModal" class="modal inmodal in" style="display: none; width: 400px; left: 55%;">
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
	                 		<div id="inform_on_confirm" class='information'></div>
	                 		<p id='informConfirm'></p>
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

<!-- Modal Copy Start -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="copyModal" class="modal inmodal in" style="display: none;">
    <div class="modal-dialog">
    <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only"></span></button>
                <h5 class="modal-title">Appraisal Item </h5>
            </div>
            <div class="modal-body">
                
                <table class='table table-striped'>
                <h2> Copy to Level:</h2>
               
                	<tbody id='listLevelData'>
	                	
                	</tbody>
                </table>
             
            </div>
            <div class="modal-footer">
            	<div align="center">
	                <button class="btn btn-success" id="btnCopyOK" type="button">&nbsp;&nbsp;<i class="fa fa-check-circle"></i>&nbsp;&nbsp;Yes&nbsp;&nbsp;</button>&nbsp;&nbsp;
	                <button data-dismiss="modal" class="btn btn-danger" type="button"><i class="fa fa-times-circle"></i>&nbsp;Cancel</button>
            	</div>
            	<div style="display: none;" id="information_copy" class="alert alert-warning information"></div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Copy Start -->

<div id='embedParamSearch'></div>
<div id='embedParamSearchQuantity'></div>
<!-- Modal Confirm End -->




<!-- Modal DeductScore  Start  -->

  <div aria-hidden="true" role="dialog" tabindex="-1" id="modal-deduct" class="modal inmodal" style="display: none;">
    <div class="modal-dialog  ">
    <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only"></span></button>
             
                <h4 class="modal-title" id="modalTitleDeductScore"><span id="modalDeductScoreDescription"> </span> </h4>
               
            </div>
            <div class="modal-body">
                <!-- content start -->
               
                <div class='row-fluid'>
                	<div class="span12">
                	 		<!-- form start -->
			                <div class='form-file-mangement'>
				                <div class="form-label-customs">
				                	KPI Name <span class='redFont '>*</span>
				                </div>
				                
				                <div class="form-input-customs">
				                	<input type="text" class="form-control input-sm span12" placeholder="KPI Name" id="appraisalItemNameDeductScore">
				                	
				                </div>
				                <br style="clear:both">
			                </div>
			                
			                <div class='form-file-mangement'>
				                <div class="form-label-customs">
				                
				                	Level <span class='redFont'>*</span>
				                </div>
				                
				                <div class="form-input-customs" id="appraisalLevelAreaDeductScore">
				                
				                		<select class="form-control input-sm" id="appraisalLevelDeductScore">
					                		
					                	</select>
				                		
				                </div>
				                <br style="clear:both">
			                </div>
			                
			                
			                <!-- 
			                <div class='form-file-mangement'>
				                <div class="form-label-customs">
				                	Department <span class='redFont '>*</span>
				                </div>
				                
				                <div class="form-input-customs" id="departmentAreaDeductScore">
				                	<select class="form-control input-sm" id="departmentDeductScore">
				                		<option></option>
				                	</select>
				                </div>
				                <br style="clear:both">
			                </div>
			                 -->
			                
			                <div class='form-file-mangement'>
				                <div class="form-label-customs">
				                
				                	Max Value <span class='redFont'>*</span>
				                </div>
				                
				                <div id="maxValueAreaDeductScore" class="form-input-customs">
				                
				                		<input type="text" class="form-control input-sm numberOnly span12" placeholder="Max Value " id="maxValueDeductScore">
				                	
				                		
				                </div>
				                <br style="clear:both">
			                </div>
			                <div class='form-file-mangement'>
				                <div class="form-label-customs">
				                
				                	Deduct Score/Unit <span class='redFont'>*</span>
				                </div>
				                
				                <div class="form-input-customs">
				                
				                		<input type="text" class="form-control input-sm numberOnly  span12" placeholder="Deduct Score/Unit" id="DeductScoreUnitDeductScore">
				                	
				                		
				                </div>
				                <br style="clear:both">
			                </div>
			                
			                <div class='form-file-mangement'>
				                <div class="form-label-customs"> 
				                &nbsp;
				                </div>
				                <div class="form-input-customs">
<!-- 				                	<input type="checkbox" checked="" name="isShowVarianceDeductScore" id="isShowVarianceDeductScore" value="1"> -->
<!-- 				                	<span style="margin-right: 10px;">Is Show Variance</span> -->
					             	<input type="checkbox" checked   name="isActiveDeductScore" id="isActiveDeductScore" value="1">
					              	<span>Is Active</span>
				                </div>
				                <br style="clear:both">   		
			                </div>
			                <!-- form end -->	
                	</div>
                	
                </div>
                
                <div class='row-fluid'>
	                	<div class='span12' >
	                		
	                		<!-- panel1 start-->
	                		<div class="ibox-title3">
		                          <div class='titlePanel'>Organization</div>
		                      </div>
		   					<div class="ibox-content" style='padding-left: 5px; padding-right: 5px;'>
		   							<!-- content  start-->	 
		                             	<form id="orgDeductScoreForm" action="#" method="post">
										    <select multiple="multiple" size="10" name="<portlet:namespace />organizationDeductScore[]" id='organizationDeductScore'>
												
										    </select>
										  </form>
		                            <!-- content  end-->				
		   					</div>
	                		<!-- panel1 end -->
	                		
	                		
		                <!-- 
	                	</div>
	                	
	                	<div class='span6' >
	                	 -->
	                		<!-- panel2 start-->
	                		
	                		<div class="ibox-title3">
		                          <div class='titlePanel'>Position</div>
		                      </div>
		   					<div class="ibox-content" style='padding-left: 5px; padding-right: 5px;'>
		   							<!-- content  start-->	 
			                		 <form id="positionDeductScoreForm" action="#" method="post">
									    <select multiple="multiple" size="10" name="<portlet:namespace />positionDeductScore[]" id='positionDeductScore'>
									     
									    </select>
									    
									  </form>
		                            <!-- content  end-->				
		   					</div>
		   					
	                		<!-- panel2 end -->
	                		
	                		
							   
	                	</div>
                	</div>
                	
                <br style="clear:both">
                <!-- content end -->
            </div>
            <div class="modal-footer">
           	 	<input type="hidden" name="structure_id_deduct" id="structure_id_deduct" value="">
           	 	<input type="hidden" name="appraisalItemIdDeductScore" id="appraisalItemIdDeductScore" value="">
   				<input type="hidden" name="actionDeductScore" id="actionDeductScore" value="add">
   				
   				<button class="btn btn-primary" type="button" id="btnSubmitDeductScore">Save</button>
   				<button class="btn btn-primary" type="button" id="btnAddAnotherDeductScore">Save & Add Another</button>
                <button data-dismiss="modal" class="btn btn-white btnCancleDeductScore" type="button">Cancel</button>
                <div class="alert alert-warning information" id="informationDeductScore" style="display: none;"></div>
            </div>
        </div>
    </div>
</div>                      
<!-- Modal  DeductScore End  -->
<!-- 
<script src="../../tyw-kpi-portlet/Controller/Form/cDeductScore.js"></script>
 -->

<!-- Modal Quality Start Edit -->
  <div aria-hidden="true" role="dialog" tabindex="-1" id="modal-quality" class="modal inmodal " style="display: none;">
    <div class="modal-dialog  ">
    <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only"></span></button>
             
                <h4 class="modal-title" id="modalTitleQuality"><span id="modalQualityDescription"></span> </h4>
               
            </div>
            <div class="modal-body">
                <!-- content start -->
                <!-- 
                <h2><i class="fa fa fa-pencil-square-o icon-title"></i> <span id="modalQualityDescription"></span> </h2>
                <hr>
                 -->
               
                <div class='row-fluid'>
                	<div class="span12">
                	 		<!-- form start -->
			                <div class='form-file-mangement'>
				                <div class="form-label-customs">
				                	KPI Name <span class='redFont '>*</span>
				                </div>
				                
				                <div class="form-input-customs">
				                	<input id="appraisalItemNameQuality" type="text" class="form-control input-sm span12" placeholder="KPI Name" >
				                	
				                </div>
				                <br style="clear:both">
			                </div>
			                
			                <div class='form-file-mangement'>
				                <div class="form-label-customs">
				                
				                	Level <span class='redFont'>*</span>
				                </div>
				                
				                <div class="form-input-customs" id="appraisalLevelAreaQuality">
				                
				                		<select class="form-control input-sm" id="appraisalLevelQuality">
					                		
					                	</select>
				                		
				                </div>
				                
				                <br style="clear:both">
			                </div>
			                <!-- 
			                <div class='form-file-mangement'>
				                <div class="form-label-customs">
				                	Department <span class='redFont '>*</span>
				                </div>
				                
				                <div class="form-input-customs" id="departmentAreaQuality"">
				                	<select class="form-control input-sm" id="departmentQuality"">
				                		<option></option>
				                	</select>
				                </div>
				                <br style="clear:both">
			                </div>
			                -->
			                <div class='form-file-mangement'>
				                <div class="form-label-customs"> 
				                </div>
				                <div class="form-input-customs">
<!-- 				                	<input type="checkbox" checked="" name="isShowVarianceQuality" id="isShowVarianceQuality" value="1"> -->
<!-- 				                	<span style="margin-right: 10px;">Is Show Variance</span> -->
					             <input type="checkbox" checked  name="isActive" id="isActiveQuality" value="1">
					              <span>Is Active</span>
				                </div>
				                <br style="clear:both">   		
			                </div>
			               
			                
			                
			                
			                <!-- form end -->	
                	</div>
                	
                </div>
                
                
                <div class='row-fluid'>
	                	<div class='span12' >
	                		
	                		<!-- panel1 start-->
	                		<div class="ibox-title3">
		                          <div class='titlePanel'>Organization</div>
		                      </div>
		   					<div class="ibox-content" style='padding-left: 5px; padding-right: 5px;'>
		   							<!-- content  start-->	 
		                             	<form id="orgQualityForm" action="#" method="post">
										    <select multiple="multiple" size="10" name="<portlet:namespace />organizationQuality[]" id='organizationQuality'>
												
										    </select>
										  </form>
		                            <!-- content  end-->				
		   					</div>
	                		<!-- panel1 end -->
	                		
	                		
		                <!-- 
	                	</div>
	                	
	                	<div class='span6' >
	                	 -->
	                		<!-- panel2 start-->
	                		
	                		<div class="ibox-title3">
		                          <div class='titlePanel'>Position</div>
		                      </div>
		   					<div class="ibox-content" style='padding-left: 5px; padding-right: 5px;'>
		   							<!-- content  start-->	 
			                		 <form id="positionQualityForm" action="#" method="post">
									    <select multiple="multiple" size="10" name="<portlet:namespace />positionQuality[]" id='positionQuality'>
									     
									    </select>
									    
									  </form>
		                            <!-- content  end-->				
		   					</div>
		   					
	                		<!-- panel2 end -->
	                		
	                		
							   
	                	</div>
                	</div>
                	
                <!-- content end -->
            </div>
            <div class="modal-footer">
           	 	<input type="hidden" name="structure_id_quality" id="structure_id_quality" value="">
   				<input type="hidden" name="actionQuality" id="actionQuality" value="add">
   				
   				<input type="hidden" name="appraisalItemIdQuality" id="appraisalItemIdQuality" value="">
   				
   				<button class="btn btn-primary" type="button" id="btnSubmitQuality">Save</button>
   				<button class="btn btn-primary" type="button" id="btnAddAnotherQuality">Save & Add Another</button>
                <button data-dismiss="modal" class="btn btn-white btnCancleQuality" type="button">Cancel</button>
                <div class="alert alert-warning information" id="informationQuality" style="display: none;"></div>
            </div>
        </div>
    </div>
</div>                      
<!-- Modal Quality End Edit -->
<!-- 
<script src="../Controller/Form/cQuality.js"></script>
 -->


<!-- Modal Quantity Start  -->

  <div aria-hidden="true" role="dialog" tabindex="-1" id="modal-quantity" class="modal inmodal large" style="display: none;">
    <div class="modal-dialog  modal-lg">
    <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only"></span></button>
             
                <h4 class="modal-title" id="modalTitleQuantity"><span id="modalQuantityDescription"></span> &nbsp; </h4>
               
            </div>
            <div class="modal-body">
                <!-- content start -->
                <!--<h2>
                 <i class="fa fa fa-pencil-square-o icon-title"></i>  <span id="modalQuantityDescription"></span> </h2>
                <hr>
                -->
                <div class='row-fluid'>
                	<div class="span6">
                	 		<!-- form start -->
			                <div class='form-file-mangement'>
				                <div class=" form-label-quantity">
				                	KPI Name <span class='redFont '>*</span>
				                </div>
				                
				                <div class="form-input-customs">
				                	<input type="text" class="form-control input-sm  span12" placeholder="KPI Name" id="appraisalItemNameQuantity">
				                </div>
				                <br style="clear:both">
			                </div>
			                
			                <div class='form-file-mangement'>
				                <div class="form-label-quantity">
				                
				                	Perspective <span class='redFont'>*</span>
				                </div>
				                
				                <div class="form-input-customs" id="perspectiveAreaQuantity">
				                
				                		<select class="form-control input-sm" id="perspectiveQuantity">
					                		<option></option>
					                	</select>
				                		
				                </div>
				                <br style="clear:both">
			                </div>
			                <!-- 
			                <div class='form-file-mangement'>
				                <div class="form-label-quantity">
				                	Baseline Value <span class='redFont'>*</span>
				                </div>
				                
				                <div class="form-input-customs">
				                
				                	<input type="text" class="form-control input-sm numberOnly span12" placeholder="Baseline Value" id="baselineValueQuantity">
				                </div>
				                <br style="clear:both">
			                </div>
			                 -->
			               <div class='form-file-mangement'>
				                <div class="form-label-quantity">
				                	Level <span class='redFont '>*</span>
				                </div>
				                
				                <div class="form-input-customs" id="appraisalLevelAreaQuantity">
				                	<select class="form-control input-sm multipleSelect span12"   multiple="multiple" id="appraisalLevelQuantity">
				                		
				                	</select>
				                </div>
				                <br style="clear:both">
			                </div>
			                
			                
			                 <div class='form-file-mangement'>
				                <div class="form-label-quantity">
				                	KPI ID &nbsp;
				                </div>
				                
				                <div class="form-input-customs">
				                
				                	<input type="text" class="form-control input-sm numberOnly span12" placeholder="KPI ID" id="kpiQuantity">
				                </div>
				                <br style="clear:both">
			                </div>
			                <div class='form-file-mangement'>
				                <div class="form-label-quantity"> 
				                </div>
				                <div class="form-input-customs">
				                	<input type="checkbox" checked="" name="isShowVarianceQuantity" id="isShowVarianceQuantity" value="1">
				                	<span style="margin-right: 10px;">Is Show Variance</span>
					             <input type="checkbox" checked='checked'  name="isActiveQuantity" id="isActiveQuantity" value="1">
					              <span>Is Active</span>
				                </div>
				                <br style="clear:both">   		
			                </div>
			                
			                
			                <!-- 
			                <div class='form-file-mangement'>
			                
				                <div class="form-label-quantity">
				                
				                	Formula Description <span class='redFont'>*</span>
				                </div>
				                
				                <div class="form-input-customs-title " id="formulaDescriptionAreaQuantity">
				                
				                	<textarea class="form-control input-sm span12" id="formulaDescriptionQuantity"  placeholder="Formula Description" style=" height: 81px;"></textarea>
				                	
				                </div>
				                <br style="clear:both">
			                </div>
			                -->
			                
			                <!-- form end -->	
                	</div>
                	<div class="span6">
                			<!-- form start -->
                			<div class='form-file-mangement'>
			                
				                <div class="form-label-quantity">
				                
				                	UOM <span class='redFont'>*</span>
				                </div>
				                
				                <div class="form-input-customs" id="uomAreaQuantity">
				                
				                	<select class="form-control input-sm" id="uomQuantity">
				                		<option></option>
				                	</select>
					                	
				                </div>
				                <br style="clear:both">
			                </div>
			                
			               
			                <!-- 
			                <div class='form-file-mangement'>
				                <div class="form-label-quantity">
				                	Department <span class='redFont '>*</span>
				                </div>
				                
				                <div class="form-input-customs" id="departmentAreaQuantity">
				                	<select class="form-control input-sm" id="departmentQuantity">
				                		<option></option>
				                	</select>
				                </div>
				                <br style="clear:both">
			                </div>
			                 -->
			                 
			                 <div class='form-file-mangement'>
				                <div class="form-label-quantity">
				                	KPI Type <span class='redFont '>*</span>
				                </div>
				                
				                <div class="form-input-customs" id="kpiTypeAreaQuantity">
				                	<select class="form-control input-sm" id="kpiTypeQuantity">
				                		<option></option>
				                	</select>
				                </div>
				                <br style="clear:both">
			                </div>
			                
			                 <div class='form-file-mangement'>
				                <div class="form-label-quantity">
				                
				                	Remind Condition &nbsp; 
				                </div>
				                
				                <div class="form-input-customs" id="remindCOnditionAreaQuantity">
				                
				                		<select class="form-control input-sm" id="remindCOnditionQuantity">
					                		 <!-- 
					                		 <option value='Daily'>Daily</option>
					                		 <option value='Monthly'>Monthly</option>
					                		 <option value='Quarterly'>Quarterly</option>
					                		  -->
					                	</select>
				                		
				                </div>
				                <br style="clear:both">
			                </div>
			                
			                  
			               <div class='form-file-mangement'>
				                <div class="form-label-quantity">
				                	Value Type <span class='redFont '>*</span>
				                </div>
				                
				                <div class="form-input-customs" id="valueTypeAreaQuantity">
				                	<select class="form-control input-sm span12"    id="valueTypeQuantity">
				                		
				                	</select>
				                </div>
				                <br style="clear:both">
			                </div>
			                
			                 <div class='form-file-mangement'>
				                <div class="form-label-quantity">
				                	Function Type <span class='redFont '>*</span>
				                </div>
				                
				                <div class="form-input-customs" id="functionTypeAreaQuantity">
				                	<select class="form-control input-sm span12"    id="functionTypeQuantity">
				                			<option value='1'>Sum</option>
				                			<option value='2'>Last</option>
				                	</select>
				                </div>
				                <br style="clear:both">
			                </div>
			                
			                 
			                
			                 
			                
			                 
			                
			                
			                <!-- form end -->
                	</div>
                	<div class='row-fluid'>
                	<div class='span12'>
                			<div class='form-file-mangement'>
			                
				                <div class="form-label-quantity" id="formulaDescriptionLabelAreaQuantity">
				                
				                	Formula Description <span class='redFont'>*</span>
				                </div>
				                
				                <div class="" id="formulaDescriptionAreaQuantity">
				                
				                	<textarea class="form-control input-sm span12" id="formulaDescriptionQuantity"  placeholder="Formula Description" style=" height: 81px;"></textarea>
				                	
				                </div>
				                <br style="clear:both">
			                </div>
                	</div>
                	 <br style="clear:both">
                	<div class='row-fluid'>
	                	<div class='span6 mutiSelectBox' id='organizationBox' >
	                		
	                		<!-- panel1 start-->
	                		<div class="ibox-title3">
		                          <div class='titlePanel'>Organization</div>
		                      </div>
		   					<div class="ibox-content" style='padding-left: 5px; padding-right: 5px;'>
		   							<!-- content  start-->	 
		                             	<form id="orgQuantityForm" action="#" method="post">
										    <select multiple="multiple" size="10" name="<portlet:namespace />organizationQuantity[]" id='organizationQuantity'>
												
										    </select>
										  </form>
		                            <!-- content  end-->				
		   					</div>
	                		<!-- panel1 end -->
	                		
	                		
		                	  
	                	</div>
	                	
	                	<div class='span6' id='positionBox' style='margin-left:5px;'>
	                		<!-- panel2 start-->
	                		
	                		<div class="ibox-title3">
		                          <div class='titlePanel'>Position</div>
		                      </div>
		   					<div class="ibox-content" style='padding-left: 5px; padding-right: 5px;'>
		   							<!-- content  start-->	 
			                		 <form id="positionQuantityForm" action="#" method="post">
									    <select multiple="multiple" size="10" name="<portlet:namespace />positionQuantity[]" id='positionQuantity'>
									     
									    </select>
									    
									  </form>
		                            <!-- content  end-->				
		   					</div>
		   					
	                		<!-- panel2 end -->
	                		
	                		
							   
	                	</div>
                	</div>
                </div>
                <br style="clear:both">
                <!-- panel2 start -->
                <div class="row-fluid">
	  					<div class="span12">
	                      <div class="ibox-title3">
	                          <div class='titlePanel'>Advanced Search </div>
	                      </div>
	   					
	   					<div class="ibox-content">
	   							
	   							<!-- content  start-->	 
	                             	<div class="row-fluid">
										<div class="span10">
											<div class="row-fluid">
											<!-- 
				                                    <div class="span6 m-b-xs">
					                                    <div class="form-group"><label class="span4 control-label-search">Level</label>
			
						                                    <div class="span8" id="appraisalLevelSearchAreaQuantity">
						                                    
							                                    <select name="flag_2" id="appraisalLevelSearchQuantity" class="input form-control input-sm" title="Level" data-toggle="tooltip">
							                                    	<option value="0"></option>
																</select>
																
						                                    </div>
						                                </div>
													</div>
												 -->
													<div class="span6 m-b-xs">
					                                    <div class="form-group"><label id='cdsNameLabel' class="span3 control-label-search">CDS Name</label>
			
						                                    <div class="span9" id="cdsNameSearchAreaQuantity">
						                                    
							                                    
																<input type='text'  placeholder="CDS Name"  name='cdsNameSearchQuantity' id='cdsNameSearchQuantity' class='input form-control input-sm span12' title="CDS Name" data-toggle="tooltip">
																
						                                    </div>
						                                </div>
													</div>
													
											</div>
										</div>
										<div class="span2">
												<div align="right" >
			                                     	<div class="input-group">
				                                     	<div id="">
			                                         		<button id="SearchQuantity" name="SearchQuantity" class="btn btn-info input-sm" type="button"><i class="fa fa-search"></i>&nbsp;Search</button>
			                                         	</div>
		                                         	</div>
		                                     	</div>
										</div>
                             		</div>
	                            <!-- content  end-->
	                             				
	                             				
	   					</div>
	   				</div>
	   			</div>
                <!-- panel2 end -->
                <!-- panel3 start -->
                <div class="row-fluid ">
	  					<div class="span12">
	                      <div class="ibox-title3">
	                          <div class='titlePanel'>CDS List</div>
	                      </div>
	   					
	   					<div class="ibox-content">
	   							
	   							<!-- content table start-->	
	   							<!-- pagination start -->
                                   	<div class="row-fluid">
                                    	<div class="span6 pagianation_area" >
											<div class="pagination_top2 pagination"></div>
                                    	</div>
                                    
	                                    <div class="span6 object-right paging-text">
	                                    
	                                    	<div class='pagingDropdown'>
	                                 			<select  id='countPaginationTop2'  class="form-control input-sm countPagination2">
				                                     <option>10</option>
				                                     <option>20</option>
				                                     <option>50</option>
				                                     <option>100</option>
				                                 </select>
	                                 		
	                                 		</div>
											<div class='paging-text2'>&nbsp;Results per page&nbsp;</div>
	                                    
	                                    </div>
	                                    
                                   	</div> 
                                <!-- pagination end -->
	   							<!-- pagination top start -->
	   							<!-- 
	   							<div class="row-fluid">
	                                  	<div class="span9 ">
										 <div class="pagination_top2 pagination" ></div>
	                                  	</div>
	                                  
	                                   <div class="span2 object-right paging-text"><div class='paging-text2'>Results per page</div></div>
	                                   <div class="span1">
	                                   
	                                  	<select class="form-control input-sm countPagination2" id="countPaginationTop2" name="countPagination2">
	                                       <option>10</option>
	                                    	<option>20</option>
	                                    	<option>50</option>
	                                    	<option>100</option>
	                                   </select> 
	                                      
	                                  	</div>
	                                  	
	                              </div>
	                             -->
	   							 <!-- pagination top end --> 
	                             	<div class="table-responsive">
                                  		<table id="tablethreshould" class="table table-striped">
                                  		
                                        <thead>
	                                        <tr>
	                                            <th style="width:5%">ID</th>
	                                            <th style="width:75%">Description </th>
	                                            <th style="width:20%; text-align:center;"></th>
	                                        </tr>
                                        </thead>
                                        <tbody id="listCDS">
                                        
                                        
                                        </tbody>
                                       </table>
                                       
                                       
                                      
			                
                                  </div>
                                  
                                  <!-- pagination bottom start -->
                                  <!-- 
                                  <div class="row-fluid">
	                                   	<div class="span9 ">
											 <div class="pagination_bottom2 pagination"></div>
	                                   	</div>
	                                   
	                                    <div class="span2 object-right paging-text"><div class='paging-text2'>Results per page</div></div>
	                                    <div class="span1">
	                                   
		                                   	<select class="form-control input-sm countPagination2" id="countPaginationBottom2" name="countPagination2">
		                                        <option>10</option>
		                                     	<option>20</option>
		                                     	<option>50</option>
		                                     	<option>100</option>
		                                    </select> 
	                                       
	                                   	</div>
                                  </div>
                                  -->
                                  <!-- pagination bottom end -->
                                  <!-- pagination start -->
									<div class="row-fluid">
                                    	<div class="span6 pagianation_area">

											  <p class="pagination_bottom2 pagination"></p>
											
                                    	</div>
                                    
	                                    <div class="span6 object-right paging-text">
	                                    	<div class='pagingDropdown'>
	                                 			<select  id='countPaginationBottom2'  class="form-control input-sm countPagination2">
				                                     <option>10</option>
				                                     <option>20</option>
				                                     <option>50</option>
				                                     <option>100</option>
				                                 </select> 
		                                 	</div>
											<div class='paging-text2'>&nbsp;Results per page&nbsp;</div>
	                                    </div>
	                                   
                                   	</div> 
								  <!-- pagination end -->
                                  
                                  
                                   <!-- Formula start-->
                                   <hr>
                                   <div class='row-fluid'>
	                                   <div class='span12'>
	                                       <div class='form-file-mangement'>
				                
								                <div class="form-label-quantity span2">
								                
								                	Formula<span class='redFont'>*</span>
								                </div>
								                
								                <div class="form-input-customs-title span10">
								                	<!-- 
								                	<textarea id="formulaDescriptionQuantity" class="form-control input-sm"  style="width: 664px; height: 100px;">([sum:จำนวนยอดขายสุทธิต่อไตรมาส]/[sum:จำนวนเป้าหมายยอดขายสุทธิต่อไตรมาส]*100)</textarea>
								                	 -->
								                	<div id="textarea_cds" class="form-control input-sm span12" contenteditable> </div>
								                	
								                </div>
								               
							                </div>
							            </div>
							            <br style='clear:both'>
						            </div>
						                <!-- Formula end-->
						            
						                 <br style="clear:both">
						                 <br style="clear:both">
	                            <!-- content table end-->
	                             				
	                             				
	   					</div>
	   				</div>
	   			</div>
                <!-- panel3 end -->
                
                <!-- content end -->
            </div>
            <div class="modal-footer">
           	 	<input type="hidden" name="appraisalItemIdQuantity" id="appraisalItemIdQuantity" value="">
           	 	<input type="hidden" name="structure_id_quantity" id="structure_id_quantity" value="">
   				<input type="hidden" name="actionQuantity" id="actionQuantity" value="add">
   				<span aria-hidden="true" class="icon-refresh" id="btnCheckFormula"></span>
   			
   				<button class="btn btn-primary" type="button" id="btnSubmitQuantity">Save</button>
   				<button class="btn btn-primary" type="button" id="btnAddAnotherQuantity">Save & Add Another</button>
                <button data-dismiss="modal" class="btn btn-white btnCancleQuantity" type="button">Cancel</button>
                <div class="alert alert-warning information" id="informationQuantity" style="display: none;"></div>
            </div>
        </div>
    </div>
</div>       
<div id='paramPagingCDS'></div> 
<div class='formula_cds_id_area'></div>    
<div class='formula_cds_name_area'></div>       
<div class='test_formula_cds_name_area'></div>       
<!-- Modal Quantity End  -->
<!-- 
<script src="../Controller/Form/cQuantity.js"></script>
 -->
    





 



</body>
