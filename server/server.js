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

    socket.on('disconnect',()=>{
        console.log('User disconnected');
    })
})




server.listen(port,()=>{
    console.log(`Listening on port: ${port}`)
})