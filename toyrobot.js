let toyRobot = function() {
  this.position = {};
};

/**
 * Place the robot in a position on the table
 *
 * @param {number} x
 * @param {number} y
 * @param {string} f
 * @return {object} Position object
 */
toyRobot.prototype.place = function(x, y, f) {
  this.position = {
    x: x,
    y: y,
    f: f
  };
};

/**
 * Moves the robot left 90 degrees
 */
toyRobot.prototype.left = function() {
  // First check that robot has been placed
  if (!toyRobot.hasBeenPlaced.call(this)) {
    return;
  }

  this.position.f = toyRobot.changeDirection.call(this, "left");
};

/**
 * Moves the robot right 90 degrees
 */
toyRobot.prototype.right = function() {
  // First check that robot has been placed
  if (!toyRobot.hasBeenPlaced.call(this)) {
    return;
  }

  this.position.f = toyRobot.changeDirection.call(this, "right");
};

/**
 * Reports the robots current position and way it's facing
 *
 * @return {object} Position object
 */
toyRobot.prototype.report = function() {
  // First check that robot has been placed
  if (!toyRobot.hasBeenPlaced.call(this)) {
    return;
  }

  return this.position;
};

/**
 * Moves the robot one position based on where it is facing.
 */
toyRobot.prototype.move = function() {
  // First check that robot has been placed
  if (!toyRobot.hasBeenPlaced.call(this)) {
    return;
  }

  // Check that the robot can move without falling off
  if (!toyRobot.canMove.call(this)) {
    return;
  }

  if (this.position.f === "W") {
    this.position.x -= 1;
  } else if (this.position.f === "N") {
    this.position.y += 1;
  } else if (this.position.f === "E") {
    this.position.x += 1;
  } else if (this.position.f === "S") {
    this.position.y -= 1;
  }
};

// Possible ways the robot can face
toyRobot.directions = ["N", "E", "S", "W"];

/**
 * Checks if the robot has been placed on the table yet
 *
 * @return {boolean}
 */
toyRobot.hasBeenPlaced = function() {
  return Object.keys(this.position).length !== 0;
};

/**
 * Changes the direction that the robot is facing, used for the 'left' and 'right' methods
 *
 * @param {'left'|'right'} direction
 */
toyRobot.changeDirection = function(direction) {
  // Get the index of the current direction in the directions array
  const currentDirection = toyRobot.directions.indexOf(this.position.f);

  let finalValue;
  let otherValue;
  if (direction === "left") {
    finalValue = 0;
    otherValue = 3;
  } else {
    finalValue = 3;
    otherValue = 0;
  }

  // Set the new direction to the one to the left (or the last one if it's on the first position)
  const newDirection =
    currentDirection === finalValue
      ? toyRobot.directions[otherValue]
      : toyRobot.directions[currentDirection - 1];

  return newDirection;
};

/**
 * Checks that the robot can move without falling based on its current position and direction
 */
toyRobot.canMove = function() {
  if (this.position.f === "N" && this.position.y === 4) {
    return false;
  } else if (this.position.f === "S" && this.position.y === 0) {
    return false;
  } else if (this.position.f === "W" && this.position.x === 0) {
    return false;
  } else if (this.position.f === "E" && this.position.x === 4) {
    return false;
  }

  return true;
};

module.exports = toyRobot;
