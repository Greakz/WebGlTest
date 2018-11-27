import { Shader } from '../Shader/Shader';

export interface ShaderProvider {
    getShader<T extends Shader>(shader: T): T;
}