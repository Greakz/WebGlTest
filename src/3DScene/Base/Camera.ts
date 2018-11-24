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

    constructor(position: Float32Array,target: Float32Array, aspect: number) {
        this.position = position;
        this.target = target;
        this.fov = 60;
        this.aspect = aspect;
        this.mouse = mouseInstance;
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
        const perspectiveMatrix: Float32Array = new Float32Array(
            MDN.perspectiveMatrix(
                MDN.radians(this.fov),
                this.aspect,
                zNear,
                zFar
            ));
        return perspectiveMatrix
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
        const mouseX = -1 * (this.mouse.x / 1000) * Math.PI * 2;

        this.position = new Float32Array([
             Math.sin(mouseX) * 5,
            this.position[1],
            Math.cos(mouseX) * 5
        ]);
    }
}