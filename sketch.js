// 2D ARCADE FIGHTING GAME
// THIS GAME WILL NOT BE AS GOOD AS INTENDED UNTIL LATER, 
// DONT EXPECT A GOOD GAME YET MR. PERSON READING THIS
// James Mitchell
// 11/20/24
//
// Extra for Experts:
// N.A.
// CURRENT TO DO LIST IN ORDER OF PRIORITY:
//add hit detection
//add kick and block
//fix gravity




class Player{
  constructor(x,y){
    //organize this sometime
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
    this.jumpKey;
    this.forwardKey;
    this.backwardKey;
    this.crouchKey;
    this.punchKey;
  }

  //displays the players
  display(){
    rect(this.playerX,this.playerY,this.width,this.height);
    fill("black");
    if (this.facingRight){
      circle(this.playerX + this.width, this.playerY + 20, 10);     
    }
    else{
      circle(this.playerX, this.playerY + 20, 10);
    }
    fill("white");
  }
  //the code for when jump is called in playerInputs
  jump(){
    this.playerY -= this.jumpVelocity;
    this.airTime += 0.01;
    this.isJumping = true;
    // console.log(this.airTime)
  }
  //the code for when falling is called in playerInputs
  falling(){
    if (this.playerY <= 400 && this.playerY + this.gravity*this.airTime < 400 ){
      if (!this.isJumping){
        this.airTime = 0.41;
        this.isJumping = false;
      }
      this.playerY += this.gravity*this.airTime;
    }
  }
  //the code for when falling and crouching is called in playerInputs
  fallingWhileCrouched(){
    if (this.playerY + this.gravity*this.airTime < 500 ){
      if (!this.isJumping){
        this.airTime = 0.4;
        this.isJumping = false;
      }
      this.playerY += this.gravity*this.airTime*1.5;
    }
  }
  //the code for when punch is called in playerInputs
  punch(){
    
    if (millis() < this.oldTime + 750 && (this.playerY === 400 || this.playerY === 500)){
      //forward punch
      if (this.facingRight){
        if (millis() < this.oldTime + 750/2){
          rect(this.playerX + this.width/2,this.playerY + 60, this.punchTime,20);
          this.currentlyAttacking = true;
          this.punchTime += 4;
        }
        else{
          rect(this.playerX + this.width/2,this.playerY + 60, this.punchTime,20);
          this.currentlyAttacking = true;
          this.punchTime -= 4;
        }
      }
      //backward punch
      else{
        push();
        translate(this.playerX,this.playerY);
        rotate(180);
        if (millis() < this.oldTime + 750/2){
          rect(-this.width/2, -80, this.punchTime,20);
          this.currentlyAttacking = true;
          this.punchTime += 4;
  
        }
        else{
          rect(-this.width/2, -80, this.punchTime,20);
          this.currentlyAttacking = true;
          this.punchTime -= 4;
        }
        pop();

      }
    }
    else{
      currentlyHit = false;
      this.currentlyAttacking = false;
      this.punchTime = 0;
    }
  }

  //all current possible player inputs
  playerInputs(player){
    if (!this.currentlyAttacking){      
      //IN THEORY should let the code swap what keys its looking for
      if (player === 1){
        this.jumpKey = 32;
        this.forwardKey = 68;
        this.backwardKey = 65;
        this.crouchKey = 17;
        this.punchKey = 81;
      }
      else{
        this.jumpKey = 38;
        this.forwardKey = 39;
        this.backwardKey = 37;
        this.crouchKey = 16;
        this.punchKey = 96;
      }
      
      //crouching
      if (keyIsDown(this.crouchKey)){
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
      //moving forwards, should be stopping at the left wall but is not, find out why
      if (keyIsDown(this.forwardKey) && this.playerX < width - this.width){
        this.playerX += 2;
        this.facingRight = true;
      }
      //moving backward if not at the left wall
      if (keyIsDown(this.backwardKey) && this.playerX !== 0){
        this.playerX -= 2;
        this.facingRight = false;
      }
      //punching
      if (keyIsDown(this.punchKey) && !currentlyHit && (this.playerY === 400 || this.playerY === 500)){
        this.oldTime = millis();
        currentlyHit = true;
      }

      //this whole chunk is just jumping under diffrent conditions
      //jumping
      if (keyIsDown(this.jumpKey) && this.airTime < 0.4){
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

// function preload() {

//   partyConnect(
//     "wss://demoserver.p5party.org", 
//     "comp-sci30-fighting-game"
//   );
//   //need to put EVERY VALUE THAT IM GOING TO NEED TO DISPLAY TO THE OTHER PLAYER
//   shared = partyLoadShared("shared", { p1x: john.playerX, p1y: john.playerY, p1w: john.width, p1h: john.height});
// }

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  john = new Player(50,400);
  jim = new Player(450,400);
  jim.facingRight = false;

  
}

function draw() {
  background(220);
  //floor
  rect(0,600,width,height);
  
  john.display();
  john.playerInputs(1);
  john.punch();

  jim.display();
  jim.playerInputs(2);
  jim.punch();

}

//adding hit detection to the players, not player collisions
function playerIsHit(){
  //use john.playerY and john.punchTime to find where the arm is
  //if it reaches jim, set a variable to true or false so it only counts the hit once
  //vise versa for jim hitting john

}