
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var background, spaceship, bullets, asteriods, earth;
var backgroundImg, spaceshipImg, bulletsImg, asteriodsImg, earthImg;
var explosionSound, gameLostSound, shootingSound;
var asteriodGroup; 
var restart, restartImg, rule, rulesImg;
var score = 0;
var life = 5;
var rules, ruleImg, back, backImg;
var Beginning = 0;
var Play = 1;
var End = 2;
var gameState = Beginning;

function preload(){

	backgroundImg = loadImage("background.png");
	spaceshipImg = loadImage("spaceship.png");
	bulletsImg = loadImage(" bullet.png");
	asteriodsImg = loadImage("asteriod.png");
	earthImg = loadImage("earth.png");
    restartImg = loadImage("restart.png");
	rulesImg = loadImage("rules.png");
    ruleImg = loadImage("rule.png");
	backImg = loadImage("back.png");

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
	spaceship.scale = 0.2

	earth =createSprite(width - 1400, height/2);
	earth.addImage(earthImg);
	earth.scale = 5;
    earth.setCollider("rectangle",0,0,80,120)

	restart = createSprite(width - 70, height - 50);
	restart.addImage(restartImg);
	restart.scale = 0.13;

	rule = createSprite(width - 180, height - 45);
	rule.addImage(rulesImg);
	rule.scale = 0.35;

	rules = createSprite(width - 670, height - 330);
	rules.addImage(ruleImg); 
	rules.visible = false;
	rules.scale = 1.05

	back = createSprite(width - 1325, height - 595);
	back.addImage(backImg);
    back.scale = 0.06;
	back.visible = false;

	engine = Engine.create();
	world = engine.world;

	asteriodGroup = new Group();
	bulletGroup = new Group();
	//Create the Bodies Here.


	Engine.run(engine);
  
}


function draw() {

 drawSprites();
  
if(gameState === Play){

  if(keyDown("UP_ARROW")){
	spaceship.y = spaceship.y - 10;
  }

  if(keyDown("DOWN_ARROW")){
	spaceship.y = spaceship.y + 10;
  }

   asteriod();

   if(asteriodGroup.isTouching(earth)){

	for(var i=0;i<asteriodGroup.length;i++){ 

   if(asteriodGroup[i].isTouching(earth)){
	asteriodGroup[i].destroy();
	life -= 1;
	} 
}
   }

   if(asteriodGroup.isTouching(bulletGroup)){

	for(var i=0;i<bulletGroup.length;i++){ 

   if(asteriodGroup[i].isTouching(bulletGroup) ){
	asteriodGroup[i].destroy();
	bulletGroup.destroyEach();
	score += 2;
	explosionSound.play();
	} 
}
   }

   if(keyWentDown("space")){
	bullets = createSprite(displayWidth-1100,spaceship.y-0,20,10)
	bullets.addImage(bulletsImg);
	bullets.scale = 0.2;
	bullets.velocityX = 18
	

	bulletGroup.add(bullets)
	spaceship.depth = bullets.depth
	spaceship.depth = spaceship.depth+2
	//shootingSound.play();
  }

  if(mousePressedOver(rule)){
         rules.visible = true;
		 back.visible = true;
		 asteriodGroup.destroyEach();
  }

  if(score === 20){
	YouWon();
asteriodGroup.destroyEach()
  }

   if(life === 0){
	gameState = End;
   }
  fill("white");
  textSize(25);
  text("Score: " + score,1150,50)
 
  fill("red");
  textSize(25);
  text("Life: " + life,650,50)

}

if(mousePressedOver(back)){
	rules.visible = false;
	back.visible = false;
	gameState = Play;
}	

if(gameState === Beginning){
	rules.visible = true;
		 back.visible = true;
		// asteriodGroup.visible = false;
		// bulletGroup.visible = false;
	
  }

  if(mousePressedOver(restart)){
	Reset();
  }

  if(gameState === End){
	gameOver();
	gameLostSound.play();
  }

}

function asteriod(){
	if(frameCount % 80 === 0){
  
	  asteriods =  createSprite(1450,Math.round(random(height-50,height-700)));
  
	  asteriods.addImage(asteriodsImg)
	  asteriods.scale = 0.2
	  asteriods.velocityX = -7
	 
	  asteriods.lifetime = 400
	 asteriodGroup.add(asteriods)
	}
  
  }

  function gameOver() {
    swal({
      title: `Game Over`,
      text: "Oops the Earth got Destroyed!!!",
      imageUrl:
	  "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
	  
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
	});
  }

  function YouWon() {
    swal({
      title: `Awesome! You Won the Game`,
      text: "Yay! You Save the Earth",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }

  function Reset(){
	life = 5;
	score = 0;
	asteriodGroup.destroyEach();
	gameState = Play
  }

