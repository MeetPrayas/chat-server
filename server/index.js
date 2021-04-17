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
  const parameters = url.parse(req.url, true);
  ws.isAlive = true;
  // ws.id = wss.getUniqueID();
  ws.name = parameters.query.name;
  ws.type = ["hostRoom", "joinRoom"].includes(parameters.query.type)
    ? "private"
    : "public";
  ws.roomid = parameters.query.id;

  ws.on("pong", () => {
    ws.isAlive = true;
  });
  ws.on("open", function open() {
    console.log("connected");
  });

  // ws.on("close", function close() {
  //   console.log("disconnected");
  // });
  ws.on("message", (clientMessage) => {
    message = JSON.parse(clientMessage);
    //send back the message to the other clients
    if (ws.type == "private") {
      wss.clients.forEach((client) => {
        {
          if (client.roomid === ws.roomid) {
            if (client != ws) {
              client.send(
                JSON.stringify({ name: ws.name, message: message.note })
              );
            } else {
              client.send(
                JSON.stringify({ name: "you", message: message.note })
              );
            }
          }
        }
      });
    } else {
      wss.clients.forEach((client) => {
        {
          if (client.type === "public") {
            if (client != ws) {
              client.send(
                JSON.stringify({ name: ws.name, message: message.note })
              );
            } else {
              client.send(
                JSON.stringify({ name: "you", message: message.note })
              );
            }
          }
        }
      });
    }
  });

  //send immediatly a feedback to the incoming connection
});

const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) return ws.terminate();
    ws.isAlive = false;
    ws.ping(null, false, true);
  });
}, 20000);

wss.on("close", function close() {
  clearInterval(interval);
});

//start our server
server.listen(process.env.PORT || 8000, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});
