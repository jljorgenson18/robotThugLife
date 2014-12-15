// Initialize express and server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');
var mainSocket = require('./robot-server/mainSocket.js')
var botName = require("./config.json").botName;
var botConstructor = require("./robot-server/" + botName + "/bot.js");
// Access server through port  8080
app.set('port', process.env.PORT || 8080);
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

// Set '/public' as the static folder. Any files there will be directly sent to the viewer
app.use(express.static(__dirname + '/robot-ui'));
// Set index.html as the base file
app.get('/', function (req, res) {
    console.log("Sending html...");
    res.sendFile(path.resolve(__dirname + '../robot-ui/index.html'));
});

mainSocket.init(server, botConstructor, botName);