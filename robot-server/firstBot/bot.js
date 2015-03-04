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

    function initComponents() {
      var ledPins = [2,3,4,5,6,7,8,9];
      bot.leds = [];

      for (var i = 0; i < ledPins.length; i++){
        var myLed = new j5.Led(ledPins[i]);
        bot.leds.push(myLed);
      }
    }

    function initListeners() {
        bot.board.on('util1', function () {
          for (var i = 0; i < bot.leds.length; i++) {
            bot.leds[i].on();
          }
        });

        bot.board.on('util2', function () {
          for (var i = 0; i < bot.leds.length; i++) {
            bot.leds[i].off();
          }
        });
        bot.board.on('util3', function () {
          var delay = 1;
          bot.board.counter = 0;
          for (var i = 0; i < bot.leds.length; i++) {
            var led = bot.leds[i];
            bot.board.wait(delay,function(){
                console.log(this.counter + " on");
                bot.leds[this.counter].on();
            });
            bot.board.wait(delay + 200,function(){
                console.log(this.counter + " off");
                bot.leds[this.counter].off();
                this.counter = (this.counter + 1) % bot.leds.length;
            });
            delay += 500;
          }
        });
    }
};
