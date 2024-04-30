let heartOffset = 0;
const heartOffsetValue = document.getElementById("heart-offset-value");

/**
 * Get r for the given theta
 * @param {Number} theta
 * @returns
 */
function radiusForHeart(theta) {
  const radius =
    2 -
    2 * sin(theta) +
    (sin(theta) * Math.sqrt(Math.abs(cos(theta)))) / (sin(theta) + 1.4);
  return radius;
}

/**
 * draw one heart
 */
function drawHeart() {
  fill(randomColor);
  noStroke();
  //additional translation to place heart a bit higner
  translate(0, -height / 5 - heartOffset);

  //background 0, 3
  background(0);

  //define heart constants
  const maximumHeartScale = 100;


  beginShape();

  //loop - only one circle
  for (let theta = 0; theta < 360; theta = theta + 0.1) {
    //get radius of this theta
    const radius = heartOffset * radiusForHeart(theta);

    //get cartesian coordinates
    const cartesianCoordinates = polarToCartesian(radius, theta);

    //draw a point at these coordinates
    vertex(cartesianCoordinates.x, cartesianCoordinates.y);
  }

  endShape();

  //update heart scale
  heartOffset = heartOffset + 0.5;
  //check heart scale has not gone beyond maximum
  if (heartOffset > maximumHeartsScale) {
    heartOffset = 0;
    background(0);
  }

  //change inner html value
  heartOffsetValue.innerHTML = floor(heartOffset);
}
