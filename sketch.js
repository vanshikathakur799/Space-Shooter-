
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var background, spaceship, bullets, asteriods, earth;
var backgroundImg, spaceshipImg, bulletsImg, asteriodsImg, earthImg;
var explosionSound, gameLostSound, shootingSound;
var asteriodGroup; 
var score = 0;
var life = 5;

function preload(){

	backgroundImg = loadImage("background.png");
	spaceshipImg = loadImage("spaceship.png");
	bulletsImg = loadImage(" bullet.png");
	asteriodsImg = loadImage("asteriod.png");
	earthImg = loadImage("earth.png");

	explosionSound = loadSound("explosion.mp3");
	gameLostSound = loadSound("game lost.mp3");
    shootingSound = loadSound("shooting.mp3");
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	background = createSprite(width/2,height/2);
    background.addImage(backgroundImg);
	background.scale = 1.6;
  
    spaceship = createSprite(width-1085,height/2);
	spaceship.addImage(spaceshipImg);
	spaceship.scale = 0.2;

	earth =createSprite(width - 1400, height/2);
	earth.addImage(earthImg);
	earth.scale = 5;

	engine = Engine.create();
	world = engine.world;

	asteriodGroup = new Group()
	//Create the Bodies Here.


	Engine.run(engine);
  
}


function draw() {
 // rectMode(CENTER);
 // background(0)
  
  if(keyDown("UP_ARROW")){
	spaceship.y = spaceship.y - 5;
  }

  if(keyDown("DOWN_ARROW")){
	spaceship.y = spaceship.y + 5;
  }

   asteriod();

  drawSprites();
   
  fill("white");
  textSize(25);
  text("Score: " + score,1150,50)
 
  fill("red");
  textSize(25);
  text("Life: " + life,650,50)
}

function asteriod(){
	if(frameCount % 100 === 0){
  
	  asteriods =  createSprite(1450,Math.round(random(height-50,height-700)));
  
	  asteriods.addImage(asteriodsImg)
	  asteriods.scale = 0.2
	  asteriods.velocityX = -4
	 
	  asteriods.lifetime = 400
	 asteriodGroup.add(asteriods)
	}
  
  }

