const express = require('express')
const app = express();
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io')
const port = process.env.PORT || 5000;

const server = http.createServer(app);

app.use(cors())

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

app.get('/', (req, res) => {
    res.send('Hello from server')
})

io.on('connection', (socket) => {
    console.log('user connected with id:', socket.id);
    socket.on('join_room', (data) => {
        socket.join(data)
    })

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_msg', data)
    })
})

server.listen(port, () => {
    console.log('Server is running on port:', port);
})

