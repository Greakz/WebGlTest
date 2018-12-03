import { Mat4 } from '../../../../BaseLib/Math/Matrix/mat';
import { GridHitBox } from '../../../Objects/HitBox/GridHitbox';
import { Vec3 } from '../../../../BaseLib/Math/Vector/vec';
import { multiplyArrayOfMatrices } from '../../../../BaseLib/Math/Matrix/multiply';
import { getTranslationMatrix } from '../../../../BaseLib/Math/Matrix/translation';
import { ClickAbleDrawObject } from '../../../../BaseLib/Object/ClickableDrawObject';
import { ExampleScene } from '../ExampleScene';
import { PlaneModel } from '../../../Objects/Models/Plane/PlaneModel';
import { GridModel } from '../../../Objects/Models/Grid/GridModel';
import { SceneLightning } from '../../../../BaseLib/Light/SceneLightning';

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
    render(GL: WebGL2RenderingContext, projMat: Mat4, sceneLightning: SceneLightning) {
        this.modelPlane.renderModel(GL, projMat, this.transformation.getMatrix(), sceneLightning);
        this.modelGrid.renderModel(GL, projMat, this.transformation.getMatrix(), sceneLightning);
        if(this.isHovered) {
            let x = Math.floor(this.hoverPoint.x + 0.5), z = Math.floor(this.hoverPoint.z + 0.5);
            const hoverMatrix = multiplyArrayOfMatrices([
                this.transformation.getMatrix(),
                getTranslationMatrix(x, 0.001, z)
                ]);
            this.hoverModel.renderModel(GL, projMat, hoverMatrix, sceneLightning);
        }
    }

    private x: number = 0;
    private z: number = 0;
    onLeftDown() {
        this.x = Math.floor(this.hoverPoint.x + 0.5);
        this.z = Math.floor(this.hoverPoint.z + 0.5)
    }
    onRightDown() {
        this.x = Math.floor(this.hoverPoint.x + 0.5);
        this.z = Math.floor(this.hoverPoint.z + 0.5)
    }

    onLeftClick() {
        let x = Math.floor(this.hoverPoint.x + 0.5), z = Math.floor(this.hoverPoint.z + 0.5);
        Grid.Log.info('Grid', 'I got Left Clicked on ' + x + '/' + z);
        if(x === this.x && z === this.z) {
            this.parent.addObjectAt(x, z, true);
        }
    }
    onRightClick() {
        let x = Math.floor(this.hoverPoint.x + 0.5), z = Math.floor(this.hoverPoint.z + 0.5);
        Grid.Log.info('Grid', 'I got Right Clicked on ' + x + '/' + z);
        if(x === this.x && z === this.z) {
            this.parent.addObjectAt(x, z, false);
        }
    }


    // targetable
    hitBox: GridHitBox = new GridHitBox(this.size);
    // TargetAble
    isHovered: boolean = false;
    hoverPoint: Vec3 | null = null;
}