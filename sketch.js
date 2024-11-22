// 2D ARCADE FIGHTING GAME
// James Mitchell
// 11/20/24
//
// Extra for Experts:
// N.A.
// CURRENT TO DO LIST IN ORDER OF PRIORITY:
// add forward and backward movement
// add 'attacks'
// add the p5.party stuff (S.O.S.)



class Player{
  constructor(x,y){
    this.playerX = x;
    this.playerY = y;
    this.height = 200;
    this.width = 50; 
    this.gravity = 10;
    this.airTime = 0;
    this.currentlyCrouched = false;
    this.jumpVelocity = 5;
    this.isJumping = false;
    this.currentlyFalling = false;
    // this.lightHit = 5;
    // this.heavyHit = 15;

  }
  display(){
    rect(this.playerX,this.playerY,this.width,this.height);
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
        this.airTime = 0.4;
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
  
  crouchingDown(){
    if (this.height === 200){
      this.height = this.height/2;
      this.currentlyCrouched = true;
    }
  }

  standingUpFromCrouch(){
    if  (this.height === 100){
      this.height = this.height*2;
      this.currentlyCrouched = false;
    }
  }

  moveForward(){
    this.playerX += 1;
  }
}


//john is a placeholder name, change this later
let john;

function setup() {
  createCanvas(windowWidth, windowHeight);
  john = new Player(20,399);
}

function draw() {
  background(220);
  rect(0,600,width,height);
  john.display();
  jump();
  crouch();

}


function jump(){
  if (keyIsDown(32) && john.airTime < 0.4){
    john.jump();
    john.currentlyFalling = true;
  }
  else{
    john.isJumping = false;
  }

  if (!john.currentlyCrouched && john.playerY + john.gravity*john.airTime < 400){
    john.falling();
  }
  else if(!john.currentlyCrouched){
    john.airTime = 0;
    john.playerY = 400;
    john.currentlyFalling = false;
  }
  else if(john.currentlyCrouched && john.playerY + john.gravity*john.airTime < 500 && john.currentlyFalling){
    john.fallingWhileCrouched();
  }
  else{
    john.airTime = 0;
    john.playerY = 500;
    console.log(2);
  }
}

function crouch(){
  if (keyIsDown(17)){
    john.crouchingDown();
  }
  else{
    john.standingUpFromCrouch();
  }

  if (keyIsDown(68)){
    john.moveForward();
  }
}