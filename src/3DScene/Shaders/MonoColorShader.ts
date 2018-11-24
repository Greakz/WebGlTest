import { Shader } from '../Base/Shader';

export class MonoColorShader extends Shader {

    attr_position: number;

    uf_view_matrix: WebGLUniformLocation;
    uf_model_matrix: WebGLUniformLocation;
    uf_color: WebGLUniformLocation;

    bindUniformLocations(GL: WebGLRenderingContext) {
        this.uf_model_matrix = GL.getUniformLocation(this.compiledProgram, "modelMatrix");
        this.uf_view_matrix = GL.getUniformLocation(this.compiledProgram, "viewMatrix");
        this.attr_position = GL.getAttribLocation(this.compiledProgram, "vertexPosition");
        this.uf_color = GL.getUniformLocation(this.compiledProgram, "color");
    }

}