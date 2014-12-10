  $(document).ready(function () {
      // Connect to the node.js server. Change the IP address to the actual node server location.
      $('.inputIP').focus(function () {
          $(this).val('');
      });
      $('.submitIP').click(function () {
          var host = $('.inputIP').val();
          connectToSocket(host);
      })

      $('.inputIP').bind('keypress', function (e) {
          var code = e.keyCode || e.which;
          if (code == 13) {
              var host = $('.inputIP').val();
              connectToSocket(host);
          }
      });

      function connectToSocket(host) {

          console.log("host = " + host);
          var socket = io.connect('http://' + host);
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
      }

  });