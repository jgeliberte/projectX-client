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

// function initializeServiceDataTable(){
// 	serviceTable = $('#dentalService').DataTable( {
// 		columns: [
// 		{title: "#"},
// 		{title: "Name"},
// 		{title: "Fee"},
// 		{title: "Date Created"},
// 		{title: ""}
// 		]
// 	} );
// }

// function getDentalService(){
	// var dentalDataSet = [];
	// $.getJSON("/v1/getallservices", function(data){
	// 	for (var key in data) {
	// 		if(data.hasOwnProperty(key)){
	// 			var value = data[key];
	// 			console.log(value);
	// 			var dataParse = JSON.stringify(value);
	// 			for (var i = 0; i < value.length; i++) {
	// 				if(value[i].service_name != null){
	// 					dentalServiceResult.push(i+1);
	// 					dentalServiceResult.push(value[i].service_name);
	// 					dentalServiceResult.push(value[i].service_fee);
	// 					dentalServiceResult.push(value[i].date_created);
	// 					dentalServiceResult.push(appendDentalServiceIcons());
	// 					dentalServiceResult.push(value[i].id);
	// 					dentalDataSet.push(dentalServiceResult);
	// 					dentalServiceResult = [];
	// 					dentalServiceNum++;
	// 				}
	// 			}
	// 			console.log("DataDental: " + dataParse);
	// 			console.log("arrayDental :" + dentalDataSet);
	// 		}
	// 	};
	// 	serviceTable.clear();
	// 	serviceTable.rows.add(dentalDataSet);
	// 	serviceTable.draw();

	// 	updateService();

	// });
// }

function appendDentalServiceIcons() {
	var icons = "<div style='display: block;text-align: center;'>" + 
	"<span class='updateService glyphicon glyphicon-pencil' aria-hidden='true' style='margin-right: 15%;'></span>" +
	"<span class='archiveService glyphicon glyphicon-trash' aria-hidden='true'></span>" +
	"</div>"

	return icons;
}

// function addDentalService(){
// 	$.post("/v1/addservice",{service_data : JSON.stringify(sendDentalServiceInfo())})
// 	.done(function(data, status){
// 				alert(data);
// 				getDentalService();
// 				$(".modal .close").click();
				
// 			});
// }

// function updateDentalService(){
// 	$.post("v1/updateservice",{service_data : JSON.stringify(sendDentalServiceInfo())})
// 	.done(function(data, status){
// 				alert(data);
// 				getDentalService();
// 				$(".modal .close").click();
				
// 			});
// }

// function updateService(){
// 	$("#dentalService tbody").on('click', '.updateService' , function(){
// 		var closestRow = $(this).closest('tr');
// 		dentalData = serviceTable.row(closestRow).data();
// 		$('#addService').modal('show');
// 		setDentalService(dentalData);
// 	});
// }

function setDentalService(serviceValue){
	dentalServiceId = serviceValue[11];
	$('#serviceName').val(serviceValue[1]);
	$('#fee').val(serviceValue[2]);
}

// function deleteDentalService(){
// 	$("#dentalService tbody").on('click', '.archiveService' , function(){
// 		var closestRow = $(this).closest('tr');
// 		var deletePatientId = serviceTable.row(closestRow).data();
// 		if (confirm("Do you want to delete?")) {
// 			deleteDentalServiceFromServer(deletePatientId[5]);
// 		}
// 		return false;
		
// 	});
// }

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

