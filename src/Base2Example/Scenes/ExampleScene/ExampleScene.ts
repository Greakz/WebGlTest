import { Scene } from '../../../Base2/Scene/Scene';
import { FirstObject } from './SceneObjects/FirstObject';
import { ExampleCamera } from './ExampleCamera';
import { Mat4 } from '../../../Base2/Math/Matrix/mat';
import { Grid } from './SceneObjects/Grid';

export class ExampleScene extends Scene {

    protected camera: ExampleCamera;

    constructor() {
        super();
        this.camera = new ExampleCamera(
            {x: 0, y: 1, z: 6},
            {x: 0, y: 0, z: 0}
        );
        this.addSceneObject(new Grid());
        this.addSceneObject(new FirstObject());

    }

    init() {

    }

    update(time: number) {
        // ExampleScene.Log.info('ExampleScene', 'update call...')
    }

    preRender(GL: WebGL2RenderingContext, projMat: Mat4) {
        // L.enable(GL.DEPTH_TEST);
        // GL.depthFunc(GL.LEQUAL);

        // GL.enable(GL.CULL_FACE);
        // GL.cullFace(GL.BACK);

        GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);
        GL.enable(GL.BLEND);

        GL.clearColor(0.35, 0.35, 0.35, 1.0);
        GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
    }

    postRender(GL: WebGL2RenderingContext, projMat: Mat4) {

    }

}