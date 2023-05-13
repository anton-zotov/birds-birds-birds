import { Vector } from "./vector";

describe("Vector", () => {
    it("adds vectors", () => {
        const v1 = new Vector(1, 2);
        const v2 = new Vector(3, 4);
        const v3 = v1.add(v2);
        expect(v3).toEqual(new Vector(4, 6));
    });

    it("subtracts vectors", () => {
        const v1 = new Vector(3, 4);
        const v2 = new Vector(1, 2);
        const v3 = v1.sub(v2);
        expect(v3).toEqual(new Vector(2, 2));
    });

    it("multiplies vectors", () => {
        const v1 = new Vector(1, 2);
        const v2 = v1.mult(3);
        expect(v2).toEqual(new Vector(3, 6));
    });

    it("divides vectors", () => {
        const v1 = new Vector(3, 6);
        const v2 = v1.div(3);
        expect(v2).toEqual(new Vector(1, 2));
    });

    it("normalizes vectors", () => {
        const v1 = new Vector(3, 4);
        const v2 = v1.normalize();
        const mag = v2.mag();
        expect(mag).toBe(1);
    });

    it("limits vector magnitude", () => {
        const v1 = new Vector(3, 4);
        const v2 = v1.limit(2);
        expect(v2.mag()).toBe(2);
    });

    it("calculates vector magnitude", () => {
        const v1 = new Vector(3, 4);
        expect(v1.mag()).toBe(5);
    });

    it("calculates distance between vectors", () => {
        const v1 = new Vector(1, 2);
        const v2 = new Vector(4, 6);
        expect(Vector.dist(v1, v2)).toBe(5);
    });
});
