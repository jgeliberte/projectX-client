var logsTable;

$(document).ready(function() {
	$('#logsMenu').click(function(){
		window.location = '/v1/logs';
	});

	$.getJSON("/v1/fetchlogs", function(data_set){

		var dataset = [];
		var dataraw= [];

		for (var counter = 0; counter < data_set.length; counter++) {
			var dataraw = $.map(data_set[counter], function(value, index) {
			    return [value];
			});
			dataset.push(dataraw);
		}

		logsTable = $('#logs').DataTable( {
			data: dataset,
			columns: [
			{title: "#"},
			{title: "Logs"}
			]
		});
	});
});