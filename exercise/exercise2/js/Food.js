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
  constructor(x,y,minSize,maxSize,color,vx,vy) {
    super(x,y,random(minSize,maxSize),color);
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
    //this.x = random(0,width);
    //this.y = random(0,height);
    //this.size = random(this.minSize,this.maxSize);
	this.active = false;
  }
  // update()
  //
  update(){

    if (!this.active) {
      return;
    }

  // Update position with velocity and constrain position to be on screen
  //this.vx = this.vx + random(-maxSpeed,maxSpeed),(-maxSpeed,maxSpeed);
	//this.vy = this.vy + random(-maxSpeed,maxSpeed),(-maxSpeed,maxSpeed);
  const maxSpeed = 4;
  this.vx = constrain(this.vx + random(-maxSpeed,maxSpeed),-maxSpeed,maxSpeed);
  this.vy = constrain(this.vy + random(-maxSpeed,maxSpeed),-maxSpeed,maxSpeed);

	this.x = constrain(this.x + this.vx,0,width);
  this.y = constrain(this.y + this.vy,0,height);
	}


}
