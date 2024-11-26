// 2D ARCADE FIGHTING GAME
// THIS GAME WILL NOT BE AS GOOD AS INTENDED UNTIL LATER, DONT EXPECT A GOOD GAME MR. PERSON READING THIS
// James Mitchell
// 11/20/24
//
// Extra for Experts:
// N.A.
// CURRENT TO DO LIST IN ORDER OF PRIORITY:
// Add the basic attacks (just a punch and a kick for now)
// Add p5.party and have the game display two characters that can interact
// Add the rest of the basic abilities (block, another punch and kick)



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
    this.oldTime;
    this.punchTime = 0;
    this.currentlyAttacking = false;
    this.facingRight = true;
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
  lightAttackStandingPunch(){
    if (millis() < this.oldTime + 1500 && (this.playerY === 400 || this.playerY === 500)){
      if (millis() < this.oldTime + 750){
        console.log("a");
        rect(this.playerX + this.width/2,this.playerY + 60, this.punchTime,20);
        this.currentlyAttacking = true;
        this.punchTime += 2;
      }
      else{
        console.log("b");
        rect(this.playerX + this.width/2,this.playerY + 60, this.punchTime,20);
        this.currentlyAttacking = true;
        this.punchTime -= 2;

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
      //moving forward
      if (keyIsDown(68)){
        this.playerX += 1;
        this.facingRight = true;
      }
      //moving backward
      if (keyIsDown(65)){
        this.playerX -= 1;
        this.facingRight = false;

      }
      //punching lightly
      if (keyIsDown(81) && !currentlyHit){
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


function setup() {
  createCanvas(windowWidth, windowHeight);
  john = new Player(20,399);
}

function draw() {
  background(220);
  //floor
  rect(0,600,width,height);
  
  john.display();
  // jump();
  john.playerInputs();
  john.lightAttackStandingPunch();

}