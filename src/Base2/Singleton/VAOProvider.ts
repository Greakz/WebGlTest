import { Vao } from '../Object/Model/VAO/Vao';

export interface VAOProvider {
    getVao(vao: Vao): Vao;
}