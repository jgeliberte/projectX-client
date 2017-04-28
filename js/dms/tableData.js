$(document).ready(function() {
	$('#example').DataTable( {
        data: displayPatientData(),
        buttons: [
        {
                extend:    'copyHtml5',
                text:      '<i class="fa fa-files-o"></i>',
                titleAttr: 'Copy'
            }
        ]
    } );
	

	function displayPatientData(){
		var patientData = [
		["1" , "Juan" , "Dela Cruz" , "26" , "09012345678"],
		["2" , "Maria" , "Clara" , "21" , "09253457810"],
		["3" , "John" , "Geliberte" , "23" , "099946193003"]
		];

		return patientData;
	}
});
