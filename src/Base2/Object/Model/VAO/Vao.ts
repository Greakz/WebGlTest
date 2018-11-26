import { HasSingletons } from '../../../Singleton/HasSingletons';

export interface VaoOptions {
}

export class Vao extends HasSingletons {
    vao_identifier: string = 'default';

    private vao: WebGLVertexArrayObject;
    protected vertices: number[] = [];
    protected indices: number[] = [];
    protected options: VaoOptions;
    constructor(options: VaoOptions) {
        super();
        this.options = options;
    }

    init(GL: WebGL2RenderingContext) {
        let indexBuffer: WebGLBuffer = GL.createBuffer();
        let vertexBuffer: WebGLBuffer = GL.createBuffer();

        let vao: WebGLVertexArrayObject = GL.createVertexArray();
        GL.bindVertexArray(vao);

        GL.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer);
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, indexBuffer);

        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.vertices), GL.STATIC_DRAW);
        GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), GL.STATIC_DRAW);


        this.vao = vao;
        GL.bindVertexArray(null);

        if(!GL.isVertexArray(this.vao)) {
            Vao.Log.error('VAO', 'Cant create Vao: ' + this.vao_identifier)
        }
    }

    bind(GL: WebGL2RenderingContext): void {
        GL.bindVertexArray(this.vao);
    }
}