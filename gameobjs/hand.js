/* global p */

let RHImage;
let pointImage;

class Hand {
  constructor() {
    this.x = 0;
    this.y = 0;

    /* resting x and y */
    this.restX = 400;
    this.restY = 400;

    /* circular motion */
    this.angle = 0;
    this.circularSpeed = 0.1;
    this.movingCircularCW = false;
    this.movingCircularCCW = false;
    this.circleCenterX = 0;
    this.circleCenterY = 0;
    this.radius = 100;
    this.isMoving = true;

    /* linear motion */
    this.linearSpeed = 10;
    this.movingLinear = false;
    this.xDest = 0;
    this.yDest = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;

    /* pressing */
    this.pressing = false;

    this.displayed = true;
    this.load();
  }

  load() {
    RHImage = p.loadImage(
      "https://cdn.glitch.com/10701851-ff16-4418-8942-e733d75bb5cb%2Fhand-removebg-preview.png?v=1595881076164"
    );
    pointImage = p.loadImage(
      "https://cdn.glitch.com/10701851-ff16-4418-8942-e733d75bb5cb%2Ffinger-point.png?v=1595891727543"
    );
  }

  display() {
    if (this.displayed) {
      
      if (this.movingCircularCW) {
        this.moveFullCircleAsync(this.radius, true);
      } else if (this.movingCircularCCW) {
        this.moveFullCircleAsync(this.radius, false);
      } else if (this.movingLinear) {
        this.moveLinearAsync(
          this.xDest,
          this.yDest,
          this.xSpeed,
          this.ySpeed
        );
      }
      if (this.pressing) {
        p.image(pointImage, this.x, this.y, 300, 300);
      } else {
        p.image(RHImage, this.x, this.y, 300, 300);
      }
      
    }
    // console.log("in display");
  }

  test() {
    if (p.mouseIsPressed) {
      // console.log("hand is working");
    }
  }

  /*
  called once in script.js based on key press
  */
  moveCircle(cw,x,y) {
    //set everything to false
    this.resetMovements();
    
    //set circle center
    this.circleCenterX = x;
    this.circleCenterY = y;

    //only set the desired movement to true
    if (cw) {
      this.movingCircularCW = true;
    } else {
      this.movingCircularCCW = true;
    }

    this.angle = 0;
  }

  /* moves the hand 2 PI radians in a circle asynchronously*/
  moveFullCircleAsync(radius, cw) {
    this.moveCircularAsync(radius, cw, 2 * Math.PI);
    // console.log("in async");
    // console.log(this.angle);
  }

  /* moves the hand up to a radian limit in a circle asynchronously*/
  moveCircularAsync(radius, cw, angleLim) {
    let centerX = this.circleCenterX;
    let centerY = this.circleCenterY;
    if (this.angle <= angleLim) {
      //update x based on cw or ccw
      if (cw) {
        this.x = centerX + radius * p.cos(this.angle);
      } else {
        this.x = centerX + radius * -1 * p.cos(this.angle);
      }
      //update y and increment angle
      this.y = centerY + radius * p.sin(this.angle);
      this.angle += this.circularSpeed;
    } else {
      //ends the movement by exiting out of the if statement in display
      this.resetMovements();
    }
    // console.log("in movecircular");
  }

  /* called once in script.js based on key press */
  moveLinear(x1, y1, x2, y2) {
    this.resetMovements();
    
    this.x = x1;
    this.y = y1;
    this.xDest = x2;
    this.yDest = y2;

    let xLength = x2 - x1;
    let yLength = y2 - y1;
    let hypot = Math.sqrt(xLength ** 2 + yLength ** 2);

    /*
    calculate x speed
    x2-x1 / hypotenuse = xSpeed / linearSpeed
    */
    this.xSpeed = this.linearSpeed * (xLength / hypot);
    /*
    calculate y speed
    y2-y1 / hypotenuse = ySpeed / linearSpeed
    */
    this.ySpeed = this.linearSpeed * (yLength / hypot);
    //this.moveLinearAsync(x2,y2,xSpeed,ySpeed);
    this.movingLinear = true;
    // console.log(this.xDest);
    // console.log(this.yDest);
  }

  moveLinearAsync(xDest, yDest, xSpeed, ySpeed) {
    if (
      Math.sqrt((xDest - this.x) ** 2 + (yDest - this.y) ** 2) >
      this.linearSpeed
    ) {
      this.x += xSpeed;
      this.y += ySpeed;
    } else {
      this.resetMovements();
    }
    // console.log(Math.sqrt((xDest - this.x) ** 2 + (yDest - this.y) ** 2));
  }
  
  /*
  called once from script.js
  x and y are location that should be pressed
  */
  press(x,y) {
    this.pressing = true;
    this.moveLinear(x,y-100,x,y);
  }

  resetMovements() {
    this.movingCircularCW = false;
    this.movingCircularCCW = false;
    this.movingLinear = false;
    this.pressing = false;
    this.angle = 0;
  }
}
