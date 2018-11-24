import { Mouse } from './Mouse';
import { mouseInstance } from '../../index';
import { Vec3 } from './MathTypes/Types/vectors';
import { Mat4 } from './MathTypes/Types/matrix';
import {
    getPerspectiveMatrix, lookAtMatrix, mat4ToFloat32Array, multiplyMatrices,
    radians
} from './MathTypes/matrix.util';

export class Camera {
    protected position: Vec3;
    protected target: Vec3;

    protected fov: number;
    protected aspect: number;
    protected zNear = 0.001;
    protected zFar = 100;

    protected mouse: Mouse;
    private mouseXLastFrame: number;
    private mouseYLastFrame: number;
    protected statePosition: number;
    protected heightPosition: number;

    constructor(position: Vec3, target: Vec3, aspect: number) {
        this.position = position;
        this.target = target;
        this.fov = 60;
        this.aspect = aspect;
        this.mouse = mouseInstance;
        this.statePosition = 0;
        this.heightPosition = 0;
    }

    getViewMatrix(): Mat4 {
        return multiplyMatrices(
            this.getPerspectiveMatrix(),
            this.getLookAtMatrix()
        );
    }

    getLookAtMatrix() {
        return lookAtMatrix(
            this.position,
            this.target,
            {x: 0, y: 1, z: 0}
            )
    }

    getPerspectiveMatrix(): Mat4 {
        return getPerspectiveMatrix(
                radians(this.fov),
                this.aspect,
                this.zNear,
                this.zFar
            );
    }

    setPosition(position: Vec3): void {
        this.position = position;
    }

    setFOV(fov: number): void {
        this.fov = fov;
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

    }
}