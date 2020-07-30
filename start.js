/* global p, Button, mouseIsReleased, currentRecipe, tick */

let juneGullFont;
let colors;

let button, directionsButton, backButton, backButton2, poseButton, startButton;

let currentScreen = "home";
let selectedRecipe;

let gif;
let gifIsRemoved;

p.preload = function() {
  juneGullFont = p.loadFont(
    "https://cdn.glitch.com/10701851-ff16-4418-8942-e733d75bb5cb%2Fjunegull.ttf?v=1596033075561"
  );
  //gif = p.createImg('https://cdn.glitch.com/10701851-ff16-4418-8942-e733d75bb5cb%2Fcake.gif?v=1596075693755');
  gifIsRemoved = true;
};

p.setup = function() {
  p.createCanvas(800, 800);
  p.colorMode(p.HSB, 360, 100, 100);

  colors = {
    LIGHT_PINK: p.color(345, 40, 100),
    DARK_PINK: p.color(345, 70, 92),
    YELLOW: p.color(59, 25, 100),
    TAN: p.color(48, 16, 100),
    DARK_BLUE: p.color(199, 84, 100),
    LIGHT_BLUE: p.color(199, 30, 100),
    GRAY: p.color(217, 0, 76),
    DARK_RED: p.color(8, 91, 74),
    DARK_GRAY: p.color(217, 0, 50),
    FLAME_ORANGE: p.color(21, 100, 90),
    FLAME_YELLOW: p.color(41, 88, 100)
  };

  button = new Button(
    /* x */ p.width / 2,
    /* y */ 500,
    /* w */ 200,
    /* h */ 75,
    /* text */ "START",
    /* textSize */ 54,
    /* textY */ 518,
    function() {
      // selectedRecipe = "rice";
      // let queryString = "?recipe=" + selectedRecipe;
      // window.location.href = "https://fitfoodie-cssi.glitch.me/game.html" + queryString;
      currentScreen = "recipes";
      mouseIsReleased = false;
    }
  );

  directionsButton = new Button(
    /* x */ p.width / 2,
    /* y */ 600,
    /* w */ 200,
    /* h */ 75,
    /* text */ "HOW TO PLAY",
    /* textSize */ 30,
    /* textY */ 610,
    function() {
      currentScreen = "how to play";
      mouseIsReleased = false;
    }
  );

  backButton = new Button(
    /* x */ p.width / 2,
    /* y */ 680,
    /* w */ 200,
    /* h */ 75,
    /* text */ "BACK",
    /* textSize */ 54,
    /* textY */ 698,
    function() {
      currentScreen = "home";
      mouseIsReleased = false;
    }
  );

  backButton2 = new Button(
    /* x */ p.width / 2,
    /* y */ 680,
    /* w */ 200,
    /* h */ 75,
    /* text */ "BACK",
    /* textSize */ 54,
    /* textY */ 698,
    function() {
      currentScreen = "how to play";
      mouseIsReleased = false;
    }
  );

  poseButton = new Button( //this will lead to the screen w/example poses
    /* x */ p.width / 2,
    /* y */ 580,
    /* w */ 200,
    /* h */ 75,
    /* text */ "POSES",
    /* textSize */ 48,
    /* textY */ 595,
    function() {
      currentScreen = "pose";
      mouseIsReleased = false;
    }
  );

  startButton = new Button(
    /* x */ p.width / 2,
    /* y */ 580,
    /* w */ 200,
    /* h */ 75,
    /* text */ "START",
    /* textSize */ 54,
    /* textY */ 598,
    function() {
      let queryString = "?recipe=" + selectedRecipe;
      window.location.href =
        "https://fitfoodie-cssi.glitch.me/game.html" + queryString;
      mouseIsReleased = false;
    }
  );
};

p.draw = function() {
  if (currentScreen == "home") {
    drawHomeScreen();
  } else if (currentScreen == "how to play") {
    drawDirectionsScreen();
  } else if (currentScreen == "recipes") {
    drawRecipesScreen();
  } else if (currentScreen == "pose") {
    drawPoseScreen();
  }
  
  if (currentScreen != "home") {
    gif.remove();
    gifIsRemoved = true;
  }
  //handleCursorChange(currentScreen);
  handleMouseRelease();
};

