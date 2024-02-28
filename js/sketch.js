//get current path
const path = window.location.pathname;
const currentPage = path.substring(path.lastIndexOf("/") + 1);

function setup() {
  //create canvas of wohle screen
  createCanvas(windowWidth, windowHeight - 60);

  // set up background to greyscale 220
  background(0);

  //remove stroke
  noFill();
  strokeWeight(10);

  //set angle mode to degrees
  angleMode(DEGREES);

  //set a random color to be the fill
  generateRandomColor();
}

function draw() {
  //translate to middle
  translate(width / 2, height / 2);

  // switch according to page and draw each figure
  switch (currentPage) {
    case "circle.html": {
      drawCircle();
      break;
    }
    case "spiral.html": {
      drawSpiral();
      break;
    }
    case "heart.html": {
      drawHeart();
      break;
    }
    case "rose.html": {
      drawRose();
      break;
    }
  }
}
