const toyRobot = require("./toyrobot");

test("hasBeenPlaced returns false before placement", () => {
  let testRobot = new toyRobot();
  expect(testRobot.hasBeenPlaced()).toBe(false);
});

test("non-place commands are ignored before placement", () => {
  let testRobot = new toyRobot();
  expect(testRobot.move()).toBe(undefined);
  expect(testRobot.left()).toBe(undefined);
  expect(testRobot.right()).toBe(undefined);
  expect(testRobot.report()).toBe(undefined);
});

test("hasBeenPlaced returns true after placement", () => {
  let testRobot = new toyRobot();
  testRobot.place(0, 0, "N");
  expect(testRobot.hasBeenPlaced()).toBe(true);
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
