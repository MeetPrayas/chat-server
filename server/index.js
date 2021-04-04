const express = require("express");
const http = require("http");
const WebSocket = require("ws");
var url = require("url");

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

// generate a unique ID
wss.getUniqueID = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + "-" + s4();
};

wss.on("connection", (ws, req) => {
  console.log(req.url);
  const parameters = url.parse(req.url, true);
  ws.isAlive = true;
  ws.id = wss.getUniqueID();
  ws.name = parameters.query.name;
  ws.chatroom = {
    role: parameters.query.role,
    roomid: parameters.query.id,
  };
  ws.on("pong", () => {
    ws.isAlive = true;
  });
  ws.send(JSON.stringify("you are connected with server"));
  ws.on("message", (clientMessage) => {
    console.log(clientMessage);
    message = JSON.parse(clientMessage);
    //send back the message to the other clients
    wss.clients.forEach((client) => {
      if (client != ws) {
        client.send(
          JSON.stringify({ name: client.name, message: message.note })
        );
      } else {
        client.send(JSON.stringify({ name: "you", message: message.note }));
      }
    });
  });
  //send immediatly a feedback to the incoming connection
});

setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) return ws.terminate();
    ws.isAlive = false;
    ws.ping(null, false, true);
  });
}, 10000);

//start our server
server.listen(process.env.PORT || 8000, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});
