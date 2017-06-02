var inventoryId = "";

$(document).ready(function() {
	$('#inventoryMenu').click(function(){
		window.location = '/v1/dentalinventory';
	});

	initializeInventoryDataTable();
	callGetInventory();

	$('#btnAddInventory').on('click', function(){
		if(inventoryData == null){
			callAddInventory();
			inventoryData = null;
		} else {
			callUpdateInventory();
			inventoryData = null;
			inventoryId = "";
		}
	});
});

function appendInvetorysIcons() {
	var icons = "<div style='display: block;text-align: center;'>" + 
	"<span class='updateInventory glyphicon glyphicon-pencil' aria-hidden='true' style='margin-right: 15%;'></span>" + 
	"<span class='archiveInventory glyphicon glyphicon-trash' aria-hidden='true'></span>" + 
	"</div>"

	return icons;
}

function setInventoryData(inventoryValue){
	inventoryId = inventoryValue[6];
	$('#name').val(inventoryValue[2]);
	$('#code').val(inventoryValue[1]);
	$('#qty').val(inventoryValue[3]);
	$('#price').val(inventoryValue[4]);
}

function sendInventoryInfo(){
	var inventory = {};
	
	if(inventoryId != ""){
		inventory["idinventory"] = inventoryId;
	}

	inventory["item_code"] = $("#code").val();
	inventory["item_name"] =  $("#name").val();
	inventory["item_quantity"] = $("#qty").val();
	inventory["item_price"] = $("#price").val();
	inventory["date_created"] = getCurentDate();
	inventory["date_updated"] = getCurentDate();

	return inventory;
}