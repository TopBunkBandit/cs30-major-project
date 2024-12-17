// 2D ARCADE FIGHTING GAME
// THIS GAME WILL NOT BE AS GOOD AS INTENDED UNTIL LATER, 
// DONT EXPECT A GOOD GAME YET MR. PERSON READING THIS
// ALSO THE COMMENTS ARE DEV NOTES, THEY ARE FOR HELPING ME NOT THE READER
// James Mitchell
// 11/20/24
//
// Extra for Experts:
// N.A.
// CURRENT TO DO LIST IN ORDER OF PRIORITY:
//add hit detection
// - need to try and see if I can use jim.x and john.x as variables like attacker.x victim.x, so the code works 2 ways
// - if not possible just put in everything in the command and have it replace like attackerY with john.playerY
//add kick and block
//fix gravity, I'm not a fan of how it is now
//add main menu and character select 
//...
//make actual sprites for the characters




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
    this.punchX = 0;
    this.punchY = 0;
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
          this.punchX = this.punchTime + this.playerX + this.width/2;
          this.punchY = this.playerY + 20;
        }
        else{
          rect(this.playerX + this.width/2,this.playerY + 60, this.punchTime,20);
          this.currentlyAttacking = true;
          this.punchTime -= 4;
          this.punchX -= 4;
          this.punchY = this.playerY + 20;

        }
      }

      //punch when facing left
      else{
        push();
        translate(this.playerX,this.playerY);
        rotate(180);
        if (millis() < this.oldTime + 750/2){
          rect(-this.width/2, -80, this.punchTime,20);
          this.currentlyAttacking = true;
          this.punchTime += 4;
          this.punchX = -this.punchTime + this.playerX + this.width/2;
          this.punchY = this.playerY + 20;

        }
        else{
          rect(-this.width/2, -80, this.punchTime,20);
          this.currentlyAttacking = true;
          this.punchTime -= 4;
          this.punchX += 4;
          this.punchY = this.playerY + 20;

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
      //lets the code swap what keys its looking for
      //consider putting these in their own function and calling the whole thing during setup
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
        this.crouchKey = 40;
        this.punchKey = 16;
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
      //moving forwards if not at the right wall
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

      }
      
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  //names are placeholders, will change later probabaly
  john = new Player(50,400);
  jim = new Player(450,400);
  jim.facingRight = false;
  currentlyHit = false;
}

function draw() {
  background(220);
  //floor
  rect(0,600,width,height);
  
  john.display();
  john.playerInputs(1);
  
  jim.display();
  jim.playerInputs(2);

  //put these after the drawing of the bodies to prevent the arm from going behind the player models
  john.punch();
  jim.punch();

  playerIsHit();
}

//adding hit detection to the players, not player collisions
//btw need to change this so john and jim are variables so the code can run for either by switching what is put in, half the work for 2x the code
function playerIsHit(){
  if (john.currentlyAttacking){
    if (john.punchX > jim.playerX && john.punchX < jim.playerX + jim.width){
      //see above message
      if (john.punchY > jim.playerY && john.punchY < jim.playerY + jim.height){
        console.log("yay");
      }
    }
  }
}