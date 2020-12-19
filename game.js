class Paddle {
  // Constructor, initializes vairables
  constructor (x,y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.y_speed = 0;
  }

  // Render method, createss the paddle
  render() {
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = "#000000";
    context.fill();
  }

  // Update method, updates paddle's position.
  update() {
    // checks if bar is moving above the top
    if (this.y < 0){
      this.y += 3
    }
    // checks if bar is moving below the bottom
    else if (this.y + canvas.height/10 > canvas.height){
      this.y -= 3
    }
    // movement
    this.y += this.y_speed;
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

    // The ball hit the top wall.
    if(top_y < 0) {
      this.y = 12;
      this.y_speed = -this.y_speed;
    }
    // The ball hit the bottom wall.
    else if(bottom_y > canvas.height) {
      this.y = canvas.height - 12;
      this.y_speed = -this.y_speed;
    }

    // The computer scored a point.
    if(this.x < 0) {
      this.x_speed = -5;
      this.y_speed = 0;
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
    }
    // The player scored a point.
    if(this.x > canvas.width) {
      this.x_speed = 5;
      this.y_speed = 0;
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
    }

    // Ball hit the player's paddle.
    if(top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
      this.x_speed = 5;
      this.x += this.x_speed;
      this.y_speed += (paddle1.y_speed / 2);
    }
    // Ball hit the computer's paddle.
    if(top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x - paddle2.width) && bottom_x > paddle2.x) {
      this.x_speed = -5;
      this.x += this.x_speed;
      this.y_speed += (paddle2.y_speed / 2);
    }
  }
}

function update(){
/* Purpose: This the loop that updates the objects.
   Inputs: None, but it uses objects found outside the function.
   Returns: None, but it updates the objects.
*/
  paddle1.update();
  paddle2.update();
  ball.update();
}

function myKeyDown(event) {
/* Purpose: This is the function that checks which key is being pressed down and
            adjusts the player speed accordingly.
   Inputs: The event of the keyboard getting pressed.
   Returns: None, but it changes the player's speed.
*/
  key = event.which;
  // If the up arrow is pressed.
  if (key == 38){
    paddle1.y_speed = - 3;
  }

  // If the down arrow is pressed.
  if (key == 40){
    paddle1.y_speed = 3;
  }
}

function drawAll() {
/*
  Purpose: This function is the main drawing loop.
  Inputs: None, but it is affected by calling other functions.
  Returns: None, but it calls itself to cycle to the next frame.
*/
  context.clearRect(0, 0, canvas.width, canvas.height)
  update();
  paddle1.render();
  paddle2.render();
  ball.render();
  window.requestAnimationFrame(drawAll);
}

windowWidth = window.innerWidth;
windowHeight = window.innerHeight;
console.log("Window is %d by %d", windowWidth, windowHeight);

// Gets the canvas, sets the width and height based on the window.
canvas = document.getElementById("mainCanvas");
canvas.width = windowWidth - 15;
canvas.height = windowHeight - 25;

canvas.style.border = "1px solid black";

// Set up the context for the animation.
context = canvas.getContext("2d");

// Creates objects.
ball = new Ball(canvas.width/2, canvas.height/2 - canvas.height/80);
paddle1 = new Paddle(canvas.width/20, canvas.height/2 - canvas.height/15, canvas.width/100, canvas.height/10);
paddle2 = new Paddle(canvas.width*19/20, canvas.height/2 - canvas.height/15, canvas.width/100, canvas.height/10);

// Creates event for pressing the keyboard.
window.addEventListener("keydown", myKeyDown);

// Fires up the animation engine.
window.requestAnimationFrame(drawAll);
