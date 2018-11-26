import { HasSingletons } from '../Singleton/HasSingletons';

export class DrawObject extends HasSingletons {
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
    renderSelfAndChildren(GL: WebGLRenderingContext) {
        if(this.initDone) {


            this.render(GL);
        }
    }
    init() {}
    update(time: number) {}
    render(GL: WebGLRenderingContext) {}
}