import { Vao } from '../../../Base2/Object/Model/VAO/Vao';

export class TriangleVao extends Vao {
    vao_identifier: string = 'triangle';
    protected vertices: number[] = [
        0, 0.5, 0,
        -0.5, -0.5, 0,
        0.5, -0.5, 0
    ];
    protected indices: number[] = [
        0, 1, 2
    ];
    constructor() {
        super({});
    }
}