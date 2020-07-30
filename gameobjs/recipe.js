/* global p, hand, juneGullFont, colors, mouseIsReleased, Button */

class Recipe {
  constructor(steps,displayFinalDish,recipeName) {
    this.steps = steps;
    this.stepCount = 0;
    this.text = "";
    this.font;
    this.complete = false;
    this.recipeName = recipeName;
    this.displayFinalDish = displayFinalDish;
    this.backButton;
  }

  configure() {
    console.log("Configuing recipe...");
    for (let i = 0; i < this.steps.length; i++) {
      this.steps[i].configure();
      console.log(`Step ${i + 1} configured...`);
    }
    console.log("Done!");
    this.font = juneGullFont;
    this.backButton = new Button(
      /* x */ p.width / 2,
      /* y */ 150,
      /* w */ 200,
      /* h */ 75,
      /* text */ "HOME",
      /* textSize */ 54,
      /* textY */ 168,
      function() {
        window.location.href = "https://fitfoodie-cssi.glitch.me/index.html";
        mouseIsReleased = false;
      }
    );
  }

  handle() {
    if (!this.complete) {
      let step = this.steps[this.stepCount];
      step.handle();

      if (!step.complete) {
        this.text = step.direction;
        hand.displayed = false;
      } else {
        hand.displayed = true;
        //tell player to go on if recipe is not complete
        if (this.stepCount < this.steps.length - 1) {
          this.text = "Great job! Press right arrow key to continue!";
          //press right arrow to move to next step
          if (p.keyIsPressed && p.keyCode == p.RIGHT_ARROW) {
            this.stepCount++;
          }
        } else {
          //player finished recipe
          this.text = "Congrats! Press right arrow key to finish.";
          //press right arrow to go to finish screen
          if (p.keyIsPressed && p.keyCode == p.RIGHT_ARROW) {
            this.complete = true;
          }
        }
      }
      hand.display();
      this.drawTextBox();
    } else {
      this.drawCongratsScreen();
    }
  }
  
  drawCongratsScreen() {
    p.push();
      //border
      p.background(colors.LIGHT_BLUE);
      p.noStroke();
      //content box
      p.fill(colors.YELLOW);
      //congrats message
      p.rect(50, 50, p.width - 100, p.height - 100);
      p.textSize(48);
      p.textFont(this.font);
      p.textAlign(p.CENTER);
      p.fill(colors.DARK_BLUE)
      p.text(`Congrats! You made ${this.recipeName}!`, p.width/2, p.height/3)
      p.pop();
      //display completed dish
      this.displayFinalDish();
      this.backButton.handle();
  }

  drawTextBox() {
    p.push();
    p.fill(100);
    p.strokeWeight(7);
    p.stroke(199, 84, 100);
    p.rect(260, 20, 520, 100, 10);

    p.fill(30);
    p.noStroke();
    p.textSize(24);
    p.textFont(this.font);
    p.textAlign(p.CENTER);
    p.text(this.text, 260 + 260, 77);
    // console.log(text)
    p.pop();
  }
}
