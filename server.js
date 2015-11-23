// Requires
var connect = require('connect'),
    serveStatic = require('serve-static'),
    io = require('socket.io'),
    mysql = require('mysql'),
    PythonShell = require('python-shell');

// Web server connection
var app = connect().use(serveStatic(__dirname)),
    server = require('http').createServer(app),
    io = io.listen(server);

server.listen(1337);

// Database connection
var db = mysql.createConnection({
    host: 'localhost',
    user: 'yourUsername',
    password: 'yourPassword',
    port: 3306,
    database: 'yourDatabase'
});

// Destroy table
db.query('DROP TABLE IF EXISTS dht22', function(err) {
    if (err) {
        console.log(err);
    }
});

// Create new table
var queryCreateTable = '' +
    'CREATE TABLE dht22 ( ' +
    'id int unsigned not null auto_increment, ' +
    'celsius varchar(50) not null default \'Unknown\', ' +
    'fahrenheit varchar(50) not null default \'Unknown\', ' +
    'humidity varchar(50) not null default \'Unknown\', ' +
    'date_entered timestamp not null default CURRENT_TIMESTAMP, ' +
    'primary key (id)' +
    ')';

db.query(queryCreateTable, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Table dht22 has been is created.');
    }
});

// Run python script
PythonShell.run('sensor.py', function(err) {
    if (err) {
        console.log(err);
    }
});

// Variables
var connectionsArray = [],
    pollingInterval = 3000,
    pollingTimer;

var pollingLoop = function() {
    // Make the database query
    var queryGetData = db.query('SELECT * FROM dht22 ORDER BY id DESC'),
        temperatures = []; // this array will contain the result of our db query

    // Set up the query listeners
    queryGetData
        .on('error', function(err) {
            // Handle error, and 'end' event will be emitted after this as well
            console.log(err);
            updateSockets(err);
        })
        .on('result', function(temperature) {
            // It fills our array looping on each user row inside the db
            temperatures.push(temperature);
        })
        .on('end', function() {
            // Loop on itself only if there are sockets still connected
            if (connectionsArray.length) {
                pollingTimer = setTimeout(pollingLoop, pollingInterval);
                updateSockets({
                    temperatures: temperatures
                });
            }
        });
};

// Create a new websocket connection to keep the content updated without any AJAX request
io.sockets.on('connection', function(socket) {

    console.log('Number of connections: ' + connectionsArray.length);
    // Start the polling loop only if at least there is one user connected
    if (!connectionsArray.length) {
        pollingLoop();
    }

    socket.on('disconnect', function() {
        var socketIndex = connectionsArray.indexOf(socket);
        console.log('Socket = ' + socketIndex + ' disconnected');
        if (socketIndex >= 0) {
            connectionsArray.splice(socketIndex, 1);
        }
    });

    console.log('A new socket is connected!');
    connectionsArray.push(socket);
});

var updateSockets = function(data) {
    // Store the time of the latest update
    data.time = new Date();
    // Send new data to all the sockets connected
    connectionsArray.forEach(function(tmpSocket) {
        tmpSocket.volatile.emit('notification', data);
    });
};
