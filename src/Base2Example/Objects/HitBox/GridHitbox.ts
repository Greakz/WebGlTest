import { HitBox } from '../../../Base2/Object/Model2/HitBox/HitBox';
import { getHitBoxPolygonsFromVertexAndIndices } from '../../../Base2/Object/Model2/HitBox/util';

export class GridHitBox extends HitBox {
    constructor(size: number) {
        super(getHitBoxPolygonsFromVertexAndIndices(
            [
                -(size / 2), 0, -(size / 2),
                -(size / 2), 0, (size / 2),
                (size / 2), 0, -(size / 2),
                (size / 2), 0, (size / 2)
            ],
            [
                0, 1, 2, 1, 3, 2
            ]
        ));
    }
}