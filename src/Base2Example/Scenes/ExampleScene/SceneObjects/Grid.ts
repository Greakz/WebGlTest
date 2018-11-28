import { DrawObject } from '../../../../Base2/Object/DrawObject';
import { Mat4 } from '../../../../Base2/Math/Matrix/mat';
import { EditorPlaneModel } from '../../../Models/EdiorPlaneModel';
import { GridHitBox } from '../../../Models/HitBox/GridHitbox';
import { Vec3 } from '../../../../Base2/Math/Vector/vec';
import { PlaneModel } from '../../../Models/PlaneModel';
import { multiplyArrayOfMatrices } from '../../../../Base2/Math/Matrix/multiply';
import { getTranslationMatrix } from '../../../../Base2/Math/Matrix/translation';
import { ClickableDrawObject } from '../../../../Base2/Object/ClickableDrawObject';

export class Grid extends ClickableDrawObject{

    private model: EditorPlaneModel;
    private hoverModel: PlaneModel;
    private size: number = 3;
    private centerBlockLine: boolean = true;

    init() {
        this.model = new EditorPlaneModel(this.size, this.centerBlockLine);
        this.model.init();
        this.hoverModel = new PlaneModel();
        this.hoverModel.init();
    }

    update(time) {
    }
    render(GL: WebGL2RenderingContext, projMat: Mat4) {
        this.model.render(GL, projMat, this.transformation.getMatrix());
        if(this.isHovered) {
            let x = Math.floor(this.hoverPoint.x + 0.5), z = Math.floor(this.hoverPoint.z + 0.5);
            const hoverMatrix = multiplyArrayOfMatrices([
                this.transformation.getMatrix(),
                getTranslationMatrix(x, 0.001, z)
                ]);
            this.hoverModel.render(GL, projMat, hoverMatrix);
        }
    }

    onLeftClick() {
        Grid.Log.info('Grid', 'I got Left Clicked');
    }


    // targetable
    hitBox: GridHitBox = new GridHitBox(this.size, this.centerBlockLine);
    // Hitable
    isHovered: boolean = false;
    hoverPoint: Vec3 | null = null;

}