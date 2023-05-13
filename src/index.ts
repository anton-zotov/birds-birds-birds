import "./styles.css";
import { Bird } from "./bird";
import { Boid } from "./boid";
import { Vector } from "./vector";
import { Canvas } from "./canvas";
import { getCursorPosition, onBirdCountChange } from "./ui";

const canvas = new Canvas("canvas");

function generateRandomBoid(): Boid {
    const MAX_SPEED = 2;
    const MAX_FORCE = 0.05;
    const position = new Vector(
        Math.random() * canvas.element.width,
        Math.random() * canvas.element.height
    );
    const velocity = new Vector(Math.random() - 0.5, Math.random() - 0.5);

    return new Boid(position, velocity, MAX_SPEED, MAX_FORCE);
}

function generateBirds(amount: number): void {
    boids = Array.from({ length: amount }, generateRandomBoid);
    birds = boids.map((boid) => new Bird(boid));
}

let boids: Boid[];
let birds: Bird[];

function runSimulation(frameCount = 0) {
    canvas.clear();
    boids.forEach((boid, i) => {
        boid.update(boids, getCursorPosition());
        if (boid.isOutside(canvas.element.width, canvas.element.height)) {
            boids[i] = generateRandomBoid();
            birds[i] = new Bird(boids[i]);
        }
        birds[i].draw(canvas.context, frameCount);
    });

    requestAnimationFrame(() => runSimulation(frameCount + 1));
}

onBirdCountChange((birdCount) => {
    generateBirds(birdCount);
});
generateBirds(300);
runSimulation();
