// 2D ARCADE FIGHTING GAME
// James Mitchell
// DATE OF START
// 11/20/24
// DATE OF FINISH
// 1/21/25

class Player{
  constructor(x,y){    
    //player model
    this.character = '';
    this.playerX = x;
    this.playerY = y;
    this.height = 200;
    this.width = 50; 
    this.facingRight = true;
    this.health = 175;

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
    
    //kicking 
    this.legRotation = 0;
    this.legDown = false;
    this.kickTime;
    this.legX = 0;
    this.legY = 0;
    this.currentlyKicking = false;
    this.kickBalls = 0;

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

    //special
    this.specialUseTime = -2000;
    this.special1Bullet = 0;
    this.rockFalling = false;
    this.rockY = 0;
    this.currentlyUsingSpecial = false;
    this.rockSpeed = 5;
    this.iDontKnowWhatThisDid = 1;
    this.placedMines = false;

    //blocking
    this.isBlocking = false;
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
    this.airTime += 0.009;
    this.isJumping = true;
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

  //punching
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

  //displays the health bar and updates it every frame
  healthBar(x,y){
    rectMode(CORNERS);
    fill("white");
    rect(x, y, x + 100,y+20);
    fill("red");
    for (let i = 0; i < this.health; i++){
      rect(x,y, x + i/1.75, y+20);
    }
    rectMode(CORNER);
  }

  //reduces the health of the player if they get hit
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

  //kicking
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
        this.punchX = this.playerX - this.width/4 + this.kickBalls;
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
        this.punchX = this.playerX + this.width/this.iDontKnowWhatThisDid - this.kickBalls;

      }
      push();
      rectMode(CORNER);
      translate(this.playerX + this.width/2 ,this.playerY + this.height/3 + this.height/3);
      rotate(this.legRotation);
      rect(0,0, 20, this.height/3);
      pop();

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

  //places a rectangle that will 'explode' upon contact from anyone
  special3(){
    if (this.specialUseTime + 1000 > millis()){
      this.currentlyUsingSpecial = true;
      fill("darkgreen");
      if (this.health > 75) {
        if (!this.placedMines){
          if (this.facingRight){
            minefield.push(this.playerX + this.width + 20);
          }
          else{
            minefield.push(this.playerX - this.width - 20);
          }
          this.placedMines = true;
          if (this.health > 30){
            this.health -= 25;
          }
          else{
            this.health = 1;
          }
        }
      }
    }
    else{
      this.currentlyUsingSpecial = false;
      this.placedMines = false;
    }
  }

