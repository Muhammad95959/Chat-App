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
  // socket.emit("newMessage", { from: "Ahmed", text: "This is sad." });
  socket.emit("newMessage", { from: "Admin", text: "Welcome to the chat app!" }); // send to the client only
  socket.broadcast.emit("newMessage", { from: "Admin", text: "New user joined!", createdAt: new Date().getTime() }); // broadcast to everyone except the sender
  socket.on("createMessage", (message) => {
    console.log("create Message ", message);
    io.emit("newMessage", { from: message.from, text: message.text, createdAt: new Date().getTime() }); // broadcast to everyone
  });
  socket.on("disconnect", () => console.log("User was disconnected"));
});

server.listen(port, () => console.log(`Server is up on http://localhost:${port}`));
