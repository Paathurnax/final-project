//Space Invaders


class Player {
  constructor() {
    this.location = createVector(width/8, height/2);
    this.moveSpeed = 10;
    this.size = 10;
  }

  displayPlayer() {
    push();
    fill("blue");
    translate(this.location.x, this.location.y);
    triangle(-this.size, this.size, this.size, this.size, 0, -this.size);
    rotate(90);
    pop();
  }

  move(direction) {
    if (direction === "left") {
      this.location.y-=this.moveSpeed;
    }

    else if (direction === "right") {
      this.location.y+=this.moveSpeed;
    }
  }
}