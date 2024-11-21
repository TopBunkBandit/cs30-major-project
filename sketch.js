// 2D ARCADE FIGHTING GAME
// James Mitchell
// 11/20/24
//
// Extra for Experts:
// N.A.
// CURRENT TO DO LIST:
// change crouch function to bring player to the ground
// have crouch be a hold to crouch and fall faster when crouching
// 



class Player{
  constructor(x,y){
    this.playerX = x;
    this.playerY = y;
    this.height = 200;
    this.width = 50; 
    this.gravity = 10;
    this.airTime = 0;
    this.currentlyCrouched = false;
    this.lightHit = 5;
    this.heavyHit = 15;
    this.jumpVelocity = 5;
  }
  display(){
    rect(this.playerX,this.playerY,this.width,this.height);
  }
  jump(){
    this.playerY -= this.jumpVelocity;
    this.airTime += 0.01;
  }
  falling(){
    if (this.playerY <= 400 && this.playerY + this.gravity*this.airTime < 400 ){
      this.playerY += this.gravity*this.airTime;
    }  
  }
  crouchingDown(){
    if (this.height === 200){
      this.height = this.height/2;
    }
  }
  standingUpFromCrouch(){
    if  (this.height === 100){
      this.height = this.height*2;
    }
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
  if (keyIsDown(32)){
    john.jump();
  }
  if (john.playerY + john.gravity*john.airTime < 400){
    john.falling();
  }
  else{
    john.airTime = 0;
    john.playerY = 400;
  }
}


function crouch(){
  if (keyIsDown(17)){
    john.crouchingDown();
  }
  else{
    john.standingUpFromCrouch();
  }
}