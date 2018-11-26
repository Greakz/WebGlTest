export interface Canvas {
    init(): void;
    setFps(fps: number): void;
    startApplication(updateFunction: (time: number) => void, renderFunction: (GL: WebGLRenderingContext) => void): void;
    getGl(): WebGLRenderingContext;
}