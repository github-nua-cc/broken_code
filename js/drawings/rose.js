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
  if(first) {
    first = false;
    return true;
  }

  //n has changed must draw
  if(n != newN) {
    n = newN;
    return true;
  }

  //d has changed must draw
  if(d != newD) {
    d = newD;
    return true;
  }

  //if color changes must redraw
  if(colorHasChanged) {
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
}

const nSliderElement = document.getElementById("rose-n-slider");
const nValueElement = document.getElementById("rose-n-value");
nSliderElement.value = n;
nValueElement.value = n;

nSliderElement.oninput = (event) => {
  newN = event.target.value * 0.01;
  nValueElement.value = (event.target.value * 0.01).toFixed(2);
};
nValueElement.onchange = (event) => {
  newN = event.target.value;
  nSliderElement.value = event.target.value * 100;
}

//walkerArray
let walkerCoordinatesArray = [];

function updateWalkerArray() {
  d = newD;

  walkerCoordinatesArray = [];

  for (let index = 0; index < 361; index++) {
    const angle = (index * d) % 360;
    const radius = 200 * sin(n * angle);
    const cartesianCoordinates = polarToCartesian(radius, angle);
    walkerCoordinatesArray.push({
      x: cartesianCoordinates.x,
      y: cartesianCoordinates.y,
    });
  }
}

function drawRose() {

  if(!mustDraw()) return;

  background(0);

  updateWalkerArray();

  //reset background and stroke
  noStroke();

  //draw rose
  for (let theta = 0; theta < 360; theta += 0.1) {
    const radius = 200 * sin(n * theta);

    const cartesianCoordinates = polarToCartesian(radius, theta);

    circle(cartesianCoordinates.x, cartesianCoordinates.y, 8);
  }

  //draw lines in white
  stroke(color(255, 255, 255));

  beginShape(LINES);
  for (point of walkerCoordinatesArray) {
    vertex(point.x, point.y);
  }
  endShape();
}
