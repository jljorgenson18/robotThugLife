  $(document).ready(function () {
      // Connect to the node.js server. Change the IP address to the actual node server location.
      $('.inputIP').focus(function () {
          $(this).val('');
      });
      $('.submitIP').click(function () {
          var host = $('.inputIP').val();
          connectToSocket(host);
      });

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
                  command: 'Nigga you know we connected'
              });
          });

          // When the html buttons are clicked...
          $('.util').click(function () {
              var id = $(this).attr('id')
              socket.emit('robot command', {
                  command: id
              });
          });
          $('.led1').click(function () {
              $(this).toggleClass("ledOn");
              if ($(this).hasClass("ledOn")) {
                  socket.emit('robot command', {
                      command: "led1-On"
                  });
              } else {
                  socket.emit('robot command', {
                      command: "led1-Off"
                  });
              }
          });

          $('.led2').click(function () {
              $(this).toggleClass("ledOn");
              if ($(this).hasClass("ledOn")) {
                  socket.emit('robot command', {
                      command: "led2-On"
                  });
              } else {
                  socket.emit('robot command', {
                      command: "led2-Off"
                  });
              }
          });

      }

  });