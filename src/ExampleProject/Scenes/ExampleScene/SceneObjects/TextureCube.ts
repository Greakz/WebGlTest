import { Mat4 } from '../../../../BaseLib/Math/Matrix/mat';
import { GridHitBox } from '../../../Objects/HitBox/GridHitbox';
import { Vec3 } from '../../../../BaseLib/Math/Vector/vec';
import { ClickAbleDrawObject } from '../../../../BaseLib/Object/ClickableDrawObject';
import { ExampleScene } from '../ExampleScene';
import { CubeHitBox } from '../../../Objects/HitBox/CubeHitBox';
import { WoodCubeModel } from '../../../Objects/Models/Cube/WoodCubeModel';

export class TextureCube extends ClickAbleDrawObject {

    private model: WoodCubeModel;
    protected parent: ExampleScene;

    init() {
        this.model = new WoodCubeModel()
        this.model.createModel()
    }

    update(time) {
        if (this.isHovered) {
            this.model.color = {x: 1, y: 0.5, z: 0.5, w: 1.0};
        } else {
            this.model.color = {x: 1, y: 1, z: 1, w: 0.9};
        }
    }

    render(GL: WebGL2RenderingContext, projMat: Mat4) {
        this.model.renderModel(GL, projMat, this.transformation.getMatrix());

    }

    onLeftClick() {

    }


    // targetable
    hitBox: GridHitBox = new CubeHitBox();
    // TargetAble
    isHovered: boolean = false;
    hoverPoint: Vec3 | null = null;
}