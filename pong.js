//pong

let pongState;
let player1Score = 0;
let player2Score = 0;

class Player1 {
  constructor() {
    this.size = 120;
    this.width = this.size/4;
    this.position = createVector(this.width/4, height/2);
    this.speed = 15;
  }

  render() {
    rectMode(CENTER);
    rect(this.position.x, this.position.y, this.width, this.size);
  }

  move(direction) {
    if (direction === "up" && this.position.y>this.size/2) {
      this.position.y-=this.speed;
    }

    else if (direction === "down" && this.position.y < height-this.size/2) {
      this.position.y += this.speed;
    }
  }

  bounce(ball) {
    if (ball.position.x <= this.position.x + this.width/2 + ball.radius 
    && ball.position.y >= this.position.y - this.size/2 - ball.radius 
    && ball.position.y <= this.position.y + this.size/2 + ball.radius) {
      ball.velocity.x *= -1;
    }

    // else if (ball.position.y <= this.position.y - this.size/2 - ball.radius
    // && ball.position.y >= this.position.y + this.size/2 + ball.radius) {
    //   if (ball.position.x <= this.position.x + this.width/2 + ball.radius
    //   && ball.position.x >= this.position.x - this.width/2 - ball.radius) {
    //     ball.velocity.y *= -1;
    //   }
    // }
  }
}

class Player2 {
  constructor() {
    this.size = 120;
    this.width = this.size/4;
    this.position = createVector(width-this.width/4, height/2);
    this.speed = 15;
  }
    
  render() {
    rectMode(CENTER);
    rect(this.position.x, this.position.y, this.width, this.size);
  }
    
  move(direction) {
    if (direction === "up" && this.position.y>this.size/2) {
      this.position.y-=this.speed;
    }
    
    else if (direction === "down" && this.position.y < height-this.size/2) {
      this.position.y += this.speed;
    }
  }

  bounce(ball) {
    if (ball.position.x >= this.position.x - this.width/2 - ball.radius 
    && ball.position.y >= this.position.y - this.size/2 - ball.radius 
    && ball.position.y <= this.position.y + this.size/2 + ball.radius) {
      ball.velocity.x *= -1;
    }

    // else if (ball.position.y <= this.position.y - this.size/2 - ball.radius
    // && ball.position.y >= this.position.y + this.size/2 + ball.radius) {
    //   if (ball.position.x >= this.position.x - this.width/2 - ball.radius
    //   && ball.position.x <= this.position.x + this.width/2 + ball.radius) {
    //     ball.velocity.y *= -1;
    //   }
      
    // }
  }
}

class PongBall {
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
  bounce() {
    if (this.position.y < this.radius || this.position.y>height-this.radius) {
      this.velocity.y *= -1;
    }
  }

  reset() {
    if (this.position.x > width-this.radius) {
      player1Score ++;
      this.position.set(width/2, height/2);
      this.velocity.x *= -1;
    }

    else if (this.position.x < this.radius) {
      player2Score ++;
      this.position.set(width/2, height/2);
      this.velocity.x *= -1;
    }
  }
}

function createPongButton() {
  pongGameButton = createButton("Start Game");
  pongGameButton.position(windowWidth/2 - buttonSize/2, height/2);
  pongGameButton.size(buttonSize, buttonSize/4);
  pongGameButton.mousePressed(startPongGame);
}

function startPongGame() {
  pongState = "game";
  pongGameButton.hide();
}

function pongStuff() {
  if (pongState === "start") {
    background(240);
    push();
    textSize(100);
    text("Pong", width/2-textWidth("Pong")/2, height/3);
    pop();
    pongGameButton.show();
  }

  else if (pongState === "game") {
    gameDisplay();
    winner();
    player1.render();
    player2.render();
    pongBall.display();
    pongBall.move();
    pongBall.bounce();
    pongBall.reset();
    player1.bounce(pongBall);
    player2.bounce(pongBall);

    if (keyIsDown(87)) {
      player1.move("up");
    }

    if (keyIsDown(83)) {
      player1.move("down");
    }

    if (keyIsDown(38)) {
      player2.move("up");
    }

    if (keyIsDown(40)) {
      player2.move("down");
    }
  }

  else if (pongState === "win1") {
    if (!universalWinMusic.isPlaying()) {
      universalWinMusic.loop();
    }
    push();
    textSize(100);
    text("Player 1 Wins!", width/2 - textWidth("Player 1 Wins!")/2, height/2);
    pop();
  }

  else if (pongState === "win2") {
    if (!universalWinMusic.isPlaying()) {
      universalWinMusic.loop();
    }
    push();
    textSize(100);
    text("Player 2 Wins!", width/2 - textWidth("Player 2 Wins!")/2, height/2);
    pop();
  }
}

function gameDisplay() {
  background(0);
  push();
  fill(255);
  textSize(20);
  text(player1Score, 100, 100);
  text(player2Score, width - 100, 100);
  pop();

  push();
  stroke("white");
  strokeWeight(5);
  line(width/2, 0, width/2, height);
  pop();
}

function winner() {
  if (player1Score>=11) {
    pongState = "win1";
  }

  else if (player2Score>=11) {
    pongState = "win2";
  }
}