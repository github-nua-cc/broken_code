const spiralRotationValue = document.getElementById("spiral-rotation-value");
const toggleNoise = document.getElementById("toggle-noise-button");
const scrollingMessage = document.getElementById("hint-container");

let spiralOffset = 0;
let withNoise = false;
let deltaIncrement = 0;
let mouseDown = false;
let scrolled = false;
let messageDisplayed = false;

setTimeout(() => {
  if (!scrolled) {
    scrollingMessage.classList.add("appear");
    messageDisplayed = true;
  }
}, 5000);

/**
 * draw one spiral. This is the one that we will use in class.
 */
function drawSpiral() {
  //reset background
  background(0, 30);

  //go through all the possible angles with a changing increment and draw a point with changing radius
  // let increment = 5;
  beginShape();
  for (let theta = 0; theta < 10 * 360; theta = theta + 0.1) {
    //calclulate a new radius bigger than the one before
    const radius = 0.4 * theta;

    // calculate noise if needed
    let currentNoise = 0;
    if (withNoise) {
      currentNoise = 30 * noise(radius);
    }

    const noisedRadius = radius + currentNoise;

    //get html coordinates
    const cartesianCoordinates = polarToCartesian(
      noisedRadius,
      theta + spiralOffset
    );

    //draw a point at these coordinates
    vertex(cartesianCoordinates.x, cartesianCoordinates.y);

    // if (theta % 360 === 0) {
    //   // update increment
    //   increment = increment * 0.2;
    // }
  }
  endShape();

  // update offset and delta increment if necessary
  const increaseBy = 0.1;
  if (deltaIncrement > 0) deltaIncrement -= increaseBy;
  if (deltaIncrement < 0) deltaIncrement += increaseBy;
  if (abs(deltaIncrement) <= increaseBy) deltaIncrement = 0;
  spiralOffset = spiralOffset + deltaIncrement;

  //update html info
  spiralRotationValue.innerHTML = floor(spiralOffset) % 360;
}

/**
 * add whatever delta offset is detected by the mouseWheel event
 * - delta is a keyword commonly used in mathematics to define an increase or decrease in value
 * - it can be a positive or negaative number
 * The function is also set to block the scrolling of the page
 * @param {WheelEvent} event
 * @returns
 */
function mouseWheel(event) {
  //remove scrolling message
  scrolled = true;
  if (messageDisplayed) scrollingMessage.classList.add("disappear");

  // add the value stored in event.delta to the offset
  spiralOffset = spiralOffset + event.delta / 10;

  //generate a delta increment
  if (abs(event.delta / 10) > abs(deltaIncrement))
    deltaIncrement = event.delta / 10;

  //return false will block page scrolling
  return false;
}

//on click, add or remove noise
toggleNoise.onclick = () => {
  withNoise = !withNoise;

  if (withNoise) {
    toggleNoise.innerHTML = "Remove Noise";
  } else {
    toggleNoise.innerHTML = "Add Noise";
  }
};
