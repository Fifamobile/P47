var PLAY = 1;
var END = 0;
var gameState = PLAY;

var rabbit, carrot, bg, bgImg,obstacle, obstacleImg;
var rabbit_jumping, carrotImg;
var obstaclesGroup

var score = 0;

var gameOver,gameOverImg,restartImg, restart;

function preload() {

  rabbit_jumping = loadAnimation("./assets/rabbit/rabbit1.png", "./assets/rabbit/rabbit2.png");
  carrotImg = loadImage("./assets/carrot.png");
  bgImg = loadImage("./assets/background.jpg");
  obstacleImg = loadImage("./assets/rock.png");

  gameOverImg = loadImage("./assets/gameOver.png");
  restartImg = loadImage("./assets/reset.png");
}

function setup() {
  createCanvas(1200, 800);

  bg = createSprite(600, 400);
  bg.scale = 1.2;
  bg.addImage("bg", bgImg);
  bg.x = bg.width / 4;
  bg.velocityX = -6;
 
  rabbit = createSprite(100, 750, 30, 40)

  rabbit.addAnimation("jumping", rabbit_jumping);
  rabbit.scale = 0.5

  

  gameOver = createSprite(600, 400);
  gameOver.addImage(gameOverImg);

  restart = createSprite(600, 250);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  invisGround = createSprite(600, 750, 1200, 10);
  invisGround.visible = false;

  obstaclesGroup = new Group();

 rabbit.setCollider("circle",-10,0,100);
  rabbit.debug = true

  score = 0;
}

function draw() {
  background(0);
  text("Score: " + score, 1100, 50);

  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60);
    
    if (keyDown("space") && rabbit.y >= 400) {
      rabbit.velocityY = -15;
    }

    rabbit.velocityY = rabbit.velocityY + 0.8

    if (bg.x < 450) {
      bg.x = bg.width / 2;
    }

    bg.velocityX = -6;

    rabbit.collide(invisGround);
    spawnObstacle();

    if (obstaclesGroup.isTouching(rabbit)) {
      gameState = END
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    bg.velocityX = 0;
    rabbit.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.destroyEach();

    if (mousePressedOver(restart)) {
      reset();
    }
  }



  drawSprites();
}

function spawnObstacle() {
  if (frameCount % 150 === 0) {
    var obstacle = createSprite(1200, 650, 10, 40);
    obstacle.velocityX = -3

    obstacle.addImage(obstacleImg);

    obstacle.scale = 0.5;
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
  }
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  bg.velocityX = -6;
  score = 0;
}