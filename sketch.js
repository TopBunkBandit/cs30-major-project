// 2D ARCADE FIGHTING GAME
// THIS GAME WILL NOT BE AS GOOD AS INTENDED UNTIL LATER, 
// DONT EXPECT A GOOD GAME YET MR. PERSON READING THIS
// James Mitchell
// 11/20/24
//
// Extra for Experts:
// N.A.
// CURRENT TO DO LIST IN ORDER OF PRIORITY:
// Add p5.party and have the game display two characters that can move indepentently
// REQUIRES TESTING TO SEE IF IT WORKS
// Add the rest of the basic abilities (block & kick)




class Player{
  constructor(x,y){
    this.playerX = x;
    this.playerY = y;
    this.height = 200;
    this.width = 50; 
    this.gravity = 9.8;
    this.airTime = 0;
    this.currentlyCrouched = false;
    this.jumpVelocity = 5;
    this.isJumping = false;
    this.currentlyFalling = false;
    this.oldTime;
    this.punchTime = 0;
    this.currentlyAttacking = false;
    this.facingRight = true;

  }
  display(){
    shared.p1x = this.playerX;
    shared.p1y = this.playerY;
    shared.p1w = this.width;
    shared.p1h = this.height;
    rect(shared.p1x,shared.p1y,shared.p1w,shared.p1h);

    //updating the shared player shape data
  }

  jump(){
    this.playerY -= this.jumpVelocity;
    this.airTime += 0.01;
    this.isJumping = true;
    // console.log(this.airTime)
  }

  falling(){
    if (this.playerY <= 400 && this.playerY + this.gravity*this.airTime < 400 ){
      if (!this.isJumping){
        this.airTime = 0.41;
        this.isJumping = false;
      }
      this.playerY += this.gravity*this.airTime;
    }
  }

  fallingWhileCrouched(){
    if (this.playerY + this.gravity*this.airTime < 500 ){
      if (!this.isJumping){
        this.airTime = 0.4;
        this.isJumping = false;
      }
      this.playerY += this.gravity*this.airTime*1.5;
    }
  }
  
  //attacking and locks the player into the punch
  //need to make the rectangle draw itself backwards (to the left)
  //maybe do this by translating the grid onto the rectangle and then rotating it by PI
  punch(){
    if (millis() < this.oldTime + 750 && (this.playerY === 400 || this.playerY === 500)){
      if (millis() < this.oldTime + 750/2){
        console.log("a");
        rect(this.playerX + this.width/2,this.playerY + 60, this.punchTime,20);
        this.currentlyAttacking = true;
        this.punchTime += 4;

      }
      else{
        console.log("b");
        rect(this.playerX + this.width/2,this.playerY + 60, this.punchTime,20);
        this.currentlyAttacking = true;
        this.punchTime -= 4;

      }
    }
    else{
      currentlyHit = false;
      this.currentlyAttacking = false;
      this.punchTime = 0;
    }
  }

  playerInputs(){
    if (!this.currentlyAttacking){
      //crouching 
      if (keyIsDown(17)){
        if (this.height === 200){
          this.height = this.height/2;
          this.currentlyCrouched = true;
        }
      }
      else{
        if  (this.height === 100){
          this.height = this.height*2;
          this.currentlyCrouched = false;
        }
      }
      //moving forward if not at the right wall
      if (keyIsDown(68) && this.playerX !== width - this.width){
        this.playerX += 2;
        this.facingRight = true;
      }
      //moving backward if not at the left wall
      if (keyIsDown(65) && this.playerX !== 0){
        this.playerX -= 2;
        this.facingRight = false;
      }
      //punching
      if (keyIsDown(81) && !currentlyHit && (this.playerY === 400 || this.playerY === 500)){
        this.oldTime = millis();
        currentlyHit = true;
      }

      //this whole chunk is just jumping under diffrent conditions
      //jumping
      if (keyIsDown(32) && this.airTime < 0.4){
        this.jump();
        this.currentlyFalling = true;
      }
      else{
        this.isJumping = false;
      }
      //falling while jumping
      if (!this.currentlyCrouched && this.playerY + this.gravity*this.airTime < 400){
        this.falling();
      }
      //standing
      else if(!this.currentlyCrouched){
        this.airTime = 0;
        this.playerY = 400;
        this.currentlyFalling = false;
      }
      //crouch jump/crouch mid jump
      else if(this.currentlyCrouched && this.playerY + this.gravity*this.airTime < 500 && this.currentlyFalling){
        this.fallingWhileCrouched();
      }
      //crouched
      else{
        this.airTime = 0;
        this.playerY = 500;
        console.log(2);
      }
    }
  }
}


//john is a placeholder name, change this later
let john;
currentlyHit = false;

let shared;

function preload() {
  john = new Player(20,400);
  partyConnect(
    "wss://demoserver.p5party.org", 
    "comp-sci30-fighting-game"
  );
  //need to put EVERY VALUE THAT IM GOING TO NEED TO DISPLAY TO THE OTHER PLAYER
  shared = partyLoadShared("shared", { p1x: john.playerX, p1y: john.playerY, p1w: john.width, p1h: john.height});
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  //floor
  rect(0,600,width,height);
  
  john.display();
  john.playerInputs();
  john.punch();

}






//p5.party demo

// let shared;

// function preload() {
// 	partyConnect(
// 		"wss://demoserver.p5party.org", 
// 		"hello_party"
// 	);
//   shared = partyLoadShared("shared", { x: 100, y: 100 });
// }

// function setup() {
//   createCanvas(400, 400);
//   noStroke();
// }

// function mousePressed() {
//   shared.x = mouseX;
//   shared.y = mouseY;
// }

// function draw() {
//   background("#ffcccc");
//   fill("#000066");

//   ellipse(shared.x, shared.y, 100, 100);
// }