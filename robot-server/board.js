module.exports.init = function (dumby) {
    console.log("Initializing board");
    var j5 = require("johnny-five");
    var myBoard;

    // Initialize connection to Arduino (will crash if none is attached)
    myBoard = new j5.Board();

    //This should be working...
    //myBoard.ready = false; 
    myBoard.on("ready", function () {
        // create LEDs
        myBoard.ledOne = new j5.Led(13)
        myBoard.ledTwo = new j5.Led(11)
        myBoard.ledThree = new j5.Led(12)
        myBoard.ledFour = new j5.Led(10)

        // Inject LEDs
        myBoard.repl.inject({
            led1: myBoard.ledOne
        });
        myBoard.repl.inject({
            led2: myBoard.ledTwo
        });
        myBoard.repl.inject({
            led3: myBoard.ledThree
        });
        myBoard.repl.inject({
            led4: myBoard.ledFour
        });
        myBoard.ready = true;
    });
    return myBoard;
}

module.exports.sendToBot = function (board, data) {
    var ledOne = board.ledOne;
    var ledTwo = board.ledTwo;
    var ledThree = board.ledThree;
    var ledFour = board.ledFour;
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
    } else if (command == 'led3-On') {
        ledThree.on()

        board.repl.inject({
            led3: ledThree
        });
    } else if (command == 'led3-Off') {
        ledThree.off()

        board.repl.inject({
            led3: ledThree
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