import { Scene } from '../../../BaseLib/Scene/Scene';
import { ExampleCamera } from './ExampleCamera';
import { Mat4 } from '../../../BaseLib/Math/Matrix/mat';
import { Grid } from './SceneObjects/Grid';
import { WoodCube } from './SceneObjects/WoodCube';
import { StoneCube } from './SceneObjects/StoneCube';
import { DirectionalLight } from '../../../BaseLib/Light/DirectionalLight';

export class ExampleScene extends Scene {

    protected camera: ExampleCamera;

    constructor() {
        super();
        this.camera = new ExampleCamera(
            {x: 0, y: 3, z: 10},
            {x: 0, y: 0, z: 0}
        );
        this.addSceneObject(new Grid(this));
        let lightSource = new DirectionalLight(
            {x: 1, y: 1, z: 1},
            {x: 1.0, y: 1.0, z: 1.0}
        );
        let lightFromCube = new StoneCube(this);
        lightFromCube.transformation.moveX(lightSource.direction.x).moveY(lightSource.direction.y).moveZ(lightSource.direction.z);
        this.addSceneObject(lightFromCube);
        this.sceneLightning.addDirectionalLight(lightSource);

        this.sceneLightning.addDirectionalLight(new DirectionalLight(
            {x: -1, y: -1, z: -1},
            {x: 0.0, y: 0, z: 1.0}
        ));

    }

    addObjectAt(x: number, z: number, wood: boolean) {
        let newObj;
        if(wood) {
            newObj = new WoodCube(this);
        } else {
            newObj = new StoneCube(this);
        }
        newObj.initSelfAndChildren();
        newObj.transformation.moveZ(z);
        newObj.transformation.moveX(x);
        newObj.transformation.moveY(2.5);
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