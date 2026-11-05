
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.get("/", (req, res) => {
    res.send(`
    <h1>Socket.IO Demo</h1>
    <button onclick="sendMessage()">Send Message</button>
    <p id="output">Waiting for a message...</p>

    <script src="/socket.io/socket.io.js"></script>
    <script>
      const socket = io();

      socket.on("connect", () => {
        console.log("Connected:", socket.id);
      });

      function sendMessage() {
        socket.emit("chat-message", "Hello from browser!");
      }

      socket.on("server-reply", (message) => {
        document.getElementById("output").textContent = message;
      });
    </script>
  `);
});

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("chat-message", (message) => {
        console.log("Received:", message);

        socket.emit("server-reply", "Hello from Node.js server!");
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
