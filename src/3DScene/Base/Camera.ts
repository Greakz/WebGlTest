import { lookAt } from '../../missUtil';
import MDN from '../../MDN';

const mat4 = require('gl-mat4');

export class Camera {
    protected position: Float32Array;
    protected target: Float32Array;

    protected fov: number;
    protected aspect: number;

    constructor(position: Float32Array,target: Float32Array, aspect: number) {
        this.position = position;
        this.target = target;
        this.fov = 72;
        this.aspect = aspect;
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
        const perspectiveMatrix: Float32Array = new Float32Array(MDN.perspectiveMatrix(MDN.radians(45.0), 4.0 / 3.0, 0.1, 100.0));
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

}