function drawDirectionsScreen() {
  p.background(colors.LIGHT_PINK);

  p.textAlign(p.CENTER);
  p.textFont(juneGullFont);

  p.textSize(72);
  p.fill(100);
  p.text("DIRECTIONS", p.width / 2, 200);
  p.textSize(30);
  p.text("1. Choose a recipe from the menu", p.width / 2, 270);
  p.text(
    "2. Move away from the camera so that you can see your",
    p.width / 2,
    320
  );
  p.text(
    "upper body (waist up) in the video in the top-left corner",
    p.width / 2,
    370
  );
  p.text(
    "3. Make the specified pose w/your arms (see 'poses', below)",
    p.width / 2,
    420
  );
  p.text("4. Press the right arrow for the next step", p.width / 2, 470);
  p.text("5. When you're done, choose a new recipe!", p.width / 2, 520);
  p.text("6. ??", p.width / 2, 570);

  backButton.handle();
  poseButton.handle();
}

function drawHomeScreen() {
  p.background(colors.LIGHT_BLUE);
  p.fill(colors.YELLOW);
  p.noStroke();
  p.rectMode(p.CORNER);
  p.rect(50, 50, p.width - 100, p.height - 100);

  p.textAlign(p.CENTER);
  p.textFont(juneGullFont);

  p.textSize(48);
  p.fill(colors.DARK_BLUE);
  p.text("WELCOME TO", p.width / 2, 300);

  p.textSize(96);
  p.fill(colors.LIGHT_BLUE);
  p.text("Fit Foodie!", p.width / 2 - 5, p.height / 2 + 5);
  p.fill(colors.DARK_PINK);
  p.text("Fit Foodie!", p.width / 2, p.height / 2);
  
  if (gifIsRemoved) {
    gif = p.createImg('https://cdn.glitch.com/10701851-ff16-4418-8942-e733d75bb5cb%2Fcake.gif?v=1596075693755');
    gif.position(0,-110);
    gifIsRemoved = false;
  }
  

  button.handle();
  directionsButton.handle();
}

function drawPoseScreen() {
  p.background(colors.LIGHT_PINK);
  p.noStroke();

  // tick();
  p.textAlign(p.CENTER);
  p.textFont(juneGullFont);

  p.textSize(96);
  p.fill(100);
  p.text("POSES", p.width / 2, 100);
  p.textSize(36);
  p.text("remember to show your whole", p.width / 2, 165);
  p.text("upper body in the camera!", p.width / 2, 205);
  p.text("neutral", 120, 280);
  p.text("hands down", 410, 280);
  p.text("hands up", 700, 280);
  p.text("make circle", 120, 480);
  p.text("point right", 410, 480);
  p.text("point left", 700, 480);

  //drawing poses
  p.stroke(colors.LIGHT_BLUE);
  p.strokeWeight(3);
  p.noFill();
  //heads & bodies
  for (let a = 0; a < 3; a++) {
    for (let b = 0; b < 2; b++) {
      p.ellipse(120 + 290 * a, 320 + 200 * b, 30, 30);
      p.line(120 + 290 * a - 25, 350 + 200 * b, 120 + 290 * a + 25, 350 + 200 * b
      );
      p.line(120 + 290 * a - 25, 350 + 200 * b, 120 + 290 * a - 15, 400 + 200*b);
      p.line(120 + 290 * a + 25, 350 + 200 * b, 120 + 290 * a + 15, 400 + 200*b);
      p.line(120 + 290 * a - 15, 400 + 200 * b, 120 + 290 * a + 15, 400 + 200*b);
    }
  }
  //neutral
  p.line(95, 350, 85, 400);
  p.line(145, 350, 155, 400);
  //hands down
  p.line(360, 350, 460, 350);
  p.line(360, 350, 370, 380);
  p.line(460, 350, 450, 380);
  //hands up
  p.line(650, 350, 750, 350);
  p.line(650, 350, 660, 320);
  p.line(750, 350, 740, 320);
  //make circle
  p.line(95, 550, 80, 570);
  p.line(145, 550, 160, 570);
  p.line(115, 580, 80, 570);
  p.line(125, 580, 160, 570);
  //point right
  p.line(385, 550, 375, 600);
  p.line(425, 550, 475, 550);
  //point left
  p.line(675, 550, 625, 550);
  p.line(725, 550, 735, 600);
  
  p.noStroke();
  //screen with poses
  backButton2.handle();
}

