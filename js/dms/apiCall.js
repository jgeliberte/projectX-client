$(document).ready(function() {

    $('#patientMenu').click(function(){
        getPatientList();
    });

    function getPatientList(){
        var patientResult;
        $.getJSON("/v1/fetchallpatient", function(data){
            console.log("Data fetch: " + JSON.stringify(data));
            var patientCount = 0;
            for (var key in data) {
                if(data.hasOwnProperty(key)){
                    patientCount++;
                    var value = data[key];
                    console.log("Data: " + JSON.stringify(value));
                    patientResult = JSON.stringify(value);
                }
            };
        });
       return patientResult;
    }

    $("button").click(function(){
        $.post("demo_test_post.asp",
        {
            name: "Donald Duck",
            city: "Duckburg"
        },
        function(data, status){
            alert("Data: " + data + "\nStatus: " + status);
        });
    });
});