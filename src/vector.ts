export class Vector {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    add(v: Vector): Vector {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    sub(v: Vector): Vector {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    mult(n: number): Vector {
        return new Vector(this.x * n, this.y * n);
    }

    div(n: number): Vector {
        return new Vector(this.x / n, this.y / n);
    }

    normalize(): Vector {
        const mag = this.mag();
        if (mag !== 0) {
            return this.div(mag);
        }
        return this;
    }

    limit(max: number): Vector {
        if (this.mag() > max) {
            return this.normalize().mult(max);
        }
        return this;
    }

    mag(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    static dist(v1: Vector, v2: Vector): number {
        return v1.sub(v2).mag();
    }
}
