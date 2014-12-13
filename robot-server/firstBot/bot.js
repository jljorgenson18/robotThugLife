module.exports.onReady = function () {
    var myBoard = this;
    var j5 = require("johnny-five");
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
}

module.exports.sendToBot = function (data) {
    var myBoard = this;
    var ledOne = myBoard.ledOne;
    var ledTwo = myBoard.ledTwo;
    var ledThree = myBoard.ledThree;
    var ledFour = myBoard.ledFour;
    var command = data.command;
    if (command == 'led1-On') {
        ledOne.on();

        myBoard.repl.inject({
            led1: ledOne
        });
    } else if (command == 'led1-Off') {
        ledOne.off()

        myBoard.repl.inject({
            led1: ledOne
        });
    } else if (command == 'led2-On') {
        ledTwo.on()

        myBoard.repl.inject({
            led2: ledTwo
        });
    } else if (command == 'led2-Off') {
        ledTwo.off()

        myBoard.repl.inject({
            led2: ledTwo
        });
    } else if (command == 'led3-On') {
        ledThree.on()

        myBoard.repl.inject({
            led3: ledThree
        });
    } else if (command == 'led3-Off') {
        ledThree.off()

        myBoard.repl.inject({
            led3: ledThree
        });
    } else if (command == 'util1') {
        ledTwo.strobe()

        myBoard.repl.inject({
            led2: ledTwo
        });
    } else if (command == 'util2') {
        ledTwo.stop()

        myBoard.repl.inject({
            led2: ledTwo
        });
    }
}