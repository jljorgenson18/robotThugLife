// Initialize express and server
var express = require('express')
var app = express(),
    server = require('http').createServer(app);

// Access server through port 80
server.listen(80);

// Set '/public' as the static folder. Any files there will be directly sent to the viewer
app.use(express.static(__dirname + '/public'));

// Set index.html as the base file
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

// Link socket.io to the previously created server
var io = require('socket.io').listen(server);

// When someone has connected to me...
io.sockets.on('connection', function (socket) {
    // Send out a message (only to the one who connected)
    socket.emit('robot connected', {
        data: 'Connected'
    });

    // When I've received 'robot command' message from this connection...
    socket.on('robot command', function (data) {
        console.log(data);
    });
});