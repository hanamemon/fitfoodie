/* global p, Hand, Bowl, riceRecipe, eggRecipe, riceStep1,tmPose,createCapture,VIDEO,
imageMode,CORNER,push,translate,scale,image,pop, currentRecipe*/

/*
COOKING MAMA PNGS
https://www.models-resource.com/3ds/cookingmama5bonappetit/model/15909/?source=genre

*/

/* ---------------------- TEACHABLE MACHINE RELATED STUFF ---------------------- */
const URL = "https://teachablemachine.withgoogle.com/models/M0fUVmgny/";

let model;
let capture;
let topPrediction = "";
let numClasses;
let poseData;
let context;
let videoWidth = 240;
let videoHeight = 180;
let videoStarted = false;
// let posenetOutput;

let isLoaded = false;

async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  model = await tmPose.load(modelURL, metadataURL);
  numClasses = model.getTotalClasses();
}

async function predict() {
  const { pose, posenetOutput } = await model.estimatePose(capture.elt);

  const predictions = await model.predict(posenetOutput);
  let highestProbability = 0;
  let highestIndex;
  predictions.forEach((item, index) => {
    if (item.probability > highestProbability) {
      highestProbability = item.probability;
      highestIndex = index;
    }
  });

  poseData = pose;
  topPrediction = predictions[highestIndex].className;
}

function checkIfReady() {
  if (model && videoStarted) {
    p.loop();
    isLoaded = true;
  }
}

/* ---------------------- ORIGINAL STUFF ---------------------- */
let backgroundColor;

let hand;
let pan, stove, flame;
let video, classifier;

let stepCount = 0;
let text = "";
let fireOn = false;

let colors;
let juneGullFont;
let loadingGif;

let recipe;

p.preload = function() {
  juneGullFont = this.font = p.loadFont(
    "https://cdn.glitch.com/10701851-ff16-4418-8942-e733d75bb5cb%2Fjunegull.ttf?v=1596033075561"
  );
  loadingGif = p.createImg(
    "https://cdn.glitch.com/10701851-ff16-4418-8942-e733d75bb5cb%2Fnoodles-loading.gif?v=1596035832340"
  );
};

p.setup = async function() {
  switch (getRecipe()) {
    case "rice":
      recipe = riceRecipe;
      break;
    case "boiled eggs":
      recipe = eggRecipe;
      break;
    default:
      recipe = eggRecipe;
  }

  // Code here runs once.
  const canvas = p.createCanvas(800, 800);
  p.colorMode(p.HSB, 360, 100, 100);
  backgroundColor = 95;

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

  context = canvas.elt.getContext("2d");
  capture = p.createCapture(p.VIDEO, () => {
    videoStarted = true;
    checkIfReady();
  });
  capture.size(videoWidth, videoHeight);
  capture.hide();

  // instantiate hand
  hand = new Hand();

  //video
  // video = p.createCapture(p.VIDEO);

  //configure the chosen recipe
  recipe.configure();

  p.noLoop();
  await init();
  checkIfReady();
};

p.draw = function() {
  // Code here runs over and over.
  if (isLoaded) {
    if (loadingGif) {
      loadingGif.remove();
    }
    p.background(backgroundColor);

    drawKitchen();
    recipe.handle();

    tick();

    // if (topPrediction == "pointUp") {
    //   console.log("YOU ARE POINTING UP");
    // }
  } else {
    displayLoadingScreen();
  }
};

function getRecipe() {
  let queryString = decodeURIComponent(window.location.search);
  queryString = queryString.substring(8);
  console.log(`Selected Recipe: ${queryString}`);
  return queryString;
}

async function tick() {
  //display video
  p.push();
  p.translate(videoWidth, 0);
  p.scale(-1, 1);
  p.image(capture, 0, 0);

  //get and draw pose data
  if (poseData) {
    const minPartConfidence = 0.5;
    tmPose.drawKeypoints(poseData.keypoints, minPartConfidence, context);
    tmPose.drawSkeleton(poseData.keypoints, minPartConfidence, context);
    // console.log(poseData)
    // console.log(poseData.keypoints)
  }
  p.pop();

  //display predicted pose
  p.push();
  p.strokeWeight(4);
  p.stroke(0);
  p.fill(100);
  p.text(topPrediction, 20, 30);
  // console.log(typeof(topPrediction));
  p.pop();

  p.noLoop();
  await predict();
  p.loop();
}

