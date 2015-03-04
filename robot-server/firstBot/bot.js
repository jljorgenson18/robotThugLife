module.exports = function() {
    console.log('Constructing Bot...');
    var bot = {};
    var j5 = require("johnny-five");

    bot.board = new j5.Board();
    bot.ready = false;
    bot.board.on("ready", function() {
        console.log("ready freddy");
        initComponents();
        initListeners();
        bot.ready = true;
    });
    return bot;

    function initComponents() {
        var ledPins = [2, 3, 4, 5, 6, 7, 8, 9];
        bot.leds = [];

        for(var i = 0; i < ledPins.length; i++) {
            var myLed = new j5.Led(ledPins[i]);
            bot.leds.push(myLed);
        }
    }

    function initListeners() {
        bot.board.on('util1', function() {
            for(var i = 0; i < bot.leds.length; i++) {
                bot.leds[i].on();
            }
        });

        bot.board.on('util2', function() {
            for(var i = 0; i < bot.leds.length; i++) {
                bot.leds[i].off();
            }
        });
        bot.board.on('util3', function() {
            var delay = 0;
            //var loopLength = bot.leds.length;
            var loopLength = 2000;
            bot.board.counter = 0;
            for(var i = 0; i < loopLength; i++) {
                ledFlash(i, delay);
                delay += 200;
            }

        });
    }

    function ledFlash(idx, delay) {
        var led = bot.leds[idx];
        bot.board.wait(delay, function() {
            //console.log(bot.board.counter + " on");
            bot.leds[bot.board.counter].on();
        });
        bot.board.wait(delay + 500, function() {
            //console.log(bot.board.counter + " off");
            bot.leds[bot.board.counter].off();
            bot.board.counter = (bot.board.counter + 1) % bot.leds.length;
        });
    }
};
