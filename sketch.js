//TREX GAme by Simeon using JS



//Declare variables for game objects and behaviour indicators(FLAGS)
var dino, dinoRun, dinoDead;
var ground, invisibleGround, groundImage;
var cloud, cloudsGroup, cloudImage;
var cacti, cactusGroup;
var cactiImg1, cactiImg2, cactiImg3, cactiImg4, cactiImg5, cactiImg6;
var PLAY, END, gameState;
var score, highScore, displayhighScore;
var gameOver, overImage;
var restartIcon, iconImage;


//Create Media library and load to use it during the course of the software
//executed only once at the start of the program
function preload() {

  dinoRun = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  dinoDead = loadImage("trex_collided.png");
  cloudImage = loadImage("cloud.png");
  cactiImg1 = loadImage("obstacle1.png");
  cactiImg2 = loadImage("obstacle2.png");
  cactiImg3 = loadImage("obstacle3.png");
  cactiImg4 = loadImage("obstacle4.png");
  cactiImg5 = loadImage("obstacle5.png");
  cactiImg6 = loadImage("obstacle6.png");
  groundImage = loadImage("ground2.png");
  overImage = loadImage("gameOver.png");
  iconImage = loadImage("restart.png");

}

//define the intial environment of the software(before it is used)
//by defining the declared variables with default values
//executed only once at the start of the program
function setup() {
  createCanvas(windowWidth, windowHeight);

  dino = createSprite(width / 6 - 20, height - 30, 10, 10);
  dino.addAnimation("dinoRun", dinoRun);
  dino.addAnimation("dinoDead", dinoDead);
  dino.scale = 0.7;
  dino.debug = false;
  dino.setCollider("circle", 0, 0, 45);

  ground = createSprite(width / 2, height - 50, width, 5);
  ground.addImage("groundImage", groundImage);
  invisibleGround = createSprite(width / 6, height - 15, width, 10);
  invisibleGround.visible = false;


  PLAY = 1;
  END = 0;
  gameState = PLAY;

  cactusGroup = createGroup();
  cloudsGroup = createGroup();

  score = 0;
  highScore = 0;
  displayHighscore = false;

  gameOver = createSprite(width / 2, height - 240, 200, 5);
  gameOver.addImage("overImage", overImage);
  gameOver.visible = false;
  gameOver.scale = 1.0;


  restartIcon = createSprite(width / 2, height - 170, 20, 20);
  restartIcon.addImage("iconImage", iconImage);
  restartIcon.visible = false;
  restartIcon.scale = 0.5;



}

//All modifications, changes, conditions, manipulations, actions during the course of the program are written inside function draw.
//All commands to be executed and checked continously or applied throughout the program are written inside function draw.
//function draw is executed for every frame created since the start of the program.
function draw() {
  background("yellow");

  //display score
  text(score, width - 70, height / 2);

  if (gameState == PLAY) {

    //score calculation
    score = score + Math.round(getFrameRate() / 60);
    //condition to display highscore in gamestate play
    if (displayHighscore == true) {
      text("highscore" + highScore, width - 200, height / 2);
    }

    gameOver.visible = false;
    restartIcon.visible = false;


    //ground treadmill effect
    ground.velocityX = -7;
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    //trex jogging movement
    if (keyDown("space") && dino.y >= height - 100) {
      dino.velocityY = -20;
    }
    dino.velocityY = dino.velocityY + 1.5;



    //gameState Change Condition
    if (cactusGroup.isTouching(dino)) {
      gameState = END;
    }
    //spawning clouds and cacti- function call
    spawnClouds();
    spawnCacti();


  } else if (gameState == END) {


    ground.velocityX = 0;
    dino.velocityY = 0;
    dino.changeAnimation("dinoDead", dinoDead);

    cactusGroup.setVelocityXEach(0);
    cactusGroup.setLifetimeEach(-1);
    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    gameOver.visible = true;
    restartIcon.visible = true;

    if (highScore < score) {
      highScore = score;
    }
    text("highscore:" + highScore, width - 200, height / 2);
    if (mousePressedOver(restartIcon)) {
      gameState = PLAY;
      cactusGroup.destroyEach();
      cloudsGroup.destroyEach();
      score = 0;
      displayHighscore = true;
      dino.changeAnimation("dinoRun", dinoRun);

    }


  }

  dino.collide(invisibleGround);
  drawSprites();


}


//function definition to create Clouds as game objects
function spawnClouds() {
  if (World.frameCount % 60 == 0) {
    var cloud = createSprite(width, 100, 20, 20);
    cloud.velocityX = -3;
    cloud.y = random(100, height - 150);
    cloud.depth = dino.depth;
    dino.depth = dino.depth + 1;
    cloud.lifetime = (-1) * (width / cloud.velocityX) + 30;
    cloud.addAnimation("cloudImage", cloudImage);
    cloudsGroup.add(cloud);
  }
}

//function definition to create Cacti as game objects
function spawnCacti() {
  if (World.frameCount % 70 == 0) {
    cacti = createSprite(width, height - 50, 20, 20);
    cacti.velocityX = -7;
    var caseNumber = Math.round(random(1, 6));
    switch (caseNumber) {
      case 1:
        cacti.addImage("cactiImg1", cactiImg1);
        break;
      case 2:
        cacti.addImage("cactiImg2", cactiImg2);
        break;
      case 3:
        cacti.addImage("cactiImg3", cactiImg3);
        break;
      case 4:
        cacti.addImage("cactiImg4", cactiImg4);
        break;
      case 5:
        cacti.addImage("cactiImg5", cactiImg5);
        break;
      case 6:
        cacti.addImage("cactiImg6", cactiImg6);
        break;
      default:
        cacti.addImage("cactiImg6", cactiImg6);
        break;


    }
    cacti.scale = 0.7;
    cacti.lifetime = (-1) * (width / cacti.velocityX) + 30;
    cacti.debug = false;
    cactusGroup.add(cacti);
  }
}