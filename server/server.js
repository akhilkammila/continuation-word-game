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

    // GETTING the send_message event FROM A CLIENT
    socket.on("send_message", (arg) =>{
        console.log(arg)

        // BROADCAST event BACK TO EVERY CLIENT
        socket.broadcast.emit("receive_message", arg)
    })
})

// just confirms that server is running
server.listen(3001, ()=>{
    console.log('server is running')
})