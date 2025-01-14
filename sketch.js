// Game Player
// Jacob Koshman
// November 19th, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let superState = "start";
let buttonSize = 120;

function preload() {
  bg = loadImage("space.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  snake = new Snake();
  ship = new Ship();
  player = new Player(windowWidth, windowHeight);
  food = new Consumable();
  for (let i = 0; i<MAX_ASTEROIDS; i++) {
    asteroids.push(new Asteroid());
  }
  createGameButtons();
  createStartButton();
}

function draw() {
  if (superState === "asteroids") {
    background(bg);
  }

  else {
    background(220);
  }
  superStateStuff();
}

function createGameButtons() {
  asteroidsButton = createButton("Asteroids");
  snakeButton = createButton("Snake");
  spaceInvadersButton = createButton("Space Invaders");

  asteroidsButton.position(width/2-snakeButton.width*2, height/2);
  snakeButton.position(width/2, height/2);
  spaceInvadersButton.position(width/2+snakeButton.width*2, height/2);

  asteroidsButton.mousePressed(startAsteroids);
  snakeButton.mousePressed(startSnake);
  spaceInvadersButton.mousePressed(startSpaceInvaders);

  asteroidsButton.size(buttonSize, buttonSize/4);
  snakeButton.size(buttonSize, buttonSize/4);
  spaceInvadersButton.size(buttonSize, buttonSize/4);
}


function startAsteroids() {
  superState = "asteroids";
}

function startSnake() {
  superState = "snake";
}

function startSpaceInvaders() {
  superState = "spaceInvaders";
}

function superStateStuff() {
  if (superState === "start") {
    asteroidsButton.show();
    snakeButton.show();
    spaceInvadersButton.show();
    asteroidsStartButton.hide();
  }

  else if (superState === "asteroids") {
    stateStuff();
  }

  else if (superState === "snake") {
    snake.updateSnake();
    food.render();
    snake.makeSnake();
    snake.hasEatenFood();
    snake.displayScore();
  }

  else if (superState === "spaceInvaders") {
    player.displayPlayer();
    laser.display();
    laser.move();
  }

  if (superState !== "start") {
    asteroidsButton.hide();
    snakeButton.hide();
    spaceInvadersButton.hide();
  }
}

function mousePressed() {
  if (asteroidsState === "asteroids") {
    lasers.push(new Laser(ship.pos, ship.heading));
  }
}

function keyPressed() {
  if (asteroidsState === "asteroids") {
    if (keyIsDown(65)) {
      ship.setRotation(-0.1);
    } 
    else if (keyIsDown(68)) {
      ship.setRotation(0.1);
    }
    else if(keyIsDown(87)) {
      ship.boosting = true;
      ship.boost();
    }
    else if(keyIsDown(192)) {
      answer = prompt("command console");
      if (answer === "IDDQD") {
        invulnurable = true;
      }
      else if (answer === "AUTOWIN") {
        youWon = true;
      }
      else if (answer === "AUTOLOSE") {
        gameOver = true;
      }
      else if (answer === "MAIN MENU") {
        asteroidsState = "start";
      }
      else {
        alert("Not A CheatCode");
      }
    }
  }

  else if (superState === "snake") {
    if (keyIsDown(87) && snake.direction !== "down") {
      snake.direction = "up";
    }
  
    else if (keyIsDown(65) && snake.direction !== "right") {
      snake.direction = "left";    
    }
  
    else if (keyIsDown(68) && snake.direction !== "left") {
      snake.direction = "right";    
    }
  
    else if (keyIsDown(83) && snake.direction !== "up") {
      snake.direction = "down";    
    }
  }

  else if (superState === "spaceInvaders") {
    if (keyIsDown(87)) {
      player.move("up");
    }
    else if (keyIsDown(83)) {
      player.move("down");
    }
    // if (keyIsDown(69)) {
    // }
  }
}

function keyReleased() {
  if (asteroidsState === "asteroids") {
    ship.setRotation(0);
    ship.boosting = false;
  }
}