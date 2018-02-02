const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage, generateLocationMessage} = require('./utils/message');
const{isRealString} = require('./utils/validation');
const{Users}= require('./utils/users');

const publicPath = path.join(__dirname, '../public');
let app = express();
const port = process.env.PORT || 3000;
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();


app.use(express.static(publicPath));




io.on('connection',(socket)=>{
    console.log('New user connected');

    //socket.emit from admn text welcome to the chat app
    //socket.broadcast.emit from Admin text New user joined
    
 
    socket.on('join', (params, callback)=>{
        if(!isRealString(params.name)|| !isRealString(params.room)){
            return callback('Name and room name are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id ,params.name, params.room);
        
        // //socket.leave('The Office Fans')

        //io.emit -> io.to('The Office Fans').emit
        //socket.broadcast.emit --> socket.broadcast.to('The office fans').emit
        //socket.emit
       
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat App'))
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`))
  
        callback();
    });

    // socket.emit('newMessage',{
    //     from:'john',
    //     text:'Hey, there!',
    //     createdAt:123,
    // });

    socket.on('createMessage', (message, callback)=>{
        let user = users.getUser(socket.id);

        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
        }
        
        callback();
        // socket.broadcast.emit('newMessage',{
        //     form:message.from,
        //     text:message.text,
        //     createdAt: new Date().getTime()
        // })
    });

    socket.on('createLocationMessage',(coords)=>{
        let user = users.getUser(socket.id)

        if(user){
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude,coords.longitude));            
        }
    });

    socket.on('disconnect',()=>{
        let user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room))
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`))
        }
    });

});


server.listen(port,()=>{
    console.log(`Listening on port: ${port}`)
})