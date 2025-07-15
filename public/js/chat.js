const socket = io();

socket.on("connect", function () {
  let params = new URLSearchParams(window.location.search);
  socket.emit("join", { name: params.get("name"), room: params.get("room") }, function (err) {
    if (err) {
      window.location.href = "/";
      alert(err);
    }
  });
});

socket.on("disconnect", function () {
  console.log("Disconnected from server.");
});

socket.on("newMessage", function (message) {
  const formattedTime = moment(message.createdAt).format("LT");
  const template = document.querySelector("#message-template").innerHTML;
  const html = Mustache.render(template, { from: message.from, text: message.text, createdAt: formattedTime });
  const div = document.createElement("div");
  div.innerHTML = html;
  document.querySelector("#messages").appendChild(div);
  scrollToBottom();
});

socket.on("newLocationMessage", function (message) {
  const formattedTime = moment(message.createdAt).format("LT");
  const template = document.querySelector("#location-message-template").innerHTML;
  const html = Mustache.render(template, { from: message.from, url: message.url, createdAt: formattedTime });
  const div = document.createElement("div");
  div.innerHTML = html;
  document.querySelector("#messages").appendChild(div);
  scrollToBottom();
});

document.querySelector("#submit-btn").addEventListener("click", function (e) {
  e.preventDefault();
  socket.emit(
    "createMessage",
    { from: "User", text: document.querySelector("input[name='message']").value },
    function () {},
  );
});

document.querySelector("#send-location-btn").addEventListener("click", function (e) {
  if (!navigator.geolocation) return alert("Geolocation is not supported by your browser.");
  navigator.geolocation.getCurrentPosition(
    function (position) {
      socket.emit("createLocationMessage", {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },
    function () {
      alert("Unable to fetch location.");
    },
  );
});

function scrollToBottom() {
  const lastMessage = document.querySelector("#messages").lastChild;
  lastMessage.scrollIntoView();
}
