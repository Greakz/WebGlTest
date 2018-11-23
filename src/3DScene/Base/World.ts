import { WorldObject } from './WorldObject';
import { Camera } from './Camera';

export class World {
    cameras: Camera[];
    activeCamera: number;
    worldObjects: WorldObject[];

    constructor(worldObjects: WorldObject[], cameras: Camera[]) {
        this.worldObjects = worldObjects;
        this.cameras = cameras;
    }

    init(GL: WebGLRenderingContext) {
        this.initWorldObjects(GL);
        if(this.cameras.length <= 0) {
            throw Error('The World is missing a Camera!');
        }
        this.activeCamera = 0;
    }

    activateCamera(cameraIndex: number) {
        this.activeCamera = cameraIndex;
    }

    initWorldObjects(GL: WebGLRenderingContext): void {
        this.worldObjects.forEach(
            (worldObject: WorldObject) => {
                worldObject.init(GL);
            }
        )
    }

    render(GL: WebGLRenderingContext, time: number) {
        this.cameras[this.activeCamera].update();
        const viewMatrix = this.cameras[this.activeCamera].getViewMatrix();
        this.renderWorldObjects(GL, time, viewMatrix);
    }

    renderWorldObjects(GL: WebGLRenderingContext, time: number, viewMatrix: Float32Array): void {
        this.worldObjects.forEach(
            (worldObject: WorldObject) => {
                worldObject.render(GL, time, viewMatrix);
            }
        )
    }
}