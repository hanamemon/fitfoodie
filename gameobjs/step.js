/* global p, Bowl, hand, Recipe, colors, topPrediction, Button, fireOn */

class Step {
  constructor(configure, handle, direction) {
    this.complete = false;

    this.configure = configure;
    this.handle = handle;
    this.direction = direction;
  }
}

/* ----------------- RECIPE 1: BOILED RICE ----------------- */

//required variables
let ricecooker;
let bowl1, bowl2, bowl3, bowl4;

//steps
let riceStep1 = new Step(
  function() {
    bowl1 = new Bowl(270, 625, "medium", "empty");
  },
  function() {
    //triggered once
    if (topPrediction == "handsDown") {
      //p.keyIsPressed && p.key == "r"
      if (!this.complete) {
        //ensures hand is called once
        hand.press(280, 470);
      }
      this.complete = true;
      bowl1.contents = "rice";
    }
    //display bowl and dispenser iteratively

    bowl1.display();
    drawDispenser("rice");
  },
  "Step 1: Dispense the rice! (put both hands down)"
);

let riceStep2 = new Step(
  function() {
    bowl2 = new Bowl(270, 625, "medium", "rice");
  },
  function() {
    //triggered once
    if (topPrediction == "handsUp") {
      if (!this.complete) {
        //ensures hand is called once
        hand.press(280, 470);
      }
      this.complete = true;
      bowl2.contents = "water";
    }

    //display bowl and dispenser iteratively
    bowl2.display();
    drawDispenser("water");
  },
  "Step 2: Dispense the water! (put both hands up)"
);

let riceStep3 = new Step(
  function() {
    bowl3 = new Bowl(270, 625, "medium", "water");
  },
  function() {
    //triggered once
    if (topPrediction == "makeCircle") {
      //condition to check if step is complete
      if (!this.complete) {
        //ensures hand is called once
        hand.moveCircle(true, 120, 500);
      }
      this.complete = true;
    }
    //display bowl, called iteratively
    bowl3.display();
  },
  "Step 3: Wash the rice! (clasp hands in front)"
);

let riceStep4 = new Step(
  function() {
    bowl4 = new Bowl(150, 625, "medium", "water");
    ricecooker = p.loadImage(
      "https://cdn.glitch.com/10701851-ff16-4418-8942-e733d75bb5cb%2Frice-cooker-removebg-preview.png?v=1595963790167"
    );
  },
  function() {
    //triggered once
    if (topPrediction == "pointLeft") {
      //condition to check if step is complete
      if (!this.complete) {
        //ensures hand is called once
        hand.moveLinear(-10, 500, 320, 500);
      }
      this.complete = true;
    }
    //display bowl and ricecooker, called iteratively
    if (!this.complete) {
      //before
      bowl4.display();
      p.image(ricecooker, 300, 500, 300, 300);
    } else {
      //after
      p.image(ricecooker, 300, 500, 300, 300);
    }
  },
  "Step 4: Put the rice in the cooker! (point right)"
);

let riceStep5 = new Step(
  function() {},
  function() {
    //triggered once
    if (topPrediction == "pointRight") {
      //it's right b/c the camera is flipped
      //condition to check if step is complete
      if (!this.complete) {
        //ensures hand is called once
        hand.moveLinear(320, 500, -10, 500);
      }
      this.complete = true;
    }
    //display bowl and ricecooker, called iteratively

    p.image(ricecooker, 300, 500, 300, 300);
    //plate
    p.stroke(colors.DARK_PINK);
    p.strokeWeight(4);
    p.fill(colors.LIGHT_PINK); //light-ish pink
    p.ellipse(150, 700, 210, 70);
    p.noFill();
    p.ellipse(150, 700, 150, 40);
    if (this.complete) {
      //rice
      p.noStroke();
      p.fill(100);
      p.arc(150, 700, 120, 120, -1 * p.PI, 0);
      p.ellipse(150, 700, 120, 20);
    }
  },
  "Step 5: Serve the rice! (point left)"
);

