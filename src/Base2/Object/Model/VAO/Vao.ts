import { HasSingletons } from '../../../Singleton/HasSingletons';
import { Shader } from '../../../Shader/Shader';

export class Vao<S extends Shader> extends HasSingletons {
    vao_identifier: string = 'default';
    shader: S;
    protected vao: WebGLVertexArrayObject;
    protected vertices: number[] = [];
    protected indices: number[] = [];
    constructor(shader: S) {
        super();
        this.shader = shader;
    }

    init(GL: WebGL2RenderingContext, shader: S) {
        if(!GL.isVertexArray(this.vao)) {
            Vao.Log.error('VAO', 'Cant create Vao: ' + this.vao_identifier)
        }
    }

    get(): WebGLVertexArrayObject {
        return this.vao;
    }
}