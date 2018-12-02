import { Scene } from './Scene';
import { HasSingletons } from '../Singleton/HasSingletons';
import { Mat4 } from '../Math/Matrix/mat';

abstract class SceneObjectCore extends HasSingletons {

    protected parent: Scene | SceneObject;
    constructor(parent: Scene | SceneObject) {
        super();
        this.parent = parent;
    }
}

export class SceneObject extends SceneObjectCore {
    id: number;

    setId(id: number) {
        this.id = id;
    }
    initSelfAndChildren() {

        this.init()
    }
    updateSelfAndChildren(time: number) {

        this.update(time)
    }
    renderSelfAndChildren(GL: WebGL2RenderingContext, projMat: Mat4) {
        this.render(GL, projMat)
    }
    init() {}
    update(time: number) {}
    render(GL: WebGL2RenderingContext, projMat: Mat4) {}
}