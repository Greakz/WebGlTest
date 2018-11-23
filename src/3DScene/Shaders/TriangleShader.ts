import { Shader } from '../Base/Shader';

export class TriangleShader extends Shader {

    attr_position: number;
    uf_view_matrix: WebGLUniformLocation;

    bindUniformLocations(GL: WebGLRenderingContext) {
        this.attr_position = GL.getAttribLocation(this.compiledProgram, "vertexPosition");
        this.uf_view_matrix = GL.getUniformLocation(this.compiledProgram, "viewMatrix");
    }

}