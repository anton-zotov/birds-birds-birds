import { Boid } from "./boid";
import { Vector } from "./vector";

describe("Boid", () => {
    const maxSpeed = 5;
    const maxForce = 2;

    test("constructor sets initial values", () => {
        const initialPosition = new Vector(10, 10);
        const initialVelocity = new Vector(1, 1);
        const boid = new Boid(initialPosition, initialVelocity, maxSpeed, maxForce);

        expect(boid.position).toBe(initialPosition);
        expect(boid.velocity).toBe(initialVelocity);
    });

    test("isOutside returns true when position is outside given bounds", () => {
        const boid = new Boid(new Vector(-1, 10), new Vector(0, 0), maxSpeed, maxForce);
        expect(boid.isOutside(20, 20)).toBe(true);

        boid.position = new Vector(10, -1);
        expect(boid.isOutside(20, 20)).toBe(true);

        boid.position = new Vector(21, 10);
        expect(boid.isOutside(20, 20)).toBe(true);

        boid.position = new Vector(10, 21);
        expect(boid.isOutside(20, 20)).toBe(true);
    });

    test("isOutside returns false when position is within given bounds", () => {
        const boid = new Boid(new Vector(10, 10), new Vector(0, 0), maxSpeed, maxForce);
        expect(boid.isOutside(20, 20)).toBe(false);
    });

    test("update method updates the boid state", () => {
        const initialPosition = new Vector(10, 10);
        const initialVelocity = new Vector(1, 1);
        const boid = new Boid(initialPosition, initialVelocity, maxSpeed, maxForce);

        const previousPosition = boid.position;
        const previousVelocity = boid.velocity;

        boid.update([], new Vector(0, 0), [], 20, 20);

        expect(boid.position).not.toEqual(previousPosition);
        expect(boid.velocity).not.toEqual(previousVelocity);
    });
});
