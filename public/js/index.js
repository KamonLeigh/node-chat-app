let socket = io(); //Making an request from the client to the server to open a websocket and keep it open
        socket.on('connect',function(){
            console.log('connected to server');
            
            // socket.emit('createMessage',{
            //     from:'Byron',
            //     text:'Hello'
            // });
        });

        socket.on('disconnect',function(){
            console.log('Disconnected from server');
        })


        socket.on('newMessage',function(message){
            console.log('New message', message);
            let li = $('<li></li>');
            li.text(`${message.from}:${message.text}`);

            $('#messages').append(li);
        })


      $('#message-form').on('submit',function(e){
        e.preventDefault();

        socket.emit('createMessage',{
            from:'User',
            text:$('[name=message').val()
        }, function(){

        });
      });