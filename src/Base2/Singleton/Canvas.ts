export interface Canvas {
    init(): void;

    setFps(fps: number): void;

    startApplication(updateFunction: (time: number) => void, renderFunction: (GL: WebGL2RenderingContext) => void): void;

    getGl(): WebGL2RenderingContext;

    setClickListenerPlane(newContainerId: string);

    getClickListenerPlane(): string;
}