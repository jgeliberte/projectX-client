$(document).ready(function() {
	$('#inventoryMenu').click(function(){
		window.location = '/v1/dentalinventory';
	});

	initializeInventoryDataTable();
});