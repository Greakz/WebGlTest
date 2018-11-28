import { Mat4 } from '../Math/Matrix/mat';
import { HasLog } from '../Singleton/HasSingletons';
import { Scene } from './Scene';

abstract class SceneObjectCore extends HasLog {

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