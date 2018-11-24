import { WorldObject } from './WorldObject';
import { Camera } from './Camera';
import { mat4ToFloat32Array } from './MathTypes/matrix.util';
import { Mat4 } from './MathTypes/Types/matrix';
import { Vec3 } from './MathTypes/Types/vectors';
import { mouseInstance } from '../../index';
import { Ray } from './Ray';

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
        const mouseRay = this.cameras[this.activeCamera].getRay(mouseInstance.x, mouseInstance.y);
        this.renderWorldObjects(GL, time, viewMatrix, mouseRay);
    }

    renderWorldObjects(GL: WebGLRenderingContext, time: number, viewMatrix: Mat4, mouseRay: Ray): void {
        this.worldObjects.forEach(
            (worldObject: WorldObject) => {
                worldObject.render(GL, time, viewMatrix, mouseRay);
            }
        )
    }
}