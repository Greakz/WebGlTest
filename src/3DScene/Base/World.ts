import { WorldObject } from './WorldObject';
import { Camera } from './Camera';
import { mat4ToFloat32Array } from './MathTypes/matrix.util';
import { Mat4 } from './MathTypes/Types/matrix';
import { Vec3 } from './MathTypes/Types/vectors';
import { mouseInstance } from '../../index';
import { Ray } from './Ray';
import { addVec3s, normalizeVec3, scaleVec3, subtractVec3s } from './MathTypes/vector.util';
import { Line } from '../WorldObjects/Line';

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
        if (this.cameras.length <= 0) {
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

    update(time: number) {}

    render(GL: WebGLRenderingContext, time: number) {


        this.cameras[this.activeCamera].update();
        const viewMatrix = this.cameras[this.activeCamera].getViewMatrix();
        const mouseRay = this.cameras[this.activeCamera].getRay(mouseInstance.x, mouseInstance.y);
        /*
        let direction: Vec3 = normalizeVec3(mouseRay.dir);
        direction = scaleVec3(direction, 50);
        let to = addVec3s(mouseRay.pos, direction);
        const newline = new Line(mouseRay.pos, to, {x: 0.4, y: 0.05, z: 0, w: 0.9});
        newline.init(GL);
        if (this.linesForTest.length > 40) {
            this.linesForTest = this.linesForTest.filter((a, i) => i > 0)
        }
        */
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