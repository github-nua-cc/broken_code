let randomColor;
//store if color has recently changed
let colorHasChanged = false;
const newColorButton = document.getElementById("new-color-button");

if (newColorButton)
  newColorButton.onclick = () => {
    generateRandomColor();
  };

/**
 * Generate a random color with given alpha
 * @param {Number} alpha from 0 to 255
 * @returns
 */
function generateRandomColor(alpha = 255) {
  //generate random rgbs
  const r = random(255);
  const g = random(255);
  const b = random(255);

  //get new color
  const newColor = color(r, g, b, alpha);

  //return new color
  randomColor = newColor;

  stroke(randomColor);

  colorHasChanged = true;
}

/**
 * Draw a point using a randomly generated color given the polar coordinates
 * @param {Number} radius in pixels
 * @param {Number} theta in degrees
 */
function drawPointWithRandomColorAndPolarCoordinates(radius, theta) {
  //generate and set fill to a new random color
  generateRandomColor();
  fill(randomColor);

  //get html coordinates
  const cartesianCoordinates = polarToCartesian(radius, theta);

  //draw the point
  circle(cartesianCoordinates.x, cartesianCoordinates.y, 50);
}
