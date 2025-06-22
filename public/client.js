const socket = io();

socket.on("connect", () => {
  console.log("Connected to the server");
});
let name;
let text = document.querySelector("#text");
let msgarea = document.querySelector(".msg-area");
do {
  name = prompt("enter your name: ");
  if (name) {
    alert("hello," + name);
  }
} while (!name);

text.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };

  //append
  appendMsg(msg, "outgoing");
  text.value = "";

  //send to server
  socket.emit("msg", msg);
  scrollToBottom();
}

function appendMsg(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "msg");
  let markup = `
  <h4>${msg.user}</h4>
  <p>${msg.message}</p>
  `;
  mainDiv.innerHTML = markup;
  msgarea.appendChild(mainDiv);
}

//recieve
socket.on("msg", (msg) => {
  appendMsg(msg, "incoming");
  scrollToBottom();
});
function scrollToBottom() {
  msgarea.scrollTop = msgarea.scrollHeight;
}
