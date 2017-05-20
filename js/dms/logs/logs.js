var logsTable;

$(document).ready(function() {
	$('#logsMenu').click(function(){
		window.location = '/v1/logs';
	});

	// $.getJSON("/v1/fetchLogs", function(data){

	// });
	
	logsTable = $('#logs').DataTable( {
			columns: [
			{title: "#"},
			{title: "Logs"}
			]
		} );
});