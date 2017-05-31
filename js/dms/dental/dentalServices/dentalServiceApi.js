function callGetDentalServices() {
	var dentalServiceResult = [];
	var dentalServiceNum = 1;
	var dentalDataSet = [];
	$.getJSON("/v1/getallservices", function(data){
		for (var key in data) {
			if(data.hasOwnProperty(key)){
				var value = data[key];
				console.log(value);
				var dataParse = JSON.stringify(value);
				for (var i = 0; i < value.length; i++) {
					if(value[i].service_name != null){
						dentalServiceResult.push(i+1);
						dentalServiceResult.push(value[i].service_name);
						dentalServiceResult.push(value[i].service_fee);
						dentalServiceResult.push(value[i].date_created);
						dentalServiceResult.push(appendDentalServiceIcons());
						dentalServiceResult.push(value[i].id);
						dentalDataSet.push(dentalServiceResult);
						dentalServiceResult = [];
						dentalServiceNum++;
					}
				}
				console.log("DataDental: " + dataParse);
				console.log("arrayDental :" + dentalDataSet);
			}
		};
		serviceTable.clear();
		serviceTable.rows.add(dentalDataSet);
		serviceTable.draw();

		updateService();

	});
}

function callAddDentalService(){
	$.post("/v1/addservice",{service_data : JSON.stringify(sendDentalServiceInfo())})
	.done(function(data, status){
		alert(data);
		callGetDentalServices();
		$(".modal .close").click();

	});
}

function calUpdateDentalService(){
	$.post("v1/updateservice",{service_data : JSON.stringify(sendDentalServiceInfo())})
	.done(function(data, status){
		alert(data);
		callGetDentalServices();
		$(".modal .close").click();

	});
}

function callDeleteDentalService(serviceId){
	$.post("/v1/archiveservice",{patient_id : JSON.stringify(serviceId)})
	.done(function(data, status){
		var status = JSON.stringify(data);
		alert(status);
		getPatientFromServer();
	});
}