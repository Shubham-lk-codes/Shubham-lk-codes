const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render("index.html");
});


io.on('connection', (socket) => {

  socket.on("locationUpdate",function(data){
   io.emit("recive-location",{id: socket.id, ...data})
  })
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
