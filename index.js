/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const canvasWidth = 50;
const canvasHeight = 50;

canvas.width = 500;
canvas.height = 700;

const explosion = [];

let canvasPosition = canvas.getBoundingClientRect();

class Explosion {
  constructor(x, y) {
    this.spriteWidth = 100;
    this.spriteHeight = 179;
    this.width = this.spriteWidth * 0.7;
    this.height = this.spriteHeight * 0.7;
    this.x = x - this.width / 2;
    this.y = y - this.height / 2;
    this.image = new Image();
    this.image.src =
      "https://github.com/Florin12er/javascript-game-4/blob/main/images/boom.png?raw=true";
    this.sound = new Audio();
    this.sound.src =
      "/home/sebastian/javascript-game-4/images/Fire impact 1.wav";
    this.frame = 0;
    this.timer = 0;
  }
  update() {
    if (this.frame === 0) this.sound.play();
    this.timer++;
    if (this.timer % 15 === 0) {
      this.frame++;
    }
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}

window.addEventListener("click", (e) => {
  createAnimation(e);
});

function createAnimation(e) {
  let positionX = e.x - canvasPosition.left - canvasWidth / 2;
  let positionY = e.y - canvasPosition.top - canvasHeight / 2;

  explosion.push(new Explosion(positionX, positionY));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < explosion.length; i++) {
    explosion[i].update();
    explosion[i].draw();
    if (explosion[i].frame > 5) {
      explosion.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animate);
}

animate();
