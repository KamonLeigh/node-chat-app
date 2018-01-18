const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public')
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

const port = process.env.PORT || 3000;


io.on('connection',(socket)=>{
    console.log('New user connected');

    
    // socket.emit('newMessage',{
    //     from:'john',
    //     text:'Hey, there!',
    //     createdAt:123,
    // });

    socket.on('createMessage', (message)=>{
        console.log('create Message', message);
        io.emit('newMessage',{
            form:message.from,
            text:message.text,
            createdAt: new Date().getTime()
        });
    });
    socket.on('disconnect',()=>{
        console.log('User disconnected');
    });

});


server.listen(port,()=>{
    console.log(`Listening on port: ${port}`)
})