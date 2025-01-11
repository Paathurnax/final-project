// Space Invaders


class Player {
  constructor(width, height) {
    this.location = createVector(width/8, height/2);
    this.moveSpeed = 10;
    this.size = 10;
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
}

class Projectile {
  constructor(startPosition) {
    this.x = startPosition.x;
    this.y = startPosition.y;
    this.speed = 10;
  }

  display() {
    point(this.x, this.y);
  }

  move() {
    this.x += this.speed;
  }
}

// function laserStuff() {
//   for (let i = lasers.length-1; i>=0; i--) {
//     lasers[i].render();
//     lasers[i].update();
//     if(lasers[i].offScreen()) {
//       lasers.splice(i, 1);
//     }
//     else{     
//       for (let j = asteroids.length-1; j>=0; j--) {
//         if (lasers[i].hits(asteroids[j])) {
//           score++;
//           if (asteroids[j].size > minSize) {
//             let newAsteroids = asteroids[j].breakApart();       
//             asteroids = asteroids.concat(newAsteroids);
//           }
//           asteroids.splice(j, 1);
//           lasers.splice(i, 1);
//           break;
//         }
//       }
//     }
//   }
// }

// class Laser {
//   constructor(shipPos, angle) {
//     this.pos = createVector(shipPos.x, shipPos.y);
//     this.velocity = p5.Vector.fromAngle(angle);
//     this.velocity.mult(VEL_MULTI);
    
//   }
//   update() {
//     this.pos.add(this.velocity);
//   }
  
//   render() {
//     push();
//     stroke("red");
//     strokeWeight(4);
//     point(this.pos.x, this.pos.y);
//     pop();
//   }
  
//   hits(asteroid) {
//     let distance = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
//     return distance<asteroid.size*1.5;
//   }
  
//   offScreen() {
//     return this.pos.x > width || this.pos.x < 0 || (this.pos.y > height || this.pos.y < 0);
//   }
// }