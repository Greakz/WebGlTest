import { Mat4 } from '../../../../Base2/Math/Matrix/mat';
import { GridHitBox } from '../../../Objects/HitBox/GridHitbox';
import { Vec3 } from '../../../../Base2/Math/Vector/vec';
import { multiplyArrayOfMatrices } from '../../../../Base2/Math/Matrix/multiply';
import { getTranslationMatrix } from '../../../../Base2/Math/Matrix/translation';
import { ClickAbleDrawObject } from '../../../../Base2/Object/ClickableDrawObject';
import { ExampleScene } from '../ExampleScene';
import { PlaneModel } from '../../../Objects/Models/Plane/PlaneModel';
import { GridModel } from '../../../Objects/Models/Grid/GridModel';

export class Grid extends ClickAbleDrawObject{

    // private model: EditorGridModel;
    private modelPlane: PlaneModel;
    private modelGrid: GridModel;
    private hoverModel: PlaneModel;
    private size: number = 7;
    protected parent: ExampleScene;

    init() {
        // this.model = new EditorGridModel(this.size, this.centerBlockLine);
        // this.model.init()
        this.modelPlane = new PlaneModel(this.size);
        this.modelPlane.createModel();
        this.modelGrid = new GridModel(this.size);
        this.modelGrid.createModel();
        this.hoverModel = new PlaneModel(1);
        this.hoverModel.createModel();
        this.hoverModel.color = {x: 1.0, y: 1.0, z: 1.0, w: 0.8};
    }

    update(time) {
    }
    render(GL: WebGL2RenderingContext, projMat: Mat4) {
        this.modelPlane.renderModel(GL, projMat, this.transformation.getMatrix());
        this.modelGrid.renderModel(GL, projMat, this.transformation.getMatrix());
        if(this.isHovered) {
            let x = Math.floor(this.hoverPoint.x + 0.5), z = Math.floor(this.hoverPoint.z + 0.5);
            const hoverMatrix = multiplyArrayOfMatrices([
                this.transformation.getMatrix(),
                getTranslationMatrix(x, 0.001, z)
                ]);
            this.hoverModel.renderModel(GL, projMat, hoverMatrix);
        }
    }

    private x: number = 0;
    private z: number = 0;
    onLeftDown() {
        this.x = Math.floor(this.hoverPoint.x + 0.5);
        this.z = Math.floor(this.hoverPoint.z + 0.5)
    }

    onLeftClick() {
        let x = Math.floor(this.hoverPoint.x + 0.5), z = Math.floor(this.hoverPoint.z + 0.5);
        Grid.Log.info('Grid', 'I got Left Clicked on ' + x + '/' + z);
        if(x === this.x && z === this.z) {
            this.parent.addObjectAt(x, z);
        }
    }


    // targetable
    hitBox: GridHitBox = new GridHitBox(this.size);
    // TargetAble
    isHovered: boolean = false;
    hoverPoint: Vec3 | null = null;
}