const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage, generateLocationMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public')
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

const port = process.env.PORT || 3000;


io.on('connection',(socket)=>{
    console.log('New user connected');

    //socket.emit from admn text welcome to the chat app
    //socket.broadcast.emit from Admin text New user joined
    
    socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat App'))
    

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))



    // socket.emit('newMessage',{
    //     from:'john',
    //     text:'Hey, there!',
    //     createdAt:123,
    // });

    socket.on('createMessage', (message, callback)=>{
        console.log('create Message', message);
        io.emit('newMessage', generateMessage(message.from, message.text))
        callback('This is from the server');
        // socket.broadcast.emit('newMessage',{
        //     form:message.from,
        //     text:message.text,
        //     createdAt: new Date().getTime()
        // })
    });

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude,coords.longitude));
    });

    socket.on('disconnect',()=>{
        console.log('User disconnected');
    });

});


server.listen(port,()=>{
    console.log(`Listening on port: ${port}`)
})