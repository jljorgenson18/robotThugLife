// Initialize express and server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');
var mainSocket = require('robot-server/mainSocket.js');

// Access server through port 80
server.listen(8080);

// Set '/public' as the static folder. Any files there will be directly sent to the viewer
app.use(express.static(__dirname + '/robot-ui'));

// Set index.html as the base file
app.get('/', function (req, res) {
    console.log("Sending html...");
    res.sendFile(path.resolve(__dirname + '../robot-ui/index.html'));
});