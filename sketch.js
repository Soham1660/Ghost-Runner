var ghost,ghostImg;
var door,doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var tower,towerImg;
var invisibleBlock,invisbleBlockGroup;
var gameState = "play";

function preload(){
  ghostImg=loadImage("ghost-standing.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  towerImg=loadImage("tower.png");
  spookySound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
 tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
  
  doorsGroup= new Group();
  climbersGroup= new Group();
  invisibleBlockGroup = new Group();
}

function draw(){
  background(0);
  
  if(gameState === "play"){
     if(keyDown("left_arrow")){
        ghost.x = ghost.x - 3;
}
    
    if(keyDown("right_arrow")){
     ghost.x = ghost.x + 3;
}
    
    if(keyDown("space")){
    ghost.velocityY = -5;
}
    ghost.velocityY = ghost.velocityY + 0.5;
    
    if(tower.y > 400){
       tower.y = 300;
       }
    
    spawnDoors();
    
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
      if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
         ghost.destroy();
          gameState = "end";
         }
  drawSprites();
} 
  
 if (gameState === "end"){
   fill("yellow");
   textSize(30);
   text("Game Over!",300,300);
 } 
  
  function spawnDoors(){
    if(frameCount % 240 === 0){
       var door = createSprite(200,-50);
      var climber = createSprite(200,10);
      var invisibleBlock=createSprite(200,15);
      invisibleBlock.width = climber.width;
      invisibleBlock.height = 2;
      door.x = Math.round(random(120,400));
      climber.x = door.x;
      invisibleBlock.x = door.x;
      door.addImage(doorImg);
      climber.addImage(climberImg);
      
      door.velocityY = 1;
      climber.velocityY = 1;
      invisibleBlock.velocityY =1;
      
      ghost.depth = door.depth;
      ghost.depth   +=1;
      
      door.lifetime = 800;
      climber.lifetime = 700;
      invisibleBlock.lifetime =800;
      doorsGroup.add(door);
      invisibleBlockGroup.add(invisibleBlock);
      invisibleBlock.debug = true;
      climbersGroup.add(climber);
       }
  }
}