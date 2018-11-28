import { Vao } from '../../../Base2/Object/Model/VAO/Vao';
import { ExampleShader } from '../../Shader/ExampleShader';
import { GridVao } from './GridVao';

export class TriangleVao extends Vao<ExampleShader> {
    vao_identifier: string = 'triangle';
    available_shader: string[] = ['example'];

    protected vertices: number[] = [
        0, 0.5, 0,
        -0.5, -0.5, 0,
        0.5, -0.5, 0
    ];
    protected indices: number[] = [
        0, 1, 2
    ];
    constructor() {
        super(GridVao.ShaderProvider.getShader(new ExampleShader()));
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
}