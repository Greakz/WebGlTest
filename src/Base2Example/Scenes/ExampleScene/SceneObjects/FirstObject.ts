import { DrawObject } from '../../../../Base2/Object/DrawObject';
import { TriangleModel } from '../../../Models/TriangleModel';
import { Mat4 } from '../../../../Base2/Math/Matrix/mat';
import { Hitable } from '../../../../Base2/Object/Model/Hitable';
import { TriangleHitBox } from '../../../Models/HitBox/TriangleHitbox';
import { Vec3 } from '../../../../Base2/Math/Vector/vec';

export class FirstObject extends DrawObject implements Hitable {

    private model: TriangleModel;

    init() {
        this.model = new TriangleModel();
        this.model.init();
    }

    update(time) {
        if(this.isHovered) {
            FirstObject.Log.info('FirstObject', 'I am Hovered')
        }
    }
    render(GL: WebGL2RenderingContext, projMat: Mat4) {
        this.model.render(GL, projMat, this.transformation.getMatrix());
    }

    // targetable
    hitBox: TriangleHitBox = new TriangleHitBox();
    // Hitable
    isHovered: boolean = false;
    hoverPoint: Vec3 | null = null;
}