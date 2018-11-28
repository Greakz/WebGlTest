import { Mat4 } from '../Math/Matrix/mat';
import { HasLog } from '../Singleton/HasSingletons';

export class SceneObject extends HasLog {
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