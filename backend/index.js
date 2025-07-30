const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let documentContent = '';

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  socket.emit('load-document', documentContent);

  socket.on('send-changes', (data) => {
    documentContent = data;
    socket.broadcast.emit('receive-changes', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = 5002;
server.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
