// Game Player
// Jacob Koshman
// November 19th, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//initializing the variables
let superState = "start";
let buttonSize = 120;

//loading the background for asteroids (not currently being used)
function preload() {
  bg = loadImage("space.gif");
}


//using all the classes
function setup() {
//creating the canvas
  createCanvas(700, 700);
  snake = new Snake();
  ship = new Ship();
  player = new Player(windowWidth, windowHeight);
  food = new Consumable();

  //creating the asteroids
  for (let i = 0; i<MAX_ASTEROIDS; i++) {
    asteroids.push(new Asteroid());
  }

  //button functions
  createGameButtons();
  createStartButton();
  createSnakeButton();
}

//super state function and rendering the background
function draw() {
  // if (superState === "asteroids" && asteroidsState === "asteroids") {
  //   background(bg);
  // }

  // else {
  //   background(220);
  // }
  background(220);
  superStateStuff();
}

//creating all three of the game buttons
function createGameButtons() {
  asteroidsButton = createButton("Asteroids");
  snakeButton = createButton("Snake");
  spaceInvadersButton = createButton("Space Invaders");

  asteroidsButton.position(width/2-buttonSize/2, height/2-buttonSize/4);
  snakeButton.position(width/2-buttonSize/2, height/2);
  spaceInvadersButton.position(width/2-buttonSize/2, height/2+buttonSize/4);

  asteroidsButton.mousePressed(startAsteroids);
  snakeButton.mousePressed(startSnake);
  spaceInvadersButton.mousePressed(startSpaceInvaders);

  asteroidsButton.size(buttonSize, buttonSize/4);
  snakeButton.size(buttonSize, buttonSize/4);
  spaceInvadersButton.size(buttonSize, buttonSize/4);
}

//fucntions for each game button to run when clicked
function startAsteroids() {
  superState = "asteroids";
}

function startSnake() {
  superState = "snake";
  gameState = "start";
}

function startSpaceInvaders() {
  superState = "spaceInvaders";
}

//state related and specific game functions
function superStateStuff() {

  //hiding and showing buttons when needed
  if (superState === "start") {
    asteroidsButton.show();
    snakeButton.show();
    //not showing the space invaders button do to extensive bugs and issues (game is a heavy WIP atm)
    // spaceInvadersButton.show();
    asteroidsStartButton.hide();
    snakeGameButton.hide();
  }

  //starting the asteroids game
  else if (superState === "asteroids") {
    stateStuff();
  }

  //starting snake
  else if (superState === "snake") {
    snakeStuff(snake);
  }

  //starting space invaders
  else if (superState === "spaceInvaders") {
    player.displayPlayer();
    laser.display();
    laser.move();
  }

  //hiding the game buttons when the state changes
  if (superState !== "start") {
    asteroidsButton.hide();
    snakeButton.hide();
    spaceInvadersButton.hide();
  }
}

//shooting a laser when the mouse is pressed while playing asteroids
function mousePressed() {
  if (asteroidsState === "asteroids") {
    lasers.push(new Laser(ship.pos, ship.heading));
  }

  else if (superState === "spaceInvaders") {
    laser = new Projectile(player.location);
  }
}

//key detection for all 3 games
function keyPressed() {

  //for asteroids
  if (asteroidsState === "asteroids") {

    //rotating the ship
    if (keyIsDown(65)) {
      ship.setRotation(-0.1);
    } 
    else if (keyIsDown(68)) {
      ship.setRotation(0.1);
    }

    //moving the ship
    else if(keyIsDown(87)) {
      ship.boosting = true;
      ship.boost();
    }

    //this is a secret lol
    else if(keyIsDown(192)) {
      answer = prompt("command console");
      if (answer === "IDDQD") {
        invulnurable = true;
      }
      else if (answer === "AUTOWIN") {
        asteroidsState = "You Win!";
      }
      else if (answer === "AUTOLOSE") {
        asteroidsState = "You Lose!";
      }
      else if (answer === "MAIN MENU") {
        asteroidsState = "start";
      }
      else {
        alert("Not A CheatCode");
      }
    }
  }

  //snake keybinds
  else if (superState === "snake") {

    //changing the movement direction of the snake
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

  //space invaders key binds
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

//key released function
function keyReleased() {

  //stops accelerating the ship when the key is no longer being pressed and stops ship rotation
  if (asteroidsState === "asteroids") {
    ship.setRotation(0);
    ship.boosting = false;
  }
}