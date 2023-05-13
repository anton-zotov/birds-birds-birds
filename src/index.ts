import "./styles.css";
import { Bird } from "./bird";
import { Boid } from "./boid";
import { Vector } from "./vector";
import { Canvas } from "./canvas";

const canvas = new Canvas("canvas");

let cursorPosition = new Vector(0, 0);

function updateCursorPosition(event: MouseEvent | TouchEvent) {
    if (event instanceof TouchEvent) {
        cursorPosition = new Vector(event.touches[0].clientX, event.touches[0].clientY);
    } else if (event instanceof MouseEvent) {
        cursorPosition = new Vector(event.clientX, event.clientY);
    }
}

window.addEventListener("mousemove", updateCursorPosition);
window.addEventListener("touchmove", updateCursorPosition);

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

let boids: Boid[] = Array.from({ length: 100 }, generateRandomBoid);
let birds: Bird[] = boids.map((boid) => new Bird(boid, 10));

let frameCount = 0;
function runSimulation() {
    canvas.clear();
    boids.forEach((boid, i) => {
        boid.update(boids, cursorPosition);
        if (boid.isOutside(canvas.element.width, canvas.element.height)) {
            boids[i] = generateRandomBoid();
            birds[i] = new Bird(boids[i], 10);
        }
        birds[i].draw(canvas.context, frameCount);
    });

    frameCount++;
    requestAnimationFrame(runSimulation);
}

runSimulation();
