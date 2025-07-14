import path from "path";
import http from "http";
import express from "express";
import { Server as SocketIOServer } from "socket.io";
import generateMessage from "./utils/message";

const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("A new user just connected");
  socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app!")); // send to the client only
  socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined!")); // broadcast to everyone except the sender
  socket.on("createMessage", (message, callback) => {
    console.log("create Message", message);
    io.emit("newMessage", generateMessage(message.from, message.text)); // broadcast to everyone
    callback("This is server.");
  });
  socket.on("disconnect", () => console.log("User was disconnected"));
});

server.listen(port, () => console.log(`Server is up on http://localhost:${port}`));
