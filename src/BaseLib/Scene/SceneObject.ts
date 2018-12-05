import { Scene } from './Scene';
import { HasProvider } from '../Singleton/HasSingletons';
import { Mat4 } from '../Math/Matrix/mat';
import { SceneLightning } from '../Light/SceneLightning';

abstract class SceneObjectCore extends HasProvider {

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
    renderSelfAndChildren(GL: WebGL2RenderingContext, projMat: Mat4, sceneLightning: SceneLightning) {
        this.render(GL, projMat, sceneLightning)
    }
    init() {}
    update(time: number) {}
    render(GL: WebGL2RenderingContext, projMat: Mat4, sceneLightning: SceneLightning) {}
}