const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Yangi user:", socket.id);

  socket.on("chat message", (data) => {
    io.emit("chat message", { id: socket.id, ...data });
  });

  socket.on("disconnect", () => {
    console.log("Foydalanuvchi uzuldi:", socket.id);
  });
});

server.listen(3000, () => console.log("Server 3000 portda ishlayapti"));
