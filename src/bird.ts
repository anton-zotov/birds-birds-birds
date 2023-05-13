import { Boid } from "./boid";

export class Bird {
    private boid: Boid;
    private wingSpan: number;
    private greenValue = 255;

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

        const color = `rgb(0, ${this.greenValue}, 0)`;
        ctx.fillStyle = color;
        this.greenValue = Math.max(this.greenValue - 2, 0);
        ctx.fill();

        ctx.restore();
    }
}
