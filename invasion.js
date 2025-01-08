//Space Invaders


class Player {
  constructor() {
    this.location = createVector(width/8, height/2);
    this.moveSpeed = 10;
    this.size = 10;
    this.laserLocation = createVector(this.location.x+this.size/2, this.location.y);
    this.laserSpeed = 5;
  }

  displayPlayer() {
    push();
    fill("blue");
    translate(this.location.x, this.location.y);
    rotate(1.5708);//90 degrees in radians
    triangle(-this.size, this.size, this.size, this.size, 0, -this.size);
    pop();
  }

  move(direction) {
    if (direction === "up") {
      this.location.y-=this.moveSpeed;
    }

    else if (direction === "down") {
      this.location.y+=this.moveSpeed;
    }
  }

  fireLaser() {
    point(this.laserLocation.x, this.laserLocation.y);
    if (frameCount%2 === 0) {
      this.laserLocation.x += this.laserSpeed;
    }
  }
}