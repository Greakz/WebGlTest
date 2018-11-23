import { Shader } from './Shader';

export interface WorldObject {
    translation: Translation;
    shader: Shader | Shader[];
    init(GL: WebGLRenderingContext)
    render(GL: WebGLRenderingContext, time: number, viewMatrix: Float32Array)
}

export function getNoTranslation():Translation {
    return {
        rotation: new Float32Array([0, 0, 0]),
        transform: new Float32Array([0, 0, 0]),
        scale: new Float32Array([1, 1, 1]),
    }
}
export interface Translation {
    rotation: Float32Array;
    transform: Float32Array;
    scale: Float32Array;
}