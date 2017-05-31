var patientNum = 1;
function callGetPatientService() {
	var patientJsonResult = [];
	var patientDataset = [];
	$.getJSON("/v1/fetchallpatient", function(data){
		for (var key in data) {
			if(data.hasOwnProperty(key)){
				var value = data[key];
				console.log(value);
				var dataParse = JSON.stringify(value);
				for (var i = 0; i < value.length; i++) {
					if(value[i].firstname != null){
						if(value[i].status == 1){
							patientJsonResult.push(patientNum);
							patientJsonResult.push(value[i].firstname);
							patientJsonResult.push(value[i].lastname);
							patientJsonResult.push(value[i].birthdate);
							patientJsonResult.push(value[i].primary_contact);
							patientJsonResult.push(appendPatientIcons());
							patientJsonResult.push(value[i].middlename);
							patientJsonResult.push(value[i].gender);
							patientJsonResult.push(value[i].address);
							patientJsonResult.push(value[i].email_address);
							patientJsonResult.push(value[i].secondary_contact);
							patientJsonResult.push(value[i].id);
							patientJsonResult.push(value[i].status);
							patientDataset.push(patientJsonResult);
							patientJsonResult = [];
							patientNum++;
						}
					}
				}
				console.log("Data: " + dataParse);
				console.log("array :" + patientJsonResult);
			}
		};
		console.log(patientDataset.status);
		patientTable.clear();
		patientTable.rows.add(patientDataset);
		patientTable.draw();

		updatePatient();

	});
}

function callAddPatientService() {
	$.post("/v1/addpatient",{patient_data : JSON.stringify(sendPatientInfo())})
	.done(function(data, status){
				//var status = JSON.stringify(data);
				alert(status);
				callGetPatientService();
				$(".modal .close").click();
			});
}

function callUpdatePatientService(){
	$.post("/v1/updatepatient",{patient_data : JSON.stringify(sendPatientInfo())})
	.done(function(data, status){
		alert(status);
		console.log( JSON.stringify(sendPatientInfo()));
		callGetPatientService();
		$(".modal .close").click();
	});
}

function callDeletePatientService(patientDBId){
	$.post("/v1/archivepatient",{patient_id : JSON.stringify(patientDBId)})
	.done(function(data, status){
		var status = JSON.stringify(data);
		alert(status);
		callGetPatientService();
	});
}