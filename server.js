// Initialize express and server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');
//// JOHNNY FIVE SHIT

var five = require("johnny-five"),
    board, ledOne, ledTwo;

// collect command information from server. left toggles led 1 right toggles led 2

var left = false;
var right = false;
// Initialize connection to Arduino (will crash if none is attached)
board = new five.Board();

// When the connection is ready...
board.on("ready", function () {
    // create LEDs
    ledOne = new j5.Led(13)
    ledTwo = new j5.Led(11)

    // Inject LEDs
    board.repl.inject({
        led1: ledOne
    });
    board.repl.inject({
        led2: ledTwo
    })
});


// Access server through port  8080
app.set('port', process.env.PORT || 8080);
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

// Set '/public' as the static folder. Any files there will be directly sent to the viewer
app.use(express.static(__dirname + '/robot-ui'));
// Set index.html as the base file
app.get('/', function (req, res) {
    console.log("Sending html...");
    res.sendFile(path.resolve(__dirname + '../robot-ui/index.html'));
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    // Send out a message (only to the one who connected)
    socket.emit('robot connected', {
        data: 'Connected'
    });

    // When I've received 'robot command' message from this connection...
    socket.on('robot command', function (data) {
        console.log(data);
        sendToBot(data);
    });
});

function sendToBot(data) {
    var command = data.command;
    if (command == 'led1-On') {
        ledOne.on();

        board.repl.inject({
            led1: ledOne
        });
    } else if (command == 'led1-Off') {
        led.off()

        board.repl.inject({
            led1: ledOne
        });
    }
}