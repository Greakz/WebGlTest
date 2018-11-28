import { DrawObject } from '../../../../Base2/Object/DrawObject';
import { Mat4 } from '../../../../Base2/Math/Matrix/mat';
import { GridModel } from '../../../Models/GridModel';

export class Grid extends DrawObject {

    private model: GridModel;

    init() {
        this.model = new GridModel(3);
        this.model.init();
    }

    update(time) {
    }
    render(GL: WebGL2RenderingContext, projMat: Mat4) {
        this.model.render(GL, projMat, this.transformation.getMatrix());
    }

    /*
    // targetable
    hitBox: TriangleHitBox = new TriangleHitBox();
    // Hitable
    isHovered: boolean = false;
    hoverPoint: Vec3 | null = null;
    */
}