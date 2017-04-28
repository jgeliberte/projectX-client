$(document).ready(function() {
	$('#patientRecords').DataTable( {
        data: displayPatientData()
    } );

    $('#dentalRecords').DataTable( {
        data: displayDentalRecords()
    } );
	

	function displayPatientData() {
		var patientData = [
		["1" , "Juan" , "Dela Cruz" , "26" , "09012345678", appendPatientIcons()],
		["2" , "Maria" , "Clara" , "21" , "09253457810", appendPatientIcons()],
		["3" , "John" , "Geliberte" , "23" , "099946193003", appendPatientIcons()]
		];

		return patientData;
	}

	function appendPatientIcons() {
		var icons = "<div style='display: block;text-align: center;'>" + 
		"<span id = 'updatePatient' class='glyphicon glyphicon-pencil' aria-hidden='true' style='margin-right: 15%;'></span>" + 
		"<span id = 'archivePatient' class='glyphicon glyphicon-trash' aria-hidden='true'></span>" + 
		"</div>"

		return icons;
	}

	function displayDentalRecords() {
		var dentalData = [
		["1" , "Juan" , "Dela Cruz" , "26" , "09012345678", appendDentalIcons()],
		["2" , "Maria" , "Clara" , "21" , "09253457810", appendDentalIcons()],
		["3" , "John" , "Geliberte" , "23" , "099946193003", appendDentalIcons()]
		];

		return dentalData;
	}

	function appendDentalIcons() {
		var icons = "<div style='display: block;text-align: center;'>" + 
		"<span id = 'diagnos' class='glyphicon glyphicon-pencil' aria-hidden='true' style='margin-right: 15%;'></span>" + 
		"<span id = 'history' class='glyphicon glyphicon-list-alt' aria-hidden='true'></span>" + 
		"</div>"

		return icons;
	}

	$("#updatePatient").click(function(){
    $('#addPatient').modal('toggle');
});


});
