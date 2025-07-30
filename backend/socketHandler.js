// backend/socketHandler.js
const store = require("./memoryStore");

function handleSocket(socket, io) {
  socket.emit("load-document", store.document);

  socket.on("send-changes", (data) => {
    store.document = data;
    socket.broadcast.emit("receive-changes", data);
  });

  socket.on("save-document", () => {
    console.log("Document saved in memory:", store.document);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
}

module.exports = handleSocket;
