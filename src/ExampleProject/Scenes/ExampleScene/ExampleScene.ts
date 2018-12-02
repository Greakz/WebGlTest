import { Scene } from '../../../BaseLib/Scene/Scene';
import { ExampleCamera } from './ExampleCamera';
import { Mat4 } from '../../../BaseLib/Math/Matrix/mat';
import { Grid } from './SceneObjects/Grid';
import { WoodCube } from './SceneObjects/WoodCube';
import { StoneCube } from './SceneObjects/StoneCube';

export class ExampleScene extends Scene {

    protected camera: ExampleCamera;

    constructor() {
        super();
        this.camera = new ExampleCamera(
            {x: 0, y: 3, z: 10},
            {x: 0, y: 0, z: 0}
        );
        this.addSceneObject(new Grid(this));
    }

    addObjectAt(x: number, z: number, wood: boolean) {
        let newObj;
        if(wood) {
            console.log('add wood object')
            newObj = new WoodCube(this);
        } else {
            console.log('add stone object')
            newObj = new StoneCube(this);
        }
        newObj.initSelfAndChildren();
        newObj.transformation.moveZ(z);
        newObj.transformation.moveX(x);
        newObj.transformation.moveY(0.5);
        this.addSceneObject(newObj);
    }

    init() {

    }

    update(time: number) {
        // ExampleScene.Log.info('ExampleScene', 'update call...')
    }

    preRender(GL: WebGL2RenderingContext, projMat: Mat4) {
        GL.enable(GL.DEPTH_TEST);
        GL.depthFunc(GL.LEQUAL);

        GL.enable(GL.CULL_FACE);
        GL.cullFace(GL.BACK);

        GL.enable(GL.BLEND);
        GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);

        GL.clearColor(0.35, 0.35, 0.35, 1.0);
        GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
    }

    postRender(GL: WebGL2RenderingContext, projMat: Mat4) {

    }

}