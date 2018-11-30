import { Mat4 } from '../../../../Base2/Math/Matrix/mat';
import { GridHitBox } from '../../../Models/HitBox/GridHitbox';
import { Vec3 } from '../../../../Base2/Math/Vector/vec';
import { ClickAbleDrawObject } from '../../../../Base2/Object/ClickableDrawObject';
import { ExampleScene } from '../ExampleScene';
import { MonoColorCubeModel } from '../../../Models/MonoColorCubeModel';
import { CubeHitBox } from '../../../Models/HitBox/CubeHitBox';
import { TextureCubeModel } from '../../../Models/TextureCubeModel';

export class TextureCube extends ClickAbleDrawObject {

    private model: TextureCubeModel;
    protected parent: ExampleScene;

    init() {
        this.model = new TextureCubeModel();
        this.model.init();

    }

    update(time) {

    }
    render(GL: WebGL2RenderingContext, projMat: Mat4) {
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