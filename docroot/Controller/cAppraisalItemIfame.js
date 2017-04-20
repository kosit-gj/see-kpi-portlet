$(document).ready(function(){
function myFunction(){
	$('#myIframe').attr('src', ifameURL+"/TYW_KPI/Views/appraisal-item.html?username="+$('#user_portlet').val()+"&password="+$("#pass_portlet").val()+""); 
	} 
myFunction();
});