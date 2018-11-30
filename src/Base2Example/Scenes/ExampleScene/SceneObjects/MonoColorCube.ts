import { Mat4 } from '../../../../Base2/Math/Matrix/mat';
import { GridHitBox } from '../../../Models/HitBox/GridHitbox';
import { Vec3 } from '../../../../Base2/Math/Vector/vec';
import { ClickAbleDrawObject } from '../../../../Base2/Object/ClickableDrawObject';
import { ExampleScene } from '../ExampleScene';
import { MonoColorCubeModel } from '../../../Models/MonoColorCubeModel';
import { CubeHitBox } from '../../../Models/HitBox/CubeHitBox';

export class MonoColorCube extends ClickAbleDrawObject {

    private model: MonoColorCubeModel;
    protected parent: ExampleScene;

    init() {
        this.model = new MonoColorCubeModel();
        this.model.init();

    }

    update(time) {
    }
    render(GL: WebGL2RenderingContext, projMat: Mat4) {
        if(this.isHovered) {
            this.model.color = {x: 0.8, y: 0, z: 0, w: 1};
        }else {
            this.model.color = {x: 0.4, y: 0.4, z: 0.7, w: 0.9};
        }
        this.model.render(GL, projMat, this.transformation.getMatrix());

    }

    onLeftClick() {

    }


    // targetable
    hitBox: GridHitBox = new CubeHitBox();
    // TargetAble
    isHovered: boolean = false;
    hoverPoint: Vec3 | null = null;
}