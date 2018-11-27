import { HitBox } from '../../../Base2/Object/Model/HitBox/HitBox';
import { hitBoxFromVerticesAndIndices } from '../../../Base2/Object/Model/HitBox/util';

export class TriangleHitBox extends HitBox {
    private static vertices: number[] = [
        0, 0.5, 0,
        -0.5, -0.5, 0,
        0.5, -0.5, 0
    ];
    private static indices: number[] = [
        0, 1, 2
    ];
    constructor(){
        super(hitBoxFromVerticesAndIndices(TriangleHitBox.vertices, TriangleHitBox.indices));
    }
}