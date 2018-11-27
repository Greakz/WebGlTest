import { Shader } from '../../Base2/Shader/Shader';

export class ExampleShader extends Shader {
    shader_identifier: string = 'example';

    constructor() {
        super();
    }

    uf_modelMatrix: WebGLUniformLocation;
    uf_projectionMatrix: WebGLUniformLocation;
    bindUniformLocations(GL: WebGL2RenderingContext) {
        this.uf_modelMatrix = GL.getUniformLocation(this.compiledProgram, "modelMatrix");
        this.uf_projectionMatrix = GL.getUniformLocation(this.compiledProgram, "projectionMatrix");
    }
    attr_position: number;
    bindAttributeLocations(GL: WebGL2RenderingContext) {
        this.attr_position = GL.getAttribLocation(this.compiledProgram, "vertexPosition");
    }
}