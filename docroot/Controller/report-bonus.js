var globalData = "";
var galbalDataTemp = [];
var phaseArray = [];
var globalCount = 0;
var username = "";
var password = "";

var getDataFn = function () {
    $("body").mLoading('show'); //Loading
    var AppraisalYear = $("#AppraisalYear").val();
    var AppraisalPeriod = $("#AppraisalPeriod").val();
    var AppraisalOrgLevel = $("#AppraisalOrgLevel").val();
    var organization = $("#organization").val() == null ? '' : $("#organization").val().toString();
    var Position_id = $("#Position_id").val();
    var FormName = ""//$("#FormName").val();
    var output_type = $("#output_type").val();
    var parameter = {};
    var template_name = "";

    if (organization == '') {
        $("body").mLoading('hide'); //Loading
        callFlashSlide("Organization is Require !");
        return false;
    }

    parameter = {
        param_year: AppraisalYear,
        param_org_id: organization,
        param_period: AppraisalPeriod,
        param_level_org: AppraisalOrgLevel,
        param_form: FormName
    };

    var data = JSON.stringify(parameter);
    var url_report_jasper = restfulURL + "/" + serviceName + "/public/generateAuth?template_name=report-bonus&token=" + tokenID.token + "&template_format=" + output_type + "&used_connection=1&inline=1&data=" + data;
    console.log(url_report_jasper);
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.open(url_report_jasper, "_blank");
    } else {
        $('#iFrame_report').attr('src', url_report_jasper);
    }
    $("body").mLoading('hide'); //Loading
};


var dropDrowYearListFn = function (nameArea, id) {
    if (nameArea == undefined) {
        nameArea = "";
    }
    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/appraisal/year_list_assignment",
        type: "get",
        dataType: "json",
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
            var htmlOption = "";
            $.each(data, function (index, indexEntry) {
                if (index == 0) {
                    htmlOption += "<option selected='selected' value=" + indexEntry['appraisal_year'] + ">" + indexEntry['appraisal_year'] + "</option>";
                } else {
                    htmlOption += "<option value=" + indexEntry['appraisal_year'] + ">" + indexEntry['appraisal_year'] + "</option>";
                }
            });
            $("#AppraisalYear" + nameArea).html(htmlOption);
        }
    });

    dropDrowPeriodListFn($("#AppraisalYear").val());
}

var dropDrowPeriodListFn = function (year, id) { //period
    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/appraisal/period_list",
        type: "get",
        dataType: "json",
        async: false,
        headers: {
            Authorization: "Bearer " + tokenID.token
        },
        data: {
            "appraisal_year": year
        },
        success: function (data) {
            var htmlOption = "";
            $.each(data, function (index, indexEntry) {
                if (id == indexEntry['period_id']) {
                    htmlOption += "<option selected='selected' value=" + indexEntry['period_id'] + ">" + indexEntry['appraisal_period_desc'] + "</option>";
                } else {
                    htmlOption += "<option value=" + indexEntry['period_id'] + ">" + indexEntry['appraisal_period_desc'] + "</option>";
                }
            });
            $("#AppraisalPeriod").html(htmlOption);
        }
    });
}

var dropDrowIndividualOrgFn = function (appraisalLevelId, id) {

    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/appraisal/parameter/org_individual_report",
        type: "get",
        dataType: "json",
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        data: { "emp_level": $("#AppraisalEmpLevel").val(), "org_level": $("#AppraisalOrgLevel").val() },
        success: function (data) {
            var htmlOption = "";
            $.each(data, function (index, indexEntry) {
                if (id == indexEntry['org_id']) {
                    htmlOption += "<option value=" + indexEntry['org_id'] + ">" + indexEntry['org_name'] + "</option>";
                } else {
                    htmlOption += "<option value=" + indexEntry['org_id'] + ">" + indexEntry['org_name'] + "</option>";
                }
            });
            $("#organization").html(htmlOption);
        }
    });
}

var dropDrowAppraisalOrgLevelFn = function (id) {

    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/appraisal/parameter/org_level_individual",
        //		appraisal/parameter/org_level
        type: "get",
        dataType: "json",
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
            var htmlOption = "";
            htmlOption += "<option value=''>All Level</option>";
            $.each(data, function (index, indexEntry) {

                if (id == indexEntry['level_id']) {
                    htmlOption += "<option selected='selected' value=" + indexEntry['level_id'] + ">" + indexEntry['appraisal_level_name'] + "</option>";
                } else {
                    htmlOption += "<option value=" + indexEntry['level_id'] + ">" + indexEntry['appraisal_level_name'] + "</option>";
                }
            });
            $("#AppraisalOrgLevel").html(htmlOption);
        }
    });

    dropDrowIndividualOrgFn($("#AppraisalOrgLevel").val());
}


var refreshMultiOrganization = function () {
    $("#organization").multiselect('refresh').multiselectfilter();
    $("#organization_ms").css({ 'width': '100%' });
    $(".ui-icon-check,.ui-icon-closethick,.ui-icon-circle-close").css({ 'margin-top': '3px' });
    $('input[name=multiselect_organization]').css({ 'margin-bottom': '5px' });
}

$(document).ready(function () {

    var username = $('#user_portlet').val();
    var password = $('#pass_portlet').val();
    var plid = $('#plid_portlet').val();
    if (username != "" && username != null & username != [] && username != undefined) {

        if (connectionServiceFn(username, password, plid) == false) {
            return false;
        }
        $('[data-toggle="tooltip"]').css({
            "cursor": "pointer"
        });
        $('[data-toggle="tooltip"]').tooltip({
            html: true
        });

        var dataClearParam = [{
            'id': '#Position',
            'val': ""
        },
        {
            'id': '#Position_id',
            'val': ""
        },
        {
            'id': '#EmpName',
            'val': ""
        },
        {
            'id': '#EmpName_id',
            'val': ""
        }
        ];

        var dataSetParam = [{
            'id': '#Position',
            'val': "" + cMain_position_name + ""
        },
        {
            'id': '#Position_id',
            'val': cMain_position_id
        },
        {
            'id': '#EmpName',
            'val': "" + cMain_emp_name + "(" + session_emp_code + ")"
        },
        {
            'id': '#EmpName_id',
            'val': cMain_emp_id
        },
        {
            'id': '#AppraisalEmpLevel',
            'val': "" + cMain_level_id + ""
        }
        ];

        dropDrowYearListFn();
        dropDrowAppraisalOrgLevelFn();

        $("#AppraisalYear").change(function () {
            dropDrowPeriodListFn($(this).val());
        });

        $("#AppraisalOrgLevel").change(function () {
            dropDrowIndividualOrgFn($("#AppraisalOrgLevel").val());
            refreshMultiOrganization();
        });

        $("#btnExport").click(function () {
            getDataFn();
        });

        $(".app_url_hidden").show();
    }

    $("#organization").multiselect({ minWidth: '100%;' }).multiselectfilter();
    refreshMultiOrganization();
});