function drawRecipesScreen() {
  p.background(colors.YELLOW); //diff color background

  p.fill(colors.LIGHT_PINK);
  p.noStroke();
  p.rectMode(p.CORNER);
  p.rect(50, 50, p.width - 100, p.height - 100);

  p.textAlign(p.CENTER);
  p.textFont(juneGullFont);

  p.textSize(72);
  p.fill(100);
  p.text("RECIPES", p.width / 2, 150);
  p.textSize(30);

  //display selected recipe
  let recipeText = "";
  if (selectedRecipe) {
    recipeText = `You selected ${selectedRecipe}!`;
  } else {
    recipeText = "Select a recipe below!";
  }
  p.fill(colors.YELLOW);
  p.text(recipeText, p.width / 2, 220);

  let recipeDisplayFuncs = [displayRice, displayEgg, blank];
  p.fill(100); //color of the recipe labels
  for (let i = 0; i < recipeDisplayFuncs.length; i++) {
    let leftOffset = 75;
    let betweenOffset = 25;
    let cornerX = leftOffset + i * (betweenOffset + 200);
    let cornerY = 300;
    drawRecipeBox(cornerX, cornerY, recipeDisplayFuncs[i]);
    if (
      p.mouseIsPressed &&
      p.mouseX >= cornerX &&
      p.mouseX <= cornerX + 200 &&
      p.mouseY >= cornerY &&
      p.mouseY <= cornerY + 200
    ) {
      if (i == 0 || i == 1) {
        //ignore 'coming soon' box
        setSelectedRecipe(i);
      }
    }
  }

  // p.noStroke();
  if (selectedRecipe) {
    startButton.handle();
  }

  backButton.handle();
}

function setSelectedRecipe(i) {
  switch (i) {
    case 0:
      selectedRecipe = "rice";
      break;
    case 1:
      selectedRecipe = "boiled eggs";
      break;
  }
}

function drawRecipeBox(x, y, displayRecipe) {
  p.push();
  p.fill(100);
  p.strokeWeight(7);
  p.stroke(199, 84, 100);
  p.rect(x, y, 200, 200, 10);
  p.pop();

  displayRecipe(x, y);
}

function displayRice(dishX, dishY) {
  dishX += 100;
  dishY += 100;
  let sizeScale = 0.75;
  //plate
  p.push();
  p.stroke(colors.DARK_PINK);
  p.strokeWeight(4);
  p.fill(colors.LIGHT_PINK); //light-ish pink
  p.ellipse(dishX, dishY, 210 * sizeScale, 70 * sizeScale);
  p.noFill();
  p.ellipse(dishX, dishY, 150 * sizeScale, 40 * sizeScale);
  p.pop();

  //rice
  p.push();
  p.stroke(50);
  p.strokeWeight(3);
  p.fill(100);
  p.ellipse(dishX, dishY, 120 * sizeScale, 20 * sizeScale);
  p.arc(dishX, dishY, 120 * sizeScale, 120 * sizeScale, -1 * p.PI, 0);
  p.pop();

  //rice label
  p.text("rice", dishX, dishY - 120);
}

function displayEgg(dishX, dishY) {
  dishX += 100;
  dishY += 100;
  p.push();
  p.stroke(2);
  p.stroke(30);
  p.fill(100);

  //plate
  p.push();
  p.stroke(colors.DARK_PINK);
  p.strokeWeight(4);
  p.fill(colors.LIGHT_PINK); //light-ish pink
  p.ellipse(dishX, dishY, 210 * 0.75, 70 * 0.75);
  p.noFill();
  p.ellipse(dishX, dishY, 150 * 0.75, 40 * 0.75);
  p.pop();

  //eggs
  let eggSize = 30;
  p.strokeWeight(3);
  p.stroke(50);
  p.ellipse(dishX - 20, dishY - 10, eggSize, eggSize);
  p.arc(dishX - 20, dishY - 10, eggSize, eggSize * 1.5, -1 * p.PI, 0);
  p.ellipse(dishX + 20, dishY - 10, eggSize, eggSize);
  p.arc(dishX + 20, dishY - 10, eggSize, eggSize * 1.5, -1 * p.PI, 0);
  p.pop();

  //label
  p.text("boiled egg", dishX, dishY - 120);
}

function blank(dishX, dishY) {
  p.push();
  dishX += 100;
  dishY += 100;
  p.textAlign(p.CENTER);
  p.textSize(150);
  p.fill(colors.LIGHT_PINK);
  p.text("?", dishX, dishY + 50);
  p.pop();

  //label
  p.text("coming soon!", dishX, dishY - 120);
}

function handleCursorChange() {
  if (currentScreen == "home") {
    if (button.isHovered() || directionsButton.isHovered()) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "auto";
    }
  } else if (currentScreen == "how to play") {
    if (backButton.isHovered()) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "auto";
    }
  }
}

//fixes bug where user clicks on page then hovers over button, causing button to click
function handleMouseRelease() {
  if (
    !button.isHovered() &&
    !directionsButton.isHovered() &&
    !backButton.isHovered() &&
    !startButton.isHovered()
  ) {
    mouseIsReleased = false;
  }
}
