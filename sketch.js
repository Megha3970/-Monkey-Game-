//declares all the variables globally
var monkey , monkey_running
var banana, bananaImage;
var obstacle, obstacleImage;
var bananaGroup, obstacleGroup
var survivalTime;

function preload()
{
  //loads images
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() 
{
  //creates the canvas
  createCanvas (400,400);
  
  //creates the monkey and adds behaviours to it
  monkey = createSprite (70,320,20,10);
  monkey.addAnimation ("running", monkey_running);
  monkey.scale = 0.1;
  
  //creates the ground and adds the behaviours
  ground = createSprite (400,350,900,10);
  ground.velocityX = -3;
  ground.x = ground.width/2;
  
  //creates the groups
  obstacleGroup = createGroup ();
  bananaGroup = createGroup ();
  
  //sets the survivalTime to 0 at the start
  survivalTime = 0;
}

function draw() 
{
  //colours the screen
  background ("lightblue");
  
  //makes the monkey jump
  if (keyDown ("SPACE") && monkey.y >= 300)
    {
      monkey.velocityY = -12;
    }
  
  //adds gravity to the monkey
  monkey.velocityY = monkey.velocityY + 0.5;
  
  //makes the monkey collide with the ground
  monkey.collide (ground);
  
  //makes the ground scroll  
  if (ground.x < 0)
    {
      ground.x = ground.width/2;
    }
  
  //adds the survival time
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil (frameCount/frameRate ());
  text ("Survival Time: "+ survivalTime, 100,50);
  
  //spawns the bananas and the obstacles
  spawnBananas ();
  spawnObstacles ();  
  
  //displays the sprites
  drawSprites ();
}

function spawnBananas ()
{
  //creates the bananas every 80 frames and adds behaviours
  if (frameCount % 80 === 0)
    {
      var banana = createSprite (400,300,20,20);
      banana.y = Math.round (random (120,200));
      banana.addImage ("banana", bananaImage);
      banana.scale = 0.1;
      banana.velocityX = -4;
      banana.lifetime = 100;
      
      //adds the bananaGroup to the banana
      bananaGroup.add(banana);
    }
}

function spawnObstacles ()
{
  //creates the obstacles every 300 frames and adds behaviours to it
  if (frameCount % 300 === 0)
    {
      var obstacle = createSprite (400,310,20,20);
      obstacle.addImage ("rock", obstacleImage);
      obstacle.scale = 0.2;
      obstacle.velocityX = -4;
      obstacle.lifetime = 100;
      
      //adds the obstacleGroup to the obstacle
      obstacleGroup.add(obstacle);
    }
}