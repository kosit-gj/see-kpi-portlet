<%@ page import="javax.portlet.*"%>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="com.liferay.portal.kernel.util.WebKeys" %>
<%@ page import="com.liferay.portal.util.PortalUtil" %>

<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui"%>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>
<%@ taglib uri="http://liferay.com/tld/ui" prefix="liferay-ui" %>

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
String currentLocale = themeDisplay.getLanguageId();

String param_link = PortalUtil.getOriginalServletRequest(request).getParameter("param_link");
String param_item_result_id = PortalUtil.getOriginalServletRequest(request).getParameter("param_item_result_id");
layout = themeDisplay.getLayout();
plid = layout.getPlid();
//out.print(param);
//out.print("password2="+password);
%>

<style>
.ibox-content {
    background-color: #fff;
    border: 1px solid #ffe57f;
    color: inherit;
    margin-bottom: 5px;
    padding-left: 15px;
    padding-right: 15px;
}

.aui .pagination {
    margin: 0;
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

.aui #breadcrumbs2 {
    margin-bottom: 0;
}

.aui select, .aui textarea, .aui input[type="text"], .aui input[type="password"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="date"], .aui input[type="month"], .aui input[type="time"], .aui input[type="week"], .aui input[type="number"], .aui input[type="email"], .aui input[type="url"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="color"], .aui .uneditable-input {
    padding: 5px;
    padding-top: 0px;
    height: 30px;
}

.aui .p-t-xxs {
    padding-top: 5px;
}

.aui .p-t-xxsg {
    padding-top: 5px;
    text-align: right;
    font-weight: bold;
}

.aui .table td {
    font-size: 13px;
}

.aui .row-fluid [class*="span"] {
    min-height: auto;
    margin-bottom: 1px;
}

.aui #btnSearchAdvance {
    left: 4px;
    position: relative;
}

.aui .table td {
    text-align: '';
}

.aui .btn {
    font-size: 14px;
    padding: 4px 12px;
    display: inline;
}

.aui select, .aui textarea, .aui input[type="text"], .aui input[type="password"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="date"], .aui input[type="month"], .aui input[type="time"], .aui input[type="week"], .aui input[type="number"], .aui input[type="email"], .aui input[type="url"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="color"], .aui .uneditable-input {
    height: 30px;
    padding: 0 0 0 5px;
    font-size: 14px;
}

.aui .alert, .aui .portlet-msg-alert, .aui .portlet-msg-error, .aui .portlet-msg-help, .aui .portlet-msg-info, .aui .portlet-msg-progress, .aui .portlet-msg-success {
    padding: 8px 8px 8px 14px;
    color: #555;
    margin-bottom: 0;
}

.aui select, .aui textarea, .aui input[type="text"], .aui input[type="password"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="date"], .aui input[type="month"], .aui input[type="time"], .aui input[type="week"], .aui input[type="number"], .aui input[type="email"], .aui input[type="url"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="color"], .aui .uneditable-input {
    height: '';
}

.aui input[type="color"], .aui input[type="date"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="email"], .aui input[type="month"], .aui input[type="number"], .aui input[type="password"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="text"], .aui input[type="time"], .aui input[type="url"], .aui input[type="week"], .aui select, .aui textarea, .aui .uneditable-input {
    margin-bottom: 0px;
}

.aui select, .aui input[type="text"] {
    font-size: 13px;
}

.aui #breadcrumbs {
    margin-bottom: 0;
}

.ui-icon-triangle-1-s {
    background-position: -65px -10px !important;
}
#QuestionnaireType_ms {
    padding-top: 4px;
    padding-bottom: 4px;
}
</style>

<input type="hidden" id="param_link" name="param_link" value="<%=param_link%>">
<input type="hidden" id="param_item_result_id" name="param_item_result_id" value="<%=param_item_result_id%>">

<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="user_locale" name="user_locale" value="<%=currentLocale%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">
<input type="hidden" id="plid_portlet" name="plid_portlet" value="<%= plid %>">


<body class=" gray-bg ">
  <div class='row-fluid'>
    <div id="slide_status" class='span12'>
      <div id="btnCloseSlide">×</div>
      <div id="slide_status_area"></div>
    </div>
  </div>


  <div class="app_url_hidden">
    <div class="container1">
      <div id="includePage" class="ng-view ng-scope">
        <div class="row-fluid">
          <!-- start--row-fluid -->

          <div class="span12">
            <div class="ibox float-e-margins">
              <div class="ibox-title">
                <div class='titlePanel'><liferay-ui:message key="advanced-search"/></div>
              </div>

              <div class="ibox-content breadcrumbs2">

                <div class="row-fluid" id='advanceSearchAppraisal'>
                
                  <div class="form-group pull-left span3" style="margin-left: 5px">
                        <select data-toggle="tooltip" title="" data-original-title="<liferay-ui:message key="year"/>" class="input form-control input-sm span12" id="year" name="year">
                        </select>
                  </div>
                  
                  <div class="form-group pull-left span3" style="margin-left: 5px">
                    <select data-toggle="tooltip" title="" multiple="multiple" data-original-title="<liferay-ui:message key="questionnaire-type"/>" class="input form-control input-sm span12" id="QuestionnaireType" name="QuestionnaireType">
                    </select>
                  </div>
                  
                  <div class="form-group span3 m-b-none pull-right" style="margin-left: 5px; text-align:right;">
                    <button type="button" class="btn btn-info input-sm" name="btnexport" id="btnExport">
                      <i class="icon-download-alt"></i>&nbsp;<liferay-ui:message key="export"/>
                    </button> &nbsp;
                  </div>

                </div>
              </div>
            </div>
            <!-- content end -->
          </div>
        </div>
      </div>
      <!-- end--row-fluid -->
    </div>
  </div>
  <iframe id="iFrame_report" frameborder="0" style="width :100%;height: 500px; display:none;">
  			<p><liferay-ui:message key="your-browser-does-not-support-iframes"/></p>
  </iframe>
</body>

<script src="/see-kpi-portlet/js/jquery3.1.1.js"></script>
<script type="text/javascript">
 var jQuery_1_1_3 = $.noConflict(true);
</script>
