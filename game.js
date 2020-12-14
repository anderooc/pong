class Paddle {
  constructor (x,y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
  }

  render() {
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = "#000000";
    context.fill();
  }
}

class Ball {
  constructor (x,y) {
    this.x = x;
    this.y = y;
    this.x_speed = -5;
    this.y_speed = 0;
    this.radius = 12;
  }

  render() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fillStyle = "#000000";
    context.fill();
  }
  update(){
    this.x += this.x_speed
    this.y += this.y_speed
    var top_x = this.x - 12;
    var top_y = this.y - 12;
    var bottom_x = this.x +12;
    var bottom_y = this.y +12

    // hit the top wall
    if(top_y < 0) {
      this.y = 12;
      this.y_speed = -this.y_speed;
    }
    // hit the bottom wall
    else if(bottom_y > canvas.height) {
      this.y = 388;
      this.y_speed = -this.y_speed;
    }

    // computer scored a point
    if(this.x < 0) {
      this.x_speed = -5;
      this.y_speed = 0;
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
    }
    // player scored a point
    if(this.x > canvas.width) {
      this.x_speed = 5;
      this.y_speed = 0;
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
    }

    // hit the player's paddle
    if(top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
      this.x_speed = 5;
      this.x += this.x_speed;
      this.y_speed += (paddle1.y_speed / 2);
    }
    // hit computer's paddle
    if(top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x - paddle2.width) && bottom_x > paddle2.x) {
      this.x_speed = -5;
      this.x += this.x_speed;
      this.y_speed += (paddle2.y_speed / 2);
    }
  }
}

function update(){
  ball.update();
}

function drawAll() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  // context.fillStyle = "#000000";
  // context.fillRect(0, 0, canvas.width, canvas.height);
  update();
  paddle1.render();
  paddle2.render();
  ball.render();
  window.requestAnimationFrame(drawAll);
}

windowWidth = window.innerWidth;
windowHeight = window.innerHeight;
console.log("Window is %d by %d", windowWidth, windowHeight);

// Get the canvas, set the width and height from the window
canvas = document.getElementById("mainCanvas");
canvas.width = windowWidth - 15;
canvas.height = windowHeight - 25;
canvas.style.border = "1px solid black";

// Set up the context for the animation
context = canvas.getContext("2d");


paddle1 = new Paddle(canvas.width/20, canvas.height/2 - canvas.height/15, canvas.width/100, canvas.height/10)
paddle2 = new Paddle(canvas.width * 19/20, canvas.height/2 - canvas.height/15, canvas.width/100, canvas.height/10)
ball = new Ball(canvas.width/2, canvas.height/2 - canvas.height/80);

// Fire up the animation engine
window.requestAnimationFrame(drawAll);
