import { Vector } from "./vector";

// cursor position

let cursorPosition: Vector = new Vector(0, 0);
let cursorIsDown = false;

function updateCursorPosition(event: MouseEvent | TouchEvent) {
    if (event instanceof TouchEvent) {
        cursorPosition = new Vector(event.touches[0].clientX, event.touches[0].clientY);
    } else if (event instanceof MouseEvent) {
        cursorPosition = new Vector(event.clientX, event.clientY);
    }
}

function onCursorUp() {
    cursorIsDown = false;
}

function onCursorDown() {
    cursorIsDown = true;
}

window.addEventListener("mousemove", updateCursorPosition);
window.addEventListener("touchmove", updateCursorPosition);

window.addEventListener("mousedown", onCursorDown);
window.addEventListener("touchstart", onCursorDown);

window.addEventListener("mouseup", onCursorUp);
window.addEventListener("touchend", onCursorUp);

export function getCursorPosition(): Vector | null {
    return cursorIsDown ? cursorPosition : null;
}

// bird count input

let birdCountInput = document.getElementById("birdCount") as HTMLInputElement;

export function onBirdCountChange(callback: (birdCount: number) => void): void {
    birdCountInput.addEventListener("change", () => {
        callback(parseInt(birdCountInput.value));
    });
}

// obstacle count input

let obstacleCountInput = document.getElementById("obstacleCount") as HTMLInputElement;

export function onObstacleCountChange(callback: (obstacleCount: number) => void): void {
    obstacleCountInput.addEventListener("change", () => {
        callback(parseInt(obstacleCountInput.value));
    });
}
