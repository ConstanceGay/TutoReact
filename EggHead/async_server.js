const stopWebServer = async webServer => {
  if (!webServer) {
    return undefined;
  }

  return new Promise(resolve => {
    console.log("Server shuting down...");
    webServer.shutdown(function(err) {
      if (err) {
        console.log("shutdown failed", err.message);
        return resolve;
      }
      console.log("Everything is cleanly shutdown.");
      return resolve;
    });
  });
};

const attachClosingTasks = closeHandlerFn => {
  // Attach closing tasks
  process.on("SIGINT", () => {
    console.log("SIGINT received");
    if (closeHandlerFn) closeHandlerFn();
  });

  process.on("SIGTERM", () => {
    console.log("SIGTERM received");
    if (closeHandlerFn) closeHandlerFn();
  });

  process.on("uncaughtException", err => {
    console.error("uncaughtException %s", err.message);
    if (closeHandlerFn) closeHandlerFn();
  });

  process.on("unhandledRejection", (err, p) => {
    console.error("Unhandled Rejection at: %s", err.message);
    //console.error(util.inspect(err, true, 1, true));
  });
};

const express = require("express");
var app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/data", (req, res) => res.send("Data"));

var server = require("http").createServer(app);

server = require("http-shutdown")(server);

//Listen on port 3000
server.listen(3000,function () {
  console.log('App listening on port 3000.');
});

attachClosingTasks(async () => {
  await stopWebServer(server);
});
