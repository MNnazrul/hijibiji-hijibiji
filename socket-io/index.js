const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const { createServer } = require("node:http");
const { join } = require("node:path"); // Fix import

const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static(join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("a user is connected", socket.id);
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server is running at PORT = ${PORT}`);
});
