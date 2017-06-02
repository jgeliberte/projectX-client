$(document).ready(function() {
	$('#inventoryMenu').click(function(){
		window.location = '/v1/dentalinventory';
	});

	initializeInventoryDataTable();
	callGetInventory();

	$('#btnAddInventory').on('click', function(){
		//if(data == null){
			callAddInventory();
		// } else {
		// 	callUpdatePatientService();
		// }
	});
});

function appendInvetorysIcons() {
	var icons = "<div style='display: block;text-align: center;'>" + 
	"<span class='updateInventory glyphicon glyphicon-pencil' aria-hidden='true' style='margin-right: 15%;'></span>" + 
	"<span class='archiveInventory glyphicon glyphicon-trash' aria-hidden='true'></span>" + 
	"</div>"

	return icons;
}

function sendInventoryInfo(){
	var inventory = {};
	inventory["item_code"] = $("#code").val();
	inventory["item_name"] =  $("#name").val();
	inventory["item_quantity"] = $("#qty").val();
	inventory["date_created"] = getCurentDate();
	inventory["date_updated"] = getCurentDate();

	return inventory;
}