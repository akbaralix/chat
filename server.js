const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { text } = require("stream/consumers");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Yangi user:", socket.id);

  socket.on("chat message", (msg) => {
    io.emit("chat message", { id: socket.id, text: msg });
  });

  socket.on("disconnect", () => {
    console.log("Foydalanuvchi uzuldi: ", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log("Server ishga tushdi: ", PORT);
});
