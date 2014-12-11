module.exports.init = function () {
    var j5 = require("johnny-five"),
        board, ledOne, ledTwo;

    // collect command information from server. left toggles led 1 right toggles led 2

    // Initialize connection to Arduino (will crash if none is attached)
    board = new j5.Board();

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

module.exports.sendToBot = function (board, data) {
    var command = data.command;
    if (command == 'led1-On') {
        ledOne.on();

        board.repl.inject({
            led1: ledOne
        });
    } else if (command == 'led1-Off') {
        ledOne.off()

        board.repl.inject({
            led1: ledOne
        });
    } else if (command == 'led2-On') {
        ledTwo.on()

        board.repl.inject({
            led2: ledTwo
        });
    } else if (command == 'led2-Off') {
        ledTwo.off()

        board.repl.inject({
            led2: ledTwo
        });
    } else if (command == 'util1') {
        ledTwo.strobe()

        board.repl.inject({
            led2: ledTwo
        });
    } else if (command == 'util2') {
        ledTwo.stop()

        board.repl.inject({
            led2: ledTwo
        });
    }
}