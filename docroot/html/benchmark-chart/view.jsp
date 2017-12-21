<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui"%>
<%@ page import="javax.portlet.*"%>
<%@ page contentType="text/html; charset=UTF-8" %>

<portlet:defineObjects />

		<div class="row-fluid">
            <div class="span12">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="panel panel-warning">
                            <div class="panel-heading">Advance Search</div>
                            <div class="panel-body">
                                <div class="row-fluid">
                                    <div class="span8">
                                        <div class="span12">
                                            <form class="form-inline">
                                            <select id="s_yr"></select>
                                            <select id="s_kpi"></select>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="span4" align="right">
                                        <button type="button" class="btn btn-info" onclick="search_chart()">
                                            <i class="icon-search icon-white"></i>&nbsp;&nbsp;Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12">
                        <div class="row-fluid">
                            <div class="span6">
                                <div align="left">
                                    <i id="previous_chart" class="fa fa-arrow-left fa-2x" aria-hidden="true" style="display:none;"></i>
                                </div>
                            </div>
                            <div class="span6">
                                <div align="right">
                                    <i id="next_chart" class="fa fa-arrow-right fa-2x" aria-hidden="true" style="display:none;"></i>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span12">
                                <span id="chart-container"></span>
                                <span id="chart-container2"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
