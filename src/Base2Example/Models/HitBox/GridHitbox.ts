import { HitBox } from '../../../Base2/Object/Model/HitBox/HitBox';
import { getHitBoxPolygonsFromVertexAndIndices } from '../../../Base2/Object/Model/HitBox/util';

export class GridHitBox extends HitBox {
    constructor(size: number, cBL?: boolean) {
        super(getHitBoxPolygonsFromVertexAndIndices(
            [
                -size - (cBL ? 0.5: 0), 0, -size - (cBL ? 0.5: 0),
                -size - (cBL ? 0.5: 0), 0, size + (cBL ? 0.5: 0),
                size + (cBL ? 0.5: 0), 0, -size - (cBL ? 0.5: 0),
                size + (cBL ? 0.5: 0), 0, size + (cBL ? 0.5: 0)
            ],
            [
                0, 1, 2, 1, 3, 2
            ]
        ));
    }
}