const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(__dirname + "/public"));

// Serve index.html for the root URL
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("connected...");
  socket.on("msg", (msg) => {
    socket.broadcast.emit("msg", msg);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
