export class Canvas {
    public readonly element: HTMLCanvasElement;
    public readonly context: CanvasRenderingContext2D;

    constructor(elementId: string) {
        this.element = document.getElementById(elementId) as HTMLCanvasElement;
        this.context = this.element?.getContext("2d") as CanvasRenderingContext2D;

        if (!this.context) {
            throw new Error("Could not get canvas context");
        }

        this.updateSize();
        window.addEventListener("resize", () => this.updateSize());
    }

    private updateSize(): void {
        this.element.width = window.innerWidth;
        this.element.height = window.innerHeight;
    }

    public clear(): void {
        this.context.clearRect(0, 0, this.element.width, this.element.height);
    }
}
