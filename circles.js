//Circle class constructor
function Circle() {
  this.upperbound = 60; // for later
  this.lowerbound = 5; // for later
  this.x = round(random(width));
  this.y = round(random(height));
  this.radius = (round(random(this.lowerbound, this.upperbound)));
  this.jostleStrength = 0.5;
  //this.color = (this.x, this.y, this.radius, 120);

  this.display = function() {
    strokeWeight(2);
    fill(this.x, this.y, this.radius, 120);
    ellipse(this.x, this.y, 2 * this.radius, 2 * this.radius);
  }
} //end of Circle class constructor

function newCircle() {

  totalCircles++;

  while (arrayOfCircles.length < totalCircles) {

    proposedCircle = new Circle();
    checkOverlap();
    if (checkOverlap() === false) {
      arrayOfCircles.push(proposedCircle);
    }
  }
} //end of newCircle

function removeCircle() {
  for (var p = arrayOfCircles.length - 1; p > 0; p--) {
    if (arrayOfCircles[p].radius < 20) {
      arrayOfCircles.splice(p, 1);
      totalCircles--;
    }
  }
} //end of removeCircle

function reset() {
  arrayOfCircles = [];
  totalCircles = 100;

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
  while (arrayOfCircles.length < totalCircles) {
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
} // end of reset

//bumble works fine and now checks for collision
function bumble(proposedCircle) {

  var mulliganX = proposedCircle.x;
  var mulliganY = proposedCircle.y;

  //heavily favors upward movement & upward diagonals

  var choice = floor(random(96));
  if (choice === 0) {
    proposedCircle.x += 5 / proposedCircle.radius; //right 0
  } else if (choice === 1) {
    proposedCircle.x -= 5 / proposedCircle.radius; //left 1
  } else if (choice === 2) {
    proposedCircle.y += 5 / proposedCircle.radius; //down 2
  } else if (choice === 3) {
    proposedCircle.x += 5 / proposedCircle.radius; //diag: right down
    proposedCircle.y += 5 / proposedCircle.radius;
  } else if (choice === 4) {
    proposedCircle.x -= 5 / proposedCircle.radius; //diag: left down
    proposedCircle.y += 5 / proposedCircle.radius;
  } else if (choice >= 5 && choice < 25) { //larger chance for upwards diag
    proposedCircle.x += 5 / proposedCircle.radius; //diag: right up
    proposedCircle.y -= 5 / proposedCircle.radius;
  } else if (choice >= 25 && choice < 45) { //larger chance for upwards diag
    proposedCircle.x -= 5 / proposedCircle.radius; //diag: left up
    proposedCircle.y -= 5 / proposedCircle.radius;
  } else {
    proposedCircle.y -= 5 / proposedCircle.radius; //up all others
  }

  //ensure center is on canvas
  //returns to edge if out of bounds
  if (proposedCircle.x > width) {
    proposedCircle.x = width;
  } else if (proposedCircle.x < 0) {
    proposedCircle.x = 0;
  } else if (proposedCircle.y > height) {
    proposedCircle.y = height;
  } else if (proposedCircle.y < 0) {
    proposedCircle.y = 0;
  }

  if (bump(proposedCircle) === true) {
    proposedCircle.x = mulliganX;
    proposedCircle.y = mulliganY;
  }
} //end of bumble

//bump now checks for collision
function bump(currentCircleIndex) {

  //labels each circle with arrayOfCircles index
  push();
  strokeWeight(1);
  stroke(0);
  textAlign(CENTER);
  textSize(currentCircleIndex.radius * 0.75);
  text(arrayOfCircles.indexOf(currentCircleIndex), currentCircleIndex.x, currentCircleIndex.y);

  //labels circles larger than radius 20 with rounded x, y coordinates
  if (currentCircleIndex.radius > 20) {
    push();
    textSize(currentCircleIndex.radius * 0.3);
    text(round(currentCircleIndex.x) + ", " + round(currentCircleIndex.y), round(currentCircleIndex.x), round(currentCircleIndex.y) + currentCircleIndex.radius / 3);

    pop();
  }

  pop();

  //checks for collision, returns true or false
  for (var m = 0; m < arrayOfCircles.length; m++) {
    if (m != arrayOfCircles.indexOf(currentCircleIndex)) {
      possibleOverlap = dist(currentCircleIndex.x, currentCircleIndex.y, arrayOfCircles[m].x, arrayOfCircles[m].y);

      if (possibleOverlap < currentCircleIndex.radius + arrayOfCircles[m].radius) {
        return true;
      }
    }
  }
  return false;
} //end of bump

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
} //end of checkOverlap
