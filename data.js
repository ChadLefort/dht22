var socket = io.connect();

socket.on('notification', function(data) {
    var temperaturesList =
        '<table class="table table-striped">' +
            '<tr>' +
                '<td><b>ID</b></td>' +
                '<td><b>Celsuis</b></td>' +
                '<td><b>Fahrenheit</b></td>' +
                '<td><b>Humidity</b></td>' +
                '<td><b>Time Added</b></td>' +
            '</tr>';
    $.each(data.temperatures,function(index,temperature){
        temperaturesList +=
            '<tr>' +
                '<td>' + temperature.id + '</td>' +
                '<td>' + temperature.celsius + '</td>' +
                '<td>' + temperature.fahrenheit + '</td>' +
                '<td>' + temperature.humidity + '</td>' +
                '<td>' + new Date(temperature.date_entered).toLocaleTimeString() + '</td>' +
            '</tr>';
    });
    temperaturesList +=
        '</table>';
    $('#tempData').html(temperaturesList);
});
