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