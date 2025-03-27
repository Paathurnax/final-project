const GROUNDHEIGHT = 25;
let dinoState;

class Dino {
  constructor() {
    this.size = 50;
    this.x = this.size;
    this.y = height - GROUNDHEIGHT;
  }

  render() {
    rect(this.x, this.y, this.size);
  }

  move() {
    this.x += 10;
  }

  jump() {
    while (True) {
      if (this.y < this.size*1.5) {
        this.y += 5;
      }
      break;
    }
    this.gravity();
  }

  gravity() {
    if (this.y > height - GROUNDHEIGHT) {
      this.y -= 9;
    }
  }

  death() {
    dinoState = "lose";
  }
}

class Obstacle {
  constructor() {
    this.size = 25;
    this.y = height - GROUNDHEIGHT + this.size;
    this.x = width - this.size;
  }

  render() {
    rect(this.x, this.y, this.size);
  }

  collisions(player) {
    if (this.x === player.x + player.size && player.y - player.size === height - GROUNDHEIGHT) {
      player.death();
    }
  }
}

function createDinoButton() {
  dinoGameButton = createButton("Start");
  dinoGameButton.position(windowWidth/2 - buttonSize/2, height/2);
  dinoGameButton.size(buttonSize, buttonSize/4);
  dinoGameButton.mousePressed(startDinoGame);
}
function startDinoGame() {
  dinoState = "game";
  dinoGameButton.hide();
}

function dinoStuff() {
  if (dinoState === "start") {
    background("orange");
    push();
    textSize(100);
    text("Dinosaur Game", width/2 - textWidth("Dinosaur Game")/2, height/3);
    pop();
    dinoGameButton.show();
  }

  if (dinoState === "game") {
    dinosaur.render();
    dinosaur.move();
    obstacle.render();
    obstacle.collisions(dinosaur);
  }

  if (dinoState === "lose") {
    if (!universalLoseMusic.isPlaying()) {
      universalLoseMusic.loop();
    }
    push();
    textSize(100);
    text("you lose!", width/2 - textWidth("you lose!")/2, height/2);
    pop();
  }
}