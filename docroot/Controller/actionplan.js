$(document).ready(function(){
    $( ".datepicker" ).datepicker({
        showOn: "button",
        buttonImage: "../../see-kpi-portlet/img/calendar.gif",
        buttonImageOnly: true,
        buttonText: "Select date"
      });
    
    $("#sparkline1").sparkline([10,12,12,9,7], {
        type: 'bullet'});
    
    $("#sparkline2").sparkline([10,12,12,9,7], {
        type: 'bullet'});
});