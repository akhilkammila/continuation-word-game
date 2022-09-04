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

const players = new Map();

// first event, runs when client connects
// the socket is the client essentially, it comes from the arg
io.on("connection", (socket) => {

    console.log(`Client connected: ${socket.id}`)

    // LISTENS for a socket trying to join a room, then CONNECTS IT to the room
    socket.on("join_room", (data) =>{
        console.log('socket is trying to join a room')

        let clientsInRoom = 0;
        if (io.sockets.adapter.rooms.has(data.room)) clientsInRoom = io.sockets.adapter.rooms.get(data.room).size

        players.set(data.room, players.has(data.room) ? players.get(data.room).concat(data.id) : [data.id])

        socket.join(data.room)
        socket.to(data.room).emit("someone_joined", data.id, clientsInRoom+1, players.get(data.room))
        socket.emit("someone_joined", data.id, clientsInRoom+1, players.get(data.room))
    })

    // LISTENS for a socket sending a message, then emits to ALL SOCKETS IN THE ROOM
    socket.on("start_game", (room, startingLetter)=>{
        socket.to(room).emit("receive_start_game", startingLetter)
    })

    // Receive another player's turn
    socket.on("sending_letter", (room, letter)=>{
        socket.to(room).emit("receive_letter", letter)
    })

})

// just confirms that server is running
server.listen(3001, ()=>{
    console.log('server is running')
})