import { Scene } from '../../../Base2/Scene/Scene';
import { SceneEvent } from '../../../Base2/Scene/SceneEvent';
import { SceneObject } from '../../../Base2/Scene/SceneObject';
import { FirstObject } from './SceneObjects/FirstObject';
import { Camera } from '../../../Base2/Camera/Camera';
import { ExampleCamera } from './ExampleCamera';

export class ExampleScene extends Scene {

    protected camera: ExampleCamera;

    constructor() {
        super();
        this.camera = new ExampleCamera(
            {x: 0, y: 0, z: -2},
            {x: 0, y: 0, z: 0}
        );
        this.addSceneObject(new FirstObject());
    }

    init() {

    }

    update(time: number) {
        // ExampleScene.Log.info('ExampleScene', 'update call...')
    }

    render() {

    }

}