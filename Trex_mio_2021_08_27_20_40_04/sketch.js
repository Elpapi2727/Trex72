var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score;

var sonidosalto;
var sonidomuerte;
var sonidopunto
var botton;
var botton2;

var trex, trex_running, edges, ground;
var groundImage;
var pisoinvisible;
var cloud, cloudImage;
var cactus1;
var cactus2;
var cactus3;
var cactus4;
var cactus5;
var cactus6;
var trexMuerto;
var gameover;
var restart;

var cactusGroup;
var cloudGroup;
var bottonGroup
var botton2Group

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  cactus1 = loadImage("cactus1.png");
  cactus2 = loadImage("cactus2.png");
  cactus3 = loadImage("cactus3.png");
  cactus4 = loadImage("cactus4.png");
  cactus5 = loadImage("cactus5.png");
  cactus6 = loadImage("cactus6.png");
  trexMuerto = loadAnimation("trex_collided.png");
  gameover = loadImage("gameOver.png");
  restart = loadImage("restart.png");
  sonidosalto =  loadSound("brinca.mp3");
  sonidomuerte = loadSound("muere.mp3")
  sonidopunto = loadSound("punto.mp3");
}

function setup(){
  createCanvas(600,200);
  
  //crea el Trex
  trex = createSprite(50,160,20,50);
  ground = createSprite(300,190, 600,10);
  pisoinvisible = createSprite(300,195,600,1)
  pisoinvisible.visible = false;  
  ground. addImage("ground", groundImage);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("muerto", trexMuerto);
  edges = createEdgeSprites();
  
  trex.setCollider("circle",0,0,60);
  
  //añade escala y posición al Trex
  trex.scale = 0.5;
  trex.x = 50
  
  cactusGroup = new Group();
  cloudGroup = new Group();
  bottonGroup = new Group();
  botton2Group = new Group();
  
  score = 0;
  
}


function draw(){
  //establece un color de fondo 
  background(1000);
  text("score:" + score,500,50)
  
if(gameState === PLAY){
//mueve el suelo
ground.velocityX = -(5 + score / 200);
//puntuación
score = score + Math.round(setFrameRate()/60);
    
if (ground.x < 0){
ground.x = ground.width/2;
}
    
//agrega gravedad
trex.velocityY = trex.velocityY + 0.8
  
if(score % 500 === 0 && score > 0 ){
sonidopunto.play()
}
  
//aparece las nubes
nubes();
  
//aparece obstáculos en el suelo
cactus();
      
salto();
      
sonidodemuerte();
    
    }
else if (gameState === END) {
ground.velocityX = 0;
     
cactusGroup.setVelocityXEach(0);
cloudGroup.setVelocityXEach(0);
     
trex.changeAnimation("muerto", trexMuerto)
     
if(trex.y >= 100){
trex.velocityY = 0;
}

cactusGroup.setLifetimeEach(-1);     
cloudGroup.setLifetimeEach(-1); 
     
EndGame();
}

  trex.collide(pisoinvisible);
  
  if(mousePressedOver(botton2)){
  reset();  
  }

  drawSprites();
}

function nubes(){
  if(frameCount % 60 === 0){
cloud = createSprite(600,50,20,20);
cloud.addImage(cloudImage)
cloud.y = Math.round(random(10,50));
cloud.velocityX = -5 ;
cloud.depth = trex.depth - 1;
cloud.lifetime = 130;
cloudGroup.add(cloud);
}
}

function cactus(){
  if(frameCount % 80 === 0){
cactuse = createSprite(600,170,20,20);
 cactuse.scale = 0.7;
cactuse.velocityX = -(5 + score / 200);
cactuse.lifetime = 130;
var rand = Math.round(random(1,6));
switch(rand){
case 1: cactuse.addImage(cactus1);
break;    
case 2: cactuse.addImage(cactus2);
break;     
case 3: cactuse.addImage(cactus3);
break;     
case 4: cactuse.addImage(cactus4);
break;  
case 5: cactuse.addImage(cactus5);
break; 
case 6: cactuse.addImage(cactus6);
break; 
default: break; 
}
    cactusGroup.add(cactuse);

}
  
}

function EndGame(){
botton = createSprite(300,80,20,20)
botton2 = createSprite(300,140 ,20,20)
botton.addImage(gameover);
botton2.addImage(restart);
  
bottonGroup.add(botton);
botton2Group.add(botton2);
}

function salto(){
if(keyDown("space")&& trex.y >= 150) {
trex.velocityY = -13;
sonidosalto.play();
}
}

function sonidodemuerte(){
if(cactusGroup.isTouching(trex)){
gameState = END;
sonidomuerte.play();
}
}

function reset(){
gameState = PLAY;
cloudGroup.destroyEach();
cactusGroup.destroyEach();
bottonGroup.destroyEach();
botton2Group.destroyEach();
trex.changeAnimation("running");
score = 0;
}