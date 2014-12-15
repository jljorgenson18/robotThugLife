module.exports = function () {
    console.log('Constructing Bot...');
    var bot = {};
    var j5 = require("johnny-five");

    bot.board = new j5.Board();
    bot.ready = false;
    bot.board.on("ready", function () {
        console.log("ready freddy");
        initComponents();
        initListeners();
        bot.ready = true;
    });
    return bot;

    function initListeners() {
        bot.board.on('led1-On', function () {
            bot.ledOne.on();
        });
        bot.board.on('led1-Off', function () {
            bot.ledOne.off();
        });
        bot.board.on('led2-On', function () {
            bot.ledTwo.on();
        });
        bot.board.on('led2-Off', function () {
            bot.ledTwo.off();
        });
        bot.board.on('led3-On', function () {
            bot.ledThree.on();
        });
        bot.board.on('util1', function () {
            bot.ledTwo.strobe();
        });
        bot.board.on('util2', function () {
            bot.ledTwo.stop();
        });
    }

    function initComponents() {
        bot.ledOne = new j5.Led(13);
        bot.ledTwo = new j5.Led(11);
        bot.ledThree = new j5.Led(12);
        bot.ledFour = new j5.Led(10);
    }
};