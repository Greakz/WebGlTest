import { Scene } from '../../Base2/Scene/Scene';
import { SceneEvent } from '../../Base2/Scene/SceneEvent';
import { SceneObject } from '../../Base2/Scene/SceneObject';
import { FirstObject } from './DrawObjects/FirstObject';

export class ExampleScene extends Scene {

    protected sceneObjects: SceneObject[] = [];
    protected sceneEvents: SceneEvent[] = [];

    constructor() {
        super();
        this.sceneObjects.push(new FirstObject());
    }

    init() {

    }

    update(time: number) {
        // ExampleScene.Log.info('ExampleScene', 'update call...')
    }

}