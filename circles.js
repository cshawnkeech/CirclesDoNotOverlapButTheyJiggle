//Circle class

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
    ellipse(this.x, this.y, 2 * this.radius,2 * this.radius);
  }
}
