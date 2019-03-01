var galbalDataTemp = [];
var username = "";
var password = "";

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

        dropDrowYearListFn();
        dropDrowOrganizationFn();
        
        $("#AppraisalYear").change(function () { // if year change --> period change
            dropDrowPeriodListFn($(this).val());
        });

        $("#btnExport").click(function () {
            getDataFn();
        });

        $(".app_url_hidden").show();
    }

    $("#organization").multiselect({ 
    	minWidth: '100%;',
    	noneSelectedText: "Select Organization",
		selectedText: "# Organization" }).multiselectfilter();

    $(".ui-multiselect-menu").find(".ui-multiselect-all").click();  // check all organization

});

var json_name = "";
var getDataFn = function () {
    $("body").mLoading('show'); //Loading
    var AppraisalYear = $("#AppraisalYear").val();
    var AppraisalPeriod = $("#AppraisalPeriod").val();
    var organization = $("#organization").val() == null ? '' : $("#organization").val().toString();
    var output_type = $("#output_type").val();
    var parameter = {};
    var template_name = "";
    json_name = "";
    
    generateJsonFn(AppraisalPeriod,AppraisalYear,organization);
    
    if(json_name =="" ||json_name == null){
    	console.log("don't have json file.")
    	return false;
    }
    	
    if (organization == '') {
        $("body").mLoading('hide'); //Loading
        callFlashSlide(Liferay.Language.get("organization-is-require"));
        return false;
    }
    
    template_name = "Report-Appraisal-Statistics";
    parameter = {
    	appraisal_year: AppraisalYear,
    	period_id: AppraisalPeriod,
    	org_id: organization
    };


    //-- set report locale name --//
//    var currentLocale = $("#user_locale").val();
//    if (typeof currentLocale !== 'undefined') {
//        template_name = template_name + "_" + currentLocale;
//    }

    var data = JSON.stringify(parameter);
    var url_report_jasper = restfulURL + "/" + serviceName + "/public/generateAuth?template_name=" + template_name + "&token=" + tokenID.token + "&template_format=" + output_type + "&used_connection=1&inline=1&data=" + data + "&json_name=" +json_name;
    console.log(url_report_jasper);
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.open(url_report_jasper, "_blank");
    } else {
        $('#iFrame_report').attr('src', url_report_jasper);
    }
    $("body").mLoading('hide'); //Loading
};

var generateJsonFn = function (period_id,appraisal_year,org_id) {
    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/bonus/report",
        type: "get",
        dataType: "json",
        data: {
            "period_id": period_id,
            "appraisal_year": appraisal_year,
            "org_id": '"'+org_id+'"'
        },
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
        	if(data['status']=='200'){
        		json_name= data['data'];
        	}
        	else if(data['status']=='400'){
        		console.log(data['data']);
        	}
        }
    });
}

var dropDrowYearListFn = function () {
    $.ajax({
        url: restfulURL + "/" + serviceName + "/public/appraisal/year_list_assignment",
        type: "get",
        dataType: "json",
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
            var htmlOption = "";
            $.each(data, function (index, indexEntry) {
                htmlOption += "<option value=" + indexEntry['appraisal_year'] + ">" + indexEntry['appraisal_year'] + "</option>";
            });
            $("#AppraisalYear").html(htmlOption);
        }
    });
    dropDrowPeriodListFn($("#AppraisalYear").val());
}



var dropDrowPeriodListFn = function (year) { //period
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
                htmlOption += "<option value=" + indexEntry['period_id'] + ">" + indexEntry['appraisal_period_desc'] + "</option>";
            });
            $("#AppraisalPeriod").html(htmlOption);
        }
    });
}


var dropDrowOrganizationFn = function (appraisalLevelId, id) {

    $.ajax({
        url: restfulURL + "/" + serviceName + "/public//appraisal/organization/OrgBUList",
        type: "get",
        dataType: "json",
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
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

var refreshMultiOrganization = function () {
    $("#organization").multiselect('refresh').multiselectfilter();
    $("#organization_ms").css({ 'width': '100%' });
    $(".ui-icon-check,.ui-icon-closethick,.ui-icon-circle-close").css({ 'margin-top': '3px' });
    $('input[name=multiselect_organization]').css({ 'margin-bottom': '5px' });
}