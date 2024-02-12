//stroke - change to change stroke of each circle
const circleStroke = 40;

//scale will be set at each draw - to allow resizing
let circleScale = 0;

//radius offset is updated to generate movemnet
let radiusOffset = 0;

//colors are populated as it draws
let circleColors = [];
/**
 * draw all the circles in the inside
 * @param {Number} radius
 * @param {Number} piTheta
 */
function drawInnerCircles(radius, piTheta) {
  let nextRadius = radius + radiusOffset;
  let circleIndex = 0;
  // let circleIndex = circleIndexOffset;

  while (nextRadius > 0) {
    //choose color if needed
    if (circleColors.length >= circleIndex) {
      const newColor = generateRandomColor();
      circleColors.push(newColor);
    }

    //get html coordinates
    const htmlCoordinates = polarToHtml(nextRadius, piTheta);

    //adjust y axis
    htmlCoordinates.y = htmlCoordinates.y;

    //draw circle
    fill(circleColors[circleIndex]);
    circle(htmlCoordinates.x, htmlCoordinates.y, circleStroke);

    nextRadius -= circleStroke;
    circleIndex++;
  }

  if (nextRadius < 0) {
    //choose color if needed
    if (circleColors.length >= circleIndex) {
      const newColor = generateRandomColor();
      circleColors.push(newColor);
    }

    const htmlCentre = polarToHtml(0, 0);

    // draw
    circle(htmlCentre.x, htmlCentre.y, circleStroke + nextRadius);
  }

  //splice circle array to remove unwanted colors
  circleColors.splice(circleIndex, circleColors.length - circleIndex);
}

/**
 * draw many circles one inside the other and move them
 */
/*
function drawCircle() {
  circleScale = canvasSize;

  for (let theta = 0; theta < 360; theta = theta + 0.5) {
    //change theta to pi style
    const piTheta = degreesToRadians(theta);

    //get radius of this theta
    const radius = radiusForCircle();

    drawInnerCircles(radius, piTheta);
  }

  radiusOffset += 0.5;
}
*/


/**
 * Draw a circle of radius 100 and stroke 20
 */
function drawCircle() {

  const circleRadius = 100;

  //go through all the possible angles witn an increment of 0.5 and draw a point with the same radius
  for(let theta = 0; theta < 360; theta = theta + 0.5) {
    //transform the theta to radians
    const radiansTheta = degreesToRadians(theta);

    //get html coordinates for that point
    const htmlCoordinates = polarToHtml(circleRadius, radiansTheta);

    //draw a point in those coordinates
    circle(htmlCoordinates.x, htmlCoordinates.y, 20);
  }
}