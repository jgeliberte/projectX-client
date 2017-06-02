var patientId = "";

$(document).ready(function() {

	$('#patientMenu').click(function(){
		window.location = '/v1/patient';
	});

	// patientTable.js file
	initializeDataTable();
	// patientService.js file
	callGetPatientService();
	// patientTable.js file
	deletePatient();

	$('#btnAddPatient').on('click', function(){
		if(data == null){
			callAddPatientService();
		} else {
			callUpdatePatientService();
		}
	});
	

	$('.modal').on('hidden.bs.modal', function(e) { 
		$(".modal-body input").val("")
	});

	$('#birthdate').datepicker({
		dateFormat: 'yy-mm-dd'
	});

});

function appendPatientIcons() {
	var icons = "<div style='display: block;text-align: center;'>" + 
	"<a href='#' data-toggle='tooltip' data-placement='top' title='Update Patient'" +
	"<span class='updatePatient glyphicon glyphicon-pencil' aria-hidden='true' style='margin-right: 15%;'></span></a>" +
	"<a href='#' data-toggle='tooltip' data-placement='top' title='Remove Patient'" + 
	"<span class='archiveData glyphicon glyphicon-trash' aria-hidden='true'></span></a>" + 
	"</div>"

	return icons;
}

function setPatientData(patientValue){
	patientId = patientValue[11];
	$('#firstName').val(patientValue[1]);
	$('#middleName').val(patientValue[6]);
	$('#lastName').val(patientValue[2]);
	$('#birthdate').val(patientValue[3]);
	$('#address').val(patientValue[8]);
	$('#email').val(patientValue[9]);
	$('#primary').val(patientValue[4]);
	$('#secondary').val(patientValue[10]);
	// $("input[name=gender][value=" + patientValue[7] + "]").prop('checked', true);
	$("input[name=gender][value=" + patientValue[7] + "]").click();
}

function sendPatientInfo(){
	var sendPatientObject = {};
	var sendPatientDataArray = {};

	sendPatientObject["id"] = patientId;
	sendPatientObject["firstname"] = $('#firstName').val();
	sendPatientObject["lastname"] =  $('#lastName').val();
	sendPatientObject["middlename"] = $('#middleName').val();
	sendPatientObject["birthdate"] = $('#birthdate').val();
	sendPatientObject["gender"] =  $('input[name=gender]:checked').val();
	sendPatientObject["address"] = $('#address').val();
	if($('#email').val() == "") {
		sendPatientObject["email_address"] = "";
	} else {
		sendPatientObject["email_address"] = $('#email').val();
	}
	sendPatientObject["primary_contact"] = $('#primary').val();
	if($('#email').val() == "") {
		sendPatientObject["secondary_contact"] = "";
	} else {
		sendPatientObject["secondary_contact"] = $('#secondary').val();
	}
	
	return sendPatientObject;
}
