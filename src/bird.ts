import { Boid } from "./boid";

export class Bird {
    private boid: Boid;
    private wingSpan: number;

    constructor(boid: Boid, wingSpan = 10) {
        this.boid = boid;
        this.wingSpan = wingSpan;
    }

    draw(ctx: CanvasRenderingContext2D, frame: number): void {
        const angle = Math.atan2(this.boid.velocity.y, this.boid.velocity.x);
        const { x, y } = this.boid.position;
        const size = this.wingSpan + (Math.sin(frame / 10) * this.wingSpan) / 4;

        ctx.save();

        ctx.translate(x, y);
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.moveTo(size, 0);
        ctx.lineTo(-size / 2, size / 2);
        ctx.lineTo(-size / 2, -size / 2);
        ctx.closePath();

        ctx.fillStyle = "#EDF2F4";
        ctx.fill();

        ctx.restore();
    }

    printBoidForces(ctx: CanvasRenderingContext2D): void {
        ctx.save();

        ctx.font = "10px Arial";

        ctx.fillStyle = "black";
        ctx.fillText(
            `${this.boid.alignmentForce.x.toFixed(2)}, ${this.boid.alignmentForce.y.toFixed(2)}`,
            this.boid.position.x + 10,
            this.boid.position.y - 10
        );

        ctx.fillStyle = "red";
        ctx.fillText(
            `${this.boid.cohesionForce.x.toFixed(2)}, ${this.boid.cohesionForce.y.toFixed(2)}`,
            this.boid.position.x + 10,
            this.boid.position.y
        );

        ctx.fillStyle = "blue";
        ctx.fillText(
            `${this.boid.separationForce.x.toFixed(2)}, ${this.boid.separationForce.y.toFixed(2)}`,
            this.boid.position.x + 10,
            this.boid.position.y + 10
        );

        ctx.restore();
    }
}
