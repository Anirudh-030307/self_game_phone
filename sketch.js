var canvas , car , carIMG ; 
var play , tutorial , back ,left , right , leftIMG , rightIMG , playIMG , tutorialIMG , backIMG ;
var gameState=0
var bg1 , road , roadIMG,road1 ;
var rand ;
var npc,npcGroup,bg,over,t1,back1 ;

function preload() {
  roadIMG = loadImage('images/track.png');
  carIMG = loadImage('images/ezgif.com-crop (1).png');
  leftIMG = loadImage('images/ezgif.com-rotate.png');
  rightIMG = loadImage('images/ezgif.com-rotate (1).png');
  playIMG = loadImage('images/play.png');
  tutorialIMG = loadImage('images/tutorial.png');
  backIMG = loadImage('images/back.png');
  back1IMG = loadImage('images/back.png');
  npc1 = loadImage('images/ezgif.com-crop.png');
  npc2 = loadImage('images/ezgif.com-crop (1) (1).png');
  npc3 = loadImage('images/ezgif.com-crop (2).png');
  npc4 = loadImage('images/ezgif.com-crop (3).png');
  npc5 = loadImage('images/ezgif.com-crop (4).png');
  npc6 = loadImage('images/ezgif.com-crop (5).png');
  npc7 = loadImage('images/ezgif.com-gif-maker.png');
  bg = loadImage('images/bg.jpg');
  road1 = loadImage('images/image.png');
  over = loadImage('images/over.jpg');
  t1 = loadImage('images/t1.jpg');

}

function setup(){
  canvas = createCanvas(windowWidth-30,windowHeight-30);

  road = createSprite(700,-400);
  road.velocityY = 5 ;
  road.addImage(road1);
  road.scale = 1.5; 
  road.visible = false;

  play = createSprite(windowWidth*3/4,windowHeight-20,60,20);
  play.addImage(playIMG);
  play.scale = 1; 

  tutorial = createSprite(windowWidth/4,windowHeight-20,60,20);
  tutorial.addImage(tutorialIMG);
  tutorial.scale = 1; 

  back = createSprite(windowWidth*3/4,windowHeight-40,60,20);
  back.addImage(backIMG);
  back.scale = 0.2; 
  back.visible = false;

  back1 = createSprite(windowWidth/4,windowHeight-40,60,20);
  back1.addImage(back1IMG);
  back1.scale = 0.2; 
  back1.visible = false;

  left= createSprite(windowWidth*3/4,windowHeight-40,60,20);
  left.addImage(leftIMG);
  left.scale = 0.5; 
  left.visible = false;

  right= createSprite(windowWidth/4,windowHeight-40,60,20);
  right.addImage(rightIMG);
  right.scale = 0.5; 
  right.visible = false;

  car= createSprite(600,500,60,20);
  car.addImage(carIMG);
  car.visible = false;
  car.setCollider("rectangle",0,0,60,160);
  car.debug=true;
  
  npcGroup=createGroup();
 
  //roadIMG="white";

}

function draw(){
  background(bg);

  if (gameState===4) {
    background(over);
    back1.visible=true;
    npcGroup.destroyEach();
  }
if (mousePressedOver(back1)) {
  road.velocityY = 5 ;
  gameState=0;
}

if (gameState===0) {
  background(bg);
  back1.visible=false;
  play.visible = true;
  tutorial.visible = true;

}

if (mousePressedOver(tutorial)) {
  play.visible = false;
  tutorial.visible = false;
  fill("red");
  back.visible=true;
  back.shapeColor = "red";
  gameState = 1;
}
if(gameState===1){
  background(t1);
}

if (mousePressedOver(back)) {
  gameState=3;
  play.visible = true;
  tutorial.visible = true;
  back.visible = false;
}

if (mousePressedOver(play)) {
  road.visible = true;
  tutorial.visible = false;
  play.visible = false;
  left.visible = true;
  right.visible = true;
  car.visible = true;
  gameState = 2;
}

reset()
if (car.x < 300) {
  car.x = 300 ;
}
if (car.x > 1107) {
  car.x = 1107 ;
}

if (gameState === 2) {
  controls(); 
  NPC() 
}

  drawSprites();
  text("X:"+mouseX+"Y:"+mouseY,mouseX,mouseY);
}

function controls() {
  if (mousePressedOver(left)) {
    car.x = car.x - 10;
  } 
  if (mousePressedOver(right)) {
    car.x = car.x + 10;
  } 
}

function reset() {
  if (road.y > 950) {
    road.y = -300;
  }
}

function NPC() {
  if (frameCount%50===0) {
    npc = createSprite(random(300,1107),50);
    npc.setCollider("rectangle",0,0,60,160);
    npc.debug=true;
    npc.velocityY =random(3,5) ;
    rand = Math.round(random(1,6))
    switch(rand){
      case 1 : npc.addImage(npc1);
      break ;
      case 2 : npc.addImage(npc2);
      break ;
      case 3 : npc.addImage(npc3);
      break ;
      case 4 : npc.addImage(npc4);
      break ;
      case 5 : npc.addImage(npc5);
      break ;
      case 6 : npc.addImage(npc6);
      break ;
      default: break ;
    }
    npc.lifetime = 150 ;
    npcGroup.add(npc);
    ending()
  }
}

function ending() {
  if (npcGroup.isTouching(car)) {
    gameState=4
  }
  
  if (gameState===4) {
    background(over);
    npcGroup.setVelocityYEach(0) ;
    road.visible=false ;
    road.velocityY = 0 ;
    left.visible = false;
    right.visible = false;
    car.visible = false;
    npcGroup.setVisibleEach(false);
    npcGroup.setLifetimeEach(-1) ;
   
  }
}