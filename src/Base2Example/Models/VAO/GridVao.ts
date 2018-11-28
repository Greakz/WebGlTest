import { Vao } from '../../../Base2/Object/Model/VAO/Vao';
import { ExampleShader } from '../../Shader/ExampleShader';
const yGrid = -0.0001;

export class GridVao extends Vao<ExampleShader> {
    vao_identifier: string = 'grid';
    available_shader: string[] = ['example'];
    protected vertices: number[];
    protected indices: number[];
    constructor(size: number) {
        super(GridVao.ShaderProvider.getShader(new ExampleShader()));
        // Plane Vertex
        this.vertices = [
            -size, 0, -size,
            -size, 0, size,
            size, 0, -size,
            size, 0, size
        ];
        // Grid Indices
        this.indices = [
            0, 1, 2, 1, 3, 2
        ];
        /*
        for(let i = -size; i <= size; i++) {
            this.pushVertex(i, size)
        }
        */
    }

    init(GL: WebGL2RenderingContext, shader: ExampleShader) {
        let indexBuffer: WebGLBuffer = GL.createBuffer();
        let vertexBuffer: WebGLBuffer = GL.createBuffer();

        let vao: WebGLVertexArrayObject = GL.createVertexArray();
        GL.bindVertexArray(vao);

        GL.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer);
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, indexBuffer);

        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.vertices), GL.STATIC_DRAW);
        GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), GL.STATIC_DRAW);

        GL.vertexAttribPointer(this.shader.attr_position, 3, GL.FLOAT, false, 0, 0);
        GL.enableVertexAttribArray(this.shader.attr_position);

        this.vao = vao;
        GL.bindVertexArray(null);

        if(!GL.isVertexArray(this.vao)) {
            Vao.Log.error('VAO', 'Cant create Vao: ' + this.vao_identifier)
        }
    }

    private pushVertex(i: number, size: number) {
        // First Line
        this.vertices.push(i);
        this.vertices.push(yGrid);
        this.vertices.push(-1 * size);

        this.vertices.push(i);
        this.vertices.push(yGrid);
        this.vertices.push(size);

        // Second Line
        this.vertices.push(-1 * size);
        this.vertices.push(yGrid);
        this.vertices.push(i);

        this.vertices.push(size);
        this.vertices.push(yGrid);
        this.vertices.push(i);
    }
}