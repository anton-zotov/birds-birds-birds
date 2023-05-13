import { Vector } from "./vector";

// cursor position

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

export function getCursorPosition(): Vector {
    return cursorPosition;
}

// bird count input

let birdCountInput = document.getElementById("birdCount") as HTMLInputElement;

export function onBirdCountChange(callback: (birdCount: number) => void): void {
    birdCountInput.addEventListener("change", () => {
        callback(parseInt(birdCountInput.value));
    });
}
