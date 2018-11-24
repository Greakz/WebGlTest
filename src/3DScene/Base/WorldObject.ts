import { Shader } from './Shader';
import MDN from '../../MDN';

export abstract class WorldObject {
    transformation: Transformation;
    shader: Shader | Shader[];
    init(GL: WebGLRenderingContext) {}
    render(GL: WebGLRenderingContext, time: number, viewMatrix: Float32Array) {}
    setTranslation(translation: Transformation) {
        this.transformation = translation;
    }
    getModelMatrix() {
        if(!this.transformation) {
            this.transformation = getNoTransform();
        }
        return MDN.multiplyArrayOfMatrices([
            MDN.scaleMatrix(this.transformation.scaling[0], this.transformation.scaling[1], this.transformation.scaling[2]),
            MDN.rotateYMatrix(MDN.radians(this.transformation.rotation[1])),
            MDN.rotateXMatrix(MDN.radians(this.transformation.rotation[0])),
            MDN.rotateZMatrix(MDN.radians(this.transformation.rotation[2])),
            MDN.translateMatrix(this.transformation.translation[0], this.transformation.translation[1], this.transformation.translation[2]),
        ])
    }
}

export function getNoTransform():Transformation {
    return {
        rotation: new Float32Array([0, 0, 0]),
        translation: new Float32Array([0, 0, 0]),
        scaling: new Float32Array([1, 1, 1]),
    }
}
export interface Transformation {
    rotation: Float32Array;
    translation: Float32Array;
    scaling: Float32Array;
}