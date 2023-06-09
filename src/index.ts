import "./styles.css";
import { Bird } from "./bird";
import { Boid } from "./boid";
import { Vector } from "./vector";
import { Canvas } from "./canvas";
import { getCursorPosition, onBirdCountChange, onObstacleCountChange } from "./ui";
import { Obstacle } from "./obstacle";

const canvas = new Canvas("canvas");

function generateRandomBoid(): Boid {
    const MAX_SPEED = 4;
    const MAX_FORCE = 0.05;
    const position = new Vector(Math.random() * canvas.width, Math.random() * canvas.height);
    const velocity = new Vector(Math.random() - 0.5, Math.random() - 0.5);

    return new Boid(position, velocity, MAX_SPEED, MAX_FORCE);
}

function generateBirds(amount: number): void {
    boids = Array.from({ length: amount }, generateRandomBoid);
    birds = boids.map((boid) => new Bird(boid));
}

let boids: Boid[];
let birds: Bird[];
let obstacles: Obstacle[];

function generateRandomObstacle(): Obstacle {
    const radius = Math.random() * 50;
    const position = new Vector(Math.random() * canvas.width, Math.random() * canvas.height);

    return new Obstacle(position, radius);
}

function generateObstacles(amount: number): void {
    obstacles = Array.from({ length: amount }, generateRandomObstacle);
}

function runSimulation(frameCount = 0) {
    canvas.clear();

    canvas.context.fillStyle = "#2B2D42";
    canvas.context.fillRect(0, 0, canvas.width, canvas.height);

    boids.forEach((boid, i) => {
        boid.update(boids, getCursorPosition(), obstacles, canvas.width, canvas.height);
        if (boid.isOutside(canvas.width, canvas.height)) {
            boids[i] = generateRandomBoid();
            birds[i] = new Bird(boids[i]);
        }
        birds[i].draw(canvas.context, frameCount);
    });

    obstacles.forEach((obstacle) => {
        obstacle.draw(canvas.context);
    });

    drawCursor();

    requestAnimationFrame(() => runSimulation(frameCount + 1));
}

function drawCursor() {
    const cursorPosition = getCursorPosition();
    if (cursorPosition) {
        const size = 10;

        canvas.context.strokeStyle = "#EF233C";
        canvas.context.beginPath();
        canvas.context.moveTo(cursorPosition.x - size, cursorPosition.y - size);
        canvas.context.lineTo(cursorPosition.x + size, cursorPosition.y + size);
        canvas.context.moveTo(cursorPosition.x + size, cursorPosition.y - size);
        canvas.context.lineTo(cursorPosition.x - size, cursorPosition.y + size);
        canvas.context.stroke();
    }
}

onBirdCountChange(generateBirds);
onObstacleCountChange(generateObstacles);

generateObstacles(10);
generateBirds(200);
runSimulation();
