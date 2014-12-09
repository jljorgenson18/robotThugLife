  $(document).ready(function () {
      // Connect to the node.js server. Change the IP address to the actual node server location.
      var socket = io.connect('http://68.82.233.43:8080');
      // When I've received 'robot connected' message from the socket.io server...
      socket.on('robot connected', function (data) {
          console.log(data);
          $('#connected').html(data.data);
          // Send out a message to the server
          socket.emit('robot command', {
              command: 'nothing'
          });
      });

      // When the html buttons are clicked...
      $('#turn-left').click(function () {
          socket.emit('robot command', {
              command: "turn-left"
          });
      });
      $('#turn-right').click(function () {
          socket.emit('robot command', {
              command: "turn-right"
          });
      });
  });