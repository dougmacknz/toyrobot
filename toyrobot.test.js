const toyRobot = require("./toyrobot");

test("non-place commands are ignored before placement", () => {
  let testRobot = new toyRobot();
  expect(testRobot.move()).toBe(undefined);
  expect(testRobot.left()).toBe(undefined);
  expect(testRobot.right()).toBe(undefined);
  expect(testRobot.report()).toBe(undefined);
});

test("reports correctly after being placed", () => {
  let testRobot = new toyRobot();
  testRobot.place(2, 2, "S");
  expect(testRobot.report()).toEqual({ x: 2, y: 2, f: "S" });
});

test("changes direction to the left correctly", () => {
  let testRobot = new toyRobot();
  testRobot.place(2, 2, "N");
  testRobot.left();
  expect(testRobot.report()).toEqual({ x: 2, y: 2, f: "W" });
});

test("changes direction to the right correctly", () => {
  let testRobot = new toyRobot();
  testRobot.place(2, 2, "W");
  testRobot.right();
  expect(testRobot.report()).toEqual({ x: 2, y: 2, f: "N" });
});

test("moves correctly", () => {
  let testRobot = new toyRobot();
  testRobot.place(2, 2, "W");
  testRobot.move();
  expect(testRobot.report()).toEqual({ x: 1, y: 2, f: "W" });
});

test("does not fall off the edge", () => {
  let testRobot = new toyRobot();
  testRobot.place(0, 0, "S");
  testRobot.move();
  expect(testRobot.report()).toEqual({ x: 0, y: 0, f: "S" });
});

// Random test cases
test("robot can move around a few times", () => {
  let testRobot = new toyRobot();
  testRobot.place(2, 2, "N");
  testRobot.move();
  testRobot.move();
  testRobot.move();
  testRobot.left();
  testRobot.move();
  expect(testRobot.report()).toEqual({ x: 1, y: 4, f: "W" });
});

test("robot can turn around and go back the other way", () => {
  let testRobot = new toyRobot();
  testRobot.place(0, 4, "E");
  testRobot.move();
  testRobot.move();
  testRobot.right();
  testRobot.right();
  testRobot.move();
  testRobot.move();
  expect(testRobot.report()).toEqual({ x: 0, y: 4, f: "W" });
});

test("robot can do a 360 and move forward", () => {
  let testRobot = new toyRobot();
  testRobot.place(0, 0, "N");
  testRobot.left();
  testRobot.left();
  testRobot.left();
  testRobot.left();
  testRobot.move();
  expect(testRobot.report()).toEqual({ x: 0, y: 1, f: "N" });
});
