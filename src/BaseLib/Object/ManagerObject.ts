import { Mat4 } from '../Math/Matrix/mat';
import { SceneObject } from '../Scene/SceneObject';
import { SceneLightning } from '../Light/SceneLightning';

export class ManagerObject extends SceneObject{
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