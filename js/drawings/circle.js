/**
 * Draw a circle using the polar coordinates of radius 200 and stroke 20
 */
function drawCircle() {
  // define radius
  const circleRadius = 200;

  beginShape();

  //go through all the possible angles with an increment of 0.5 and draw a point with the same radius
  for (let theta = 0; theta < 360; theta = theta + 0.5) {
    //get html coordinates for that point
    const cartesianCoordinates = polarToCartesian(circleRadius, theta);

    //draw a point in those coordinates
    vertex(cartesianCoordinates.x, cartesianCoordinates.y);
  }

  endShape();
}
