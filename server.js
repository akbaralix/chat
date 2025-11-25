// Faqat API / WebSocket server
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Yangi user:", socket.id);

  socket.on("chat message", (msg) => {
    io.emit("chat message", { id: socket.id, text: msg });
  });

  socket.on("disconnect", () => {
    console.log("Foydalanuvchi uzuldi:", socket.id);
  });
});

server.listen(3000, () => console.log("Server ishga tushdi: 3000"));
