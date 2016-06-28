var Circle;
var arrayOfCircles = [];
var totalCircles = 50;

function setup() {
  createCanvas(600, 600);

//checks overlap of original circles
function checkOverlap() {
  var overlapping = false;
  for (var i = 0; i < arrayOfCircles.length; i++) {
      var possibleOverlap = dist(proposedCircle.x, proposedCircle.y, arrayOfCircles[i].x, arrayOfCircles[i].y)
      
      if (possibleOverlap < proposedCircle.radius + arrayOfCircles[i].radius) {
        overlapping = true;
        break;
      }
    }
    
    if (!overlapping) {
      return false;
    }
}

//writes original circles
while(arrayOfCircles.length < totalCircles) {
    var proposedCircle = new Circle();
    var safetyValve;
    
    checkOverlap();
    if (checkOverlap() === false) {
      arrayOfCircles.push(proposedCircle);
    }
    
    safetyValve++ 
    if (safetyValve > 10000) {
      break;
    }
  } 
  
}
 
//bumble works fine but does not check for collision 
function bumble(proposedCircle) {
    
    var mulliganX = proposedCircle.x;
    var mulliganY = proposedCircle.y;
  
    var choice = floor(random(4));
    if (choice === 0) {
      proposedCircle.x += 0.5;
    } else if (choice === 1) {
      proposedCircle.x -= 0.5;
    } else if (choice === 2) {
      proposedCircle.y += 0.5;
    } else {
      proposedCircle.y -= 0.5 ;
    } 
    
    //ensure center is on canvas
    //returns to edge if out of bounds
    if (proposedCircle.x > width) {
      proposedCircle.x = width;
    } else if (proposedCircle.x < 0) {
      proposedCircle.x = 0;
    } else if (proposedCircle.y > height) {
      proposedCircle.y = height;
    } else if (proposedCircle.y < 0){
      proposedCircle.y = 0;
    } 
    
    if (bump(proposedCircle)===true) {
      proposedCircle.x = mulliganX;
      proposedCircle.y = mulliganY;
    }
}

//bump should check for collision, but I can't get my head around it
function bump(currentCircleIndex) {
  
  //labels each circle with arrayOfCircles index
  push();
  strokeWeight(1);
  stroke(0);
  textAlign(CENTER);
  textSize(currentCircleIndex.radius * 0.75);
  text(arrayOfCircles.indexOf(currentCircleIndex), currentCircleIndex.x, currentCircleIndex.y);
  pop();
  
  
  
  for (var m = 0; m < arrayOfCircles.length; m++ ) {
    if (m != arrayOfCircles.indexOf(currentCircleIndex)) {
      possibleOverlap = dist(currentCircleIndex.x, currentCircleIndex.y, arrayOfCircles[m].x, arrayOfCircles[m].y);
      
      if (possibleOverlap < currentCircleIndex.radius + arrayOfCircles[m].radius) {
        return true;
      }
    }
  }
  
  return false;

  
}

function draw() {
  background(255);
  
  
  for (var k = 0; k < arrayOfCircles.length; k++) {
    bumble(arrayOfCircles[k]);
    arrayOfCircles[k].display();
  }
}




