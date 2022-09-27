const assert = require('assert');

class Vector {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    reversed() {
        return new Vector(this.x * -1, this.y * -1);
    }
}

class Point {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const DIRECTIONS = [
    {direction: "N", vector: new Vector(0, -1)},
    {direction: "E", vector: new Vector(1, 0)},
    {direction: "S", vector: new Vector(0, 1)},
    {direction: "W", vector: new Vector(-1, 0)}
];

class Rover {
    direction;
    location;

    constructor(point, direction) {
        this.direction = direction;
        this.location = point;
    }

    getMoveVector(_direction = this.direction) {
        return DIRECTIONS.find(({direction}) => direction === _direction).vector;
    }

    move(vector) {
        this.location = new Point(this.location.x + vector.x, this.location.y + vector.y);
    }

    moveForward() {
        this.move(this.getMoveVector());
    }

    moveBackwards() {
        this.move(this.getMoveVector().reversed());
    }

    turn(direction) {
        const deltaIndex = direction === "R" ? 1 : -1;
        const currentDirectionIndex = DIRECTIONS.findIndex(({direction}) => direction === this.direction);
        const newDirectionIndex = ((currentDirectionIndex + deltaIndex) + DIRECTIONS.length) % DIRECTIONS.length;
        this.direction = DIRECTIONS[newDirectionIndex].direction;
    }

    turnRight() {
        this.turn("R");
    }

    turnLeft() {
        this.turn("L")
    }

    execute(command) {
        switch (command) {
            case "F":
                this.moveForward();
                break;
            case "B":
                this.moveBackwards();
                break;
            case "R":
                this.turnRight();
                break;
            case "L":
                this.turnLeft();
                break;
        }
    }

    executeSequence(sequence) {
        for (const command of sequence) {
            this.execute(command)
        }
    }
}


describe('Rover', () => {
    describe('when initialized', () => {
        it('should face the given direction', () => {
            const startingPoint = new Point(0, 0);
            const rover = new Rover(startingPoint, "N");
            assert.deepEqual(rover.direction, "N")
        })

        it('should start at given position', () => {
            const startingPoint = new Point(1, 1);
            const rover = new Rover(startingPoint, "N");
            assert.deepEqual(rover.location, startingPoint);
        })
    })

    describe("when facing south", () => {
        describe("when command to move forwards", () => {
            it("should move one point towards its direction", () => {
                const rover = new Rover(new Point(1, 1), "S");
                rover.moveForward();
                assert.deepEqual(rover.location, new Point(1, 2))
            })
        })

        describe("when command to move forwards twice", () => {
            it("should move two points towards its direction", () => {
                const rover = new Rover(new Point(1, 1), "S");
                rover.moveForward();
                rover.moveForward();
                assert.deepEqual(rover.location, new Point(1, 3))
            })
        })

        describe("when command to move backwards", () => {
            it("should move one point back from its direction", () => {
                const rover = new Rover(new Point(1, 2), "S");
                rover.moveBackwards();
                assert.deepEqual(rover.location, new Point(1, 1))
            })
        })

        describe("when commanded to turn to the right", () => {
            it("should face west", () => {
                const rover = new Rover(new Point(0, 0), "S");
                rover.turnRight();
                assert.deepEqual(rover.direction, "W");
            })
        })

        describe("when commanded to turn to the left", () => {
            it("should face east", () => {
                const rover = new Rover(new Point(0, 0), "S");
                rover.turnLeft();
                assert.deepEqual(rover.direction, "E");
            })
        })
    })

    describe("when facing east", () => {
        describe("when commanded to move forwards", () => {
            it('should move one position towards its direction', () => {
                const rover = new Rover(new Point(1, 1), "E");
                rover.moveForward();
                assert.deepEqual(rover.location, new Point(2, 1))
            });
        })

        describe("when command to move backwards", () => {
            it("should move one point back from its direction", () => {
                const rover = new Rover(new Point(2, 1), "E");
                rover.moveBackwards();
                assert.deepEqual(rover.location, new Point(1, 1))
            })
        })

        describe("when commanded to turn to the right", () => {
            it("should face south", () => {
                const rover = new Rover(new Point(0, 0), "E");
                rover.turnRight();
                assert.deepEqual(rover.direction, "S");
            })
        })

        describe('when commanded to turn to the left', () => {
            it("should face north", () => {
                const rover = new Rover(new Point(0, 0), "E");
                rover.turnLeft();
                assert.deepEqual(rover.direction, "N");
            })
        })
    });

    describe("when facing west", () => {
        describe("when commanded to move forwards", () => {
            it('should move one position towards its direction', () => {
                const rover = new Rover(new Point(2, 1), "W");
                rover.moveForward();
                assert.deepEqual(rover.location, new Point(1, 1))
            })
        })

        describe("when command to move backwards", () => {
            it("should move one point back from its direction", () => {
                const rover = new Rover(new Point(1, 1), "W");
                rover.moveBackwards();
                assert.deepEqual(rover.location, new Point(2, 1))
            })
        })

        describe("when commanded to turn to the right", () => {
            it("should face south", () => {
                const rover = new Rover(new Point(0, 0), "W");
                rover.turnRight();
                assert.deepEqual(rover.direction, "N");
            })
        })

        describe('when commanded to turn to the left', () => {
            it("should face north", () => {
                const rover = new Rover(new Point(0, 0), "W");
                rover.turnLeft();
                assert.deepEqual(rover.direction, "S");
            })
        })
    });

    describe("when facing north", () => {
        describe("when commanded to move forwards", () => {
            it("should move one position towards its direction", () => {
                const rover = new Rover(new Point(1, 2), "N");
                rover.moveForward();
                assert.deepEqual(rover.location, new Point(1, 1));
            })
        })

        describe("when command to move backwards", () => {
            it("should move one point back from its direction", () => {
                const rover = new Rover(new Point(1, 1), "N");
                rover.moveBackwards();
                assert.deepEqual(rover.location, new Point(1, 2))
            })
        })

        describe("when commanded to turn to the right", () => {
            it("should face south", () => {
                const rover = new Rover(new Point(0, 0), "N");
                rover.turnRight();
                assert.deepEqual(rover.direction, "E");
            })
        })

        describe('when commanded to turn to the left', () => {
            it("should face north", () => {
                const rover = new Rover(new Point(0, 0), "N");
                rover.turnLeft();
                assert.deepEqual(rover.direction, "W");
            })
        })
    })

    describe("when given a F command", () => {
        it("should move one square forward", () => {
            const rover = new Rover(new Point(1, 1), "S");
            rover.execute("F");
            assert.deepEqual(rover.location, new Point(1, 2));
        })
    })

    describe("when given a B command", () => {
        it("should move one square backwards", () => {
            const rover = new Rover(new Point(1, 2), "S");
            rover.execute("B");
            assert.deepEqual(rover.location, new Point(1, 1));
        })
    })

    describe("when given a R command", () => {
        it("should turn to the right", () => {
            const rover = new Rover(new Point(1, 1), "S");
            rover.execute("R");
            assert.deepEqual(rover.direction, "W");
        })
    })

    describe("when given a L command", () => {
        it("should turn to the left", () => {
            const rover = new Rover(new Point(1, 1), "S");
            rover.execute("L");
            assert.deepEqual(rover.direction, "E");
        })
    })

    describe("when given a string of commands", () => {
        it("should execute all commands", () => {
            const rover = new Rover(new Point(4, 3), "S");
            rover.executeSequence("BRBFFFF");
            assert.deepEqual(rover.location, new Point(1, 2))
        })
    })
})