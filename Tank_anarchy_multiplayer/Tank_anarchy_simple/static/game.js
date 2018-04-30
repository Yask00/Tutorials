var socket = io();

var movement = {
    up: false,
    down: false,
    left: false,
    right: false
};

document.addEventListener('keydown', function (event) {
    switch(event.keyCode) {
        case 65: movement.left = true; break; // A
        case 87: movement.up = true; break; // W
        case 68: movement.right = true; break; // D 
        case 83: movement.down = true; break; // S
    }
});
document.addEventListener('keyup', function(event) {
    switch (event.keyCode) {
      case 65: movement.left = false; break; // A
      case 87: movement.up = false; break; // W
      case 68: movement.right = false; break; // D
      case 83: movement.down = false;break; // S
    }
});

socket.emit('new player');
setInterval(function () {
    //keyboard state of this client 60 times a second to the server
    socket.emit('movement', movement);
}, 1000 / 60);

var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');

socket.on('state', function (players) {
    context.clearRect(0, 0, 800, 600);
    context.fillStyle = 'green';
    for (var id in players) {
        var player = players[id];
        context.beginPath();
        context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
        context.fill();
    }
});