  //switches the special depending on the character preforming the action
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
  playerInputs(){
    if (!this.currentlyAttacking && !this.currentlyKicking && !this.currentlyUsingSpecial){
      
      //special
      if(keyIsDown(this.specialKey) && this.playerY === 400){
        //this doesnt call the special, but it sets the time that a special can happen so it will activate when special is called
        this.specialUseTime = millis();
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
      if (!this.isBlocking){
        if (keyIsDown(this.forwardKey) && this.playerX <= width - this.width){
          this.playerX += 3;
          this.facingRight = true;
          
        }
        //moving backward if not at the left wall
        if (keyIsDown(this.backwardKey) && this.playerX >= 0){
          this.playerX -= 3;
          this.facingRight = false;
          
        }
      }
      
      //punching
      if (keyIsDown(this.punchKey)  && (this.playerY === 400 || this.playerY === 500)){
        this.oldTime = millis();
      }

      //blocking
      if(keyIsDown(this.blockKey) && this.playerY === 400 || this.playerY === 500){
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

      //kicking
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

//variables
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
let playerInputsArray1 = ["PLAYER 1:","D","A","S","W","Q","F","E","R"];
let playerInputsArray2 = ["PLAYER 2 TURN ON NUM LOCK:","1 ON NUMPAD","3 ON NUMPAD","2 ON NUMPAD","5 ON NUMPAD","4 ON NUMPAD","7 ON NUMPAD","6 ON NUMPAD","9 ON NUMPAD",];
let winner = "";
let minefield = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  //creating the 2 player classes and the 3 display classes
  john = new Player(100,400);
  jim = new Player(windowWidth - 100,400);
  displayJack = new Player(windowWidth/2,300);
  displayJimmy = new Player(windowWidth/2,300);
  displayJosh = new Player(windowWidth/2,300);

  displayJack.character = 'jack';
  displayJimmy.character = 'jimmy';
  displayJosh.character = 'josh';

  jim.facingRight = false;
  characterSelectBoxX = windowWidth;

  //sets player 1 and 2's keys so they can call the same functions
  john.jumpKey = 87;
  john.forwardKey = 68;
  john.backwardKey = 65;
  john.crouchKey = 83;
  john.punchKey = 81;
  john.blockKey = 69;
  john.kickKey = 70;
  john.specialKey = 82;

  jim.jumpKey = 101;
  jim.forwardKey = 99;
  jim.backwardKey = 97;
  jim.crouchKey = 98;
  jim.punchKey = 100;
  jim.blockKey = 102;
  jim.kickKey = 103;
  jim.specialKey = 105;
}

function draw() {
  background(220);
  //a basic check that will trigger the corresponding mode
  if(gameMode === "start screen"){
    mainMenu();
  }
  else if(gameMode === "controls"){
    displayControls();
  }
  else if(gameMode === "characters"){
    characterDescription();
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
    john.playerInputs();
    john.hit();
    john.special();
    
    //required functions for player 2
    jim.display();
    jim.playerInputs();
    jim.hit();
    jim.special();
    
    //attacking
    john.kick();
    jim.kick();
    john.punch();
    jim.punch();

    //checking for damage
    playerIsHit(john,jim);
    playerIsHit(jim,john);
    mines(john);
    mines(jim);

    //game end conditions
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
    //removes all mines and displays the winner
    minefield = [];
    if (winner === "jim"){
      background("grey");
      text("Player 2 wins!", width/2, height/2 - 20);
      text("Click anywhere to return to the menu", width/2 - 40, height/2 + 20);

    }
    else{
      background('grey');
      text("player 1 wins!", width/2 - 20, height/2 - 20);
      text("Click anywhere to return to the menu", width/2 - 40, height/2 + 20);
    }
  }
}

//depending on what the mouse has selected changes what will happen
function mousePressed(){
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
    else if (mouseHoveringOver === "characters"){
      gameMode = "characters";
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
    //resets all stats
    gameMode = "start screen";
    john.health = 175;
    jim.health = 175;
    john.playerX = 100;
    jim.playerX = windowWidth - 100;
    john.character = '';
    jim.character = '';
    currentPlayerSelection = 1;
  }
}

//Loads all the selectable options for the player to select what they would like to do
function mainMenu(){
  rectMode(CENTER);
  textSize(20);
  fill("black");
  text("The Definitely Well Made Game",width/2 - 120,50);
  //Displays the start button and checks if its being hovered over
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
  
  //Displays a button to check the controls and checks if its being hovered over
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

  //Displays a button to preview the characters, and checks if its being hovered over
  if (mouseX > width/2 - 200 && mouseX < width/2 + 200 && mouseY > height/1.8 - 25 && mouseY < height/1.8 +25){
    fill("white");
    rect(width/2,height/1.8,400,50);
    fill("black");
    mouseHoveringOver = "characters";
  }
  else{
    fill("black");
    rect(width/2,height/1.8,400,50);
    fill("white");
  }

  text("Characters", width/2 - 40, height/1.8 + 5);
  rectMode(CORNER);
}

//displaying both players controls
function displayControls(){
  background(0,100,255);
  textSize(20);
  //showing what action corresponds to the key
  for(let x = 0; x < controlArray.length; x++){
    fill("orange");
    text(controlArray[x],width/3 - 20, y + height/3);
    y += 20;
  }
  y = 0;
  //showing what key player 1 needs to use for each action
  for (let x = 0; x < playerInputsArray1.length; x++){
    fill("orange");
    text(playerInputsArray1[x],width/2 ,y+height/3);
    y += 20;
  }
  y = 0;
  //showing what key player 2 needs to use for each action
  for (let x = 0; x < playerInputsArray1.length; x++){
    fill("orange");
    text(playerInputsArray2[x],width/3 + width/3,y+height/3);
    y += 20;
  }
  y = 0;
  //return button
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

//loads the descriptions of the characters depending on where the mouse is
function characterDescription(){
  fill("black");
  text("Click anywhere to return to the Main Menu", width/2 - 100, height - 120);
  //displays Josh's overview
  if (mouseX < width/3 && mouseY > height - 100){
    characterDescriptionJosh();
    fill("white");
    rect(0,height - 100,width/3,100);
    fill("black");
  }
  else{
    fill("black");
    rect(0,height - 100,width/3,100);
    fill("white");
  }
  text("Josh",width/6 - 20,height - 50);
  fill("black");
  text("Click anywhere to return to the Main Menu", width/2 - 100, height - 120);

  //displays Jimmy's overview
  if (mouseX > width/3 && mouseX < width/1.5 && mouseY > height - 100){
    characterDescriptionJimmy();
    fill("white");
    rect(width/3,height - 100,width/3,100);
    fill("black");
  }
  else{
    fill("black");
    rect(width/3,height - 100,width/3,100);
    fill("white");
  }
  text("Jimmy",width/2 - 30,height - 50);
  fill("black");
  text("Click anywhere to return to the Main Menu", width/2 - 100, height - 120);

  //displays Jack's overview
  if (mouseX > width/1.5 && mouseY > height - 100){
    characterDescriptionJack();
    fill("white");
    rect(width/1.5,height - 100,width/3,100);
    fill("black");
  }
  else{
    fill("black");
    rect(width/1.5,height - 100,width/3,100);
    fill("white");
  }
  text("Jack",width - width/4.5,height - 50);
  fill("black");
  text("Click anywhere to return to the Main Menu", width/2 - 100, height - 120);
  mouseHoveringOver = "main menu";
}

//the 3 functions to display the characters
function characterDescriptionJack(){
  fill("white");
  rect(0,0,width,height - 100);
  fill("black");
  text("Jacks's special is a landmine that costs 25 HP to use",windowWidth/2 - windowWidth/5,100);
  displayJack.display();
}
function characterDescriptionJimmy(){
  fill("white");
  rect(0,0,width,height - 100);
  fill("black");
  text("Jimmy's special is a rock",windowWidth/2 - windowWidth/12,100);
  displayJimmy.display();
}
function characterDescriptionJosh(){
  fill("white");
  rect(0,0,width,height - 100);
  fill("black");
  text("Josh's special is a projectile with a limited life span",windowWidth/2 - windowWidth/8,100);
  displayJosh.display();
}

function characterSelect(){
  background("grey");
  fill("black");
  rectMode(CENTER);
  //player 1 and 2 selection toggle
  if (currentPlayerSelection === 1){
    textSize(20);
    text("Player one, please use the mouse to select your character",width/4,height*2/3);
  }
  else{
    textSize(20);
    text("Player two, please use the mouse to select your character",width/4,height*2/3);
  }
  textSize(15);
  
  //lets the player in control to select their character
  if (mouseX >= characterSelectBoxX/4 - characterSelectBoxSideLength/2 && mouseX <= characterSelectBoxX/4 + characterSelectBoxSideLength/2 && mouseY >= characterSelectBoxY - characterSelectBoxSideLength/2  && mouseY <= characterSelectBoxY + characterSelectBoxSideLength/2){
    mouseHoveringOver = '1';
    fill("green");    
  }
  else{
    fill("white");
    mouseHoveringOver = 'none';
  }
  rect(characterSelectBoxX/4,characterSelectBoxY,characterSelectBoxSideLength,characterSelectBoxSideLength);
  
  //same as above, only for the second character
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

  //same as above, only for the third character
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

//displays the 'mines' and checks if a player is triggering them
function mines(minePlacer){
  for (let i = 0; i < minefield.length; i++){
    fill("darkgreen");
    rect(minefield[i],580,40,20);
    if (minePlacer.facingRight){
      if(minePlacer.playerX + minePlacer.width > minefield[i] && minePlacer.playerX + minePlacer.width< minefield[i]+40 && minePlacer.playerY + minePlacer.height > 580){
        minePlacer.health -= 25;
        minefield.splice(i,1);
      }
    }
    else{
      if(minePlacer.playerX > minefield[i] && minePlacer.playerX < minefield[i]+40 && minePlacer.playerY + minePlacer.height > 580){
        minePlacer.health -= 25;
        minefield.splice(i,1);
      }
    }
  }
}

//checks when a player is attacking if they will hit the other player
function playerIsHit(attacker,defender){
  if ((attacker.currentlyAttacking || attacker.currentlyKicking || attacker.currentlyUsingSpecial) && (!defender.isBlocking || defender.isBlocking && !attacker.facingRight && !defender.facingRight || defender.isBlocking && attacker.facingRight && defender.facingRight || attacker.currentlyUsingSpecial) || attacker.currentlyKicking && defender.currentlyCrouched){
    if (attacker.punchX > defender.playerX + kickFactor && attacker.punchX < defender.playerX + defender.width + kickFactor){
      if (attacker.punchY > defender.playerY && attacker.punchY < defender.playerY + defender.height){
        //changes the I-Frame time depending on what attack was used
        if (defender.lastHit < millis() - 750 && attacker.currentlyAttacking){
          defender.currentlyHit = true;
          defender.lastHit = millis();
        }
        else if(defender.lastHit < millis() - 1250 && attacker.currentlyKicking){
          defender.currentlyHit = true;
          defender.lastHit = millis();
        }
        else if (defender.lastHit < millis() - 200 && attacker.currentlyUsingSpecial){
          defender.currentlyHit = true;
          defender.lastHit = millis();
        }
      }
    }
  }
}
