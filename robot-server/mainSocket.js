module.exports.init = function (server, board) {
    var io = require('socket.io').listen(server);
    var connectToJ5 = true;
    io.sockets.on('connection', function (socket) {
        // Send out a message (only to the one who connected)
        socket.emit('robot connected', {
            data: 'Connected'
        });
        var myBoard = board("firstBot");
        // When I've received 'robot command' message from this connection...
        socket.on('robot command', function (data) {
            console.log(data);
            if (data.command === 'connected') {
                connectToJ5 = true;
            }
            if (data.command === "debugConnected") {
                connectToJ5 = false;
            }
            if (connectToJ5) {
                if (myBoard.ready) {
                    myBoard.sendToBot(data);
                } else {
                    console.log("Board not Ready");
                }
            }
        });
    });
}