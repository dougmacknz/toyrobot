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
  if (!toyRobot.hasBeenPlaced(this.position)) {
    return;
  }

  this.position.f = toyRobot.changeDirection(this.position, "left");
};

/**
 * Moves the robot right 90 degrees
 */
toyRobot.prototype.right = function() {
  // First check that robot has been placed
  if (!toyRobot.hasBeenPlaced(this.position)) {
    return;
  }

  this.position.f = toyRobot.changeDirection(this.position, "right");
};

/**
 * Reports the robots current position and way it's facing
 *
 * @return {object} Position object
 */
toyRobot.prototype.report = function() {
  // First check that robot has been placed
  if (!toyRobot.hasBeenPlaced(this.position)) {
    return;
  }

  return this.position;
};

/**
 * Moves the robot one position based on where it is facing.
 */
toyRobot.prototype.move = function() {
  // First check that robot has been placed
  if (!toyRobot.hasBeenPlaced(this.position)) {
    return;
  }

  // Check that the robot can move without falling off
  if (!toyRobot.canMove(this.position)) {
    return;
  }

  // And use the pure function to retrieve a new position for the robot based on the current position
  this.position = toyRobot.moveOneSpot(this.position);
};

/**
 * Pure function to move the robot's position
 *
 * @param {object} currentPosition
 * @returns {object}
 */
toyRobot.moveOneSpot = function(currentPosition) {
  let newPosition = Object.assign({}, currentPosition);

  if (currentPosition.f === "W") {
    newPosition.x -= 1;
  } else if (currentPosition.f === "N") {
    newPosition.y += 1;
  } else if (currentPosition.f === "E") {
    newPosition.x += 1;
  } else if (currentPosition.f === "S") {
    newPosition.y -= 1;
  }

  return newPosition;
};

// Possible ways the robot can face
toyRobot.directions = ["N", "E", "S", "W"];

/**
 * Checks if the robot has been placed on the table yet
 *
 * @param {object} position
 * @return {boolean}
 */
toyRobot.hasBeenPlaced = function(position) {
  return Object.keys(position).length !== 0;
};

/**
 * Pure function that returns a new position with a change of direction
 * Used for the 'left' and 'right' methods
 *
 * @param {object} currentPosition
 * @param {'left'|'right'} direction
 * @returns {object}
 */
toyRobot.changeDirection = function(currentPosition, direction) {
  // Get the index of the current direction in the directions array
  const currentDirection = toyRobot.directions.indexOf(currentPosition.f);

  let finalValue;
  let otherValue;
  if (direction === "left") {
    finalValue = 0;
    otherValue = 3;
    newIndex = currentDirection - 1;
  } else {
    finalValue = 3;
    otherValue = 0;
    newIndex = currentDirection + 1;
  }

  // Set the new direction to the one to the left (or the last one if it's on the first position)
  const newDirection =
    currentDirection === finalValue
      ? toyRobot.directions[otherValue]
      : toyRobot.directions[newIndex];

  return newDirection;
};

/**
 * Checks that the robot can move without falling based on its current position and direction
 *
 * @param {object} position
 * @returns {boolean}
 */
toyRobot.canMove = function(position) {
  if (position.f === "N" && position.y === 4) {
    return false;
  } else if (position.f === "S" && position.y === 0) {
    return false;
  } else if (position.f === "W" && position.x === 0) {
    return false;
  } else if (position.f === "E" && position.x === 4) {
    return false;
  }

  return true;
};

module.exports = toyRobot;