function riceFinalDish() {
  let dishX = p.width / 2;
  let dishY = 500;

  //rotating star
  p.push();
  p.fill(colors.LIGHT_BLUE);
  p.translate(dishX, dishY);
  p.rotate(p.frameCount / 20);
  star(0, 0, 120, 220, 5);
  p.pop();

  let sizeScale = 1.5;
  //plate
  p.stroke(colors.DARK_PINK);
  p.strokeWeight(6);
  p.fill(colors.LIGHT_PINK); //light-ish pink
  p.ellipse(dishX, dishY, 210 * sizeScale, 70 * sizeScale);
  p.noFill();
  p.ellipse(dishX, dishY, 150 * sizeScale, 40 * sizeScale);

  //rice
  p.noStroke();
  p.fill(100);
  p.arc(dishX, dishY, 120 * sizeScale, 120 * sizeScale, -1 * p.PI, 0);
  p.ellipse(dishX, dishY, 120 * sizeScale, 20 * sizeScale);
}

let riceRecipe = new Recipe(
  [riceStep1, riceStep2, riceStep3, riceStep4, riceStep5],
  riceFinalDish,
  "rice"
);

/* ----------------- RECIPE 2: EGGS ----------------- */

//required variables
let eggBowl;

//steps
let eggStep1 = new Step(
  function() {
    eggBowl = new Bowl(270, 625, "medium", "empty");
  },
  function() {
    //triggered once
    if (topPrediction == "handsUp") {
      //p.keyIsPressed && p.key == "r"
      if (!this.complete) {
        //ensures hand is called once
        hand.press(280, 470);
      }
      this.complete = true;
      eggBowl.contents = "water";
    }
    //display bowl and dispenser iteratively

    eggBowl.display();
    drawDispenser("water");
  },
  "Step 1: Dispense the water! (put both hands up)"
);

let eggStep2 = new Step(
  function() {
    //eggBowl = new Bowl(270, 625, "medium", "empty");
  },
  function() {
    //triggered once
    if (topPrediction == "pointLeft") {
      //p.keyIsPressed && p.key == "r"
      if (!this.complete) {
        //ensures hand is called once
        hand.moveLinear(-10, 500, 320, 500);
      }
      this.complete = true;
    }

    //display bowl and dispenser iteratively
    if (!this.complete) {
      eggBowl.display();
    } else {
      //water in pot
      p.fill(210, 80, 94); //blue
      p.ellipse(700, 550, 80, 40);
    }
  },
  "Step 2: Put water in pot! (point right)"
);

let eggStep3 = new Step(
  function() {
    //eggBowl = new Bowl(270, 625, "medium", "empty");
  },
  function() {
    //triggered once
    if (topPrediction == "pointLeft") {
      //p.keyIsPressed && p.key == "r"
      if (!this.complete) {
        //ensures hand is called once
        hand.moveLinear(-10, 500, 320, 500);
      }
      this.complete = true;
    }

    //display bowl and dispenser iteratively

    //water in pot
    p.fill(210, 80, 94); //blue
    p.ellipse(700, 550, 80, 40);

    p.push();
    p.stroke(2);
    p.stroke(30);
    p.fill(100);
    if (!this.complete) {
      //eggs on table
      let eggSize = 50;
      p.ellipse(270, 625, eggSize, eggSize);
      p.arc(270, 625, eggSize, eggSize * 1.5, -1 * p.PI, 0);
      p.ellipse(330, 625, eggSize, eggSize);
      p.arc(330, 625, eggSize, eggSize * 1.5, -1 * p.PI, 0);
    } else {
      //eggs in pot
      let eggSize = 30;
      p.ellipse(680, 550, eggSize, eggSize);
      p.arc(680, 550, eggSize, eggSize * 1.5, -1 * p.PI, 0);
      p.ellipse(720, 550, eggSize, eggSize);
      p.arc(720, 550, eggSize, eggSize * 1.5, -1 * p.PI, 0);
    }
    p.pop();
  },
  "Step 3: Put eggs in pot! (point right)"
);

let eggStep4 = new Step(
  function() {},
  function() {
    //triggered once
    if (topPrediction == "handsDown") {
      //p.keyIsPressed && p.key == "r"
      if (!this.complete) {
        //ensures hand is called once
        hand.press(550, 600);
      }
      this.complete = true;
      fireOn = true;
    }
    //display bowl and dispenser iteratively

    //water in pot
    p.fill(210, 80, 94); //blue
    p.ellipse(700, 550, 80, 40);

    p.push();
    p.stroke(2);
    p.stroke(30);
    p.fill(100);
    //eggs in pot
    let eggSize = 30;
    p.ellipse(680, 550, eggSize, eggSize);
    p.arc(680, 550, eggSize, eggSize * 1.5, -1 * p.PI, 0);
    p.ellipse(720, 550, eggSize, eggSize);
    p.arc(720, 550, eggSize, eggSize * 1.5, -1 * p.PI, 0);
    p.pop();
  },
  "Step 4: Turn on the heat! (put both hands down)"
);

