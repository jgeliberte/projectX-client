var serviceTable;
var dentalServiceResult = [];
var dentalServiceNum = 1;

$(document).ready(function() {
	
	initializeServiceDataTable();
	getDentalService();

	$("#btnAddService").on("click", function(){
		addDentalService();
	});

});

function initializeServiceDataTable(){
	serviceTable = $('#dentalService').DataTable( {
		columns: [
		{title: "#"},
		{title: "Name"},
		{title: "Fee"},
		{title: "Date Created"},
		{title: ""}
		]
	} );
}

function getDentalService(){
	var dentalDataSet = [];
	$.getJSON("/v1/getallservices", function(data){
		for (var key in data) {
			if(data.hasOwnProperty(key)){
				var value = data[key];
				console.log(value);
				var dataParse = JSON.stringify(value);
				for (var i = 0; i < value.length; i++) {
					if(value[i].service_name != null){
						dentalServiceResult.push(dentalServiceNum);
						dentalServiceResult.push(value[i].service_name);
						dentalServiceResult.push(value[i].service_fee);
						dentalServiceResult.push(value[i].date_created);
						dentalServiceResult.push(appendDentalServiceIcons());
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

	});
}

function appendDentalServiceIcons() {
	var icons = "<div style='display: block;text-align: center;'>" + 
	"<span class='updateService glyphicon glyphicon-pencil' aria-hidden='true' style='margin-right: 15%;'></span>" +
	"<span class='archiveService glyphicon glyphicon-trash' aria-hidden='true'></span>" +
	"</div>"

	return icons;
}

function addDentalService(){
	$.post("/v1/addservice",{service_data : JSON.stringify(sendDentalServiceInfo())})
	.done(function(data, status){
				alert(data);
				$(".modal .close").click();
				getDentalService();
			});
}

function sendDentalServiceInfo(){
	var dentalService = {};
	dentalService["service_name"] = $("#serviceName").val();
	dentalService["service_fee"] =  $("#fee").val();
	dentalService["date_created"] = "2017-01-02";
	dentalService["date_updated"] = "2017-01-02";

	return dentalService;
}