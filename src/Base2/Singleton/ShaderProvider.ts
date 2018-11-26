import { Shader } from '../Shader/Shader';

export interface ShaderProvider {
    getShader(shader: Shader): Shader;
}