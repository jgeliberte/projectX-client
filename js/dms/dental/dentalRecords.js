var patientDentalJsonResult = [];
var patientDentalDataset = [];
var dentalTable;
var dentalActivityTable;

$(document).ready(function() {
	$('#dentalMenu').click(function(){
		window.location = '/v1/dentalrecords';
	});

	initializeDentalActivityTable();

	//$('#patientMenu').load(
	$.getJSON("/v1/fetchallpatient", function(data){
		for (var key in data) {
			if(data.hasOwnProperty(key)){
				var value = data[key];
				console.log(value);
				var dataParse = JSON.stringify(value);
				for (var i = 0; i < value.length; i++) {
					if(value[i].firstname != null){
						if(value[i].status == 1){
							patientDentalJsonResult.push(i + 1);
							patientDentalJsonResult.push(value[i].firstname);
							patientDentalJsonResult.push(value[i].lastname);
							patientDentalJsonResult.push(value[i].birthdate);
							patientDentalJsonResult.push(value[i].primary_contact);
							patientDentalJsonResult.push(appendDentalPatientIcons());
							patientDentalJsonResult.push(value[i].middlename);
							patientDentalJsonResult.push(value[i].gender);
							patientDentalJsonResult.push(value[i].address);
							patientDentalJsonResult.push(value[i].email_address);
							patientDentalJsonResult.push(value[i].secondary_contact);
							patientDentalDataset.push(patientDentalJsonResult);
							patientDentalJsonResult = [];
						}
					}
				}
				console.log("Data: " + dataParse);
				console.log("array :" + patientDentalJsonResult);
			}
		};
		console.log(patientDentalDataset);

		dentalTable = $('#dentalRecords').DataTable( {
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

		addDental();
		previewDentalActivity();
	});

});

function appendDentalPatientIcons() {
	var icons = "<div style='display: block;text-align: center;'>" + 
	"<i class='addRecords fa fa-plus-square ' aria-hidden='true' style='margin-right: 15%;'></i>" +
	"<i class='previewDental fa fa-eye' aria-hidden='true'></i>" +
	"</div>"

	return icons;
}

function addDental(){
	$("#dentalRecords tbody").on('click', '.addRecords' , function(){
		var closestRow = $(this).closest('tr');
		data = dentalTable.row(closestRow).data();
		$('#addDental').modal('show');
		$('#patientName').text(data[2].toUpperCase() + ", " + data[1].toUpperCase() +" "+ data[6].toUpperCase());
		$('#gender').text(data[7]);
		$('#primary').text(data[4]);
	});
}

function previewDentalActivity(){
	$("#dentalRecords tbody").on('click', '.previewDental' , function(){
		var closestRow = $(this).closest('tr');
		previewData = dentalTable.row(closestRow).data();
		$('#previewDental').modal('show');
		$('#patientName2').text(previewData[2].toUpperCase() + ", " + previewData[1].toUpperCase() +" "+ previewData[6].toUpperCase());
		$('#gender2').text(previewData[7]);
		$('#primary2').text(previewData[4]);
		//setDentalData(previewData);
	});
}

function initializeDentalActivityTable(){
	dentalActivityTable = $('#dentalActivities').DataTable( {
		columns: [
		{title: "#"},
		{title: "Services"},
		{title: "Date"},
		{title: "Price"},
		{title: "Remarks"},
		{title: ""}
		]
	} );
}

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