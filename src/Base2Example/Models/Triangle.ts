import { Model } from '../../Base2/Object/Model/Model';
import { TriangleVao } from './VAO/TriangleVao';
import { Shader } from '../../Base2/Shader/Shader';
import { mat4ToF32 } from '../../Base2/Math/Matrix/matTo';
import { Mat4 } from '../../Base2/Math/Matrix/mat';
import { ExampleShader } from '../Shader/ExampleShader';

export class Triangle extends Model {

    protected shader: ExampleShader;

    constructor() {
        super();
    }
    init() {
        this.vao = Model.VAOProvider.getVao(new TriangleVao());
        this.shader = Model.ShaderProvider.getShader(new ExampleShader());
    }
    render(GL: WebGL2RenderingContext, projMat: Mat4, modelMat: Mat4) {
        this.vao.bind(GL);
        GL.vertexAttribPointer(this.shader.attr_position, 3, GL.FLOAT, false, 0, 0);
        GL.enableVertexAttribArray(this.shader.attr_position);

        GL.useProgram(this.shader.getProgram());

        GL.uniformMatrix4fv(
            this.shader.uf_modelMatrix,
            false,
            mat4ToF32(modelMat));

        GL.uniformMatrix4fv(
            this.shader.uf_projectionMatrix,
            false,
            mat4ToF32(projMat));

        GL.drawElements(GL.TRIANGLES, 3, GL.UNSIGNED_SHORT, 0)
    }
}