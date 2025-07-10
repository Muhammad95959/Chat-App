import path from "path";
import http from "http";
import express from "express";
import { Server as SocketIOServer } from "socket.io";

const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("A new user just connected");
  socket.on("disconnect", () => console.log("User was disconnected"));
});

server.listen(port, () =>
  console.log(`Server is up on http://localhost:${port}`),
);
