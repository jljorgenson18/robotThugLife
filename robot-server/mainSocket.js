module.exports.init = function (server, board) {
    var io = require('socket.io').listen(server);

    io.sockets.on('connection', function (socket) {
        // Send out a message (only to the one who connected)
        socket.emit('robot connected', {
            data: 'Connected'
        });

        // When I've received 'robot command' message from this connection...
        socket.on('robot command', function (data) {
            console.log(data);
            if (data.command === 'connected') {
                board.sendToBot(data);
            }
        });
    });
}