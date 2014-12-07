// Initialize express and server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');

// Access server through port  8080
app.set('port', process.env.PORT || 8080);
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);

// Set '/public' as the static folder. Any files there will be directly sent to the viewer
app.use(express.static(__dirname + '/robot-ui'));
// Set index.html as the base file
app.get('/', function (req, res) {
    console.log("Sending html...");
    res.sendFile(path.resolve(__dirname + '../robot-ui/index.html'));
});

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