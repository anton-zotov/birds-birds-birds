import { Vector } from "./vector";

export class Obstacle {
    center: Vector;
    radius: number;

    constructor(center: Vector, radius: number) {
        this.center = center;
        this.radius = radius;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();

        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();

        ctx.fillStyle = "red";
        ctx.fill();

        ctx.restore();
    }
}
