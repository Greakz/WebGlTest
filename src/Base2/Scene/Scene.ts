import { HasSingletons } from '../Singleton/HasSingletons';
import { SceneObject } from './SceneObject';
import { SceneEvent } from './SceneEvent';
import { Camera } from '../Camera/Camera';
import { Mat4 } from '../Math/Matrix/mat';
import { MousePosition } from '../Singleton/MousePosition';
import MouseSingleton from '../Singleton/MouseSingleton';
import { Hitable, isHitable } from '../Object/Model/Hitable';

class SceneCore extends HasSingletons {
    protected MousePosition: MousePosition = MouseSingleton.getInstance();
    protected camera: Camera;
    protected sceneObjects: SceneObject[] = [];
    protected hitObjects: Hitable[] = [];
    protected sceneEvents: SceneEvent[] = [];

    initSelfAndChildren() {
        this.sceneObjects.forEach(sO => sO.initSelfAndChildren());
        this.init();
        this.camera.init();
    }
    updateSelfAndChildren(time: number) {
        this.camera.update(time);
        this.sceneObjects.forEach(sO => sO.updateSelfAndChildren(time));
        this.update(time);
    }
    renderSelfAndChildren(GL: WebGL2RenderingContext) {
        const projMat: Mat4 = this.camera.getProjectionMatrix();
        this.sceneObjects.forEach(sO => sO.renderSelfAndChildren(GL, projMat));
        this.render(GL, projMat);
    }
    init() {}
    update(time: number) {}
    render(GL: WebGL2RenderingContext, projMat: Mat4) {}

    private currentId: number = 0;
    protected addSceneObject(obj: SceneObject) {
        obj.setId(this.currentId);
        this.sceneObjects.push(obj);
        console.log(Object.keys(obj).indexOf(''));
        if(isHitable(obj)) {
            this.addToHitObjects(obj);
        }
    }

    private addToHitObjects(obj: SceneObject) {
        this.hitObjects.push((obj as any));
    }
}

export class Scene extends SceneCore {
    /**
        constructor() of Scene;
        create some SceneObjects here with the method this.addSceneObject(obj: SceneObject)!
     */
    constructor()  {
        super();
    }
    /**
     init() of Scene;
     Initialize the Scene itself only here!
     All SceneObjects that you created in the Constructor
     will get initialized through the initSelfAndChild() method
     of The SceneCore!
     */
    init() {
    }

    update(time: number) {
    }

    render(GL: WebGL2RenderingContext, projMat: Mat4) {
    }
}