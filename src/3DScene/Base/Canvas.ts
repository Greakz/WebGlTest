import { Scene } from './Scene';

export class Canvas {

    private canvas: HTMLCanvasElement;
    private gl: WebGLRenderingContext;
    private scene: Scene;

    private fps: number;
    private lastUpdateTime: number = 0;
    private waitForNextFrameInMs: number;
    private currentlyInLoop: boolean = false;
    private renderCall: number = 0;

    constructor(scene: Scene, fps: number) {
        this.scene = scene;
        this.fps = fps;
        this.waitForNextFrameInMs = 1000 / this.fps;
        this.lastUpdateTime = Date.now();
        this.canvas = document.querySelector('#canvas');
        this.gl = this.canvas.getContext('webgl');
        window.addEventListener('resize', () => this.adjustSize());
        this.adjustSize();
    }

    adjustSize() {
        const newHeight = document.getElementById('container').clientHeight;
        const newWidth = document.getElementById('container').clientWidth;
        this.canvas.height = newHeight;
        (this.canvas as any).width = newWidth;
        this.gl.viewport(0,0, newWidth, newHeight);
    }

    runLoop() {
        this.renderCall++;
        if (!this.currentlyInLoop) {
            // mark that we started a loop
            this.currentlyInLoop = true;
            const startTime = Date.now();

            // let the engine roll...!
            this.update(startTime);
            this.render(startTime);

            // calculate how much time to wait for next draw call
            const finishTime = Date.now();
            const timeToWaitLeft: number = this.waitForNextFrameInMs - (finishTime - startTime);
            // finish Call
            this.lastUpdateTime = startTime;
            this.currentlyInLoop = false;
            if (timeToWaitLeft > 0) {
                setTimeout(() => {
                    this.runLoop()
                }, timeToWaitLeft);
            } else {
                setTimeout(() => this.runLoop(), 1);
            }
        }
    }

    update(time: number ){
        this.scene.updateScene(time);
    }

    render(time: number) {
        const GL = this.gl;
        this.scene.renderScene(GL, time);
    }


}