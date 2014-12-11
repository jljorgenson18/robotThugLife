module.exports.board = getBoard();
module.exports.sendToBot = sendToBot;

function getBoard() {
    var five = require("johnny-five"),
        board, ledOne, ledTwo;

    // collect command information from server. left toggles led 1 right toggles led 2

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
    return board;
}

function sendToBot(data) {
    var command = data.command;
    if (command == 'led1-On') {
        ledOne.on();

        board.repl.inject({
            led1: ledOne
        });
    } else if (commanzd == 'led1-Off') {
        led.off()

        board.repl.inject({
            led1: ledOne
        });
    }
}