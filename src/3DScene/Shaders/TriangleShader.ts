import { Shader } from '../Base/Shader';

export class TriangleShader extends Shader {

    attr_position: number;
    attr_color: number;
    uf_view_matrix: WebGLUniformLocation;
    uf_model_matrix: WebGLUniformLocation;

    bindUniformLocations(GL: WebGLRenderingContext) {
        this.uf_model_matrix = GL.getUniformLocation(this.compiledProgram, "modelMatrix");
        this.uf_view_matrix = GL.getUniformLocation(this.compiledProgram, "viewMatrix");
        this.attr_position = GL.getAttribLocation(this.compiledProgram, "vertexPosition");
        this.attr_color = GL.getAttribLocation(this.compiledProgram, "color");
    }

}