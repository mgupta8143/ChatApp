const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


const io = socketio(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        io.emit("disconnect", socket.username + " disconnected");
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', socket.username + ": " + msg);
    });
    socket.on('send username', (username) => {
        socket.username = username;
        io.emit('send username', username + " joined.");
    });
})


server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});