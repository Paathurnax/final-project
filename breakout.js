// Breakout

//intializing variables
let breakState;
let lives = 3;


//class for the ball
class Ball {
  constructor() {
    //pos, vel, speed, and radius variables
    this.position = createVector(width/2, height/2);
    this.speed = 5;
    this.velocity = createVector(this.speed, -this.speed);
    this.radius = 10;
  }

  //displaying the ball
  display() {
    circle(this.position.x, this.position.y, this.radius*2);
  }

  //moving the ball
  move() {
    this.position.add(this.velocity);
  }

  //bouncing off the paddle
  bounce(paddle) {
    if (this.position.x>= width - this.radius || this.position.x<=this.radius) {
      this.velocity.x *= -1;
    }
    else if (this.position.y >= paddle.position.y-paddle.size/8 && 
      this.position.x <= paddle.position.x + paddle.size/2 && 
      this.position.x >= paddle.position.x - paddle.size/2 || 
    this.position.y <= this.radius*1.5) {
      this.velocity.y *= -1;
    }    
  }

  //subtracting lives when the paddle misses the ball and resting position and velocity
  loseLife() {
    if (this.position.y > height-this.radius) {
      lives--;
      this.position.x = width/2;
      this.position.y = height/2;
      this.velocity.set(this.speed, -this.speed);
    }

    //you lost womp womp
    if (lives <= 0) {
      breakState = "lose";
    }
  }
  
  //brick collsion
  collideWith(brick) {
    if (this.position.x + this.radius < brick.x + brick.h - brick.w / 2) {
      return false;
    }
    else if (this.position.x - this.radius > brick.x + brick.h + brick.w / 2) {
      return false;
    }
    else if (this.position.y + this.radius < brick.y - brick.h / 2) {
      return false;
    }
    else if (this.position.y - this.radius > brick.y + brick.h / 2) {
      return false;
    }
    else {
      return true;
    }
  }

  //bouncing off the bricks
  bounceOff(brick) {
    this.velocity.x*= -1;
    this.move();

    let previousVelocity = this.velocity.copy();

    if (this.collideWith(brick)) {
      this.velocity.x *= -1;
      this.velocity.y *= -1;
    }
    this.position.sub(previousVelocity);
  }

  //runnign the functions
  runFunctions() {
    this.display();
    this.move();
    this.loseLife();
  }
}
//class for the paddle
class Paddle {
  constructor() {
    this.size = 150;
    this.position = createVector(width/2, height-this.size/2);
    this.speed = 10;
  }

  //displaying the paddle
  display() {
    rectMode(CENTER);
    rect(this.position.x, this.position.y, this.size, this.size/6);
  }

  //moving the paddle
  move(direction) {
    if (direction === "right" && this.position.x + this.size/2 < width) {
      this.position.x += this.speed;
    }

    if (direction === "left" && this.position.x - this.size/2 > 0) {
      this.position.x -= this.speed;
    }
  }
}

//class for the bricks
class Brick {
  constructor() {
    this.brickArray = [];
    this.MAX_BRICKS = 14;
    this.ROWS = 5;
    this.brickSize = width/this.MAX_BRICKS;
  }

  //creating the brick array
  createBricks() {
    for (let i = 0; i < this.MAX_BRICKS; i++) {
      for (let j = 0; j < this.ROWS; j++) {
        this.brickArray.push({x: i*this.brickSize, y: j*this.brickSize/2, w: this.brickSize, h: this.brickSize/2});
      }
    }
  }

  //displaying the brick
  displayBricks() {
    for (let brick of this.brickArray) {
      rect(brick.x+brick.h, brick.y, brick.w, brick.h);
    }
  }

  //ball collision
  collision() {
    let hitBrick = false;
    for (let i = this.brickArray.length-1; i>=0; i--) {
      let brick = this.brickArray[i];
      if (ball.collideWith(brick)) {
        if (hitBrick === false) {
          ball.bounceOff(brick);
          hitBrick = true;
        }
        this.brickArray.splice(i, 1);
      }
    }
  }

  //you won good job
  win() {
    if (this.brickArray.length <=0) {
      breakState = "win";
    }
  }
}

//start function and and other states
function breakoutStuff() {
  if (breakState === "start") {
    background("purple");
    push();
    textSize(100);
    text("Breakout", width/2-textWidth("Breakout")/2, height/3);
    pop();
    breakoutStartButton.show();
  }

  else if (breakState === "Start Game") {
    breakoutStartButton.hide();
    ball.runFunctions();
    ball.bounce(paddle);
    paddle.display();
    bricks.displayBricks();
    bricks.collision();
    push();
    textSize(25);
    text("lives: " + lives, width-100, height/2);
    pop();
    if (keyIsDown(65)) {
      paddle.move("left");
    }
    else if (keyIsDown(68)) {
      paddle.move("right");
    }
  }

  else if (breakState === "lose") {
    breakoutBackgroundMusic.stop();
    if (!universalLoseMusic.isPlaying()) {
      universalLoseMusic.loop();
    }
    push();
    text("you lose!", width/2-textWidth("you lose!")/2, height/2);
    textSize(100);
    pop();
  }

  else if (breakState === "win") {
    breakoutBackgroundMusic.stop();
    if (!universalWinMusic.isPlaying()) {
      universalWinMusic.loop();
    }
    push();
    text("you win!", width/2-textWidth("you win!")/2, height/2);
    textSize(100);
    pop();
  }
}


//creating the start
function createBreakoutButton() {
  breakoutStartButton = createButton("Start Game");
  breakoutStartButton.size(buttonSize, buttonSize/4);
  breakoutStartButton.position(windowWidth/2 - buttonSize/2, height/2);
  breakoutStartButton.mousePressed(startBreakoutGame);
}

//function for the button to run when it is pressed
function startBreakoutGame() {
  breakoutTitleMusic.stop();
  buttonPressedSound.play();
  breakState = "Start Game";
  breakoutBackgroundMusic.loop();
}