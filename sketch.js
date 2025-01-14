// 2D ARCADE FIGHTING GAME
// THE COMMENTS ARE DEV NOTES, THEY ARE FOR HELPING ME NOT THE READER
// SHOULD PROBABLY CHANGE THAT SOON
// James Mitchell
// DATE OF START
// 11/20/24
// DATE OF FINISH
// 1/XX/25
// Extra for Experts:
// N.A.
// CURRENT TO DO LIST IN ORDER OF PRIORITY:
//BETA TESTS AFTER THATS DONE, DONT DO MORE UNTIL THEN
//add special 3
//make a special 3 array and a new function to check if any player is over a landmine.
//special 3 is a landmine, make it drain 20 hp to use. when either character steps on it they lose 30 hp. let them spawn up to 5 land mines, and the 5th makes their hp 0//fix gravity, I'm not a fan of how it is now
//...

//current issues:
//IM GOING INSANE

class Player{
  constructor(x,y){
    //organize this sometime
    
    //player model
    this.playerX = x;
    this.playerY = y;
    this.height = 200;
    this.width = 50; 
    this.facingRight = true;
    this.health = 100;

    //jumping
    this.gravity = 9.8;
    this.airTime = 0;
    this.jumpVelocity = 5;
    this.isJumping = false;
    
    //punching
    this.oldTime;
    this.punchTime = 0;
    this.punchX = 0;
    this.punchY = 0;
    this.lastHit = 0;
    this.currentlyAttacking = false;
    this.currentlyHit = false;
    
    //action keys
    this.jumpKey;
    this.forwardKey;
    this.backwardKey;
    this.crouchKey;
    this.punchKey;
    this.blockKey;
    this.kickKey;
    
    //movement
    this.currentlyFalling = false;
    this.currentlyCrouched = false;

    //misc.
    this.isBlocking = false;
    this.legRotation = 0;
    this.legDown = false;
    this.kickTime;
    this.legX = 0;
    this.legY = 0;
    this.currentlyKicking = false;
    this.kickBalls = 0;
    this.character = '';
    this.specialUseTime = -2000;
    this.special1Bullet = 0;
    this.rockFalling = false;
    this.rockY = 0;
    this.currentlyUsingSpecial = false;
    this.rockSpeed = 5;
    this.iDontKnowWhatThisDid = 1;
  }

