// Food
//
// A class to represent food, mostly just involves the ability to be
// a random size and to reset

class Food extends Agent {

  // Constructor
  //
  // Pass arguments on to the super() constructor (e.g. for Agent)
  // Also set a minimum and maximum size for this food object which it
  // will vary between when it resets
  constructor(x,y,minSize,maxSize,vx,vy) {
    super(x,y,random(minSize,maxSize),'#55cccc');
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.vx = vx;
    this.vy = vy;
  }

  // reset()
  //
  // Set position to a random location on the canvas
  // Set the size to a random size within the limits
  reset() {
    this.x = random(0,width);
    this.y = random(0,height);
    this.size = random(this.minSize,this.maxSize);
  }
  // update()
  //
  update(){

    const maxVX = 20;
    const maxVY = 20;

    if (!this.active) {
      return;
    }


  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

// Constrain y position to be on screen
//this.y = constrain(this.y,0,height-this.size);

// Check for touching upper or lower edge and reverse velocity if so
  /*if (this.y === 0 || this.y + this.size === height) {
      this.vy = -this.vy;
  }
  else {
      this.vy += random(0,maxVY);
  }
  if (this.x + this.size < 0 || this.x > width) {
     this.vx = -this.vx;
  }
  else {
      this.vx += random(0,maxVX);
  }*/
      if (this.x < 0) {
        this.x = width;
      }
      else if (this.x > width) {
                this.x = 0;
    }
      if (this.y < 0) {
           this.y = height;
    }
      else if (this.y > height) {
                this.y = 0;
    }
  }

  calculateVelocity(){
    this.vx += random(-2,2);
    this.vy += random(-2,2);
    this.vy = constrain(this.vy, -4,4);
    this.vx = constrain(this.vx,-4,4);

  }
}
