const http = require('http')
const express = require('express')
const socketio = require('socket.io')


const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = 4001
let lt = 0;
let ln = 0;
io.on('connection',(socket)=>{
    console.log('New Connection')

    socket.on('send',(coords)=>{
        io.emit('display-loc',coords);
    })
    
    
})
 

server.listen(port,()=>{
    console.log("server is up at port 4001")
})
