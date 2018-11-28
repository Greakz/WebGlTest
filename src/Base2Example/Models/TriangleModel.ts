import { Model } from '../../Base2/Object/Model/Model';
import { TriangleVao } from './VAO/TriangleVao';
import { mat4ToF32 } from '../../Base2/Math/Matrix/matTo';
import { Mat4 } from '../../Base2/Math/Matrix/mat';
import { ExampleShader } from '../Shader/ExampleShader';

export class TriangleModel extends Model {

    protected shader: ExampleShader;
    protected vao: TriangleVao;

    constructor() {
        super();
    }
    init() {
        this.vao = Model.VAOProvider.getVao(new TriangleVao());
        this.shader = Model.ShaderProvider.getShader(new ExampleShader());
    }
    render(GL: WebGL2RenderingContext, projMat: Mat4, modelMat: Mat4) {
        GL.bindVertexArray(this.vao.get());
        GL.useProgram(this.shader.getProgram());

        GL.uniform4f(
            this.shader.uf_color,
            0.7, 0.1, 0.1, 1.0);

        GL.uniformMatrix4fv(
            this.shader.uf_modelMatrix,
            false,
            mat4ToF32(modelMat));

        GL.uniformMatrix4fv(
            this.shader.uf_projectionMatrix,
            false,
            mat4ToF32(projMat));

        GL.drawElements(GL.TRIANGLES, 3, GL.UNSIGNED_SHORT, 0);
        GL.bindVertexArray(null);
    }
}