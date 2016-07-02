var Circle;
var arrayOfCircles = [];
var totalCircles = 100;

function setup() {
  createElement('h1', "Circles bubble upwards without overlapping");
  createCanvas(600, 400);

  var circleButton = createButton("New Circle");
  circleButton.mouseClicked(newCircle);
  circleButton.addClass('controls');

  var removeCircleButton = createButton("Remove Small Circles");
  removeCircleButton.mouseClicked(removeCircle);
  removeCircleButton.addClass('controls');

  var resetButton = createButton("Reset");
  resetButton.mouseClicked(reset);
  resetButton.addClass('controls');

  reset();
} //end of setup

function draw() {
  background(255);

  for (var k = 0; k < arrayOfCircles.length; k++) {
    bumble(arrayOfCircles[k]);
    arrayOfCircles[k].display();
  }
} //end of draw
