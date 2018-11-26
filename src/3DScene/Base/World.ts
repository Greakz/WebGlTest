import { WorldObject } from './WorldObject';
import { Camera } from './Camera';
import { mat4ToFloat32Array } from './MathTypes/matrix.util';
import { Mat4 } from './MathTypes/Types/matrix';
import { Vec3, Vec4 } from './MathTypes/Types/vectors';
import { mouseInstance } from '../../index';
import { Ray } from './Ray';
import { addVec3s, compareVec3AGreaterB, normalizeVec3, scaleVec3, subtractVec3s } from './MathTypes/vector.util';
import { Line } from '../WorldObjects/Line';

export class World {
    cameras: Camera[];
    activeCamera: number;
    worldObjects: WorldObject[];
    hoveredObjectIndex: number = -1;
    hoveredHitPoint: Vec3 | null;

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

    update(time: number) {
        this.cameras[this.activeCamera].update();
        const mouseRay = this.cameras[this.activeCamera].getRay(mouseInstance.x, mouseInstance.y);
        this.worldObjects.forEach(
            (worldObject: WorldObject) => {
                worldObject.update(time);
            }
        );
        if(this.hoveredObjectIndex !== -1) {
            this.worldObjects[this.hoveredObjectIndex].setHover(false);
        }
        const camPos: Vec3 = this.cameras[this.activeCamera].getPosition();
        this.hoveredHitPoint = this.worldObjects.reduce(
            (acc: Vec3 | null, worldObject: WorldObject, index: number) => {
                let hit: Vec3 | null = worldObject.checkHit(mouseRay, camPos);
                if(hit !== null) {
                    if(acc === null || compareVec3AGreaterB(subtractVec3s(acc, camPos), subtractVec3s(hit, camPos))) {
                        this.hoveredObjectIndex = index;
                        return hit
                    }
                }
                return acc;
            },
            null
        );
        if(this.hoveredHitPoint !==  null) {
            this.worldObjects[this.hoveredObjectIndex].setHover(true);
        }else{
            this.hoveredObjectIndex = -1;
        }
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