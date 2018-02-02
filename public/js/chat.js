

let socket = io(); //Making an request from the client to the server to open a websocket and keep it open
       
function scrollToBottom(){
    //selectors 
    const messages = $('#messages');
    const newMessage = messages.children('li:last-child');
    //Height
    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }

}
            
        socket.on('connect',function(){
            let params = $.deparam(window.location.search);
            
            socket.emit('join', params, function(err){
                if(err){
                    alert(err);
                    window.location.href = '/'
                }else{
                    console.log('No error');
                }
            })
            
            
            // socket.emit('createMessage',{
            //     from:'Byron',
            //     text:'Hello'
            // });
        });

        socket.on('disconnect',function(){
            console.log('Disconnected from server');
        })

       socket.on('updateUserList', function(users){
           console.log('Users list', users);
       });

       socket.on('updateUserList', function(users){
           const ol = $('<ol></ol>');

            users.forEach(function(user){
                ol.append($('<li></li>').text(user))
            });

            $('#users').html(ol);
       });

        socket.on('newMessage',function(message){
           let formattedTime = moment(message.createdAt).format('h:mm a');
            let template = $('#message-template').html();
           let html = Mustache.render(template,{
               text: message.text,
               from: message.from,
               createdAt: formattedTime
           });

           $('#messages').append(html);
            scrollToBottom();
        })

        socket.on('newLocationMessage', function(message){
            let formattedTime = moment(message.createdAt).format('h:mm a');
            let template = $('#location-message-template').html();

            let html = Mustache.render(template,{
                from: message.from,
                url: message.url,
                createdAt: formattedTime
            })

            $('#messages').append(html);
            // let formattedTime = moment(message.createdAt).format('h:mm a');
            // let li = $('<li></li>');
            // let a = $('<a target="_blank">My current location</a>');

            // li.text(`${message.from} ${formattedTime}: `);
            // a.attr('href', message.url);
            // li.append(a);
            // $('#messages').append(li);
            scrollToBottom();
        });


      $('#message-form').on('submit',function(e){
        e.preventDefault();
        
        const messageTextBox = $('[name=message');

        socket.emit('createMessage',{
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


