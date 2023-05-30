const express = require("express");
const path = require("path");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

app.use(express.static(path.join(__dirname, "public")));
app.use("/scripts", express.static(__dirname + "/node_modules/"));

var routes = require("./routes/routes.js")(app);

io.on("connection", function(socket){
    socket.on("chat_message", function(msg){
        io.emit("chat_message", msg);
    });
});

server.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});