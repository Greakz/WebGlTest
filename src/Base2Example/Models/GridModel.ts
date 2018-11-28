import { Model } from '../../Base2/Object/Model/Model';
import { mat4ToF32 } from '../../Base2/Math/Matrix/matTo';
import { Mat4 } from '../../Base2/Math/Matrix/mat';
import { ExampleShader } from '../Shader/ExampleShader';
import { GridVao } from './VAO/GridVao';

export class GridModel extends Model {

    protected shader: ExampleShader;
    protected size: number;

    constructor(size: number) {
        super();
        this.size = size;
    }
    init() {
        this.vao = GridModel.VAOProvider.getVao(new GridVao(this.size));
        this.shader = GridModel.ShaderProvider.getShader(new ExampleShader());
    }
    render(GL: WebGL2RenderingContext, projMat: Mat4, modelMat: Mat4) {
        GL.bindVertexArray(this.vao.get());
        GL.useProgram(this.shader.getProgram());

        GL.uniform4f(
            this.shader.uf_color,
            0.7, 0.7, 0.7, 0.3);

        GL.uniformMatrix4fv(
            this.shader.uf_modelMatrix,
            false,
            mat4ToF32(modelMat));

        GL.uniformMatrix4fv(
            this.shader.uf_projectionMatrix,
            false,
            mat4ToF32(projMat));

        GL.drawElements(GL.TRIANGLES, 6, GL.UNSIGNED_SHORT, 0);

        // GL.vertexAttribPointer(this.shader.attr_position, 3, GL.FLOAT, false, 0, 4);
        // GL.drawArrays(GL.LINES, 0,this.size * 4 + 4);

        GL.bindVertexArray(null);
    }
}