var name = null;

self.addEventListener('message', function(event) {
  //self.postMessage(event.data.name);
  name = event.data.name;
});

var socket = io.connect();
socket.on('connect', function() {
  console.log("connected!");
});
socket.emit('test', name);
