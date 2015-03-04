module.exports.init = function(server, botConstructor, botName) {
    var io = require('socket.io').listen(server);
    var connectToJ5 = true;
    io.sockets.on('connection', function(socket) {
        var myBot, uiConfig;
        console.log("Socket.io Connection");
        if(botName !== "none") {
            myBot = botConstructor();
            uiConfig = require('./' + botName + '/uiConfig.json');
        } else {
            uiConfig = "";
            connectToJ5 = false;
        }
        socket.emit('robot connected', {
            data: 'Connected',
            myBot: uiConfig
        });
        socket.on('robot command', function(data) {
            console.log(data);
            if(connectToJ5) {
                if(myBot.ready) {
                    myBot.board.emit(data.command);
                } else {
                    console.log("Board not Ready");
                }
            }
        });
    });
};
