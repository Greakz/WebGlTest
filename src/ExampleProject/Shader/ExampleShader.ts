import { Shader } from '../../BaseLib/Shader/Shader';

export class ExampleShader extends Shader {
    shader_identifier: string = 'example';

    constructor() {
        super();
    }
    uf_modelMatrix: WebGLUniformLocation;
    uf_projectionMatrix: WebGLUniformLocation;
    uf_color: WebGLUniformLocation;
    bindUniformLocations(GL: WebGL2RenderingContext) {
        this.uf_modelMatrix = GL.getUniformLocation(this.compiledProgram, "modelMatrix");
        this.uf_projectionMatrix = GL.getUniformLocation(this.compiledProgram, "projectionMatrix");
        this.uf_color = GL.getUniformLocation(this.compiledProgram, "color");
    }
    attr_position: number;
    bindAttributeLocations(GL: WebGL2RenderingContext) {
        this.attr_position = GL.getAttribLocation(this.compiledProgram, "vertexPosition");
    }
}