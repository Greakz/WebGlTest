import { World } from './World';

export class Scene {

    worlds: World[] = [];
    isInitialising: boolean = false;
    activeWorld: number;

    constructor(worlds: World[]) {
        this.worlds = worlds;
    }

    activateWorld(GL: WebGLRenderingContext, worldIndex: number) {
        this.isInitialising = true;
        this.worlds[worldIndex].init(GL);
        this.activeWorld = 0;
        this.isInitialising = false;
    }

    updateScene(time: number) {
        if (!this.isInitialising) {
            if (this.activeWorld !== undefined) {
                this.worlds[this.activeWorld].update(time);
            } else {
                console.log('[SceneError]: The Scene has no World!');
            }
        } else {
            console.log('[SceneError]: The Scene is not Initialised!')
        }
    }

    renderScene(GL: WebGLRenderingContext, time: number) {
        GL.enable(GL.DEPTH_TEST);
        GL.enable(GL.BLEND);
        GL.enable(GL.CULL_FACE);
        GL.cullFace(GL.BACK);
        GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA)
        GL.depthFunc(GL.LEQUAL);
        GL.clearColor(0.7, 0.68, 0.73, 1.0);
        GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

            if (!this.isInitialising) {
                if (this.activeWorld !== undefined) {
                    this.worlds[this.activeWorld].render(GL, time);
                } else if (this.worlds.length > 0) {
                    this.activateWorld(GL, 0);
                }
            }
    }
}