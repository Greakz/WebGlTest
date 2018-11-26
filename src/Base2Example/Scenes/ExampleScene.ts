import { Scene } from '../../Base2/Scene/Scene';
import { SceneEvent } from '../../Base2/Scene/SceneEvent';
import { SceneObject } from '../../Base2/Scene/SceneObject';
import { FirstObject } from './DrawObjects/FirstObject';
import { Camera } from '../../Base2/Camera/Camera';

export class ExampleScene extends Scene {

    constructor() {
        super();
        this.camera = new Camera(
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