/* gloabl p, colors, mouseIsReleased, juneGullFont */

class Button {
  constructor(x, y, w, h, text, textSize, textY, onPress) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.yOrig = y;
    this.onPress = onPress;
    this.text = text;
    this.textSize = textSize;
    this.textY = textY;
    this.textYOrig = textY;
  }

  handle() {
    this.draw();
    if (this.isHovered()) {
      this.y = this.yOrig + 5;
      this.textY = this.textYOrig + 5;
    } else {
      this.y = this.yOrig;
      this.textY = this.textYOrig;
    }
    if (this.isHovered() && mouseIsReleased) {
      this.onPress();
    }
  }

  draw() {
    p.push();
    p.rectMode(p.CENTER);
    p.fill(colors.LIGHT_BLUE);
    p.rect(this.x, this.yOrig + 10, this.w, this.h, this.h / 3);
    p.fill(colors.DARK_BLUE);
    p.rect(this.x, this.y, this.w, this.h, this.h / 3);

    p.fill(100);
    p.noStroke();
    p.textAlign(p.CENTER);
    p.textFont(juneGullFont);
    p.textSize(this.textSize);
    p.text(this.text, this.x, this.textY);
    p.pop();
  }

  isHovered() {
    return (
      p.mouseX >= this.x - this.w / 2 &&
      p.mouseX <= this.x + this.w / 2 &&
      p.mouseY >= this.yOrig - this.h / 2 &&
      p.mouseY <= this.yOrig + this.h / 2
    );
  }
}
