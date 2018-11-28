import { Vao } from '../Object/Model/VAO/Vao';
import { Shader } from '../Shader/Shader';

export interface VAOProvider {
    getVao<T extends Vao<Shader>>(vao: T): T;
}