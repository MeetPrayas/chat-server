const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  ws.isAlive = true;

  ws.on("pong", () => {
    ws.isAlive = true;
  });

  ws.on("message", (clientMessage) => {
    console.log(clientMessage);
    message = JSON.parse(clientMessage);
    //send back the message to the other clients
    wss.clients.forEach((client) => {
      if (client != ws) {
        client.send(
          JSON.stringify({ name: message.name, message: message.note })
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
server.listen(process.env.PORT || 8999, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});
