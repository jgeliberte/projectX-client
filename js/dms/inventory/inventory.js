$(document).ready(function() {
	$('#inventoryMenu').click(function(){
		window.location = '/v1/dentalinventory';
	});

	initializeInventoryDataTable();
	callGetInventory();
});

function sendInventoryInfo(){
	var inventory = {};
	dentalService["service_name"] = $("#serviceName").val();
	dentalService["service_fee"] =  $("#fee").val();
	dentalService["date_created"] = getCurentDate();
	dentalService["date_updated"] = getCurentDate();

	return dentalService;
}