import { Mat4 } from '../Math/Matrix/mat';
import { SceneObject } from '../Scene/SceneObject';

export class DrawObject extends SceneObject {
    private initDone: boolean = false;
    initSelfAndChildren() {

        this.init();
        this.initDone = true;
    }
    updateSelfAndChildren(time: number) {
        if(this.initDone) {


            this.update(time);
        }
    }
    renderSelfAndChildren(GL: WebGL2RenderingContext, projMat: Mat4) {
        if(this.initDone) {


            this.render(GL, projMat);
        }
    }
    init() {}
    update(time: number) {}
    render(GL: WebGL2RenderingContext, projMat: Mat4) {}
}