import { HitBox } from '../../../Base2/Object/Model2/HitBox/HitBox';
import { getHitBoxPolygonsFromVertexAndIndices } from '../../../Base2/Object/Model2/HitBox/util';

export class TriangleHitBox extends HitBox {
    private static vertices: number[] = [
        0, 1, 0,
        -0.5, 0, 0,
        0.5, 0, 0
    ];
    private static indices: number[] = [
        0, 1, 2
    ];
    constructor(){
        super(getHitBoxPolygonsFromVertexAndIndices(TriangleHitBox.vertices, TriangleHitBox.indices));
    }
}