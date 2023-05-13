import { Vector } from "./vector";

export class Boid {
    public alignmentForce = new Vector(0, 0);
    public cohesionForce = new Vector(0, 0);
    public separationForce = new Vector(0, 0);

    private acceleration = new Vector(0, 0);
    private seekForceMultiplier = 1.5;
    private edgeAvoidanceDistance = 20;
    private edgeAvoidanceStrength = 1;

    constructor(
        public position: Vector,
        public velocity: Vector,
        private maxSpeed: number,
        private maxForce: number
    ) {}

    update(boids: Boid[], cursorPosition: Vector, screenWidth: number, screenHeight: number): void {
        this.applyFlockingBehaviors(boids);

        this.applyCursorForce(cursorPosition);
        this.applyEdgeAvoidanceForce(screenWidth, screenHeight);

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

    private applyFlockingBehaviors(boids: Boid[]): void {
        this.alignmentForce = this.calculateAlignmentForce(boids, 50);
        this.cohesionForce = this.calculateCohesionForce(boids, 50);
        this.separationForce = this.calculateSeparationForce(boids, 50);

        this.applySteerForce(this.separationForce);
        this.applySteerForce(this.alignmentForce);
        this.applySteerForce(this.cohesionForce);
    }

    private applyCursorForce(cursorPosition: Vector): void {
        const cursorForce = this.seek(cursorPosition).mult(this.seekForceMultiplier);
        this.applyForce(cursorForce);
    }

    private applyEdgeAvoidanceForce(screenWidth: number, screenHeight: number): void {
        const edgeAvoidanceForce = this.calculateEdgeAvoidanceForce(screenWidth, screenHeight);
        this.applyForce(edgeAvoidanceForce);
    }

    private getBoidsInRange(boids: Boid[], range: number): Boid[] {
        return boids.filter(
            (boid) =>
                Vector.dist(this.position, boid.position) > 0 &&
                Vector.dist(this.position, boid.position) < range
        );
    }

    private calculateSeparationForce(boids: Boid[], range: number): Vector {
        const diffVectors = this.getBoidsInRange(boids, range).map((boid) =>
            this.position
                .sub(boid.position)
                .normalize()
                .div(Vector.dist(this.position, boid.position))
        );

        return this.getAverageVector(diffVectors);
    }

    private calculateAlignmentForce(boids: Boid[], range: number): Vector {
        const velocityVectors = this.getBoidsInRange(boids, range).map((boid) => boid.velocity);

        return this.getAverageVector(velocityVectors);
    }

    private calculateCohesionForce(boids: Boid[], range: number): Vector {
        const positionVectors = this.getBoidsInRange(boids, range).map((boid) => boid.position);

        return this.getAverageVector(positionVectors);
    }

    private calculateEdgeAvoidanceForce(screenWidth: number, screenHeight: number): Vector {
        let avoidanceForce = new Vector(0, 0);

        const leftEdgeDistance = this.position.x;
        const rightEdgeDistance = screenWidth - this.position.x;
        const topEdgeDistance = this.position.y;
        const bottomEdgeDistance = screenHeight - this.position.y;

        if (leftEdgeDistance < this.edgeAvoidanceDistance) {
            avoidanceForce.x =
                ((this.edgeAvoidanceDistance - leftEdgeDistance) / this.edgeAvoidanceDistance) *
                this.edgeAvoidanceStrength;
        } else if (rightEdgeDistance < this.edgeAvoidanceDistance) {
            avoidanceForce.x = -(
                ((this.edgeAvoidanceDistance - rightEdgeDistance) / this.edgeAvoidanceDistance) *
                this.edgeAvoidanceStrength
            );
        }

        if (topEdgeDistance < this.edgeAvoidanceDistance) {
            avoidanceForce.y =
                ((this.edgeAvoidanceDistance - topEdgeDistance) / this.edgeAvoidanceDistance) *
                this.edgeAvoidanceStrength;
        } else if (bottomEdgeDistance < this.edgeAvoidanceDistance) {
            avoidanceForce.y = -(
                ((this.edgeAvoidanceDistance - bottomEdgeDistance) / this.edgeAvoidanceDistance) *
                this.edgeAvoidanceStrength
            );
        }

        return avoidanceForce;
    }

    private getAverageVector(vectors: Vector[]): Vector {
        const sum = vectors.reduce((sum, vector) => sum.add(vector), new Vector(0, 0));
        const count = vectors.length;
        return count > 0 ? sum.div(count) : new Vector(0, 0);
    }

    private applyForce(force: Vector): void {
        this.acceleration = this.acceleration.add(force);
    }

    private applySteerForce(force: Vector): void {
        if (force.mag() > 0) {
            const steerForce = force
                .normalize()
                .mult(this.maxSpeed)
                .sub(this.velocity)
                .limit(this.maxForce);
            this.applyForce(steerForce);
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
