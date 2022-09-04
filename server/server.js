const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { Socket } = require("dgram");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

// first event, runs when client connects
// the socket is the client essentially, it comes from the arg
io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`)

    // LISTENS for a socket trying to join a room, then CONNECTS IT to the room
    socket.on("join_room", (data) =>{
        console.log('socket is trying to join a room')

        socket.join(data.room)
        socket.to(data.room).emit("someone_joined", data.id)
    })

    // LISTENS for a socket sending a message, then emits to ALL SOCKETS IN THE ROOM
    socket.on("send_message", (data)=>{
        console.log(data.room)
        socket.to(data.room).emit("receive_message", data.id)
    })

})

// just confirms that server is running
server.listen(3001, ()=>{
    console.log('server is running')
})