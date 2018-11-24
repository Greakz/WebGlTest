import { Shader } from './Shader';
import MDN from '../../MDN';
import { Mat4 } from './MathTypes/Types/matrix';
import { Vec3 } from './MathTypes/Types/vectors';
import {
    getRotationXMatrix, getRotationYMatrix, getRotationZMatrix, getScalingMatrix, getTranslationMatrix,
    mat4ToFloat32Array,
    multiplyArrayOfMatrices,
    radians
} from './MathTypes/matrix.util';

export abstract class WorldObject {
    transformation: Transformation;
    shader: Shader | Shader[];

    init(GL: WebGLRenderingContext) {
    }

    render(GL: WebGLRenderingContext, time: number, viewMatrix: Mat4) {
    }

    setTranslation(translation: Transformation) {
        this.transformation = translation;
    }

    getModelMatrixF32(): Float32Array {
        return mat4ToFloat32Array(this.getModelMatrix());
    }

    getModelMatrix(): Mat4 {
        if (!this.transformation) {
            this.transformation = getNoTransform();
        }
        return multiplyArrayOfMatrices([
            getScalingMatrix(this.transformation.scaling.x, this.transformation.scaling.y, this.transformation.scaling.z),
            getRotationYMatrix(radians(this.transformation.rotation.y)),
            getRotationXMatrix(radians(this.transformation.rotation.x)),
            getRotationZMatrix(radians(this.transformation.rotation.z)),
            getTranslationMatrix(this.transformation.translation.x, this.transformation.translation.y, this.transformation.translation.z),
        ])
    }
}

export function getNoTransform(): Transformation {
    return {
        rotation: {x: 0, y: 0, z: 0},
        translation: {x: 0, y: 0, z: 0},
        scaling: {x: 1, y: 1, z: 1},
    }
}

export interface Transformation {
    rotation: Vec3;
    translation: Vec3;
    scaling: Vec3;
}