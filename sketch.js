//Create variables here
var dogimg , happydogimg;
var dog , database , food , foodstock;

function preload()
{
  //load images here
  dogimg = loadImage("images/dogimg.png");
  happydogimg = loadImage("images/dogimg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite (250,300,150,150);
  dog.addImage (dogimg);
  dog.scale = 0.15;

  foodstock = database.ref('Food');
  foodstock.on("value" , readStock);
  textSize (20);
  
}


function draw() { 
  background (46,139,87); 

  if (keyDown (UP_ARROW)){
    writeStock(food);
    dog.addImage(happydogimg);
  }

  drawSprites();
  //add styles here
  fill (255,255,254);
  stroke ("black");
  text("Food remaining : " + food , 170, 200);
  textSize (13);
  text("Note : Press Up Arrow to feed the dog!", 130,10,300,20);

}

function readStock(data){
  food = data.val();

}

function writeStock(x){
  if (x <= 0){
    x = 0;
  }
  else {
    x = x - 1;
  }
 database.ref('/').update({
   Food : x
 })   

}



