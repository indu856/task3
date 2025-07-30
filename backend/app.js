// backend/app.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const handleSocket = require("./socketHandler");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  handleSocket(socket, io);
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
