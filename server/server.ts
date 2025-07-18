import path from "path";
import http from "http";
import express from "express";
import { Server as SocketIOServer } from "socket.io";
import { generateMessage, generateLocationMessage } from "./utils/message";
import isRealString from "./utils/isRealString";
import Users from "./utils/users";

const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);
const users = new Users();

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("A new user just connected");

  socket.on("join", (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback("Name and room are required");
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit("updateUsersList", users.getUserList(params.room));
    socket.emit("newMessage", generateMessage("Admin", `Welcome to ${params.room}`)); // send to the client only
    socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined!")); // broadcast to everyone except the sender
    callback();
  });

  socket.on("createMessage", (message, callback) => {
    const user = users.getUser(socket.id);
    if (user && isRealString(message.text)) io.to(user.room).emit("newMessage", generateMessage(user.name, message.text)); // broadcast to everyone
    callback("This is server.");
  });

  socket.on("createLocationMessage", (coords) => {
    const user = users.getUser(socket.id);
    if (user) io.to(user.room).emit("newLocationMessage", generateLocationMessage(user.name, coords.lat, coords.lng));
  });

  socket.on("disconnect", () => {
    const user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("updateUsersList", users.getUserList(user.room));
      io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left ${user.room} chat room.`));
    }
  });
});

server.listen(port, () => console.log(`Server is up on http://localhost:${port}`));
