import { Vao } from '../Object/Model/VAO/Vao';
import { Shader } from '../Shader/Shader';

export interface VAOProvider {
    getVao(vao: Vao<Shader>): Vao<Shader>;
}