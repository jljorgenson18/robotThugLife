module.exports = function (botName) {
    console.log("Initializing " + botName + "...");
    var j5 = require("johnny-five");
    var myBoard, bot;
    // Initialize connection to Arduino (will crash if none is attached)
    bot = require('./' + botName + '/bot.js');
    myBoard = new j5.Board();

    //This should be working...
    myBoard.ready = false;
    myBoard.on("ready", function () {
        myBoard.ready = true;
        // create LEDs
        myBoard.ready = bot.ready;
        myBoard.sendToBot = bot.sendToBot;
        myBoard.ready();
    });
    return myBoard;
}