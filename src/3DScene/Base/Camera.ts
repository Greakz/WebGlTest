import { lookAt } from '../../missUtil';

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
        console.log(lookAtMatrix)
        return lookAtMatrix;
    }

    getPerspectiveMatrix(): Float32Array {
        const perspectiveMatrix: Float32Array = mat4.create();
        var zNear = 0.1;
        var zFar = 100;
        mat4.perspective(perspectiveMatrix, this.fov, this.aspect, zNear, zFar);
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