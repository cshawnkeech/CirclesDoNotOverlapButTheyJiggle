var Circle;
var arrayOfCircles = [];
var totalCircles = 100;
framerate();

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
      //totalCircles = arrayOfCircles.length;
      break;
    }
  }

}

//bumble works fine and now checks for collision
function bumble(proposedCircle) {

    var mulliganX = proposedCircle.x;
    var mulliganY = proposedCircle.y;

    var choice = floor(random(96));
    if (choice === 0) {
      proposedCircle.x += 5/proposedCircle.radius ;
    } else if (choice === 1) {
      proposedCircle.x -= 5/proposedCircle.radius;
    } else if (choice === 2) {
      proposedCircle.y += 5/proposedCircle.radius;
    } else {
      proposedCircle.y -= 5/proposedCircle.radius ;
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
  if(currentCircleIndex.radius > 20){
    push();
    textSize(currentCircleIndex.radius * 0.3);
    text(round(currentCircleIndex.x) + ", " + round(currentCircleIndex.y), round(currentCircleIndex.x), round(currentCircleIndex.y) + currentCircleIndex.radius/3);

    pop();
  }

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

  stroke(0);
  //text(frameCount, 20,20);

  for (var k = 0; k < arrayOfCircles.length; k++) {
    bumble(arrayOfCircles[k]);
    arrayOfCircles[k].display();
  }


}
