const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// index.html ni yuborish
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Socket.IO
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