let drawKitchen = function() {
  //front table
  p.noStroke();
  p.fill(colors.YELLOW); //yellow
  p.rect(0, 500, p.width, 300); //main table - later add the scoreboard

  //floor
  p.fill(colors.TAN); //tan
  p.rect(0, 0, p.width, 380); //back wall
  p.rect(0, 400, p.width, 100); //floor
  p.fill(colors.LIGHT_BLUE); //blue
  for (let a = 0; a < 10; a++) {
    //rectangles on checkered floor
    p.rect(80 * a, 400, 40, 33);
    p.rect(40 + 80 * a, 433, 40, 33);
    p.rect(80 * a, 466, 40, 33);
  }
  p.fill(colors.DARK_BLUE); //darker blue
  p.rect(0, 380, p.width, 20);

  //cabinets
  p.fill(colors.LIGHT_PINK); //light-ish pink
  p.rect(70, 250, p.width - 70, 160); //pink cabinet background
  p.stroke(colors.DARK_PINK); //darker pink outline
  for (let b = 0; b < 8; b++) {
    p.strokeWeight(4);
    //drawing top & bottom cabinet outlines
    p.fill(colors.LIGHT_PINK); //light-ish pink
    p.rect(80 + 100 * b, 200, 110, 48);
    p.rect(72, 200, 110, 48); //to make the first cabinet start a little earlier (it's a little longer)
    p.rect(80 + 100 * b, 260, 110, 140); //draws cabinet

    //fill a tan color - cabinet drawers
    p.fill(colors.TAN);
    p.rect(90 + 100 * b, 280, 80, 35); //bottom
    p.rect(90 + 100 * b, 315, 80, 35); //bottom
    p.rect(90 + 100 * b, 350, 80, 35); //bottom
    p.strokeWeight(1);
    p.rect(90 + 100 * b, 207, 80, 35); //top cabinet drawers
    p.rect(93 + 100 * b, 210, 74, 29);
    p.strokeWeight(3);
    p.line(123 + 100 * b, 225, 137 + 100 * b, 225); //drawer handles

    //circles on cabinets
    for (let c = 0; c < 3; c++) {
      p.ellipse(97 + 7 * c + 100 * b, 287, 3 - c);
      p.ellipse(97 + 100 * b, 287 + 7 * c, 3 - c);
      p.ellipse(163 + 100 * b, 287 + 7 * c, 3 - c);
      p.ellipse(163 - 7 * c + 100 * b, 287, 3 - c);
    }
  }

  //the first top cabinet tan drawer is blocked by `p.rect(72, 200, 110, 48)` (line 69), so redrawing it here
  p.strokeWeight(1);
  p.rect(85, 207, 80, 35); //top cabinet drawers
  p.rect(88, 210, 74, 29); //inner drawer rectangle
  p.strokeWeight(3);
  p.line(120, 225, 135, 225); //drawer handle

  //drawing blue section of table
  p.noStroke();
  p.fill(colors.DARK_BLUE);
  p.rect(600, 500, p.width, 300);

  //drawing stove
  p.stroke(15);
  p.strokeWeight(5);
  p.fill(colors.GRAY); //gray
  p.ellipse(700, 600, 100, 80);
  p.ellipse(700, 600, 70, 50);
  p.line(625, 590, 775, 590);
  p.line(625, 590, 625, 605);
  p.line(775, 605, 775, 590);
  p.line(650, 540, 750, 640);
  p.line(650, 540, 650, 555);
  p.line(750, 655, 750, 640);
  p.line(650, 640, 750, 540);
  p.line(650, 640, 650, 655);
  p.line(750, 555, 750, 540);

  //drawing pot handles
  p.stroke(15);
  p.strokeWeight(3);
  p.fill(colors.DARK_RED); //dark red
  p.ellipse(645, 545, 30, 20);
  p.ellipse(755, 545, 30, 20);
  p.fill(colors.DARK_BLUE); //same blue as table
  p.ellipse(650, 545, 30, 12);
  p.ellipse(750, 545, 30, 12);
  //drawing the pot
  p.fill(colors.DARK_RED); //dark red
  p.rect(645, 545, 110, 42);
  p.arc(700, 587, 110, 70, 0, p.PI);
  p.stroke(colors.DARK_RED); //dark red
  p.line(648, 587, 752, 587);
  p.fill(colors.GRAY); //gray
  p.stroke(15);
  p.ellipse(700, 545, 110, 70);
  p.fill(colors.DARK_GRAY); //darker gray
  p.ellipse(700, 545, 100, 60);

  //flames
  if (fireOn) {
    p.strokeWeight(2);
    p.stroke(colors.FLAME_ORANGE);
    p.fill(colors.FLAME_YELLOW);
    p.ellipse(700, 625, 12, 19);
    p.ellipse(725, 620, 12, 19);
    p.ellipse(745, 600, 12, 19);
    p.ellipse(675, 620, 12, 19);
    p.ellipse(655, 600, 12, 19);
  }

  //drawing ricecooker
  // p.image(ricecooker,300,500,300,300);

  //draw bowl
  //p.image(bowl,100,550,200,200);
  // bowl.display();
  // console.log(bowl);
  p.noStroke();
};

function displayLoadingScreen() {
  p.background(colors.YELLOW);
  p.push();
  p.fill(30);
  p.noStroke();
  p.textSize(48);
  p.textFont(juneGullFont);
  p.textAlign(p.CENTER);
  p.text("Loading...", p.width / 2, 300);

  loadingGif.position(150, 150);
  p.pop();
}
