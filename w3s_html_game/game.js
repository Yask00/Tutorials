document.addEventListener("DOMContentLoaded", () => {
  startGame();
});

let myGamePiece;
let myObstacles = [];

function startGame() {
  myGameArea.start();
  myGamePiece = new component(30, 30, "red", 10, 120);
  myObstacle = new component(10, 200, "green", 300, 120); // only first obsticle
}

const myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener("keydown", function (e) {
      myGameArea.keys = myGameArea.keys || [];
      myGameArea.keys[e.key] = true;
    });
    window.addEventListener("keyup", function (e) {
      myGameArea.keys[e.key] = false;
    });
  },
  stop: function () {
    clearInterval(this.interval);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function () { // pure repaint function
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
  this.newPos = function () { // if clicked button change position of object
    this.x += this.speedX;
    this.y += this.speedY;
  };
  this.crashWith = function (otherObj) {
    let myLeft = this.x;
    let myRight = this.x + this.width;
    let myTop = this.y;
    let myBottom = this.y + this.height;
    let otherLeft = otherObj.x;
    let otherRight = otherObj.x + otherObj.width;
    let otherTop = otherObj.y;
    let otherBottom = otherObj.y + otherObj.height;
    let crash = true;
    if (
      myBottom < otherTop ||
      myTop > otherBottom ||
      myRight < otherLeft ||
      myLeft > otherRight
    ) {
      crash = false;
    }
    return crash;
  };
}

function updateGameArea() {
  let x, y;
  for (let i = 0; i < myObstacles.length; i++) { // check for crash every update
    if (myGamePiece.crashWith(myObstacles[i])) {
      myGameArea.stop();
      return;
    }
  }
  if (myGamePiece.crashWith(myObstacle)) {
    myGameArea.stop();
    return;
  }
  myGameArea.clear();
  myGameArea.frameNo += 1; // update how much pixels moved to right
  
  if (myGameArea.frameNo == 1 || everyInterval(150)) { // add obsticles for every 150px moved
    x = myGameArea.canvas.width;
    minHeight = 20;
    maxHeight = 200;
    height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
    minGap = 50;
    maxGap = 200;
    gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
    myObstacles.push(new component(10, height, "green", x, 0));
    myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
  }
  for (i = 0; i < myObstacles.length; i += 1) { // change x of and update/repaint every obstacle
    myObstacles[i].x += -1;
    myObstacles[i].update();
  }

  myGamePiece.speedX = 0; // if no click we dont ever move our piece, only obsticles move
  myGamePiece.speedY = 0;
  myObstacle.x += -1; // moving only first obs

  if (myGameArea.keys && myGameArea.keys["a"]) {
    myGamePiece.speedX = -1;
  }
  if (myGameArea.keys && myGameArea.keys["d"]) {
    myGamePiece.speedX = 1;
  }
  if (myGameArea.keys && myGameArea.keys["w"]) {
    myGamePiece.speedY = -1;
  }
  if (myGameArea.keys && myGameArea.keys["s"]) {
    myGamePiece.speedY = 1;
  }

  myObstacle.update(); // update only first obst
  myGamePiece.newPos();
  myGamePiece.update();
}

function stopMove() {
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
}

function everyInterval(n) {
  if ((myGameArea.frameNo / n) % 1 === 0) { // every 150px move
    return true;
  }
  return false;
}