let eggStep5 = new Step(
  function() {},
  function() {
    //triggered once
    if (topPrediction == "pointRight") {
      //it's right b/c the camera is flipped
      //condition to check if step is complete
      if (!this.complete) {
        //ensures hand is called once
        hand.moveLinear(320, 500, -10, 500);
      }
      this.complete = true;
    }
    //display bowl and ricecooker, called iteratively

    //plate
    p.stroke(colors.DARK_PINK);
    p.strokeWeight(4);
    p.fill(colors.LIGHT_PINK); //light-ish pink
    p.ellipse(150, 700, 210, 70);
    p.noFill();
    p.ellipse(150, 700, 150, 40);
    if (this.complete) {
      p.push();
      p.stroke(2);
      p.stroke(30);
      p.fill(100);
      //eggs in pot
      let eggSize = 50;
      let eggX = 150;
      let eggY = 680;
      p.ellipse(eggX-30, eggY, eggSize, eggSize);
      p.arc(eggX-30, eggY, eggSize, eggSize * 1.5, -1 * p.PI, 0);
      p.ellipse(eggX+30, eggY, eggSize, eggSize);
      p.arc(eggX+30, eggY, eggSize, eggSize * 1.5, -1 * p.PI, 0);
      p.pop();
    }
  },
  "Step 5: Serve the eggs! (point left)"
);

function eggFinalDish() {
  let dishX = p.width / 2;
  let dishY = 500;

  //rotating star
  p.push();
  p.fill(colors.LIGHT_BLUE);
  p.translate(dishX, dishY);
  p.rotate(p.frameCount / 20);
  star(0, 0, 120, 220, 5);
  p.pop();

  let sizeScale = 1.5;
  //plate
  p.push();
  p.stroke(colors.DARK_PINK);
  p.strokeWeight(6);
  p.fill(colors.LIGHT_PINK); //light-ish pink
  p.ellipse(dishX, dishY, 210 * sizeScale, 70 * sizeScale);
  p.noFill();
  p.ellipse(dishX, dishY, 150 * sizeScale, 40 * sizeScale);
  p.pop();

  //rice
  p.push();
  p.stroke(2);
  p.stroke(30);
  p.fill(100);
  //eggs in pot
  let eggSize = 70;
  p.ellipse(dishX-40, dishY-30, eggSize, eggSize);
  p.arc(dishX-40, dishY-30, eggSize, eggSize * 1.5, -1 * p.PI, 0);
  p.ellipse(dishX+40, dishY-30, eggSize, eggSize);
  p.arc(dishX+40, dishY-30, eggSize, eggSize * 1.5, -1 * p.PI, 0);
  p.pop();
}

let eggRecipe = new Recipe(
  [eggStep1, eggStep2, eggStep3, eggStep4,eggStep5],
  eggFinalDish,
  "boiled eggs"
);

/* ---------------- HELPER FUNCTIONS ---------------- */
function star(x, y, radius1, radius2, npoints) {
  let angle = p.TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  p.beginShape();
  for (let a = 0; a < p.TWO_PI; a += angle) {
    let sx = x + p.cos(a) * radius2;
    let sy = y + p.sin(a) * radius2;
    p.vertex(sx, sy);
    sx = x + p.cos(a + halfAngle) * radius1;
    sy = y + p.sin(a + halfAngle) * radius1;
    p.vertex(sx, sy);
  }
  p.endShape(p.CLOSE);
}

function drawDispenser(type) {
  //spout
  p.fill(colors.DARK_PINK); //darker pink outline
  p.rect(300, 550, 20, 20);
  //body
  p.fill(colors.LIGHT_PINK); //light-ish pink
  p.rect(350, 525, 125, 200);
  p.rect(290, 525, 100, 30);
  //button
  p.fill(colors.DARK_PINK); //darker pink outline
  p.rect(380, 510, 60, 20);
  //window
  if (type == "rice") {
    p.fill(100);
  } else if (type == "water") {
    p.fill(210, 80, 94); //blue
  }
  p.rect(370, 580, 85, 90);
}
