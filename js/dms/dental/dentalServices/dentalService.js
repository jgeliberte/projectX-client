var dentalServiceId;
var dentalData = null;

$(document).ready(function() {
	
	initializeServiceDataTable();
	callGetDentalServices();
	deleteDentalService();

	$("#btnAddService").on("click", function(){
		if(dentalData == null){
			console.log(dentalData);
			callAddDentalService();
			dentalData = null;
		} else {
			console.log(dentalData);
			calUpdateDentalService();
			dentalData = null;
		}
		//getDentalService();
	});

	$('.modal').on('hidden.bs.modal', function(e) { 
		$(".modal-body input").val("")
	}) ;

});

function appendDentalServiceIcons() {
	var icons = "<div style='display: block;text-align: center;'>" + 
	"<div id='tool' data-toggle='tooltip' data-placement='top' title='Update Service'" + 
	"<span class='updateService glyphicon glyphicon-pencil' aria-hidden='true' style='margin-right: 15%;'></span></div>" +
	"<div id='tool' data-toggle='tooltip' data-placement='top' title='Remove Service'" + 
	"<span class='archiveService glyphicon glyphicon-trash' aria-hidden='true'></span></div>" +
	"</div>"

	return icons;
}

function setDentalService(serviceValue){
	dentalServiceId = serviceValue[11];
	$('#serviceName').val(serviceValue[1]);
	$('#fee').val(serviceValue[2]);
}

function sendDentalServiceInfo(){
	var dentalService = {};
	dentalService["service_name"] = $("#serviceName").val();
	dentalService["service_fee"] =  $("#fee").val();
	dentalService["date_created"] = getCurentDate();
	dentalService["date_updated"] = getCurentDate();

	return dentalService;
}

// function deleteDentalServiceFromServer(serviceId){
// 	$.post("/v1/archiveservice",{patient_id : JSON.stringify(serviceId)})
// 	.done(function(data, status){
// 		var status = JSON.stringify(data);
// 		alert(status);
// 		getPatientFromServer();
// 	});
// }

function getCurentDate(){
	var todayDate = new Date().toISOString().slice(0,10);
	return todayDate;
}

