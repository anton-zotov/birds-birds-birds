import { Vector } from "./vector";

export class Boid {
    position: Vector;
    velocity: Vector;
    private acceleration: Vector;
    private maxSpeed: number;
    private maxForce: number;
    private seekForceMultiplier = 1.5;

    constructor(position: Vector, velocity: Vector, maxSpeed: number, maxForce: number) {
        this.position = position;
        this.velocity = velocity;
        this.acceleration = new Vector(0, 0);
        this.maxSpeed = maxSpeed;
        this.maxForce = maxForce;
    }

    update(boids: Boid[], cursorPosition: Vector): void {
        this.applyBehaviors(boids);

        const cursorForce = this.seek(cursorPosition).mult(this.seekForceMultiplier);
        this.applyForce(cursorForce);

        this.updateVelocity();
        this.updatePosition();
        this.resetAcceleration();
    }

    isOutside(width: number, height: number): boolean {
        return (
            this.position.x < 0 ||
            this.position.y < 0 ||
            this.position.x > width ||
            this.position.y > height
        );
    }

    private seek(target: Vector): Vector {
        const desired = target.sub(this.position).normalize().mult(this.maxSpeed);
        const steer = desired.sub(this.velocity).limit(this.maxForce);
        return steer;
    }

    private applyBehaviors(boids: Boid[]): void {
        const separate = this.separate(boids, 50);
        const align = this.align(boids, 50);
        const cohesion = this.cohesion(boids, 50);

        this.applySteerForce(separate);
        this.applySteerForce(align);
        this.applySteerForce(cohesion);
    }

    private separate(boids: Boid[], range: number): Vector {
        const diffVectors = boids
            .filter(
                (boid) =>
                    Vector.dist(this.position, boid.position) > 0 &&
                    Vector.dist(this.position, boid.position) < range
            )
            .map((boid) =>
                this.position
                    .sub(boid.position)
                    .normalize()
                    .div(Vector.dist(this.position, boid.position))
            );

        return this.getAverageVector(diffVectors);
    }

    private align(boids: Boid[], range: number): Vector {
        const velocityVectors = boids
            .filter(
                (boid) =>
                    Vector.dist(this.position, boid.position) > 0 &&
                    Vector.dist(this.position, boid.position) < range
            )
            .map((boid) => boid.velocity);

        return this.getAverageVector(velocityVectors);
    }

    private cohesion(boids: Boid[], range: number): Vector {
        const positionVectors = boids
            .filter(
                (boid) =>
                    Vector.dist(this.position, boid.position) > 0 &&
                    Vector.dist(this.position, boid.position) < range
            )
            .map((boid) => boid.position);

        return this.getAverageVector(positionVectors);
    }

    private getAverageVector(vectors: Vector[]): Vector {
        const sum = vectors.reduce((sum, vector) => sum.add(vector), new Vector(0, 0));
        const count = vectors.length;
        return count > 0 ? sum.div(count) : new Vector(0, 0);
    }

    private applyForce(force: Vector): void {
        this.acceleration = this.acceleration.add(force);
    }

    private applySteerForce(vector: Vector): void {
        if (vector.mag() > 0) {
            const steer = vector
                .normalize()
                .mult(this.maxSpeed)
                .sub(this.velocity)
                .limit(this.maxForce);
            this.applyForce(steer);
        }
    }

    private updateVelocity(): void {
        this.velocity = this.velocity.add(this.acceleration).limit(this.maxSpeed);
    }

    private updatePosition(): void {
        this.position = this.position.add(this.velocity);
    }

    private resetAcceleration(): void {
        this.acceleration = new Vector(0, 0);
    }
}
