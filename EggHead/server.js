var server = require("http").createServer(function(req, res) {
  if(req.url.match("test")){
    res.write("Hello World!"); //client response
  } else if(req.url.match("data")){
    res.write("Your data here");
  }
  
  res.end(); //end response
});

server = require("http-shutdown")(server);

// Listen on port 3000
server.listen(3000);

// shut-down after 30 seconds
setTimeout(() => {  
  server.shutdown(function(err) {
    if (err) {
      return console.log("shutdown failed", err.message);
    }
    console.log("Everything is cleanly shutdown.");
  });
}, 30000);


