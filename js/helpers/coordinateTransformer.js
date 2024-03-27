/**
 * Given a radius and an angle theta, transform this to cartesian cooridnates
 * @param {Number} radius in pixels
 * @param {Number} theta in degrees
 * @returns
 */
function polarToCartesian(radius, theta) {
  //get x and y for cartesian
  const cartesianX = radius * cos(theta);
  const cartesianY = radius * sin(theta);
  //build object from coordinates
  const cartesianCoordinates = { x: cartesianX, y: cartesianY };
  return cartesianCoordinates;
}
