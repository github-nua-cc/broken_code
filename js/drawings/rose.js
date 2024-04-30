// The rose has n petals if n is odd, and 2n petals if n is even.
let n = 4;
let newN = n;

// d is a positive integer and the angles are in degrees - degree at which 'the walker turns'
let d = 29;
let newD = d;

//store if first iteration
let first = true;

function mustDraw() {
  //first iteration must draw
  if (first) {
    first = false;
    return true;
  }

  //n has changed must draw
  if (n != newN) {
    return true;
  }

  //d has changed must draw
  if (d != newD) {
    return true;
  }

  //if color changes must redraw
  if (colorHasChanged) {
    return true;
  }

  return false;
}

const dSliderElement = document.getElementById("rose-d-slider");
const dValueElement = document.getElementById("rose-d-value");
dSliderElement.value = d;
dValueElement.value = d;

dSliderElement.oninput = (event) => {
  newD = event.target.value * 0.01;
  dValueElement.value = (event.target.value * 0.01).toFixed(2);
};
dValueElement.onchange = (event) => {
  newD = event.target.value;
  dSliderElement.value = event.target.value * 100;
};

const nSliderElement = document.getElementById("rose-n-slider");
const nValueElement = document.getElementById("rose-n-value");
nSliderElement.value = n;
nValueElement.value = n;

//walkerArray
let walkerCoordinatesArray = [];

function updateWalkerArray() {
  d = newD;
  n = newN;

  walkerCoordinatesArray = [];

  for (let index = 0; index < 361; index++) {
    const k = index * d;
    const radius = 300 * sin(n * k);
    const cartesianCoordinates = polarToCartesian(radius, k);
    walkerCoordinatesArray.push({
      x: cartesianCoordinates.x,
      y: cartesianCoordinates.y,
    });
  }
}

function drawRose() {
  if (!mustDraw()) return;

  background(0);

  updateWalkerArray();

  //reset background and stroke
  stroke(randomColor);

  //draw rose
  beginShape();
  for (let theta = 0; theta < 360; theta += 0.07) {
    const radius = 300 * sin(n * theta);

    const cartesianCoordinates = polarToCartesian(radius, theta);

    vertex(cartesianCoordinates.x, cartesianCoordinates.y);
  }
  endShape();

  //draw lines in white
  push();
  stroke(color(200, 200, 200, 200));
  strokeWeight(2);

  beginShape();
  for (point of walkerCoordinatesArray) {
    vertex(point.x, point.y);
  }
  endShape();
  pop();
}
