export class ManagerObject {
    initSelfAndChildren() {

        this.init()
    }
    updateSelfAndChildren(time: number) {

        this.update(time)
    }
    renderSelfAndChildren(GL: WebGLRenderingContext) {

        this.render(GL)
    }
    init() {}
    update(time: number) {}
    render(GL: WebGLRenderingContext) {}
}