  //displays the players
  display(){
    fill("white");
    rect(this.playerX,this.playerY,this.width,this.height);
    fill("black");
    
    if (this.facingRight){
      circle(this.playerX + this.width, this.playerY + 20, 10);   
      if (this.character === "josh"){
        rectMode(CENTER);
        rect(this.playerX + this.width/2,this.playerY - 15, 50,30);
        rect(this.playerX + this.width/2,this.playerY - 5, 70,10);
        rectMode(CORNER);
      }
      else if(this.character === "jimmy"){
        fill("grey");
        rect(this.playerX + this.width -5 ,this.playerY + 40,10,10);
        rect(this.playerX,this.playerY + 40,this.width,this.height - 40);
      }
      else{
        fill("grey");
        circle(this.playerX + this.width, this.playerY + 20, 10);  
        push();
        noStroke();
        rect(this.playerX + this.width ,this.playerY + 40,5,20);
        triangle(this.playerX + this.width, this.playerY + 60, this.playerX + this.width + 5, this.playerY + 60, this.playerX + this.width, this.playerY + 90);
        pop();
      }
    }
    else{
      circle(this.playerX, this.playerY + 20, 10);

      if (this.character === "josh"){
        rectMode(CENTER);
        rect(this.playerX + this.width/2,this.playerY - 15, 50,30);
        rect(this.playerX + this.width/2,this.playerY - 5, 70,10);
        rectMode(CORNER);
      }
      else if(this.character === "jimmy"){
        fill("grey");
        rect(this.playerX - 5 ,this.playerY + 40,10,10);
        rect(this.playerX,this.playerY + 40,this.width,this.height - 40);
      }
      else{
        fill("grey");
        circle(this.playerX, this.playerY + 20, 10);  
        push();
        noStroke();
        rect(this.playerX - 5 ,this.playerY + 40,5,20);
        triangle(this.playerX, this.playerY + 60, this.playerX - 5, this.playerY + 60, this.playerX , this.playerY + 90);
        pop();
      }


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

  //REWORK THIS, SAME THING WITH THE KICK. THIS CAN BE SHORTER
  //the code for when punch is called in playerInputs
  punch(){
    if (millis() < this.oldTime + 750 && (this.playerY === 400 || this.playerY === 500)){
      kickFactor = 0;
      fill("white");

      //forward punch
      if (this.facingRight){
        if (millis() < this.oldTime + 750/2){
          rect(this.playerX + this.width/2,this.playerY + 60, this.punchTime,20);
          this.currentlyAttacking = true;
          this.punchTime += 4;
          this.punchX = this.punchTime + this.playerX + this.width/2;
          this.punchY = this.playerY + 10;
          this.donePunch = false;

        }
        else{
          rect(this.playerX + this.width/2,this.playerY + 60, this.punchTime,20);
          this.currentlyAttacking = true;
          this.punchTime -= 4;
          this.punchX -= 4;
          this.punchY = this.playerY + 10;
          this.donePunch = false;

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
          this.punchY = this.playerY + 10;
          this.donePunch = false;
        }
        else{
          rect(-this.width/2, -80, this.punchTime,20);
          this.currentlyAttacking = true;
          this.punchTime -= 4;
          this.punchX += 4;
          this.punchY = this.playerY + 10;
          this.donePunch = false;
        }
        pop();
      }
    }
    else{
      this.currentlyAttacking = false;
      this.donePunch = true;
      this.punchTime = 0;
    }
  }
  healthBar(x,y){
    rectMode(CORNERS);
    fill("white");
    rect(x, y, x + 100,y+20);
    fill("red");
    for (let i = 0; i < this.health; i++){
      rect(x,y, x + i, y+20);
    }
    rectMode(CORNER);
  }
  hit(){
    if (this.currentlyHit){
      if (this.currentlyCrouched){
        this.health -= 15;
      }
      else{
        this.health -= 10;
      }
      this.currentlyHit = false;
    }
  }

  kick(){
    if (this.kickTime > millis() - 1290){
      this.currentlyKicking = true;
      if (this.facingRight){
        kickFactor = -15;
        this.iDontKnowWhatThisDid = 2;
        if (this.legDown){
          this.legRotation += 2;
          this.kickBalls -= 1;
        }
        else if (this.legRotation > -75){
          this.legRotation -= 2;
          this.kickBalls += 1;
        }
        else{
          this.legDown = true;
        }
      }
      else{
        this.kickFactor = 30;
        this.iDontKnowWhatThisDid = 1;
        if (this.legDown){
          this.legRotation -= 2;
          this.kickBalls -= 1;
        }
        else if (this.legRotation < 75){
          this.legRotation += 2;
          this.kickBalls += 1;
        }
        else{
          this.legDown = true;
        }
      }
      push();
      rectMode(CORNER);
      translate(this.playerX + this.width/2 ,this.playerY + this.height/3 + this.height/3);
      rotate(this.legRotation);
      rect(0,0, 20, this.height/3);
      pop();
      //Y wont work
      if(this.facingRight){
        this.punchX = this.playerX - this.width/4 + this.kickBalls;
      }
      else{
        this.punchX = this.playerX + this.width/this.iDontKnowWhatThisDid - this.kickBalls;
      }
      this.punchY = this.playerY + this.height/2 + this.kickBalls;
    }
    else{
      this.currentlyKicking = false;
      this.legDown = false;
      this.legRotation = 0;
      this.kickBalls = 50;
      this.punchY -= 2;
    }
  }
  //fire a projectile with a limited lifespan
  special1(){
    if (this.specialUseTime + 1000 > millis()){
      fill("red");
      rect(this.playerX + this.width/2 + this.special1Bullet,this.playerY + 40, 40,20);
      if (this.facingRight){
        this.special1Bullet += 2;
        this.currentlyUsingSpecial = true;
        this.punchX = this.special1Bullet + this.playerX + 3*this.width/2;
        this.punchY = this.playerY + 40;
      }
      else{
        this.special1Bullet -= 2;
        this.currentlyUsingSpecial = true;
        this.punchX = this.special1Bullet + this.playerX + this.width;
        this.punchY = this.playerY + 40;
      }
    }
    else{
      this.special1Bullet = 0;
      this.currentlyUsingSpecial = false;
      this.punchX = 0;
      this.punchY = 0;
    }
  }

  //throw a rock
  special2(){
    if (this.specialUseTime + 1800 > millis()){
      fill("black");
      if (this.facingRight){
        this.special1Bullet += 1;
        rockVar = this.width;
      }
      else{
        rockVar = 0;
        this.special1Bullet -= 1;
      }
      if(!this.rockFalling && this.rockSpeed < 0){
        this.rockFalling = true;
      }
      if (this.rockFalling){
        this.rockY += this.rockSpeed;
        this.rockSpeed += 0.2;
      }
      else{
        this.rockY -= this.rockSpeed;
        this.rockSpeed -= 0.1;
      }
      circle(this.special1Bullet + this.playerX + rockVar,this.rockY+this.playerY,20);
      this.currentlyUsingSpecial = true;
      this.punchX = this.special1Bullet + this.playerX + rockVar;
      this.punchY = this.rockY + this.playerY;
    }
    else{
      this.special1Bullet = 0;
      this.rockY = 0;
      this.rockSpeed = 5;
      this.rockFalling = false;
      this.currentlyUsingSpecial = false;
    }
  }

  special3(){
    //figure it out
    if (this.specialUseTime + 1000 > millis()){
      fill("darkgreen");
      this.currentlyUsingSpecial = true;
      if (this.facingRight){
        rect(this.playerX + this.width + 20,this.playerY + this.height - 20, 20,20);
        // Minefield.push or something like that
      }
      else{
        rect(this.playerX - 40,this.playerY + this.height - 20, 20,20);

      }
    }
    else{
      this.currentlyUsingSpecial = false;
    }
  }

  special(){
    if (this.character === "josh"){
      this.special1();
    }
    else if(this.character === "jimmy"){
      this.special2();
    }
    else{
      this.special3();
    }
  }
  //all current possible player inputs
  playerInputs(player){
    if (!this.currentlyAttacking && !this.currentlyKicking && !this.currentlyUsingSpecial){
      //lets the code swap what keys its looking for
      //consider putting these in their own function and calling the whole thing during setup
      if (player === 1){
        this.jumpKey = 87;
        this.forwardKey = 68;
        this.backwardKey = 65;
        this.crouchKey = 83;
        this.punchKey = 81;
        this.blockKey = 69;
        this.kickKey = 70;
        this.specialKey = 54;
      }
      else{
        this.jumpKey = 101;
        this.forwardKey = 99;
        this.backwardKey = 97;
        this.crouchKey = 98;
        this.punchKey = 100;
        this.blockKey = 102;
        this.kickKey = 103;
        this.specialKey = 105;

      }
      
      //special key, subject to change
      if(keyIsDown(this.specialKey) && this.playerY === 400){
        this.specialUseTime = millis();
        console.log(this.character);

        //DOESNT WORK ATM, FIX

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
      if (keyIsDown(this.punchKey)  && (this.playerY === 400 || this.playerY === 500)){
        this.oldTime = millis();
      }
      //blocking
      if(keyIsDown(this.blockKey) && (this.playerY === 400 || this.playerY === 500)){
        if (this.facingRight){
          rect(this.playerX + 40,this.playerY+20,20,this.height/2);
        }
        else{
          rect(this.playerX - 10 ,this.playerY+20,20,this.height/2);
        }
        this.isBlocking = true;
      }
      else{
        this.isBlocking = false;
      }
      if (keyIsDown(this.kickKey)  && this.playerY === 400){
        this.kickTime = millis();
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

let kickFactor = 0;
let rockVar = 20;
let y = 0;
let lastHit = 0;
let gameMode = "start screen";
let characterSelectBoxX;
let characterSelectBoxY = 250;
let characterSelectBoxSideLength = 100;
let mouseHoveringOver = 'none';
let currentPlayerSelection = 1;
const TEXT_SPACING = 100;
let controlArray = ["CONTROLS:","RIGHT","LEFT","CROUCH","JUMP","PUNCH","KICK","BLOCK","SPECIAL",];
let playerInputsArray1 = ["PLAYER 1:","D","A","S","W","Q","F","E","6"];
let playerInputsArray2 = ["PLAYER 2 TURN ON NUM LOCK:","1 ON NUMPAD","3 ON NUMPAD","2 ON NUMPAD","5 ON NUMPAD","4 ON NUMPAD","7 ON NUMPAD","6 ON NUMPAD","9 ON NUMPAD",];
let winner = "";
let Minefield = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  //names are placeholders, will change later probabaly
  john = new Player(100,400);
  jim = new Player(windowWidth - 100,400);
  jim.facingRight = false;
  characterSelectBoxX = windowWidth;

}

function draw() {
  background(220);
  //floor

  if(gameMode === "start screen"){
    mainMenu();
  }
  else if(gameMode === "controls"){
    displayControls();
  }
  else if (gameMode === "character selection"){
    characterSelect();
  }

  else if (gameMode === "playing"){
    
    fill('white');
    rect(0,600,width,height);
    john.healthBar(100,100);
    jim.healthBar(windowWidth - 200,100);
    
    
    //required functions for player 1
    john.display();
    john.playerInputs(1);
    john.hit();
    john.special();
    
    //required functions for player 2
    jim.display();
    jim.playerInputs(2);
    jim.hit();
    jim.special();
    // console.log(jim.special1Bullet + jim.playerX,john.playerX,jim.rockY + jim.playerY,john.playerY)
    
    john.kick();
    jim.kick();
    //attacking
    john.punch();
    jim.punch();

    playerIsHit(john,jim);
    playerIsHit(jim,john);

    if (john.health <= 0){
      winner = "jim";
      gameMode ="end";
    }
    else if (jim.health <=0){
      gameMode = "end";
      winner = "john";
    }
  }
  else if (gameMode === "end"){
    if (winner === "jim"){
      background("grey");
      text("Player 2 wins!", width/2, height/2 - 20);
      text("Click anywhere to return to the menu", width/2 - 40, height/2 + 20);

    }
    else{
      background('grey');
      textSize(20);
      text("player 1 wins!", width/2 - 20, height/2 - 20);
      text("Click anywhere to return to the menu", width/2 - 40, height/2 + 20);
    }
  }
}

function mousePressed(){
  // john.health -= 10;
  if (gameMode !== "end"){

    if (mouseHoveringOver === "start"){
      gameMode = "character selection";
    }
    else if(mouseHoveringOver === "controls"){
      gameMode = "controls";
    }
    else if (mouseHoveringOver === "main menu"){
      gameMode = "start screen";
    }
    if(currentPlayerSelection === 1){
      if (mouseHoveringOver === "1"){
        john.character = "josh";
        currentPlayerSelection = 2;
      }
      else if(mouseHoveringOver === "2"){
        john.character = "jimmy";
        currentPlayerSelection = 2;
      }
      else if(mouseHoveringOver === "3"){
        john.character = "jack";
        currentPlayerSelection = 2;
      }
    }
    else{
      if (mouseHoveringOver === "1"){
        jim.character = "josh";
        gameMode = "playing";
      }
      else if(mouseHoveringOver === "2"){
        jim.character = "jimmy";
        gameMode = "playing";  
      }
      else if(mouseHoveringOver === "3"){
        jim.character = "jack";
        gameMode = "playing";  
      }
    }
  }
  else{
    gameMode = "start screen";
    john.health = 100;
    jim.health = 100;
    john.playerX = 100;
    jim.playerX = windowWidth - 100;
    john.character = '';
    jim.character = '';
    currentPlayerSelection = 1;
  }
}

function mainMenu(){
  rectMode(CENTER);
  if(mouseX > width/2 - 200 && mouseX < width/2 + 200 && mouseY > height/4 - 25 && mouseY < height/4 +25){
    fill("white");
    rect(width/2,height/4,400,50);
    fill("black");
    mouseHoveringOver = "start";
  }
  else{
    fill("black");
    rect(width/2,height/4,400,50);
    fill("white");
    mouseHoveringOver = "none";
  }
  textSize(15);
  text("Start Game",width/2 - 40,height/4 + 5);
  
  if (mouseX > width/2 - 200 && mouseX < width/2 + 200 && mouseY > height/2.5 - 25 && mouseY < height/2.5 +25){
    fill("white");
    rect(width/2,height/2.5,400,50);
    fill("black");
    mouseHoveringOver = "controls";
  }
  else{
    fill("black");
    rect(width/2,height/2.5,400,50);
    fill("white");
  }

  text("Controls", width/2 - 30, height/2.5 + 5);
  rectMode(CORNER);

}

function displayControls(){
  background(0,100,255);
  textSize(20);
  for(let x = 0; x < controlArray.length; x++){
    fill("orange");
    text(controlArray[x],width/3 - 20, y + height/3);
    y += 20;
  }
  y = 0;
  for (let x = 0; x < playerInputsArray1.length; x++){
    fill("orange");
    text(playerInputsArray1[x],width/2 ,y+height/3);
    y += 20;
  }
  y = 0;
  for (let x = 0; x < playerInputsArray1.length; x++){
    fill("orange");
    text(playerInputsArray2[x],width/3 + width/3,y+height/3);
    y += 20;
  }
  y = 0;
  if (mouseX > width/2 - 150 && mouseX < width/2 + 150 && mouseY > height - 20 - height/3 && mouseY < 20 + height - height/3){
    rectMode(CENTER);
    fill("white");
    rect(width/2,height - height/3,300,40);
    fill("black");
    rectMode(CORNER);
    text("return",width/2.1,5 + height - height/3);
    mouseHoveringOver = "main menu";
  }
  else{
    rectMode(CENTER);
    fill("black");
    rect(width/2,height - height/3,300,40);
    fill("white");
    rectMode(CORNER);
    text("return",width/2.1,5 + height - height/3); 
    mouseHoveringOver = "none";
  }
}


function characterSelect(){
  background("grey");
  
  fill("black");
  rectMode(CENTER);
  
  if (currentPlayerSelection === 1){
    textSize(20);
    text("Player one, please use the mouse to select your character",width/4,height*2/3);
  }
  else{
    textSize(20);
    text("Player two, please use the mouse to select your character",width/4,height*2/3);
  }
  textSize(15);
  
  //changing if the first box is selected
  if (mouseX >= characterSelectBoxX/4 - characterSelectBoxSideLength/2 && mouseX <= characterSelectBoxX/4 + characterSelectBoxSideLength/2 && mouseY >= characterSelectBoxY - characterSelectBoxSideLength/2  && mouseY <= characterSelectBoxY + characterSelectBoxSideLength/2){
    mouseHoveringOver = '1';
    fill("green");    
  }
  else{
    fill("white");
    mouseHoveringOver = 'none';
  }
  rect(characterSelectBoxX/4,characterSelectBoxY,characterSelectBoxSideLength,characterSelectBoxSideLength);
  
  //same code but for the second box
  if (mouseX >= characterSelectBoxX/2 - characterSelectBoxSideLength/2  && mouseX <= characterSelectBoxX/2 + characterSelectBoxSideLength/2 && mouseY >= characterSelectBoxY - characterSelectBoxSideLength/2 && mouseY <= characterSelectBoxY + characterSelectBoxSideLength/2){
    fill("green");    
    mouseHoveringOver = '2';
  }
  else{
    fill("white");
    if (mouseHoveringOver !== "1"){
      mouseHoveringOver = 'none';
    }
  }
  rect(characterSelectBoxX/2,characterSelectBoxY,characterSelectBoxSideLength,characterSelectBoxSideLength);

  if (mouseX >= characterSelectBoxX/2 + characterSelectBoxX/4 - characterSelectBoxSideLength/2 && mouseX <= characterSelectBoxX/2 + characterSelectBoxX/4 + characterSelectBoxSideLength/2 && mouseY >= characterSelectBoxY - characterSelectBoxSideLength/2 && mouseY <= characterSelectBoxY + characterSelectBoxSideLength/2){
    fill("green");    
    mouseHoveringOver = '3';
  }
  else{
    fill("white");
    if (mouseHoveringOver !== "1" && mouseHoveringOver !== "2"){
      mouseHoveringOver = 'none';
    }
  }
  rect(characterSelectBoxX/2 + characterSelectBoxX/4,characterSelectBoxY,characterSelectBoxSideLength,characterSelectBoxSideLength);

  //text for which character is which
  fill("white");  
  text("Josh",characterSelectBoxX/4 - 10,characterSelectBoxY - 60);
  text("Jimmy",characterSelectBoxX/2 - 20, characterSelectBoxY - 60);
  text("Jack",characterSelectBoxX/2 + characterSelectBoxX/4 - 20, characterSelectBoxY - 60);
  rectMode(CORNER);
}


//adding hit detection to the players, not player collisions


function playerIsHit(attacker,defender){
  if ((attacker.currentlyAttacking || attacker.currentlyKicking || attacker.currentlyUsingSpecial) && (!defender.isBlocking || defender.isBlocking && !attacker.facingRight && !defender.facingRight || defender.isBlocking && attacker.facingRight && defender.facingRight)){
    if (attacker.punchX > defender.playerX + kickFactor && attacker.punchX < defender.playerX + defender.width + kickFactor){
      if (attacker.punchY > defender.playerY && attacker.punchY < defender.playerY + defender.height){
        console.log('y');
        if (defender.lastHit < millis() - 750 && attacker.currentlyAttacking){
          defender.currentlyHit = true;
          defender.lastHit = millis();

        }
        else if(defender.lastHit < millis() - 1250 && attacker.currentlyKicking){
          defender.currentlyHit = true;
          defender.lastHit = millis();

        }
        else if (defender.lastHit < millis() - 250 && attacker.currentlyUsingSpecial){
          defender.currentlyHit = true;
          defender.lastHit = millis();
        }
      }
      else{
        console.log('n');
      }
    }
    console.log(attacker.punchX,defender.playerX,attacker.punchY,defender.playerY);
  }
}
