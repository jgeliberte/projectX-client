function callGetDentalRecords() {
	var patientDentalJsonResult = [];
	var patientDentalDataset = [];
	var dentalNum = 1;
	$.getJSON("/v1/fetchallpatient", function(data){
		for (var key in data) {
			if(data.hasOwnProperty(key)){
				var value = data[key];
				console.log(value);
				var dataParse = JSON.stringify(value);
				for (var i = 0; i < value.length; i++) {
					if(value[i].firstname != null){
						if(value[i].status == 1){
							patientDentalJsonResult.push(dentalNum);
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
							patientDentalJsonResult.push(value[i].id);
							patientDentalDataset.push(patientDentalJsonResult);
							patientDentalJsonResult = [];
							dentalNum++;
						}
					}
				}
				console.log("Data: " + dataParse);
				console.log("array :" + patientDentalJsonResult);
			}
		};

		dentalRecordTable.clear();
		dentalRecordTable.rows.add(patientDentalDataset);
		dentalRecordTable.draw();

		addDental();
		previewDentalActivity();
	});
}

function callGetDentalService(){
	var dentalDataSet = [];
	$.getJSON("/v1/getallservices", function(data){
		for (var key in data) {
			if(data.hasOwnProperty(key)){
				value = data[key];
				console.log(value);
			}
		};
		appendService(value);
		console.log(value);
		displayPopOverOnCheck(value);
	});
}

function callGetServicesPerPatient(patientId) {
	$.getJSON("/v1/getallservices", function(data){
	});
}