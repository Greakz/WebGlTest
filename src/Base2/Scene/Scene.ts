import { HasSingletons } from '../Singleton/HasSingletons';
import { SceneObject } from './SceneObject';
import { SceneEvent } from './SceneEvent';

class SceneCore extends HasSingletons {
    protected sceneObjects: SceneObject[] = [];
    protected sceneEvents: SceneEvent[] = [];
    initSelfAndChildren() {
        this.sceneObjects.forEach(sO => sO.initSelfAndChildren());
        this.init();
    }
    updateSelfAndChildren(time: number) {
        this.sceneObjects.forEach(sO => sO.updateSelfAndChildren(time));
        this.update(time);
    }
    renderSelfAndChildren(GL: WebGLRenderingContext) {
        this.sceneObjects.forEach(sO => sO.renderSelfAndChildren(GL));
        this.render(GL);
    }
    init() {}
    update(time: number) {}
    render(GL: WebGLRenderingContext) {}
}

export class Scene extends SceneCore {
    /**
        constructor() of Scene;
        create all SceneObjects here!
     */
    constructor()  {
        super()
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

    render(GL: WebGLRenderingContext) {
    }
}