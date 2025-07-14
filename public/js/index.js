const socket = io();
socket.on("connect", function () {
  console.log("Connected to server.");
});
socket.on("disconnect", function () {
  console.log("Disconnected from server.");
});
socket.on("newMessage", function (message) {
  console.log("newMessage", message);
});

socket.emit("createMessage", { from: "Muhammad", text: "Hey" }, function (message) {
  console.log("Server got it.", message);
});
