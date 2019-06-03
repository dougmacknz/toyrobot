const toyRobot = require("./toyrobot");

// Put any commands in here and run `node playground.js` in your terminal to run
let testRobot = new toyRobot();
testRobot.place(2, 2, "N");
testRobot.move();
testRobot.move();
testRobot.left();
console.log(testRobot.report());
