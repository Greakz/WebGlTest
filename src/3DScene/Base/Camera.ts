import { Mouse } from './Mouse';
import { mouseInstance } from '../../index';
import { Vec3 } from './MathTypes/Types/vectors';
import { Mat4 } from './MathTypes/Types/matrix';
import { getPerspectiveMatrix, lookAtMatrix, multiplyMatrices, radians } from './MathTypes/matrix.util';
import {
    addVec3s, crossProductVec3, normalizeVec3, scaleVec3, subtractVec3s,
} from './MathTypes/vector.util';
import { Ray } from './Ray';

export class Camera {
    protected position: Vec3;
    protected target: Vec3;

    protected screenHeight: number;
    protected screenWidth: number;

    protected perspective_matrix: Mat4;
    protected look_at_matrix: Mat4;

    protected fovY: number;
    protected aspect: number;
    protected zNear = 0.1;
    protected zFar = 100;

    protected mouse: Mouse;
    private mouseXLastFrame: number;
    private mouseYLastFrame: number;
    protected statePosition: number;
    protected heightPosition: number;

    constructor(position: Vec3, target: Vec3) {
        this.position = position;
        this.target = target;
        this.fovY = 60;
        this.mouse = mouseInstance;
        this.statePosition = 0;
        this.heightPosition = 0;
        window.addEventListener('resize', (e) => this.calculateWindowSize());
        this.calculateWindowSize();
        this.updateLookAtMatrix();
        this.updatePerspectiveMatrix();
    }

    calculateWindowSize() {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        this.aspect = this.screenWidth / this.screenHeight
    }

    getViewMatrix(): Mat4 {
        return multiplyMatrices(
            this.perspective_matrix,
            this.look_at_matrix
        );
    }

    updateLookAtMatrix() {
        this.look_at_matrix = lookAtMatrix(
            this.position,
            this.target,
            {x: 0, y: 1, z: 0}
        )
    }

    updatePerspectiveMatrix(): void {
        this.perspective_matrix = getPerspectiveMatrix(
            radians(this.fovY),
            this.aspect,
            this.zNear,
            this.zFar
        );
    }


    getRay(screenX: number, screenY: number): Ray {
        let view: Vec3 = subtractVec3s(this.target, this.position);
        view = normalizeVec3(view);

        let h: Vec3 = crossProductVec3(view, {x: 0, y: 1, z: 0});
        h = normalizeVec3(h);

        let v: Vec3 = crossProductVec3(h, view);
        v = normalizeVec3(v);

        let rad = this.fovY * Math.PI / 180;
        let vLength = Math.tan(rad / 2) * this.zNear;
        let hLength = vLength * this.aspect;

        v = scaleVec3(v, vLength);
        h = scaleVec3(h, hLength);

        let mouse_x: number = this.screenWidth - screenX - (this.screenWidth / 2);
        let mouse_y: number = screenY - (this.screenHeight / 2);
        mouse_y /= (this.screenHeight / 2);
        mouse_x /= (this.screenWidth / 2);

        let pos: Vec3 = addVec3s(
            addVec3s(
                addVec3s(
                    this.position,
                    scaleVec3(view, this.zNear)
                ),
                scaleVec3(h, mouse_x)
            ),
            scaleVec3(v, mouse_y)
        );
        let direction: Vec3 = subtractVec3s(pos, this.position);

        return {
            pos: pos,
            dir: direction
        }
    }


    setPosition(position: Vec3): void {
        this.position = position;
    }

    setFOV(fov: number): void {
        this.fovY = fov;
    }

    setTarget(target: Vec3): void {
        this.target = target;
    }

    update() {
        if (this.mouse.leftClicked) {
            const distance = 10;
            const distanceX = this.mouse.x - this.mouseXLastFrame;
            this.statePosition += (-1 * (distanceX / 1000) * Math.PI * 2) % (2 * Math.PI);
            const distanceY = this.mouse.y - this.mouseYLastFrame;
            this.heightPosition += (-1 * (distanceY / 1000) * Math.PI * 2) % (Math.PI);

            this.position = {
                x: Math.sin(this.statePosition) * (1 - Math.pow(Math.sin(this.heightPosition), 2)) * distance,
                y: Math.sin(this.heightPosition) * distance,
                z: Math.cos(this.statePosition) * (1 - Math.pow(Math.sin(this.heightPosition), 2)) * distance
            };
        }
        this.mouseXLastFrame = this.mouse.x;
        this.mouseYLastFrame = this.mouse.y;

        this.updateLookAtMatrix();
        this.updatePerspectiveMatrix();
    }
}