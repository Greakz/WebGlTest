import { lookAt } from '../../missUtil';
import MDN from '../../MDN';
import {Mouse}  from './Mouse';
import { mouseInstance } from '../../index';

const mat4 = require('gl-mat4');

export class Camera {
    protected position: Float32Array;
    protected target: Float32Array;

    protected fov: number;
    protected aspect: number;

    protected mouse: Mouse;
    private mouseXLastFrame: number;
    private mouseYLastFrame: number;
    protected statePosition: number;
    protected heightPosition: number;

    constructor(position: Float32Array,target: Float32Array, aspect: number) {
        this.position = position;
        this.target = target;
        this.fov = 60;
        this.aspect = aspect;
        this.mouse = mouseInstance;
        this.statePosition = 0;
        this.heightPosition= 0;
    }

    getViewMatrix(): Float32Array {
        const lookAtMatrix: Float32Array = new Float32Array(16);
        lookAt(lookAtMatrix, this.position, this.target, [0, 1, 0]);
        mat4.multiply(lookAtMatrix, this.getPerspectiveMatrix(), lookAtMatrix);
        return lookAtMatrix;
    }

    getPerspectiveMatrix(): Float32Array {
        var zNear = 0.1;
        var zFar = 100;
        return new Float32Array(
            MDN.perspectiveMatrix(
                MDN.radians(this.fov),
                this.aspect,
                zNear,
                zFar
            ));
    }

    setPosition(position: Float32Array): void {
        this.position = position;
    }

    setFOV(fov: number): void {
        this.fov = fov;
    }

    setTarget(target: Float32Array): void {
        this.target = target;
    }

    update() {
        if(this.mouse.leftClicked) {
            const distance = 10;
            const distanceX = this.mouse.x - this.mouseXLastFrame;
            this.statePosition += (-1 * (distanceX / 1000) * Math.PI * 2) % (2 * Math.PI);
            const distanceY = this.mouse.y - this.mouseYLastFrame;
            this.heightPosition += (-1 * (distanceY / 1000) * Math.PI * 2) % (Math.PI);

            this.position = new Float32Array([
                Math.sin(this.statePosition) * (1 - Math.pow(Math.sin(this.heightPosition), 2)) * distance,
                Math.sin(this.heightPosition) * distance,
                Math.cos(this.statePosition) * (1 - Math.pow(Math.sin(this.heightPosition), 2)) * distance
            ]);
        }
        this.mouseXLastFrame = this.mouse.x;
        this.mouseYLastFrame = this.mouse.y;

    }
}