$(document).ready(function() {
	var patientDentalJsonResult = [];
	var patientDentalDataset = [];
	var sendPatientDataArray = {};
	$('#dentalMenu').click(function(){
		window.location = '/v1/dentalrecords';
	});
	//$('#patientMenu').load(
	$.getJSON("/v1/fetchallpatient", function(data){
		for (var key in data) {
			if(data.hasOwnProperty(key)){
				var value = data[key];
				console.log(value);
				var dataParse = JSON.stringify(value);
				for (var i = 0; i < value.length; i++) {
					if(value[i].firstname != null){
						patientDentalJsonResult.push(i + 1);
						patientDentalJsonResult.push(value[i].firstname);
						patientDentalJsonResult.push(value[i].lastname);
						patientDentalJsonResult.push(value[i].birthdate);
						patientDentalJsonResult.push(value[i].primary_contact);
						patientDentalJsonResult.push(appendPatientIcons());
						patientDentalJsonResult.push(value[i].middlename);
						patientDentalJsonResult.push(value[i].gender);
						patientDentalJsonResult.push(value[i].address);
						patientDentalJsonResult.push(value[i].email_address);
						patientDentalJsonResult.push(value[i].secondary_contact);
						patientDentalDataset.push(patientDentalJsonResult);
						patientDentalJsonResult = [];

					}
				}
				console.log("Data: " + dataParse);
				console.log("array :" + patientDentalJsonResult);
			}
		};
		console.log(patientDentalDataset);
            //$('#patient_records').attr("href", 'v1/patient');
            var dentalTable = $('#dentalRecords').DataTable( {
            	data: patientDentalDataset,
            	columns: [
            	{title: "#"},
            	{title: "First Name"},
            	{title: "Last Name"},
            	{title: "BirthDate"},
            	{title: "Phone Contact"},
            	{title: ""}
            	]
            } );

        });

});

function appendPatientIcons() {
	var icons = "<div style='display: block;text-align: center;'>" + 
	"<span class='updatePatient glyphicon glyphicon-pencil' aria-hidden='true' style='margin-right: 15%;'></span>" + 
	"<span class='archiveData glyphicon glyphicon-trash' aria-hidden='true'></span>" + 
	"</div>"

	return icons;
}

// function setPatientData(patientValue){
// 	$('#firstName').val(patientValue[1]);
// 	$('#middleName').val(patientValue[6]);
// 	$('#lastName').val(patientValue[2]);
// 	$('#age').val(patientValue[3]);
// 	$('#address').val(patientValue[8]);
// 	$('#email').val(patientValue[9]);
// 	$('#primary').val(patientValue[4]);
// 	$('#secondary').val(patientValue[10]);
// 	$("input[name=gender][value=" + patientValue[7] + "]").prop('checked', true);

// }

// function sendPatientInfo(){
// 	var sendPatientDataFirstArray = [];
// 	var sendPatientDataArray = [];
// 	var sendPatientObject = {};
// 	sendPatientObject["firstname"] = $('#firstName').val();
// 	sendPatientObject["lastname"] =  $('#lastName').val();
// 	sendPatientObject["middlename"] = $('#middleName').val();
// 	sendPatientObject["gender"] =  $('input[name=gender]:checked').val();
// 	sendPatientObject["address"] = $('#address').val(),
// 	sendPatientObject["email_address"] = $('#email').val(),
// 	sendPatientObject["primary_contact"] = $('#primary').val(),
// 	sendPatientObject["secondary_contact"] = $('#secondary').val()
// 	sendPatientDataFirstArray["patient_data"] = sendPatientObject;
// 	console.log(sendPatientDataFirstArray);

// 	return JSON.stringify(sendPatientDataFirstArray);
// }