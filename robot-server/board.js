module.exports.init = function () {
    console.log("Initializing board");
    var j5 = require("johnny-five");
    var myBoard;

    // collect command information from server. left toggles led 1 right toggles led 2

    // Initialize connection to Arduino (will crash if none is attached)
    myBoard = new j5.Board();
    //myBoard.ready = false;
    // When the connection is ready...
    myBoard.on("ready", function () {
        // create LEDs
        myBoard.ledOne = new j5.Led(13)
        myBoard.ledTwo = new j5.Led(11)

        // Inject LEDs
        myBoard.repl.inject({
            led1: myBoard.ledOne
        });
        myBoard.repl.inject({
            led2: myBoard.ledTwo
        });
        myBoard.ready = true;
    });
    return myBoard;
}

module.exports.sendToBot = function (board, data) {
    var ledOne = board.ledOne;
    var ledTwo = board.ledTwo;
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
