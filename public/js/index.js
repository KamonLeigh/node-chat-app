

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
            let formattedTime = moment(message.createdAt).format('h:mm a');
            let li = $('<li></li>');
            li.text(`${message.from} ${formattedTime}: ${message.text}`);

            $('#messages').append(li);
        })

        socket.on('newLocationMessage', function(message){
            let formattedTime = moment(message.createdAt).format('h:mm a');
            let li = $('<li></li>');
            let a = $('<a target="_blank">My current location</a>');

            li.text(`${message.from} ${formattedTime}: `);
            a.attr('href', message.url);
            li.append(a);
            $('#messages').append(li);
        });


      $('#message-form').on('submit',function(e){
        e.preventDefault();
        
        const messageTextBox = $('[name=message');

        socket.emit('createMessage',{
            from:'User',
            text:messageTextBox.val()
        }, function(){
            messageTextBox.val('');
        });
      });

      const locationButton = $('#send-location');

      locationButton.on('click', function (){
        if(!navigator.geolocation){
            return alert('Geolocation not supported by your browser.')
        }

        locationButton.attr('disabled','disabled').text('sending location...');

        navigator.geolocation.getCurrentPosition(function(position){
            locationButton.removeAttr('disabled').text('Send location');
            socket.emit('createLocationMessage',{
                latitude: position.coords.latitude,
                longitude:position.coords.longitude
            });
        }, function(){
            locationButton.removeAttr('disabled').text('Send location');
            alert('Unable to fetch location.')
        })
      });


