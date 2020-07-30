/* global p, colors */

class Bowl {
  constructor(x,y,size,contents) {
    this.width;
    if (size == "medium") {
      this.width = 150;
    }
    this.x = x;
    this.y = y;
    this.contents = contents;
  }
  
  display() {
    p.push();
    p.noStroke();
    p.fill(colors.LIGHT_BLUE); //blue
    p.arc(this.x,this.y,this.width,this.width,0,p.PI);
    p.fill(colors.DARK_BLUE); //darker blue
    p.ellipse(this.x,this.y,this.width,this.width / 3);
    p.fill(50);
    
    if (this.contents == "rice") {
      p.fill(100);
    } else if (this.contents == "water") {
      p.fill(210, 80, 94); //blue
    } else if (this.contents == "empty") {
      p.noFill();
    }
    p.ellipse(this.x,this.y,this.width * 0.75,this.width * 0.25);
    p.pop();
  }
}